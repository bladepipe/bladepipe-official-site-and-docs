import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import siteConfig from '@generated/docusaurus.config';
import CheckIcon from '@site/static/img/home/icon/check.svg';
import PlusIcon from '@site/static/img/home/icon/plus.svg';
import MinusIcon from '@site/static/img/home/icon/minus.svg';
import FadeInSection from '@site/src/components/FadeInSection';
import Footer from '@site/src/components/Footer';
import JsonLd from '@site/src/components/JsonLd';
import BlogCardGrid from '@site/src/components/BlogCardGrid';
import CommunityInstallModal from '@site/src/components/CommunityInstallModal';
import { getConnectionLinkData } from '@site/src/data/connectionLinkModules';
import { getBrandProfile } from '@site/src/utils/structuredData';
import { normalizeLinkForSiteBrand } from '@site/src/utils/nav';
import { slugifyConnectionTarget } from '@site/src/utils/connectionSlug';
import { getConnectorBySlug, getConnectors, type Connector } from '@site/src/data/connectors';

interface ConnectorDetailPageProps {
  slug: string;
}

const getBrandProductName = (siteBrand: string) => {
  if (siteBrand === 'clougence') {
    return 'CloudCanal';
  }
  if (siteBrand === 'clouddm') {
    return 'CloudDM';
  }
  return 'BladePipe';
};

const getCategoryI18nKey = (category: string) => {
  const categoryKeys: Record<string, string> = {
    Database: 'connector.detail.category.database',
    Analytics: 'connector.detail.category.analytics',
    Streaming: 'connector.detail.category.streaming',
    'File and lake': 'connector.detail.category.fileAndLake',
    Cache: 'connector.detail.category.cache',
    AI: 'connector.detail.category.ai',
  };

  return categoryKeys[category] ?? 'connector.detail.category.database';
};

const getCapabilityText = (connector: Connector) => {
  if (connector.supportsSource && connector.supportsTarget) {
    return translate({ id: 'connector.detail.capability.sourceAndTarget', message: 'source and target' });
  }
  if (connector.supportsSource) {
    return translate({ id: 'connector.detail.capability.source', message: 'source' });
  }
  if (connector.supportsTarget) {
    return translate({ id: 'connector.detail.capability.target', message: 'target' });
  }
  return translate({ id: 'connector.detail.capability.integration', message: 'integration' });
};

const CONNECTION_DOC_SOURCES: Record<string, { sourceType: string; sourceSlug: string; linksPath: string }> = {
  mysql: { sourceType: 'MySQL', sourceSlug: 'mysql', linksPath: 'mysql_links/index.js' },
  oracle: { sourceType: 'Oracle', sourceSlug: 'oracle', linksPath: 'oracle_links/index.js' },
  postgresql: { sourceType: 'PostgreSQL', sourceSlug: 'postgresql', linksPath: 'postgresql_links/index.js' },
  'sql-server': { sourceType: 'SQLServer', sourceSlug: 'sql-server', linksPath: 'sqlserver_links/index.js' },
  kafka: { sourceType: 'Kafka', sourceSlug: 'kafka', linksPath: 'kafka_links/index.js' },
  rocketmq: { sourceType: 'RocketMQ', sourceSlug: 'rocketmq', linksPath: 'rocketmq_links/index.js' },
  rabbitmq: { sourceType: 'RabbitMQ', sourceSlug: 'rabbitmq', linksPath: 'rabbitmq_links/index.js' },
  automq: { sourceType: 'AutoMQ', sourceSlug: 'automq', linksPath: 'automq_links/index.js' },
  pulsar: { sourceType: 'Pulsar', sourceSlug: 'pulsar', linksPath: 'pulsar_links/index.js' },
  clickhouse: { sourceType: 'ClickHouse', sourceSlug: 'clickhouse', linksPath: 'clickhouse_links/index.js' },
  starrocks: { sourceType: 'StarRocks', sourceSlug: 'starrocks', linksPath: 'starrocks_links/index.js' },
  mongodb: { sourceType: 'MongoDB', sourceSlug: 'mongodb', linksPath: 'mongodb_links/index.js' },
  mariadb: { sourceType: 'MariaDB', sourceSlug: 'mariadb', linksPath: 'mariadb_links/index.js' },
  tidb: { sourceType: 'TiDB', sourceSlug: 'tidb', linksPath: 'tidb_links/index.js' },
  redis: { sourceType: 'Redis', sourceSlug: 'redis', linksPath: 'redis_links/index.js' },
  oceanbase: { sourceType: 'OceanBase', sourceSlug: 'oceanbase', linksPath: 'oceanbase_links/index.js' },
  dameng: { sourceType: 'Dameng', sourceSlug: 'dameng', linksPath: 'dameng_links/index.js' },
  'sap-hana': { sourceType: 'Hana', sourceSlug: 'sap-hana', linksPath: 'hana_links/index.js' },
  'ibm-db2': { sourceType: 'Db2', sourceSlug: 'db2', linksPath: 'db2_links/index.js' },
  tdengine: { sourceType: 'TDengine', sourceSlug: 'tdengine', linksPath: 'tdengine_links/index.js' },
  tunnel: { sourceType: 'Tunnel', sourceSlug: 'tunnel', linksPath: 'tunnel_links/index.js' },
  'aurora-mysql': { sourceType: 'AuroraForMySQL', sourceSlug: 'aurora-for-mysql', linksPath: 'auroraformysql_links/index.js' },
  'aurora-for-postgresql': { sourceType: 'AuroraForPg', sourceSlug: 'aurora-for-postgresql', linksPath: 'auroraforpg_links/index.js' },
  'polardb-for-mysql': { sourceType: 'PolarDbMySQL', sourceSlug: 'polardb-for-mysql', linksPath: 'polardbmysql_links/index.js' },
  'polardb-x': { sourceType: 'PolarDbX', sourceSlug: 'polardb-x', linksPath: 'polardbx_links/index.js' },
  'apache-spanner': { sourceType: 'Spanner', sourceSlug: 'google-cloud-spanner', linksPath: 'spanner_links/index.js' },
  'oceanbase-for-oracle': { sourceType: 'ObForOracle', sourceSlug: 'oceanbase-for-oracle', linksPath: 'obfororacle_links/index.js' },
  dynamodb: { sourceType: 'DynamoDB', sourceSlug: 'dynamodb', linksPath: 'dynamodb_links/index.js' },
  'google-drive': { sourceType: 'GoogleDrive', sourceSlug: 'google-drive', linksPath: 'googledrive_links/index.js' },
  'gaussdb-for-opengauss': { sourceType: 'GaussDB', sourceSlug: 'gaussdb', linksPath: 'gaussdb_links/index.js' },
  'tdsql-c': { sourceType: 'TdsqlCMySQL', sourceSlug: 'tdsql-c-mysql', linksPath: 'tdsqlcmysql_links/index.js' },
  tdsql: { sourceType: 'TdsqlMySQL', sourceSlug: 'tdsql-mysql', linksPath: 'tdsqlmysql_links/index.js' },
  kingbase: { sourceType: 'KingbaseES', sourceSlug: 'kingbasees', linksPath: 'kingbasees_links/index.js' },
  vastbase: { sourceType: 'Vastbase', sourceSlug: 'vastbase', linksPath: 'vastbase_links/index.js' },
  opengauss: { sourceType: 'OpenGauss', sourceSlug: 'opengauss', linksPath: 'opengauss_links/index.js' },
};

