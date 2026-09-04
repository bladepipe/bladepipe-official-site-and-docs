import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './UserLogos.module.css';

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
  '/img/home/logo/dragonpass.webp': 'https://www.dragonpass.com.cn/',
  '/img/home/logo/china-mobile.jpg': 'https://www.10086.cn/',
  '/img/home/logo/ecovacs.png': 'https://www.ecovacs.cn/',
  '/img/home/logo/citic-futures.jpg': 'https://www.citicsf.com/e-futures/',
  '/img/home/logo/ziroom.jpg': 'https://www.ziroom.com/',
  '/img/home/logo/meituan.png': 'https://www.meituan.com/',
  '/img/home/logo/li-auto-alt.png': 'https://www.lixiang.com/',
  '/img/home/logo/faw-volkswagen.png': 'https://vw.faw-vw.com/',
  '/img/home/logo/kostal.svg': 'https://www.kostal.com/en/',
  '/img/home/logo/gtland.png': 'http://www.gtland.cn/ ',
  '/img/home/logo/deepway.svg': 'https://deepway.com/',
  '/img/home/logo/inman.jpg': 'http://www.inman.com.cn/',
  '/img/home/logo/cheersyou.webp': 'https://www.cheersyou.com/',
  '/img/home/logo/sandstudio.png': 'https://www.sandstudio.com/',
  '/img/home/logo/shaoke.svg': 'https://shaoke.com/',
  '/img/home/logo/alphaess.svg': 'https://www.alphaess.com/ ',
  '/img/home/logo/peppr.avif': 'https://www.peppr.com/',
  '/img/home/logo/bindolabs.png': 'https://bindolabs.com/',
  '/img/home/logo/flashexpress.png': 'https://www.flashexpress.com/',
  '/img/home/logo/li-auto.png': 'https://www.liauto.com/',
  '/img/home/logo/dragonpass-alt.svg': 'https://www.dragonpass.com/',
  '/img/home/logo/clougence-users/bluemoon.png': 'https://www.bluemoon.com.cn/',
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
  '/img/home/logo/clougence-users/oppein.png': 'https://www.oppein.com/',
  '/img/home/logo/clougence-users/pagoda.png': 'https://www.pagoda.com.cn/',
  '/img/home/logo/clougence-users/yiche.png': 'https://www.yiche.com/',
  '/img/home/logo/clougence-users/jiumaojiu.png': 'https://www.jiumaojiu.com/',
  '/img/home/logo/clougence-users/aisino.png': 'https://www.aisino.com/',
  '/img/home/logo/clougence-users/ctg.png': 'https://www.ctg.com.cn/',
  '/img/home/logo/clougence-users/garena.png': 'https://www.garena.com/',
  '/img/home/logo/clougence-users/kaytune.png': 'https://www.kaytune.com/',
  '/img/home/logo/clougence-users/sandstudio-user.png': 'https://www.sandstudio.com/',
  '/img/home/logo/clougence-users/cimc-wetrans.png': 'http://www.szgw-group.com/',
  '/img/home/logo/clougence-users/goldcard.png': 'https://www.jinka.cn/',
  '/img/home/logo/clougence-users/balance.png': 'https://balance.fun/',
  '/img/home/logo/clougence-users/landi.png': 'https://www.landicorp.com/',
  '/img/home/logo/clougence-users/huayin.png': 'https://www.lyzdfintech.com/',
  '/img/home/logo/clougence-users/cimc.png': 'https://www.cimc.com/',
  '/img/home/logo/clougence-users/gxyj.png': 'https://www.gxyj.com/',
  '/img/home/logo/clougence-users/healthyway.png': 'https://jkzlkj.cn/',
  '/img/home/logo/clougence-users/yixin.png': 'https://www.yixincars.com/',
  '/img/home/logo/clougence-users/fzlife.png': 'https://www.fzlife.com/',
  '/img/home/logo/clougence-users/beneunder.png': 'https://www.beneunder.com/',
  '/img/home/logo/clougence-users/mlily.png': 'https://www.mlily.com/',
  '/img/home/logo/clougence-users/autostreets.png': 'https://www.autostreets.com/',
  '/img/home/logo/clougence-users/fanruan.png': 'https://www.fanruan.com/',
  '/img/home/logo/clougence-users/miiow.png': 'https://www.miiow.com.cn/',
};

