import { useEffect, useState } from "react";

/**
 * Tracks scroll direction for auto-hiding header elements: hidden while
 * scrolling down, visible again when scrolling up. Small thresholds so the
 * pill merge choreography starts almost with the scroll itself; near the top
 * of the page the header always stays. `forceVisible` keeps the element
 * shown (e.g. while a menu is open).
 */
const HYSTERESIS = 4; // px of scroll that flips direction
const TOP_ZONE = 48; // px from the top where the header stays put

export function useAutoHideHeader(forceVisible: boolean): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (forceVisible || y < TOP_ZONE) {
        setHidden(false);
      } else if (y > lastY + HYSTERESIS) {
        setHidden(true);
      } else if (y < lastY - HYSTERESIS) {
        setHidden(false);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceVisible]);

  return hidden;
}
