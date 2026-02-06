import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AirbyteIcon from '@site/static/img/why/airbyte.svg';
import FivetranIcon from '@site/static/img/why/fivetran.svg';
import BladePipeIcon from '@site/static/img/why/bladepipe.svg';
import CloudCanalIcon from '@site/static/img/home/CloudCanal_white.svg';
import CheckIcon from '@site/static/img/home/icon/check.svg';
import Check2Icon from '@site/static/img/home/icon/check2.svg';

// 获取评级图标
const getRatingIcon = (rating: string, isHighlighted: boolean) => {
  // 检查是否为 "优秀" 或 "Excellent"（支持中英文）
  if (rating === '优秀' || rating === 'Excellent') {
    return isHighlighted ? 
      <Check2Icon className="w-5 h-5" /> : 
      <CheckIcon className="w-[24px] h-[24px]" />;
  }
  return <div className={`w-5 h-5 rounded-full border ${isHighlighted ? 'border-white/20' : 'border-black/20'} border-solid`}></div>;
};

const ScenarioComparison: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  
  // 根据 siteBrand 动态设置品牌名称
  const brandName = siteBrand === 'clougence' ? 'CloudCanal' : 'BladePipe';
  
  // 场景对比数据
  const scenarioData = [
    {
      scenario: translate({id: 'compare.scenario.relationalDatabases', message: 'Data Sync Between Relational Databases'}),
      bladePipe: translate({id: 'compare.rating.excellent', message: 'Excellent'}),
      airbyte: translate({id: 'compare.rating.average', message: 'Average'}), 
      fivetran: translate({id: 'compare.rating.average', message: 'Average'})
    },
    {
      scenario: translate({id: 'compare.scenario.onlineBusinessDatabases', message: 'Data Sync Between Online Business Databases (Rdb,Datawarehouse,MQ,Cache,Search)'}),
      bladePipe: translate({id: 'compare.rating.excellent', message: 'Excellent'}),
      airbyte: translate({id: 'compare.rating.average', message: 'Average'}),
      fivetran: translate({id: 'compare.rating.average', message: 'Average'})
    },
    {
      scenario: translate({id: 'compare.scenario.dataLakehouse', message: 'Data Lakehouse Support'}),
      bladePipe: translate({id: 'compare.rating.average', message: 'Average'}),
      airbyte: translate({id: 'compare.rating.excellent', message: 'Excellent'}),
      fivetran: translate({id: 'compare.rating.average', message: 'Average'})
    },
    {
      scenario: translate({id: 'compare.scenario.saasSources', message: 'SaaS Sources Support'}),
      bladePipe: translate({id: 'compare.rating.average', message: 'Average'}),
      airbyte: translate({id: 'compare.rating.average', message: 'Average'}),
      fivetran: translate({id: 'compare.rating.excellent', message: 'Excellent'})
    },
    {
      scenario: translate({id: 'compare.scenario.multiCloud', message: 'Multi-cloud Data Sync'}),
      bladePipe: translate({id: 'compare.rating.excellent', message: 'Excellent'}),
      airbyte: translate({id: 'compare.rating.average', message: 'Average'}),
      fivetran: translate({id: 'compare.rating.average', message: 'Average'})
    }
  ];

  // 产品列配置
  const productColumns = [
    {
      id: 'bladePipe',
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
    <section className="w-full py-24 flex flex-col items-center bg-white">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center gap-12">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h2 className="text-[40px] font-bold text-black leading-[50px] font-['Plus_Jakarta_Sans'] mb-3">
            <Translate id="compare.scenarios.title">Critical Data Sync Scenarios</Translate>
          </h2>
          <p className="text-[16px] text-[#666]">
            <Translate id="compare.scenarios.description">Scenario Comparison: BladePipe vs. Airbyte vs. Fivetran</Translate>
          </p>
        </div>

        {/* 对比表格 */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* 标题行 */}
            <div className="w-full flex gap-5">
                          {/* Scenarios 标题 */}
            <div className="w-[400px] bg-white rounded-t-xl">
              <div className="py-8 bg-[#F5F9FF] rounded-t-xl flex items-center justify-center">
                <span className="text-[20px] font-bold text-black font-['Plus_Jakarta_Sans'] leading-[30px]">
                  Scenarios
                </span>
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
              {scenarioData.map((item, index) => (
                <div key={index}>
                  {/* 内容行 */}
                  <div className="w-full flex gap-5 items-stretch">
                    {/* Scenario 列 */}
                    <div className="w-[400px]">
                      <div 
                        className="bg-white py-6 px-6 flex items-center h-full"
                        style={{
                          borderTopLeftRadius: index === 0 ? '0' : '0', 
                          borderTopRightRadius: index === 0 ? '0' : '0', 
                          borderBottomLeftRadius: index === scenarioData.length - 1 ? '12px' : '0', 
                          borderBottomRightRadius: index === scenarioData.length - 1 ? '12px' : '0'
                        }}
                      >
                        <span className="text-[16px] font-bold text-black font-['Plus_Jakarta_Sans'] leading-[24px]">
                          {item.scenario}
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
                            borderBottomLeftRadius: index === scenarioData.length - 1 ? '12px' : '0',
                            borderBottomRightRadius: index === scenarioData.length - 1 ? '12px' : '0'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            {getRatingIcon(item[column.id as keyof typeof item], column.isHighlighted)}
                            <span className={`text-[16px] ${column.isHighlighted ? 'font-bold' : 'font-medium'} ${column.textColor} font-['Plus_Jakarta_Sans'] leading-[24px]`}>
                              {item[column.id as keyof typeof item]}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 分割线行 */}
                  {index < scenarioData.length - 1 && (
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
            
            {/* 分割线 - 与表格对齐 */}
            <div className="w-full mt-12">
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

export default ScenarioComparison; 