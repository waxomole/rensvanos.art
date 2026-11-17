import { useEffect, useRef } from "react";

const SIZE = 260;
const LERP = 0.1; // trailing smoothness — lower = lazier, more flowing glow
const IDLE_STOP_MS = 1600;

/**
 * Aurora glow that follows the pointer — the "light-up" effect, like ink
 * catching lamplight. Runs for every pointer type: on touch it replaces the
 * (too faint) ink stroke as the mobile cursor effect; on desktop it trails
 * behind the ink line as a soft halo. Transform-only updates, and the rAF
 * loop stops once the glow has caught up and the pointer rests.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let running = false;
    let lastActivity = 0;
    let seen = false;

    const tick = () => {
      x += (targetX - x) * LERP;
      y += (targetY - y) * LERP;
      scale += (targetScale - scale) * 0.18;
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0) scale(${scale})`;

      if (performance.now() - lastActivity > IDLE_STOP_MS && Math.abs(targetX - x) < 0.5 && Math.abs(targetY - y) < 0.5) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      lastActivity = performance.now();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!seen) {
        seen = true;
        x = targetX;
        y = targetY;
        el.classList.add("is-on");
      }
      wake();
    };

    const onDown = () => {
      targetScale = 1.35;
      wake();
    };

    const onUp = () => {
      targetScale = 1;
      wake();
    };

    const onLeave = () => {
      el.classList.remove("is-on");
      seen = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
