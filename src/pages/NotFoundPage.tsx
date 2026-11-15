import { Link } from "react-router-dom";
import { PAGE_PATHS } from "../data/site";
import { useLang, useT } from "../i18n/LangContext";
import { usePageMeta } from "../hooks/usePageMeta";

/**
 * 404 — "Deze pagina is nog niet uitgetekend." The sketch starts confident
 * on the left and peters out into guide lines on the right, like a drawing
 * that was never finished.
 */
export function NotFoundPage() {
  const t = useT();
  const lang = useLang();

  usePageMeta("notfound");

  return (
    <main className="notfound">
      <div className="notfound__panel glass">
        <svg
          className="notfound__sketch"
          viewBox="0 0 320 180"
          fill="none"
          role="img"
          aria-label={t.notfound.message}
        >
          {/* finished strokes on the left */}
          <path
            d="M28 132 C40 96 52 64 74 44 C92 28 112 30 120 50 C128 72 116 96 96 104 C80 110 64 106 58 94"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M74 44 C86 40 100 46 106 58"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M150 118 C158 92 170 70 188 58"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* fading middle */}
          <path
            d="M188 58 C202 50 216 50 226 58 C234 66 232 78 222 84"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="10 7"
            opacity="0.55"
          />
          {/* bare guide lines on the right */}
          <path d="M232 96 C244 92 258 92 268 98" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 8" opacity="0.4" strokeLinecap="round" />
          <path d="M240 112 C252 108 264 108 274 112" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 9" opacity="0.28" strokeLinecap="round" />
          <path d="M120 140 C160 132 220 130 272 136" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 10" opacity="0.22" strokeLinecap="round" />
        </svg>
        <h1 className="notfound__title">{t.notfound.message}</h1>
        <p className="notfound__body">{t.notfound.body}</p>
        <Link className="btn btn--ink" to={PAGE_PATHS[lang].home}>
          {t.notfound.cta}
        </Link>
      </div>
    </main>
  );
}
