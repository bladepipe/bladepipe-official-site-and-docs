import React, { useState } from 'react';
import type { Props } from '@theme/BlogTagsPostsPage';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import Translate from '@docusaurus/Translate';
import { useBlogTagsPostsPageTitle } from '@docusaurus/theme-common/internal';
import Pagination from '@site/src/components/Pagination';

export default function BlogTagsPostsPage(props: Props): React.JSX.Element {
  const { tag, items, sidebar, listMetadata } = props;
  const title = useBlogTagsPostsPageTitle(tag);
  const location = useLocation();

  // 获取当前路径的语言前缀，构建正确的博客列表页路径
  const pathname = location.pathname;
  const pathParts = pathname.split('/').filter(Boolean);
  const locale = pathParts[0] === 'zh' || pathParts[0] === 'en' ? pathParts[0] : '';
  const blogListPath = locale ? `/${locale}/blog` : '/blog';

  // 日期格式化函数
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Date parsing error:', error);
      return dateString.toString();
    }
  };

  // 提取所有博客元数据
  const blogs = items.map(item => {
    const { frontMatter, metadata } = item.content;
    const firstAuthor = metadata.authors && metadata.authors.length > 0 ? metadata.authors[0] : null;
    return {
      title: metadata.title,
      image: frontMatter.image,
      tags: metadata.tags.map((t: any) => {
        if (typeof t === 'string') {
          return t;
        } else if (t && typeof t === 'object') {
          return t.label || t.name || t.key || t;
        }
        return t;
      }),
      date: formatDate(metadata.date),
      author: firstAuthor ? firstAuthor.name : '',
      authorImage: firstAuthor ? firstAuthor.imageURL : '',
      permalink: metadata.permalink,
      summary: metadata.description || '',
    };
  });

  // 分页
  const PAGE_SIZE = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / PAGE_SIZE);
  const paged = blogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <BlogLayout sidebar={sidebar}>
      <Head>
        <title>{title}</title>
        {tag.description && (
          <meta name="description" content={tag.description} />
        )}
      </Head>
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8 py-16">
        {/* 标题区 */}
        <div className="mb-12">
          <h1 className="text-[40px] font-bold text-black leading-[50px] mb-4">
            {title}
          </h1>
          {tag.description && (
            <p className="text-lg text-[#52525b] mb-4">{tag.description}</p>
          )}
          <Link 
            to={blogListPath}
            className="text-[#0087c7] hover:underline inline-flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
              <path d="M4 8h8m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <Translate id="blog.tags.backToBlogList" description="Link text to go back to blog list page">
              Back to Blog List
            </Translate>
          </Link>
        </div>
        
        {/* 博客列表区 */}
        <div className="w-full flex flex-col items-center pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full" style={{ gap: '32px' }}>
            {paged.map(blog => (
              <div key={blog.title} className="bg-white rounded-2xl flex flex-col overflow-hidden h-[520px] min-w-[300px]">
                {/* 图片区域 */}
                <a href={blog.permalink} className="w-full h-[280px] overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover" 
                  />
                </a>
                
                {/* 内容区域 */}
                <div className="flex flex-col flex-1 p-0">
                  {/* 标签区域 */}
                  <div className="flex gap-2 px-0 pt-8 pb-4" style={{ gap: '8px' }}>
                    {blog.tags.slice(0, 2).map((tagItem, index) => (
                      <span 
                        key={tagItem} 
                        className={`px-[10px] py-[4px] rounded-full text-[12px] font-medium font-['Plus Jakarta Sans'] leading-[18px] ${
                          index === 0 
                            ? 'bg-[#f9f9fc] text-[#18181b]' 
                            : 'bg-[rgba(0,135,199,0.05)] text-[#0087c7]'
                        }`}
                        style={{ 
                          borderStyle: 'solid', 
                          borderWidth: '1px', 
                          borderColor: index === 0 ? 'rgba(17, 16, 26, 0.2)' : '#0087c7',
                          height: '26px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {tagItem}
                      </span>
                    ))}
                  </div>
                  
                  {/* 标题和描述 */}
                  <div className="flex flex-col gap-3 px-0 pb-4" style={{ gap: '12px' }}>
                    <a 
                      href={blog.permalink} 
                      className="flex items-start gap-4 text-[#131316] hover:text-[#0087c7] transition-colors cursor-pointer no-underline group"
                      style={{ gap: '16px' }}
                    >
                      <span 
                        className="text-xl font-bold text-[#131316] font-['Plus Jakarta Sans'] leading-7 flex-1 group-hover:text-[#0087c7] group-hover:underline"
                        style={{
                          height: '56px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {blog.title}
                      </span>
                      <div className="w-6 h-7 flex items-start pt-1 flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-colors">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#0087c7] transition-colors"/>
                        </svg>
                      </div>
                    </a>
                    <p 
                      className="text-base font-medium text-[#52525b] font-['Plus Jakarta Sans'] leading-6"
                      style={{
                        height: '48px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {blog.summary}
                    </p>
                  </div>
                  
                  {/* 作者信息 */}
                  <div className="flex items-center gap-4 px-0 mt-auto pb-8" style={{ gap: '16px' }}>
                    <div className="w-10 h-10 rounded-full bg-black/10 overflow-hidden">
                      {blog.authorImage ? (
                        <img 
                          src={blog.authorImage} 
                          alt="Author" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const nextElement = target.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs ${blog.authorImage ? 'hidden' : ''}`}>
                        {blog.author.charAt(0)}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span translate="no" className="text-base font-bold text-[#131316] font-['Plus Jakarta Sans'] leading-6">
                        {blog.author}
                      </span>
                      <span className="text-sm font-medium text-[#52525b] font-['Plus Jakarta Sans'] leading-5">
                        {blog.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 分页器 */}
          {totalPages > 1 && (
            <div className="w-full flex justify-center mt-12">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
}
