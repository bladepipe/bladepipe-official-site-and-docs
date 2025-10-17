import React from 'react';
import Layout from '@theme/Layout';
import Footer from '@site/src/components/Footer';
import CompareSection from '@site/src/components/CompareSection';
import FeatureComparison_price from '@site/src/components/FeatureComparison';
import ScenarioComparison from '@site/src/components/ScenarioComparison';
import FadeInSection from '@site/src/components/FadeInSection';

export default function WhyPage() {
  return (
    <Layout
      title="Why CloudCanal"
      description="Why choose CloudCanal for your data synchronization needs"
    >
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