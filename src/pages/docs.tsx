import React, { useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';

export default function DocsRedirect() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // 检查当前路径，如果是 /docs 或 /docs/，则重定向到产品介绍页面
    if (location.pathname === '/docs' || location.pathname === '/docs/') {
      history.replace('/docs/intro/product_intro');
    }
  }, [history, location.pathname]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '16px',
      color: '#666'
    }}>
    </div>
  );
}
