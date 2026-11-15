import { useEffect, useState } from "react";

/**
 * Tracks scroll direction for auto-hiding header elements: hidden while
 * scrolling down, visible again when scrolling up or near the top of the
 * page. `forceVisible` keeps the element shown (e.g. while a menu is open).
 */
export function useAutoHideHeader(forceVisible: boolean): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (forceVisible || y < 80) {
        setHidden(false);
      } else if (y > lastY + 6) {
        setHidden(true);
      } else if (y < lastY - 6) {
        setHidden(false);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceVisible]);

  return hidden;
}
