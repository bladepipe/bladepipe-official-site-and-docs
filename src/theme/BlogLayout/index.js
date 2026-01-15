import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';
import Head from '@docusaurus/Head';
import Footer from '@site/src/components/Footer';
import RecentBlogs from '@site/src/components/RecentBlogs';
import { getPageMeta } from '@site/src/utils/meta';
import styles from './styles.module.css';

export default function BlogLayout(props) {
  const {children, noFooter, wrapperClassName, title, ...layoutProps} = props;
  
  // 获取博客列表页的 meta 信息
  const blogMeta = getPageMeta('blog-list');

  // 使用 useEffect 直接设置 document.title，确保覆盖其他设置
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = blogMeta.title;
    }
  }, [blogMeta.title]);

  return (
    <Layout
      wrapperClassName={wrapperClassName}
      description={blogMeta.description}
      {...layoutProps}
    >
      <Head>
        <title>{blogMeta.title}</title>
      </Head>
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
        <RecentBlogs />
        <Footer />
      </div>
    </Layout>
  );
}