import React, { useEffect } from 'react';
import type { Props as BlogPostPageProps } from '@theme/BlogPostPage';
import BlogPostPage from '@theme-original/BlogPostPage';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import JsonLd from '@site/src/components/JsonLd';
import { getArticleStructuredData } from '@site/src/utils/structuredData';

type Props = BlogPostPageProps & {
  children: React.ReactNode;
  content?: any; // Blog post content with frontMatter and metadata
  metadata?: any; // Blog post metadata
};

export default function BlogPostPageWrapper(props: Props): React.JSX.Element {
  const { children, content, metadata, ...blogPostPageProps } = props;
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;

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
  const permalink = contentMetadata?.permalink || metadata?.permalink;
  const pageUrl = permalink
    ? new URL(permalink, siteConfig.url).toString()
    : undefined;
  const image = contentFrontMatter?.image || contentMetadata?.frontMatter?.image;
  const imageUrl = image
    ? new URL(image, siteConfig.url).toString()
    : undefined;
  const authors = contentMetadata?.authors || metadata?.authors || [];
  const authorName = Array.isArray(authors)
    ? authors.map((author) => author?.name).filter(Boolean).join(', ')
    : undefined;
  const datePublished = contentMetadata?.date || metadata?.date || contentFrontMatter?.date;

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
      {blogTitle && (
        <JsonLd
          data={getArticleStructuredData({
            siteBrand,
            title: blogTitle,
            description: blogDescription,
            url: pageUrl,
            image: imageUrl,
            datePublished,
            authorName,
          })}
        />
      )}
      <BlogPostPage {...blogPostPageProps} content={content} metadata={metadata}>
        {children}
      </BlogPostPage>
    </>
  );
} 
