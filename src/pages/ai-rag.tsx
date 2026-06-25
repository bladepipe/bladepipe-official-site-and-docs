import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import FadeInSection from '@site/src/components/FadeInSection';
import Footer from '@site/src/components/Footer';
import CheckIcon from '@site/static/img/home/icon/check.svg';
import BlogCardGrid from '@site/src/components/BlogCardGrid';
import siteConfig from '@generated/docusaurus.config';
import { getPageMeta } from '@site/src/utils/meta';

// 特性卡片配置
const featureCards = [
  {
    id: 'feature1',
    icon: '/img/solution/feature5.svg',
    titleKey: 'solution2.feature1.title',
    descriptionKey: 'solution2.feature1.description',
    titleHeight: 'h-[60px]',
    contentHeight: 'h-[126px]',
    defaultTitle: 'Real-Time Data Preparation for RAG',
    defaultDescription: 'Ingest and prepare unstructured data in real time for retrieval-augmented generation.'
  },
  {
    id: 'feature2',
    icon: '/img/solution/feature6.svg',
    titleKey: 'solution2.feature2.title',
    descriptionKey: 'solution2.feature2.description',
    titleHeight: 'h-[30px]',
    contentHeight: 'h-[96px]',
    defaultTitle: 'Unified Data Integration',
    defaultDescription: 'Connect multi-source, multi-format data into a unified RAG pipeline.'
  },
  {
    id: 'feature3',
    icon: '/img/solution/feature7.svg',
    titleKey: 'solution2.feature3.title',
    descriptionKey: 'solution2.feature3.description',
    titleHeight: 'h-[30px]',
    contentHeight: 'h-[96px]',
    defaultTitle: 'Resource-Efficient RAG Pipelines',
    defaultDescription: 'Optimize ingestion and vectorization with incremental processing and efficient replay.'
  },
  {
    id: 'feature4',
    icon: '/img/solution/feature8.svg',
    titleKey: 'solution2.feature4.title',
    descriptionKey: 'solution2.feature4.description',
    titleHeight: 'h-[30px]',
    contentHeight: 'h-[96px]',
    defaultTitle: 'Seamless Integration with AI & Data',
    defaultDescription: 'Fit into existing data platforms, LLMs, and vector databases.'
  }
];

// 步骤配置 - 根据 siteBrand 动态生成
const getStepCards = (siteBrand: string) => [
  {
    id: 'step1',
    number: '01',
    titleKey: 'solution2.steps.step1.title',
    descriptionKey: 'solution2.steps.step1.description',
    titleWidth: 'w-[389px]',
    contentHeight: 'h-[100px]',
    cardHeight: 'h-[180px]',
    defaultTitle: 'Connect to Your Vector Database',
    defaultDescription: 'Use PostgreSQL, Elasticsearch, MongoDB, StarRocks, and more as your knowledge base foundation.'
  },
  {
    id: 'step2',
    number: '02',
    titleKey: 'solution2.steps.step2.title',
    descriptionKey: 'solution2.steps.step2.description',
    titleWidth: 'w-[293px]',
    contentHeight: 'h-[76px]',
    cardHeight: 'h-[156px]',
    defaultTitle: 'Ingest Unstructured Data',
    defaultDescription: 'Process text from multiple sources and formats with several pipelines.'
  },
  {
    id: 'step3',
    number: '03',
    titleKey: siteBrand === 'clougence' ? 'solution2.steps.step3.title.cc' : 'solution2.steps.step3.title',
    descriptionKey: siteBrand === 'clougence' ? 'solution2.steps.step3.description.cc' : 'solution2.steps.step3.description',
    titleWidth: 'w-[319px]',
    contentHeight: 'h-[100px]',
    cardHeight: 'h-[180px]',
    defaultTitle: 'Automate Data Preparation',
    defaultDescription: siteBrand === 'clougence' 
      ? 'Automatically chunk, clean, and vectorize your text. Metadata is enriched with leading LLMs (like Deepseek and Qwen) to improve retrieval quality.'
      : 'Automatically chunk, clean, and vectorize your text. Metadata is enriched with leading LLMs (like OpenAI and Anthropic) to improve retrieval quality.'
  },
  {
    id: 'step4',
    number: '04',
    titleKey: 'solution2.steps.step4.title',
    descriptionKey: 'solution2.steps.step4.description',
    titleWidth: 'w-[317px]',
    contentHeight: 'h-[76px]',
    cardHeight: 'h-[156px]',
    defaultTitle: 'Build Your Knowledge Base',
    defaultDescription: 'Store generated vectors and metadata in your chosen database.'
  },
  {
    id: 'step5',
    number: '05',
    titleKey: 'solution2.steps.step5.title',
    descriptionKey: 'solution2.steps.step5.description',
    titleWidth: 'w-[223px]',
    contentHeight: 'h-[100px]',
    cardHeight: 'h-[180px]',
    defaultTitle: 'Serve with RAG API',
    defaultDescription: 'Provide intelligent answers through RAG APIs that combine vector retrieval with LLM reasoning, ready for any downstream application.'
  }
];

