import { useState, type ReactNode } from "react";
import type { PageId } from "../data/site";
import { useAutoHideHeader } from "../hooks/useAutoHideHeader";
import { Aurora } from "./Aurora";
import { CursorGlow } from "./CursorGlow";
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
 *
 * The scroll-hide state lives here so the nav and utility pill react to
 * the same signal: on scroll-down the utility pill tucks itself away while
 * the nav collapses to a single round pen button, then the merged pill
 * fades out slowly; scrolling up brings both pills back, separated.
 */
export function Layout({ page, children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hidden = useAutoHideHeader(menuOpen);

  return (
    <>
      <Aurora />
      <CursorGlow />
      <InkTrail />
      <SiteNav page={page} open={menuOpen} hidden={hidden} onToggle={setMenuOpen} />
      <UtilityPill page={page} hidden={hidden} />
      {children}
      <SiteFooter />
    </>
  );
}
