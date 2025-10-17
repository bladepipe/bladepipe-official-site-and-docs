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
  title: '让数据流动更简单、精确、稳定、实时，丰富业务数据应用场景',
  tagline:
    'Build end-to-end data pipelines between 60+ datasources for analytics or AI in minutes. Move data faster and easier than ever in Cloud or On-Premise, with ultra-low latency less than 3 seconds.',
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
        theme: {
          customCss: ['./src/css/custom.css', './src/css/blog-layout.css']
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
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
        alt: 'CloudCanal Logo',
        src: 'img/home/CloudCanal.svg',
        href: '/'
      }
    }
  } satisfies Preset.ThemeConfig,

  scripts: [
    { src: 'https://hm.baidu.com/hm.js?eba8aea455554532bd40288e83ed0125', async: true },
    { src: '/analytics.js' },
    '/iconfont/datasource.js',
    '/js/ai-bot-config.js',
    { src: 'https://aibot.clougence.com/marked.min.js', defer: true },
    { src: 'https://aibot.clougence.com/ai-bot.js', defer: true }
  ],
  customFields: {
    siteBrand: process.env.SITE_BRAND || 'clougence',
    API_BASE_URL: SERVICE_URL[current_env],
    CLOUD_URL: CLOUD_URL[current_env]
  }
};

export default config;
