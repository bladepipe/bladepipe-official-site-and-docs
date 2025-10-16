import React from 'react';
import Layout from '@theme/Layout';
import FadeInSection from '@site/src/components/FadeInSection';
import Footer from '@site/src/components/Footer';
import Translate from '@docusaurus/Translate';
import BlogCardGrid from '@site/src/components/BlogCardGrid';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// @ts-ignore
import dmBlogListData from '../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

export default function CloudDMSolution() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  
  // 动态require所有详细json文件 - 从 dmBlog 文件夹获取
  const req = (require as any).context('../../.docusaurus/docusaurus-plugin-content-blog/default', false, /^\.\/site-dm-blog.*\.json$/);
  // 构建permalink到详细json的映射
  const permalinkToDetail: Record<string, any> = {};
  req.keys().forEach((key: string) => {
    const detail = req(key);
    if (detail && detail.permalink) {
      permalinkToDetail[detail.permalink] = detail;
    }
  });

  // 标签映射配置 - 基于 dmBlog/tags.yml
  const tagLabels: Record<string, string> = {
    'data_management': 'Data & AI',
    'tutorials': 'Tutorials',
    'announcement': 'Announcement',
    'user_stories': 'User stories',
    'engineering': 'Engineering',
  };

  // 相关文章数据 - 从 dmBlog 文件夹动态获取指定 key 的文章
  // 指定要获取的文章 key
  const targetKeys = ['dingtalk_sql_review', 'sql_review_upgrade', 'data_masking_in_minutes'];
  
  // 根据指定 key 过滤文章
  const relatedBlogs = targetKeys.map((key) => {
    // 查找匹配的文章
    const item = dmBlogListData.items.find((blog: any) => 
      blog.permalink.includes(key)
    );
    
    if (!item) {
      // 如果找不到指定 key 的文章，返回 null
      return null;
    }
    
    const detail = permalinkToDetail[item.permalink];
    const rawTags = detail?.frontMatter?.tags || [];
    // 映射标签到对应的显示名称
    const mappedTags = rawTags.map((tag: string) => ({
      key: tag,
      label: tagLabels[tag] || tag
    }));
    
    // 获取作者信息 - 支持 authors.yml 配置
    const authorInfo = detail?.authors?.[0] || {};
    const authorName = detail?.frontMatter?.author || authorInfo?.name || 'CloudDM Team';
    const authorImage = authorInfo?.imageURL || authorInfo?.image_url || '';
    
    return {
      title: item.title,
      permalink: item.permalink,
      date: item.date.slice(0, 10),
      author: authorName,
      authorImage: authorImage,
      image: detail?.frontMatter?.image || '/img/clouddm/blog/default-blog.jpg',
      tags: mappedTags,
      desc: detail?.description || '',
    };
  }).filter(Boolean); // 过滤掉 null 值

  return (
    <Layout>
      <div className="w-full bg-white">
        {/* Banner 部分 */}
        <FadeInSection>
          <section className="w-full min-h-[470px] bg-gradient-to-b from-white to-[#eaf6ff] flex justify-center items-center py-[37px] px-4">
            <div className="w-full max-w-[1320px] flex flex-col lg:flex-row gap-[32px] lg:gap-[140px] justify-center items-center">
              {/* 左侧内容区域 */}
              <div className="w-full lg:w-[509px] h-auto lg:h-[396px] flex flex-col gap-[32px] lg:gap-[32px] justify-center items-start">
                {/* 标题区域 */}
                <div className="w-full lg:w-[509px] h-auto lg:h-[114px] flex flex-col gap-[26px] justify-start items-start">
                  <h1 className="w-full lg:w-[509px] h-auto lg:h-[60px] text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[110%] lg:leading-[60px] text-black font-['PingFang SC'] m-0">
                    <Translate id="clouddm.solution.banner.title">
                      团队数据库协作
                    </Translate>
                  </h1>
                  <p className="w-full lg:w-[467px] h-auto lg:h-[28px] text-[16px] lg:text-[18px] font-medium leading-[24px] lg:leading-[28px] text-black opacity-80 font-['PingFang SC'] m-0">
                    <Translate id="clouddm.solution.banner.subtitle">
                      让团队化的数据库访问和管理变得安全可控。
                    </Translate>
                  </p>
                </div>
              </div>

              {/* 右侧流程图区域 */}
              <div className="w-full lg:w-[779px] h-[200px] lg:h-[396px] flex justify-center items-center">
                <img 
                  src="/img/clouddm/solution/banner.svg" 
                  alt="CloudDM Solution Banner" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 方案价值部分 */}
        <FadeInSection>
          <section className="w-full bg-white py-20 px-4">
            <div className="w-full max-w-[1320px] mx-auto">
              {/* 标题 */}
              <div className="text-center mb-24">
                <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-bold text-black font-['PingFang SC'] leading-[120%]">
                  <Translate id="clouddm.solution.features.title">
                    方案价值
                  </Translate>
                </h2>
              </div>

              {/* 特性卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 特性卡片 1 */}
                <div className="w-full max-w-[315px] h-[204px] bg-white border border-solid border-black border-opacity-10 rounded-2xl p-[30px] flex flex-col gap-7 hover:border-2 hover:border-solid hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(111,127,152,0.1),0_14px_14px_rgba(111,127,152,0.09),0_32px_19px_rgba(111,127,152,0.05),0_56px_22px_rgba(111,127,152,0.01),0_88px_25px_rgba(111,127,152,0)] transition-all duration-300">
                  <div className="w-[60px] h-[60px] bg-[#e9f4ff] rounded-full flex items-center justify-center">
                    <img 
                      src="/img/clouddm/solution/feature1.svg" 
                      alt="Feature 1" 
                      className="w-9 h-9"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black font-['PingFang SC'] leading-[28px]">
                      <Translate id="clouddm.solution.features.feature1.title">
                        基于角色的访问权限控制，细粒度的资源和功能划分
                      </Translate>
                    </h3>
                  </div>
                </div>

                {/* 特性卡片 2 - 特殊样式 */}
                <div className="w-full max-w-[315px] h-[204px] bg-white border border-solid border-black border-opacity-10 rounded-2xl p-[30px] flex flex-col gap-7 hover:border-2 hover:border-solid hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(111,127,152,0.1),0_14px_14px_rgba(111,127,152,0.09),0_32px_19px_rgba(111,127,152,0.05),0_56px_22px_rgba(111,127,152,0.01),0_88px_25px_rgba(111,127,152,0)] transition-all duration-300">
                  <div className="w-[60px] h-[60px] bg-[#e9f4ff] rounded-full flex items-center justify-center">
                    <img 
                      src="/img/clouddm/solution/feature2.svg" 
                      alt="Feature 2" 
                      className="w-9 h-9"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black font-['PingFang SC'] leading-[28px]">
                      <Translate id="clouddm.solution.features.feature2.title">
                        支持内置及多种第三方审批流的标准化工单流程
                      </Translate>
                    </h3>
                  </div>
                </div>

                {/* 特性卡片 3 */}
                <div className="w-full max-w-[315px] h-[204px] bg-white border border-solid border-black border-opacity-10 rounded-2xl p-[30px] flex flex-col gap-7 hover:border-2 hover:border-solid hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(111,127,152,0.1),0_14px_14px_rgba(111,127,152,0.09),0_32px_19px_rgba(111,127,152,0.05),0_56px_22px_rgba(111,127,152,0.01),0_88px_25px_rgba(111,127,152,0)] transition-all duration-300">
                  <div className="w-[60px] h-[60px] bg-[#e9f4ff] rounded-full flex items-center justify-center">
                    <img 
                      src="/img/clouddm/solution/feature3.svg" 
                      alt="Feature 3" 
                      className="w-9 h-9"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black font-['PingFang SC'] leading-[28px]">
                      <Translate id="clouddm.solution.features.feature3.title">
                        内置多种 SQL 规则，提前预防不符合规范的或风险的操作
                      </Translate>
                    </h3>
                  </div>
                </div>

                {/* 特性卡片 4 */}
                <div className="w-full max-w-[315px] h-[204px] bg-white border border-solid border-black border-opacity-10 rounded-2xl p-[30px] flex flex-col gap-7 hover:border-2 hover:border-solid hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(111,127,152,0.1),0_14px_14px_rgba(111,127,152,0.09),0_32px_19px_rgba(111,127,152,0.05),0_56px_22px_rgba(111,127,152,0.01),0_88px_25px_rgba(111,127,152,0)] transition-all duration-300">
                  <div className="w-[60px] h-[60px] bg-[#e9f4ff] rounded-full flex items-center justify-center">
                    <img 
                      src="/img/clouddm/solution/feature4.svg" 
                      alt="Feature 4" 
                      className="w-9 h-9"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black font-['PingFang SC'] leading-[28px]">
                      <Translate id="clouddm.solution.features.feature4.title">
                        灵活可自定义的数据脱敏规则，可设置作用范围
                      </Translate>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 方案架构部分 */}
        <FadeInSection>
          <section className="w-full bg-white py-12 px-4">
            <div className="w-full max-w-[1320px] mx-auto">
              {/* 标题 */}
              <div className="text-center mb-12">
                <h2 className="text-[40px] sm:text-[44px] lg:text-[48px] font-bold text-black font-['PingFang SC'] leading-[60px]">
                  <Translate id="clouddm.solution.architecture.title">
                    方案架构
                  </Translate>
                </h2>
              </div>

              {/* 架构图容器 */}
              <div className="w-full bg-gradient-to-b from-[#e7f3ff] to-white border border-solid border-black border-opacity-10 rounded-3xl p-10 lg:p-15">
                <div className="w-full max-w-[1200px] mx-auto">
                  {/* 架构图 */}
                  <div className="w-full flex justify-center items-center mb-16">
                    <img 
                      src="/img/clouddm/solution/architecture.svg" 
                      alt="CloudDM Solution Architecture" 
                      className="w-full h-auto max-w-full"
                    />
                  </div>

                  {/* 特性说明 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                    {/* 左侧特性 */}
                    <div className="space-y-8">
                      <div className="flex items-start gap-2">
                        <img 
                          src="/img/home/icon/check.svg" 
                          alt="Check" 
                          className="w-4 h-4 mt-1 flex-shrink-0"
                        />
                        <p className="text-base font-medium text-[#262a2b] font-['PingFang SC'] leading-6 mb-0">
                          <Translate id="clouddm.solution.architecture.feature1">
                            通过资源和功能权限控制，支持团队与组织的共同协作
                          </Translate>
                        </p>
                      </div>
                      <div className="w-full h-px bg-black bg-opacity-10"></div>
                      <div className="flex items-start gap-2">
                        <img 
                          src="/img/home/icon/check.svg" 
                          alt="Check" 
                          className="w-4 h-4 mt-1 flex-shrink-0"
                        />
                        <p className="text-base font-medium text-[#262a2b] font-['PingFang SC'] leading-6 mb-0">
                          <Translate id="clouddm.solution.architecture.feature2">
                            通过不同级别的敏感数据脱敏，降低信息泄露的风险
                          </Translate>
                        </p>
                      </div>
                    </div>

                    {/* 右侧特性 */}
                    <div className="space-y-8">
                      <div className="flex items-start gap-2">
                        <img 
                          src="/img/home/icon/check.svg" 
                          alt="Check" 
                          className="w-4 h-4 mt-1 flex-shrink-0"
                        />
                        <p className="text-base font-medium text-[#262a2b] font-['PingFang SC'] leading-6 mb-0">
                          <Translate id="clouddm.solution.architecture.feature3">
                            通过 SQL 规则，确认并提高组织协作的规范性，提前预防风险
                          </Translate>
                        </p>
                      </div>
                      <div className="w-full h-px bg-black bg-opacity-10"></div>
                      <div className="flex items-start gap-2">
                        <img 
                          src="/img/home/icon/check.svg" 
                          alt="Check" 
                          className="w-4 h-4 mt-1 flex-shrink-0"
                        />
                        <p className="text-base font-medium text-[#262a2b] font-['PingFang SC'] leading-6 mb-0">
                          <Translate id="clouddm.solution.architecture.feature4">
                            通过需由组织相关人员审批的工单流程，使数据库操作更可控
                          </Translate>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 典型场景部分 */}
        <FadeInSection>
          <section className="w-full bg-white py-20 px-4">
            <div className="w-full max-w-[1320px] mx-auto">
              {/* 标题 */}
              <div className="text-center mb-20">
                <h2 className="text-[40px] sm:text-[44px] lg:text-[48px] font-bold text-black font-['PingFang SC'] leading-[60px]">
                  <Translate id="clouddm.solution.scenes.title">
                    典型场景
                  </Translate>
                </h2>
              </div>

              {/* 场景卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* 场景卡片 1 */}
                <div className="w-full max-w-[306px] h-[192px] bg-white border border-solid border-black border-opacity-10 rounded-2xl p-10 flex flex-col items-center gap-5 hover:bg-[#eaf6ff] hover:border-2 hover:border-solid hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(111,127,152,0.1),0_14px_14px_rgba(111,127,152,0.09),0_32px_19px_rgba(111,127,152,0.05),0_56px_22px_rgba(111,127,152,0.01),0_88px_25px_rgba(111,127,152,0)] transition-all duration-300">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src="/img/clouddm/solution/scene1.svg" 
                      alt="Scene 1" 
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[#131314] font-['PingFang SC'] leading-[28px]">
                      <Translate id="clouddm.solution.scenes.scene1.title">
                        构建生产数据库访问平台
                      </Translate>
                    </h3>
                  </div>
                </div>

                {/* 场景卡片 2 */}
                <div className="w-full max-w-[306px] h-[192px] bg-white border border-solid border-black border-opacity-10 rounded-2xl p-10 flex flex-col items-center gap-5 hover:bg-[#eaf6ff] hover:border-2 hover:border-solid hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(111,127,152,0.1),0_14px_14px_rgba(111,127,152,0.09),0_32px_19px_rgba(111,127,152,0.05),0_56px_22px_rgba(111,127,152,0.01),0_88px_25px_rgba(111,127,152,0)] transition-all duration-300">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src="/img/clouddm/solution/scene2.svg" 
                      alt="Scene 2" 
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[#131314] font-['PingFang SC'] leading-[28px]">
                      <Translate id="clouddm.solution.scenes.scene2.title">
                        跨地域一站式数据访问
                      </Translate>
                    </h3>
                  </div>
                </div>

                {/* 场景卡片 3 */}
                <div className="w-full max-w-[306px] h-[192px] bg-white border border-solid border-black border-opacity-10 rounded-2xl p-10 flex flex-col items-center gap-5 hover:bg-[#eaf6ff] hover:border-2 hover:border-solid hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(111,127,152,0.1),0_14px_14px_rgba(111,127,152,0.09),0_32px_19px_rgba(111,127,152,0.05),0_56px_22px_rgba(111,127,152,0.01),0_88px_25px_rgba(111,127,152,0)] transition-all duration-300">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src="/img/clouddm/solution/scene3.svg" 
                      alt="Scene 3" 
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[#131314] font-['PingFang SC'] leading-[28px]">
                      <Translate id="clouddm.solution.scenes.scene3.title">
                        生产数据库管理
                      </Translate>
                    </h3>
                  </div>
                </div>

                {/* 场景卡片 4 */}
                <div className="w-full max-w-[306px] h-[192px] bg-white border border-solid border-black border-opacity-10 rounded-2xl p-10 flex flex-col items-center gap-5 hover:bg-[#eaf6ff] hover:border-2 hover:border-solid hover:border-[#0087c7] hover:shadow-[0_4px_8px_rgba(111,127,152,0.1),0_14px_14px_rgba(111,127,152,0.09),0_32px_19px_rgba(111,127,152,0.05),0_56px_22px_rgba(111,127,152,0.01),0_88px_25px_rgba(111,127,152,0)] transition-all duration-300">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src="/img/clouddm/solution/scene4.svg" 
                      alt="Scene 4" 
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[#131314] font-['PingFang SC'] leading-[28px]">
                      <Translate id="clouddm.solution.scenes.scene4.title">
                        敏感数据访问脱敏展示
                      </Translate>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 相关文章部分 - 当 siteBrand 不为 clougence 时显示 */}
        {siteBrand !== 'clougence' && (
          <FadeInSection>
            <section className="w-full py-20 px-20 bg-gradient-to-b from-[#e8f4ff] to-white">
              <div className="w-full max-w-[1320px] mx-auto">
                {/* 标题 */}
                <div className="mb-20">
                  <h2 className="text-[28px] font-bold text-black leading-[36px] font-['Plus Jakarta Sans']">
                    Related articles
                  </h2>
                </div>

                {/* 博客卡片区 */}
                <BlogCardGrid blogs={relatedBlogs} className="max-w-[1320px]" />
              </div>
            </section>
          </FadeInSection>
        )}
        
        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
}
