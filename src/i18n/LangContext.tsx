import { createContext, useContext, type ReactNode } from "react";
import type { Lang } from "../data/site";
import { dictionaries, type Dictionary } from "./dictionary";

const LangContext = createContext<Lang>("nl");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

/** Active dictionary; the language never changes within a page load. */
export function useT(): Dictionary {
  return dictionaries[useContext(LangContext)];
}
