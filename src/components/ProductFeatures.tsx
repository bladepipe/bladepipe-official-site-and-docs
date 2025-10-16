import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';

const features = [
  {
    icon: '/img/home/icon/feature1.svg',
    title: translate({id: 'product.feature1.title', message: 'Always Real-time'}),
    desc: translate({id: 'product.feature1.desc', message: 'Sync and update with <3s latency, unlocking more value from your data and more possibilities for your business.'}),
    iconClass: 'w-[58px] h-[52px] ml-[12px]'
  },
  {
    icon: '/img/home/icon/feature2.svg',
    title: translate({id: 'product.feature2.title', message: 'Data Security'}),
    desc: translate({id: 'product.feature2.desc', message: 'Data stays within your network, no external connections required, avoiding data leakage risks.'}),
    iconClass: 'w-[39px] h-[50px] ml-[13px]'
  },
  {
    icon: '/img/home/icon/feature3.svg',
    title: translate({id: 'product.feature3.title', message: 'Visualized, Automated'}),
    desc: translate({id: 'product.feature3.desc', message: 'Simplified operations with lower barriers. Automated task flow cuts manual work.'}),
    iconClass: 'w-[53px] h-[49px] ml-[6px]'
  },
  {
    icon: '/img/home/icon/feature4.svg',
    title: translate({id: 'product.feature4.title', message: 'Accurate Delivery'}),
    desc: translate({id: 'product.feature4.desc', message: 'High data consistency with precise transformation of heterogeneous data, supported by built-in verification and correction.'}),
    iconClass: 'w-[53px] h-[52px] ml-[6px]'
  },
  {
    icon: '/img/home/icon/feature5.svg',
    title: translate({id: 'product.feature5.title', message: 'End-to-end'}),
    desc: translate({id: 'product.feature5.desc', message: 'Deploy with ease, no extra tools needed. Streamlined for efficient operations and easy maintenance.'}),
    iconClass: 'w-[58px] h-[54px] ml-[12px]'
  },
  {
    icon: '/img/home/icon/feature6.svg',
    title: translate({id: 'product.feature6.title', message: '60+ Connectors'}),
    desc: translate({id: 'product.feature6.desc', message: 'Support major databases, real-time warehouses, queues, search engines, and caches — with more on the way.'}),
    iconClass: 'w-[56px] h-[52px] ml-[8px]'
  },
];

export default function ProductFeatures() {
  return (
    <section className="w-full bg-gradient-to-b from-[#eaf6ff] to-white">
      {/* 确保顶部和底部 padding 一致，并优化响应式设计 */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col items-center">
          {/* 标题区 */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-4 md:mb-8 lg:mb-12">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.25] text-black font-['Plus Jakarta Sans'] mb-3 sm:mb-4">
              <Translate id="product.features.title">What Makes BladePipe Different</Translate>
            </h2>
            <div className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium leading-[1.56] text-[#262728] font-['Plus Jakarta Sans'] max-w-[600px]">
              <Translate id="product.features.subtitle">Here are some key features of BladePipe.</Translate>
            </div>
          </div>
          
          {/* 特点卡片区 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-[60px] w-full">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 min-h-[180px] sm:min-h-[190px] md:min-h-[194px]">
                <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                  <img 
                    src={f.icon} 
                    alt={f.title} 
                    className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] object-contain" 
                  />
                </div>
                <div className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold leading-[1.27] text-[#131316] font-['Plus Jakarta Sans'] mb-2 sm:mb-2.5 md:mb-3">
                  {f.title}
                </div>
                <div className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-[1.5] text-black/80 font-['Plus Jakarta Sans'] flex-1">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 