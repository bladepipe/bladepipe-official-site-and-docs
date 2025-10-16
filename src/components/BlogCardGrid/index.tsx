import React from 'react';
import BlogCard, { type BlogCardProps } from '../BlogCard';

export interface BlogCardGridProps {
  blogs: BlogCardProps[];
  className?: string;
}

export default function BlogCardGrid({ blogs, className = '' }: BlogCardGridProps) {
  if (!blogs?.length) {
    return null;
  }

  return (
    <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center ${className}`}>
      {blogs.map((blog) => (
        <BlogCard key={blog.permalink} {...blog} />
      ))}
    </div>
  );
}
