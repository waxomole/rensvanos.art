import { useEffect } from "react";

/** Invokes `handler` when Escape is pressed while `active`. */
export function useEscapeKey(active: boolean, handler: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, handler]);
}
