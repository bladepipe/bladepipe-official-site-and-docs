import React, { useEffect, useState } from 'react';
import OriginalLayout from '@theme-original/Layout';
import { useUserStore } from '@site/src/store/user';
import { useLocation } from '@docusaurus/router';
import { getAgentId } from '@site/src/utils';
import { addViewLog } from '../../apis/weblog';
import WechatFloat from '@site/src/components/WechatFloat';
import AnnouncementBar from '@site/src/components/AnnouncementBar';

export default function Layout(props) {
  const [showAnim, setShowAnim] = useState(true);
  const queryLoginUser = useUserStore((state) => state.queryLoginUser);
  const location = useLocation();

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

  // 路由切换时记录访问日志
  useEffect(() => {
    queryLoginUser();
    if (typeof window !== 'undefined' && window.localStorage) {
      getAgentId((hashHex) => {
        try {
          addViewLog({
            src: window.localStorage.getItem('source_for_cc'),
            kw: window.localStorage.getItem('kw_for_cc'),
            vbId: window.localStorage.getItem('vbid_for_cc'),
            clientId: hashHex,
            uid: '',
            uri: location.pathname === '/login' ? location.pathname + location.search : location.pathname
          });
        } catch (e) {
          console.log('err', e);
        }
      });
    }
    const timer = setTimeout(() => setShowAnim(false), 800); // 动画时长
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, location.search, queryLoginUser]);

  return (
    <>
      <AnnouncementBar />
      <OriginalLayout {...props} wrapperClassName={(props.wrapperClassName ?? '') + (showAnim ? ' animate-fadeInUp' : '')} />
      <WechatFloat />
    </>
  );
}
