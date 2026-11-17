import { localized, type Artwork } from "../data/artworks";
import { asset } from "../lib/assets";
import { useLang } from "../i18n/LangContext";
import { useReveal } from "../hooks/useReveal";

interface ArtCardProps {
  art: Artwork;
  index: number;
  onOpen: (index: number) => void;
}

/** Stagger between cards in one row, so they slide in as a loose wave. */
const STAGGER_MS = 110;

export function ArtCard({ art, index, onOpen }: ArtCardProps) {
  const lang = useLang();
  const ref = useReveal<HTMLDivElement>();
  const open = () => onOpen(index);

  return (
    /* The reveal lives on a wrapper: the card inside keeps its own snappy
       hover transition without clashing with the slow slide-in. */
    <div
      ref={ref}
      className="reveal reveal--sketch"
      style={{ transitionDelay: `${(index % 3) * STAGGER_MS}ms` }}
    >
      <article
        className="art-card glass"
        role="button"
        tabIndex={0}
        aria-label={localized(art, "title", lang)}
        onClick={open}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
          }
        }}
      >
        <img className="art-card__img" src={asset(art.src)} alt={localized(art, "alt", lang)} loading="lazy" decoding="async" />
        <div className="art-card__caption">
          <span className="art-card__title">{localized(art, "title", lang)}</span>
          <span className="art-card__tag">{localized(art, "tag", lang)}</span>
        </div>
      </article>
    </div>
  );
}
