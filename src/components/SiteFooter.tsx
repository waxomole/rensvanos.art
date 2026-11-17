import { SITE } from "../data/site";
import { useLang, useT } from "../i18n/LangContext";
import { CityscapeLine } from "./CityscapeLine";
import { MailLink } from "./MailLink";

export function SiteFooter() {
  const t = useT();
  const lang = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="glass footer__panel">
        {/* A one-line Dutch skyline, redrawn per visit — Woerden, Utrecht,
            Rotterdam, …. Subtle pen line above the signature. */}
        <CityscapeLine className="footer__skyline" />
        <p className="footer__title">{SITE.name}</p>
        <p className="footer__meta">{SITE.location[lang]}</p>
        <div className="footer__links">
          <MailLink />
          <a href={SITE.instagram} target="_blank" rel="noopener">
            Instagram — {SITE.instagramHandle}
          </a>
        </div>
        <p className="footer__copy">
          © {year} {SITE.name}. {t.footer.copy}
        </p>
      </div>
    </footer>
  );
}
