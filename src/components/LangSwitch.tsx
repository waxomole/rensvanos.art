import { Link } from "react-router-dom";
import { PAGE_PATHS, type Lang, type PageId } from "../data/site";
import { useLang } from "../i18n/LangContext";

/** Links to the equivalent page in the other language. */
export function LangSwitch({ currentPage, onNavigate }: { currentPage: PageId; onNavigate?: () => void }) {
  const lang = useLang();
  const other: Lang = lang === "nl" ? "en" : "nl";
  return (
    <Link
      className="lang-switch"
      to={PAGE_PATHS[other][currentPage]}
      lang={other}
      hrefLang={other}
      onClick={onNavigate}
    >
      {other.toUpperCase()}
    </Link>
  );
}
