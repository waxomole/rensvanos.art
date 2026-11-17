import { useT } from "../i18n/LangContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { Reveal } from "../components/Reveal";

function PortraitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M4.8 20c1.2-4 4-5.8 7.2-5.8s6 1.8 7.2 5.8" />
    </svg>
  );
}

export function AboutPage() {
  const t = useT();
  const a = t.about;
  usePageMeta("about");
  return (
    <>
      <header className="hero hero--page" id="top">
        <Reveal>
          <p className="hero__kicker">{a.eyebrow}</p>
          <h1 className="hero__title">{a.title}</h1>
        </Reveal>
      </header>

      <main>
        <section className="about" id="over">
          <figure className="about__portrait glass reveal">
            <div className="about__portrait-slot" aria-hidden="true">
              <PortraitIcon />
              <span>{a.portraitPlaceholder}</span>
            </div>
          </figure>
          <Reveal className="about__text">
            {a.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p className="about__sig">{a.signature}</p>
          </Reveal>
        </section>
      </main>
    </>
  );
}
