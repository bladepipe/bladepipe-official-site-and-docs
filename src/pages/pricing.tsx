import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Translate, { translate } from '@docusaurus/Translate';
import FeatureComparison_price from '@site/src/components/FeatureComparison_price';
import ArrowIcon from '@site/static/img/home/icon/arrow.svg';
import PriceCalculator from '@site/src/components/PriceCalculator';
import FAQ from '@site/src/components/FAQ';
import Footer from '@site/src/components/Footer';
import FadeInSection from '@site/src/components/FadeInSection';
import { getCloudUrl } from '@site/src/utils/api';
import { loginCheckAndRedirect } from '@site/src/utils';
import { isUserLogin } from '@site/src/store/user';
import { listDownloadProduct, queryPriceMeta } from '@site/src/apis/constant';
import DownloadModal from '@site/src/components/DownloadModal';
import siteConfig from '@generated/docusaurus.config';
import { getPageMeta } from '@site/src/utils/meta';

// 计算云服务价格
const calculateCloudPrice = (priceMeta?: any, siteBrand?: string) => {
  if (priceMeta?.payAsYouGoPriceVO?.pricePerRow?.FULL) {
    const price = Math.ceil(parseFloat(priceMeta.payAsYouGoPriceVO.pricePerRow.FULL) * 10000 * 100) / 100;
    return siteBrand === 'clougence' ? price.toString() : `$${price.toString()}`;
  }
  return siteBrand === 'clougence' ? '0.01' : '$0.01';
};

// 获取云服务价格单位
const getCloudPriceUnit = (siteBrand: string) => {
  if (siteBrand === 'clougence') {
    return translate({ id: 'pricing.cloud.priceUnit', message: '元/百万行数据' });
  }
  return translate({ id: 'pricing.cloud.priceUnit.en', message: '/million rows of data' });
};

