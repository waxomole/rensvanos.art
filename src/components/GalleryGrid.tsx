import { useCallback, useState } from "react";
import { ARTWORKS } from "../data/artworks";
import { ArtCard } from "./ArtCard";
import { Lightbox } from "./Lightbox";

interface GalleryGridProps {
  /** Show only the first N works (home page teaser). Omit for the full collection. */
  limit?: number;
}

/** Renders the artwork manifest as clickable glass cards with a shared lightbox. */
export function GalleryGrid({ limit }: GalleryGridProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const artworks = limit ? ARTWORKS.slice(0, limit) : ARTWORKS;

  const close = useCallback(() => setSelected(null), []);
  const navigate = useCallback((step: number) => {
    setSelected((current) =>
      current === null ? null : (current + step + ARTWORKS.length) % ARTWORKS.length,
    );
  }, []);

  return (
    <>
      <div className="gallery__grid">
        {artworks.map((art, index) => (
          <ArtCard key={art.src} art={art} index={index} onOpen={setSelected} />
        ))}
      </div>
      {selected !== null && (
        <Lightbox
          art={ARTWORKS[selected]}
          onClose={close}
          onNavigate={navigate}
        />
      )}
    </>
  );
}
