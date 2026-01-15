import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Footer from '@site/src/components/Footer';
import CompareSection from '@site/src/components/CompareSection';
import FeatureComparison_price from '@site/src/components/FeatureComparison';
import ScenarioComparison from '@site/src/components/ScenarioComparison';
import FadeInSection from '@site/src/components/FadeInSection';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { getPageMeta } from '@site/src/utils/meta';

export default function WhyPage() {
    const { siteConfig } = useDocusaurusContext();
    const siteBrand = siteConfig.customFields?.siteBrand;
    
    // 使用统一的工具函数获取 why 页面 meta 信息
    const whyMeta = getPageMeta('why');
    
  return (
    <Layout description={whyMeta.description}>
      <Head>
        <title>{whyMeta.title}</title>
      </Head>
      <div className="min-h-screen bg-white flex flex-col">
        {/* CompareSection 作为页面顶部 */}
        <FadeInSection>
          <CompareSection showLearnMore={false} />
        </FadeInSection>

        {/* 功能对比部分 */}
        <FadeInSection>
          <FeatureComparison_price />
        </FadeInSection>

        {/* 场景对比部分 */}
        <FadeInSection>
          <ScenarioComparison />
        </FadeInSection>

        <Footer />
      </div>
    </Layout>
  );
}