const getConnectionDocHref = (connector: Connector, siteBrand: string) => {
  const source = CONNECTION_DOC_SOURCES[connector.slug];

  if (!source || !connector.supportsSource) {
    return normalizeLinkForSiteBrand('/docs/quick/quick_start_mgr/', siteBrand);
  }

  try {
    const docsDir = siteBrand === 'clougence' ? 'ccDocs' : 'docs';
    const data = getConnectionLinkData(docsDir, source.linksPath);
    const targets = Object.keys(data);
    const target = targets.includes(source.sourceType) ? source.sourceType : targets[0];

    if (!target) {
      return normalizeLinkForSiteBrand('/docs/quick/quick_start_mgr/', siteBrand);
    }

    const href = `/docs/dataMigrationAndSync/connection/${source.sourceSlug}-to-${slugifyConnectionTarget(target)}/`;
    return normalizeLinkForSiteBrand(href, siteBrand);
  } catch {
    return normalizeLinkForSiteBrand('/docs/quick/quick_start_mgr/', siteBrand);
  }
};

const getCategorySummary = (connector: Connector, productName: string) => {
  const category = connector.category.toLowerCase();

  if (category === 'streaming') {
    return translate(
      {
        id: 'connector.detail.categorySummary.streaming',
        message:
          '{productName} helps teams connect {connectorName} with databases, warehouses, lakehouse tables, and downstream services for low-latency event streaming and CDC delivery.',
      },
      { productName, connectorName: connector.name }
    );
  }
  if (category === 'analytics') {
    return translate(
      {
        id: 'connector.detail.categorySummary.analytics',
        message:
          '{productName} can move fresh operational data into {connectorName} for real-time analytics, reporting, and data warehouse modernization.',
      },
      { productName, connectorName: connector.name }
    );
  }
  if (category === 'file and lake') {
    return translate(
      {
        id: 'connector.detail.categorySummary.fileAndLake',
        message: '{productName} supports {connectorName} in lakehouse, file ingestion, and AI-ready data preparation workflows.',
      },
      { productName, connectorName: connector.name }
    );
  }
  if (category === 'cache') {
    return translate(
      {
        id: 'connector.detail.categorySummary.cache',
        message:
          '{productName} supports {connectorName} pipelines for cache synchronization, operational replication, and low-latency serving scenarios.',
      },
      { productName, connectorName: connector.name }
    );
  }
  if (category === 'ai') {
    return translate(
      {
        id: 'connector.detail.categorySummary.ai',
        message: '{productName} connects {connectorName} into AI data workflows for RAG, model services, and enterprise knowledge pipelines.',
      },
      { productName, connectorName: connector.name }
    );
  }
  return translate(
    {
      id: 'connector.detail.categorySummary.database',
      message:
        '{productName} supports {connectorName} for database migration, real-time synchronization, CDC replication, verification, and analytics pipelines.',
    },
    { productName, connectorName: connector.name }
  );
};

