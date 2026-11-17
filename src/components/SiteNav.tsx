import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PAGE_PATHS, SITE, type PageId } from "../data/site";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useT } from "../i18n/LangContext";
import { InstagramIcon } from "./Aurora";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { page: "work", labelKey: "work" },
  { page: "origins", labelKey: "origins" },
  { page: "about", labelKey: "about" },
  { page: "commissions", labelKey: "commissions" },
] as const;

function PenNibIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21 C8.2 15.8 6 12 6 9 C6 6 8.7 3.8 12 3.8 C15.3 3.8 18 6 18 9 C18 12 15.8 15.8 12 21 Z" />
      <circle cx="12" cy="9" r="1.2" />
      <path d="M12 10.2 L12 19" />
    </svg>
  );
}

interface SiteNavProps {
  page: PageId;
  open: boolean;
  /** Scrolling down — merge into the single pen button, then fade. */
  hidden: boolean;
  onToggle: (open: boolean) => void;
}

/**
 * Glass pill with brand + page links on desktop (anchored left); below
 * 700px a compact corner pill with a glass burger button; below 380px both
 * top pills collapse into a single round pen-nib button whose menu carries
 * the page links plus EN, dark mode and Instagram. Scrolling down merges
 * the two pills into that single pen button and fades it out slowly;
 * scrolling up brings both pills back, separated.
 */
export function SiteNav({ page, open, hidden, onToggle }: SiteNavProps) {
  const t = useT();
  const navRef = useRef<HTMLElement>(null);

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
  if (hidden) classes.push("is-merged", "is-hidden");

  const close = () => onToggle(false);

  return (
    <nav className={classes.join(" ")} id="nav" ref={navRef}>
      <Link className="nav__brand" to={PAGE_PATHS.nl.home} onClick={close}>
        {SITE.name}
      </Link>

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
        <PenNibIcon />
      </button>

      <div className="nav__links" id="navMenu">
        {NAV_ITEMS.map(({ page: itemPage, labelKey }) => (
          <Link
            key={itemPage}
            to={PAGE_PATHS.nl[itemPage]}
            className={page === itemPage ? "is-active" : undefined}
            onClick={close}
          >
            {t.nav[labelKey]}
          </Link>
        ))}

        {/* Small screens only: the utility pill collapses into the menu. */}
        <div className="nav__extras">
          <LangSwitch currentPage={page} onNavigate={close} />
          <ThemeToggle />
          <a href={SITE.instagram} target="_blank" rel="noopener" className="utility__insta" aria-label={t.nav.instagram}>
            <InstagramIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}
