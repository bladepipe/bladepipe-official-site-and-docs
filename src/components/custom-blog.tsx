import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import siteConfig from '@generated/docusaurus.config';
// @ts-ignore
import blogListData from '../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import BlogCardGrid from './BlogCardGrid';

// 获取 siteBrand
const siteBrand = siteConfig.customFields?.siteBrand as string;

let req = null;
// 动态require所有详细json文件
if (siteBrand === 'clougence') {
  req = (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-cc-blog.*\.json$/);
} else {
  req = (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-blog.*\.json$/);
}
// 构建permalink到详细json的映射
const permalinkToDetail: Record<string, any> = {};
req.keys().forEach((key: string) => {
  const detail = req(key);
  if (detail && detail.permalink) {
    permalinkToDetail[detail.permalink] = detail;
  }
});

// 标签映射配置 - 基于 blog/tags.yml
const getTagLabels = (): Record<string, string> => {
  return {
    'ai': translate({ id: 'customBlog.tags.ai', message: 'Data & AI' }),
    'data_insights': translate({ id: 'customBlog.tags.data_insights', message: 'Data insights' }),
    'user_stories': translate({ id: 'customBlog.tags.user_stories', message: 'User stories' }),
    'announcement': translate({ id: 'customBlog.tags.announcement', message: 'Announcement' }),
    'tutorials': translate({ id: 'customBlog.tags.tutorials', message: 'Tutorials' }),
    'tech_share': translate({ id: 'customBlog.tags.tech_share', message: 'Tutorials' }),
  };
};

export default function CustomBlog() {
  const tagLabels = getTagLabels();
  
  // 取最新三篇
  const latest = blogListData.items.slice(0, 3).map((item: any) => {
    const detail = permalinkToDetail[item.permalink];
    const rawTags = detail?.frontMatter?.tags || [];
    // 映射标签到对应的显示名称
    const mappedTags = rawTags.map((tag: string) => ({
      key: tag,
      label: tagLabels[tag] || tag
    }));
    
    // 获取作者信息 - 支持 authors.yml 配置
    const authorInfo = detail?.authors?.[0] || {};
    const authorName = detail?.frontMatter?.author || authorInfo?.name || (siteBrand === 'clougence' ? 'CloudCanal Team' : 'BladePipe Team');
    const authorImage = authorInfo?.imageURL || authorInfo?.image_url || '';

    console.log('detail', detail);
    
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

  return (
    <section className="w-full py-24 flex flex-col items-center bg-white">
      <div className="w-full max-w-[1728px] mx-auto px-4 md:px-8 flex flex-col items-center gap-16">
        {/* 标题区 */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <h2 className="text-[40px] font-bold text-black leading-[50px] text-center">
            {siteBrand === 'clougence' ? (
              <Translate id="customBlog.title.clougence">
                More about CloudCanal
              </Translate>
            ) : (
              <Translate id="customBlog.title">
                More about BladePipe
              </Translate>
            )}
          </h2>
          <div className="text-[18px] text-[#26272B] leading-[28px] font-medium text-center">
            {siteBrand === 'clougence' ? (
              <Translate id="customBlog.subtitle.clougence">
                Discover the great potential of CloudCanal.
              </Translate>
            ) : (
              <Translate id="customBlog.subtitle">
                Discover the great potential of BladePipe.
              </Translate>
            )}
          </div>
        </div>
        {/* 博客卡片区 */}
        <BlogCardGrid blogs={latest} className="max-w-[1320px]" />
      </div>
    </section>
  );
} 