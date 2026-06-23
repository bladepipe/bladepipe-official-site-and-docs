import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const current_env = process.env.DEPLOYMENT_ENV || 'development';
const SERVICE_URL = {
  development: 'http://localhost:8111',
  staging: 'https://cloudcanal.clougence.com',
  production: 'https://cloudcanal.clougence.com'
};
const CLOUD_URL = {
  development: 'http://localhost:8111',
  staging: 'https://cloudcanal.clougence.com',
  production: 'https://cloudcanal.clougence.com'
};

const config: Config = {
  title: 'CloudCanal-企业级数据同步',
  tagline:
    '数据同步 数据迁移 数据集成 数据复制 数据备份 双向同步 全量 增量 结构迁移 数据校验 数据订正 多活 数据分析 数据库 数仓 消息系统 kafka 缓存 查询',
  favicon: 'img/cc.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.clougence.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ClouGence', // Usually your GitHub org/user name.
  projectName: 'ClouGence Docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
    path: 'i18n'
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'ccDocs',
          sidebarPath: './sidebars.clougence.ts'
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          path: 'ccBlog',
          routeBasePath: 'blog',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true
          },
          postsPerPage: 'ALL',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore'
        },
        sitemap: {
          // 排除不需要出现在 sitemap 中的页面路径（支持 glob 模式）
          ignorePatterns: [
            '/login',
            '/login/',
            '/register',
            '/register/',
            '/registerFromMarket',
            '/registerFromMarket/',
            '/resetPwd',
            '/resetPwd/',
            '/loading',
            '/loading/',
            '/404',
            '/404/',
            '/blog/archive',
            '/blog/archive/',
            '/blog/authors',
            '/blog/authors/',
            '/blog/tags',
            '/blog/tags/',
            '/blog/tags/*',
            '/clouddm',
            '/clouddm/',
            '/clouddm_solution',
            '/clouddm_solution/',
            '/search',
            '/search/',
            '/markdown-page',
            '/markdown-page/',
            '/docs/dataMigrationAndSync/connection/*/*',
            '/zh/docs/dataMigrationAndSync/connection/*/*',
            '/docs/'
          ],
          changefreq: 'weekly',
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/blog-layout.css']
        }
      } satisfies Preset.Options
    ]
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // 启用哈希以提高性能
        hashed: true,
        // 支持的语言
        language: ['en', 'zh'],
        // 在目标页面高亮搜索词
        highlightSearchTermsOnTargetPage: true,
        // 显式搜索结果路径
        explicitSearchResultPath: true,
        // 博客索引
        indexBlog: true,
        // 文档索引
        indexDocs: true,
        // 页面索引
        indexPages: true,
      },
    ],
  ],

  themeConfig: {
    // 禁用主题色切换功能
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: 'img/home/scene_cc1.png',
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    },
    metadata: [
      {
        name: 'description',
        content:
          'Facilitate real-time data replication between diverse data sources, including databases, message queues, search engines, caching, real-time data warehouses, data lakes and more for data-driven decision-making and unprecedented business insights.'
      },
      {
        name: 'keywords',
        content: 'data+movement,data+integration,cdc,etl,integration,real-time,replication,data+replication,data+pipeline,datapipeline,data+science'
      },
      { property: 'og:image', content: 'https://www.clougence.com/img/home/scene_cc1.png' }
    ],
    navbar: {
      title: '',
      logo: {
        alt: 'CloudCanal Logo',
        src: 'img/home/CloudCanal.svg',
        href: '/'
      }
    }
  } satisfies Preset.ThemeConfig,

  scripts: [
    { src: 'https://hm.baidu.com/hm.js?eba8aea455554532bd40288e83ed0125', async: true },
    // 谷歌分析仅 BladePipe 使用，此处不加载
    '/iconfont/datasource.js',
    '/js/ai-bot-config.js',
    { src: 'https://aibot.clougence.com/marked.min.js', defer: true },
    { src: 'https://aibot.clougence.com/ai-bot.js', defer: true }
  ],
  customFields: {
    siteBrand: process.env.SITE_BRAND || 'clougence',
    API_BASE_URL: SERVICE_URL[current_env],
    CLOUD_URL: CLOUD_URL[current_env],
    // 公告栏配置
    announcement: {
      enabled: true, // 设置为 true 启用公告栏
      text: '🎉 CloudCanal 上线 V6.1.0.0：KingbaseES 分区表迁移性能大幅提升', // 公告文本（支持 i18n）
      linkUrl: '/docs/releaseNote/rn-cloudcanal-6-1-0-0', // 链接地址（整个区域可点击）
      endDate: '2026-6-30T23:59:59' // 可选：结束日期（ISO 格式），如 '2025-12-31T23:59:59'，超过此时间后不再显示。不设置则永久显示（当 enabled 为 true 时）
    }
  },

  // 自定义插件：配置 devServer
  plugins: [
    function(context, options) {
      return {
        name: 'custom-devserver-plugin',
        configureWebpack(config, isServer, utils) {
          // 只在客户端构建时配置 devServer
          if (!isServer) {
            return {
              devServer: {
                client: {
                  overlay: false, // 禁用错误遮罩层
                },
              },
            } as any;
          }
          return {};
        },
      };
    },
    require.resolve('./src/plugins/robots-txt-plugin'),
    require.resolve('./src/plugins/llms-txt-plugin'),
    require.resolve('./src/plugins/connection-routes-plugin'),
  ],
};

export default config;
