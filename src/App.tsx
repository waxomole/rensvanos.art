import type { PageId } from "./data/site";
import { LangProvider } from "./i18n/LangContext";
import type { Lang } from "./data/site";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { CommissionsPage } from "./pages/CommissionsPage";
import { HomePage } from "./pages/HomePage";
import { WorkPage } from "./pages/WorkPage";

export interface AppProps {
  lang: Lang;
  page: PageId;
}

function Page({ page }: { page: PageId }) {
  switch (page) {
    case "home":
      return <HomePage />;
    case "work":
      return <WorkPage />;
    case "about":
      return <AboutPage />;
    case "commissions":
      return <CommissionsPage />;
  }
}

export function App({ lang, page }: AppProps) {
  return (
    <LangProvider lang={lang}>
      <Layout page={page}>
        <Page page={page} />
      </Layout>
    </LangProvider>
  );
}
