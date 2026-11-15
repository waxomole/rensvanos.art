import { useEffect, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LEGACY_PATHS, PAGE_PATHS, type Lang, type PageId } from "./data/site";
import { LangProvider } from "./i18n/LangContext";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { CommissionsPage } from "./pages/CommissionsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { WorkPage } from "./pages/WorkPage";

/** Language context + shared chrome around one routed page. */
function Shell({ lang, page, children }: { lang: Lang; page: PageId; children: ReactNode }) {
  return (
    <LangProvider lang={lang}>
      <Layout page={page}>{children}</Layout>
    </LangProvider>
  );
}

/** Restore the scroll position on client-side navigation, like a full page load would. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Unknown paths: serve old .html URLs as redirects, otherwise the 404 sketch. */
function NotFoundRoute() {
  const { pathname } = useLocation();
  const legacy = LEGACY_PATHS[pathname];
  if (legacy) return <Navigate to={legacy} replace />;
  const lang: Lang = pathname.startsWith("/en") ? "en" : "nl";
  return (
    <LangProvider lang={lang}>
      <Layout page="home">
        <NotFoundPage />
      </Layout>
    </LangProvider>
  );
}

/**
 * Single-page app: one HTML shell, react-router serves every clean URL.
 * GitHub Pages falls back to 404.html (a copy of the shell) for unknown
 * paths, so deep links land here and route to the right page.
 */
export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={PAGE_PATHS.nl.home} element={<Shell lang="nl" page="home"><HomePage /></Shell>} />
        <Route path={PAGE_PATHS.nl.work} element={<Shell lang="nl" page="work"><WorkPage /></Shell>} />
        <Route path={PAGE_PATHS.nl.about} element={<Shell lang="nl" page="about"><AboutPage /></Shell>} />
        <Route path={PAGE_PATHS.nl.commissions} element={<Shell lang="nl" page="commissions"><CommissionsPage /></Shell>} />
        <Route path={PAGE_PATHS.en.home} element={<Shell lang="en" page="home"><HomePage /></Shell>} />
        <Route path={PAGE_PATHS.en.work} element={<Shell lang="en" page="work"><WorkPage /></Shell>} />
        <Route path={PAGE_PATHS.en.about} element={<Shell lang="en" page="about"><AboutPage /></Shell>} />
        <Route path={PAGE_PATHS.en.commissions} element={<Shell lang="en" page="commissions"><CommissionsPage /></Shell>} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </>
  );
}
