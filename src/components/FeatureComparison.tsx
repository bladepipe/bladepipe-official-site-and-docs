import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AirbyteIcon from '@site/static/img/why/airbyte.svg';
import FivetranIcon from '@site/static/img/why/fivetran.svg';
import BladePipeIcon from '@site/static/img/why/bladepipe.svg';
import CloudCanalIcon from '@site/static/img/home/CloudCanal_white.svg';

const FeatureComparison: React.FC = () => {
    const { siteConfig } = useDocusaurusContext();
    const siteBrand = siteConfig.customFields?.siteBrand;
    
    // 根据 siteBrand 动态设置品牌名称
    const brandName = siteBrand === 'clougence' ? 'CloudCanal' : 'BladePipe';
    
    // 功能对比数据
    const featureData = [
        {
        feature: translate({id: 'compare.feature.syncMode', message: 'Sync Mode'}),
        eladePipe: translate({id: 'compare.feature.syncMode.cdcFirst', message: 'CDC-first / ETL'}),
        airbyte: translate({id: 'compare.feature.syncMode.eltFirst', message: 'ELT-first'}),
        fivetran: translate({id: 'compare.feature.syncMode.hybrid', message: 'ELT/ETL hybrid'})
      },
      {
        feature: translate({id: 'compare.feature.sourceDataFetch', message: 'Source Data Fetch'}),
        eladePipe: translate({id: 'compare.feature.sourceDataFetch.hybrid', message: 'Pull and Push hybrid'}),
        airbyte: translate({id: 'compare.feature.sourceDataFetch.pullBased', message: 'Pull-based'}),
        fivetran: translate({id: 'compare.feature.sourceDataFetch.pullBased', message: 'Pull-based'})
      },
      {
        feature: translate({id: 'compare.feature.connectors', message: 'Connectors'}),
        eladePipe: translate({id: siteBrand === 'clougence' ? 'compare.feature.connectors.cloudcanal' : 'compare.feature.connectors.bladepipe', message: '60+ (enterprise-grade)'}),
        airbyte: translate({id: 'compare.feature.connectors.airbyte', message: '300+(community and managed)'}),
        fivetran: translate({id: 'compare.feature.connectors.fivetran', message: '~200+(enterprise-grade)'})
      },
      {
        feature: translate({id: 'compare.feature.extensibility', message: 'Extensibility'}),
        eladePipe: translate({id: siteBrand === 'clougence' ? 'compare.feature.extensibility.cloudcanal' : 'compare.feature.extensibility.bladepipe', message: 'Middle - Uploading business code for data transformation'}),
        airbyte: translate({id: 'compare.feature.extensibility.airbyte', message: 'High - Building new connectors using CDK'}),
        fivetran: translate({id: 'compare.feature.extensibility.fivetran', message: 'Low - closed ecosystem'})
      },
      {
        feature: translate({id: 'compare.feature.schemaChange', message: 'Schema Change'}),
        eladePipe: translate({id: 'compare.feature.schemaChange.strong', message: 'Strong support'}),
        airbyte: translate({id: 'compare.feature.schemaChange.limited', message: 'Limited'}),
        fivetran: translate({id: 'compare.feature.schemaChange.strong', message: 'Strong support'})
      },
      {
        feature: translate({id: 'compare.feature.openSource', message: 'Open Source'}),
        eladePipe: translate({id: 'compare.feature.openSource.no', message: 'No'}),
        airbyte: translate({id: 'compare.feature.openSource.yes', message: 'Yes'}),
        fivetran: translate({id: 'compare.feature.openSource.no', message: 'No'})
      },
      {
        feature: translate({id: 'compare.feature.deployment', message: 'Deployment'}),
        eladePipe: translate({id: siteBrand === 'clougence' ? 'compare.feature.deployment.cloudcanal' : 'compare.feature.deployment.bladepipe', message: 'Cloud(BYOC) / Self-hosted'}),
        airbyte: translate({id: 'compare.feature.deployment.airbyte', message: 'Self-hosted(OSS) / Cloud (Managed)'}),
        fivetran: translate({id: 'compare.feature.deployment.fivetran', message: 'Cloud (Managed)'})
      },
      {
        feature: translate({id: 'compare.feature.customerSupport', message: 'Customer Support'}),
        eladePipe: translate({id: siteBrand === 'clougence' ? 'compare.feature.customerSupport.cloudcanal' : 'compare.feature.customerSupport.bladepipe', message: 'Enterprise support'}),
        airbyte: translate({id: 'compare.feature.customerSupport.airbyte', message: 'Community (free) and Enterprise support'}),
        fivetran: translate({id: 'compare.feature.customerSupport.fivetran', message: 'Tiered support(Starter,Premium, Enterprise)'})
      }
    ];

    // 产品列配置
    const productColumns = [
      {
        id: 'eladePipe',
        name: siteBrand === 'clougence' ? 'CloudCanal' : 'BladePipe',
        icon: {
          component: siteBrand === 'clougence' ? CloudCanalIcon : BladePipeIcon
        },
        isHighlighted: true,
        bgColor: 'bg-[#0087c7]',
        textColor: 'text-white',
        borderColor: 'border-white/20',
        boxShadow: `
          0px 9px 19px rgba(0, 135, 199, 0.1),
          0px 35px 35px rgba(0, 135, 199, 0.09),
          0px 78px 47px rgba(0, 135, 199, 0.05),
          0px 139px 56px rgba(0, 135, 199, 0.01),
          0px 218px 61px rgba(0, 135, 199, 0)
        `
      },
      {
        id: 'airbyte',
        name: 'Airbyte',
        subtitle: '(Enterprise)',
        icon: {
          component: AirbyteIcon
        },
        isHighlighted: false,
        bgColor: 'bg-[#F5F9FF]',
        textColor: 'text-black/60',
        borderColor: 'border-black/10'
      },
      {
        id: 'fivetran',
        name: 'Fivetran',
        subtitle: '(Business Critical)',
        icon: {
          component: FivetranIcon
        },
        isHighlighted: false,
        bgColor: 'bg-[#F5F9FF]',
        textColor: 'text-black/60',
        borderColor: 'border-black/10'
      }
    ];
    return (
    <section className="w-full py-16 flex flex-col items-center bg-white">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8">
                {/* 对比表格 */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1200px]">
          {/* 标题行 */}
          <div className="w-full flex gap-5">
            {/* Feature 标题 */}
            <div className="w-[400px] bg-white rounded-t-xl">
              <div className="py-8 bg-[#F5F9FF] rounded-t-xl flex items-center justify-center">
                <h3 className="text-[20px] font-bold text-black font-['Plus_Jakarta_Sans'] leading-[30px]">
                  <Translate id="compare.feature.title">Feature</Translate>
                </h3>
              </div>
            </div>

            {/* 产品标题 */}
            {productColumns.map((column) => (
              <div 
                key={column.id}
                className={`w-[260px] ${column.bgColor} rounded-t-xl`}
                style={column.boxShadow ? { boxShadow: column.boxShadow } : {}}
              >
                <div className="py-8 flex items-center justify-center">
                  <column.icon.component className="h-8" />
                </div>
              </div>
            ))}
          </div>

          {/* 内容表格 - 行对齐布局 */}
          <div className="w-full">
            {featureData.map((item, index) => (
              <div key={index}>
                {/* 内容行 */}
                <div className="w-full flex gap-5 items-stretch">
                  {/* Feature 列 */}
                  <div className="w-[400px]">
                    <div 
                      className="bg-white py-6 px-6 flex items-center h-full"
                      style={{
                        borderTopLeftRadius: index === 0 ? '0' : '0', 
                        borderTopRightRadius: index === 0 ? '0' : '0', 
                        borderBottomLeftRadius: index === featureData.length - 1 ? '12px' : '0', 
                        borderBottomRightRadius: index === featureData.length - 1 ? '12px' : '0'
                      }}
                    >
                      <span className="text-[16px] font-bold text-black font-['Plus_Jakarta_Sans'] leading-[24px]">
                        {item.feature}
                      </span>
                    </div>
                  </div>

                  {/* 产品列 */}
                  {productColumns.map((column) => (
                    <div key={column.id} className="w-[260px]">
                      <div 
                        className={`${column.bgColor} py-6 px-6 flex items-center h-full`}
                        style={{
                          ...(column.boxShadow ? { boxShadow: column.boxShadow } : {}),
                          borderTopLeftRadius: '0',
                          borderTopRightRadius: '0',
                          borderBottomLeftRadius: index === featureData.length - 1 ? '12px' : '0',
                          borderBottomRightRadius: index === featureData.length - 1 ? '12px' : '0'
                        }}
                      >
                        <span className={`text-[16px] ${column.isHighlighted ? 'font-bold' : 'font-medium'} ${column.textColor} font-['Plus_Jakarta_Sans'] leading-[24px]`}>
                          {item[column.id as keyof typeof item]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 分割线行 */}
                {index < featureData.length - 1 && (
                  <div className="w-full flex gap-5">
                    <div className="w-[400px]">
                      <div className="bg-white">
                        <div className="border-t border-black/10 border-solid border-0 border-l-0 border-r-0 border-b-0"></div>
                      </div>
                    </div>
                    {productColumns.map((column) => (
                      <div key={column.id} className="w-[260px]">
                        <div className={column.bgColor} style={column.boxShadow ? { boxShadow: column.boxShadow } : {}}>
                          <div className={`border-t ${column.borderColor} border-solid border-0 border-l-0 border-r-0 border-b-0`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

            <div className="w-full min-w-0 mt-20 mb-16">
                <div className="text-[14px] text-[#26272B] font-medium leading-[20px] font-['Plus_Jakarta_Sans']">
                    <Translate id="compare.note.feature">*: for most popular relational databases, data werehouses, search engines, caches and message queues</Translate>
                </div>
            </div>
            
            {/* 分割线 - 与表格对齐 */}
            <div className="w-full">
              <div className="w-full flex gap-5">
                <div className="w-[400px] min-w-0">
                  <div className="border-t border-black/10 border-solid border-0 border-l-0 border-r-0 border-b-0"></div>
                </div>
                {productColumns.map((column) => (
                  <div key={column.id} className="w-[260px] min-w-0">
                    <div className="border-t border-black/10 border-solid border-0 border-l-0 border-r-0 border-b-0"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default FeatureComparison;