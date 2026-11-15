import { useT } from "../i18n/LangContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { EnquiryForm } from "../components/EnquiryForm";
import { Reveal } from "../components/Reveal";

export function CommissionsPage() {
  const t = useT();
  const c = t.commissions;
  usePageMeta("commissions");
  return (
    <>
      <header className="hero hero--page" id="top">
        <Reveal>
          <p className="hero__kicker">{c.kicker}</p>
          <h1 className="hero__title">{c.title}</h1>
        </Reveal>
      </header>

      <main>
        <section className="shop" id="commissies">
          <Reveal className="shop__head">
            <p className="eyebrow">{c.eyebrow}</p>
            <h2>{c.title}</h2>
            <p className="gallery__intro">{c.intro}</p>
          </Reveal>
          <div className="shop__cards">
            <article className="glass shop__card reveal">
              <h3>{c.printsCard.heading}</h3>
              <p>{c.printsCard.body}</p>
              <a className="btn btn--ink" href="#aanvraag">
                {c.printsCard.cta}
              </a>
            </article>
            <article className="glass shop__card reveal">
              <h3>{c.commissionsCard.heading}</h3>
              <p>{c.commissionsCard.body}</p>
              <a className="btn btn--ink" href="#aanvraag">
                {c.commissionsCard.cta}
              </a>
            </article>
          </div>
        </section>

        <EnquiryForm />
      </main>
    </>
  );
}
