import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import siteConfig from '@generated/docusaurus.config';
import Pagination from './Pagination';
import { getConnectors } from '@site/src/data/connectors';

interface DataSourceCardProps {
  slug: string;
  name: string;
  icon: string;
  description: string;
  descriptionI18nKey?: string;
  isBusinessOnly?: boolean;
  supportsSource?: boolean;
  supportsTarget?: boolean;
}

const DataSourceCard: React.FC<DataSourceCardProps> = ({ 
  slug,
  name, 
  icon, 
  description, 
  descriptionI18nKey,
  isBusinessOnly = false,
  supportsSource = false,
  supportsTarget = false
}) => {
  return (
    <Link
      to={`/connector/${slug}/`}
      className="w-[429px] h-[386px] bg-white rounded-[20px] border border-gray-200 p-8 flex flex-col gap-8 justify-start items-start relative box-border hover:bg-gradient-to-b hover:from-[#EAF7FF] hover:to-white hover:border-[#8DC6F1] hover:shadow-[0_6px_13px_0_rgba(0,135,199,0.1),0_23px_23px_0_rgba(0,135,199,0.09),0_53px_32px_0_rgba(0,135,199,0.05),0_94px_37px_0_rgba(0,135,199,0.01)] transition-all duration-300 no-underline hover:no-underline"
      style={{ borderStyle: 'solid', borderWidth: '1px' }}
    >
      {/* 顶部区域：图标和标签 */}
      <div className="w-full flex justify-between items-start">
        {/* 图标区域 - 白色背景，有阴影 */}
        <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center box-border shadow-[0_5px_10px_0_rgba(0,0,0,0.07)] p-4" style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'rgba(0,0,0,0.08)' }}>
          <svg className="icon-v2 w-8 h-8" aria-hidden="true">
            <use href={`#icon-v2-${icon}`} xlinkHref={`#icon-v2-${icon}`} />
          </svg>
        </div>
        
        {/* Business ONLY 标签 - 包含在卡片内 */}
        {isBusinessOnly && (
          <div className="bg-[#E6F3FF] rounded-full px-3 py-1 box-border">
            <span className="text-[#0087C7] text-xs font-medium">Business ONLY</span>
          </div>
        )}
      </div>
      
      {/* 标题 - 24px 字体，粗体 */}
      <h2 className="text-2xl font-bold text-black leading-8 m-0" translate="no">{name}</h2>
      
      {/* 描述文本 - 16px 字体，80% 透明度，固定四行高度 */}
      <p className="text-base text-black opacity-80 leading-6 font-medium flex-1 m-0 min-h-[96px] flex items-start">
        <Translate id={descriptionI18nKey ?? `connector.datasource.${icon.toLowerCase()}.description`}>
          {description}
        </Translate>
      </p>
      
      {/* 按钮区域 - 根据配置显示 Source/Target 按钮 */}
      <div className="flex gap-3 w-full">
        {supportsSource && (
          <span className="w-1/2 h-9 bg-white border border-[#0087C7] rounded-full px-5 py-2 flex items-center justify-center box-border outline-none" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
            <span className="text-[#0087C7] text-sm font-bold">
              <Translate id="connector.filter.source">Source</Translate>
            </span>
          </span>
        )}
        {supportsTarget && (
          <span className="w-1/2 h-9 bg-white border border-[#0087C7] rounded-full px-5 py-2 flex items-center justify-center box-border outline-none" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
            <span className="text-[#0087C7] text-sm font-bold">
              <Translate id="connector.filter.target">Target</Translate>
            </span>
          </span>
        )}
      </div>
    </Link>
  );
};

interface DataSourceCardsProps {
  searchFilter?: string;
  sourceFilter?: boolean;
  targetFilter?: boolean;
  businessOnlyFilter?: boolean;
}

const DataSourceCards: React.FC<DataSourceCardsProps> = ({ 
  searchFilter = '', 
  sourceFilter = false, 
  targetFilter = false, 
  businessOnlyFilter = false 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 固定每页显示9个数据源
  const siteBrand = siteConfig.customFields?.siteBrand as string;

  const dataSources = getConnectors(siteBrand);


  // 筛选数据源
  const filteredDataSources = dataSources.filter(source => {
    // 搜索筛选
    if (searchFilter && !source.name.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    
    // Source 筛选
    if (sourceFilter && !source.supportsSource) {
      return false;
    }
    
    // Target 筛选
    if (targetFilter && !source.supportsTarget) {
      return false;
    }
    
    // Business Only 筛选
    if (businessOnlyFilter && !source.isBusinessOnly) {
      return false;
    }
    
    return true;
  });

  // 计算分页
  const totalPages = Math.ceil(filteredDataSources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDataSources = filteredDataSources.slice(startIndex, endIndex);

  // 当筛选条件改变时重置分页
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter, sourceFilter, targetFilter, businessOnlyFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full pt-12 pb-24 flex flex-col items-center gap-12 box-border">
      {/* 卡片区域 - 固定间距的flex布局 */}
      <div className="w-[1320px] max-w-full mx-auto flex gap-4 justify-start items-start flex-wrap box-border overflow-x-auto">
        {currentDataSources.map((source, index) => (
          <DataSourceCard
            key={startIndex + index}
            slug={source.slug}
            name={source.name}
            icon={source.icon}
            description={source.description}
            descriptionI18nKey={source.descriptionI18nKey}
            isBusinessOnly={source.isBusinessOnly}
            supportsSource={source.supportsSource}
            supportsTarget={source.supportsTarget}
          />
        ))}
      </div>
      
      {/* 分页组件 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default DataSourceCards; 