// 获取blog数据的逻辑 - 根据 siteBrand 选择不同的数据源

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
    ? ['rag_concept', 'ragapi_cloud', 'ragapi_ollama'] // ccBlog 中的目标 ID
    : ['rag_concept', 'ragapi_cloud', 'ragapi_ollama']; // 默认 blog 中的目标 ID
  
  const req = getBlogContext(siteBrand);
  
  // 构建permalink到详细json的映射
  const permalinkToDetail: Record<string, any> = {};
  req.keys().forEach((key: string) => {
    const detail = req(key);
    if (detail && detail.permalink) {
      permalinkToDetail[detail.permalink] = detail;
    }
  });

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

export default function Solution2(): React.JSX.Element {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const { i18n } = useDocusaurusContext();
  const stepCards = getStepCards(siteBrand);
  const pageMeta = getPageMeta('ai-rag', undefined, undefined, i18n.currentLocale);
  
  return (
    <Layout description={pageMeta.description}>
      <Head>
        <title>{pageMeta.title}</title>
      </Head>
      <div className="w-full bg-white">
        <FadeInSection immediate>
          <section className="w-full min-h-[300px] sm:min-h-[400px] lg:h-[470px] py-[24px] sm:py-[30px] lg:py-[37px] px-4 sm:px-8 flex justify-center items-start bg-gradient-to-b from-white to-[#eaf6ff]">
            <div className="w-full max-w-[1320px] flex flex-col lg:flex-row gap-[24px] sm:gap-[28px] lg:gap-[32px] justify-start items-center">
              {/* 左侧内容区域 */}
              <div className="w-full lg:w-[509px] flex flex-col gap-[8px] sm:gap-[10px] justify-start items-start order-2 lg:order-1">
                <div className="w-full flex gap-[12px] sm:gap-[16px] justify-start items-start">
                  <h1 className="w-full text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-[36px] sm:leading-[46px] lg:leading-[60px] text-black text-center lg:text-left">
                    <Translate id="solution2.banner.title">
                      Turn Unstructured Data into AI-Powered RAG APIs
                    </Translate>
                  </h1>
                </div>
              </div>
              
              {/* 右侧图形区域 */}
              <div className="w-full lg:w-[779px] min-h-[200px] sm:min-h-[300px] lg:h-[396px] flex justify-center items-center order-1 lg:order-2">
                <img 
                  src={siteBrand === 'clougence' ? '/img/solution/banner_cc2.svg' : '/img/solution/banner2.png'}
                  alt="RAG API Solution Banner" 
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
              {featureCards.map((card, index) => (
                <div 
                  key={card.id}
                  className="w-full max-w-[315px] min-h-[280px] sm:min-h-[300px] lg:h-[322px] bg-white border border-solid border-black/10 rounded-[16px] p-[20px] sm:p-[25px] lg:p-[30px] flex flex-col gap-[20px] sm:gap-[24px] lg:gap-[28px] justify-start items-start transition-all duration-300 hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]"
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
                    <h2 className="w-full text-[16px] sm:text-[18px] lg:text-[20px] font-bold leading-[24px] sm:leading-[27px] lg:leading-[30px] text-black">
                      <Translate id={card.titleKey}>
                        {card.defaultTitle}
                      </Translate>
                    </h2>
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
                <Translate id="solution2.architecture.title">
                  Solution Architecture
                </Translate>
              </h2>

              {/* 内容框 - 包含架构图和描述 */}
              <div className="w-full min-h-[500px] bg-gradient-to-b from-[#e7f3ff] to-white border border-solid border-black/10 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-[20px] sm:p-[40px] lg:p-[60px] flex flex-col gap-[30px] sm:gap-[45px] lg:gap-[60px] justify-start items-center">
                {/* 架构图容器 */}
                <div className="w-full min-h-[400px] sm:min-h-[500px] lg:h-[805px] bg-white rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] flex justify-center items-center p-[12px] sm:p-[16px] lg:p-0">
                  <img 
                    src="/img/solution/architecture2.png"
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
                        <Translate id="solution2.architecture.feature1">
                          Ingest multi-source, multi-format text with embedding support
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
                        <Translate id="solution2.architecture.feature2">
                          Automatically chunk and clean data, enriching with LLM-based metadata for better retrieval
                        </Translate>
                      </p>
                    </div>
                  </div>

                  {/* 右侧特性列表 */}
                  <div className="w-full lg:w-[560px] flex flex-col gap-[20px] sm:gap-[25px] lg:gap-[30px] justify-start items-start">
                    {/* 特性项 3 */}
                    <div className="w-full flex gap-[8px] sm:gap-[10px] justify-start items-start">
                      <CheckIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-[2px] sm:mt-[3px] lg:mt-[3.5px]" />
                      <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-[#262729]">
                        <Translate id="solution2.architecture.feature3">
                          Compatible with leading LLMs including OpenAI, Anthropic, Qwen, Cohere and more
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
                        <Translate id="solution2.architecture.feature4">
                          Support vector DBs like PostgreSQL, Elasticsearch, MongoDB, and StarRocks
                        </Translate>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 方案步骤部分 - 响应式设计 */}
        <FadeInSection>
          <section className="w-full min-h-[800px] py-[40px] sm:py-[50px] lg:py-[60px] px-4 sm:px-8 flex justify-center items-start bg-white">
            <div className="w-full max-w-[1320px] flex flex-col gap-[40px] sm:gap-[50px] lg:gap-[60px] justify-center items-center">
              {/* 标题 */}
              <h2 className="w-full text-center text-[28px] sm:text-[38px] lg:text-[48px] font-bold leading-[36px] sm:leading-[48px] lg:leading-[60px] text-black">
                <Translate id="solution2.steps.title">
                  RAG Pipeline: From Data to API
                </Translate>
              </h2>
              
              <div className="w-full flex flex-col gap-[16px] sm:gap-[18px] lg:gap-[20px] justify-center items-center">
                {/* 顶部数据源图标 */}
              <div className="w-full max-w-[153px] flex flex-col gap-[8px] sm:gap-[10px] justify-start items-center">
                <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] flex justify-start items-start">
                  <img 
                    src="/img/solution/step_start.svg" 
                    alt="Data Sources" 
                    className="w-full h-full"
                  />
                </div>
                <p className="text-[18px] sm:text-[21px] lg:text-[24px] font-bold leading-[24px] sm:leading-[28px] lg:leading-[32px] text-black text-center">
                  <Translate id="solution2.steps.dataSources">
                    Data Sources
                  </Translate>
                </p>
              </div>

              {/* 连接线条 - 顶部到步骤01 */}
              <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[566px] h-[40px] sm:h-[60px] lg:h-[87px] flex justify-center items-center">
                <img 
                  src="/img/solution/start_line.svg" 
                  alt="Connection Line" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 步骤流程 */}
              <div className="w-full flex flex-col gap-[16px] sm:gap-[18px] lg:gap-[20px] justify-center items-center">
                {stepCards.map((step, index) => (
                  <div 
                    key={step.id}
                    className="w-full max-w-[876px] min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] bg-[#eaf6ff] rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] px-[20px] sm:px-[35px] lg:px-[50px] py-[20px] sm:py-[30px] lg:py-[40px] flex gap-[20px] sm:gap-[30px] lg:gap-[40px] justify-start items-start"
                  >
                    <div className="w-[30px] sm:w-[38px] lg:w-[46px] h-[28px] sm:h-[34px] lg:h-[40px] text-[20px] sm:text-[26px] lg:text-[32px] font-bold leading-[28px] sm:leading-[34px] lg:leading-[40px] text-[#0087c7] text-center flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="w-full flex flex-col gap-[8px] sm:gap-[10px] lg:gap-[12px] justify-start items-start">
                      <h3 className="w-full text-[18px] sm:text-[21px] lg:text-[24px] font-bold leading-[24px] sm:leading-[28px] lg:leading-[32px] text-black">
                        <Translate id={step.titleKey}>
                          {step.defaultTitle}
                        </Translate>
                      </h3>
                      <p className="w-full text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-black/80">
                        <Translate id={step.descriptionKey}>
                          {step.defaultDescription}
                        </Translate>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 连接线条 - 步骤05到底部 */}
              <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[566px] h-[40px] sm:h-[60px] lg:h-[87px] flex justify-center items-center">
                <img 
                  src="/img/solution/end_line.svg" 
                  alt="Connection Line" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 底部RAG API图标 */}
              <div className="w-[96px] h-[122px] flex flex-col gap-[10px] justify-start items-center">
                <div className="w-[80px] h-[80px] flex justify-start items-start">
                  <img 
                    src="/img/solution/step_end.svg" 
                    alt="RAG API" 
                    className="w-[80px] h-[80px]"
                  />
                </div>
                <p className="w-[96px] h-[32px] text-[24px] font-bold leading-[32px] text-black text-center">
                  <Translate id="solution2.steps.ragApi">
                    RAG API
                  </Translate>
                </p>
              </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 典型用户场景部分 - 响应式设计 */}
        <FadeInSection>
          <section className="w-full py-[40px] sm:py-[60px] lg:py-[80px] flex justify-center items-center">
            <div className="w-full max-w-[1320px] flex flex-col gap-[30px] sm:gap-[45px] lg:gap-[60px] justify-start items-center">
              {/* 标题 */}
              <h2 className="w-full text-center text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-[36px] sm:leading-[46px] lg:leading-[60px] text-black">
                <Translate id="solution2.scenarios.title">
                  Proven Use Cases
                </Translate>
              </h2>

              {/* 场景卡片区域 */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[24px] lg:gap-[32px] justify-items-center">
                {/* 场景 1 - Internal Chatbot */}
                <div className="w-full bg-white border border-solid border-black/10 rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] p-[20px] sm:p-[30px] lg:p-[40px] flex flex-col gap-[16px] sm:gap-[18px] lg:gap-[20px] justify-start items-center transition-all duration-300 hover:bg-[#eaf6ff] hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]">
                  {/* 图标 */}
                  <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[64px] lg:h-[64px] flex justify-center items-center">
                    <img 
                      src="/img/solution/scen1.svg" 
                      alt="Internal Chatbot" 
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* 内容 */}
                  <div className="w-full flex flex-col gap-[12px] sm:gap-[16px] lg:gap-[20px] justify-start items-center">
                    <h3 className="text-[18px] sm:text-[21px] lg:text-[24px] font-bold leading-[24px] sm:leading-[28px] lg:leading-[32px] text-[#131316] text-center">
                      <Translate id="solution2.scenarios.scenario1.title">
                        Internal Chatbot
                      </Translate>
                    </h3>
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-black/80 text-center">
                      <Translate id="solution2.scenarios.scenario1.description">
                        Allow employees to ask questions in natural language and get instant answers from internal policies, process documents, and meeting notes.
                      </Translate>
                    </p>
                  </div>
                </div>

                {/* 场景 2 - AI-Powered Customer Support */}
                <div className="w-full bg-white border border-solid border-black/10 rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] p-[20px] sm:p-[30px] lg:p-[40px] flex flex-col gap-[16px] sm:gap-[18px] lg:gap-[20px] justify-start items-center transition-all duration-300 hover:bg-[#eaf6ff] hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]">
                  {/* 图标 */}
                  <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[64px] lg:h-[64px] flex justify-center items-center">
                    <img 
                      src="/img/solution/scen2.svg" 
                      alt="AI-Powered Customer Support" 
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* 内容 */}
                  <div className="w-full flex flex-col gap-[12px] sm:gap-[16px] lg:gap-[20px] justify-start items-center">
                    <h3 className="text-[18px] sm:text-[21px] lg:text-[24px] font-bold leading-[24px] sm:leading-[28px] lg:leading-[32px] text-[#131316] text-center">
                      <Translate id="solution2.scenarios.scenario2.title">
                        AI-Powered Customer Support
                      </Translate>
                    </h3>
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-black/80 text-center">
                      <Translate id="solution2.scenarios.scenario2.description">
                        Build automated assistants on top of your product documentation and FAQs to deliver instant support and reduce manual workload.
                      </Translate>
                    </p>
                  </div>
                </div>

                {/* 场景 3 - Data Preparation for AI */}
                <div className="w-full bg-white border border-solid border-black/10 rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] p-[20px] sm:p-[30px] lg:p-[40px] flex flex-col gap-[16px] sm:gap-[18px] lg:gap-[20px] justify-start items-center transition-all duration-300 hover:bg-[#eaf6ff] hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]">
                  {/* 图标 */}
                  <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[64px] lg:h-[64px] flex justify-center items-center">
                    <img 
                      src="/img/solution/scen3.svg" 
                      alt="Data Preparation for AI" 
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* 内容 */}
                  <div className="w-full flex flex-col gap-[12px] sm:gap-[16px] lg:gap-[20px] justify-start items-center">
                    <h3 className="text-[18px] sm:text-[21px] lg:text-[24px] font-bold leading-[24px] sm:leading-[28px] lg:leading-[32px] text-[#131316] text-center">
                      <Translate id="solution2.scenarios.scenario3.title">
                        Data Preparation for AI
                      </Translate>
                    </h3>
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-black/80 text-center">
                      <Translate id="solution2.scenarios.scenario3.description">
                        Extract structured information from unstructured text to create high-quality datasets for model training and fine-tuning.
                      </Translate>
                    </p>
                  </div>
                </div>

                {/* 场景 4 - Intelligent Semantic Search */}
                <div className="w-full bg-white border border-solid border-black/10 rounded-[12px] sm:rounded-[14px] lg:rounded-[16px] p-[20px] sm:p-[30px] lg:p-[40px] flex flex-col gap-[16px] sm:gap-[18px] lg:gap-[20px] justify-start items-center transition-all duration-300 hover:bg-[#eaf6ff] hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]">
                  {/* 图标 */}
                  <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] lg:w-[64px] lg:h-[64px] flex justify-center items-center">
                    <img 
                      src="/img/solution/scen4.svg" 
                      alt="Intelligent Semantic Search" 
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* 内容 */}
                  <div className="w-full flex flex-col gap-[12px] sm:gap-[16px] lg:gap-[20px] justify-start items-center">
                    <h3 className="text-[18px] sm:text-[21px] lg:text-[24px] font-bold leading-[24px] sm:leading-[28px] lg:leading-[32px] text-[#131316] text-center">
                      <Translate id="solution2.scenarios.scenario4.title">
                        Intelligent Semantic Search
                      </Translate>
                    </h3>
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] text-black/80 text-center">
                      <Translate id="solution2.scenarios.scenario4.description">
                        Upgrade from keyword search to a system that understands context, delivering more accurate and relevant results.
                      </Translate>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

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
