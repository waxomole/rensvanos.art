import { INSTAGRAM_POSTS } from "../data/artworks";
import { SITE } from "../data/site";
import { useT } from "../i18n/LangContext";
import { Reveal } from "./Reveal";

/** Extracts the post shortcode from any Instagram URL variant. */
function shortcode(post: string): string {
  return post.split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? "";
}

/** Embedded Instagram posts; the whole section hides when the list is empty. */
export function InstagramSection() {
  const t = useT();
  if (INSTAGRAM_POSTS.length === 0) return null;

  return (
    <section className="insta" id="instagram">
      <Reveal className="insta__head">
        <p className="eyebrow">{t.work.instaEyebrow}</p>
        <h2>{t.work.instaTitle}</h2>
        <p className="insta__intro">
          {t.work.instaIntroPrefix}
          <a href={SITE.instagram} target="_blank" rel="noopener">
            {t.work.instaIntroHandle}
          </a>
          {t.work.instaIntroSuffix}
        </p>
      </Reveal>
      <div className="insta__grid">
        {INSTAGRAM_POSTS.map((post) => (
          <div key={post} className="insta__embed glass">
            <iframe
              src={`https://www.instagram.com/p/${shortcode(post)}/embed`}
              title="Instagram post"
              loading="lazy"
              scrolling="no"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
