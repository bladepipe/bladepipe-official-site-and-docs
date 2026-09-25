import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogPostItem/Header/Title';

import styles from './styles.module.css';

function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

export default function BlogPostItemHeaderTitle({className}: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {permalink, title} = metadata;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';

  return (
    <TitleHeading className={clsx(styles.title, className)}>
      {isBlogPostPage ? title : <Link to={withTrailingSlash(permalink)}>{title}</Link>}
    </TitleHeading>
  );
}
