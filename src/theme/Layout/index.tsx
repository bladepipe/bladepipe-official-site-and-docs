import React, { useEffect, useState } from 'react';
import OriginalLayout from '@theme-original/Layout';
import Head from '@docusaurus/Head';
import { useUserStore } from '@site/src/store/user';
import { useLocation } from '@docusaurus/router';
import WechatFloat from '@site/src/components/WechatFloat';
import ClougenceContactFab from '@site/src/components/ClougenceContactFab';
import AnnouncementBar from '@site/src/components/AnnouncementBar';

const NOINDEX_EXACT_PATHS = new Set([
  '/login',
  '/register',
  '/registerFromMarket',
  '/resetPwd',
  '/loading',
  '/404',
  '/blog/archive',
  '/blog/authors',
  '/blog/tags',
  '/clouddm',
  '/clouddm_solution',
  '/search',
]);

const NOINDEX_PREFIX_PATHS = ['/blog/tags/'];

const normalizePathname = (pathname: string) => {
  const noTrailingSlash = pathname.replace(/\/+$/, '') || '/';
  const noLocalePrefix = noTrailingSlash.replace(/^\/(zh|en)(?=\/|$)/, '') || '/';
  return noLocalePrefix;
};

const shouldNoindexPath = (pathname: string) => {
  const normalizedPath = normalizePathname(pathname);
  if (NOINDEX_EXACT_PATHS.has(normalizedPath)) {
    return true;
  }
  return NOINDEX_PREFIX_PATHS.some((prefixPath) => normalizedPath.startsWith(prefixPath));
};

export default function Layout(props) {
  const [showAnim, setShowAnim] = useState(true);
  const queryLoginUser = useUserStore((state) => state.queryLoginUser);
  const location = useLocation();
  const noindexCurrentPath = shouldNoindexPath(location.pathname);

  // 初始化，首次收集来源信息
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const bd_vid = params.get('bd_vid');
      const state = params.get('state');
      window.localStorage.setItem('vbid_for_cc', bd_vid);
      window.localStorage.setItem('source_for_cc', window.document.referrer);
      window.localStorage.setItem('url_for_cc', window.location.href);
      if (state) {
        window.localStorage.setItem('state_for_cc', state);
      }
    }
  }, []);

  useEffect(() => {
    queryLoginUser();
    const timer = setTimeout(() => setShowAnim(false), 800); // 动画时长
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, location.search, queryLoginUser]);

  return (
    <>
      {noindexCurrentPath && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </Head>
      )}
      <AnnouncementBar />
      <OriginalLayout {...props} wrapperClassName={(props.wrapperClassName ?? '') + (showAnim ? ' animate-fadeInUp' : '')} />
      <WechatFloat />
      <ClougenceContactFab />
    </>
  );
}
