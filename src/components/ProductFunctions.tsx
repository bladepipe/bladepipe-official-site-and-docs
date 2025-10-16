import React, { useState } from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const getFunctionData = (siteBrand: string) => {
  if (siteBrand === 'clougence') {
    return {
      functionList: [
        translate({id: 'product.function.incremental', message: 'Incremental Sync'}),
        translate({id: 'product.function.full', message: 'Full Migration'}),
        translate({id: 'product.function.schema', message: 'Schema Migration & Sync'}),
        translate({id: 'product.function.verify', message: 'Data Verification & Correction'}),
        translate({id: 'product.function.genai', message: 'GenAI Services'}),
        translate({id: 'product.function.monitor', message: 'Monitoring & Alerting'}),
      ],
      imageMapping: [1, 2, 4, 5, 6, 8], // 对应原始图片的索引
      detailTitles: [
        translate({id: 'product.function.incremental.title', message: 'Incremental Sync'}),
        translate({id: 'product.function.full.title', message: 'Full Migration'}),
        translate({id: 'product.function.schema.title', message: 'Schema Migration & Sync'}),
        translate({id: 'product.function.verify.title', message: 'Data Verification & Correction'}),
        translate({id: 'product.function.genai.title', message: 'GenAI Services'}),
        translate({id: 'product.function.monitor.title', message: 'Monitoring & Alerting'}),
      ],
      detailDesc: [
        [
          translate({id: 'product.function.incremental.cc.detail1', message: 'Support most data pipelines with second-level latency'}),
          translate({id: 'product.function.incremental.cc.detail2', message: 'Support metadata mapping for databases, tables, and columns'}),
          translate({id: 'product.function.incremental.cc.detail3', message: 'Built-in virtual columns, data cleaning, wide table construction, filtering conditions and other visualization capabilities'})
        ],
        [
          translate({id: 'product.function.full.cc.detail1', message: 'Support one-time and scheduled migration'}),
          translate({id: 'product.function.full.cc.detail2', message: 'Support metadata mapping for databases, tables, and columns'}),
          translate({id: 'product.function.full.cc.detail3', message: 'Built-in virtual columns, data cleaning, wide table construction, filtering conditions and other visualization capabilities'})
        ],
        [
          translate({id: 'product.function.schema.cc.detail1', message: 'Support heterogeneous data source structure conversion'}),
          translate({id: 'product.function.schema.cc.detail2', message: 'Support DDL synchronization'}),
          translate({id: 'product.function.schema.cc.detail3', message: 'Support target structure duplicate detection'}),
          translate({id: 'product.function.schema.cc.detail4', message: 'Support third-party tools DDL like gh-ost, pt-osc'})
        ],
        [
          translate({id: 'product.function.verify.cc.detail1', message: 'Support one-time or scheduled verification and correction'}),
          translate({id: 'product.function.verify.cc.detail2', message: 'Support metadata mapping for databases, tables, and columns'}),
          translate({id: 'product.function.verify.cc.detail3', message: 'Comply with DBA verification, confirmation before correction data repair strategy'})
        ],
        [
          translate({id: 'product.function.genai.cc.detail1', message: 'Support vectorization of data from multiple sources'}),
          translate({id: 'product.function.genai.cc.detail2', message: 'Support one-stop capability from vector data to API services'}),
          translate({id: 'product.function.genai.cc.detail3', message: 'Reserve various AI effect tuning parameters and strategies'})
        ],
        [
          translate({id: 'product.function.monitor.cc.detail1', message: 'Support indicator system for multi-type data migration and sync pipelines'}),
          translate({id: 'product.function.monitor.cc.detail2', message: 'Support clear classification of visualization indicators'}),
          translate({id: 'product.function.monitor.cc.detail3', message: 'Support popular monitoring indicator system Prometheus'}),
          translate({id: 'product.function.monitor.cc.detail4', message: 'Support IM, SMS, email, phone multi-level alerts'})
        ]
      ]
    };
  }
  
  // Default for other brands
  return {
    functionList: [
      translate({id: 'product.function.incremental', message: 'Incremental Sync'}),
      translate({id: 'product.function.full', message: 'Full Migration'}),
      translate({id: 'product.function.cleaning', message: 'Data Processing & Cleaning'}),
      translate({id: 'product.function.schema', message: 'Schema Initialization & Evolution'}),
      translate({id: 'product.function.verify', message: 'Data Verification & Correction'}),
      translate({id: 'product.function.genai', message: 'GenAI Services'}),
      translate({id: 'product.function.bidirectional', message: 'Bi-directional Sync'}),
      translate({id: 'product.function.monitor', message: 'Monitoring & Alerting'}),
    ],
    imageMapping: [1, 2, 3, 4, 5, 6, 7, 8], // 默认按顺序映射
    detailTitles: [
      translate({id: 'product.function.incremental.title', message: 'Incremental Sync'}),
      translate({id: 'product.function.full.title', message: 'Full Migration'}),
      translate({id: 'product.function.cleaning.title', message: 'Data Processing & Cleaning'}),
      translate({id: 'product.function.schema.title', message: 'Schema Initialization & Evolution'}),
      translate({id: 'product.function.verify.title', message: 'Data Verification & Correction'}),
      translate({id: 'product.function.genai.title', message: 'GenAI Services'}),
      translate({id: 'product.function.bidirectional.title', message: 'Bi-directional Sync'}),
      translate({id: 'product.function.monitor.title', message: 'Monitoring & Alerting'}),
    ],
    detailDesc: [
      [
        translate({id: 'product.function.incremental.detail1', message: 'Capture and deliver data changes in real time.'}),
        translate({id: 'product.function.incremental.detail2', message: 'Adjust max rate to prevent peak pressure.'}),
        translate({id: 'product.function.incremental.detail3', message: 'Support heterogeneous sources.'})
      ],
      [
        translate({id: 'product.function.full.detail1', message: 'Scan existing data for full migration once or periodically.'}),
        translate({id: 'product.function.full.detail2', message: 'Enable to clear target data or tables before migration.'}),
        translate({id: 'product.function.full.detail3', message: 'Support heterogeneous sources.'})
      ],
      [
        translate({id: 'product.function.cleaning.detail1', message: 'Filter, prune, and map tables and columns as needed.'}),
        translate({id: 'product.function.cleaning.detail2', message: 'Built-in support for virtual columns, data cleaning, and widetable creation — all visualized.'}),
        translate({id: 'product.function.cleaning.detail3', message: 'Upload custom code to handle complex data processing and transformations.'})
      ],
      [
        translate({id: 'product.function.schema.detail1', message: 'Initialize tables and schemas for homogeneous or heterogeneous databases.'}),
        translate({id: 'product.function.schema.detail2', message: 'Synchronize schema changes (DDL) in real-time during data sync.'})
      ],
      [
        translate({id: 'product.function.verify.detail1', message: 'Compare full or sampled datasets row-by-row and field-by-field, either once or periodically.'}),
        translate({id: 'product.function.verify.detail2', message: 'Identify and correct missing or inconsistent data.'})
      ],
      [
        translate({id: 'product.function.genai.detail1', message: 'Support for popular LLMs and related model service APIs.'}),
        translate({id: 'product.function.genai.detail2', message: 'Chunk and vectorize database and file data and sync vectors to vector databases.'}),
        translate({id: 'product.function.genai.detail3', message: 'Provide RAG API services based on enterprise private data.'})
      ],
      [
        translate({id: 'product.function.bidirectional.detail1', message: 'Enable data sync across multiple databases within a group, with loop prevention.'}),
        translate({id: 'product.function.bidirectional.detail2', message: 'Schema changes can be synchronized across multiple databases as well.'})
      ],
      [
        translate({id: 'product.function.monitor.detail1', message: 'Built-in dozens of monitoring metrics to track task status in real time.'}),
        translate({id: 'product.function.monitor.detail2', message: 'Collect metrics of Console and Workers for system health check and resource monitoring.'})
      ]
    ]
  };
};

