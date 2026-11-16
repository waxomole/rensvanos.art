import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "rvos-theme";
const THEME_COLORS: Record<Theme, string> = { light: "#f6f2ea", dark: "#12161b" };

type Listener = () => void;

/**
 * Module-level theme store on <html data-theme>. A store (not component
 * state) because the toggle is rendered in two places (utility pill and the
 * mobile menu) — both stay in sync automatically.
 */
const themeStore = {
  listeners: new Set<Listener>(),

  get(): Theme {
    if (typeof document === "undefined") return "light"; // SSR
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  },

  set(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — theme just won't persist */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[next]);
    for (const listener of themeStore.listeners) listener();
  },

  subscribe(listener: Listener): () => void {
    themeStore.listeners.add(listener);
    return () => themeStore.listeners.delete(listener);
  },
};

/**
 * Light/dark theme state. The initial attribute is set before paint by an
 * inline bootstrap script in index.html (localStorage → prefers-color-scheme
 * → light), so this hook simply reads what's already on <html>.
 */
export function useTheme() {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.get,
    () => "light" as const, // SSR snapshot
  );

  const toggle = useCallback(() => {
    themeStore.set(themeStore.get() === "dark" ? "light" : "dark");
  }, []);

  return { theme, toggle };
}
