import { SITE } from "../data/site";
import { useT } from "../i18n/LangContext";
import { InstagramIcon } from "./Aurora";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

interface UtilityPillProps {
  page: import("../data/site").PageId;
  /** Scrolling down — tuck away so the nav pill carries everything. */
  hidden: boolean;
}

/** Separate glass pill, top-right: language switch, theme toggle, Instagram. */
export function UtilityPill({ page, hidden }: UtilityPillProps) {
  const t = useT();

  return (
    <div className={hidden ? "utility is-hidden" : "utility"}>
      <LangSwitch currentPage={page} />
      <ThemeToggle />
      <a href={SITE.instagram} target="_blank" rel="noopener" className="utility__insta" aria-label={t.nav.instagram}>
        <InstagramIcon />
      </a>
    </div>
  );
}
