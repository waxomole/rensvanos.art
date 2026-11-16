import { useTheme, type Theme } from "../hooks/useTheme";
import { useT } from "../i18n/LangContext";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 13.5A8.5 8.5 0 0 1 10.5 4 8.5 8.5 0 1 0 20 13.5Z" />
    </svg>
  );
}

const ICONS: Record<Theme, typeof SunIcon> = { light: SunIcon, dark: MoonIcon };

/** Sun/moon toggle in the utility pill — switches the whole palette. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const t = useT();
  const Icon = ICONS[theme];
  const label = theme === "dark" ? t.nav.themeLight : t.nav.themeDark;

  return (
    <button type="button" className="utility__theme" onClick={toggle} aria-label={label} title={label}>
      <Icon />
    </button>
  );
}
