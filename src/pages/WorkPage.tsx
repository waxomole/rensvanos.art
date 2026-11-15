import { useT } from "../i18n/LangContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { GalleryGrid } from "../components/GalleryGrid";
import { InstagramSection } from "../components/InstagramSection";
import { Reveal } from "../components/Reveal";

export function WorkPage() {
  const t = useT();
  usePageMeta("work");
  return (
    <>
      <header className="hero hero--page" id="top">
        <Reveal>
          <p className="hero__kicker">{t.work.eyebrow}</p>
          <h1 className="hero__title">{t.work.title}</h1>
        </Reveal>
      </header>

      <main>
        <section className="gallery" id="collectie">
          <Reveal className="gallery__head">
            <p className="eyebrow">{t.work.eyebrow}</p>
            <h2>{t.work.title}</h2>
            <p className="gallery__intro">{t.work.intro}</p>
          </Reveal>
          <GalleryGrid />
        </section>

        <InstagramSection />
      </main>
    </>
  );
}