export default function ProductFunctions() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  
  const { functionList, detailTitles, detailDesc, imageMapping } = getFunctionData(siteBrand);

  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 flex justify-center items-center bg-[#eaf6ff]">
      <div className="w-full max-w-[1320px] px-4 md:px-8 flex flex-col items-center gap-2 sm:gap-6 lg:gap-8">
        {/* 标题区 */}
        <div className="flex flex-col items-center gap-2 sm:gap-2.5 lg:gap-3">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-[36px] sm:leading-[42px] lg:leading-[50px] text-black font-['Plus Jakarta Sans'] text-center">
            {siteBrand === 'clougence' ? (
              <Translate id="product.function.title.cc">What You Can Do with CloudCanal</Translate>
            ) : (
              <Translate id="product.function.title">What You Can Do with BladePipe</Translate>
            )}
          </h2>
          <div className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium leading-[1.56] text-[#262728] font-['Plus Jakarta Sans'] max-w-[600px]">
            <Translate id="product.function.subtitle">Rich functions, simple operation.</Translate>
          </div>
        </div>
        {/* 主体区 */}
        <div className="flex flex-col lg:flex-row w-full min-h-[400px] lg:h-[276px] p-0 gap-6 lg:gap-0 overflow-hidden items-start lg:items-center">
          {/* 左侧大号数字 - 在移动端隐藏 */}
          <div className="hidden lg:flex flex-col items-center justify-start w-[106px] h-full relative pt-8">
            <span className="text-[80px] font-bold leading-[100%] text-black opacity-20 select-none">{String(selectedIdx + 1).padStart(2, '0')}</span>
          </div>
          {/* 竖线分隔 - 在移动端隐藏 */}
          <div className="hidden lg:block h-[260px] w-[1px] bg-black/20 mx-8" />
          {/* 中间功能点列表 */}
          <div className="flex flex-col justify-start lg:justify-center w-full lg:w-[334px] gap-2 lg:gap-0">
            {functionList.map((item, idx) => {
              const isActive = selectedIdx === idx;
              const isHover = hoverIdx === idx;
              return (
                <div
                  key={item}
                  className="flex items-center h-[44px] cursor-pointer"
                  onClick={() => setSelectedIdx(idx)}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <span
                    className={
                      `text-[14px] sm:text-[15px] lg:text-[16px] font-bold leading-[20px] sm:leading-[22px] lg:leading-[24px] font-['Plus Jakarta Sans'] transition-colors duration-200 ` +
                      ((isActive || isHover)
                        ? 'text-[#0087C7] underline underline-offset-2'
                        : 'text-[#18181B]')
                    }
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
          {/* 右侧大图+详细内容 */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start flex-1 gap-6 lg:gap-10 mt-6 lg:mt-0">
            <img 
              src={`/img/home/function/${imageMapping[selectedIdx]}.svg`} 
              alt="Product Function Illustration" 
              className="w-full lg:w-auto h-auto lg:h-[201px] object-contain"
            />
            <div className="flex flex-col justify-center w-full lg:min-w-[320px] items-start">
              <div className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-[28px] sm:leading-[32px] lg:leading-[36px] text-black font-['Plus Jakarta Sans'] mb-4 sm:mb-5 lg:mb-6 text-left w-full">
                {detailTitles[selectedIdx]}
              </div>
              <ul className="flex flex-col gap-3 w-full">
                {detailDesc[selectedIdx].map((desc, i) => (
                  <React.Fragment key={i}>
                    <li className="text-[13px] sm:text-[14px] lg:text-[15px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262728] font-['Plus Jakarta Sans'] flex items-start text-left">
                      <img src="/img/home/icon/check.svg" alt="check" className="w-[1em] h-[1em] sm:w-[1.1em] sm:h-[1.1em] lg:w-[1.2em] lg:h-[1.2em] mr-2 mt-[4px] sm:mt-[5px] lg:mt-[6px] flex-shrink-0" style={{minWidth: '1em'}} />
                      <span className="text-left">{desc}</span>
                    </li>
                    <div className="w-full h-px bg-[rgba(0,0,0,0.1)]" />
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 