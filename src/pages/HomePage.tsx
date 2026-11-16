import { Link } from "react-router-dom";
import { ARTWORKS, localized } from "../data/artworks";
import { PAGE_PATHS, SITE } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { useLang, useT } from "../i18n/LangContext";
import { GalleryGrid } from "../components/GalleryGrid";
import { Reveal } from "../components/Reveal";
import { asset } from "../lib/assets";

export function HomePage() {
  const t = useT();
  const lang = useLang();
  const featured = ARTWORKS[2];

  usePageMeta("home");

  return (
    <>
      <header className="hero" id="top">
        <Reveal className="hero__inner">
          <p className="hero__kicker">{t.home.kicker}</p>
          <h1 className="hero__title">{SITE.name}</h1>
          <p className="hero__sub">{t.home.sub}</p>
          <div className="hero__actions">
            <Link className="btn btn--glass" to={PAGE_PATHS.nl.work}>
              {t.home.ctaWork}
            </Link>
            <Link className="btn btn--ink" to={PAGE_PATHS.nl.about}>
              {t.home.ctaAbout}
            </Link>
          </div>
        </Reveal>
        <div className="hero__frame glass reveal">
          <img src={asset("art/artwork-01.svg")} alt={localized(ARTWORKS[0], "alt", lang)} loading="eager" fetchPriority="high" decoding="async" />
        </div>
      </header>

      <main>
        <section className="quote" aria-label={t.home.quoteLabel}>
          <Reveal className="glass quote__panel">
            <span className="quote__mark" aria-hidden="true">
              &lsquo;&lsquo;
            </span>
            <p>{t.home.quote}</p>
            <span className="quote__mark quote__mark--close" aria-hidden="true">
              &rsquo;&rsquo;
            </span>
          </Reveal>
        </section>

        <section className="featured" id="uitgelicht">
          <Reveal className="featured__text">
            <p className="eyebrow">{t.home.featuredEyebrow}</p>
            <h2>{t.home.featuredTitle}</h2>
            <p>{t.home.featuredBody}</p>
            <Link className="btn btn--glass" to={PAGE_PATHS.nl.work}>
              {t.home.featuredCta}
            </Link>
          </Reveal>
          <figure className="featured__figure glass reveal">
            <img src={asset(featured.src)} alt={localized(featured, "alt", lang)} loading="lazy" decoding="async" />
            <figcaption>{t.home.featuredCaption}</figcaption>
          </figure>
        </section>

        <section className="gallery" id="werk">
          <Reveal className="gallery__head">
            <p className="eyebrow">{t.home.galleryEyebrow}</p>
            <h2>{t.home.galleryTitle}</h2>
            <p className="gallery__intro">
              {t.home.galleryIntroPrefix}
              <Link to={PAGE_PATHS.nl.work}>{t.home.galleryIntroLink}</Link>
              {t.home.galleryIntroSuffix}
            </p>
          </Reveal>
          <GalleryGrid limit={3} />
          <Reveal className="gallery__more">
            <Link className="btn btn--ink" to={PAGE_PATHS.nl.work}>
              {t.home.galleryMore}
            </Link>
          </Reveal>
        </section>
      </main>
    </>
  );
}
