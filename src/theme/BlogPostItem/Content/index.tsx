import React from 'react';
import type { Props as BlogPostContentProps } from '@theme/BlogPostItem/Content';
import BlogPostItemContent from '@theme-original/BlogPostItem/Content';

type Props = BlogPostContentProps & {
  blogImage?: string;
};

export default function BlogPostItemContentWrapper(props: Props): React.JSX.Element {
  const { blogImage, ...contentProps } = props;

  return (
    <div className="w-full">
      <BlogPostItemContent {...contentProps} />
      
      {/* 博客图片区域 - 现在在标题后面显示 */}
      {/* {blogImage && (
        <div className="w-full bg-white py-8 flex flex-col items-center mb-8">
          <div className="w-[1320px] max-w-full">
            <div className="w-full h-[400px] overflow-hidden rounded-2xl">
              <img 
                src={blogImage} 
                alt="Blog Image" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