// 版本配置数据
const getPricingPlans = (siteBrand: string, priceMeta?: any) => {
  if (siteBrand === 'clouddm') {
    return [
      {
        id: 1,
        title: translate({ id: 'pricing.clouddm.community.title', message: '社区版' }),
        subTitle: "",
        price: translate({ id: 'pricing.clouddm.community.price', message: '免费' }),
        priceUnit: "",
        buttonText: translate({ id: 'pricing.clouddm.community.button', message: '立即下载' }),
        buttonType: "outline", // outline 或 solid
        badge: null,
        features: [
          translate({ id: 'pricing.clouddm.community.feature1', message: '所有的 20+ 种数据源' }),
          translate({ id: 'pricing.clouddm.community.feature2', message: '数据库访问' }),
          translate({ id: 'pricing.clouddm.community.feature3', message: '数据库 CI/CD' }),
          translate({ id: 'pricing.clouddm.community.feature4', message: '数据脱敏' }),
          translate({ id: 'pricing.clouddm.community.feature5', message: '工单流程' }),
          translate({ id: 'pricing.clouddm.community.feature6', message: 'SQL 规范' }),
          translate({ id: 'pricing.clouddm.community.feature7', message: '支持小团队的协作' })
        ],
        linkText: "",
        isPopular: false,
        backgroundColor: "bg-white",
        link: ""
      },
      {
        id: 2,
        title: translate({ id: 'pricing.clouddm.enterprise.title', message: '商业版' }),
        subTitle: "",
        price: "",
        priceUnit: translate({ id: 'pricing.clouddm.enterprise.priceUnit', message: '包含所有社区版的功能特性，额外：' }),
        buttonText: translate({ id: 'pricing.clouddm.enterprise.button', message: '购买许可证' }),
        buttonType: "solid",
        badge: translate({ id: 'pricing.badge.mostPopular', message: 'Most popular' }),
        features: [
          translate({ id: 'pricing.clouddm.enterprise.feature1', message: '更多的数据源实例和账号数' }),
          translate({ id: 'pricing.clouddm.enterprise.feature2', message: '企业级的支持和 SLA 服务' })
        ],
        linkText: "",
        isPopular: true,
        backgroundColor: "bg-gradient-to-b from-[#eaf6ff] to-white",
        link: ""
      }
    ];
  } else if (siteBrand === 'clougence') {
    return [
      {
        id: 1,
        title: translate({ id: 'pricing.community.title', message: 'Community' }),
        subTitle: translate({ id: 'pricing.enterprise.subtitle', message: '(On-Premise)' }),
        price: translate({ id: 'pricing.community.price', message: 'Free' }),
        priceUnit: "",
        buttonText: translate({ id: 'pricing.community.button', message: 'Download Now' }),
        buttonType: "outline",
        badge: null,
        features: [
          translate({ id: 'pricing.community.feature1', message: '50+ DataSources' }),
          translate({ id: 'pricing.community.feature2', message: 'Real-time CDC' }),
          translate({ id: 'pricing.community.feature3', message: 'Schema migration' }),
          translate({ id: 'pricing.features.ddlSync', message: 'DDL synchronization' }),
          translate({ id: 'pricing.features.visualizedEtl', message: 'Visualized, custom ETL' }),
          translate({ id: 'pricing.community.feature4', message: 'Verification and correction' }),
          translate({ id: 'pricing.community.feature6', message: 'Community support' })
        ],
        linkText: "",
        isPopular: false,
        backgroundColor: "bg-white",
        link: ""
      },
      {
        id: 2,
        title: translate({ id: 'pricing.cloud.title', message: 'Cloud' }),
        subTitle: translate({ id: 'pricing.cloud.subtitle', message: '(SaaS Managed & BYOC)' }),
        price: calculateCloudPrice(priceMeta, siteBrand),
        priceUnit: getCloudPriceUnit(siteBrand),
        buttonText: translate({ id: 'pricing.cloud.button', message: 'Start Free Trial' }),
        buttonType: "outline",
        badge: null,
        extraText: translate({ id: 'pricing.cloud.extraText', message: 'All Community features, plus:' }),
        features: [
          translate({ id: 'pricing.features.allDataSources', message: 'All 60+ DataSources' }),
          translate({ id: 'pricing.features.advance', message: 'More advanced features' }),
          translate({ id: 'pricing.features.noActive', message: 'No need for regular activation' }),
          translate({ id: 'pricing.features.deployment', message: 'Lightweight deployment and O&M' }),
          translate({ id: 'pricing.features.availability', message: 'High Availability for Links' }),
          translate({ id: 'pricing.features.cloudSupport', message: 'Cloud support with SLA' })
        ],
        linkText: translate({ id: 'pricing.cloud.linkText', message: 'Evaluate Your Costs' }) + '  →',
        isPopular: false,
        backgroundColor: "bg-white",
        link: "/pricing#calculator"
      },
      {
        id: 3,
        title: translate({ id: 'pricing.enterprise.title', message: 'Enterprise' }),
        subTitle: translate({ id: 'pricing.enterprise.subtitle', message: '(On-Premise)' }),
        price: "",
        priceUnit: "",
        buttonText: translate({ id: 'pricing.enterprise.button.cc', message: 'Try 90 Days Free' }),
        buttonType: "solid",
        badge: translate({ id: 'pricing.badge.mostPopular', message: 'Most popular' }),
        extraText:  translate({ id: 'pricing.trial.extraText', message: 'All Cloud (SaaS Managed & BYOC) features, plus:' }),
        features: [
          translate({ id: 'pricing.features.selfHosting', message: 'Totally self-hosting in your own VPC' }),
          translate({ id: 'pricing.features.multitenancy', message: 'Multitenancy (multiple users)' }),
          translate({ id: 'pricing.features.rbac', message: 'Role granularity with RBAC' }),
          translate({ id: 'pricing.features.auditLogging', message: 'Audit logging' }),
          translate({ id: 'pricing.features.enterpriseSupportWithSla', message: 'Enterprise support with SLA' })
        ],
        linkText: translate({ id: 'pricing.enterprise.linkText', message: 'View the Pricing' }) + '  →',
        isPopular: true,
        backgroundColor: "bg-gradient-to-b from-[#eaf6ff] to-white",
        link: "/docs/price/product_price"
      }
    ];
  } else {
    return [
      {
        id: 1,
        title: translate({ id: 'pricing.cloud.title', message: 'Cloud' }),
        subTitle: translate({ id: 'pricing.cloud.subtitle', message: '(SaaS Managed & BYOC)' }),
        price: calculateCloudPrice(priceMeta, siteBrand),
        priceUnit: getCloudPriceUnit(siteBrand),
        buttonText: translate({ id: 'pricing.cloud.button', message: 'Start Free Trial' }),
        buttonType: "outline", // outline 或 solid
        badge: null,
        features: [
          translate({ id: 'pricing.features.allDataSources', message: 'All 60+ DataSources' }),
          translate({ id: 'pricing.features.realtimeCdc', message: 'Real-time CDC' }),
          translate({ id: 'pricing.features.visualizedEtl', message: 'Visualized, custom ETL' }),
          translate({ id: 'pricing.features.schemaMigration', message: 'Schema migration' }),
          translate({ id: 'pricing.features.verificationCorrection', message: 'Verification and correction' }),
          translate({ id: 'pricing.features.ddlSync', message: 'DDL synchronization' }),
          translate({ id: 'pricing.features.cloudSupport', message: 'Cloud support with SLA' })
        ],
        linkText: translate({ id: 'pricing.cloud.linkText', message: 'Evaluate Your Costs' }) + '  →',
        isPopular: false,
        backgroundColor: "bg-white",
        link: "/pricing#calculator"
      },
      {
        id: 2,
        title: translate({ id: 'pricing.enterprise.title', message: 'Enterprise' }),
        subTitle: translate({ id: 'pricing.enterprise.subtitle', message: '(On-Premise)' }),
        price: "",
        priceUnit: translate({ id: 'pricing.enterprise.priceUnit', message: 'All Cloud (SaaS Managed & BYOC) features, plus:' }),
        buttonText: translate({ id: 'pricing.enterprise.button', message: 'Buy a License' }),
        buttonType: "solid",
        badge: translate({ id: 'pricing.badge.mostPopular', message: 'Most popular' }),
        features: [
          translate({ id: 'pricing.features.selfHosting', message: 'Totally self-hosting in your own VPC' }),
          translate({ id: 'pricing.features.multitenancy', message: 'Multitenancy (multiple users)' }),
          translate({ id: 'pricing.features.rbac', message: 'Role granularity with RBAC' }),
          translate({ id: 'pricing.features.auditLogging', message: 'Audit logging' }),
          translate({ id: 'pricing.features.enterpriseSupport', message: 'Enterprise support with SLA' })
        ],
        linkText: translate({ id: 'pricing.enterprise.linkText', message: 'View the Pricing' }) + '  →',
        isPopular: true,
        backgroundColor: "bg-gradient-to-b from-[#eaf6ff] to-white",
        link: "/docs/price/product_price"
      }
    ];
  }
};