const getFeatureCards = (connector: Connector, productName: string) => [
  {
    title: translate({ id: 'connector.detail.feature.realTime.title', message: 'Real-time movement' }),
    description: translate(
      {
        id: 'connector.detail.feature.realTime.description',
        message: 'Build low-latency {connectorName} pipelines for fresh data delivery instead of batch-only movement.',
      },
      { connectorName: connector.name }
    ),
  },
  {
    title: translate({ id: 'connector.detail.feature.fullIncremental.title', message: 'Full and incremental flow' }),
    description: connector.supportsSource
      ? translate(
          {
            id: 'connector.detail.feature.fullIncremental.sourceDescription',
            message: 'Use {connectorName} as a source for initial loading and ongoing incremental updates where the connector supports it.',
          },
          { connectorName: connector.name }
        )
      : translate(
          {
            id: 'connector.detail.feature.fullIncremental.targetDescription',
            message: 'Load prepared data into {connectorName} as part of a governed downstream pipeline.',
          },
          { connectorName: connector.name }
        ),
  },
  {
    title: translate({ id: 'connector.detail.feature.operation.title', message: 'Operational control' }),
    description: translate(
      {
        id: 'connector.detail.feature.operation.description',
        message: '{productName} provides visual setup, monitoring, retry, and operational workflows for production data teams.',
      },
      { productName }
    ),
  },
  {
    title: translate({ id: 'connector.detail.feature.enterprise.title', message: 'Enterprise readiness' }),
    description: translate({
      id: 'connector.detail.feature.enterprise.description',
      message: 'Keep network, permission, and deployment choices explicit so pipelines fit cloud, BYOC, and on-premise environments.',
    }),
  },
];

const getPipelineExamples = (connector: Connector) => {
  if (connector.category === 'Streaming') {
    return [
      {
        title: translate(
          { id: 'connector.detail.pipeline.streaming.analytics', message: '{connectorName} to data warehouse for real-time analytics' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.streaming.analytics.description',
          message: 'Stream events into analytical storage so reporting and monitoring can consume fresh data continuously.',
        }),
      },
      {
        title: translate(
          { id: 'connector.detail.pipeline.streaming.cdc', message: 'Database CDC to {connectorName} for event-driven applications' },
          { connectorName: connector.name }
        ),
        description: translate(
          {
            id: 'connector.detail.pipeline.streaming.cdc.description',
            message: 'Publish database changes into {connectorName} so downstream services can react to inserts, updates, and deletes.',
          },
          { connectorName: connector.name }
        ),
      },
      {
        title: translate(
          { id: 'connector.detail.pipeline.streaming.lakehouse', message: '{connectorName} to lakehouse storage for replayable data pipelines' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.streaming.lakehouse.description',
          message: 'Persist streaming data into lakehouse tables for replay, historical analysis, and batch-stream unification.',
        }),
      },
    ];
  }
  if (connector.category === 'Analytics') {
    return [
      {
        title: translate(
          { id: 'connector.detail.pipeline.analytics.dashboard', message: 'MySQL or PostgreSQL to {connectorName} for real-time dashboards' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.analytics.dashboard.description',
          message: 'Move operational data into the analytical engine so BI dashboards and metrics stay close to real time.',
        }),
      },
      {
        title: translate(
          { id: 'connector.detail.pipeline.analytics.migration', message: 'Oracle or SQL Server to {connectorName} for migration and reporting' },
          { connectorName: connector.name }
        ),
        description: translate(
          {
            id: 'connector.detail.pipeline.analytics.migration.description',
            message: 'Use full and incremental synchronization to reduce migration downtime and keep legacy reporting available during cutover.',
          },
          { connectorName: connector.name }
        ),
      },
      {
        title: translate(
          { id: 'connector.detail.pipeline.analytics.unified', message: 'Kafka or file data into {connectorName} for unified analytics' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.analytics.unified.description',
          message: 'Bring streaming and file-based data together for unified query, modeling, and downstream analytics.',
        }),
      },
    ];
  }
  if (connector.category === 'File and lake') {
    return [
      {
        title: translate(
          { id: 'connector.detail.pipeline.fileLake.operational', message: 'Operational data to {connectorName} for lakehouse storage' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.fileLake.operational.description',
          message: 'Land database and application data into durable storage for lakehouse tables, auditing, and long-term analysis.',
        }),
      },
      {
        title: translate(
          { id: 'connector.detail.pipeline.fileLake.aiReady', message: '{connectorName} ingestion into AI-ready knowledge pipelines' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.fileLake.aiReady.description',
          message: 'Prepare source data as files or lakehouse assets that can feed retrieval, embedding, and model workflows.',
        }),
      },
      {
        title: translate({
          id: 'connector.detail.pipeline.fileLake.archive',
          message: 'File-based synchronization for archival and downstream processing',
        }),
        description: translate({
          id: 'connector.detail.pipeline.fileLake.archive.description',
          message: 'Export repeatable file snapshots or incremental data sets for retention, external exchange, and offline processing.',
        }),
      },
    ];
  }
  if (connector.category === 'AI') {
    return [
      {
        title: translate(
          { id: 'connector.detail.pipeline.ai.rag', message: '{connectorName} integration for RAG data preparation' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.ai.rag.description',
          message: 'Synchronize business data into AI-ready stores so retrieval workflows can use current enterprise context.',
        }),
      },
      {
        title: translate(
          { id: 'connector.detail.pipeline.ai.enrichment', message: 'Knowledge base data enrichment with {connectorName}' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.ai.enrichment.description',
          message: 'Keep structured and unstructured knowledge up to date before indexing, embedding, or model-side consumption.',
        }),
      },
      {
        title: translate(
          { id: 'connector.detail.pipeline.ai.enterprise', message: '{connectorName} in enterprise AI workflows' },
          { connectorName: connector.name }
        ),
        description: translate({
          id: 'connector.detail.pipeline.ai.enterprise.description',
          message: 'Connect controlled data pipelines with AI applications while keeping permissions, monitoring, and operations visible.',
        }),
      },
    ];
  }
  return [
    {
      title: translate(
        {
          id: 'connector.detail.pipeline.database.analytics',
          message: '{connectorName} to ClickHouse, StarRocks, or Doris for real-time analytics',
        },
        { connectorName: connector.name }
      ),
      description: translate(
        {
          id: 'connector.detail.pipeline.database.analytics.description',
          message: 'Synchronize {connectorName} changes into analytical databases so orders, users, and business metrics can be queried with low latency.',
        },
        { connectorName: connector.name }
      ),
    },
    {
      title: translate(
        { id: 'connector.detail.pipeline.database.kafka', message: '{connectorName} to Kafka for CDC event streaming' },
        { connectorName: connector.name }
      ),
      description: translate(
        {
          id: 'connector.detail.pipeline.database.kafka.description',
          message: 'Convert {connectorName} table changes into CDC events for message-driven services, search indexing, and real-time consumers.',
        },
        { connectorName: connector.name }
      ),
    },
    {
      title: translate(
        {
          id: 'connector.detail.pipeline.database.migration',
          message: '{connectorName} to PostgreSQL, MySQL, or Oracle for database migration',
        },
        { connectorName: connector.name }
      ),
      description: translate(
        {
          id: 'connector.detail.pipeline.database.migration.description',
          message: 'Combine full migration with incremental catch-up to reduce downtime and keep source and target data consistent.',
        },
        { connectorName: connector.name }
      ),
    },
  ];
};

