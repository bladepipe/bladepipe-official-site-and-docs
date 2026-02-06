import React, { useEffect } from 'react';
import type { Props as BlogPostPageProps } from '@theme/BlogPostPage';
import BlogPostPage from '@theme-original/BlogPostPage';
import Head from '@docusaurus/Head';

type Props = BlogPostPageProps & {
  children: React.ReactNode;
  content?: any; // Blog post content with frontMatter and metadata
  metadata?: any; // Blog post metadata
};

export default function BlogPostPageWrapper(props: Props): React.JSX.Element {
  const { children, content, metadata, ...blogPostPageProps } = props;

  // 从 blog post 的 content 或 metadata 中获取 title 和 description
  // content 包含 frontMatter 和 metadata，frontMatter 包含从 md 文件 frontmatter 中读取的信息
  const contentMetadata = content?.metadata;
  const contentFrontMatter = content?.frontMatter;
  
  // 优先从 content.metadata 读取，如果没有则从 content.frontMatter 读取
  const blogTitle = contentMetadata?.title || contentFrontMatter?.title || metadata?.title || '';
  const blogDescription = contentMetadata?.description || 
                          contentFrontMatter?.description || 
                          metadata?.description || 
                          '';

  // 使用 useEffect 直接设置 document.title，确保覆盖其他设置
  useEffect(() => {
    if (typeof document !== 'undefined' && blogTitle) {
      document.title = blogTitle;
    }
  }, [blogTitle]);

  return (
    <>
      <Head>
        {blogTitle && <title>{blogTitle}</title>}
        {blogDescription && (
          <meta name="description" content={blogDescription} />
        )}
      </Head>
      <BlogPostPage {...blogPostPageProps} content={content} metadata={metadata}>
        {children}
      </BlogPostPage>
    </>
  );
} 