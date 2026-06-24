import React, { useEffect, useMemo, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';
import DataSourceSelectForEn from '@site/src/components/DataSourceSelectForEn3';
import DataSourceSelectZh from '@site/src/components/DataSourceSelect3';
import { getConnectionLinkData } from '@site/src/data/connectionLinkModules';
import { slugifyConnectionTarget } from '@site/src/utils/connectionSlug';

type SourcePage = {
  sourceDocId: string;
  sourceType: string;
  sourceTitle: string;
  sourceSlug: string;
  linksPath: string;
  targets: string[];
  href: string;
};

type ConnectionRouteData = {
  docsDir: string;
  sourceType: string;
  sourceTitle: string;
  sourceSlug: string;
  sourceDocId: string;
  target: string;
  targetSlug: string;
  linksPath: string;
  routePath: string;
  sidebarItems: unknown[];
  sourcePages?: SourcePage[];
};

type Props = {
  routeData: ConnectionRouteData;
};

type ActiveRoute = SourcePage & {
  target: string;
  targetSlug: string;
  routePath: string;
};

function normalizePath(path: string) {
  return path.replace(/\/+$/, '');
}

function getConnectionBasePath(routePath: string) {
  return normalizePath(routePath).replace(/\/[^/]+$/, '');
}

function getRoutePath(connectionBasePath: string, sourceSlug: string, target: string) {
  return `${connectionBasePath}/${sourceSlug}-to-${slugifyConnectionTarget(target)}/`;
}

function toSourcePage(routeData: ConnectionRouteData): SourcePage {
  return {
    sourceDocId: routeData.sourceDocId,
    sourceType: routeData.sourceType,
    sourceTitle: routeData.sourceTitle,
    sourceSlug: routeData.sourceSlug,
    linksPath: routeData.linksPath,
    targets: [routeData.target],
    href: routeData.routePath,
  };
}

// Strip the locale prefix from a pathname so internal route matching is locale-agnostic.
// Docusaurus registers routes without locale prefixes; on non-default locales the
// pathname from useLocation() includes e.g. '/zh' which we must strip for matching.
function stripLocalePrefix(pathname: string, currentLocale: string, defaultLocale: string) {
  if (currentLocale !== defaultLocale && pathname.startsWith(`/${currentLocale}/`)) {
    return pathname.slice(currentLocale.length + 1); // remove '/zh'
  }
  return pathname;
}

function findRouteFromPath(sourcePages: SourcePage[], connectionBasePath: string, pathname: string, fallback: ActiveRoute, currentLocale?: string, defaultLocale?: string): ActiveRoute {
  const normalizedPath = normalizePath(
    currentLocale && defaultLocale ? stripLocalePrefix(pathname, currentLocale, defaultLocale) : pathname,
  );

  for (const sourcePage of sourcePages) {
    for (const target of sourcePage.targets) {
      const targetSlug = slugifyConnectionTarget(target);
      const routePath = getRoutePath(connectionBasePath, sourcePage.sourceSlug, target);
      const legacyRoutePath = `${connectionBasePath}/${sourcePage.sourceDocId}/${targetSlug}/`;

      if (normalizePath(routePath) === normalizedPath || normalizePath(legacyRoutePath) === normalizedPath) {
        return {
          ...sourcePage,
          target,
          targetSlug,
          routePath,
        };
      }
    }
  }

  return fallback;
}

function withActiveSourceHref(items: unknown[], sourceDocId: string, currentHref: string): unknown[] {
  return items.map((item: any) => {
    if (item.type === 'link' && item.docId === `dataMigrationAndSync/connection/${sourceDocId}`) {
      return { ...item, href: currentHref };
    }

    if (item.type === 'category' && Array.isArray(item.items)) {
      return { ...item, items: withActiveSourceHref(item.items, sourceDocId, currentHref) };
    }

    return item;
  });
}

export default function ConnectionRoutePage({ routeData }: Props) {
  const { siteConfig, i18n } = useDocusaurusContext();
  const location = useLocation();
  const siteBrand = siteConfig.customFields?.siteBrand;
  const productName = siteBrand === 'clougence' ? 'CloudCanal' : siteBrand === 'clouddm' ? 'CloudDM' : 'BladePipe';
  const isChinese = i18n.currentLocale === 'zh';
  const DataSourceSelect = isChinese ? DataSourceSelectZh : DataSourceSelectForEn;
  const sourcePages = useMemo(() => routeData.sourcePages?.length ? routeData.sourcePages : [toSourcePage(routeData)], [routeData]);
  const connectionBasePath = useMemo(() => getConnectionBasePath(routeData.routePath), [routeData.routePath]);
  const fallbackRoute = useMemo<ActiveRoute>(() => ({
    ...toSourcePage(routeData),
    target: routeData.target,
    targetSlug: routeData.targetSlug,
    routePath: routeData.routePath,
  }), [routeData]);
  const [activeRoute, setActiveRoute] = useState<ActiveRoute>(() =>
    findRouteFromPath(sourcePages, connectionBasePath, location.pathname, fallbackRoute, i18n.currentLocale, i18n.defaultLocale)
  );
  const data = getConnectionLinkData(routeData.docsDir, activeRoute.linksPath);
  const pageTitle = isChinese
    ? `${activeRoute.sourceTitle} 到 ${activeRoute.target}`
    : `${activeRoute.sourceTitle} to ${activeRoute.target}`;
  const metaTitle = isChinese ? `${pageTitle} 数据同步链路` : `${pageTitle} Data Pipeline`;
  const description = isChinese
    ? `${productName} 支持从 ${activeRoute.sourceTitle} 到 ${activeRoute.target} 的数据迁移、实时同步、CDC、数据校验和异构链路能力，查看链路功能、前置条件、限制和 FAQ。`
    : `${productName} supports ${activeRoute.sourceTitle} to ${activeRoute.target} data pipelines for migration, real-time sync, CDC, verification, and heterogeneous integration. View capabilities, prerequisites, limits, and FAQ.`;
  // Build the full browser URL for a route path, preserving the current locale prefix.
  const localePath = (path: string) =>
    i18n.currentLocale !== i18n.defaultLocale ? `/${i18n.currentLocale}${path}` : path;

  // Route path used for sidebar active-detection (locale-free, matches generated item hrefs).
  // DocSidebarItems compares item.href against activePath via isSamePath which expects
  // the path format registered by the plugin (no locale prefix).
  const canonicalPath = activeRoute.routePath;
  // Full canonical URL includes locale prefix for SEO.
  const canonicalUrl = `${siteConfig.url.replace(/\/+$/, '')}${localePath(canonicalPath)}`;
  const sidebarItems = withActiveSourceHref(routeData.sidebarItems, activeRoute.sourceDocId, canonicalPath);

  const sidebarNavRef = useRef<HTMLElement>(null);
  const sidebarAsideRef = useRef<HTMLElement>(null);

  // Internal SPA navigation for connection-route links — uses pushState + state
  // update so the component stays mounted (no React Router route change).
  const navigateInPage = (href: string) => {
    const nextRoute = findRouteFromPath(sourcePages, connectionBasePath, href, activeRoute, i18n.currentLocale, i18n.defaultLocale);
    setActiveRoute(nextRoute);
    const nextUrl = localePath(nextRoute.routePath);
    if (typeof window !== 'undefined' && normalizePath(window.location.pathname) !== normalizePath(nextUrl)) {
      window.history.pushState({}, '', nextUrl);
    }
  };

  // Intercept clicks on connection-route sidebar links before Docusaurus <Link>
  // fires a React Router navigation (which would remount the component).
  const handleSidebarClickCapture = (e: React.MouseEvent) => {
    const link = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    // Strip locale prefix for matching — Docusaurus Link adds /zh/ on non-default locales
    const normalizedHref = normalizePath(stripLocalePrefix(href, i18n.currentLocale, i18n.defaultLocale));
    if (normalizedHref.startsWith(`${connectionBasePath}/`)) {
      e.preventDefault();
      e.stopPropagation();
      navigateInPage(href);
    }
  };

  // Sync activeRoute on browser back/forward
  useEffect(() => {
    const sync = () => {
      setActiveRoute((cur) =>
        findRouteFromPath(sourcePages, connectionBasePath, window.location.pathname, cur, i18n.currentLocale, i18n.defaultLocale),
      );
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', sync);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', sync);
      }
    };
  }, [connectionBasePath, sourcePages, i18n.currentLocale, i18n.defaultLocale]);

  // Scroll the active sidebar item into view within the aside's own scroll container.
  // We MUST scroll the aside element directly — never call scrollIntoView() because
  // when sidebar content fits within 100vh (no overflow) it will scroll the page instead.
  useEffect(() => {
    let rafId: number;
    const scrollActiveIntoView = () => {
      const aside = sidebarAsideRef.current;
      const nav = sidebarNavRef.current;
      if (!aside || !nav) return;
      const activeLink = nav.querySelector('.menu__link--active') as HTMLElement | null;
      if (!activeLink) return;

      const asideRect = aside.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const linkTopRelative = linkRect.top - asideRect.top + aside.scrollTop;
      const asideVisibleHeight = aside.clientHeight;
      const linkHeight = linkRect.height;

      // Only scroll if the active link is not fully visible within the aside
      const linkBottomRelative = linkTopRelative + linkHeight;
      const isAboveView = linkTopRelative < aside.scrollTop;
      const isBelowView = linkBottomRelative > aside.scrollTop + asideVisibleHeight;

      if (isAboveView || isBelowView) {
        // Center the active link vertically within the aside's visible area
        const targetScrollTop = linkTopRelative - (asideVisibleHeight - linkHeight) / 2;
        aside.scrollTop = Math.max(0, targetScrollTop);
      }
    };

    rafId = requestAnimationFrame(scrollActiveIntoView);
    return () => { cancelAnimationFrame(rafId); };
  }, [canonicalPath]);

  return (
    <Layout title={metaTitle} description={description}>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
      </Head>
      <HtmlClassNameProvider className={ThemeClassNames.page.docsDocPage}>
        <div className="connection-docs-wrapper">
          <aside ref={sidebarAsideRef} className="connection-docs-sidebar theme-doc-sidebar-container">
            <nav ref={sidebarNavRef} className="menu thin-scrollbar" onClickCapture={handleSidebarClickCapture}>
              <ul className="menu__list">
                <DocSidebarItems items={sidebarItems as any} activePath={canonicalPath} level={1} />
              </ul>
            </nav>
          </aside>
          <main className="connection-docs-main">
            <div className="container padding-top--md padding-bottom--lg">
            <article className="markdown">
              <header>
                <h1>{pageTitle}</h1>
              </header>
              <DataSourceSelect
                key={activeRoute.sourceSlug}
                data={data}
                sourceType={activeRoute.sourceType}
                sourceSlug={activeRoute.sourceSlug}
                initialTarget={activeRoute.target}
                onTargetChange={(target) => setActiveRoute((currentRoute) => ({
                  ...currentRoute,
                  target,
                  targetSlug: slugifyConnectionTarget(target),
                  routePath: getRoutePath(connectionBasePath, currentRoute.sourceSlug, target),
                }))}
                onTargetNavigate={(target) => navigateInPage(getRoutePath(connectionBasePath, activeRoute.sourceSlug, target))}
              />
            </article>
            </div>
          </main>
        </div>
      </HtmlClassNameProvider>
    </Layout>
  );
}
