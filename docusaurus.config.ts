import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const current_env = process.env.DEPLOYMENT_ENV || 'development';
const isDevelopment = current_env === 'development';
const SERVICE_URL = {
  development: 'http://localhost:8111',
  staging: 'https://test-cloud.askcug.cn',
  production: 'https://api-sg.bladepipe.com'
};
const CLOUD_URL = {
  development: 'http://localhost:8111',
  staging: 'https://test-cloud.askcug.cn',
  production: 'https://cloud.bladepipe.com'
};
const config: Config = {
  title: 'BladePipe',
  trailingSlash: true,
  tagline:
    'Build end-to-end data pipelines between 60+ datasources for analytics or AI in minutes. Move data faster and easier than ever in Cloud or On-Premise, with ultra-low latency less than 3 seconds.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.bladepipe.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'BladePipe', // Usually your GitHub org/user name.
  projectName: 'BladePipe Docs', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['zh', 'en'],
    path: 'i18n'
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts'
          // Edit this page links have been removed
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true
          },
          postsPerPage: 'ALL',
          // Edit this page links have been removed
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogSidebarCount: 'ALL', // 生成所有博客数据，但在布局中不显示侧边栏
          blogListComponent: '@theme/BlogListPage',
          blogPostComponent: '@theme/BlogPostPage'
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
            '/docs/'
          ],
          changefreq: 'weekly',
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            './src/css/blog-layout.css',
            './src/css/blog-content.css',
            './src/css/navbar.css',
            './src/css/blog-list.css'
          ]
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
    image: 'img/home/banner.png',
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    },
    metadata: [
      {
        name: 'description',
        content:
          'BladePipe is a real-time data integration platform supporting various data sources. Build low-latency, reliable and scalable CDC and ETL pipelines for enterprise data sync, analytics and AI.'
      },
      { property: 'og:image', content: 'https://www.bladepipe.com/img/home/banner.png' }
    ],
    navbar: {
      title: '',
      logo: {
        alt: 'BladePipe Logo',
        src: 'img/home/BladePipe.png',
        href: '/'
      },
        items: [
          {
            type: 'doc',
            docId: 'intro/product_intro',
            position: 'left',
            label: 'Docs'
          }
        ]
    },
    // 注释掉 Algolia 配置，准备申请真实的 API key
    // algolia: {
    //   // Algolia DocSearch 配置
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'YOUR_INDEX_NAME',
    //
    //   // 可选配置
    //   contextualSearch: true,
    //   searchParameters: {},
    //   searchPagePath: 'search',
    //
    //   // 国际化配置
    //   translations: {
    //     button: {
    //       buttonText: '搜索文档',
    //       buttonAriaLabel: '搜索文档',
    //     },
    //   },
    // }
  } satisfies Preset.ThemeConfig,

  scripts: [
    { src: 'https://hm.baidu.com/hm.js?9a18d2c0bad7c7472febb245db950168', async: true },
    // 仅在非 development 环境加载 GA4，避免本地 start 产生统计数据
    ...(!isDevelopment
      ? [
          { src: 'https://www.googletagmanager.com/gtag/js?id=G-QFL3CQMTBN', async: true },
          { src: '/analytics.js' },
        ]
      : []),
    '/iconfont/datasource.js',
    // 本地预加载 Google Translate 脚本（需将 element.js 放入 static/translate/）
    { src: '/translate/element.js', async: true }
  ],
  customFields: {
    siteBrand: process.env.SITE_BRAND || 'bladepipe',
    API_BASE_URL: SERVICE_URL[current_env],
    CLOUD_URL: CLOUD_URL[current_env],
    // 公告栏配置
    announcement: {
      enabled: true, // 设置为 true 启用公告栏
      text: 'BladePipe 1.7.0: Stronger alerts, Broader DB support, Faster KingbaseES scanning.', // 公告文本（支持 i18n）
      linkUrl: '/docs/releaseNote/rn-bladepipe-1-7-0/', // 链接地址（整个区域可点击）
      endDate: '2026-06-30T23:59:59' // 可选：结束日期（ISO 格式），如 '2025-12-31T23:59:59'，超过此时间后不再显示。不设置则永久显示（当 enabled 为 true 时）
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
    require.resolve('./src/plugins/gtm-plugin'),
  ],
};

export default config;
