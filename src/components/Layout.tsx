import type { ReactNode } from "react";
import type { PageId } from "../data/site";
import { Aurora } from "./Aurora";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

interface LayoutProps {
  page: PageId;
  children: ReactNode;
}

/** Shared page chrome: ink background, glass nav, content, footer. */
export function Layout({ page, children }: LayoutProps) {
  return (
    <>
      <Aurora />
      <SiteNav page={page} />
      {children}
      <SiteFooter />
    </>
  );
}
