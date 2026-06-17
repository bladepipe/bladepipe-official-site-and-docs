import React from 'react';
import Link from '@docusaurus/Link';

export interface BlogCardProps {
  title: string;
  permalink: string;
  date: string;
  author: string;
  authorImage?: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  tags: Array<{
    key: string;
    label: string;
  }>;
  desc: string;
}

export default function BlogCard({
  title,
  permalink,
  date,
  author,
  authorImage,
  image,
  imageFit = 'cover',
  tags,
  desc,
}: BlogCardProps) {
  const imageClassName =
    imageFit === 'contain'
      ? 'w-full h-full object-contain p-3 transition-transform duration-300 group-hover/image:scale-105'
      : 'w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105';

  return (
    <div className="block bg-white rounded-xl flex flex-col overflow-hidden w-full max-w-[413px] mx-auto">
      {/* 图片区域 - 240px 高度 */}
      <Link to={permalink} className="block no-underline">
        <div className="relative w-full h-[240px] overflow-hidden rounded-t-xl bg-[#F8F9FB] group/image">
          <img 
            src={image} 
            alt={title} 
            className={imageClassName}
          />
        </div>
      </Link>
      
      {/* 内容区域 */}
      <div className="flex flex-col p-8 flex-1 gap-8">
        {/* 标签和内容区域 */}
        <div className="flex flex-col gap-4">
          {/* 标签区域 */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span 
                key={tag.key} 
                className="inline-flex items-center px-[10px] py-1 bg-[#F8F9FB] text-[#181818] text-xs font-medium rounded-full border border-solid border-black/20"
                style={{ borderRadius: '8888px' }}
              >
                {tag.label}
              </span>
            ))}
          </div>
          
          {/* 标题和描述区域 */}
          <div className="flex flex-col gap-3">
            {/* 标题区域 */}
            <Link to={permalink} className="flex items-start justify-between gap-4 group/title no-underline">
              <h3 className="text-xl font-bold text-black leading-[30px] flex-1 group-hover/title:text-[#0087C7] group-hover/title:underline transition-colors cursor-pointer h-[60px] line-clamp-2 overflow-hidden">
                {title}
              </h3>
              {/* 箭头图标 */}
              <div className="flex-shrink-0 w-6 h-7 flex items-center justify-center pt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black group-hover/title:text-[#0087C7] transition-colors"/>
                </svg>
              </div>
            </Link>
            
            {/* 描述文字 */}
            <p className="text-base font-medium text-[#515259] leading-6 line-clamp-2 h-[48px] overflow-hidden">
              {desc}
            </p>
          </div>
        </div>
        
        {/* 作者信息区域 */}
        <div className="flex items-center gap-4">
          {/* 头像 */}
          <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0 overflow-hidden">
            {authorImage ? (
              <img 
                src={authorImage} 
                alt={author}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 如果图片加载失败，显示首字母
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`w-full h-full bg-gradient-to-br from-[#0087C7] to-[#006ba6] flex items-center justify-center ${authorImage ? 'hidden' : 'flex'}`}
              style={{ display: authorImage ? 'none' : 'flex' }}
            >
              <span className="text-white text-sm font-bold">
                {author ? author.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
          </div>
          
          {/* 作者名和日期 */}
          <div className="flex flex-col">
            <div className="text-base font-bold text-[#131316] leading-6">
              {author || 'BladePipe Team'}
            </div>
            <div className="text-sm font-medium text-[#515259] leading-5">
              {new Date(date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
