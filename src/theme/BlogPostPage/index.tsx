import React from 'react';
import type { Props as BlogPostPageProps } from '@theme/BlogPostPage';
import BlogPostPage from '@theme-original/BlogPostPage';

type Props = BlogPostPageProps & {
  children: React.ReactNode;
};

export default function BlogPostPageWrapper(props: Props): React.JSX.Element {
  const { children, ...blogPostPageProps } = props;

  return (
    <BlogPostPage {...blogPostPageProps}>
      {children}
    </BlogPostPage>
  );
} 