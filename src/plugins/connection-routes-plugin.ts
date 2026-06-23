import type { LoadContext, Plugin } from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';

type ConnectionPage = {
  routePath: string;
  legacyRoutePath: string;
  docsDir: string;
  sourceType: string;
  sourceTitle: string;
  sourceSlug: string;
  sourceDocId: string;
  target: string;
  targetSlug: string;
  linksPath: string;
  sidebarItems: SidebarItem[];
  sourcePages: SourcePage[];
};

type SourcePage = {
  sourceDocId: string;
  sourceType: string;
  sourceTitle: string;
  sourceSlug: string;
  linksPath: string;
  targets: string[];
  href: string;
};

type SidebarItem =
  | {
      type: 'link';
      label: string;
      href: string;
      docId?: string;
    }
  | {
      type: 'category';
      label: string;
      collapsible: boolean;
      collapsed: boolean;
      items: SidebarItem[];
    };

const CONNECTION_PATH = 'dataMigrationAndSync/connection';

function withBaseUrl(baseUrl: string, pathname: string) {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  if (!normalizedBaseUrl) {
    return pathname;
  }
  return `${normalizedBaseUrl}${pathname}`;
}

function getBrandDocsDir(siteBrand: unknown) {
  return siteBrand === 'clougence' ? 'ccDocs' : 'docs';
}

function getBrandSidebarPath(siteDir: string, siteBrand: unknown) {
  return path.join(siteDir, siteBrand === 'clougence' ? 'sidebars.clougence.ts' : 'sidebars.ts');
}

function getSidebarLabels(siteBrand: unknown) {
  return siteBrand === 'clougence'
    ? {
        connection: '数据链路',
        datasourceVersion: '数据库版本',
        source: '链路特性',
      }
    : {
        connection: 'Connection',
        datasourceVersion: 'DataSource Version',
        source: 'Source',
      };
}

