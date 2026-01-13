import React, { useState } from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import siteConfig from '@generated/docusaurus.config';

const SceneSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  
  const sceneCards = [
    {
      title: translate({id: 'scene.card1.title', message: 'Re-architect Traditional Big Data for Real-time Data Analytics'}),
      desc: siteBrand === 'clougence' 
        ? translate({id: 'scene.card1.desc.clougence', message: 'CloudCanal makes it easy to integrate data into modern real-time data warehouses without delay, ensuring freshness and unlocking greater data value.'})
        : translate({id: 'scene.card1.desc', message: 'BladePipe makes it easy to integrate data into modern real-time data warehouses without delay, ensuring freshness and unlocking greater data value.'}),
      btn: translate({id: 'scene.card1.btn', message: 'Learn More'}),
      btnHref: '/solution1',
      border: 'border border-[#0000001A]',
      activeBorder: 'border-[#0087c7]',
      hoverBorder: 'hover:border-[#0087c7]',
      },
    {
      title: translate({id: 'scene.card2.title', message: 'Build Smarter AI Chatbots'}),
      desc: translate({id: 'scene.card2.desc', message: 'Embed documents, database data, and other private knowledge bases into leading LLMs to make your chatbots more professional and incredibly intelligent.'}),
      btn: translate({id: 'scene.card2.btn', message: 'Learn More'}),
      btnHref: 'solution2',
      border: 'border border-[#0000001A]',
      activeBorder: 'border-[#0087c7]',
      hoverBorder: 'hover:border-[#0087c7]'
    },
  ];
  return (
    <section
      className="w-full pb-12 pt-4 sm:pb-16 sm:pt-6 lg:pb-24 lg:pt-12 px-0 flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 rounded-[32px]"
      style={{
        background: 'linear-gradient(180deg, #fff 0%, #e6f2ff 100%)',
      }}
    >
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center gap-8 sm:gap-12 lg:gap-16">
        {/* 标题区 */}
        <div className="flex flex-col items-center gap-2 sm:gap-2.5 lg:gap-3">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black leading-[36px] sm:leading-[42px] lg:leading-[50px] text-center  mb-3 sm:mb-4">
            <Translate id="scene.title">Scene</Translate>
          </h2>
          <div className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium leading-[1.56] text-[#262728] font-['Plus Jakarta Sans'] max-w-[600px]">
            <Translate id="product.scene.subtitle">Let me show you some typical scenarios.</Translate>
          </div>
        </div>
        {/* 两个大场景卡片 */}
        <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-7 lg:gap-8 justify-center items-stretch">
          {sceneCards.map((card, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between border border-1 border-solid transition-all duration-200 cursor-pointer rounded-2xl p-6 sm:p-8 lg:p-10 w-full lg:flex-1 min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]
                ${activeIdx === idx ? 'bg-[#f0f7ff] ' + card.activeBorder : 'bg-white ' + card.border}
                ${card.hoverBorder}
                hover:bg-[#f0f7ff]`}
              onClick={() => setActiveIdx(idx)}
              style={{ boxShadow: activeIdx === idx ? '0 4px 32px 0 rgba(0,135,199,0.15)' : undefined }}
            >
              <div>
                <div className="text-[18px] sm:text-[21px] lg:text-[24px] font-bold text-[#18181B] leading-[26px] sm:leading-[29px] lg:leading-[32px] mb-3 sm:mb-3.5 lg:mb-4">{card.title}</div>
                <div className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#3f3f46] leading-[20px] sm:leading-[22px] lg:leading-[24px] font-medium mb-6 sm:mb-7 lg:mb-8">{card.desc}</div>
              </div>
              <a
                href={card.btnHref}
                className="inline-flex items-center gap-1 text-[14px] sm:text-[15px] lg:text-[16px] font-medium text-[#0087c7] hover:underline transition-all"
              >
                {card.btn}
                <svg className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16"><path d="M4 8h8m0 0-3-3m3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          ))}
        </div>
        {/* 下方大场景图 */}
        <div className="w-full flex justify-center mt-8 sm:mt-10 lg:mt-12">
          <img
            src={siteBrand === 'clougence' 
              ? `/img/home/scene_cc${activeIdx + 1}.png`
              : `/img/home/scene${activeIdx + 1}.png`
            }
            alt="场景示意"
            className="max-w-full h-auto rounded-2xl sm:rounded-2xl lg:rounded-3xl"
            style={{ width: '1084px', maxWidth: '100%' }}
          />
        </div>
      </div>
    </section>
  );
};

export default SceneSection; 