// 版本卡片组件 - 响应式设计
const PricingCard = ({ plan, onDownloadClick, siteBrand }) => {
  return (
    <div className={`w-full max-w-[640px] h-[660px] sm:h-[780px] lg:h-[800px] ${plan.backgroundColor} border border-solid border-gray-200 rounded-[12px] p-[24px] sm:p-[36px] lg:p-[48px] flex flex-col relative`}>
      {/* 热门标签 */}
      {plan.badge && (
        <div className="absolute top-[24px] right-[24px] sm:top-[36px] sm:right-[36px] lg:top-[48px] lg:right-[48px] bg-white border border-solid border-[#0087c7] text-[#0087c7] text-[12px] sm:text-[14px] font-bold leading-[18px] sm:leading-[20px] px-[12px] sm:px-[16px] py-[4px] sm:py-[6px] rounded-full h-[26px] sm:h-[32px] flex items-center justify-center">
          {plan.badge}
        </div>
      )}
      
      {/* 标题 */}
      <h3 translate="no" className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-black mb-[2px] sm:mb-[4px]">
        {plan.title}
      </h3>
      <h4 className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-black mb-[24px] sm:mb-[30px] lg:mb-[36px]">
        {plan.subTitle}
      </h4>
      
      {/* 按钮 */}
      <button 
        className={`cursor-pointer w-full h-[48px] sm:h-[54px] lg:h-[58px] rounded-[12px] font-bold text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[27px] lg:leading-[30px] py-[12px] mb-[24px] sm:mb-[30px] lg:mb-[36px] transition-all duration-300 ${
          plan.buttonType === 'solid' 
            ? 'bg-[#0087c7] border border-solid border-[#0087c7] text-white hover:bg-[#0073a8] hover:border-[#0073a8]' 
            : 'bg-transparent border border-solid border-[#0087c7] text-[#0087c7] hover:bg-[#0087c7] hover:text-white hover:border-[#0087c7]'
        }`}
        onClick={() => {
          if (siteBrand === 'clougence') {
            if (plan.id === 1) {
              // CloudCanal 社区版下载逻辑
              onDownloadClick();
            } else if (plan.id === 2) {
              // CloudCanal Cloud 版本 - 开始免费试用
              loginCheckAndRedirect(() => {
                window.location.href = getCloudUrl();
              }, 'try_cloud_free');
            } else if (plan.id === 3) {
              // CloudCanal Enterprise 版本 - 试用 90 天
              loginCheckAndRedirect(() => {
                window.location.href = getCloudUrl();
              }, 'try_enterprise_free');
            }
          } else if (siteBrand === 'clouddm') {
            if (plan.id === 1) {
              // CloudDM 社区版下载逻辑
              onDownloadClick();
            } else if (plan.id === 2) {
              // CloudDM 商业版购买逻辑
              window.location.href = getCloudUrl() + '/#/system/license';
            }
          } else {
            if (plan.id === 1) {
              // BladePipe Cloud 版本 - 开始免费试用
              loginCheckAndRedirect(() => {
                window.location.href = getCloudUrl();
              }, 'try_cloud_free');
            } else if (plan.id === 2) {
              // BladePipe Enterprise 版本 - 购买许可证
              loginCheckAndRedirect(() => {
                window.location.href = getCloudUrl() + '/#/system/license';
              }, 'buy_a_license');
            }
          }
        }}
      >
        {plan.buttonText}
      </button>
      
      {/* 分割线 */}
      <div className="w-full border-t border-black/10 border-solid border-0 border-l-0 border-r-0 border-b-0 mb-[24px] sm:mb-[30px] lg:mb-[36px]"></div>

            
      {/* 价格 */}
      <div translate="no" className="mb-[16px] sm:mb-[20px] lg:mb-[24px]">
        <div className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold text-black">
          {plan.price}
          {plan.priceUnit && (
          <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium text-black mt-[4px]">
            {plan.priceUnit}
          </span>
        )}
        </div>
      </div>
      {/* 额外文本 */}
      {plan.extraText && (
        <div className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium text-black mb-8">
          {plan.extraText}
        </div>
      )}
      
      {/* 功能列表 */}
      <div className="flex-1 mb-[16px] sm:mb-[20px] lg:mb-[24px]">
        <ul className="space-y-[12px] sm:space-y-[14px] lg:space-y-[16px] list-none m-0 p-0">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-[8px] sm:gap-[10px] lg:gap-[12px]">
              <div className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] bg-[#4BCC6A] rounded-full flex justify-center items-center mt-[2px] sm:mt-[3px] lg:mt-[4px] flex-shrink-0">
                <svg className="w-[6px] h-[5px] sm:w-[7px] sm:h-[5.5px] lg:w-[8px] lg:h-[6px]" viewBox="0 0 8 6" fill="none">
                  <path d="M1 2.5L3 4.5L7 0.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium text-black leading-[20px] sm:leading-[22px] lg:leading-[24px]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* 链接 - 只有当 linkText 存在时才显示 */}
      {plan.linkText && (
        <a href={plan.link} className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#0087c7] font-bold hover:underline cursor-pointer flex items-center gap-[6px] sm:gap-[8px]">
          <span>{plan.linkText.replace(/\s*→\s*$/, '').trim()}</span>
          <ArrowIcon className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] lg:w-[16px] lg:h-[16px] flex-shrink-0 mt-[1px]" />
        </a>
      )}
    </div>
  );
};

