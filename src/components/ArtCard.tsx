import { localized, type Artwork } from "../data/artworks";
import { asset } from "../lib/assets";
import { useLang } from "../i18n/LangContext";
import { useReveal } from "../hooks/useReveal";

interface ArtCardProps {
  art: Artwork;
  index: number;
  onOpen: (index: number) => void;
}

export function ArtCard({ art, index, onOpen }: ArtCardProps) {
  const lang = useLang();
  const ref = useReveal<HTMLElement>();
  const open = () => onOpen(index);

  return (
    <article
      ref={ref}
      className="art-card glass reveal"
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
      <img className="art-card__img" src={asset(art.src)} alt={localized(art, "alt", lang)} loading="lazy" />
      <div className="art-card__caption">
        <span className="art-card__title">{localized(art, "title", lang)}</span>
        <span className="art-card__tag">{localized(art, "tag", lang)}</span>
      </div>
    </article>
  );
}
