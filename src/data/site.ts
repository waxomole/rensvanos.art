export type Lang = "nl" | "en";

export const PAGES = ["home", "work", "about", "commissions"] as const;
export type PageId = (typeof PAGES)[number];

/** Root-relative paths — identical to the deployed URLs, so sharing deep links keeps working. */
export const PAGE_PATHS: Record<Lang, Record<PageId, string>> = {
  nl: {
    home: "/index.html",
    work: "/werk.html",
    about: "/over-mij.html",
    commissions: "/commissies.html",
  },
  en: {
    home: "/en/index.html",
    work: "/en/work.html",
    about: "/en/about.html",
    commissions: "/en/commissions.html",
  },
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
