import { useEffect, useRef, useState } from "react";

/** Total lifetime of one splash — keep in sync with the CSS keyframes. */
const LIFE_MS = 950;
/** Gesture must be shorter than this and move less than this to count as a tap. */
const TAP_MS = 350;
const TAP_SLOP = 12;

/** SVG stage size — everything is drawn around the origin. */
const STAGE = 340;
const RADIUS = 30; // average blob reach in SVG units

interface Splash {
  id: number;
  x: number;
  y: number;
  core: string; // closed splat path around (0,0)
  ring: number; // ripple radius
  droplets: { dx: number; dy: number; r: number; delay: number; dur: number }[];
  rotation: number; // random tilt so the same shape never repeats in place
}

/**
 * One tap = one ink event: a wobbling splat lands with a springy overshoot,
 * tiny droplets fly out along random arcs, and a soft ripple spreads while
 * the ink dries. Every splash is generated on the spot (random lobes, spikes
 * and satellites), so the page never shows the same splash twice. Ink-only
 * colours (--ink-rgb) keep it palette-fitting in both themes, and nothing
 * follows the cursor — the ink trail already draws the line.
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
      setSplashes((current) => [...current.slice(-4), makeSplash(id, x, y)]);
      const timeout = window.setTimeout(() => {
        timeouts.current.delete(timeout);
        setSplashes((current) => current.filter((splash) => splash.id !== id));
      }, LIFE_MS + 100);
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
      // Scrolling gestures start with a touch — only short, stationary ones splash.
      const moved = Math.hypot(event.clientX - downX, event.clientY - downY);
      if (performance.now() - downTime < TAP_MS && moved < TAP_SLOP) {
        const interactive = (event.target as Element | null)?.closest(
          "input, textarea, select, a, button, [role='button']",
        );
        if (!interactive) spawn(event.clientX, event.clientY);
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
      {splashes.map((s) => (
        <svg
          key={s.id}
          className="ink-splash"
          style={{ left: s.x, top: s.y }}
          viewBox={`${-STAGE / 2} ${-STAGE / 2} ${STAGE} ${STAGE}`}
          width={STAGE}
          height={STAGE}
        >
          <circle className="ink-splash__ripple" r={s.ring} fill="none" />
          <path className="ink-splash__core" d={s.core} transform={`rotate(${s.rotation})`} />
          {s.droplets.map((d, i) => (
            <circle
              key={i}
              className="ink-splash__drop"
              r={d.r}
              style={{
                ["--dx" as string]: `${d.dx}px`,
                ["--dy" as string]: `${d.dy}px`,
                animationDelay: `${d.delay}ms`,
                animationDuration: `${d.dur}ms`,
              }}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}

/** Build an organic splat: a wobbling blob, a few spikes, satellite puddles. */
function makeSplash(id: number, x: number, y: number): Splash {
  const rnd = mulberry(id * 2654435761 + Date.now());

  // Lobes around the centre — most edges pull in, a few spike out as ejected ink.
  const lobes = 9 + Math.floor(rnd() * 4);
  const spikes = 2 + Math.floor(rnd() * 3);
  const spikeSet = new Set<number>();
  while (spikeSet.size < spikes) spikeSet.add(Math.floor(rnd() * lobes));

  const points: [number, number][] = [];
  for (let i = 0; i < lobes; i++) {
    const angle = (i / lobes) * Math.PI * 2 + (rnd() - 0.5) * 0.4;
    const reach = spikeSet.has(i) ? RADIUS * (1.55 + rnd() * 0.55) : RADIUS * (0.55 + rnd() * 0.6);
    points.push([Math.cos(angle) * reach, Math.sin(angle) * reach]);
  }

  // Close the outline with quadratic curves through segment midpoints so the
  // edge is one continuous wavy line instead of a polygon.
  const midpoint = (a: [number, number], b: [number, number]) =>
    [((a[0] + b[0]) / 2).toFixed(1), ((a[1] + b[1]) / 2).toFixed(1)] as const;
  const start = midpoint(points[points.length - 1], points[0]);
  let core = `M ${start[0]} ${start[1]}`;
  for (let i = 0; i < points.length; i++) {
    const next = points[(i + 1) % points.length];
    const anchor = midpoint(points[i], next);
    core += ` Q ${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)} ${anchor[0]} ${anchor[1]}`;
  }
  core += " Z";

  // A couple of satellite puddles that the main blob "threw".
  const satellites = 2 + Math.floor(rnd() * 2);
  for (let i = 0; i < satellites; i++) {
    const angle = rnd() * Math.PI * 2;
    const dist = RADIUS * (0.9 + rnd() * 0.5);
    const r = 2.5 + rnd() * 4;
    core += ` M ${(Math.cos(angle) * dist).toFixed(1)} ${(Math.sin(angle) * dist).toFixed(1)} m ${-r} 0 a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0`;
  }

  // Droplets fly out on evenly spread angles with jitter.
  const count = 6 + Math.floor(rnd() * 4);
  const droplets = Array.from({ length: count }, (_, i) => {
    const angle = ((i + rnd() * 0.7) / count) * Math.PI * 2;
    const dist = 40 + rnd() * 75;
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      r: 1.6 + rnd() * 2.6,
      delay: Math.round(rnd() * 90),
      dur: 550 + Math.round(rnd() * 320),
    };
  });

  return {
    id,
    x,
    y,
    core,
    ring: RADIUS * 1.9,
    droplets,
    rotation: rnd() * 360,
  };
}

/** Tiny deterministic PRNG so one splash's parts all share one character. */
function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
