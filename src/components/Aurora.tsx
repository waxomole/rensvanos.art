const BLOB_COUNT = 5;
const SPLAT_COUNT = 3;

/** Fixed background: soft aurora blobs + blurred ink splatters behind the glass panels. */
export function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      {Array.from({ length: BLOB_COUNT }, (_, i) => (
        <div key={`blob-${i + 1}`} className={`aurora__blob aurora__blob--${i + 1}`} />
      ))}
      {Array.from({ length: SPLAT_COUNT }, (_, i) => (
        <div key={`splat-${i + 1}`} className={`aurora__splat aurora__splat--${i + 1}`} />
      ))}
      <div className="aurora__grain" />
    </div>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
