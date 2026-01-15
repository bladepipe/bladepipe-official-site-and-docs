import React, { useState, useEffect } from 'react';
import type { Props } from '@theme/BlogListPage';
import Head from '@docusaurus/Head';
import { Tabs, Select } from 'antd';
import Navbar from '@site/src/theme/Navbar';
import Footer from '@site/src/components/Footer';
import Pagination from '@site/src/components/Pagination';
import { getPageMeta } from '@site/src/utils/meta';

export default function BlogListPage({ metadata, items, sidebar }: Props) {
  // 日期格式化函数
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      // 只返回 YYYY-MM-DD 格式
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

  console.log('blogs', blogs);

  // 分类列表
  const allTags = Array.from(new Set(blogs.flatMap(b => b.tags)));
  const categories = ['All', ...allTags];

  // 轮播 featured（取前3篇）
  const featured = blogs.slice(0, 3);
  const [carouselIdx, setCarouselIdx] = useState(0);
  // 分类筛选
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? blogs : blogs.filter(b => b.tags.includes(category));
  // 分页
  const PAGE_SIZE = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 获取博客列表页的 meta 信息
  const blogMeta = getPageMeta('blog-list');

  // 使用 useEffect 直接设置 document.title，确保覆盖其他设置
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = blogMeta.title;
    }
  }, [blogMeta.title]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <title>{blogMeta.title}</title>
        <meta name="description" content={blogMeta.description} />
      </Head>
      <Navbar />
      {/* 轮播区 */}
      {featured.length > 0 && (
        <div className="w-full bg-white pt-20 pb-10 flex flex-col items-center">
          <h1 className="hidden">Blog</h1>
          <div className="w-[1320px] max-w-full relative min-h-[340px] flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group px-4 lg:px-0">
            {/* 轮播按钮容器 */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button 
                className="absolute left-4 w-[42px] h-[42px] bg-white/80 hover:bg-white/90 border-0 rounded-full flex items-center justify-center transition-colors cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIdx((carouselIdx - 1 + featured.length) % featured.length);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                className="absolute right-4 w-[42px] h-[42px] bg-white/80 hover:bg-white/90 border-0 rounded-full flex items-center justify-center transition-colors cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIdx((carouselIdx + 1) % featured.length);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 左侧内容区域 */}
            <div className="w-full lg:w-[556px] flex flex-col gap-4">
              {/* 标签区域 */}
              <div className="flex flex-wrap gap-2">
                {featured[carouselIdx].tags.map((tag, index) => (
                  <span 
                    key={tag} 
                    className="px-[14px] py-[8px] rounded-full text-[14px] font-medium font-['Plus Jakarta Sans'] leading-[20px] bg-[#f9f9fc] text-[#18181b]"
                    style={{ 
                      borderStyle: 'solid', 
                      borderWidth: '1px', 
                      borderColor: 'rgba(17, 16, 26, 0.2)',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* 标题和描述 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4">
                  <h2 
                    className="text-2xl lg:text-3xl font-bold text-[#131316] font-['Plus Jakarta Sans'] leading-8 lg:leading-10 flex-1 cursor-pointer hover:text-[#0087c7] hover:underline transition-colors"
                    style={{
                      minHeight: '64px',
                      maxHeight: '80px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    onClick={() => window.open(featured[carouselIdx].permalink, '_self')}
                  >
                    {featured[carouselIdx].title}
                  </h2>
                  <div className="w-6 h-7 flex items-start pt-1 flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#131316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p 
                  className="text-lg lg:text-xl font-medium text-[#52525b] font-['Plus Jakarta Sans'] leading-6 lg:leading-7"
                  style={{
                    minHeight: '48px',
                    maxHeight: '56px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {featured[carouselIdx].summary}
                </p>
              </div>
              
              {/* 作者信息 */}
              <div className="flex items-center gap-5">
                <div className="w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] rounded-full bg-black/10 overflow-hidden">
                  {featured[carouselIdx].authorImage ? (
                    <img 
                      src={featured[carouselIdx].authorImage} 
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
                  <div className={`w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm ${featured[carouselIdx].authorImage ? 'hidden' : ''}`}>
                    {featured[carouselIdx].author.charAt(0)}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span translate="no" className="text-base lg:text-lg font-bold text-[#131316] font-['Plus Jakarta Sans'] leading-6 lg:leading-7">
                    {featured[carouselIdx].author}
                  </span>
                  <span className="text-sm lg:text-base font-medium text-[#52525b] font-['Plus Jakarta Sans'] leading-5 lg:leading-6">
                    {featured[carouselIdx].date}
                  </span>
                </div>
              </div>
            </div>
            
            {/* 右侧图片区域 */}
            <div className="w-full lg:w-[700px] aspect-[700/340] relative">
              <img 
                src={featured[carouselIdx].image} 
                alt={featured[carouselIdx].title} 
                className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(featured[carouselIdx].permalink, '_self')}
              />
            </div>
          </div>
        </div>
      )}
      {/* 分类筛选区 */}
      <div className="w-full flex flex-row justify-center mt-24 mb-12 px-4">
        {/* 大屏显示 Tabs */}
        <div className="hidden md:block w-[1320px] max-w-full h-[50px] border border-black/10 rounded-full flex items-center px-0 overflow-hidden">
          <Tabs
            activeKey={category}
            onChange={(key) => { setCategory(key); setPage(1); }}
            items={categories.map(cat => ({
              key: cat,
              label: cat,
            }))}
            className="w-full custom-tabs"
            style={{
              fontFamily: 'Plus Jakarta Sans',
            }}
            tabBarStyle={{
              margin: 0,
              height: '50px',
            }}
            tabBarGutter={2}
          />
        </div>
        {/* 小屏显示 Select */}
        <div className="block md:hidden w-full max-w-[400px]">
          <Select
            value={category}
            onChange={(value) => { setCategory(value); setPage(1); }}
            options={categories.map(cat => ({
              value: cat,
              label: cat,
            }))}
            className="w-full"
            size="large"
            style={{
              fontFamily: 'Plus Jakarta Sans',
            }}
            popupClassName="blog-category-select-dropdown"
          />
        </div>
      </div>
      {/* 博客列表区 */}
      <div className="w-full flex flex-col items-center pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[1320px] max-w-full px-4" style={{ gap: '32px' }}>
          {paged.map(blog => (
            <div key={blog.title} className="bg-white rounded-2xl flex flex-col overflow-hidden h-[520px] min-w-[300px]">
              {/* 图片区域 */}
              <a href={blog.permalink}  className="w-full h-[280px] overflow-hidden">
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
                  {blog.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={tag} 
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
                      {tag}
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
                        height: '56px', // 两行的固定高度 (28px * 2)
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
                      height: '48px', // 两行的固定高度 (24px * 2)
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
      <Footer />
    </div>
  );
} 