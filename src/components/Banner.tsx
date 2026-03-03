import React, { useState, useEffect } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { getCloudUrl } from '@site/src/utils/api';
import { loginCheckAndRedirect } from '@site/src/utils';
import { isUserLogin } from '@site/src/store/user';
import { listDownloadProduct } from '@site/src/apis/constant';
import DownloadModal from './DownloadModal';
import CommunityInstallModal from './CommunityInstallModal';
import { Tabs } from 'antd';

export default function Banner() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  
  const keywords = [
    translate({ id: 'banner.keyword.incremental', message: 'Incremental' }),
    translate({ id: 'banner.keyword.endtoend', message: 'End-to-end' }),
    translate({ id: 'banner.keyword.secure', message: 'Secure' })
  ];
  
  // 根据 siteBrand 动态选择 banner 图片
  const bannerImageSrc = siteBrand === 'clougence' ? '/img/home/banner_cloudcanal.svg' : '/img/home/banner.png';
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadProducts, setDownloadProducts] = useState([]);
  const [communityModalVisible, setCommunityModalVisible] = useState(false);

  // 弹窗hook

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // 先淡出
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % keywords.length);
        setFade(true); // 再淡入
      }, 300); // 300ms 淡出
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const [communityModalInitialTab, setCommunityModalInitialTab] = useState<string>('docker');

  // 检查是否需要打开下载弹窗（登录后回跳的情况）
  useEffect(() => {
    const shouldOpenDownloadModal = localStorage.getItem('openDownloadModal');
    if (shouldOpenDownloadModal === 'true' && isUserLogin()) {
      localStorage.removeItem('openDownloadModal');
      // 自动触发下载按钮的逻辑
      handleDownloadClick();
    }
    const communityModalVisible = localStorage.getItem('openCommunityDownloadModal');
    if (communityModalVisible === 'true' && isUserLogin()) {
      localStorage.removeItem('openCommunityDownloadModal');
      // 自动触发下载社区版的逻辑，切换到 binary tab
      setCommunityModalInitialTab('binary');
      setCommunityModalVisible(true);
    }
  }, []);

  // Try Cloud Free / Try Community Free 按钮点击逻辑
  const handleTryCloudFree = () => {
    if (siteBrand === 'bladepipe' || siteBrand === 'clougence') {
      // BladePipe 显示社区版安装弹窗
      setCommunityModalVisible(true);
    } else {
      // 其他品牌跳转到云平台
      loginCheckAndRedirect(() => {
        window.location.href = getCloudUrl();
      }, 'try_cloud_free');
    }
  };


  // Download 按钮点击逻辑
  const handleDownloadClick = async () => {
    if (!isUserLogin()) {
      // 设置来源标识，登录后返回首页并打开下载弹窗
      localStorage.setItem('loginSource', 'download');
      // 如果sitebrand为bladepipe，则路由末尾加/
      if (siteBrand === 'bladepipe') {
        window.location.href = '/login/';
      } else {
        window.location.href = '/login';
      }
      return;
    }

    try {
      setDownloadLoading(true);
      // 调用 listDownloadProduct 接口
      const response = await listDownloadProduct({
        orderProductType: siteBrand === 'clougence' ? 'CloudCanal' : 'BladePipe'
      });
      console.log('Download products:', response);
      // 保存接口返回的产品数据
      setDownloadProducts(response?.data || response || []);
      // 接口调用成功后显示下载弹窗
      setDownloadModalVisible(true);
    } catch (error) {
      // 可以在这里添加错误提示，比如使用 message 或 notification
      alert(translate({ 
        id: 'banner.downloadError', 
        message: 'Failed to get download information, please try again later' 
      }));
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <section className='w-full min-h-[420px] md:h-[708px] py-12 md:py-36 flex justify-center items-start bg-gradient-to-b from-white to-[#eaf6ff]'>
      <div className='w-full max-w-[1320px] min-h-[420px] flex flex-col md:flex-row justify-between items-center gap-8 md:gap-[140px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
        {/* 左侧内容 */}
        <div className='flex flex-col gap-6 md:gap-8 lg:gap-[24px] w-full md:w-[730px] min-h-[320px] md:h-[420px] justify-start items-start'>
          <div className='flex flex-col gap-3 md:gap-4 lg:gap-[30px] w-full justify-start items-start'>
            <h1 className="text-[28px] sm:text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-[110%] md:leading-[100%] text-left font-['Plus Jakarta Sans']">
              <Translate id='banner.title'>Replicate Data in Real-time,</Translate>
              <br />
              <span
                style={{
                  color: '#0087C7',
                  opacity: fade ? 1 : 0,
                  transition: 'opacity 0.3s, color 0.3s',
                  display: 'inline-block'
                }}>
                {keywords[current]}
              </span>
            </h1>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-medium leading-[20px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] text-left opacity-80 font-['Plus Jakarta Sans'] max-w-full">
              <Translate id='banner.subtitle'>
                Build end-to-end data pipelines between 60+ datasources for analytics or AI in minutes. Move data faster and easier than ever in Cloud
                or On-Premise, with ultra-low latency less than 3 seconds.
              </Translate>
            </p>
          </div>
          {/* 按钮组 */}
          <div className='flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-[21px] w-full h-auto md:h-[54px] items-start sm:items-center'>
            {/* Try Cloud Free / Try Community Free 主按钮 */}
            <button
              className="cursor-pointer h-[48px] md:h-[54px] flex items-center justify-center gap-[10px] rounded-full bg-[#0087c7] text-white text-[14px] sm:text-[15px] md:text-[16px] font-bold font-['Plus Jakarta Sans'] px-4 sm:px-6 md:px-7 py-3 md:py-[15px] shadow-none border-none transition hover:bg-[#0070a6] focus:outline-none w-full sm:w-auto whitespace-nowrap"
              style={{ boxShadow: '0px 2px 8px 0px rgba(0,135,199,0.10)' }}
              onClick={handleTryCloudFree}>
              {siteBrand === 'bladepipe' || siteBrand === 'clougence' ? (
                <Translate id='banner.tryCommunityFreeBtn'>Try Community Free</Translate>
              ) : (
                <Translate id='banner.tryCloudBtn'>Try Cloud Free</Translate>
              )}
            </button>
            {/* Quickstart 描边按钮 - 仅在非 bladepipe 时显示 */}
            {siteBrand !== 'bladepipe' && siteBrand !== 'clougence' && (
              <button
                className="cursor-pointer h-[48px] md:h-[54px] flex items-center justify-center gap-[10px] rounded-full border border-1 border-solid border-[#0087c7] text-[#0087c7] text-[14px] sm:text-[15px] md:text-[16px] font-bold font-['Plus Jakarta Sans'] bg-white px-4 sm:px-6 md:px-7 py-3 md:py-[15px] shadow-none transition hover:bg-[#f0faff] focus:outline-none w-full sm:w-auto sm:ml-[12px] whitespace-nowrap"
                style={{ boxShadow: '0px 2px 8px 0px rgba(0,135,199,0.10)' }}
                onClick={() => window.location.href = '/docs/quick/quick_start_byoc'}>
                <Translate id='banner.quickstartBtn'>Quick Start</Translate>
              </button>
            )}
            {/* Get a License 按钮 - 和 Quick Start 一样的样式 */}
            <button
              className="cursor-pointer h-[48px] md:h-[54px] flex items-center justify-center gap-[10px] rounded-full border border-1 border-solid border-[#0087c7] text-[#0087c7] text-[14px] sm:text-[15px] md:text-[16px] font-bold font-['Plus Jakarta Sans'] bg-white px-4 sm:px-6 md:px-7 py-3 md:py-[15px] shadow-none transition hover:bg-[#f0faff] focus:outline-none w-full sm:w-auto whitespace-nowrap"
              style={{ boxShadow: '0px 2px 8px 0px rgba(0,135,199,0.10)' }}
              onClick={() => {
                loginCheckAndRedirect(() => {
                  window.location.href = getCloudUrl() + '/#/system/license';
                }, 'buy_a_license');
              }}>
              <Translate id="banner.buyLicense">Get a License</Translate>
            </button>
          </div>
        </div>
        {/* 右侧插画/图片 */}
        <div className='w-full md:w-[714px] h-[200px] md:h-[376px] flex items-center justify-center mt-8 md:mt-0'>
          <img src={bannerImageSrc} alt={translate({ id: 'banner.image.alt', message: 'Banner Illustration' })} className='w-full h-full object-contain rounded-xl' />
        </div>
      </div>
      <DownloadModal 
        visible={downloadModalVisible}
        onClose={() => setDownloadModalVisible(false)}
        downloadProducts={downloadProducts}
      />
      
      {/* 社区版安装弹窗 - BladePipe 和 CloudCanal */}
      {(siteBrand === 'bladepipe' || siteBrand === 'clougence') && (
        <CommunityInstallModal
          visible={communityModalVisible}
          onClose={() => {
            setCommunityModalVisible(false);
            setCommunityModalInitialTab('docker'); // 关闭时重置为默认 tab
          }}
          initialTab={communityModalInitialTab}
        />
      )}
    </section>
  );
}