const logoSizeTable: Record<string, Partial<Pick<LogoItem, 'width' | 'height'>>> = {
  '/img/home/logo/deepway.svg': { width: 86 },
  '/img/home/logo/sandstudio.png': { width: 98 },
  '/img/home/logo/inman.jpg': { width: 100, height: 52 },
  '/img/home/logo/shaoke.svg': { width: 94, height: 22 },
  '/img/home/logo/cheersyou.webp': { width: 96 },
  '/img/home/logo/ziroom.jpg': { width: 90 },
  '/img/home/logo/alphaess.svg': { width: 92 },
  '/img/home/logo/peppr.avif': { width: 96, height: 24 },
  '/img/home/logo/bindolabs.png': { width: 110 },
  '/img/home/logo/flashexpress.png': { width: 90 },
  '/img/home/logo/meituan.png': { width: 102 },
  '/img/home/logo/faw-volkswagen.png': { width: 120 },
  '/img/home/logo/kostal.svg': { width: 84 },
  '/img/home/logo/dragonpass.webp': { width: 84, height: 24 },
  '/img/home/logo/china-mobile.jpg': { width: 92, height: 48 },
  '/img/home/logo/ecovacs.png': { width: 94 },
  '/img/home/logo/citic-futures.jpg': { width: 100, height: 48 },
  '/img/home/logo/li-auto.png': { width: 100, height: 48 },
  '/img/home/logo/li-auto-alt.png': { width: 94, height: 28 },
  '/img/home/logo/gtland.png': { width: 96 },
  '/img/home/logo/dragonpass-alt.svg': { width: 110, height: 52 },
  '/img/home/logo/clougence-users/bluemoon.png': { width: 96, height: 28 },
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
  '/img/home/logo/clougence-users/oppein.png': { width: 116, height: 38 },
  '/img/home/logo/clougence-users/pagoda.png': { width: 148, height: 41 },
  '/img/home/logo/clougence-users/yiche.png': { width: 92, height: 46 },
  '/img/home/logo/clougence-users/jiumaojiu.png': { width: 118, height: 34 },
  '/img/home/logo/clougence-users/aisino.png': { width: 112, height: 28 },
  '/img/home/logo/clougence-users/ctg.png': { width: 136, height: 24 },
  '/img/home/logo/clougence-users/garena.png': { width: 72, height: 48 },
  '/img/home/logo/clougence-users/kaytune.png': { width: 74, height: 54 },
  '/img/home/logo/clougence-users/sandstudio-user.png': { width: 114, height: 40 },
  '/img/home/logo/clougence-users/cimc-wetrans.png': { width: 128, height: 28 },
  '/img/home/logo/clougence-users/goldcard.png': { width: 116, height: 36 },
  '/img/home/logo/clougence-users/balance.png': { width: 132, height: 37 },
  '/img/home/logo/clougence-users/landi.png': { width: 118, height: 28 },
  '/img/home/logo/clougence-users/huayin.png': { width: 100, height: 31 },
  '/img/home/logo/clougence-users/cimc.png': { width: 114, height: 24 },
  '/img/home/logo/clougence-users/gxyj.png': { width: 138, height: 45 },
  '/img/home/logo/clougence-users/healthyway.png': { width: 142, height: 30 },
  '/img/home/logo/clougence-users/yixin.png': { width: 110, height: 34 },
  '/img/home/logo/clougence-users/fzlife.png': { width: 128, height: 36 },
  '/img/home/logo/clougence-users/beneunder.png': { width: 94, height: 60 },
  '/img/home/logo/clougence-users/mlily.png': { width: 118, height: 36 },
  '/img/home/logo/clougence-users/autostreets.png': { width: 138, height: 40 },
  '/img/home/logo/clougence-users/fanruan.png': { width: 102, height: 34 },
  '/img/home/logo/clougence-users/miiow.png': { width: 76, height: 48 },
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
  '/img/home/logo/china-mobile.jpg',
  '/img/home/logo/ecovacs.png',
  '/img/home/logo/ziroom.jpg',
  '/img/home/logo/meituan.png',
  '/img/home/logo/li-auto-alt.png',
  '/img/home/logo/faw-volkswagen.png',
  '/img/home/logo/kostal.svg',
  '/img/home/logo/gtland.png',
  '/img/home/logo/deepway.svg',
  '/img/home/logo/inman.jpg',
  '/img/home/logo/cheersyou.webp',
  '/img/home/logo/clougence-users/bluemoon.png',
  '/img/home/logo/clougence-users/lingrui.png',
  '/img/home/logo/clougence-users/microtech.svg',
  '/img/home/logo/clougence-users/zhenhua.png',
  '/img/home/logo/clougence-users/evoc.png',
  '/img/home/logo/clougence-users/hsuanzhang.png',
  '/img/home/logo/clougence-users/befriends.svg',
  '/img/home/logo/clougence-users/beibang.webp',
  '/img/home/logo/clougence-users/donson.svg',
  '/img/home/logo/clougence-users/yilihui.jpg',
  '/img/home/logo/clougence-users/pagoda.png',
  '/img/home/logo/clougence-users/yiche.png',
  '/img/home/logo/clougence-users/jiumaojiu.png',
  '/img/home/logo/clougence-users/aisino.png',
  '/img/home/logo/clougence-users/ctg.png',
  '/img/home/logo/clougence-users/garena.png',
  '/img/home/logo/clougence-users/kaytune.png',
  '/img/home/logo/clougence-users/sandstudio-user.png',
  '/img/home/logo/clougence-users/cimc-wetrans.png',
  '/img/home/logo/clougence-users/goldcard.png',
  '/img/home/logo/clougence-users/landi.png',
  '/img/home/logo/clougence-users/huayin.png',
  '/img/home/logo/clougence-users/cimc.png',
  '/img/home/logo/clougence-users/gxyj.png',
  '/img/home/logo/clougence-users/healthyway.png',
  '/img/home/logo/clougence-users/yixin.png',
  '/img/home/logo/clougence-users/fzlife.png',
  '/img/home/logo/clougence-users/beneunder.png',
  '/img/home/logo/clougence-users/mlily.png',
  '/img/home/logo/clougence-users/autostreets.png',
  '/img/home/logo/clougence-users/fanruan.png',
  '/img/home/logo/clougence-users/miiow.png',
  ...sharedBrandLogos,
].map(toLogoItem);

