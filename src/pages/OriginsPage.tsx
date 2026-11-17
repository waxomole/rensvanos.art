import { Link } from "react-router-dom";
import { PAGE_PATHS } from "../data/site";
import { useLang, useT } from "../i18n/LangContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { asset } from "../lib/assets";
import { Reveal } from "../components/Reveal";

/**
 * "Ontstaan" — the story of how a drawing comes into being, told as a
 * vertical timeline: a drawn thread down the middle of the page with dots
 * that stitch photo (placeholder artwork) and text panels together.
 */
export function OriginsPage() {
  usePageMeta("origins");
  const t = useT();
  const lang = useLang();

  return (
    <>
      <section className="hero hero--page">
        <p className="hero__kicker">{t.origins.eyebrow}</p>
        <h1 className="hero__title">{t.origins.title}</h1>
        <p className="hero__sub">{t.origins.intro}</p>
      </section>

      <section className="timeline">
        <ol className="timeline__list">
          {t.origins.steps.map((step, index) => (
            <li
              key={step.title}
              className={index % 2 ? "timeline__item timeline__item--flip" : "timeline__item"}
            >
              <Reveal className="timeline__media glass">
                <img src={asset(step.image)} alt={step.alt} loading="lazy" decoding="async" />
              </Reveal>
              <Reveal className="timeline__card glass">
                <span className="timeline__num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="timeline__title">{step.title}</h2>
                <p className="timeline__body">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline__outro">
        <p>
          {t.origins.ctaText}
          <Link to={PAGE_PATHS[lang].work}>{t.origins.ctaLink}</Link>
          {t.origins.ctaSuffix}
          <Link to={PAGE_PATHS[lang].commissions}>{t.origins.ctaLink2}</Link>
          {t.origins.ctaSuffix2}
        </p>
      </section>
    </>
  );
}
