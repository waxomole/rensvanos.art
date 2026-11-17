import { useEffect, useRef, useState } from "react";

/** How long a splash lives on screen (kept in sync with the CSS animation). */
const LIFE_MS = 900;
/** Gesture must be shorter than this and move less than this to count as a tap. */
const TAP_MS = 350;
const TAP_SLOP = 12;

interface Splash {
  id: number;
  x: number;
  y: number;
}

/**
 * An ink splash where the visitor taps or clicks — a small drop hitting dry
 * paper, then gone. Deliberately does NOT follow the cursor around: the ink
 * trail already draws the path, the splash only marks the moment of intent.
 * Scrolling never splashes (only short, stationary gestures count) and
 * reduced-motion visitors see nothing at all.
 */
export function InkSplash() {
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const timeouts = useRef(new Set<number>());

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let downId: number | null = null;
    let downX = 0;
    let downY = 0;
    let downTime = 0;
    let nextId = 0;

    const spawn = (x: number, y: number) => {
      const id = nextId++;
      setSplashes((current) => [...current, { id, x, y }]);
      const timeout = window.setTimeout(() => {
        timeouts.current.delete(timeout);
        setSplashes((current) => current.filter((splash) => splash.id !== id));
      }, LIFE_MS);
      timeouts.current.add(timeout);
    };

    const onDown = (event: PointerEvent) => {
      downId = event.pointerId;
      downX = event.clientX;
      downY = event.clientY;
      downTime = performance.now();
    };

    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== downId) return;
      downId = null;
      const moved = Math.hypot(event.clientX - downX, event.clientY - downY);
      if (performance.now() - downTime < TAP_MS && moved < TAP_SLOP) {
        spawn(event.clientX, event.clientY);
      }
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      for (const timeout of timeouts.current) clearTimeout(timeout);
      timeouts.current.clear();
    };
  }, []);

  return (
    <div aria-hidden="true">
      {splashes.map(({ id, x, y }) => (
        <span key={id} className="ink-splash" style={{ left: x, top: y }}>
          <i /><i />
        </span>
      ))}
    </div>
  );
}
