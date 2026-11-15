import { useEffect, useRef, useState } from "react";
import { PAGE_PATHS, SITE, type PageId } from "../data/site";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useT } from "../i18n/LangContext";
import { InstagramIcon } from "./Aurora";
import { LangSwitch } from "./LangSwitch";

const NAV_ITEMS = [
  { page: "work", labelKey: "work" },
  { page: "about", labelKey: "about" },
  { page: "commissions", labelKey: "commissions" },
] as const;

/**
 * Fixed glass pill with brand + links on desktop; collapses to a compact
 * corner pill with a glass burger button below 700px. The dropdown menu
 * closes on link tap, outside tap or Escape.
 */
export function SiteNav({ page }: { page: PageId }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEscapeKey(open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <nav className={open ? "nav is-open" : "nav"} id="nav" ref={navRef}>
      <a className="nav__brand" href={PAGE_PATHS.nl.home} onClick={() => setOpen(false)}>
        {SITE.name}
      </a>

      <button
        type="button"
        className="nav__burger"
        aria-expanded={open}
        aria-controls="navMenu"
        aria-label={t.nav.menu}
        onClick={() => setOpen((value) => !value)}
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
            onClick={() => setOpen(false)}
          >
            {t.nav[labelKey]}
          </a>
        ))}
        <LangSwitch currentPage={page} onNavigate={() => setOpen(false)} />
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener"
          className="nav__insta"
          aria-label={t.nav.instagram}
          onClick={() => setOpen(false)}
        >
          <InstagramIcon />
        </a>
      </div>
    </nav>
  );
}
