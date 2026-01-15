import type { Plugin, LoadContext } from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Docusaurus 插件：根据 SITE_BRAND 环境变量动态生成 robots.txt
 * 会根据配置的 url 和 baseUrl 自动生成正确的 sitemap 地址
 */
export default function robotsTxtPlugin(
  context: LoadContext,
  options: Record<string, unknown>
): Plugin {
  return {
    name: 'robots-txt-plugin',
    async postBuild(props: { outDir: string }) {
      const { outDir } = props;
      const { siteConfig } = context;
      const { url, baseUrl } = siteConfig;
      
      // 构建完整的 sitemap URL
      // 移除 baseUrl 末尾的斜杠（如果有），然后拼接 sitemap.xml
      const baseUrlNormalized = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const sitemapUrl = `${url}${baseUrlNormalized}/sitemap.xml`;
      
      // robots.txt 内容
      const robotsTxtContent = `User-agent: *
Allow: /

# 禁止爬取特定路径
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /build/

# 站点地图
Sitemap: ${sitemapUrl}

# Algolia-Crawler-Verif: BBDAA80DB036410C`;

      // 写入 robots.txt 文件
      const robotsTxtPath = path.join(outDir, 'robots.txt');
      fs.writeFileSync(robotsTxtPath, robotsTxtContent, 'utf-8');
      
      console.log(`✓ Generated robots.txt with sitemap: ${sitemapUrl}`);
    },
  };
}

