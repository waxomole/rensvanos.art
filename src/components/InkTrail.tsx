import { useEffect, useRef } from "react";

/**
 * Ink trail cursor: a fixed canvas that draws a fading pen stroke behind the
 * pointer. Only active for precise pointers (mouse/trackpad) and skipped
 * entirely when the user prefers reduced motion. Renders nothing otherwise.
 */
export function InkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const style = getComputedStyle(document.documentElement);
    const ink = style.getPropertyValue("--ink-rgb").trim() || "31, 42, 51";

    let lastX: number | null = null;
    let lastY: number | null = null;
    let raf = 0;

    const draw = (x: number, y: number) => {
      context.strokeStyle = `rgba(${ink}, 0.22)`;
      context.lineWidth = 2.2;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(lastX ?? x, lastY ?? y);
      context.lineTo(x, y);
      context.stroke();
    };

    const onMove = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;
      if (lastX !== null && lastY !== null) draw(x, y);
      lastX = x;
      lastY = y;
    };

    const onLeave = () => {
      lastX = null;
      lastY = null;
    };

    const fade = () => {
      // Erase a sliver of the trail every frame so strokes dissolve like drying ink.
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.045)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.restore();
      raf = requestAnimationFrame(fade);
    };
    raf = requestAnimationFrame(fade);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="ink-trail" aria-hidden="true" />;
}
