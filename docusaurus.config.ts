import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const current_env = process.env.DEPLOYMENT_ENV || 'development';
const SERVICE_URL = {
  development: 'http://localhost:8111',
  staging: 'https://test-cloud.askcug.cn',
  production: 'https://api.bladepipe.com'
};
const CLOUD_URL = {
  development: 'http://localhost:8111',
  staging: 'https://test-cloud.askcug.cn',
  production: 'https://cloud.bladepipe.com'
};
const config: Config = {
  title: 'BladePipe - Replicate data in real-time, incremental, end-to-end, secure',
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
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['zh', 'en'],
  //   path: 'i18n'
  // },

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

  themeConfig: {
    // 禁用主题色切换功能
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
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
      { property: 'og:image', content: 'https://www.bladepipe.com/banner_for_link.png' }
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
            docId: 'intro',
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
    { src: 'https://www.googletagmanager.com/gtag/js?id=G-0NCQHMHBDL', async: true },
    { src: '/analytics.js' },
    '/iconfont/datasource.js'
  ],
  customFields: {
    siteBrand: process.env.SITE_BRAND || 'bladepipe',
    API_BASE_URL: SERVICE_URL[current_env],
    CLOUD_URL: CLOUD_URL[current_env],
    // 公告栏配置
    announcement: {
      enabled: false, // 设置为 true 启用公告栏
      text: 'New features available! Check out our latest updates.', // 公告文本（支持 i18n）
      linkUrl: '/docs/intro', // 链接地址（整个区域可点击）
      endDate: undefined // 可选：结束日期（ISO 格式），如 '2025-12-31T23:59:59'，超过此时间后不再显示。不设置则永久显示（当 enabled 为 true 时）
    }
  }
};

export default config;