function slugifyConnectionTarget(value: string) {
  return value
    .trim()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readFrontMatterValue(content: string, key: string) {
  const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

function getSourceDisplayTitle(content: string) {
  const sidebarLabel = readFrontMatterValue(content, 'sidebar_label');
  const sourceTypeMatch = content.match(/sourceType=["']([^"']+)["']/);
  const title = readFrontMatterValue(content, 'title');

  return sidebarLabel || sourceTypeMatch?.[1] || title;
}

function getSidebarSourceOrder(siteDir: string, siteBrand: unknown) {
  const sidebarPath = getBrandSidebarPath(siteDir, siteBrand);
  if (!fs.existsSync(sidebarPath)) {
    return new Map<string, number>();
  }

  const content = fs.readFileSync(sidebarPath, 'utf-8');
  const docIds = [...content.matchAll(/["']dataMigrationAndSync\/connection\/([^"']+)["']/g)].map((match) => match[1]);

  return new Map(docIds.map((docId, index) => [docId, index]));
}

function sortSourcePagesBySidebar(sourcePages: SourcePage[], sourceOrder: Map<string, number>) {
  return [...sourcePages].sort((left, right) => {
    const leftOrder = sourceOrder.get(left.sourceDocId) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = sourceOrder.get(right.sourceDocId) ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.sourceTitle.localeCompare(right.sourceTitle);
  });
}

function getLinksIndexPath(content: string, connectionDir: string) {
  const linksPathMatch = content.match(/import\s+\w+\s+from\s+['"]\.\/([^'"]+_links\/index)['"]/);
  if (!linksPathMatch) {
    return '';
  }

  return path.join(connectionDir, `${linksPathMatch[1]}.js`);
}

function getDefaultTarget(targets: string[], sourceType: string) {
  return targets.includes(sourceType) ? sourceType : targets[0] || '';
}

function getTopLevelObjectBody(content: string) {
  const exportIndex = content.indexOf('export default');
  if (exportIndex < 0) {
    return '';
  }

  const openIndex = content.indexOf('{', exportIndex);
  if (openIndex < 0) {
    return '';
  }

  let depth = 0;
  let quote = '';
  for (let index = openIndex; index < content.length; index += 1) {
    const char = content[index];
    const previous = content[index - 1];

    if (quote) {
      if (char === quote && previous !== '\\') {
        quote = '';
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return content.slice(openIndex + 1, index);
      }
    }
  }

  return '';
}

function splitTopLevelProperties(body: string) {
  const result: string[] = [];
  let start = 0;
  let depth = 0;
  let quote = '';

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];
    const previous = body[index - 1];

    if (quote) {
      if (char === quote && previous !== '\\') {
        quote = '';
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{' || char === '[' || char === '(') {
      depth += 1;
      continue;
    }

    if (char === '}' || char === ']' || char === ')') {
      depth -= 1;
      continue;
    }

    if (char === ',' && depth === 0) {
      result.push(body.slice(start, index).trim());
      start = index + 1;
    }
  }

  const lastItem = body.slice(start).trim();
  if (lastItem) {
    result.push(lastItem);
  }

  return result;
}

function getTargetNames(indexPath: string) {
  const content = fs.readFileSync(indexPath, 'utf-8');
  const body = getTopLevelObjectBody(content);

  return splitTopLevelProperties(body)
    .map((property) => {
      const explicitKey = property.match(/^['"]([^'"]+)['"]\s*:/);
      if (explicitKey) {
        return explicitKey[1];
      }

      const identifierKey = property.match(/^([A-Za-z_$][\w$]*)\s*:/);
      if (identifierKey) {
        return identifierKey[1];
      }

      const shorthandKey = property.match(/^([A-Za-z_$][\w$]*)$/);
      return shorthandKey ? shorthandKey[1] : '';
    })
    .filter(Boolean);
}

function buildSidebarItems(siteBrand: unknown, sourcePages: SourcePage[], baseUrl: string): SidebarItem[] {
  const labels = getSidebarLabels(siteBrand);
  return [
    {
      type: 'category',
      label: labels.connection,
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'link',
          label: labels.datasourceVersion,
          href: withBaseUrl(baseUrl, '/docs/dataMigrationAndSync/datasource_version'),
          docId: 'dataMigrationAndSync/datasource_version',
        },
        {
          type: 'category',
          label: labels.source,
          collapsible: true,
          collapsed: false,
          items: sourcePages.map((sourcePage) => ({
            type: 'link',
            label: sourcePage.sourceTitle,
            href: sourcePage.href,
            docId: `dataMigrationAndSync/connection/${sourcePage.sourceDocId}`,
          })),
        },
      ],
    },
  ];
}

function getConnectionPages(siteDir: string, siteBrand: unknown, baseUrl: string): ConnectionPage[] {
  const docsDir = getBrandDocsDir(siteBrand);
  const connectionDir = path.join(siteDir, docsDir, CONNECTION_PATH);
  const docFiles = fs.readdirSync(connectionDir).filter((file) => file.endsWith('.mdx'));
  const sourceOrder = getSidebarSourceOrder(siteDir, siteBrand);
  const sourcePages = sortSourcePagesBySidebar(docFiles
    .map((file) => {
      const content = fs.readFileSync(path.join(connectionDir, file), 'utf-8');
      const sourceTitle = getSourceDisplayTitle(content);
      const sourceType = content.match(/sourceType=["']([^"']+)["']/)?.[1] || '';
      const indexPath = getLinksIndexPath(content, connectionDir);
      const targets = indexPath && fs.existsSync(indexPath) ? getTargetNames(indexPath) : [];
      const defaultTarget = getDefaultTarget(targets, sourceType);
      const sourceSlug = slugifyConnectionTarget(sourceTitle);
      const targetSlug = slugifyConnectionTarget(defaultTarget);
      const linksPathMatch = content.match(/import\s+\w+\s+from\s+['"]\.\/([^'"]+_links\/index)['"]/);
      return {
        sourceDocId: readFrontMatterValue(content, 'id'),
        sourceType,
        sourceTitle,
        sourceSlug,
        linksPath: linksPathMatch ? `${linksPathMatch[1]}.js` : '',
        targets,
        href: defaultTarget
          ? withBaseUrl(baseUrl, `/docs/dataMigrationAndSync/connection/${sourceSlug}-to-${targetSlug}/`)
          : withBaseUrl(baseUrl, `/docs/dataMigrationAndSync/connection/${readFrontMatterValue(content, 'id')}`),
      };
    })
    .filter((sourcePage) => sourcePage.sourceDocId && sourcePage.sourceType && sourcePage.sourceTitle && sourcePage.href), sourceOrder);
  const sidebarItems = buildSidebarItems(siteBrand, sourcePages, baseUrl);

  return docFiles.flatMap((file) => {
    const docPath = path.join(connectionDir, file);
    const content = fs.readFileSync(docPath, 'utf-8');
    const sourceDocId = readFrontMatterValue(content, 'id');
    const sourceTitle = getSourceDisplayTitle(content);
    const sourceTypeMatch = content.match(/sourceType=["']([^"']+)["']/);
    const linksPathMatch = content.match(/import\s+\w+\s+from\s+['"]\.\/([^'"]+_links\/index)['"]/);

    if (!sourceDocId || !sourceTitle || !sourceTypeMatch || !linksPathMatch) {
      return [];
    }

    const linksPath = `${linksPathMatch[1]}.js`;
    const indexPath = path.join(connectionDir, linksPath);
    if (!fs.existsSync(indexPath)) {
      return [];
    }

    return getTargetNames(indexPath).map((target) => {
      const sourceSlug = slugifyConnectionTarget(sourceTitle);
      const targetSlug = slugifyConnectionTarget(target);
      const routePath = withBaseUrl(baseUrl, `/docs/dataMigrationAndSync/connection/${sourceSlug}-to-${targetSlug}/`);
      const legacyRoutePath = withBaseUrl(baseUrl, `/docs/dataMigrationAndSync/connection/${sourceDocId}/${targetSlug}/`);

      return {
        routePath,
        legacyRoutePath,
        docsDir,
        sourceType: sourceTypeMatch[1],
        sourceTitle,
        sourceSlug,
        sourceDocId,
        target,
        targetSlug,
        linksPath,
        sidebarItems,
        sourcePages,
      };
    });
  });
}

export default function connectionRoutesPlugin(context: LoadContext): Plugin<ConnectionPage[]> {
  return {
    name: 'connection-routes-plugin',
    async loadContent() {
      return getConnectionPages(context.siteDir, context.siteConfig.customFields?.siteBrand, context.baseUrl);
    },
    async contentLoaded({ content, actions }) {
      const { addRoute, createData } = actions;

      await Promise.all(
        content.map(async (routeData) => {
          const data = await createData(
            `connection-route-${routeData.sourceSlug}-to-${routeData.targetSlug}.json`,
            JSON.stringify(routeData)
          );

          addRoute({
            path: routeData.routePath,
            exact: true,
            component: '@site/src/components/ConnectionRoutePage',
            modules: {
              routeData: data,
            },
          });

          addRoute({
            path: routeData.legacyRoutePath,
            exact: true,
            component: '@site/src/components/ConnectionRoutePage',
            modules: {
              routeData: data,
            },
          });
        })
      );
    },
  };
}
