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
  '/img/home/logo/clougence-users/bluemoon-white.png': 'https://www.bluemoon.com.cn/',
  '/img/home/logo/clougence-users/lingrui.png': 'http://www.lingrui.com/',
  '/img/home/logo/clougence-users/microtech.svg': 'https://www.microtechmd.com/',
  '/img/home/logo/clougence-users/zhenhua.png': 'https://www.zh-echem.com/',
  '/img/home/logo/clougence-users/evoc.png': 'https://www.evoc.cn/',
  '/img/home/logo/clougence-users/hsuanzhang.png': 'https://www.hsuanzhang.com/',
  '/img/home/logo/clougence-users/befriends.svg': 'https://www.makefriends.com/',
  '/img/home/logo/clougence-users/beibang.webp': 'https://www.bbnchina.com',
  '/img/home/logo/clougence-users/donson.svg': 'https://www.donson.com.cn/',
  '/img/home/logo/clougence-users/yilihui.jpg': 'https://www.eliza.com.cn/',
  '/img/home/logo/clougence-users/redteamobile.png': 'https://www.redteamobile.com/',
  '/img/home/logo/clougence-users/sea.webp': 'https://www.sea.com/',
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
  '/img/home/logo/clougence-users/bluemoon-white.png': { width: 96, height: 28 },
  '/img/home/logo/clougence-users/lingrui.png': { width: 116, height: 32 },
  '/img/home/logo/clougence-users/microtech.svg': { width: 100, height: 28 },
  '/img/home/logo/clougence-users/zhenhua.png': { width: 80, height: 24 },
  '/img/home/logo/clougence-users/evoc.png': { width: 160, height: 48 },
  '/img/home/logo/clougence-users/hsuanzhang.png': { width: 86, height: 24 },
  '/img/home/logo/clougence-users/befriends.svg': { width: 36, height: 36 },
  '/img/home/logo/clougence-users/beibang.webp': { width: 54, height: 32 },
  '/img/home/logo/clougence-users/donson.svg': { width: 120, height: 24 },
  '/img/home/logo/clougence-users/yilihui.jpg': { width: 90, height: 40 },
  '/img/home/logo/clougence-users/redteamobile.png': { width: 148, height: 24 },
  '/img/home/logo/clougence-users/sea.webp': { width: 82, height: 32 },
};

const toLogoItem = (src: string): LogoItem => ({
  src,
  width: (logoSizeTable[src]?.width ?? DEFAULT_LOGO_WIDTH) * LOGO_SCALE,
  height: (logoSizeTable[src]?.height ?? DEFAULT_LOGO_HEIGHT) * LOGO_SCALE,
  url: logoUrlTable[src] ?? DEFAULT_LOGO_URL,
});

const sharedBrandLogos = [
  '/img/home/logo/clougence-users/redteamobile.png',
  '/img/home/logo/clougence-users/sea.webp',
];

// 所有 logo（logo1 到 logo35）
const logos: LogoItem[] = [
  '/img/home/logo/logo28.webp',
  '/img/home/logo/logo29_2.jpg',
  '/img/home/logo/logo30.png',
  '/img/home/logo/logo31.jpg',
  '/img/home/logo/logo18.jpg',
  '/img/home/logo/Logo24.png',
  '/img/home/logo/logo34.png',
  '/img/home/logo/logo26.png',
  '/img/home/logo/logo27.svg',
  '/img/home/logo/logo35.png',
  '/img/home/logo/logo11.svg',
  '/img/home/logo/logo13.jpg',
  '/img/home/logo/logo17.webp',
  '/img/home/logo/clougence-users/bluemoon-white.png',
  '/img/home/logo/clougence-users/lingrui.png',
  '/img/home/logo/clougence-users/microtech.svg',
  '/img/home/logo/clougence-users/zhenhua.png',
  '/img/home/logo/clougence-users/evoc.png',
  '/img/home/logo/clougence-users/hsuanzhang.png',
  '/img/home/logo/clougence-users/befriends.svg',
  '/img/home/logo/clougence-users/beibang.webp',
  '/img/home/logo/clougence-users/donson.svg',
  '/img/home/logo/clougence-users/yilihui.jpg',
  ...sharedBrandLogos,
].map(toLogoItem);

// BladePipe 使用的 logo 子集
const bpLogos: LogoItem[] = [
  '/img/home/logo/logo12.png',
  '/img/home/logo/logo16.svg',
  '/img/home/logo/logo20.svg',
  '/img/home/logo/logo21.avif',
  '/img/home/logo/logo23.png',
  '/img/home/logo/logo27.svg',
  '/img/home/logo/logo33.png',
  '/img/home/logo/logo22.png',
  '/img/home/logo/logo36.svg',
  ...sharedBrandLogos,
].map(toLogoItem);

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
                  style={{
                    width: logo.width,
                    height: logo.height
                  }}
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
