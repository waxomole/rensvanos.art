export type Lang = "nl" | "en";

export const PAGES = ["home", "work", "about", "commissions"] as const;
export type PageId = (typeof PAGES)[number];

/**
 * Clean URLs — the site is a single-page app (one HTML shell) and react-router
 * serves every path. On GitHub Pages, unknown paths fall back to 404.html (a
 * copy of index.html), so deep links still resolve to the right page.
 */
export const PAGE_PATHS: Record<Lang, Record<PageId, string>> = {
  nl: {
    home: "/",
    work: "/werk",
    about: "/over-mij",
    commissions: "/commissies",
  },
  en: {
    home: "/en",
    work: "/en/work",
    about: "/en/about",
    commissions: "/en/commissions",
  },
};

/** Pre-SPA URLs that may still circulate (bookmarks, search results) — redirected client-side. */
export const LEGACY_PATHS: Record<string, string> = {
  "/index.html": "/",
  "/werk.html": "/werk",
  "/over-mij.html": "/over-mij",
  "/commissies.html": "/commissies",
  "/en/index.html": "/en",
  "/en/work.html": "/en/work",
  "/en/about.html": "/en/about",
  "/en/commissions.html": "/en/commissions",
};

export const SITE = {
  name: "Rens van Os",
  domain: "rensvanos.art",
  instagram: "https://www.instagram.com/r.os_art/",
  instagramHandle: "@r.os_art",
  location: { nl: "Woerden, Nederland", en: "Woerden, the Netherlands" },
} as const;

/**
 * Contact address for prints & commissions. Deliberately never stored as a
 * single plaintext string: the user part is base64-encoded and the domain is
 * assembled at runtime, so casual email-harvesting bots that scrape the HTML
 * source or JS bundle find nothing to match on.
 */
const CONTACT_USER_ENCODED = "cHJpbnRz"; // base64 of the mailbox name
const CONTACT_DOMAIN_PARTS = ["rensvanos", "art"] as const;

export function contactEmail(): string {
  const user = atob(CONTACT_USER_ENCODED);
  return `${user}@${CONTACT_DOMAIN_PARTS.join(".")}`;
}

/** Human-readable fallback shown before JS assembles the real link: "prints (at) rensvanos (dot) art". */
export function maskedEmail(): string {
  return `${atob(CONTACT_USER_ENCODED)} (at) ${CONTACT_DOMAIN_PARTS.join(" (dot) ")}`;
}
