import { SITE } from "../data/site";
import { useAutoHideHeader } from "../hooks/useAutoHideHeader";
import { useT } from "../i18n/LangContext";
import { InstagramIcon } from "./Aurora";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

interface UtilityPillProps {
  page: import("../data/site").PageId;
  /** The burger menu is open — stay visible. */
  menuOpen: boolean;
}

/** Separate glass pill, top-right: language switch, theme toggle, Instagram. */
export function UtilityPill({ page, menuOpen }: UtilityPillProps) {
  const t = useT();
  const hidden = useAutoHideHeader(menuOpen);

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
