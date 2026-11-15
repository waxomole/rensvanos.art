import { ARTWORKS, localized } from "../data/artworks";
import { PAGE_PATHS, SITE } from "../data/site";
import { useLang, useT } from "../i18n/LangContext";
import { GalleryGrid } from "../components/GalleryGrid";
import { Reveal } from "../components/Reveal";
import { asset } from "../lib/assets";

export function HomePage() {
  const t = useT();
  const lang = useLang();
  const featured = ARTWORKS[2];

  return (
    <>
      <header className="hero" id="top">
        <Reveal className="hero__inner">
          <p className="hero__kicker">{t.home.kicker}</p>
          <h1 className="hero__title">{SITE.name}</h1>
          <p className="hero__sub">{t.home.sub}</p>
          <div className="hero__actions">
            <a className="btn btn--glass" href={PAGE_PATHS.nl.work}>
              {t.home.ctaWork}
            </a>
            <a className="btn btn--ink" href={PAGE_PATHS.nl.about}>
              {t.home.ctaAbout}
            </a>
          </div>
        </Reveal>
        <div className="hero__frame glass reveal">
          <img src={asset("art/artwork-01.svg")} alt={localized(ARTWORKS[0], "alt", lang)} loading="eager" />
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
            <a className="btn btn--glass" href={PAGE_PATHS.nl.work}>
              {t.home.featuredCta}
            </a>
          </Reveal>
          <figure className="featured__figure glass reveal">
            <img src={asset(featured.src)} alt={localized(featured, "alt", lang)} loading="lazy" />
            <figcaption>{t.home.featuredCaption}</figcaption>
          </figure>
        </section>

        <section className="gallery" id="werk">
          <Reveal className="gallery__head">
            <p className="eyebrow">{t.home.galleryEyebrow}</p>
            <h2>{t.home.galleryTitle}</h2>
            <p className="gallery__intro">
              {t.home.galleryIntroPrefix}
              <a href={PAGE_PATHS.nl.work}>{t.home.galleryIntroLink}</a>
              {t.home.galleryIntroSuffix}
            </p>
          </Reveal>
          <GalleryGrid limit={3} />
          <Reveal className="gallery__more">
            <a className="btn btn--ink" href={PAGE_PATHS.nl.work}>
              {t.home.galleryMore}
            </a>
          </Reveal>
        </section>
      </main>
    </>
  );
}
