import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import BlogCardGrid from '@site/src/components/BlogCardGrid';
import Translate from '@docusaurus/Translate';

// @ts-ignore
import blogListData from '../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

// 标签映射配置 - 基于 blog/tags.yml
const tagLabels: Record<string, string> = {
  'ai': 'Data & AI',
  'data_insights': 'Data insights',
  'user_stories': 'User stories', 
  'announcement': 'Announcement',
  'tutorials': 'Tutorials',
  'tech_share': 'Tutorials',
};

export default function BlogPostRecommendations() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);

  useEffect(() => {
    try {
      // 根据 sitebrand 动态构建 require.context
      let req;
      if (siteBrand === 'clouddm') {
        req = (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-dm-blog.*\.json$/);
      } else if (siteBrand === 'bladepipe') {
        req = (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-blog.*\.json$/);
      } else {
        req = (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-.*\.json$/);
      }
      // 构建permalink到详细json的映射
      const permalinkToDetail: Record<string, any> = {};
      if (req && req.keys) {
        req.keys().forEach((key: string) => {
          try {
            const detail = req(key);
            if (detail && detail.permalink) {
              permalinkToDetail[detail.permalink] = detail;
            }
          } catch (e) {
            console.warn('Failed to load blog detail:', key, e);
          }
        });
      }

      // 根据 sitebrand 过滤 blog 数据
      let filteredBlogItems = blogListData?.items || [];
      
      filteredBlogItems = filteredBlogItems.filter((item: any) => 
        item.permalink && item.permalink.startsWith('/blog/')
      );

      // 获取除了当前博客外的最新3篇博客
      const latest = filteredBlogItems
        .filter((item: any) => item.permalink && item.permalink !== currentPath)
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
          const authorName = detail?.frontMatter?.author || authorInfo?.name || (siteBrand === 'clouddm' ? 'CloudDM Team' : siteBrand === 'clougence' ? 'CloudCanal Team' : 'BladePipe Team');
          const authorImage = authorInfo?.imageURL || authorInfo?.image_url || '';
          
          return {
            title: item.title,
            permalink: item.permalink,
            date: item.date ? item.date.slice(0, 10) : '',
            author: authorName,
            authorImage: authorImage,
            image: detail?.frontMatter?.image || '',
            tags: mappedTags,
            desc: detail?.description || '',
          };
        })
        .filter((blog: any) => blog.title && blog.permalink); // 过滤掉无效的博客

      setLatestBlogs(latest);
    } catch (error) {
      console.error('Failed to load recent blogs:', error);
      setLatestBlogs([]);
    }
  }, [currentPath, siteBrand]);

  return (
    <section className="w-full py-16 flex flex-col items-center bg-[#0087c7]">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center gap-12">
        {/* 标题和返回按钮区 */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {latestBlogs.length > 0 && (
            <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-[32px] font-['Plus Jakarta Sans']">
              <Translate id="blog.recommendations.title">Recent blog posts</Translate>
            </h2>
          )}
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-[10px] bg-white text-[#0087c7] rounded-[8888px] gap-[10px] hover:bg-gray-100 transition-colors no-underline ml-auto"
          >
            <span className="text-[16px] font-bold leading-6">
              <Translate id="blog.recommendations.backToList">Back to blog</Translate>
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* 博客卡片区 */}
        {latestBlogs.length > 0 && <BlogCardGrid blogs={latestBlogs} />}
      </div>
    </section>
  );
}
