import React from 'react';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import FadeInSection from '@site/src/components/FadeInSection';
import Footer from '@site/src/components/Footer';
import CheckIcon from '@site/static/img/home/icon/check.svg';
import BlogCardGrid from '@site/src/components/BlogCardGrid';
import siteConfig from '@generated/docusaurus.config';

// 特性卡片配置
const featureCards = [
  {
    id: 'feature1',
    icon: '/img/solution/feature1.svg',
    titleKey: 'solution1.feature1.title',
    descriptionKey: 'solution1.feature1.description',
    titleHeight: 'h-[60px]',
    contentHeight: 'h-[126px]',
    defaultTitle: 'Real-time Preparation & Analytics',
    defaultDescription: 'Power diverse, data-driven applications.'
  },
  {
    id: 'feature2',
    icon: '/img/solution/feature2.svg',
    titleKey: 'solution1.feature2.title',
    descriptionKey: 'solution1.feature2.description',
    titleHeight: 'h-[30px]',
    contentHeight: 'h-[96px]',
    defaultTitle: 'Unified Data Integration',
    defaultDescription: 'Connect all your business systems and data sources.'
  },
  {
    id: 'feature3',
    icon: '/img/solution/feature3.svg',
    titleKey: 'solution1.feature3.title',
    descriptionKey: 'solution1.feature3.description',
    titleHeight: 'h-[30px]',
    contentHeight: 'h-[96px]',
    defaultTitle: 'Resource-Efficient',
    defaultDescription: 'Save bandwidth with incremental data replay.'
  },
  {
    id: 'feature4',
    icon: '/img/solution/feature4.svg',
    titleKey: 'solution1.feature4.title',
    descriptionKey: 'solution1.feature4.description',
    titleHeight: 'h-[30px]',
    contentHeight: 'h-[96px]',
    defaultTitle: 'Seamless Integration',
    defaultDescription: 'Fit your existing data standards (ODS / DW / DWM).'
  }
];

// 获取blog数据的逻辑
// 动态require所有详细json文件 - 根据 siteBrand 选择不同的目录
const getBlogContext = (siteBrand: string) => {
  if (siteBrand === 'clougence') {
    return (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-cc-blog.*\.json$/);
  } else {
    return (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-blog.*\.json$/);
  }
};

// 标签映射配置 - 基于 blog/tags.yml
const tagLabels: Record<string, string> = {
  'ai': 'Data & AI',
  'data_insights': 'Data insights',
  'user_stories': 'User stories', 
  'announcement': 'Announcement',
  'tutorials': 'Tutorials',
  'tech_share': 'Tutorials',
};

// 获取指定的3篇blog - 根据 siteBrand 选择不同的数据源
const getLatestBlogs = (siteBrand: string) => {
  // 根据 siteBrand 选择不同的 targetIds
  const targetIds = siteBrand === 'clougence' 
    ? ['visual_wide_table_build', 'paimon_starrocks_lakehouse', '004_mysql_clickhouse_widetable_sync'] // ccBlog 中的目标 ID
    : ['visual_wide_table_build', 'paimon_starrocks_lakehouse', '004_mysql_clickhouse_widetable_sync']; // 默认 blog 中的目标 ID
  
  const req = getBlogContext(siteBrand);
  
  // 构建permalink到详细json的映射
  const permalinkToDetail: Record<string, any> = {};
  req.keys().forEach((key: string) => {
    const detail = req(key);
    if (detail && detail.permalink) {
      permalinkToDetail[detail.permalink] = detail;
    }
  });

  console.log('permalinkToDetail', permalinkToDetail);
  
  // 直接从 permalinkToDetail 中获取匹配的 blog
  const matchedBlogs = Object.values(permalinkToDetail)
    .filter((detail: any) => {
      return detail?.frontMatter?.id && targetIds.includes(detail.frontMatter.id);
    })
    .map((detail: any) => {
      const rawTags = detail?.frontMatter?.tags || [];
      // 映射标签到对应的显示名称
      const mappedTags = rawTags.map((tag: string) => ({
        key: tag,
        label: tagLabels[tag] || tag
      }));
      
      // 获取作者信息 - 支持 authors.yml 配置
      const authorInfo = detail?.authors?.[0] || {};
      const authorName = detail?.frontMatter?.author || authorInfo?.name || (siteBrand === 'clougence' ? 'CloudCanal Team' : 'BladePipe Team');
      const authorImage = authorInfo?.imageURL || authorInfo?.image_url || '';
      
      return {
        title: detail.title,
        permalink: detail.permalink,
        date: detail.date ? detail.date.slice(0, 10) : '',
        author: authorName,
        authorImage: authorImage,
        image: detail?.frontMatter?.image || '',
        tags: mappedTags,
        desc: detail?.description || '',
      };
    });

  return matchedBlogs;
};