const getChecklistItems = (connector: Connector) => [
  connector.supportsSource
    ? translate(
        {
          id: 'connector.detail.checklist.source',
          message: 'Confirm {connectorName} source connectivity, account permissions, and incremental capture requirements.',
        },
        { connectorName: connector.name }
      )
    : translate(
        {
          id: 'connector.detail.checklist.upstream',
          message: 'Confirm the upstream system can provide data in a format accepted by the {connectorName} target connector.',
        },
        { connectorName: connector.name }
      ),
  connector.supportsTarget
    ? translate(
        {
          id: 'connector.detail.checklist.target',
          message: 'Prepare {connectorName} target schemas, write permissions, capacity, and network access.',
        },
        { connectorName: connector.name }
      )
    : translate(
        {
          id: 'connector.detail.checklist.downstream',
          message: 'Prepare downstream targets that will receive data extracted from {connectorName}.',
        },
        { connectorName: connector.name }
      ),
  translate({
    id: 'connector.detail.checklist.naming',
    message: 'Validate table, topic, file, or object naming conventions before production rollout.',
  }),
  translate({
    id: 'connector.detail.checklist.smallTask',
    message: 'Run a small task first, then verify latency, throughput, and data consistency.',
  }),
];

const getBlogTagLabel = (tag: string) => {
  const blogTagLabels: Record<string, string> = {
    ai: translate({ id: 'connector.detail.blogTag.ai', message: 'Data & AI' }),
    data_insights: translate({ id: 'connector.detail.blogTag.dataInsights', message: 'Data insights' }),
    user_stories: translate({ id: 'connector.detail.blogTag.userStories', message: 'User stories' }),
    announcement: translate({ id: 'connector.detail.blogTag.announcement', message: 'Announcement' }),
    tutorials: translate({ id: 'connector.detail.blogTag.tutorials', message: 'Tutorials' }),
    tech_share: translate({ id: 'connector.detail.blogTag.tutorials', message: 'Tutorials' }),
    data_sync_sample: translate({ id: 'connector.detail.blogTag.bestPractices', message: 'Best practices' }),
    usecase: translate({ id: 'connector.detail.blogTag.userStories', message: 'User stories' }),
  };

  return blogTagLabels[tag] || tag;
};

const getBlogContext = (siteBrand: string) => {
  if (siteBrand === 'clougence') {
    return (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-cc-blog.*\.json$/);
  }
  return (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-blog.*\.json$/);
};

const getRelatedBlogIds = (connector: Connector) => {
  const slugBlogIds: Record<string, string[]> = {
    mysql: ['mysql_clickhouse_widetable_sync', 'mysql_starrocks_sync', 'mysql_mysql_sync'],
    oracle: ['oracle_mysql_sync', 'oracle_starrocks_sync', 'oracle_change_data_capture_optimize'],
    postgresql: ['postgresql_doris_sync', 'mysql_pg_gp', 'pg_pg_sync'],
    kafka: ['kafka_base_internet_data_sync', 'kafka_kafka_sync', 'kafka_src_debezium_json_sync'],
    redis: ['redis_redis_sync', 'redis_big_key_opt', 'redis_two_way_sync_antiloop'],
    elasticsearch: ['mysql_elasticsearch_sync', 'mysql_elasticsearch_widetable_sync', 'es_sync_detail'],
    mongodb: ['mongodb_mongodb_sync', 'mongo_atlas_to_documentdb_sync', 'history_data_change_sync'],
    starrocks: ['mysql_starrocks_sync', 'oracle_starrocks_sync', 'starrocks_dynamic_scan_mode'],
    doris: ['postgresql_doris_sync', 'gaussdb_doris_sync', 'dameng_starrocks_sync'],
  };

  if (slugBlogIds[connector.slug]) {
    return slugBlogIds[connector.slug];
  }
  if (connector.category === 'Streaming') {
    return ['kafka_base_internet_data_sync', 'kafka_kafka_sync', 'kafka_vs_rabbitmq_vs_rocketmq_vs_pulsar'];
  }
  if (connector.category === 'Analytics') {
    return ['mysql_starrocks_sync', 'postgresql_doris_sync', 'visual_wide_table_build'];
  }
  if (connector.category === 'File and lake') {
    return ['paimon_starrocks_lakehouse', 'paimon_selectdb_lakehouse', 'hive_dst_change_data_capture_writer'];
  }
  if (connector.category === 'AI') {
    return ['rag_concept', 'ragapi_cloud', 'ragapi_ollama'];
  }
  return ['mysql_clickhouse_widetable_sync', 'realtime_data_sync_faq_1', 'data_check_and_revise'];
};

