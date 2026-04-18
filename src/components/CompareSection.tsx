import React, { useEffect, useState } from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { normalizeLinkForSiteBrand } from '@site/src/utils/nav';

// 计算每组内最大 price 用于高度比例
const getBarHeight = (price: string, groupMaxPrice: number) => {
  const num = parseInt((price || '').replace(/[^\d]/g, ''));
  if (!num || isNaN(num) || !groupMaxPrice) return 32;
  const minH = 32, maxH = 120;
  return Math.round((num / groupMaxPrice) * (maxH - minH) + minH);
};

interface CompareSectionProps {
  showLearnMore?: boolean;
}

const CompareSection: React.FC<CompareSectionProps> = ({ showLearnMore = true }) => {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string | undefined;
  const [barAnimated, setBarAnimated] = useState(false);

  // 根据 siteBrand 动态设置品牌名称
  const brandName = siteBrand === 'clougence' ? 'CloudCanal' : 'BladePipe';
  const brandTranslateId = siteBrand === 'clougence' ? 'compare.brand.cloudcanal' : 'compare.brand.bladepipe';

  // 汇率转换函数
  const convertToCNY = (usdPrice: string) => {
    const usdAmount = parseInt(usdPrice.replace(/[^\d]/g, ''));
    if (isNaN(usdAmount)) return usdPrice;
    const cnyAmount = Math.round(usdAmount * 7.2); // 使用 7.2 的汇率
    return `¥${cnyAmount}`;
  };

  // CloudCanal 特定价格
  const getCloudCanalPrice = (rowCount: string) => {
    const prices = {
      '1M': '¥483',
      '10M': '¥484',
      '100M': '¥493',
      '1000M': '¥583'
    };
    return prices[rowCount] || convertToCNY('$210');
  };

  // 动态生成数据
  const barData = [
    {
      label: translate({id: 'compare.rows.1M', message: '1M row/mo'}),
      items: [
        { name: translate({id: siteBrand === 'clougence' ? 'compare.brand.cloudcanal' : 'compare.brand.bladepipe', message: brandName}), price: siteBrand === 'clougence' ? getCloudCanalPrice('1M') : '$210', color: '#4BCD6B', highlight: true, note: translate({id: 'compare.note.byoc', message: '(*,BYOC)'}) },
        { name: translate({id: 'compare.brand.airbyte', message: 'Airbyte'}), price: siteBrand === 'clougence' ? convertToCNY('$450') : '$450', color: '#E5E7EB', note: translate({id: 'compare.note.cloud', message: '(Cloud)'}) },
        { name: translate({id: 'compare.brand.fivetran', message: 'Fivetran'}), price: siteBrand === 'clougence' ? convertToCNY('$500') : '$500', color: '#E5E7EB', note: translate({id: 'compare.note.standard', message: '(Standard)'}) },
      ],
    },
    {
      label: translate({id: 'compare.rows.10M', message: '10M row/mo'}),
      items: [
        { name: translate({id: siteBrand === 'clougence' ? 'compare.brand.cloudcanal' : 'compare.brand.bladepipe', message: brandName}), price: siteBrand === 'clougence' ? getCloudCanalPrice('10M') : '$300', color: '#4BCD6B', highlight: true, note: translate({id: 'compare.note.byoc', message: '(*,BYOC)'}) },
        { name: translate({id: 'compare.brand.airbyte', message: 'Airbyte'}), price: siteBrand === 'clougence' ? convertToCNY('$1000') : '$1000', color: '#E5E7EB', note: translate({id: 'compare.note.cloud', message: '(Cloud)'}) },
        { name: translate({id: 'compare.brand.fivetran', message: 'Fivetran'}), price: siteBrand === 'clougence' ? convertToCNY('$1350') : '$1350', color: '#E5E7EB', note: translate({id: 'compare.note.standard', message: '(Standard)'}) },
      ],
    },
    {
      label: translate({id: 'compare.rows.100M', message: '100M row/mo'}),
      items: [
        { name: translate({id: siteBrand === 'clougence' ? 'compare.brand.cloudcanal' : 'compare.brand.bladepipe', message: brandName}), price: siteBrand === 'clougence' ? getCloudCanalPrice('100M') : '$1200', color: '#4BCD6B', highlight: true, note: translate({id: 'compare.note.byoc', message: '(*,BYOC)'}) },
        { name: translate({id: 'compare.brand.airbyte', message: 'Airbyte'}), price: siteBrand === 'clougence' ? convertToCNY('$3000') : '$3000', color: '#E5E7EB', note: translate({id: 'compare.note.cloud', message: '(Cloud)'}) },
        { name: translate({id: 'compare.brand.fivetran', message: 'Fivetran'}), price: siteBrand === 'clougence' ? convertToCNY('$2900') : '$2900', color: '#E5E7EB', note: translate({id: 'compare.note.standard', message: '(Standard)'}) },
      ],
    },
    {
      label: translate({id: 'compare.rows.1000M', message: '1000M row/mo'}),
      items: [
        { name: translate({id: siteBrand === 'clougence' ? 'compare.brand.cloudcanal' : 'compare.brand.bladepipe', message: brandName}), price: siteBrand === 'clougence' ? getCloudCanalPrice('1000M') : '$10200', color: '#4BCD6B', highlight: true, note: translate({id: 'compare.note.byoc', message: '(*,BYOC)'}) },
        { name: translate({id: 'compare.brand.airbyte', message: 'Airbyte'}), price: siteBrand === 'clougence' ? convertToCNY('$14000') : '$14000', color: '#E5E7EB', note: translate({id: 'compare.note.cloud', message: '(Cloud)'}) },
        { name: translate({id: 'compare.brand.fivetran', message: 'Fivetran'}), price: siteBrand === 'clougence' ? convertToCNY('$12000') : '$12000', color: '#E5E7EB', note: translate({id: 'compare.note.standard', message: '(Standard)'}) },
      ],
    }
  ];

  const latencyData = [
    { name: translate({id: siteBrand === 'clougence' ? 'compare.brand.cloudcanal' : 'compare.brand.bladepipe', message: brandName}), label: translate({id: siteBrand === 'clougence' ? 'compare.latency.cloudcanal' : 'compare.latency.bladepipe', message: '<= 10 seconds *'}), color: '#00B386', width: 'w-40', highlight: true },
    { name: translate({id: 'compare.brand.airbyte', message: 'Airbyte'}), label: translate({id: 'compare.latency.others', message: '>= 1 minutes'}), color: '#0087c7', width: 'w-24', highlight: false },
    { name: translate({id: 'compare.brand.fivetran', message: 'Fivetran'}), label: translate({id: 'compare.latency.others', message: '>= 1 minutes'}), color: '#0087c7', width: 'w-24', highlight: false },
  ];

  useEffect(() => {
    setTimeout(() => setBarAnimated(true), 100); // 延迟触发动画，避免SSR闪烁
  }, []);
  return (
    <section className="w-full py-24 flex flex-col items-center bg-white">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center gap-12">
        {/* 标题区 */}
        <div className="flex flex-col items-center gap-3 mb-2">
          {showLearnMore ? (
            <h2 className="text-[40px] font-bold text-black leading-[50px] text-center">
              {siteBrand === 'clougence' ? (
                <Translate id="compare.why.cloudcanal">Why CloudCanal</Translate>
              ) : (
                <Translate id="compare.why">Why Data Teams Choose BladePipe</Translate>
              )}
            </h2>
          ) : (
            <h1 className="text-[40px] font-bold text-black leading-[50px] text-center">
              {siteBrand === 'clougence' ? (
                <Translate id="compare.why.cloudcanal">Why CloudCanal</Translate>
              ) : (
                <Translate id="compare.why">Why BladePipe</Translate>
              )}
            </h1>
          )}
        </div>
        <div className="flex flex-col w-full mb-3">
          <div className="flex flex-row w-full justify-between items-center">
            <h3 className="text-[24px] font-bold text-black">
              <Translate id="compare.millionRows">Better Performance at a Lower Cost</Translate>
            </h3>
            {showLearnMore && (
              <a 
                href={normalizeLinkForSiteBrand('/why', siteBrand)}
                className="button-link-white inline-flex items-center gap-2 px-7 py-3 bg-[#0087c7] rounded-full text-[18px] font-bold shadow hover:bg-[#0070a6] transition-all"
              >
                <Translate id="compare.learnMore">Learn More</Translate>
                <svg className="inline-block w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16"><path d="M4 8h8m0 0-3-3m3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            )}
          </div>
          <p className="text-[16px] text-[#666]">
            <Translate id="compare.cost.description">Cost Comparison: BladePipe vs. Airbyte vs. Fivetran</Translate>
          </p>
        </div>
        {/* 柱状对比图 */}
        <div className="w-full flex flex-col mb-4">
          {/* 分组容器 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-4">
            {barData.map((bar, idx) => (
              <div key={bar.label} className="flex flex-col items-center">
                {/* label */}
                <div className="flex items-end justify-center w-full mb-4">
                  <span className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-center">{bar.label}</span>
                </div>
                {/* 柱状条组 */}
                <div className="flex flex-row gap-4 justify-center items-end w-full">
                  {bar.items.map((item, i) => {
                    // 计算本组最大价格
                    const groupMaxPrice = Math.max(...bar.items.map(item => {
                      const num = parseInt((item.price || '').replace(/[^\d]/g, ''));
                      return isNaN(num) ? 0 : num;
                    }));
                    return (
                      <div translate="no"  key={item.name} className="flex flex-col items-center" style={{width: 60}}>
                        <span translate="no"
                              className={`mb-2 px-2 py-1 rounded-full text-white text-[11px] sm:text-[11px] lg:text-[12px] font-bold ${item.highlight ? 'bg-[#0087C7] shadow' : ''}`}
                          style={{
                            display: item.price === '/' ? 'none' : 'inline-block',
                            background: item.highlight ? undefined : 'transparent',
                            color: item.highlight ? '#fff' : '#18181B'
                          }}
                        >
                          {item.price}
                        </span>
                        <div
                          className={`rounded-lg ${item.highlight ? 'bg-[#4BCD6B]' : 'bg-gradient-to-t from-[#f8fafc] to-[#e5e7eb]'} w-full flex items-end justify-center relative transition-all mb-2`}
                          style={{
                            height: getBarHeight(item.price, groupMaxPrice),
                            minHeight: 32,
                            maxHeight: 120,
                            width: 60
                          }}
                        >
                        </div>
                        <div translate="no"  className={`text-[11px] sm:text-[11px] lg:text-[12px] font-bold mt-1 ${item.highlight ? 'text-[#18181B]' : 'text-[#18181B]'}`}>
                          {item.name}
                        </div>
                        {item.note && <div className="text-[11px] sm:text-[11px] lg:text-[12px] text-[#888]">{item.note}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div translate="no" className="w-full text-[13px] text-[#888] mt-2 mb-8">
          {siteBrand === 'clougence' ? (
            <Translate id="compare.note.cny">*: include one Aliyun ECS t2.xlarge for worker, ¥483/month</Translate>
          ) : (
            <Translate id="compare.note.usd">*: include one AWS EC2 t2.xlarge for worker, 200 usd/month</Translate>
          )}
        </div>
        {/* 分割线 */}
        <div className="w-full border-t border-black/10 border-solid border-0 border-l-0 border-r-0 border-b-0 my-2"></div>
        {/* 同步延迟对比条 */}
        <div className="w-full flex flex-col gap-4 mt-8">
          <h3 className="text-[22px] font-bold text-black mb-2">
            <Translate id="compare.syncLatency">Sync Data in Seconds</Translate>
          </h3>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
            {/* 主品牌 */}
            <div className="flex flex-col w-full lg:w-1/3">
              <div className="flex flex-row items-center w-full mb-1">
                <div translate="no" className="w-[80px] text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-[#18181B] flex items-center">
                  {siteBrand === 'clougence' ? (
                    <Translate id="compare.brand.cloudcanal">CloudCanal</Translate>
                  ) : (
                    <Translate id="compare.brand.bladepipe">BladePipe</Translate>
                  )}
                </div>
                <div className="flex-1"></div>
                <span className="bg-[#0087C7] text-white text-[12px] sm:text-[12px] lg:text-[13px] font-bold px-2 sm:px-2.5 lg:px-3 py-0.5 rounded-full inline-block ml-2">
                  {siteBrand === 'clougence' ? (
                    <Translate id="compare.latency.cloudcanal">{"<= 10 seconds *"}</Translate>
                  ) : (
                    <Translate id="compare.latency.bladepipe">{"<= 10 seconds *"}</Translate>
                  )}
                </span>
              </div>
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="flex-1">
                  <div className="w-full h-2 bg-[#e5e7eb] rounded-full relative">
                    <div className="absolute left-0 top-0 h-2 rounded-full bg-[#00B386]" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Airbyte */}
            <div className="flex flex-col w-full lg:w-1/3">
              <div className="flex flex-row items-center w-full mb-1">
                <div translate="no" className="w-[80px] text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-[#18181B] flex items-center">
                  <Translate id="compare.brand.airbyte">Airbyte</Translate>
                </div>
                <div className="flex-1"></div>
                <span className="bg-[#0087C7] text-white text-[12px] sm:text-[12px] lg:text-[13px] font-bold px-2 sm:px-2.5 lg:px-3 py-0.5 rounded-full inline-block ml-2">
                  <Translate id="compare.latency.others">{">= 1 minutes"}</Translate>
                </span>
              </div>
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="flex-1">
                  <div className="w-full h-2 bg-[#e5e7eb] rounded-full relative">
                    <div className="absolute left-0 top-0 h-2 rounded-full bg-[#000000]" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Fivetran */}
            <div className="flex flex-col w-full lg:w-1/3">
              <div className="flex flex-row items-center w-full mb-1">
                <div translate="no" className="w-[80px] text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-[#18181B] flex items-center">
                  <Translate id="compare.brand.fivetran">Fivetran</Translate>
                </div>
                <div className="flex-1"></div>
                <span className="bg-[#0087C7] text-white text-[12px] sm:text-[12px] lg:text-[13px] font-bold px-2 sm:px-2.5 lg:px-3 py-0.5 rounded-full inline-block ml-2">
                  <Translate id="compare.latency.others">{">= 1 minutes"}</Translate>
                </span>
              </div>
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="flex-1">
                  <div className="w-full h-2 bg-[#e5e7eb] rounded-full relative">
                    <div className="absolute left-0 top-0 h-2 rounded-full bg-[#000000]" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareSection;
