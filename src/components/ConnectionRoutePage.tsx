import React, { useEffect, useMemo, useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
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

function findRouteFromPath(sourcePages: SourcePage[], connectionBasePath: string, pathname: string, fallback: ActiveRoute): ActiveRoute {
  const normalizedPath = normalizePath(pathname);

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

function isConnectionRouteHref(href: string, connectionBasePath: string) {
  return normalizePath(href).startsWith(`${connectionBasePath}/`);
}

function SidebarLink({
  className,
  href,
  children,
  onNavigate,
  connectionBasePath,
  ...props
}: {
  className: string;
  href: string;
  children: React.ReactNode;
  onNavigate: (href: string) => void;
  connectionBasePath: string;
  [key: string]: unknown;
}) {
  if (isConnectionRouteHref(href, connectionBasePath)) {
    return (
      <a
        className={className}
        href={href}
        onClick={(event) => {
          event.preventDefault();
          onNavigate(href);
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={href} {...props}>
      {children}
    </Link>
  );
}

function SidebarItems({
  items,
  activePath,
  connectionBasePath,
  onNavigate,
  level = 1,
}: {
  items: any[];
  activePath: string;
  connectionBasePath: string;
  onNavigate: (href: string) => void;
  level?: number;
}) {
  return (
    <ul className="menu__list">
      {items.map((item, index) => {
        if (item.type === 'category') {
          return (
            <li key={`${item.label}-${index}`} className={`menu__list-item theme-doc-sidebar-item-category theme-doc-sidebar-item-category-level-${level}`}>
              <div className="menu__list-item-collapsible">
                <Link className="menu__link menu__link--sublist" to={item.href || '#'} onClick={(event) => !item.href && event.preventDefault()}>
                  {item.label}
                </Link>
              </div>
              <SidebarItems items={item.items || []} activePath={activePath} connectionBasePath={connectionBasePath} onNavigate={onNavigate} level={level + 1} />
            </li>
          );
        }

        const active = normalizePath(item.href) === normalizePath(activePath);
        return (
          <li key={`${item.label}-${index}`} className={`menu__list-item theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-${level}`}>
            <SidebarLink
              className={`menu__link${active ? ' menu__link--active' : ''}`}
              href={item.href}
              onNavigate={onNavigate}
              connectionBasePath={connectionBasePath}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </SidebarLink>
          </li>
        );
      })}
    </ul>
  );
}

export default function ConnectionRoutePage({ routeData }: Props) {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const siteBrand = siteConfig.customFields?.siteBrand;
  const productName = siteBrand === 'clougence' ? 'CloudCanal' : 'BladePipe';
  const isChinese = routeData.docsDir === 'ccDocs';
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
    findRouteFromPath(sourcePages, connectionBasePath, location.pathname, fallbackRoute)
  );
  const data = getConnectionLinkData(routeData.docsDir, activeRoute.linksPath);
  const pageTitle = `${activeRoute.sourceTitle} to ${activeRoute.target}`;
  const metaTitle = isChinese ? `${pageTitle} 数据同步链路` : `${pageTitle} Data Pipeline`;
  const description = isChinese
    ? `${productName} 支持从 ${activeRoute.sourceTitle} 到 ${activeRoute.target} 的数据迁移、实时同步、CDC、数据校验和异构链路能力，查看链路功能、前置条件、限制和 FAQ。`
    : `${productName} supports ${activeRoute.sourceTitle} to ${activeRoute.target} data pipelines for migration, real-time sync, CDC, verification, and heterogeneous integration. View capabilities, prerequisites, limits, and FAQ.`;
  const canonicalPath = activeRoute.routePath;
  const canonicalUrl = `${siteConfig.url.replace(/\/+$/, '')}${canonicalPath}`;
  const sidebarItems = withActiveSourceHref(routeData.sidebarItems, activeRoute.sourceDocId, canonicalPath);

  const navigateInPage = (href: string) => {
    const nextRoute = findRouteFromPath(sourcePages, connectionBasePath, href, activeRoute);
    setActiveRoute(nextRoute);

    if (typeof window !== 'undefined' && normalizePath(window.location.pathname) !== normalizePath(nextRoute.routePath)) {
      window.history.pushState({}, '', nextRoute.routePath);
    }
  };

  useEffect(() => {
    const syncRouteFromLocation = () => {
      setActiveRoute((currentRoute) => findRouteFromPath(sourcePages, connectionBasePath, window.location.pathname, currentRoute));
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', syncRouteFromLocation);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', syncRouteFromLocation);
      }
    };
  }, [connectionBasePath, sourcePages]);

  return (
    <Layout title={metaTitle} description={description}>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
      </Head>
      <HtmlClassNameProvider className={ThemeClassNames.page.docsDocPage}>
        <div className="connection-docs-wrapper">
          <aside className="connection-docs-sidebar theme-doc-sidebar-container">
            <nav className="menu thin-scrollbar">
              <SidebarItems
                items={sidebarItems as any[]}
                activePath={canonicalPath}
                connectionBasePath={connectionBasePath}
                onNavigate={navigateInPage}
              />
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
