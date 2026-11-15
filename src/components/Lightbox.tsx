import { useEffect, useRef } from "react";
import { localized, type Artwork } from "../data/artworks";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { asset } from "../lib/assets";
import { useLang, useT } from "../i18n/LangContext";
import { MailLink } from "./MailLink";

interface LightboxProps {
  art: Artwork;
  onClose: () => void;
  onNavigate: (step: number) => void;
}

/** Full-screen glass detail view: image, title, availability and enquiry link. */
export function Lightbox({ art, onClose, onNavigate }: LightboxProps) {
  const t = useT();
  const lang = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const sold = art.status === "uitverkocht";

  useBodyScrollLock(true);
  useEscapeKey(true, onClose);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t.lightbox.label}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target === event.currentTarget || target.classList.contains("lightbox__backdrop")) {
          onClose();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") onNavigate(-1);
        if (event.key === "ArrowRight") onNavigate(1);
      }}
    >
      <div className="lightbox__backdrop" />
      <div className="lightbox__panel glass">
        <img
          className="lightbox__img"
          src={asset(art.src)}
          alt={localized(art, "alt", lang)}
        />
        <div className="lightbox__info">
          <h3 className="lightbox__title">{localized(art, "title", lang)}</h3>
          <p className="lightbox__meta">
            {[localized(art, "tag", lang), art.year].filter(Boolean).join(" · ")}
          </p>
          <p className={sold ? "lightbox__status is-sold" : "lightbox__status"}>
            {t.lightbox.status[art.status]}
          </p>
          {sold && <p className="lightbox__note">{t.lightbox.soldNote}</p>}
          {!sold && (
            <MailLink subject={`${t.lightbox.enquirySubject}${localized(art, "title", lang)}`}>
              <span className="btn btn--ink">{t.lightbox.enquire}</span>
            </MailLink>
          )}
        </div>
        <button ref={closeRef} type="button" className="lightbox__close" aria-label={t.lightbox.close} onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label={t.lightbox.prev} onClick={() => onNavigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button type="button" className="lightbox__nav lightbox__nav--next" aria-label={t.lightbox.next} onClick={() => onNavigate(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
