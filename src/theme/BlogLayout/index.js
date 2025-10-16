import React from 'react';
import Layout from '@theme-original/Layout';
import Footer from '@site/src/components/Footer';
import RecentBlogs from '@site/src/components/RecentBlogs';
import styles from './styles.module.css';

export default function BlogLayout(props) {
  const {children, noFooter, wrapperClassName, ...layoutProps} = props;

  return (
    <Layout
      wrapperClassName={wrapperClassName}
      {...layoutProps}
    >
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