const getRelatedBlogs = (connector: Connector, siteBrand: string) => {
  const targetIds = getRelatedBlogIds(connector);
  const req = getBlogContext(siteBrand);

  return Object.values(
    req.keys().reduce((acc: Record<string, any>, key: string) => {
      const detail = req(key);
      if (detail?.frontMatter?.id && targetIds.includes(detail.frontMatter.id)) {
        acc[detail.frontMatter.id] = detail;
      }
      return acc;
    }, {})
  )
    .sort((a: any, b: any) => targetIds.indexOf(a.frontMatter.id) - targetIds.indexOf(b.frontMatter.id))
    .slice(0, 3)
    .map((detail: any) => {
      const authorInfo = detail?.authors?.[0] || {};
      return {
        title: detail.title,
        permalink: normalizeLinkForSiteBrand(detail.permalink, siteBrand),
        date: detail.date ? detail.date.slice(0, 10) : '',
        author: detail?.frontMatter?.author || authorInfo?.name || (siteBrand === 'clougence' ? 'CloudCanal Team' : 'BladePipe Team'),
        authorImage: authorInfo?.imageURL || authorInfo?.image_url || '',
        image: detail?.frontMatter?.image || '/img/home/scene_cc1.png',
        tags: (detail?.frontMatter?.tags || []).map((tag: string) => ({
          key: tag,
          label: getBlogTagLabel(tag),
        })),
        desc: detail?.description || '',
      };
    });
};

