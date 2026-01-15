import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Translate, { translate } from '@docusaurus/Translate';
import { Input, Select, Checkbox, Tag } from 'antd';
import { SearchOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import CheckIcon from '@site/static/img/home/icon/check.svg';
import DataSourceCards from '@site/src/components/DataSourceCards';
import Footer from '@site/src/components/Footer';
import FadeInSection from '@site/src/components/FadeInSection';
import siteConfig from '@generated/docusaurus.config';
import { getPageMeta } from '@site/src/utils/meta';
import './connector.css';

const { Option } = Select;

export default function Connector() {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const [searchValue, setSearchValue] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [sourceValue, setSourceValue] = useState(false);
  const [targetValue, setTargetValue] = useState(false);
  const [businessOnly, setBusinessOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // 使用统一的工具函数获取连接器页面 meta 信息
  const connectorMeta = getPageMeta('connector');

  const handleRemoveFilter = (filter: string) => {
    if (filter.startsWith(translate({id: 'connector.filter.searchPrefix', message: 'Search:'}))) {
      setSearchFilter('');
      setSearchValue('');
    } else if (filter.startsWith(translate({id: 'connector.filter.sourcePrefix', message: 'Source:'}))) {
      setSourceValue(false);
    } else if (filter.startsWith(translate({id: 'connector.filter.targetPrefix', message: 'Target:'}))) {
      setTargetValue(false);
    } else if (filter === translate({id: 'connector.filter.businessOnly', message: 'Business ONLY'})) {
      setBusinessOnly(false);
    }
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setSearchValue('');
    setSearchFilter('');
    setSourceValue(false);
    setTargetValue(false);
    setBusinessOnly(false);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      setSearchFilter(searchValue.trim());
    }
  };

  // 监听筛选条件变化，更新筛选标签
  React.useEffect(() => {
    const newFilters: string[] = [];

    if (searchFilter) {
      newFilters.push(`${translate({id: 'connector.filter.searchPrefix', message: 'Search:'})} ${searchFilter}`);
    }

    if (sourceValue) {
      newFilters.push(`${translate({id: 'connector.filter.sourcePrefix', message: 'Source:'})} ${translate({id: 'connector.filter.true', message: 'true'})}`);
    }

    if (targetValue) {
      newFilters.push(`${translate({id: 'connector.filter.targetPrefix', message: 'Target:'})} ${translate({id: 'connector.filter.true', message: 'true'})}`);
    }

    if (businessOnly) {
      newFilters.push(translate({id: 'connector.filter.businessOnly', message: 'Business ONLY'}));
    }

    setActiveFilters(newFilters);
  }, [searchFilter, sourceValue, targetValue, businessOnly]);

  return (
    <Layout description={connectorMeta.description}>
      <Head>
        <title>{connectorMeta.title}</title>
      </Head>
      <div className="w-full bg-white">
        {/* Banner部分 */}
        <FadeInSection>
          <div className="w-full flex justify-center items-center py-[16px] sm:py-[21px] lg:py-[48px] px-4">
            <div className="w-full max-w-[1920px] flex flex-col gap-[16px] sm:gap-[20px] justify-start items-center">
              {/* 主标题和副标题 */}
              <div className="w-full max-w-[863px] flex flex-col gap-[12px] sm:gap-[16px] justify-start items-center">
                {/* 主标题 */}
                <h1 className="w-full text-[32px] sm:text-[48px] lg:text-[60px] font-bold leading-[40px] sm:leading-[56px] lg:leading-[70px] text-black text-center whitespace-nowrap">
                  <Translate id="connector.title">
                    60+ connectors are supported
                  </Translate>
                </h1>

                {/* 副标题 */}
                <p className="w-full text-[20px] sm:text-[28px] lg:text-[32px] font-bold leading-[28px] sm:leading-[36px] lg:leading-[40px] text-[#262A2B] text-center">
                  <Translate id="connector.subtitle">
                    More are on the way.
                  </Translate>
                </p>
              </div>

              {/* 联系信息 */}
              <p className="w-full text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[27px] lg:leading-[30px] text-black text-center px-4">
                <Translate id="connector.contact.prefix">
                  Didn't find the desired connectors?
                </Translate>{' '}
                  <span className="!text-[#0087c7]">
                      <a href="/about#contactUs" className="font-medium hover:underline cursor-pointer">
                  <Translate id="connector.contact.link">
                    Contact us.
                  </Translate>
                </a>
                  </span>
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* 搜索筛选框部分 */}
        <FadeInSection>
          <div className="w-full flex justify-center items-start py-[24px] sm:py-[36px] px-4">
            <div className="w-full max-w-[1320px] flex flex-col gap-[24px] sm:gap-[36px] justify-start items-start">
              {/* 搜索和筛选控件 */}
              <div className="w-full flex flex-col sm:flex-row gap-[12px] sm:gap-[8px] justify-start items-start sm:items-center">
                {/* 第一行：搜索框 */}
                <div className="w-full sm:w-auto flex-1 sm:flex-initial">
                  <div className="search-container w-full sm:w-[400px] lg:w-[600px] h-[56px] flex gap-[10px] justify-start items-center px-[20px] py-[16px] bg-white border border-[rgba(0,0,0,0.3)] rounded-[100px]">
                    <SearchOutlined className="w-[24px] h-[24px] text-black flex-shrink-0" />
                    <Input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyPress={handleSearchKeyPress}
                      className="search-input border-0 shadow-none text-[16px] font-medium"
                      style={{ fontFamily: 'Plus Jakarta Sans' }}
                    />
                  </div>
                </div>

                {/* 第二行：筛选器 */}
                <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-[12px] sm:gap-[8px]">
                  {/* Source 勾选框 */}
                  <div
                    className={`business-filter w-full sm:w-[180px] lg:w-[240px] h-[56px] flex gap-[11px] justify-center items-center px-[20px] py-[16px] bg-white border border-[rgba(0,0,0,0.3)] rounded-[100px] cursor-pointer hover:bg-gray-50 ${sourceValue ? 'bg-[#f3f9fe] border-[#0087c7]' : ''}`}
                    onClick={() => setSourceValue(!sourceValue)}
                  >
                    {/* <CheckIcon className="w-[24px] h-[24px] flex-shrink-0" /> */}
                    <span className={`text-[14px] sm:text-[16px] font-medium whitespace-nowrap ${sourceValue ? 'text-[#0087c7]' : 'text-black opacity-80'}`} style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      <Translate id="connector.filter.source">
                        Source
                      </Translate>
                    </span>
                  </div>

                  {/* Target 勾选框 */}
                  <div
                    className={`business-filter w-full sm:w-[180px] lg:w-[233px] h-[56px] flex gap-[11px] justify-center items-center px-[20px] py-[16px] bg-white border border-[rgba(0,0,0,0.3)] rounded-[100px] cursor-pointer hover:bg-gray-50 ${targetValue ? 'bg-[#f3f9fe] border-[#0087c7]' : ''}`}
                    onClick={() => setTargetValue(!targetValue)}
                  >
                    {/* <CheckIcon className="w-[24px] h-[24px] flex-shrink-0" /> */}
                    <span className={`text-[14px] sm:text-[16px] font-medium whitespace-nowrap ${targetValue ? 'text-[#0087c7]' : 'text-black opacity-80'}`} style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      <Translate id="connector.filter.target">
                        Target
                      </Translate>
                    </span>
                  </div>

                  {/* Business ONLY 筛选 - 只在 clougence 品牌下显示 */}
                  {siteBrand === 'clougence' && (
                    <div
                      className={`business-filter w-full sm:w-[160px] lg:w-[200px] h-[56px] flex gap-[11px] justify-center items-center px-[20px] py-[16px] bg-white border border-[rgba(0,0,0,0.3)] rounded-[100px] cursor-pointer hover:bg-gray-50 ${businessOnly ? 'bg-[#f3f9fe] border-[#0087c7]' : ''}`}
                      onClick={() => setBusinessOnly(!businessOnly)}
                    >
                      <CheckIcon className="w-[24px] h-[24px] flex-shrink-0" />
                      <span className={`text-[14px] sm:text-[16px] font-medium whitespace-nowrap ${businessOnly ? 'text-[#0087c7]' : 'text-black opacity-80'}`} style={{ fontFamily: 'Plus Jakarta Sans' }}>
                        <Translate id="connector.filter.businessOnly">
                          Business ONLY
                        </Translate>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 筛选标签 */}
              {activeFilters.length > 0 && (
                <div className="w-full flex gap-[16px] justify-start items-start flex-wrap">
                  {activeFilters.map((filter) => (
                    <div
                      key={filter}
                      className="filter-tag flex gap-[10px] justify-start items-center px-[20px] py-[11px] bg-[#f3f9fe] rounded-[8888px]"
                    >
                      <span className="text-[16px] font-medium text-black" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                        {filter}
                      </span>
                      <CloseOutlined
                        className="w-[16px] h-[16px] text-black cursor-pointer"
                        onClick={() => handleRemoveFilter(filter)}
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleClearAllFilters}
                    className="clear-filters text-[16px] font-medium text-black hover:text-gray-600 cursor-pointer py-[11px]"
                    style={{ fontFamily: 'Plus Jakarta Sans' }}
                  >
                    <Translate id="connector.filter.clearAll">
                      Clear all filters
                    </Translate>
                  </button>
                </div>
              )}
            </div>
          </div>
        </FadeInSection>

        {/* 数据源卡片组件 */}
        <FadeInSection>
          <DataSourceCards
            searchFilter={searchFilter}
            sourceFilter={sourceValue}
            targetFilter={targetValue}
            businessOnlyFilter={businessOnly}
          />
        </FadeInSection>
      </div>
      <Footer />
    </Layout>
  );
}
