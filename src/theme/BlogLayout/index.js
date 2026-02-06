import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import Footer from '@site/src/components/Footer';
import RecentBlogs from '@site/src/components/RecentBlogs';
import BlogPostRecommendations from '@site/src/components/BlogPostRecommendations';
import { getPageMeta } from '@site/src/utils/meta';
import styles from './styles.module.css';

export default function BlogLayout(props) {
  const {children, noFooter, wrapperClassName, title, ...layoutProps} = props;
  const location = useLocation();
  
  // 检查是否是 blog post 页面（不是 blog list 页面）
  // blog list 页面的路径通常是 /blog 或 /blog/，而 blog post 页面的路径是 /blog/xxx/
  // 需要考虑语言前缀，如 /zh/blog/ 或 /en/blog/
  const pathname = location.pathname;
  const pathParts = pathname.split('/').filter(Boolean);
  // 移除语言前缀（如果有）
  const pathWithoutLocale = pathParts[0] === 'zh' || pathParts[0] === 'en' 
    ? pathParts.slice(1) 
    : pathParts;
  
  // 判断是否是 blog post 页面：路径以 blog 开头，且后面还有至少一个路径段
  const isBlogPostPage = pathWithoutLocale[0] === 'blog' && pathWithoutLocale.length > 1;
  
  // 检查是否有 blog post 的 metadata（从 md 文件的 frontmatter 中读取）
  // 如果有，则使用 blog post 的 meta 信息；否则使用博客列表页的默认 meta 信息
  // metadata 可能在 layoutProps 中，也可能直接在 props 中
  const blogPostMetadata = layoutProps.metadata || props.metadata;
  const hasBlogPostMetadata = blogPostMetadata && blogPostMetadata.title;
  
  // 如果是 blog post 页面且有 metadata，使用 blog post 的 meta 信息
  // 否则使用博客列表页的默认 meta 信息
  const blogMeta = (isBlogPostPage && hasBlogPostMetadata)
    ? {
        title: blogPostMetadata.title,
        description: blogPostMetadata.description || ''
      }
    : getPageMeta('blog-list');

  // 使用 useEffect 直接设置 document.title，确保覆盖其他设置
  // 但如果是 blog post 页面，让 BlogPostPage 来处理
  useEffect(() => {
    if (typeof document !== 'undefined' && !isBlogPostPage) {
      document.title = blogMeta.title;
    }
  }, [blogMeta.title, isBlogPostPage]);

  return (
    <Layout
      wrapperClassName={wrapperClassName}
      // 如果是 blog post 页面，不传递 description，让 BlogPostPage 处理
      description={isBlogPostPage ? undefined : blogMeta.description}
      {...layoutProps}
    >
      {/* 只在 blog list 页面设置 meta，blog post 页面由 BlogPostPage 处理 */}
      {!isBlogPostPage && (
      <Head>
        <title>{blogMeta.title}</title>
          {blogMeta.description && (
            <meta name="description" content={blogMeta.description} />
          )}
      </Head>
      )}
      <div className="min-h-screen flex flex-col blog-layout">
        <div className={styles.blogContainer}>
          <main className={styles.blogMainContent}>
            {children}
          </main>
          {props.toc && (
            <div className={styles.blogTableOfContents}>
              {props.toc}
            </div>
          )}
        </div>
        {/* 只在博客列表页显示 RecentBlogs */}
        {!isBlogPostPage && <RecentBlogs />}
        {/* 在博客详情页显示推荐和返回按钮 */}
        {isBlogPostPage && <BlogPostRecommendations />}
        <Footer />
      </div>
    </Layout>
  );
}