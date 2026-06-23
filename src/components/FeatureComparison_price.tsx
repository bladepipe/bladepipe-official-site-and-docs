import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import CheckIcon from '@site/static/img/home/icon/check2.svg';
import CrossIcon from '@site/static/img/home/icon/check3.svg';
import siteConfig from '@generated/docusaurus.config';

// 版本配置
const getVersionConfig = (siteBrand: string) => {
  if (siteBrand === 'clouddm') {
    return [
      {
        id: 'community',
        title: translate({ id: 'pricing.clouddm.community.title', message: '社区版' }),
        titleStyle: 'text-[20px] font-bold text-[#0087c7]',
        headerStyle: 'bg-white border border-[#0087c7] rounded-[12px] flex items-center justify-center',
        badge: null
      },
      {
        id: 'enterprise',
        title: translate({ id: 'pricing.clouddm.enterprise.title', message: '商业版' }),
        titleStyle: 'text-[20px] font-bold text-white',
        headerStyle: 'bg-[#0087c7] border border-[#0087c7] rounded-[12px] flex items-center justify-center relative px-[20px]',
        badge: {
          text: translate({ id: 'pricing.featureComparison.mostPopular', message: 'Most popular' }),
          style: 'absolute top-[20px] right-[20px] bg-white border border-[#0087c7] rounded-full px-[12px] py-[4px]',
          textStyle: 'text-[14px] font-bold text-[#0087c7]'
        }
      }
    ];
  } else if (siteBrand === 'clougence' || siteBrand === 'bladepipe') {
    return [
      {
        id: 'community',
        title: translate({ id: 'pricing.community.title', message: 'Community' }),
        titleStyle: 'text-[20px] font-bold text-[#0087c7]',
        headerStyle: 'bg-white border border-[#0087c7] rounded-[12px] flex items-center justify-center',
        badge: null
      },
      {
        id: 'cloud',
        title: (
          <>
            <span>{translate({ id: 'pricing.cloud.title', message: 'Cloud' })}</span>
            <span className="hidden sm:inline">{translate({ id: 'pricing.cloud.subtitle', message: '' })}</span>
          </>
        ),
        titleStyle: 'text-[20px] font-bold text-[#0087c7]',
        headerStyle: 'bg-white border border-[#0087c7] rounded-[12px] flex items-center justify-center',
        badge: null
      },
      {
        id: 'enterprise',
        title: translate({ id: 'pricing.featureComparison.enterpriseTitle', message: 'Enterprise' }),
        titleStyle: 'text-[20px] font-bold text-white',
        headerStyle: 'bg-[#0087c7] border border-[#0087c7] rounded-[12px] flex items-center justify-center relative px-[20px]',
        badge: {
          text: translate({ id: 'pricing.featureComparison.mostPopular', message: 'Most popular' }),
          style: 'absolute top-[20px] right-[20px] bg-white border border-[#0087c7] rounded-full px-[12px] py-[4px]',
          textStyle: 'text-[14px] font-bold text-[#0087c7]'
        }
      }
    ];
  } else {
    return [
      {
        id: 'cloud',
        title: (
          <>
            <span>{translate({ id: 'pricing.cloud.title', message: 'Cloud' })}</span>
            <span className="hidden sm:inline">{translate({ id: 'pricing.cloud.subtitle', message: '(SaaS Managed & BYOC)' })}</span>
          </>
        ),
        titleStyle: 'text-[20px] font-bold text-[#0087c7]',
        headerStyle: 'bg-white border border-[#0087c7] rounded-[12px] flex items-center justify-center',
        badge: null
      },
      {
        id: 'enterprise',
        title: translate({ id: 'pricing.featureComparison.enterpriseTitle', message: 'Enterprise' }),
        titleStyle: 'text-[20px] font-bold text-white',
        headerStyle: 'bg-[#0087c7] border border-[#0087c7] rounded-[12px] flex items-center justify-center relative px-[20px]',
        badge: {
          text: translate({ id: 'pricing.featureComparison.mostPopular', message: 'Most popular' }),
          style: 'absolute top-[20px] right-[20px] bg-white border border-[#0087c7] rounded-full px-[12px] py-[4px]',
          textStyle: 'text-[14px] font-bold text-[#0087c7]'
        }
      }
    ];
  }
};

