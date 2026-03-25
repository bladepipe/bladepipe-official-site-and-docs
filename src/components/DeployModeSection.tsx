import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import siteConfig from '@generated/docusaurus.config';
import { normalizeLinkForSiteBrand } from '@site/src/utils/nav';

const DeployModeSection: React.FC = () => {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  
  const deployModes = [
    {
      title: translate({id: 'deploy.cloud.title', message: 'Cloud (SaaS Managed & BYOC)'}),
      subtitle: 'BYOC',
      img: siteBrand === 'clougence' ? '/img/home/deployMode/byoc_cc.png' : '/img/home/deployMode/byoc.png',
      border: 'border-[#0000001A]',
      shadow: 'shadow-[0_4px_32px_0_rgba(0,0,0,0.10)]',
      highlights: [
        translate({id: 'deploy.cloud.h1', message: 'Quick to get started, focusing on core business.'}),
        translate({id: 'deploy.cloud.h2', message: 'Support for high availability deployment, ensuring uninterrupted data flow.'}),
        translate({id: 'deploy.cloud.h3', message: 'A professional support team ensures every issue is resolved.'})
      ],
      btn: translate({id: 'deploy.cloud.btn', message: 'Learn More'}),
      btnHref: '/pricing',
      dot: '#18181B',
      text: 'text-[#18181B]'
    },
    {
      title: translate({id: 'deploy.onprem.title', message: 'Enterprise (On-Premise)'}),
      subtitle: 'ON-PREMISE',
      img: '/img/home/deployMode/on_premise.png',
      border: 'border-[#0087c7]',
      shadow: 'shadow-[0_4px_32px_0_rgba(0,135,199,0.10)]',
      highlights: [
        translate({id: 'deploy.onprem.h1', message: 'Fully self-hosted, highly controllable.'}),
        translate({id: 'deploy.onprem.h2', message: 'All data is kept in-house. No need to expose to the public internet.'}),
        translate({id: 'deploy.onprem.h3', message: 'Support for high availability deployment, ensuring system reliability.'})
      ],
      btn: translate({id: 'deploy.onprem.btn', message: 'Learn More'}),
      btnHref: '/pricing',
      dot: '#0087c7',
      text: 'text-[#0087c7]'
    }
  ];
  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 flex flex-col items-center bg-white" style={{ borderRadius: 32 }}>
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center gap-8 sm:gap-12 lg:gap-16">
        {/* 标题区 */}
        <div className="flex flex-col items-center gap-3 mb-4 sm:mb-5 lg:mb-6">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black leading-[36px] sm:leading-[42px] lg:leading-[50px] text-center">
            <Translate id="deploy.title.line1">Different Deploy Modes</Translate><br />
          </h2>
          <div className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#26272B] leading-[20px] sm:leading-[24px] lg:leading-[28px] font-medium text-center max-w-[608px]">
            {siteBrand === 'clougence' ? 'CloudCanal': 'BladePipe'}
            <Translate id="deploy.subtitle.line1">offers Cloud (SaaS Managed & BYOC) and Enterprise (On-Premise) models to</Translate><br />
            <Translate id="deploy.subtitle.line2">meet different scenarios and requirements.</Translate>
          </div>
        </div>
        {/* 两大卡片 */}
        <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-7 lg:gap-8 justify-center items-stretch">
          {deployModes.map((mode, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between bg-white border border-1 border-solid ${mode.border} rounded-2xl p-0 w-full lg:flex-1 min-h-[600px] lg:min-h-[652px] transition-all relative overflow-hidden`}
              style={{ boxShadow: idx === 0 ? '0 4px 32px 0 rgba(0,135,199,0.10)' : '0 4px 32px 0 rgba(0,0,0,0.10)' }}
            >
              {/* 配图 */}
              <div className="w-full h-[280px] sm:h-[320px] lg:h-[370px] flex items-center justify-center bg-white rounded-t-2xl overflow-hidden">
                <img src={mode.img} alt={mode.title} className="w-full h-full object-contain" />
              </div>
              {/* 内容区 */}
              <div className="flex flex-col gap-4 px-6 sm:px-8 lg:px-10 pt-6 sm:pt-7 lg:pt-8 pb-8 sm:pb-9 lg:pb-10 flex-1">
                <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#18181B] leading-[24px] sm:leading-[27px] lg:leading-[30px] mb-4 sm:mb-5 lg:mb-6">{mode.title}</h3>
                <ul className="flex flex-col gap-2 mb-6 sm:mb-7 lg:mb-8 list-none p-0 m-0">
                  {mode.highlights.map((h, i) => (
                    <li key={i} className="flex flex-row items-start gap-2 sm:gap-2.5 lg:gap-3 text-[14px] sm:text-[15px] lg:text-[16px] text-[#26272B] font-medium list-none p-0 m-0">
                      <img src="/img/home/icon/check.svg" alt="check" className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px] lg:w-[18px] lg:h-[18px] mt-[4px] sm:mt-[4.5px] lg:mt-[5px]" style={{minWidth: '1em'}} />
                      {h}
                    </li>
                  ))}
                </ul>
                <a
                  href={normalizeLinkForSiteBrand(mode.btnHref, siteBrand)}
                  className={`inline-flex items-center gap-1 text-[14px] sm:text-[15px] lg:text-[16px] font-medium ${mode.text} hover:underline transition-all mt-auto`}
                >
                  {mode.btn}
                  <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16"><path d="M4 8h8m0 0-3-3m3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeployModeSection; 
