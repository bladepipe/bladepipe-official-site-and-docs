import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import DataSourceSelectForEn from '@site/src/components/DataSourceSelectForEn3';
import DataSourceSelectZh from '@site/src/components/DataSourceSelect3';
import { getConnectionLinkData } from '@site/src/data/connectionLinkModules';

type ConnectionRouteData = {
  docsDir: string;
  sourceType: string;
  sourceTitle: string;
  sourceDocId: string;
  target: string;
  targetSlug: string;
  linksPath: string;
  routePath: string;
  sidebarItems: unknown[];
};

type Props = {
  routeData: ConnectionRouteData;
};

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

function SidebarItems({ items, activePath, level = 1 }: { items: any[]; activePath: string; level?: number }) {
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
              <SidebarItems items={item.items || []} activePath={activePath} level={level + 1} />
            </li>
          );
        }

        const active = item.href === activePath || `${item.href}/` === activePath;
        return (
          <li key={`${item.label}-${index}`} className={`menu__list-item theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-${level}`}>
            <Link className={`menu__link${active ? ' menu__link--active' : ''}`} to={item.href} aria-current={active ? 'page' : undefined}>
              {item.label}
            </Link>
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
  const data = getConnectionLinkData(routeData.docsDir, routeData.linksPath);
  const [currentTarget, setCurrentTarget] = useState(routeData.target);
  const title = isChinese ? `${routeData.sourceTitle} 到 ${currentTarget}` : `${routeData.sourceTitle} to ${currentTarget}`;
  const description = isChinese
    ? `${productName} 支持从 ${routeData.sourceTitle} 到 ${currentTarget} 的数据迁移、同步、校验和链路能力。`
    : `${productName} supports data replication from ${routeData.sourceTitle} to ${currentTarget}. View supported migration, sync, verification, and connector capabilities.`;
  const canonicalPath = routeData.routePath;
  const canonicalUrl = `${siteConfig.url.replace(/\/+$/, '')}${canonicalPath}`;
  const sidebarItems = withActiveSourceHref(routeData.sidebarItems, routeData.sourceDocId, canonicalPath);

  return (
    <Layout title={title} description={description}>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <HtmlClassNameProvider className={ThemeClassNames.page.docsDocPage}>
        <div className="connection-docs-wrapper">
          <aside className="connection-docs-sidebar theme-doc-sidebar-container">
            <nav className="menu thin-scrollbar">
              <SidebarItems items={sidebarItems as any[]} activePath={location.pathname} />
            </nav>
          </aside>
          <main className="connection-docs-main">
            <div className="container padding-top--md padding-bottom--lg">
            <article className="markdown">
              <header>
                <h1>{title}</h1>
                <p>{description}</p>
              </header>
              <DataSourceSelect
                data={data}
                sourceType={routeData.sourceType}
                initialTarget={routeData.target}
                onTargetChange={setCurrentTarget}
              />
            </article>
            </div>
          </main>
        </div>
      </HtmlClassNameProvider>
    </Layout>
  );
}
