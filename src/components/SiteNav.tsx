import { useEffect, useRef } from "react";
import { PAGE_PATHS, SITE, type PageId } from "../data/site";
import { useAutoHideHeader } from "../hooks/useAutoHideHeader";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useT } from "../i18n/LangContext";

const NAV_ITEMS = [
  { page: "work", labelKey: "work" },
  { page: "about", labelKey: "about" },
  { page: "commissions", labelKey: "commissions" },
] as const;

interface SiteNavProps {
  page: PageId;
  open: boolean;
  onToggle: (open: boolean) => void;
}

/**
 * Glass pill with brand + page links on desktop; below 700px a compact
 * corner pill with a glass burger button and a dropdown menu. Scrolling
 * down fades the pill out; scrolling up brings it back.
 */
export function SiteNav({ page, open, onToggle }: SiteNavProps) {
  const t = useT();
  const navRef = useRef<HTMLElement>(null);
  const hidden = useAutoHideHeader(open);

  useEscapeKey(open, () => onToggle(false));

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) onToggle(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open, onToggle]);

  const classes = ["nav"];
  if (open) classes.push("is-open");
  if (hidden) classes.push("is-hidden");

  return (
    <nav className={classes.join(" ")} id="nav" ref={navRef}>
      <a className="nav__brand" href={PAGE_PATHS.nl.home} onClick={() => onToggle(false)}>
        {SITE.name}
      </a>

      <button
        type="button"
        className="nav__burger"
        aria-expanded={open}
        aria-controls="navMenu"
        aria-label={t.nav.menu}
        onClick={() => onToggle(!open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div className="nav__links" id="navMenu">
        {NAV_ITEMS.map(({ page: itemPage, labelKey }) => (
          <a
            key={itemPage}
            href={PAGE_PATHS.nl[itemPage]}
            className={page === itemPage ? "is-active" : undefined}
            onClick={() => onToggle(false)}
          >
            {t.nav[labelKey]}
          </a>
        ))}
      </div>
    </nav>
  );
}
