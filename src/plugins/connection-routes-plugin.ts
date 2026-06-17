import type { LoadContext, Plugin } from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';

type ConnectionPage = {
  docsDir: string;
  sourceType: string;
  sourceTitle: string;
  sourceDocId: string;
  target: string;
  targetSlug: string;
  linksPath: string;
  sidebarItems: SidebarItem[];
};

type SourcePage = {
  sourceDocId: string;
  sourceTitle: string;
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

function getBrandDocsDir(siteBrand: unknown) {
  return siteBrand === 'clougence' ? 'ccDocs' : 'docs';
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

function buildSidebarItems(siteBrand: unknown, sourcePages: SourcePage[]): SidebarItem[] {
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
          href: '/docs/dataMigrationAndSync/datasource_version',
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
            href: `/docs/dataMigrationAndSync/connection/${sourcePage.sourceDocId}`,
            docId: `dataMigrationAndSync/connection/${sourcePage.sourceDocId}`,
          })),
        },
      ],
    },
  ];
}

function getConnectionPages(siteDir: string, siteBrand: unknown): ConnectionPage[] {
  const docsDir = getBrandDocsDir(siteBrand);
  const connectionDir = path.join(siteDir, docsDir, CONNECTION_PATH);
  const docFiles = fs.readdirSync(connectionDir).filter((file) => file.endsWith('.mdx'));
  const sourcePages = docFiles
    .map((file) => {
      const content = fs.readFileSync(path.join(connectionDir, file), 'utf-8');
      return {
        sourceDocId: readFrontMatterValue(content, 'id'),
        sourceTitle: readFrontMatterValue(content, 'title'),
      };
    })
    .filter((sourcePage) => sourcePage.sourceDocId && sourcePage.sourceTitle);
  const sidebarItems = buildSidebarItems(siteBrand, sourcePages);

  return docFiles.flatMap((file) => {
    const docPath = path.join(connectionDir, file);
    const content = fs.readFileSync(docPath, 'utf-8');
    const sourceDocId = readFrontMatterValue(content, 'id');
    const sourceTitle = readFrontMatterValue(content, 'title');
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

    return getTargetNames(indexPath).map((target) => ({
      docsDir,
      sourceType: sourceTypeMatch[1],
      sourceTitle,
      sourceDocId,
      target,
      targetSlug: slugifyConnectionTarget(target),
      linksPath,
      sidebarItems,
    }));
  });
}

export default function connectionRoutesPlugin(context: LoadContext): Plugin<ConnectionPage[]> {
  return {
    name: 'connection-routes-plugin',
    async loadContent() {
      return getConnectionPages(context.siteDir, context.siteConfig.customFields?.siteBrand);
    },
    async contentLoaded({ content, actions }) {
      const { addRoute, createData } = actions;

      await Promise.all(
        content.map(async (routeData) => {
          addRoute({
            path: `/docs/dataMigrationAndSync/connection/${routeData.sourceDocId}/${routeData.targetSlug}/`,
            exact: true,
            component: '@site/src/components/ConnectionRoutePage',
            modules: {
              routeData: await createData(
                `connection-route-${routeData.sourceDocId}-${routeData.targetSlug}.json`,
                JSON.stringify(routeData)
              ),
            },
          });
        })
      );
    },
  };
}
