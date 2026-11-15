import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, type PageId } from "../data/site";
import { useLang, useT } from "../i18n/LangContext";

/**
 * Per-route document metadata. The single HTML shell ships with home-page
 * defaults; every route overwrites title, description, canonical URL and the
 * Open Graph/Twitter fields so shared links and search results stay correct.
 */
export function usePageMeta(page: PageId | "notfound") {
  const lang = useLang();
  const t = useT();
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;

    const meta = t.meta[page];
    const url = `https://${SITE.domain}${pathname}`;
    document.title = `${meta.title} — ${SITE.name}`;
    setMeta("description", meta.description);
    setMeta("og:title", `${meta.title} — ${SITE.name}`, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:url", url, true);
    setMeta("twitter:title", `${meta.title} — ${SITE.name}`, true);
    setMeta("twitter:description", meta.description, true);
    setCanonical(url);
  }, [lang, t, page, pathname]);
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}
