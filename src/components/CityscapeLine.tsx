import { useMemo } from "react";

/** ViewBox: 800 wide, ground line at y=100. */
const WIDTH = 800;
const GROUND = 100;

type Special = "spire" | "mill" | "pylon" | "highrise";

/**
 * City flavours: every page load the footer picks one and draws it as a
 * single continuous pen line — stepped gables, bell gables, a church spire,
 * a windmill, whatever that city is proud of. Decorative only, re-seeded on
 * every mount, so no two visits walk the same street.
 */
const CITIES: { name: string; specials: Special[] }[] = [
  { name: "Woerden", specials: ["mill", "spire"] },
  { name: "Utrecht", specials: ["spire"] },
  { name: "Amsterdam", specials: ["highrise", "highrise"] },
  { name: "Rotterdam", specials: ["pylon"] },
  { name: "Delft", specials: ["spire", "mill"] },
  { name: "Den Haag", specials: ["highrise", "pylon"] },
  { name: "Gouda", specials: ["spire"] },
  { name: "Leiden", specials: ["spire", "mill"] },
  { name: "Oudewater", specials: ["mill", "spire"] },
  { name: "Montfoort", specials: ["mill"] },
];

export function CityscapeLine({ className }: { className?: string }) {
  const line = useMemo(drawSkyline, []);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${WIDTH} 110`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <title>{`Skyline van ${line.cityName}`}</title>
      <path d={line.outline} />
      <path d={line.details} />
    </svg>
  );
}

function drawSkyline(): { outline: string; details: string; cityName: string } {
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const specials = [...city.specials];
  const details: string[] = [];
  let outline = `M 0 ${GROUND}`;
  let x = 10;

  while (x < WIDTH - 24) {
    if (specials.length > 0 && Math.random() < 0.2) {
      const drawn = drawSpecial(specials.shift() as Special, x, details);
      outline += drawn.d;
      x += drawn.w;
      continue;
    }
    const w = 26 + Math.random() * 42;
    outline += drawHouse(x, w, details);
    x += w;
  }

  return { outline: `${outline} L ${WIDTH} ${GROUND}`, details: details.join(" "), cityName: city.name };
}

const top = (h: number) => GROUND - h;
const n = (v: number) => v.toFixed(1);

/** One house: façade plus a random Dutch gable, maybe a window tick. */
function drawHouse(x: number, w: number, details: string[]): string {
  const h = 22 + Math.random() * 52;
  const draw = Math.random();
  let d = ` L ${n(x)} ${n(top(h))}`;

  if (draw < 0.34) {
    // Trapgevel — stepped gable.
    const steps = 2 + Math.floor(Math.random() * 2);
    const stepW = w / (steps + 1);
    const stepH = 8 + Math.random() * 6;
    for (let i = 0; i < steps; i++) {
      d += ` L ${n(x + stepW * (i + 0.5))} ${n(top(h) - stepH * (i + 1))} L ${n(x + stepW * (i + 1))} ${n(top(h) - stepH * i)}`;
    }
    d += ` L ${n(x + w)} ${n(top(h))}`;
  } else if (draw < 0.67) {
    // Klokgevel — bell gable.
    const cx = x + w / 2;
    d += ` C ${n(x + w * 0.08)} ${n(top(h) - 14)} ${n(cx - w * 0.16)} ${n(top(h) - 19)} ${n(cx)} ${n(top(h) - 20)}`;
    d += ` C ${n(cx + w * 0.16)} ${n(top(h) - 19)} ${n(x + w * 0.92)} ${n(top(h) - 14)} ${n(x + w)} ${n(top(h))}`;
  } else {
    // Puntgevel — pointed gable.
    d += ` L ${n(x + w / 2)} ${n(top(h) - 10 - Math.random() * 10)} L ${n(x + w)} ${n(top(h))}`;
  }

  d += ` L ${n(x + w)} ${n(GROUND)}`;

  // The occasional tiny window tick keeps the street lively but sparse.
  if (Math.random() < 0.4) {
    const wx = x + w * (0.25 + Math.random() * 0.5);
    details.push(`M ${n(wx)} ${n(top(h) + h * 0.38)} l 0 ${n(h * 0.3)}`);
  }

  return d;
}

/** A landmark: returns the outline fragment and the width it occupies. */
function drawSpecial(kind: Special, x: number, details: string[]): { d: string; w: number } {
  if (kind === "mill") {
    // Windmill: tapered hull, cap, hub on top; the four sails as details.
    const w = 34;
    const h = 50 + Math.random() * 16;
    const cap = 12;
    const ax = x + w / 2;
    const ay = top(h + cap) - 4;
    details.push(
      `M ${n(ax - 1.6)} ${n(ay)} a 1.6 1.6 0 1 0 3.2 0 a 1.6 1.6 0 1 0 -3.2 0`,
      `M ${n(ax - 19)} ${n(ay + 14)} L ${n(ax + 19)} ${n(ay - 14)} M ${n(ax - 19)} ${n(ay - 14)} L ${n(ax + 19)} ${n(ay + 14)}`,
    );
    return {
      d: ` L ${n(x)} ${n(top(h))} L ${n(x + w * 0.3)} ${n(top(h + cap))} L ${n(x + w * 0.7)} ${n(top(h + cap))} L ${n(x + w)} ${n(top(h))} L ${n(x + w)} ${n(GROUND)}`,
      w,
    };
  }

  if (kind === "pylon") {
    // Erasmus-style bridge pylon: a leaning mast with one stay.
    const w = 28;
    const h = 74 + Math.random() * 14;
    details.push(`M ${n(x + w * 0.72)} ${n(top(h))} L ${n(x - 18)} ${n(top(30))}`);
    return { d: ` L ${n(x)} ${n(GROUND)} L ${n(x + w * 0.72)} ${n(top(h))} L ${n(x + w)} ${n(GROUND)}`, w };
  }

  if (kind === "highrise") {
    // Flat modern tower with a thin antenna.
    const w = 30 + Math.random() * 18;
    const h = 62 + Math.random() * 22;
    details.push(`M ${n(x + w / 2)} ${n(top(h))} L ${n(x + w / 2)} ${n(top(h) - 12)}`);
    return { d: ` L ${n(x)} ${n(top(h))} L ${n(x + w)} ${n(top(h))} L ${n(x + w)} ${n(GROUND)}`, w };
  }

  // "spire" — a church tower with a needle spire (the Dom, Westertoren…).
  const w = 26;
  const h = 82 + Math.random() * 24;
  const spire = 15 + Math.random() * 12;
  const cx = x + w / 2;
  details.push(`M ${n(cx)} ${n(top(h) + 4)} L ${n(cx)} ${n(top(h) + h * 0.32)}`); // clock line
  return {
    d: ` L ${n(x)} ${n(top(h))} L ${n(cx)} ${n(top(h + spire))} L ${n(x + w)} ${n(top(h))} L ${n(x + w)} ${n(GROUND)}`,
    w,
  };
}
