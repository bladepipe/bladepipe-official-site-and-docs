import React, { useEffect, useState, useRef } from 'react';
import Translate from '@docusaurus/Translate';
import { getCloudUrl } from '@site/src/utils/api';
import { isUserLogin } from '@site/src/store/user';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
export default function UserGuide() {
  const [offsetY, setOffsetY] = useState(0);
  const [section, setSection] = useState(false);
  const sectionRef = useRef(null);
  const startScrollY = useRef<number | null>(null);
  const startOffset = 500;
  //初始化sitebrand
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSection(true);
            if (startScrollY.current === null) {
              startScrollY.current = window.scrollY;
            }
          } else {
            setSection(false);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(sectionRef.current);

    const handleScroll = () => {
      if (section && startScrollY.current !== null) {
        const relativeY = window.scrollY - startScrollY.current;
        setOffsetY(relativeY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [section]);

  return (
    <section
      ref={sectionRef}
      className='w-full min-h-[464px] flex justify-center items-center bg-gradient-to-b from-[#0064c7] to-[#0087c7] py-24 relative overflow-hidden'>
      {/* 背景图层1 */}
      <div
        className='absolute inset-0 w-full h-full z-0 pointer-events-none'
        style={{
          backgroundImage: 'url(/img/home/guideBack.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          transform: `translateY(${startOffset - offsetY}px)`,
          willChange: 'transform',
          transition: 'transform 0.1s linear'
        }}
      />

      {/* 背景图层2 */}
      <div
        className='absolute inset-0 w-full h-full z-0 pointer-events-none'
        style={{
          backgroundImage: 'url(/img/home/guideBack.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          transform: `translateY(${startOffset - offsetY * 0.5}px)`,
          willChange: 'transform',
          transition: 'transform 0.1s linear',
          opacity: 0.5
        }}
      />

      {/* 主体内容 */}
      <div className='w-[1320px] flex flex-col items-center justify-center gap-12 relative z-10'>
        <div className='flex flex-col items-center gap-5'>
          <h2 className="text-[48px] font-bold leading-[60px] text-white text-center font-['Plus Jakarta Sans']">
            <Translate id='userguide.title.line1'>Moving Data in Real Time.</Translate>
          </h2>
          <div className="text-[18px] font-medium leading-[28px] text-white/60 font-['Plus Jakarta Sans'] mt-[20px]">
            <Translate id='userguide.subtitle'>Build continuous,incremental data pipelines with BladePipe.</Translate>
          </div>
        </div>

        {/* 按钮区 */}
        <div className='flex flex-row gap-6 mt-8'>
          {/* 主按钮 */}
          <button
            className="cursor-pointer h-[54px] px-7 py-[15px] flex items-center gap-3 rounded-full bg-white text-[#0087c7] text-[16px] font-bold font-['Plus Jakarta Sans'] shadow-none border-none transition hover:bg-[#f0faff] focus:outline-none min-w-fit w-auto"
            style={{ boxShadow: '0px 2px 8px 0px rgba(0,135,199,0.10)' }}
            onClick={() => {
              if (isUserLogin()) {
                window.location.href = getCloudUrl();
              } else {
                localStorage.setItem('loginSource', 'try_cloud_free');
                window.location.href = siteBrand === 'bladepipe' ? '/login/' : '/login';
              }
            }}>
            <Translate id='userguide.tryCloudBtn'>Try Cloud Free</Translate>
            <span className='inline-block w-4 h-6 ml-2'>→</span>
          </button>

          {/* 边框按钮 */}
          <button
            className="cursor-pointer h-[54px] px-7 py-[15px] flex items-center gap-3 rounded-full border border-1 border-solid border-white/60 text-white text-[16px] font-bold font-['Plus Jakarta Sans'] bg-transparent shadow-none transition hover:bg-white/10 focus:outline-none min-w-fit w-auto"
            style={{ boxShadow: '0px 2px 8px 0px rgba(255,255,255,0.10)' }}
            onClick={() => {
              if (isUserLogin()) {
                localStorage.setItem('openDownloadModal', 'true');
                window.location.reload();
              } else {
                localStorage.setItem('loginSource', 'download');
                window.location.href = siteBrand === 'bladepipe' ? '/login/' : '/login';
              }
            }}>
            <Translate id='userguide.downloadBtn'>Download Enterprise</Translate>
          </button>
        </div>
      </div>
    </section>
  );
}