export default function Pricing() {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  
  // 下载相关状态
  const [downloadModalVisible, setDownloadModalVisible] = React.useState(false);
  const [downloadLoading, setDownloadLoading] = React.useState(false);
  const [downloadProducts, setDownloadProducts] = React.useState([]);
  const [downloadType, setDownloadType] = React.useState<'enterprise' | 'personal'>('enterprise');
  
  // 价格元数据相关状态
  const [priceMeta, setPriceMeta] = React.useState(null);
  const [priceMetaLoading, setPriceMetaLoading] = React.useState(false);
  
  const pricingPlans = getPricingPlans(siteBrand, priceMeta);

  // 使用统一的工具函数获取价格页面 meta 信息
  const pricingMeta = getPageMeta('pricing');
  
  // 下载按钮点击逻辑
  const handleDownloadClick = async () => {
    if (!isUserLogin()) {
      // 设置来源标识，登录后返回首页并打开下载弹窗
      localStorage.setItem('loginSource', 'download');
      window.location.href = '/login';
      return;
    }

    try {
      setDownloadLoading(true);
      setDownloadType('enterprise'); // 设置为企业版下载
      // 调用 listDownloadProduct 接口
      const response = await listDownloadProduct({
        orderProductType: siteBrand === 'clougence' ? 'CloudCanal' : 'CloudDM'
      });
      console.log('Download products:', response);
      // 保存接口返回的产品数据
      setDownloadProducts(response?.data || response || []);
      // 接口调用成功后显示下载弹窗
      setDownloadModalVisible(true);
    } catch (error) {
      console.error('Failed to get download product list:', error);
      // 可以在这里添加错误提示，比如使用 message 或 notification
      alert(translate({ id: 'pricing.downloadError', message: 'Failed to get download information, please try again later' }));
    } finally {
      setDownloadLoading(false);
    }
  };
  
  // 个人版下载处理函数
  const handlePersonalDownload = async () => {
    if (!isUserLogin()) {
      // 设置来源标识，登录后返回首页并打开下载弹窗
      localStorage.setItem('loginSource', 'download');
      window.location.href = '/login';
      return;
    }

    try {
      setDownloadLoading(true);
      setDownloadType('personal'); // 设置为个人版下载
      // 调用 listDownloadProduct 接口
      const response = await listDownloadProduct({
        orderProductType: 'CloudDmDeskTop'
      });
      console.log('Download products:', response);
      // 保存接口返回的产品数据
      setDownloadProducts(response?.data || response || []);
      // 接口调用成功后显示下载弹窗
      setDownloadModalVisible(true);
    } catch (error) {
      console.error('Failed to get download product list:', error);
      // 可以在这里添加错误提示，比如使用 message 或 notification
      alert(translate({ id: 'pricing.downloadError', message: 'Failed to get download information, please try again later' }));
    } finally {
      setDownloadLoading(false);
    }
  };
  
  // 调用 queryPriceMeta 接口获取价格元数据
  React.useEffect(() => {
    const fetchPriceMeta = async () => {
      try {
        setPriceMetaLoading(true);
        const res: any = await queryPriceMeta({});
        if (res && res.success) {
          setPriceMeta(res.data);
          console.log('Price meta data:', res.data);
        }
      } catch (e) {
        console.error('Failed to fetch price meta:', e);
        // 可选：提示或埋点
      } finally {
        setPriceMetaLoading(false);
      }
    };
    fetchPriceMeta();
  }, []);

  // 检查是否需要打开下载弹窗（登录后回跳的情况）
  React.useEffect(() => {
    const shouldOpenDownloadModal = localStorage.getItem('openDownloadModal');
    if (shouldOpenDownloadModal === 'true' && isUserLogin()) {
      localStorage.removeItem('openDownloadModal');
      // 自动触发下载按钮的逻辑（默认为企业版）
      setDownloadType('enterprise');
      handleDownloadClick();
    }
  }, []);

  return (
    <Layout description={pricingMeta.description}>
      <Head>
        <title>{pricingMeta.title}</title>
      </Head>
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .pricing-cards-container {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="w-full bg-white">
        {/* Banner部分 - 响应式设计 */}
        <FadeInSection>
          <div className="w-full flex justify-center items-center pt-[48px] sm:pt-[72px] lg:pt-[96px] px-4 sm:px-8">
            <div className="w-full flex flex-col gap-[12px] sm:gap-[16px] justify-start items-center">
              {/* 主标题 */}
              <h1 className="w-full text-[32px] sm:text-[48px] lg:text-[60px] font-bold leading-[40px] sm:leading-[56px] lg:leading-[70px] text-black text-center">
                {siteBrand === 'clouddm' ? (
                  <Translate id="pricing.clouddm.title">
                    选择适合您的版本
                  </Translate>
                ) : (
                  <Translate id="pricing.title">
                    Find the Right Plan for You
                  </Translate>
                )}
              </h1>
              
              {/* 副标题 */}
              <p className="w-full text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[24px] sm:leading-[27px] lg:leading-[30px] text-[#262A2B] text-center">
                {siteBrand === 'clouddm' ? (
                  <Translate id="pricing.clouddm.subtitle">
                    CloudDM 提供社区版和商业版两种版本，满足不同用户的需求。
                  </Translate>
                ) : siteBrand === 'clougence' ? (
                  <Translate id="pricing.subtitle.clougence">
                    CloudCanal offers plans for different deployment models. Choose the plan that best suits your needs.
                  </Translate>
                ) : (
                  <Translate id="pricing.subtitle">
                    BladePipe offers plans for different deployment models. Choose the plan that best suits your needs.
                  </Translate>
                )}
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* 版本对比部分 - 响应式设计 */}
        <FadeInSection>
          <div className="w-full py-[40px] sm:py-[48px] lg:py-[60px]">
            {/* 版本卡片容器 - 水平居中布局 */}
            <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-8">
              <div className="w-full">
                <div className="flex flex-col lg:flex-row gap-[24px] sm:gap-[28px] lg:gap-[32px] items-center lg:items-stretch justify-center">
                  {pricingPlans.map((plan) => (
                    <PricingCard key={plan.id} plan={plan} onDownloadClick={handleDownloadClick} siteBrand={siteBrand} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 版本功能对比部分 */}
        <FadeInSection>
          <FeatureComparison_price />
        </FadeInSection>

        {/* 价格计算器部分 - 当 sitebrand 为 clouddm 时不展示 */}
        {siteBrand !== 'clouddm' && (
          <FadeInSection>
            <PriceCalculator priceMeta={priceMeta} />
          </FadeInSection>
        )}

        {/* FAQ部分 */}
        <FadeInSection>
          <FAQ />
        </FadeInSection>
        
        {/* 下载弹窗 */}
        <DownloadModal
          visible={downloadModalVisible}
          onClose={() => setDownloadModalVisible(false)}
          downloadProducts={downloadProducts}
          downloadType={downloadType}
        />
      </div>
      <Footer />
    </Layout>
  );
} 