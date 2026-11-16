import { useCallback, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "rvos-theme";

const THEME_COLORS: Record<Theme, string> = { light: "#f6f2ea", dark: "#12161b" };

/**
 * Light/dark theme state. The initial attribute is set before paint by an
 * inline bootstrap script in index.html (localStorage → prefers-color-scheme
 * → light), so this hook simply reads what's already on <html> and toggles
 * from there. Persisted across visits.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // SSR has no document — default light; the client reads the real attribute.
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  });

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode — theme just won't persist */
      }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", THEME_COLORS[next]);
      return next;
    });
  }, []);

  return { theme, toggle };
}
