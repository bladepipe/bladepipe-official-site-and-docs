import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { getCalApi } from "@calcom/embed-react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Default implementation, that you can customize
export default function Root({children}) {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;

  useEffect(() => {
    // 只在 bladepipe 品牌下显示 Cal.com 预约按钮
    if (siteBrand === 'bladepipe') {
      (async function () {
        const cal = await getCalApi({"namespace":"30min"});
        cal("floatingButton", {"calLink":"bladepipe-xxypci/30min","config":{"layout":"month_view"},"buttonText":"Book Demo"});
        cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      })();
    }
  }, [siteBrand]);

  return (
    <CookiesProvider>
      {children}
    </CookiesProvider>
  );
}
