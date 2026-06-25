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
  customDescription?: string,
  locale?: string
): PageMeta {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const isZh = locale === 'zh';

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
    },
    // BladePipe Chinese (zh locale) meta
    bladepipeZh: {
      'home': {
        title: 'BladePipe | 实时数据集成与 CDC 管道平台',
        description: 'BladePipe 是实时数据集成平台，支持多种数据源。为企业数据同步、分析与 AI 构建低延迟、高可靠、可扩展的 CDC 和 ETL 管道。'
      },
      'why': {
        title: '为什么选择 BladePipe | 低成本企业级数据集成',
        description: 'BladePipe 以实时 CDC、超快同步、企业级连接器、更低成本和可靠的端到端管道，超越其他数据集成工具。'
      },
      'connector': {
        title: '预构建数据集成连接器 | BladePipe',
        description: 'BladePipe 提供丰富的数据库、消息队列、数据仓库和数据湖连接器，以超低延迟轻松连接数据源与目的地。'
      },
      'pricing': {
        title: 'BladePipe 价格方案 | 免费开始使用',
        description: '实时数据集成的透明、可预估定价。免费构建管道，估算成本，灵活扩展。'
      },
      'real-time-analytics': {
        title: '大规模实时分析数据管道 | BladePipe',
        description: '构建高性能、低成本的实时分析数据管道。BladePipe 支持大规模增量采集与统一集成到数据仓库。'
      },
      'ai-rag': {
        title: 'AI 与 RAG 非结构化数据管道 | BladePipe',
        description: '将非结构化数据实时转化为 AI 就绪的 RAG API。构建可扩展的 AI 数据管道，支持自动数据处理与向量数据库集成。'
      },
      'about': {
        title: '关于 BladePipe | 数据集成与复制解决方案',
        description: 'BladePipe 帮助团队跨多个数据源与目的地连接、复制和同步数据。让您专注于洞察与分析，由我们处理可靠、高性能的数据管道。'
      },
      'blog-list': {
        title: 'BladePipe 博客 | 数据策略与工程洞察',
        description: '阅读专家关于数据集成、实时同步、迁移、复制以及分析与 AI 数据管道的最佳实践与洞察。'
      },
      'login': {
        title: 'BladePipe 登录 | 访问您的账户',
        description: '登录您的 BladePipe 控制台，管理和监控数据集成工作流。'
      },
      'register': {
        title: 'BladePipe 注册 | 创建您的账户',
        description: '开始使用 BladePipe 构建数据管道。立即创建免费账户，无需信用卡。'
      },
      'registerFromMarket': {
        title: 'BladePipe 注册 | AWS 云市场',
        description: '通过 AWS 云市场订阅后，完成您的 BladePipe 注册。'
      },
      'resetPwd': {
        title: '重置密码 | BladePipe',
        description: '重置密码以访问您的 BladePipe 账户。'
      }
    }
  };

  // 获取对应品牌的 meta 配置
  // For bladepipe with zh locale, use the Chinese meta; otherwise use brand default
  const effectiveBrand = (isZh && siteBrand === 'bladepipe') ? 'bladepipeZh' : siteBrand;
  const brandMeta = metaConfig[effectiveBrand] || metaConfig[siteBrand] || metaConfig.bladepipe;
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
