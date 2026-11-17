import { useState, type ReactNode } from "react";
import type { PageId } from "../data/site";
import { useAutoHideHeader } from "../hooks/useAutoHideHeader";
import { Aurora } from "./Aurora";
import { InkSplash } from "./InkSplash";
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
 * the same signal: on scroll-down the two pills pull together like drops of
 * water (the nav morphs into a single round pen button, the utility pill
 * docks into it) and the merged pill then fades out slowly; scrolling up
 * pulls them apart again.
 *
 * The cursor effects split the work: InkTrail draws the pen line (desktop),
 * InkSplash marks every tap/click with a small ink drop.
 */
export function Layout({ page, children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hidden = useAutoHideHeader(menuOpen);

  return (
    <>
      <Aurora />
      <InkSplash />
      <InkTrail />
      <SiteNav page={page} open={menuOpen} hidden={hidden} onToggle={setMenuOpen} />
      <UtilityPill page={page} hidden={hidden} />
      {children}
      <SiteFooter />
    </>
  );
}
