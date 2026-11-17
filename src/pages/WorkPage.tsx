import { useT } from "../i18n/LangContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { GalleryGrid } from "../components/GalleryGrid";
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
          <p className="hero__sub">{t.work.intro}</p>
        </Reveal>
      </header>

      <main>
        <section className="gallery" id="collectie">
          <GalleryGrid />
        </section>
      </main>
    </>
  );
}
