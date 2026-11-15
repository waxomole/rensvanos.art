import { useState, type ReactNode } from "react";
import type { PageId } from "../data/site";
import { Aurora } from "./Aurora";
import { InkTrail } from "./InkTrail";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { UtilityPill } from "./UtilityPill";

interface LayoutProps {
  page: PageId;
  children: ReactNode;
}

/**
 * Shared page chrome: ink background, glass nav (burger on mobile),
 * utility pill (EN + Instagram), content, footer, ink-trail cursor.
 */
export function Layout({ page, children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Aurora />
      <InkTrail />
      <SiteNav page={page} open={menuOpen} onToggle={setMenuOpen} />
      <UtilityPill page={page} menuOpen={menuOpen} />
      {children}
      <SiteFooter />
    </>
  );
}