export default function ConnectorDetailPage({ slug }: ConnectorDetailPageProps): React.ReactElement {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const connector = getConnectorBySlug(slug, siteBrand);
  const productName = getBrandProductName(siteBrand);
  const brand = getBrandProfile(siteBrand);

  if (!connector) {
    return (
      <Layout
        title={translate({ id: 'connector.detail.notFound.title', message: 'Connector not found' })}
        description={translate({
          id: 'connector.detail.notFound.description',
          message: 'The requested connector could not be found.',
        })}
      >
        <main className="w-full bg-white px-4 py-24">
          <div className="mx-auto max-w-[960px]">
            <h1 className="mb-4 text-[40px] font-bold leading-tight text-black">
              <Translate id="connector.detail.notFound.title">Connector not found</Translate>
            </h1>
          </div>
        </main>
      </Layout>
    );
  }

  const allConnectors = getConnectors(siteBrand);
  const relatedConnectors = allConnectors
    .filter((item) => item.slug !== connector.slug && item.category === connector.category)
    .slice(0, 6);
  const pagePath = `/connector/${connector.slug}/`;
  const canonicalUrl = new URL(pagePath, siteConfig.url).toString();
  const pageTitle = translate(
    { id: 'connector.detail.pageTitle', message: '{connectorName} | {productName}' },
    { connectorName: connector.name, productName }
  );
  const pageDescription = translate(
    {
      id: 'connector.detail.pageDescription',
      message:
        '{productName} supports {connectorName} as a {capability} connector for real-time data integration, migration, synchronization, and analytics pipelines.',
    },
    { productName, connectorName: connector.name, capability: getCapabilityText(connector) }
  );
  const featureCards = getFeatureCards(connector, productName);
  const pipelineExamples = getPipelineExamples(connector);
  const checklistItems = getChecklistItems(connector);
  const relatedBlogs = getRelatedBlogs(connector, siteBrand);
  const startDocHref = getConnectionDocHref(connector, siteBrand);
  const trialHref = siteBrand === 'bladepipe' ? '/login/' : '/login';
  const quickStartHref = normalizeLinkForSiteBrand('/docs/quick/quick_start_byoc/', siteBrand);
  const categorySummary = getCategorySummary(connector, productName);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [communityModalVisible, setCommunityModalVisible] = useState(false);
  const goToStartDoc = () => {
    window.location.href = startDocHref;
  };
  const handleTrialClick = () => {
    localStorage.setItem('loginSource', 'try_cloud_free');
  };
  const goToTrial = () => {
    handleTrialClick();
    window.location.href = trialHref;
  };
  const handleCommunityClick = () => {
    setCommunityModalVisible(true);
  };
  const goToQuickStart = () => {
    window.location.href = quickStartHref;
  };
  const faqItems = [
    {
      question: translate(
        { id: 'connector.detail.faq.source.question', message: 'Can {productName} use {connectorName} as a source?' },
        { productName, connectorName: connector.name }
      ),
      answer: connector.supportsSource
        ? translate(
            {
              id: 'connector.detail.faq.source.supported',
              message:
                'Yes. {productName} lists {connectorName} as a source connector. Review the product documentation for the exact permissions, network settings, and incremental capture requirements.',
            },
            { productName, connectorName: connector.name }
          )
        : translate(
            {
              id: 'connector.detail.faq.source.unsupported',
              message:
                '{connectorName} is not listed as a source connector on this page. It is positioned for target or integration workflows instead.',
            },
            { connectorName: connector.name }
          ),
    },
    {
      question: translate(
        { id: 'connector.detail.faq.target.question', message: 'Can {productName} write data into {connectorName}?' },
        { productName, connectorName: connector.name }
      ),
      answer: connector.supportsTarget
        ? translate(
            {
              id: 'connector.detail.faq.target.supported',
              message:
                'Yes. {productName} lists {connectorName} as a target connector for downstream delivery. Prepare write permissions and target-side capacity before production use.',
            },
            { productName, connectorName: connector.name }
          )
        : translate(
            {
              id: 'connector.detail.faq.target.unsupported',
              message: '{connectorName} is not listed as a target connector on this page. It is mainly used as a source or integration endpoint.',
            },
            { connectorName: connector.name }
          ),
    },
    {
      question: translate(
        { id: 'connector.detail.faq.pipeline.question', message: 'What is a common {connectorName} data pipeline?' },
        { connectorName: connector.name }
      ),
      answer: pipelineExamples[0].title,
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFaqId((currentId) => (currentId === id ? null : id));
  };

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: brand.name,
        url: brand.url,
      },
      about: {
        '@type': 'SoftwareApplication',
        name: `${connector.name} Connector`,
        applicationCategory: 'Data integration connector',
        operatingSystem: 'Cloud, Linux, Kubernetes, Docker',
        description: translate({ id: connector.descriptionI18nKey, message: connector.description }),
        publisher: {
          '@type': 'Organization',
          name: brand.name,
          url: brand.url,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: brand.name,
          item: brand.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: translate({ id: 'connector.detail.breadcrumb.connectors', message: 'Connectors' }),
          item: new URL('/connector/', siteConfig.url).toString(),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: connector.name,
          item: canonicalUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <JsonLd data={jsonLd} />
      <main className="w-full bg-white">
        <FadeInSection immediate>
          <section className="w-full min-h-[440px] bg-gradient-to-b from-white to-[#eaf6ff] px-4 py-[48px] sm:px-8 lg:px-20 lg:py-[72px]">
            <div className="mx-auto flex max-w-[1320px] flex-col gap-[32px] lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[740px]">
                <h1 className="m-0 text-[34px] font-bold leading-[42px] text-black sm:text-[44px] sm:leading-[54px] lg:text-[56px] lg:leading-[68px]">
                  {connector.name}
                </h1>
                <p className="mt-5 max-w-[720px] text-[17px] font-medium leading-[28px] text-black/75 sm:text-[18px] sm:leading-[30px]">
                  {pageDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={goToStartDoc}
                    className="inline-flex h-[46px] cursor-pointer items-center justify-center rounded-full border-none bg-[#0087c7] px-6 text-[15px] font-bold text-white no-underline transition-colors hover:bg-[#0070a6] focus:outline-none"
                  >
                    <Translate id="connector.detail.startWithDocs">View Docs</Translate>
                  </button>
                </div>
              </div>

              <div className="relative w-full max-w-[420px] rounded-[24px] border border-solid border-[#dbe7ef] bg-white p-7">
                {connector.isBusinessOnly && (
                  <div className="absolute right-5 top-5 rounded-full bg-[#e6f3ff] px-3 py-1">
                    <span className="text-[12px] font-bold leading-5 text-[#0087c7]">
                      <Translate id="connector.detail.businessOnly">Business ONLY</Translate>
                    </span>
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[22px] border border-solid border-[#dbe7ef] bg-white">
                    <svg className="icon-v2 h-14 w-14" aria-hidden="true">
                      <use href={`#icon-v2-${connector.icon}`} xlinkHref={`#icon-v2-${connector.icon}`} />
                    </svg>
                  </div>
                  <h2 className="m-0 mt-5 text-[24px] font-bold leading-8 text-black">{connector.name}</h2>
                  <div className="mt-6 grid w-full grid-cols-2 gap-4">
                    <div className="rounded-[12px] border border-solid border-[#e2ebf2] bg-[#f8fbfd] p-4">
                      <div className="text-[12px] font-bold uppercase text-black/45">
                        <Translate id="connector.detail.source">Source</Translate>
                      </div>
                      <div className="mt-2 text-[16px] font-bold text-black">
                        {connector.supportsSource ? (
                          <Translate id="connector.detail.supported">Supported</Translate>
                        ) : (
                          <Translate id="connector.detail.no">No</Translate>
                        )}
                      </div>
                    </div>
                    <div className="rounded-[12px] border border-solid border-[#e2ebf2] bg-[#f8fbfd] p-4">
                      <div className="text-[12px] font-bold uppercase text-black/45">
                        <Translate id="connector.detail.target">Target</Translate>
                      </div>
                      <div className="mt-2 text-[16px] font-bold text-black">
                        {connector.supportsTarget ? (
                          <Translate id="connector.detail.supported">Supported</Translate>
                        ) : (
                          <Translate id="connector.detail.no">No</Translate>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="w-full px-4 py-[56px] sm:px-8 lg:px-20 lg:py-[80px]">
            <div className="mx-auto max-w-[1320px]">
              <div className="mb-10 max-w-[860px]">
                <h2 className="m-0 text-[30px] font-bold leading-[38px] text-black sm:text-[40px] sm:leading-[50px]">
                  <Translate id="connector.detail.productionTitle" values={{ connectorName: connector.name }}>
                    {'Build production data pipelines with {connectorName}'}
                  </Translate>
                </h2>
                <p className="mt-4 text-[17px] font-medium leading-7 text-black/65 sm:text-[18px] sm:leading-8">
                  {categorySummary}
                </p>
              </div>

              <div className="mb-10 rounded-[18px] border border-solid border-[#dbe7ef] bg-white p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[14px] border border-solid border-[#dbe7ef] bg-white">
                    <svg className="icon-v2 h-8 w-8" aria-hidden="true">
                      <use href={`#icon-v2-${connector.icon}`} xlinkHref={`#icon-v2-${connector.icon}`} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="m-0 text-[24px] font-bold leading-8 text-black">
                      <Translate id="connector.detail.datasourceIntroTitle" values={{ connectorName: connector.name }}>
                        {'{connectorName} data source overview'}
                      </Translate>
                    </h3>
                    <p className="mt-4 text-[16px] font-medium leading-7 text-black/70">
                      <Translate id={connector.descriptionI18nKey}>{connector.description}</Translate>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featureCards.map((feature) => (
                  <div
                    key={feature.title}
                    className="min-h-[220px] rounded-[16px] bg-white p-6 transition-all duration-300 hover:shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01)]"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9f4ff]">
                        <CheckIcon className="h-6 w-6" />
                      </span>
                      <h3 className="m-0 text-[20px] font-bold leading-7 text-black">{feature.title}</h3>
                    </div>
                    <p className="mt-3 text-[15px] font-medium leading-6 text-black/70">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="w-full bg-gradient-to-b from-[#f8fbff] to-white px-4 py-[56px] sm:px-8 lg:px-20 lg:py-[80px]">
            <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
              <div>
                <h2 className="m-0 text-[30px] font-bold leading-[38px] text-black sm:text-[40px] sm:leading-[50px]">
                  <Translate id="connector.detail.pipelineTitle" values={{ connectorName: connector.name }}>
                    {'Common {connectorName} pipeline patterns'}
                  </Translate>
                </h2>
                <div className="mt-8 flex flex-col gap-4">
                  {pipelineExamples.map((example, index) => (
                    <div key={example.title} className="flex gap-4 rounded-[12px] bg-white p-5">
                      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#0087c7] text-[14px] font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="m-0 text-[18px] font-bold leading-7 text-black">{example.title}</h3>
                        <p className="mt-2 text-[15px] font-medium leading-6 text-black/65">{example.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-[16px] border border-solid border-black/10 bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
                <h2 className="m-0 text-[24px] font-bold leading-8 text-black">
                  <Translate id="connector.detail.beforeStart">Before you start</Translate>
                </h2>
                <div className="mt-6 flex flex-col gap-5">
                  {checklistItems.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckIcon className="mt-[3px] h-5 w-5 shrink-0" />
                      <p className="m-0 text-[15px] font-medium leading-6 text-black/75">{item}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>
        </FadeInSection>

        {relatedBlogs.length > 0 && (
          <FadeInSection>
            <section className="w-full min-h-[400px] py-[40px] sm:py-[60px] lg:py-[80px] px-4 sm:px-8 flex justify-center items-start bg-gradient-to-b from-[#e8f4ff] to-white">
              <div className="w-full max-w-[1320px] flex flex-col gap-[30px] sm:gap-[35px] lg:gap-[40px] justify-start items-start">
                <div className="w-full flex justify-start items-center">
                  <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-bold leading-[30px] sm:leading-[33px] lg:leading-[36px] text-black">
                    <Translate id="connector.detail.relatedBlogsTitle">Related Blogs</Translate>
                  </h2>
                </div>
                <BlogCardGrid blogs={relatedBlogs} />
              </div>
            </section>
          </FadeInSection>
        )}

        <FadeInSection>
          <section className="w-full px-4 py-[56px] sm:px-8 lg:px-20 lg:py-[80px]">
            <div className="mx-auto max-w-[1320px]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="m-0 text-[30px] font-bold leading-[38px] text-black sm:text-[40px] sm:leading-[50px]">
                  <Translate id="connector.detail.relatedTitle">Related connectors</Translate>
                </h2>
                <Link
                  to={normalizeLinkForSiteBrand('/connector/', siteBrand)}
                  className="inline-flex w-fit items-center text-[16px] font-bold text-[#0087c7] no-underline hover:text-[#0070a6]"
                >
                  <Translate id="connector.detail.viewAllConnectors">View all connectors</Translate>
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedConnectors.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/connector/${item.slug}/`}
                    className="group flex min-h-[112px] items-center gap-4 rounded-[16px] border border-solid border-[#dbe7ef] bg-white p-5 text-black no-underline transition-all hover:-translate-y-0.5 hover:border-[#0087c7] hover:bg-[#f8fbfd] hover:no-underline"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#e9f4ff]">
                      <svg className="icon-v2 h-6 w-6" aria-hidden="true">
                        <use href={`#icon-v2-${item.icon}`} xlinkHref={`#icon-v2-${item.icon}`} />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[18px] font-bold leading-7">{item.name}</span>
                      <span className="mt-1 block text-[14px] font-medium leading-5 text-black/55">
                        <Translate id={getCategoryI18nKey(item.category)}>{item.category}</Translate>
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="w-full px-4 py-[56px] sm:px-8 lg:px-20 lg:py-[80px]">
            <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[24px] bg-[#071923] shadow-[0_22px_60px_rgba(0,135,199,0.18)]">
              <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-[#0087c7]/25" />
                <div className="absolute bottom-0 right-20 h-24 w-56 rounded-t-full bg-white/10" />
                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
                  <div>
                    <h2 className="m-0 max-w-[780px] text-[28px] font-bold leading-[36px] text-white sm:text-[36px] sm:leading-[46px] lg:text-[42px] lg:leading-[52px]">
                      <Translate id="connector.detail.ctaTitle" values={{ connectorName: connector.name }}>
                        {'Start building {connectorName} data pipelines'}
                      </Translate>
                    </h2>
                    <p className="mt-4 max-w-[760px] text-[16px] font-medium leading-7 text-white/75 sm:text-[18px] sm:leading-8">
                      <Translate id="connector.detail.ctaDescription" values={{ productName, connectorName: connector.name }}>
                        {'Use {productName} to connect {connectorName}, validate the first pipeline, and move from testing to production with observable data movement.'}
                      </Translate>
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 rounded-[18px] border border-solid border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={handleCommunityClick}
                      className="inline-flex h-[48px] cursor-pointer items-center justify-center rounded-full border-none bg-[#0087c7] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#0070a6] focus:outline-none"
                    >
                      <Translate id="connector.detail.ctaCommunity">Free community edition</Translate>
                    </button>
                    <button
                      type="button"
                      onClick={goToTrial}
                      className="inline-flex h-[48px] cursor-pointer items-center justify-center rounded-full border border-solid border-white/35 bg-transparent px-6 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 focus:outline-none"
                    >
                      <Translate id="connector.detail.ctaCloud">Use cloud service</Translate>
                    </button>
                    <button
                      type="button"
                      onClick={goToQuickStart}
                      className="inline-flex h-[48px] cursor-pointer items-center justify-center rounded-full border border-solid border-white/35 bg-transparent px-6 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 focus:outline-none"
                    >
                      <Translate id="connector.detail.ctaQuickStart">Quick start</Translate>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="w-full bg-white px-4 py-[48px] sm:px-8 sm:py-[72px] lg:px-[80px] lg:py-[96px]">
            <div className="mx-auto w-full max-w-[1320px]">
              <div className="mx-auto mb-[40px] w-full max-w-[612px] sm:mb-[50px] lg:mb-[60px]">
                <h2 className="mb-[8px] text-center text-[28px] font-bold leading-[36px] text-black sm:mb-[10px] sm:text-[34px] sm:leading-[42px] lg:mb-[12px] lg:text-[40px] lg:leading-[50px]">
                  <Translate id="connector.detail.faqTitle" values={{ connectorName: connector.name }}>
                    {'{connectorName} connector FAQ'}
                  </Translate>
                </h2>
              </div>

              <div className="mx-auto w-full max-w-[980px]">
                {faqItems.map((item, index) => {
                  const id = index + 1;
                  const isOpen = openFaqId === id;

                  return (
                    <div key={item.question} className="last:mb-0">
                      <div
                        className={`w-full cursor-pointer ${
                          isOpen ? 'h-auto rounded-[16px] sm:rounded-[20px] lg:rounded-[24px]' : 'min-h-[80px] bg-white sm:min-h-[90px] lg:h-[100px]'
                        }`}
                        style={{
                          ...(isOpen
                            ? {
                                background: 'linear-gradient(135deg, #e8f4ff 0%, #ffffff 91.35%)',
                                boxShadow:
                                  '0px 4px 8px rgba(175, 199, 238, 0.1), 0px 14px 14px rgba(175, 199, 238, 0.09), 0px 32px 19px rgba(175, 199, 238, 0.05), 0px 56px 22px rgba(175, 199, 238, 0.01), 0px 88px 25px rgba(175, 199, 238, 0)',
                              }
                            : {
                                borderBottomStyle: 'solid',
                                borderBottomWidth: '1px',
                                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                              }),
                        }}
                        onClick={() => toggleFAQ(id)}
                      >
                        <div className="p-[20px] sm:p-[28px] lg:p-[36px]">
                          <div className={`flex items-start justify-between gap-[16px] sm:items-center ${isOpen ? 'mb-[20px] sm:mb-[25px] lg:mb-[30px]' : 'mb-0'}`}>
                            <h3 className="m-0 flex-1 pr-[8px] text-[18px] font-bold leading-[24px] text-black sm:text-[20px] sm:leading-[26px] lg:text-[22px] lg:leading-[28px]">
                              {item.question}
                            </h3>
                            <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center sm:h-[24px] sm:w-[24px]">
                              {isOpen ? <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" /> : <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />}
                            </div>
                          </div>

                          {isOpen && (
                            <div className="pr-[28px] text-[14px] leading-[20px] text-black opacity-80 sm:pr-[32px] sm:text-[15px] sm:leading-[22px] lg:pr-[40px] lg:text-[16px] lg:leading-[24px]">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>
      <CommunityInstallModal visible={communityModalVisible} onClose={() => setCommunityModalVisible(false)} initialTab="docker" />
      <Footer />
    </Layout>
  );
}
