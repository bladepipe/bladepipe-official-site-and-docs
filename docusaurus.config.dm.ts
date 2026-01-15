import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const current_env = process.env.DEPLOYMENT_ENV || "development";
const SERVICE_URL = {
  development: "http://192.168.0.137:8222",
  staging: "https://console.cdmgr.com",
  production: "https://console.cdmgr.com",
};
const CLOUD_URL = {
  development: "http://localhost:8080",
  staging: "https://console.cdmgr.com",
  production: "https://console.cdmgr.com",
};
const config: Config = {
  title: "CloudDM - 一站式多数据源开发管理工具",
  tagline: "安全的数据访问，一键串联数据库变更与应用发布，简化流程，提升生产力",
  favicon: "img/dm.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://www.cdmgr.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "CloudDM", // Usually your GitHub org/user name.
  projectName: "CloudDM Docs", // Usually your repo name.

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['zh', 'en'],
  //   path: 'i18n'
  // },
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    path: "i18n",
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "dmDocs",
          sidebarPath: "./sidebars.dm.ts",
          // Edit this page links have been removed
        },
        blog: {
          path: "dmBlog",
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          postsPerPage: "ALL",
          // Edit this page links have been removed
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          blogSidebarCount: "ALL", // 生成所有博客数据，但在布局中不显示侧边栏
          blogListComponent: "@theme/BlogListPage",
          blogPostComponent: "@theme/BlogPostPage",
        },
        theme: {
          customCss: [
            "./src/css/custom.css",
            "./src/css/blog-layout.css",
            "./src/css/blog-content.css",
            "./src/css/navbar.css",
            "./src/css/blog-list.css",
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // 启用哈希以提高性能
        hashed: true,
        // 支持的语言
        language: ["zh", "en"],
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
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    metadata: [
      {
        name: "description",
        content:
          "安全的数据访问，一键串联数据库变更与应用发布，简化流程，提升生产力",
      },
      {
        name: "keywords",
        content:
          "数据安全,数据访问,权限管理,数据脱敏,sql规则,数据查询,sql,数据管理,sql审核,sql校验,cicd",
      },
    ],
    navbar: {
      title: "",
      logo: {
        alt: "CloudDM Logo",
        src: "img/home/CloudDM.svg",
        href: "/",
      },
    },
  } satisfies Preset.ThemeConfig,

  scripts: [
    {
      src: "https://hm.baidu.com/hm.js?05353b0ff2c80cb3ade3c53ee1ae2d71",
      async: true,
    },
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-0NCQHMHBDL",
      async: true,
    },
    { src: "/analytics.js" },
    "/iconfont/datasource.js",
  ],
  customFields: {
    siteBrand: process.env.SITE_BRAND || "clouddm",
    API_BASE_URL: SERVICE_URL[current_env],
    CLOUD_URL: CLOUD_URL[current_env],
    // 公告栏配置
    announcement: {
      enabled: false, // 设置为 true 启用公告栏
      text: '新功能上线！查看我们的最新更新。', // 公告文本（支持 i18n）
      linkUrl: '/docs/intro', // 链接地址（整个区域可点击）
      endDate: undefined // 可选：结束日期（ISO 格式），如 '2025-12-31T23:59:59'，超过此时间后不再显示。不设置则永久显示（当 enabled 为 true 时）
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
  ],
};

export default config;
