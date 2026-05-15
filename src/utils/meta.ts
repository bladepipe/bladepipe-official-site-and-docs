import siteConfig from '@generated/docusaurus.config';

export interface PageMeta {
  title: string;
  description: string;
}

/**
 * 根据品牌和页面类型获取 meta 信息
 * @param pageType 页面类型: 'home' | 'why' | 'connector' | 'pricing' | 'real-time-analytics' | 'ai-rag' | 'about' | 'blog-list'
 * @param customTitle 自定义标题（可选，会覆盖默认标题）
 * @param customDescription 自定义描述（可选，会覆盖默认描述）
 * @returns PageMeta 对象
 */
export function getPageMeta(
  pageType: string,
  customTitle?: string,
  customDescription?: string
): PageMeta {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  
  // 默认 meta 信息配置
  const metaConfig: Record<string, Record<string, PageMeta>> = {
    clougence: {
      'home': {
        title: 'CloudCanal-企业级数据同步',
        description: 'CloudCanal 提供数据同步、数据迁移、数据集成解决方案，支持60+数据源，实时增量同步，助力企业构建数据驱动的应用。'
      },
      'why': {
        title: '为什么选择 CloudCanal - 数据同步解决方案对比',
        description: '了解 CloudCanal 相比其他数据同步工具的优势，包括高性能、低延迟、易用性等特点，选择最适合您的数据同步解决方案。'
      },
      'connector': {
        title: '60+ 数据源连接器 - CloudCanal | 支持的数据源列表',
        description: 'CloudCanal 支持60+种数据源连接器，包括 MySQL、PostgreSQL、Oracle、Kafka、Redis、Elasticsearch 等，更多连接器持续开发中。'
      },
      'pricing': {
        title: '价格方案 - CloudCanal | 产品定价与版本对比',
        description: '查看 CloudCanal 的详细价格方案，包括社区版、企业版和云服务版本。社区版免费使用，企业版提供更多功能和支持，选择最适合您的数据同步解决方案。'
      },
      'real-time-analytics': {
        title: '实时数据分析解决方案 - CloudCanal | 数据同步与迁移',
        description: 'CloudCanal 提供高性能、低成本的实时数据管道解决方案，支持数百TB数据的实时同步与分析，助力企业构建数据驱动的应用。'
      },
      'ai-rag': {
        title: 'AI RAG 解决方案 - CloudCanal | 智能问答与知识库',
        description: 'CloudCanal 提供完整的 AI RAG 解决方案，支持向量数据库集成、数据自动处理与向量化，构建智能问答系统与知识库。'
      },
      'about': {
        title: '关于我们 - CloudCanal | 公司介绍与团队',
        description: '了解 CloudCanal 的发展历程、团队文化和企业愿景，我们致力于让数据流动更简单、精确、稳定、实时。'
      },
      'blog-list': {
        title: '博客 - CloudCanal | 技术文章与最佳实践',
        description: '阅读 CloudCanal 的技术博客，了解数据同步、数据迁移、数据集成的最佳实践、技术分享和产品更新。'
      }
    },
    clouddm: {
      'home': {
        title: 'CloudDM企业级数据管理工具',
        description: 'CloudDM 提供安全的数据访问、数据库CI/CD、变更管理等功能，简化数据库开发流程，提升生产力。'
      },
      'why': {
        title: '为什么选择 CloudDM - 数据库管理工具对比',
        description: '了解 CloudDM 相比其他数据库管理工具的优势，包括安全访问、CI/CD集成、团队协作等特点，选择最适合您的数据库管理解决方案。'
      },
      'connector': {
        title: '60+ 数据源连接器 - CloudDM | 支持的数据源列表',
        description: 'CloudDM 支持60+种数据源连接器，包括 MySQL、PostgreSQL、Oracle、MongoDB 等，更多连接器持续开发中。'
      },
      'pricing': {
        title: '价格方案 - CloudDM | 产品定价与版本对比',
        description: '查看 CloudDM 的详细价格方案，包括社区版、企业版和云服务版本。社区版免费使用，企业版提供更多功能和支持，选择最适合您的数据管理解决方案。'
      },
      'real-time-analytics': {
        title: '实时数据分析解决方案 - CloudDM | 数据管理工具',
        description: 'CloudDM 提供高性能、低成本的实时数据管道解决方案，支持数百TB数据的实时同步与分析，助力企业构建数据驱动的应用。'
      },
      'ai-rag': {
        title: 'AI RAG 解决方案 - CloudDM | 智能问答与知识库',
        description: 'CloudDM 提供完整的 AI RAG 解决方案，支持向量数据库集成、数据自动处理与向量化，构建智能问答系统与知识库。'
      },
      'about': {
        title: '关于我们 - CloudDM | 公司介绍与团队',
        description: '了解 CloudDM 的发展历程、团队文化和企业愿景，我们致力于提供一站式多数据源开发管理工具。'
      },
      'blog-list': {
        title: '博客 - CloudDM | 技术文章与最佳实践',
        description: '阅读 CloudDM 的技术博客，了解数据库管理、数据安全、CI/CD 集成的最佳实践、技术分享和产品更新。'
      }
    },
    bladepipe: {
      'home': {
        title: 'BladePipe | Real-Time Data Integration & CDC Pipeline Platform',
        description: 'BladePipe is a real-time data integration platform supporting various data sources. Build low-latency, reliable and scalable CDC and ETL pipelines for enterprise data sync, analytics and AI.'
      },
      'why': {
        title: 'Why BladePipe | Enterprise Data Integration at Lower Cost',
        description: 'BladePipe outperforms other data integration tools with real-time CDC, ultra-fast sync, enterprise-grade connectors, lower costs, and reliable end-to-end pipelines.'
      },
      'connector': {
        title: 'Pre-Built Data Integration Connectors | BladePipe',
        description: 'BladePipe offers broad connectors for databases, messages, data warehouses, and data lakes. Easily connect data sources and destinations with ultra-low latency.'
      },
      'pricing': {
        title: 'BladePipe Pricing | Get Started for Free',
        description: 'Transparent and predictable pricing for real-time data integration and ETL. Build pipelines for free, estimate costs, and scale with flexible plans. '
      },
      'real-time-analytics': {
        title: 'Real-Time Analytics Data Pipelines at Scale | BladePipe',
        description: 'Build high-performance, low-cost data pipelines for real-time analytics. BladePipe enables incremental ingestion and unified integration to a data warehouse at scale.'
      },
      'ai-rag': {
        title: 'AI & RAG Pipelines for Unstructured Data | BladePipe',
        description: 'Turn unstructured data into AI-ready RAG APIs in real time. Build scalable AI data pipelines with automated preparation and vector database support.'
      },
      'about': {
        title: 'About BladePipe | Data Integration & Replication Solutions',
        description: 'BladePipe helps teams connect, replicate, and sync data across multiple sources and destinations. Focus on insights and analytics while we handle reliable, high-performance data pipelines.'
      },
      'blog-list': {
        title: 'BladePipe Blog | Insights on Data Strategy and Engineering',
        description: 'Read expert insights and best practices on data integration, real-time sync, migration, replication, and data pipelines for analytics and AI.'
      },
      'login': {
        title: 'BladePipe Login | Access Your Account',
        description: 'Access your BladePipe dashboard to manage and monitor your data integration workflows.'
      },
      'register': {
        title: 'BladePipe Registration | Create Your Account',
        description: 'Start building data pipelines with BladePipe. Create your free account today—no credit card required.'
      },
      'registerFromMarket': {
        title: 'BladePipe Registration | AWS Marketplace',
        description: 'Complete your BladePipe registration after subscribing via AWS Marketplace.'
      },
      'resetPwd': {
        title: 'Reset Your Password | BladePipe',
        description: 'Reset your password to access your BladePipe account.'
      }
    }
  };

  // 获取对应品牌的 meta 配置
  const brandMeta = metaConfig[siteBrand] || metaConfig.bladepipe;
  const pageMeta = brandMeta[pageType] || {
    title: customTitle || siteConfig.title,
    description: customDescription || siteConfig.tagline
  };

  // 如果提供了自定义值，则覆盖默认值
  return {
    title: customTitle || pageMeta.title,
    description: customDescription || pageMeta.description
  };
}
