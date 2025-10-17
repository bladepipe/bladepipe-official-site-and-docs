import React from 'react';
// @ts-ignore
import blogListData from '../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogCardGrid from './BlogCardGrid';

// 动态require所有详细json文件 - 在组件内部动态构建
// 构建permalink到详细json的映射
const permalinkToDetail: Record<string, any> = {};

// 标签映射配置 - 基于 blog/tags.yml
const tagLabels: Record<string, string> = {
  'ai': 'Data & AI',
  'data_insights': 'Data insights',
  'user_stories': 'User stories', 
  'announcement': 'Announcement',
  'tutorials': 'Tutorials',
  'tech_share': 'Tutorials',
};

export default function RecentBlogs() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;

  // 根据 sitebrand 动态构建 require.context 和 permalinkToDetail
  const req = siteBrand === 'clouddm' 
    ? (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-dm-blog.*\.json$/)
    : (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-blog.*\.json$/);
  
  // 构建permalink到详细json的映射
  const permalinkToDetail: Record<string, any> = {};
  req.keys().forEach((key: string) => {
    const detail = req(key);
    if (detail && detail.permalink) {
      permalinkToDetail[detail.permalink] = detail;
    }
  });

  // 根据 sitebrand 过滤 blog 数据
  let filteredBlogItems = blogListData.items;
  
  if (siteBrand === 'clouddm') {
    // 当 sitebrand 为 clouddm 时，只显示 dmBlog 的内容（permalink 以 /blog/ 开头）
    filteredBlogItems = blogListData.items.filter((item: any) => 
      item.permalink.startsWith('/blog/')
    );
  } else {
    // 当 sitebrand 为其他值时，显示默认 blog 的内容（permalink 不以 /blog/ 开头）
    filteredBlogItems = blogListData.items.filter((item: any) => 
      !item.permalink.startsWith('/blog/')
    );
  }

  // 获取除了当前博客外的最新3篇博客
  const latest = filteredBlogItems
    .filter((item: any) => item.permalink !== currentPath)
    .slice(0, 3)
    .map((item: any) => {
      const detail = permalinkToDetail[item.permalink];
      const rawTags = detail?.frontMatter?.tags || [];
      // 映射标签到对应的显示名称
      const mappedTags = rawTags.map((tag: string) => ({
        key: tag,
        label: tagLabels[tag] || tag
      }));
      
      // 获取作者信息 - 支持 authors.yml 配置
      const authorInfo = detail?.authors?.[0] || {};
      const authorName = detail?.frontMatter?.author || authorInfo?.name || (siteBrand === 'clouddm' ? 'CloudDM Team' : 'BladePipe Team');
      const authorImage = authorInfo?.imageURL || authorInfo?.image_url || '';
      
      return {
        title: item.title,
        permalink: item.permalink,
        date: item.date.slice(0, 10),
        author: authorName,
        authorImage: authorImage,
        image: detail?.frontMatter?.image || '',
        tags: mappedTags,
        desc: detail?.description || '',
      };
    });

  if (!latest.length) {
    return null;
  }

  return (
    <section className="w-full py-16 flex flex-col items-center bg-white">
      <div className="w-full max-w-[1320px] mx-auto px-4 pt-12 md:px-8 flex flex-col items-center gap-16 border-t border-black/10 border-solid border-0">
        {/* 标题区 */}
        <div className="w-full flex justify-between items-center">
          <h2 className="text-[24px] font-bold text-black leading-[32px] font-['Plus Jakarta Sans']">
            Latest blog posts
          </h2>
          <a 
            href="/blog" 
            className="inline-flex items-center px-6 py-[10px] bg-[#0087c7] text-white rounded-[8888px] gap-[10px] hover:bg-[#0070a6] transition"
          >
            <span className="text-[16px] font-bold leading-6">Back to blog</span>
            <img src="/img/home/icon/arrow-right.svg" alt="arrow-right" className="w-6 h-6" />
          </a>
        </div>

        {/* 博客卡片区 */}
        <BlogCardGrid blogs={latest} />
      </div>
    </section>
  );
}