// 功能对比数据
const getFeatureData = (siteBrand: string) => {
  if (siteBrand === 'clouddm') {
    return [
      {
        category: "功能",
        features: [
          {
            name: "数据源种类",
            community: "16",
            enterprise: "16"
          },
          {
            name: "数据库访问",
            community: "✓",
            enterprise: "✓"
          },
          {
            name: "数据库 CI/CD",
            community: "✓",
            enterprise: "✓"
          },
          {
            name: "数据脱敏",
            community: "✓",
            enterprise: "✓"
          },
          {
            name: "工单流程",
            community: "✓",
            enterprise: "✓"
          },
          {
            name: "SQL 规范",
            community: "✓",
            enterprise: "✓"
          }
        ]
      },
      {
        category: "资源",
        features: [
          {
            name: "数据源实例",
            community: "10",
            enterprise: "不限"
          },
          {
            name: "账号数量",
            community: "5",
            enterprise: "不限"
          }
        ]
      },
      {
        category: "支持与可靠性",
        features: [
          {
            name: "SLA 级别和支持",
            community: "社区",
            enterprise: "企业级"
          },
          {
            name: "专家级别 (最高)",
            community: "工程师",
            enterprise: "架构师"
          },
          {
            name: "修复或功能优先级",
            community: "中等",
            enterprise: "高"
          },
          {
            name: "定制化",
            community: "✗",
            enterprise: "根据合同"
          }
        ]
      }
    ];
  } else if (siteBrand === 'clougence' || siteBrand === 'bladepipe') {
    return [
      {
        category: translate({ id: 'pricing.featureComparison.resources', message: 'Resources' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.syncTaskCount', message: 'Sync Task Count' }),
            community: "5",
            cloud: "30",
            enterprise: translate({ id: 'pricing.featureComparison.contractOrderAgreement', message: 'Contract/Order Agreement' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.singleTaskTableLimit', message: 'Single Task Table Limit' }),
            community: "500",
            cloud: translate({ id: 'pricing.featureComparison.unlimited', message: 'Unlimited' }),
            enterprise: translate({ id: 'pricing.featureComparison.unlimited', message: 'Unlimited' })
          }
        ]
      },
      {
        category: translate({ id: 'pricing.featureComparison.dataIngestion', message: 'Data Ingestion' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.dataSourceAvailability', message: 'DataSource Availability' }),
            community: siteBrand === 'bladepipe' ? "60+" : "50+",
            cloud: "60+",
            enterprise: "60+"
          },
          {
            name: translate({ id: 'pricing.featureComparison.changeDataCapture', message: 'Change Data Capture (CDC)' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.latency', message: 'Latency' }),
            community: translate({ id: 'pricing.featureComparison.lessThan5Seconds', message: '< 5 seconds' }),
            cloud: translate({ id: 'pricing.featureComparison.lessThan5Seconds', message: '< 5 seconds' }),
            enterprise: translate({ id: 'pricing.featureComparison.lessThan5Seconds', message: '< 5 seconds' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.schemaMigration', message: 'Schema Migration' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.verificationCorrection', message: 'Verification and Correction' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.cronScheduling', message: 'Cron Scheduling' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.ddlSync', message: 'DDL Synchronization' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.bidirectionalSync', message: 'Bidirectional Sync' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.visualizedTransformation', message: 'Visualized Data Transformation' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.visualizedWideTable', message: 'Visualized Wide Table' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.parallelJobs', message: 'Parallel DataJobs' }),
            community: "✗",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.metadataLineageQuery', message: 'Metadata (Lineage) Query' }),
            community: "✗",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.systemMigration', message: 'System Migration' }),
            community: "✗",
            cloud: "✓",
            enterprise: "✓"
          }
        ]
      },
      {
        category: translate({ id: 'pricing.featureComparison.extensibleAccess', message: 'Extensible Access' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.openApi', message: 'Open API' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.customCode', message: 'Custom Code' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          }
        ]
      },
      {
        category: translate({ id: 'pricing.featureComparison.security', message: 'Security' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.monitoringIntegrations', message: 'Monitoring Integrations' }),
            community: "✓",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.emailWebhookAlerting', message: 'Email & Webhook Alerting' }),
            community: "✗",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.multitenancy', message: 'Multitenancy (Multiple Users)' }),
            community: translate({ id: 'pricing.featureComparison.oneUser', message: 'One user' }),
            cloud: translate({ id: 'pricing.featureComparison.oneUser', message: 'One user' }),
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.roleBasedAccess', message: 'Role-Based Access Control' }),
            community: "✗",
            cloud: "✗",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.singleSignOn', message: 'Single Sign-On (SSO)' }),
            community: translate({ id: 'pricing.featureComparison.passwordLdapAdMore', message: 'PASSWORD / LDAP / AD / more' }),
            cloud: translate({ id: 'pricing.featureComparison.wechatDingtalkSso', message: 'Google / PASSWORD' }),
            enterprise: translate({ id: 'pricing.featureComparison.passwordLdapAdMore', message: 'PASSWORD / LDAP / AD / more' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.mfaLogin', message: 'MFA Login Verification' }),
            community: "✗",
            cloud: "✗",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.auditLogging', message: 'Audit Logging' }),
            community: "✗",
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.taskHighAvailability', message: 'Task High Availability' }),
            community: "✗",
            cloud: "✓",
            enterprise: "✓"
          }
        ]
      },
      {
        category: translate({ id: 'pricing.featureComparison.supportReliability', message: 'Support & Reliability' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.slaLevel', message: 'SLA Level and Support' }),
            community: translate({ id: 'pricing.featureComparison.community', message: 'Community' }),
            cloud: translate({ id: 'pricing.featureComparison.cloud', message: 'Cloud' }),
            enterprise: translate({ id: 'pricing.featureComparison.enterprise', message: 'Enterprise' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.expertLevel', message: 'Expert Level (Max.)' }),
            community: translate({ id: 'pricing.featureComparison.engineer', message: 'Engineer' }),
            cloud: translate({ id: 'pricing.featureComparison.engineer', message: 'Engineer' }),
            enterprise: translate({ id: 'pricing.featureComparison.architect', message: 'Architect' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.fixFeaturePriority', message: 'Fix or Feature Prioritization' }),
            community: translate({ id: 'pricing.featureComparison.low', message: 'Low' }),
            cloud: translate({ id: 'pricing.featureComparison.middle', message: 'Middle' }),
            enterprise: translate({ id: 'pricing.featureComparison.high', message: 'High' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.customization', message: 'Customization' }),
            community: "✗",
            cloud: "✗",
            enterprise: translate({ id: 'pricing.featureComparison.accordingToContract', message: 'According to the contract' })
          }
        ]
      }
    ];
  } else {
    return [
      {
        category: translate({ id: 'pricing.featureComparison.dataIngestion', message: 'Data Ingestion' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.dataSourceAvailability', message: 'DataSource Availability' }),
            cloud: "60+",
            enterprise: "60+"
          },
          {
            name: translate({ id: 'pricing.featureComparison.changeDataCapture', message: 'Change Data Capture (CDC)' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.latency', message: 'Latency' }),
            cloud: translate({ id: 'pricing.featureComparison.lessThan5Seconds', message: '< 5 seconds' }),
            enterprise: translate({ id: 'pricing.featureComparison.lessThan5Seconds', message: '< 5 seconds' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.schemaMigration', message: 'Schema Migration' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.verificationCorrection', message: 'Verification and Correction' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.cronScheduling', message: 'Cron Scheduling' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.ddlSync', message: 'DDL Synchronization' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.visualizedTransformation', message: 'Visualized Data Transformation' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.parallelJobs', message: 'Parallel DataJobs' }),
            cloud: "✓",
            enterprise: "✓"
          }
        ]
      },
      {
        category: translate({ id: 'pricing.featureComparison.extensibleAccess', message: 'Extensible Access' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.openApi', message: 'Open API' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.customCode', message: 'Custom Code' }),
            cloud: "✓",
            enterprise: "✓"
          }
        ]
      },
      {
        category: translate({ id: 'pricing.featureComparison.dataGovernance', message: 'Data Governance' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.monitoringIntegrations', message: 'Monitoring Integrations' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.multitenancy', message: 'Multitenancy (Multiple Users)' }),
            cloud: translate({ id: 'pricing.featureComparison.oneUser', message: 'One user' }),
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.roleBasedAccess', message: 'Role-Based Access Control' }),
            cloud: "✓",
            enterprise: "✓"
          },
          {
            name: translate({ id: 'pricing.featureComparison.singleSignOn', message: 'Single Sign-On (SSO)' }),
            cloud: translate({ id: 'pricing.featureComparison.googleSso', message: 'Google SSO' }),
            enterprise: translate({ id: 'pricing.featureComparison.passwordLdapAdMore', message: 'PASSWORD / LDAP / AD / more' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.auditLogging', message: 'Audit Logging' }),
            cloud: "✗",
            enterprise: "✓"
          }
        ]
      },
      {
        category: translate({ id: 'pricing.featureComparison.supportReliability', message: 'Support & Reliability' }),
        features: [
          {
            name: translate({ id: 'pricing.featureComparison.slaLevel', message: 'SLA Level and Support' }),
            cloud: translate({ id: 'pricing.featureComparison.cloud', message: 'Cloud' }),
            enterprise: translate({ id: 'pricing.featureComparison.enterprise', message: 'Enterprise' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.expertLevel', message: 'Expert Level (Max.)' }),
            cloud: translate({ id: 'pricing.featureComparison.engineer', message: 'Engineer' }),
            enterprise: translate({ id: 'pricing.featureComparison.architect', message: 'Architect' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.fixFeaturePriority', message: 'Fix or Feature Prioritization' }),
            cloud: translate({ id: 'pricing.featureComparison.middle', message: 'Middle' }),
            enterprise: translate({ id: 'pricing.featureComparison.high', message: 'High' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.customization', message: 'Customization' }),
            cloud: "✗",
            enterprise: translate({ id: 'pricing.featureComparison.accordingToContract', message: 'According to the contract' })
          },
          {
            name: translate({ id: 'pricing.featureComparison.emailWebhookAlerting', message: 'Email & Webhook Alerting' }),
            cloud: "✓",
            enterprise: "✓"
          }
        ]
      }
    ];
  }
};

const FeatureComparison_price: React.FC = () => {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const versionConfig = getVersionConfig(siteBrand);
  const featureData = getFeatureData(siteBrand);

  return (
    <div className="w-full bg-white py-[40px] sm:py-[60px] lg:py-[80px] px-4 sm:px-8">
      <div className="w-full max-w-[1320px] mx-auto">
        {/* 标题和描述 */}
        {siteBrand !== 'clouddm' && (
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-black leading-[40px] sm:leading-[50px] lg:leading-[60px] text-center mb-3">
              <Translate id="pricing.featureComparison.mainTitle">Compare Community vs Cloud vs Enterprise Plans</Translate>
            </h2>
          </div>
        )}
        {/* 功能对比表格 - 响应式设计 */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            {/* 表头 */}
            <div className="w-full h-[60px] sm:h-[66px] lg:h-[72px] flex">
              {/* 功能列标题 */}
              <div className="w-[300px] sm:w-[350px] lg:w-[400px] h-[60px] sm:h-[66px] lg:h-[72px] flex items-center px-[16px] sm:px-[20px] lg:px-[24px]">
                <span className="text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-black">
                  <Translate id="pricing.featureComparison.title">Features</Translate>
                </span>
              </div>
              
              {/* 版本列标题 */}
              <div className="flex-1 h-[60px] sm:h-[66px] lg:h-[72px] flex gap-[20px] sm:gap-[26px] lg:gap-[32px]">
                {versionConfig.map((version) => (
                  <div key={version.id} className="flex-1 h-[60px] sm:h-[66px] lg:h-[72px] flex items-center justify-center">
                    <div className={`w-full h-[60px] sm:h-[66px] lg:h-[72px] ${version.headerStyle}`} style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                      <span translate="no" className={`text-[16px] sm:text-[18px] lg:text-[20px] font-bold ${version.id === 'enterprise' ? 'text-white' : 'text-[#0087c7]'}`}>{version.title}</span>
                      {version.badge && (
                        <div className="absolute top-[6px] sm:top-[8px] lg:top-[2px] right-[-10px] sm:right-[8px] lg:right-[10px] bg-white border border-[#0087c7] rounded-full px-[6px] sm:px-[8px] py-[1px] sm:py-[2px] whitespace-nowrap" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                          <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-bold text-[#0087c7]">{version.badge.text}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 表格内容 */}
            <div className="w-full">
              {featureData.map((category, categoryIndex) => (
                <div key={categoryIndex} className="w-full">
                  {/* 类别标题行 */}
                  <div className="w-full pt-[32px] sm:pt-[40px] lg:pt-[48px] pb-[16px] sm:pb-[20px] lg:pb-[24px] flex">
                    <div className="w-[300px] sm:w-[350px] lg:w-[400px] flex items-center px-[16px] sm:px-[20px] lg:px-[24px]">
                      <span className="text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-black">{category.category}</span>
                    </div>
                    <div className="flex-1 flex gap-[20px] sm:gap-[26px] lg:gap-[32px]">
                      {versionConfig.map((version) => (
                        <div key={version.id} className="flex-1"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 功能项 */}
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="w-full h-[60px] sm:h-[68px] lg:h-[76px] flex border-b border-black border-opacity-10" style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
                      {/* 功能名称 */}
                      <div className="w-[300px] sm:w-[350px] lg:w-[400px] h-[60px] sm:h-[68px] lg:h-[76px] flex items-center px-[16px] sm:px-[20px] lg:px-[24px]">
                        <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-black">{feature.name}</span>
                      </div>
                      
                      {/* 版本对比 */}
                      <div className="flex-1 h-[60px] sm:h-[68px] lg:h-[76px] flex gap-[20px] sm:gap-[26px] lg:gap-[32px]">
                        {versionConfig.map((version) => {
                          const value = feature[version.id];
                          const isEnterprise = version.id === 'enterprise';
                          return (
                            <div key={version.id} className="flex-1 h-[60px] sm:h-[68px] lg:h-[76px] flex items-center justify-center">
                              {value === '✓' ? (
                                <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                              ) : value === '✗' ? (
                                <CrossIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                              ) : (
                                <span translate="no" className={`text-[14px] sm:text-[15px] lg:text-[16px] font-bold ${isEnterprise ? 'text-[#0087c7]' : 'text-black'} text-center`}>
                                  {value}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison_price;
