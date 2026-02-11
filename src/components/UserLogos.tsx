import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const logos = [
  '/img/home/logo/logo34.png',
  '/img/home/logo/logo12.png',
  '/img/home/logo/logo13.png',
  '/img/home/logo/logo14.png',
  '/img/home/logo/logo18.png',
  '/img/home/logo/logo31.png',
  '/img/home/logo/logo20.svg',
  '/img/home/logo/logo11.svg',
  '/img/home/logo/logo21.avif',
  '/img/home/logo/logo22.png',
  '/img/home/logo/logo17.webp',
  '/img/home/logo/logo23.png',
  '/img/home/logo/logo24.png',
  '/img/home/logo/logo25.png',
  '/img/home/logo/logo15.svg',
  '/img/home/logo/logo16.svg',
  '/img/home/logo/logo26.png',
  '/img/home/logo/logo27.svg',
  '/img/home/logo/logo28.webp',
  '/img/home/logo/logo29.png',
  '/img/home/logo/logo30.png',
  '/img/home/logo/logo35.png'
];

const bpLogos = [
  '/img/home/logo/logo21.avif',
  '/img/home/logo/logo12.png',
  '/img/home/logo/logo20.svg',
  '/img/home/logo/logo22.png',
  '/img/home/logo/logo25.png',
  '/img/home/logo/logo33.png',
  '/img/home/logo/logo27.svg',
  '/img/home/logo/logo16.svg',
  '/img/home/logo/logo23.png'
];

export default function UserLogos() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const currentLogos = siteBrand === 'bladepipe' ? bpLogos : logos;
  const animationDuration = siteBrand === 'bladepipe' ? '30s' : '60s';

  return (
    <section className="w-full flex justify-center items-center overflow-x-hidden">
      <div className="w-[1728px] h-[146px] flex items-center relative">
        {/* 滚动容器 */}
        <div className="flex items-center gap-28 animate-logo-scroll whitespace-nowrap">
          {currentLogos.concat(currentLogos).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`User Logo ${idx % currentLogos.length + 1}`}
              className="h-[48px] w-auto object-contain inline-block select-none"
              draggable={false}
              style={{ minWidth: 120 }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes logo-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-logo-scroll {
          animation: logo-scroll ${animationDuration} linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @media (max-width: 1800px) {
          .w-\[1728px\] { width: 100vw; }
        }
      `}</style>
    </section>
  );
} 