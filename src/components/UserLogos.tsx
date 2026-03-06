import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type LogoItem = {
  src: string;
  width: number;
  height: number;
  url: string;
};

const DEFAULT_LOGO_WIDTH = 96;
const DEFAULT_LOGO_HEIGHT = 32;
const LOGO_SCALE = 0.9;
const DEFAULT_LOGO_URL = '';

const logoUrlTable: Record<string, string> = {
  '/img/home/logo/logo28.webp': 'https://www.dragonpass.com.cn/',
  '/img/home/logo/logo29_2.jpg': 'https://www.10086.cn/',
  '/img/home/logo/logo30.png': 'https://www.ecovacs.cn/',
  '/img/home/logo/logo31.jpg': 'https://www.citicsf.com/e-futures/',
  '/img/home/logo/logo18.jpg': 'https://www.ziroom.com/',
  '/img/home/logo/Logo24.png': 'https://www.meituan.com/',
  '/img/home/logo/logo34.png': 'https://www.lixiang.com/',
  '/img/home/logo/logo9.svg': 'https://www.anker.com.cn/',
  '/img/home/logo/logo26.png': 'https://vw.faw-vw.com/',
  '/img/home/logo/logo27.svg': 'https://www.kostal.com/en/',
  '/img/home/logo/logo35.png': 'http://www.gtland.cn/ ',
  '/img/home/logo/logo11.svg': 'https://deepway.com/',
  '/img/home/logo/logo13.jpg': 'http://www.inman.com.cn/',
  '/img/home/logo/logo17.webp': 'https://www.cheersyou.com/',
  '/img/home/logo/logo12.png': 'https://www.sandstudio.com/',
  '/img/home/logo/logo16.svg': 'https://shaoke.com/',
  '/img/home/logo/logo20.svg': 'https://www.alphaess.com/ ',
  '/img/home/logo/logo21.avif': 'https://www.peppr.com/',
  '/img/home/logo/logo22.png': 'https://bindolabs.com/',
  '/img/home/logo/logo23.png': 'https://www.flashexpress.com/',
  '/img/home/logo/logo33.png': 'https://www.liauto.com/',
  '/img/home/logo/logo36.svg': 'https://www.dragonpass.com/',
};

const logoSizeTable: Record<string, Partial<Pick<LogoItem, 'width' | 'height'>>> = {
  '/img/home/logo/logo11.svg': { width: 86 },
  '/img/home/logo/logo12.png': { width: 98 },
  '/img/home/logo/logo13.jpg': { width: 100, height: 52 },
  '/img/home/logo/logo14.png': { width: 110 },
  '/img/home/logo/logo15.svg': { width: 96, height: 48 },
  '/img/home/logo/logo16.svg': { width: 94, height: 22 },
  '/img/home/logo/logo17.webp': { width: 96 },
  '/img/home/logo/logo18.jpg': { width: 90 },
  '/img/home/logo/logo20.svg': { width: 92 },
  '/img/home/logo/logo21.avif': { width: 96, height: 24 },
  '/img/home/logo/logo22.png': { width: 110 },
  '/img/home/logo/logo23.png': { width: 90 },
  '/img/home/logo/Logo24.png': { width: 102 },
  '/img/home/logo/logo9.svg': { width: 100, height: 48 },
  '/img/home/logo/logo26.png': { width: 120 },
  '/img/home/logo/logo27.svg': { width: 84 },
  '/img/home/logo/logo28.webp': { width: 84, height: 24 },
  '/img/home/logo/logo29_2.jpg': { width: 92, height: 48 },
  '/img/home/logo/logo30.png': { width: 94 },
  '/img/home/logo/logo31.jpg': { width: 100, height: 48 },
  '/img/home/logo/logo33.png': { width: 100, height: 48 },
  '/img/home/logo/logo34.png': { width: 94, height: 28 },
  '/img/home/logo/logo35.png': { width: 96 },
  '/img/home/logo/logo36.svg': { width: 110, height: 52 },
};

// 所有 logo（logo1 到 logo35）
const logos: LogoItem[] = [
  '/img/home/logo/logo28.webp',
  '/img/home/logo/logo29_2.jpg',
  '/img/home/logo/logo30.png',
  '/img/home/logo/logo31.jpg',
  '/img/home/logo/logo18.jpg',
  '/img/home/logo/Logo24.png',
  '/img/home/logo/logo34.png',
  '/img/home/logo/logo9.svg',
  '/img/home/logo/logo26.png',
  '/img/home/logo/logo27.svg',
  '/img/home/logo/logo35.png',
  '/img/home/logo/logo11.svg',
  '/img/home/logo/logo13.jpg',
  '/img/home/logo/logo17.webp'
].map((src) => ({
  src,
  width: (logoSizeTable[src]?.width ?? DEFAULT_LOGO_WIDTH) * LOGO_SCALE,
  height: (logoSizeTable[src]?.height ?? DEFAULT_LOGO_HEIGHT) * LOGO_SCALE,
  url: logoUrlTable[src] ?? DEFAULT_LOGO_URL,
}));

// BladePipe 使用的 logo 子集
const bpLogos: LogoItem[] = [
  '/img/home/logo/logo12.png',
  '/img/home/logo/logo16.svg',
  '/img/home/logo/logo20.svg',
  '/img/home/logo/logo21.avif',
  '/img/home/logo/logo23.png',
  '/img/home/logo/logo9.svg',
  '/img/home/logo/logo27.svg',
  '/img/home/logo/logo33.png',
  '/img/home/logo/logo22.png',
  '/img/home/logo/logo36.svg'
].map((src) => ({
  src,
  width: (logoSizeTable[src]?.width ?? DEFAULT_LOGO_WIDTH) * LOGO_SCALE,
  height: (logoSizeTable[src]?.height ?? DEFAULT_LOGO_HEIGHT) * LOGO_SCALE,
  url: logoUrlTable[src] ?? DEFAULT_LOGO_URL,
}));

export default function UserLogos() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const currentLogos = siteBrand === 'bladepipe' ? bpLogos : logos;
  const animationDuration = siteBrand === 'bladepipe' ? '30s' : '80s';

  return (
    <section className="w-full pt-12 py-8 overflow-hidden">
      <div className="relative w-full">
        {/* 滚动容器 */}
        <div className="flex w-max items-center animate-logo-scroll">
          {/* 复制两份实现无缝滚动 */}
          {[...currentLogos, ...currentLogos].map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center px-4 mr-16"
            >
              <a
                href={logo.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!logo.url) e.preventDefault();
                }}
              >
                <img
                  src={logo.src}
                  alt={`User Logo ${(idx % currentLogos.length) + 1}`}
                  className="object-contain select-none grayscale"
                  style={{ width: logo.width, height: logo.height }}
                  draggable={false}
                  loading="lazy"
                />
              </a>
            </div>
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
      `}</style>
    </section>
  );
} 