export const clougenceCustomerLogos = logos;
export const clougenceCustomerCaseLogos = logos.filter(
  (logo) => !['/img/home/logo/dragonpass.webp', '/img/home/logo/citic-futures.jpg'].includes(logo.src),
);

// BladePipe 使用的 logo 子集
const bpLogos: LogoItem[] = [
  '/img/home/logo/sandstudio.png',
  '/img/home/logo/alphaess.svg',
  '/img/home/logo/peppr.avif',
  '/img/home/logo/flashexpress.png',
  '/img/home/logo/ecovacs.png',
  '/img/home/logo/kostal.svg',
  '/img/home/logo/li-auto.png',
  '/img/home/logo/bindolabs.png',
  '/img/home/logo/clougence-users/microtech.svg',
  '/img/home/logo/clougence-users/garena.png',
  '/img/home/logo/clougence-users/beneunder.png',
  '/img/home/logo/clougence-users/balance.png',
  ...sharedBrandLogos,
].map(toLogoItem);

export function UserLogoShowcase() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const isBladePipe = siteBrand === 'bladepipe';
  const featuredLogos = isBladePipe ? bpLogos : logos;
  const content = isBladePipe
    ? {
        title: 'Built for teams moving data at scale',
        description: 'Trusted by modern teams to move critical data with confidence.',
      }
    : {
        title: '深受行业领先企业信赖',
        description: '与各行业优秀团队一起，让数据连接更稳定、更高效。',
      };

  return (
    <section
      className={`${styles.customerShowcase} ${isBladePipe ? styles.customerShowcaseBladepipe : ''}`}
      aria-labelledby="customer-showcase-title"
    >
      <div className={styles.customerShowcaseInner}>
        <div className={styles.customerShowcaseHeading}>
          <h2 id="customer-showcase-title">{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className={styles.logoGrid}>
          {featuredLogos.map((logo) => (
            <a
              key={logo.src}
              className={styles.logoCard}
              href={logo.url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="访问客户官网"
            >
              <img
                src={logo.src}
                alt="客户 Logo"
                style={{ width: logo.width * 1.2, height: logo.height * 1.2 }}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function UserLogos() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const currentLogos = siteBrand === 'bladepipe' ? bpLogos : logos;
  const animationDuration = siteBrand === 'bladepipe' ? '30s' : '120s';

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
