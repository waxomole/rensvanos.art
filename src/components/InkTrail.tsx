import { useEffect, useRef } from "react";

const FADE_ALPHA = 0.05;
const IDLE_STOP_MS = 2000; // trail is fully faded well before this — stop the rAF loop

/**
 * Ink trail cursor: a fixed canvas that draws a fading pen stroke behind the
 * pointer — mouse and trackpad. On touch the CursorGlow takes over (the ink
 * stroke is too faint under the finger); here the stroke follows the pointer
 * until it leaves. Skipped entirely when the user prefers reduced motion or
 * has a coarse pointer. The fade loop only runs while there is fresh ink on
 * the canvas, so an idle page costs nothing.
 */
export function InkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return; // touch gets the CursorGlow

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
    const ink = style.getPropertyValue("--ink-rgb").trim() || "35, 32, 27";

    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastDrawAt = 0;
    let raf = 0;
    let fading = false;

    const fade = () => {
      // Erase a sliver every frame so strokes dissolve like drying ink.
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = `rgba(0, 0, 0, ${FADE_ALPHA})`;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.restore();

      if (performance.now() - lastDrawAt > IDLE_STOP_MS) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fading = false;
        return;
      }
      raf = requestAnimationFrame(fade);
    };

    const startFading = () => {
      if (!fading) {
        fading = true;
        raf = requestAnimationFrame(fade);
      }
    };

    const draw = (x: number, y: number) => {
      context.strokeStyle = `rgba(${ink}, 0.22)`;
      context.lineWidth = 2.2;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(lastX ?? x, lastY ?? y);
      context.lineTo(x, y);
      context.stroke();
    };

    const onDown = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onMove = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;
      if (lastX !== null && lastY !== null) {
        draw(x, y);
        lastDrawAt = performance.now();
        startFading();
      }
      lastX = x;
      lastY = y;
    };

    const onEnd = () => {
      lastX = null;
      lastY = null;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onEnd, { passive: true });
    window.addEventListener("pointercancel", onEnd, { passive: true });
    document.documentElement.addEventListener("pointerleave", onEnd);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
      document.documentElement.removeEventListener("pointerleave", onEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className="ink-trail" aria-hidden="true" />;
}