export default function Solution1(): React.JSX.Element {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  
  return (
    <Layout>
      <div className="w-full bg-white">
        {/* Banner Section - 响应式设计 */}
        <FadeInSection immediate>
          <section className="w-full min-h-[300px] sm:min-h-[400px] lg:h-[470px] py-[24px] sm:py-[30px] lg:py-[37px] px-4 sm:px-8 flex justify-center items-start bg-gradient-to-b from-white to-[#eaf6ff]">
            <div className="w-full max-w-[1320px] flex flex-col lg:flex-row gap-[24px] sm:gap-[28px] lg:gap-[32px] justify-start items-center">
              {/* 左侧内容区域 */}
              <div className="w-full lg:w-[509px] flex flex-col gap-[8px] sm:gap-[10px] justify-start items-start order-2 lg:order-1">
                <div className="w-full flex gap-[12px] sm:gap-[16px] justify-start items-start">
                  <h1 className="w-full text-[24px] sm:text-[32px] lg:text-[40px] font-bold leading-[32px] sm:leading-[40px] lg:leading-[50px] text-black text-center lg:text-left">
                    <Translate id="solution1.banner.title">
                      High-performance, Low-cost and Flexible Data Pipelines for Hundreds of Terabytes
                    </Translate>
                  </h1>
                </div>
              </div>
              
              {/* 右侧图形区域 */}
              <div className="w-full lg:flex-1 min-h-[200px] sm:min-h-[300px] lg:h-[396px] flex justify-center items-center order-1 lg:order-2">
                <img 
                  src={siteBrand === 'clougence' ? '/img/solution/banner_cc1.svg' : '/img/solution/banner1.svg'} 
                  alt="Solution Banner" 
                  className="w-full h-full max-w-[400px] lg:max-w-none object-contain"
                />
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 产品特性部分 - 响应式设计 */}
        <FadeInSection>
          <section className="w-full min-h-[300px] pt-[40px] sm:pt-[60px] lg:pt-[80px] pb-[40px] sm:pb-[60px] lg:pb-[80px] px-4 sm:px-8 flex justify-center items-start">
            <div className="w-full max-w-[1320px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] sm:gap-[18px] lg:gap-[20px] justify-items-center">
              {featureCards.map((card) => (
                <div 
                  key={card.id}
                  className="w-full max-w-[315px] min-h-[240px] sm:min-h-[260px] lg:h-[274px] bg-white border border-solid border-black/10 rounded-[16px] p-[20px] sm:p-[25px] lg:p-[30px] flex flex-col gap-[20px] sm:gap-[24px] lg:gap-[28px] justify-start items-start transition-all duration-300 hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]"
                >
                  {/* 图标区域 */}
                  <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] lg:w-[60px] lg:h-[60px] bg-[#e9f4ff] rounded-full p-[10px] sm:p-[11px] lg:p-[12px] flex gap-[10px] justify-start items-center">
                    <img 
                      src={card.icon} 
                      alt={card.id} 
                      className="w-[30px] h-[30px] sm:w-[33px] sm:h-[33px] lg:w-[36px] lg:h-[36px]"
                    />
                  </div>
                  
                  {/* 文字内容 */}
                  <div className="w-full flex-1 flex flex-col gap-[12px] sm:gap-[15px] lg:gap-[18px] justify-start items-start">
                    <h3 className="w-full text-[16px] sm:text-[18px] lg:text-[20px] font-bold leading-[24px] sm:leading-[27px] lg:leading-[30px] text-black">
                      <Translate id={card.titleKey}>
                        {card.defaultTitle}
                      </Translate>
                    </h3>
                    <p className="w-full text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-black/80">
                      <Translate id={card.descriptionKey}>
                        {card.defaultDescription}
                      </Translate>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* 方案架构部分 - 响应式设计 */}
        <FadeInSection>
          <section className="w-full min-h-[600px] py-[40px] sm:py-[60px] lg:py-[80px] px-4 sm:px-8 flex justify-center items-center">
            <div className="w-full max-w-[1320px] flex flex-col gap-[40px] sm:gap-[50px] lg:gap-[60px] justify-start items-center">
              {/* 标题 - 在框外 */}
              <h2 className="w-full text-center text-[28px] sm:text-[38px] lg:text-[48px] font-bold leading-[36px] sm:leading-[48px] lg:leading-[60px] text-black">
                <Translate id="solution1.architecture.title">
                  Solution Architecture
                </Translate>
              </h2>

              {/* 内容框 - 包含架构图和描述 */}
              <div className="w-full min-h-[500px] bg-gradient-to-b from-[#e7f3ff] to-white border border-solid border-black/10 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-[20px] sm:p-[30px] lg:p-[40px] flex flex-col gap-[30px] sm:gap-[45px] lg:gap-[60px] justify-start items-center">
                {/* 架构图容器 */}
                <div className="w-full min-h-[300px] sm:min-h-[400px] lg:h-[626px] bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] flex justify-center items-center p-[12px] sm:p-[16px] lg:p-0">
                  <img 
                    src={siteBrand === 'clougence' ? '/img/solution/architecture_cc1.svg' : '/img/solution/architecture1.svg'} 
                    alt="Solution Architecture" 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* 特性说明部分 */}
                <div className="w-full flex flex-col lg:flex-row gap-[30px] sm:gap-[50px] lg:gap-[80px] justify-center items-start">
                  {/* 左侧特性列表 */}
                  <div className="w-full lg:w-[560px] flex flex-col gap-[20px] sm:gap-[25px] lg:gap-[30px] justify-start items-start">
                    {/* 特性项 1 */}
                    <div className="w-full flex gap-[8px] sm:gap-[10px] justify-start items-start">
                      <CheckIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-[2px] sm:mt-[3px] lg:mt-[3.5px]" />
                      <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729]">
                        <Translate id="solution1.architecture.feature1">
                          Core Warehouse: Use StarRocks for analytics at the hundreds-of-terabytes scale
                        </Translate>
                      </p>
                    </div>

                    {/* 分割线 */}
                    <div className="w-full h-[20px] sm:h-[25px] lg:h-[30px] flex justify-start items-center">
                      <div className="w-full h-[1px] bg-black/10"></div>
                    </div>

                    {/* 特性项 2 */}
                    <div className="w-full flex gap-[8px] sm:gap-[10px] justify-start items-start">
                      <CheckIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-[2px] sm:mt-[3px] lg:mt-[3.5px]" />
                      <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729]">
                        {siteBrand === 'clougence' ? (
                          <Translate id="solution1.architecture.feature2.cc">
                            Real-time Ingestion: CloudCanal uses CDC and stream loading for high-performance, low-latency incremental updates
                          </Translate>
                        ) : (
                          <Translate id="solution1.architecture.feature2">
                            Real-time Ingestion: BladePipe uses CDC and stream loading for high-performance, low-latency incremental updates
                          </Translate>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* 右侧特性列表 */}
                  <div className="w-full lg:w-[560px] flex flex-col gap-[20px] sm:gap-[25px] lg:gap-[30px] justify-start items-start">
                    {/* 特性项 3 */}
                    <div className="w-full flex gap-[8px] sm:gap-[10px] justify-start items-start">
                      <CheckIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-[2px] sm:mt-[3px] lg:mt-[3.5px]" />
                      <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729]">
                        <Translate id="solution1.architecture.feature3">
                          DW Layer: Data is cleaned, aggregated, and combined using views or primary key tables
                        </Translate>
                      </p>
                    </div>

                    {/* 分割线 */}
                    <div className="w-full h-[20px] sm:h-[25px] lg:h-[30px] flex justify-start items-center">
                      <div className="w-full h-[1px] bg-black/10"></div>
                    </div>

                    {/* 特性项 4 */}
                    <div className="w-full flex gap-[8px] sm:gap-[10px] justify-start items-start">
                      <CheckIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-[2px] sm:mt-[3px] lg:mt-[3.5px]" />
                      <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729]">
                        <Translate id="solution1.architecture.feature4">
                          APP/DWM Layer: Build data services with materialized views or primary key tables based on business needs
                        </Translate>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/*/!* 用户评价部分 - 响应式设计 *!/*/}
        {/*<FadeInSection>*/}
        {/*  <section className="w-full min-h-[400px] py-[40px] sm:py-[60px] lg:py-[80px] px-4 sm:px-8 flex justify-center items-center">*/}
        {/*    <div className="w-full max-w-[1320px] flex flex-col gap-[40px] sm:gap-[50px] lg:gap-[60px] justify-start items-center">*/}
        {/*      /!* 标题 *!/*/}
        {/*      <h2 className="w-full text-center text-[28px] sm:text-[38px] lg:text-[48px] font-bold leading-[36px] sm:leading-[48px] lg:leading-[60px] text-black">*/}
        {/*        <Translate id="solution1.user.title">*/}
        {/*          Proven Use Cases*/}
        {/*        </Translate>*/}
        {/*      </h2>*/}

        {/*      /!* 用户评价内容 *!/*/}
        {/*      <div className="w-full flex flex-col lg:flex-row gap-[40px] sm:gap-[50px] lg:gap-[60px] justify-center items-center lg:items-start">*/}
        {/*        /!* 左侧用户场景 *!/*/}
        {/*        <div className="w-full lg:w-[630px] flex flex-col gap-[30px] sm:gap-[35px] lg:gap-[40px] justify-start items-start">*/}
        {/*          /!* 用户logo和名称 *!/*/}
        {/*          <div className="w-full flex gap-[20px] sm:gap-[28px] lg:gap-[34px] justify-start items-center">*/}
        {/*            <img */}
        {/*              src="/img/common/user/Lixiang.svg" */}
        {/*              alt="Li Auto" */}
        {/*              className="w-[120px] sm:w-[140px] lg:w-[158px] h-[24px] sm:h-[28px] lg:h-[32px] object-contain"*/}
        {/*            />*/}
        {/*            <span className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[28px] sm:leading-[30px] lg:leading-[32px] text-black">*/}
        {/*              Li Auto*/}
        {/*            </span>*/}
        {/*          </div>*/}

        {/*          /!* 用户场景列表 *!/*/}
        {/*          <div className="w-full flex flex-col gap-[6px] sm:gap-[7px] lg:gap-[8px] justify-start items-start">*/}
        {/*            /!* 场景项 1 *!/*/}
        {/*            <div className="w-full flex gap-[8px] sm:gap-[10px] justify-start items-start">*/}
        {/*              <CheckIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-[2px] sm:mt-[3px] lg:mt-[3.5px]" />*/}
        {/*              <p className="text-[14px] mb-0 sm:text-[15px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729]">*/}
        {/*                <Translate id="solution1.user.scenario1">*/}
        {/*                  Manage thousands of data sync tasks.*/}
        {/*                </Translate>*/}
        {/*              </p>*/}
        {/*            </div>*/}

        {/*            /!* 分割线 *!/*/}
        {/*            <div className="w-full h-[6px] sm:h-[7px] lg:h-[8px] flex justify-start items-center">*/}
        {/*              <div className="w-full h-[1px] bg-black/10"></div>*/}
        {/*            </div>*/}

        {/*            /!* 场景项 2 *!/*/}
        {/*            <div className="w-full flex gap-[8px] sm:gap-[10px] justify-start items-start">*/}
        {/*              <CheckIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-[2px] sm:mt-[3px] lg:mt-[3.5px]" />*/}
        {/*              <p className="text-[14px] mb-0 sm:text-[15px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729]">*/}
        {/*                <Translate id="solution1.user.scenario2">*/}
        {/*                  Use active-active sync for cross-region data aggregation.*/}
        {/*                </Translate>*/}
        {/*              </p>*/}
        {/*            </div>*/}

        {/*            /!* 分割线 *!/*/}
        {/*            <div className="w-full h-[6px] sm:h-[7px] lg:h-[8px] flex justify-start items-center">*/}
        {/*              <div className="w-full h-[1px] bg-black/10"></div>*/}
        {/*            </div>*/}

        {/*            /!* 场景项 3 *!/*/}
        {/*            <div className="w-full flex gap-[8px] sm:gap-[10px] justify-start items-start">*/}
        {/*              <CheckIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-[2px] sm:mt-[3px] lg:mt-[3.5px]" />*/}
        {/*              <p className="text-[14px] mb-0 sm:text-[15px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729]">*/}
        {/*                <Translate id="solution1.user.scenario3">*/}
        {/*                  Integrate with an open API to meet internal data governance.*/}
        {/*                </Translate>*/}
        {/*              </p>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}

        {/*        /!* 右侧评价卡片 *!/*/}
        {/*        <div className="w-full lg:w-[630px] bg-white rounded-[16px] shadow-[0_6px_12px_rgba(86,128,225,0.1),0_23px_23px_rgba(86,128,225,0.09),0_51px_31px_rgba(86,128,225,0.05),0_90px_36px_rgba(86,128,225,0.01),0_141px_40px_rgba(86,128,225,0)] p-[24px] sm:p-[32px] lg:p-[40px] flex flex-col gap-[20px] sm:gap-[25px] lg:gap-[30px] justify-start items-start">*/}
        {/*          /!* 引号图标 *!/*/}
        {/*          <img */}
        {/*            src="/img/common/icon/mark.svg" */}
        {/*            alt="Quote Mark" */}
        {/*            className="w-[45px] h-[36px] sm:w-[50px] sm:h-[40px] lg:w-[56px] lg:h-[45px]"*/}
        {/*          />*/}

        {/*          /!* 评价内容 *!/*/}
        {/*          <p className="w-full text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729] mb-0">*/}
        {/*            <Translate id="solution1.user.testimonial">*/}
        {/*            BladePipe offers a user-friendly configuration interface that enables efficient migration and synchronization of data across on-premises and cloud databases. In addition, it features powerful APIs, making integration with internal enterprise systems convenient and providing us with an all-in-one data synchronization solution.*/}
        {/*            </Translate>*/}
        {/*          </p>*/}

        {/*          /!* 用户信息 *!/*/}
        {/*          <div className="w-full flex gap-[12px] sm:gap-[15px] lg:gap-[19px] justify-start items-center">*/}
        {/*            <div className="flex-1 flex flex-col justify-start items-start">*/}
        {/*              <h4 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-black mb-0">*/}
        {/*                <Translate id="solution1.user.name">*/}
        {/*                  Kaven Han*/}
        {/*                </Translate>*/}
        {/*              </h4>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </section>*/}
        {/*</FadeInSection>*/}

        {/* Blog推荐部分 - 响应式设计 */}
        <FadeInSection>
        <section className="w-full min-h-[400px] py-[40px] sm:py-[60px] lg:py-[80px] px-4 sm:px-8 flex justify-center items-start bg-gradient-to-b from-[#e8f4ff] to-white">
            <div className="w-full max-w-[1320px] flex flex-col gap-[30px] sm:gap-[35px] lg:gap-[40px] justify-start items-start">
              {/* 标题区域 */}
              <div className="w-full flex justify-start items-center">
                <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-bold leading-[30px] sm:leading-[33px] lg:leading-[36px] text-black">
                  <Translate id="solution2.related.title">
                    Related Blogs
                  </Translate>
                </h2>
              </div>

              {/* Blog卡片区域 */}
              <BlogCardGrid blogs={getLatestBlogs(siteBrand)} />
            </div>
          </section>
        </FadeInSection>
      </div>
      <Footer />
    </Layout>
  );
} 