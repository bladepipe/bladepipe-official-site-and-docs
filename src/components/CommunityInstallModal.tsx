import React, { useState, useEffect, useRef } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Modal } from '@site/src/hooks/useModal';
import { getDownloadUrl } from '@site/src/apis/download';
import apis from '@site/src/apis';
import { isUserLogin } from '../store/user';

type InstallTab = 'docker' | 'k8s' | 'binary';
type DockerInstallMethod = 'command' | 'binary';
export type CommunityInstallInitialTab = InstallTab | 'dockerPackage';

export const normalizeCommunityInstallInitialTab = (
  initialTab: string | null | undefined,
  fallback: CommunityInstallInitialTab = 'docker'
): CommunityInstallInitialTab => {
  if (initialTab === 'docker' || initialTab === 'k8s' || initialTab === 'binary' || initialTab === 'dockerPackage') {
    return initialTab;
  }

  return fallback;
};

const resolveInitialInstallView = (initialTab: CommunityInstallInitialTab): {
  activeTab: InstallTab;
  dockerInstallMethod: DockerInstallMethod;
} => {
  if (initialTab === 'dockerPackage') {
    return {
      activeTab: 'docker',
      dockerInstallMethod: 'binary'
    };
  }

  return {
    activeTab: initialTab === 'k8s' || initialTab === 'binary' ? initialTab : 'docker',
    dockerInstallMethod: 'command'
  };
};

export interface CommunityInstallModalProps {
  visible: boolean;
  onClose: () => void;
  initialTab?: CommunityInstallInitialTab; // 初始 tab，默认为 'docker'
}

export default function CommunityInstallModal({ visible, onClose, initialTab = 'docker' }: CommunityInstallModalProps) {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const initialInstallView = resolveInitialInstallView(initialTab);
  const [activeTab, setActiveTab] = useState<InstallTab>(initialInstallView.activeTab);
  const [dockerInstallMethod, setDockerInstallMethod] = useState<DockerInstallMethod>(initialInstallView.dockerInstallMethod);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [downloadInfo, setDownloadInfo] = useState<any>(null);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [showDownloadInfo, setShowDownloadInfo] = useState(false);
  const [latestProductVer, setLatestProductVer] = useState<string | null>(null);
  const downloadLoadingRef = useRef(false);
  
  // 根据 siteBrand 获取产品名称
  const productName = siteBrand === 'clougence' ? 'CloudCanal' : 'BladePipe';

  // 当弹窗打开且 initialTab 变化时，切换到指定的 tab
  useEffect(() => {
    if (visible) {
      const nextInstallView = resolveInitialInstallView(initialTab);
      setActiveTab(nextInstallView.activeTab);
      setDockerInstallMethod(nextInstallView.dockerInstallMethod);
    }
  }, [visible, initialTab]);

  // 弹窗打开时获取最新版本：clougence => CloudCanal；BladePipe => BladePipe
  useEffect(() => {
    if (!visible) {
      return;
    }

    apis.constantApi
      .latestVer({ productTypes: [productName] })
      .then((res: any) => {
        const ver = res?.data?.[productName];
        if (ver) {
          setLatestProductVer(ver);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch latest version in CommunityInstallModal:', error);
      });
  }, [visible, productName]);

  // 复制代码功能
  const handleCopyCode = async (code: string, tabKey: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTab(tabKey);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (error) {
      console.error('复制失败', error);
      alert(translate({ id: 'banner.copyError', message: 'Failed to copy, please copy manually' }));
    }
  };

  // 处理关闭
  const handleClose = () => {
    setActiveTab('docker');
    setDockerInstallMethod('command');
    setCopiedTab(null);
    setDownloadInfo(null);
    setShowDownloadInfo(false);
    onClose();
  };

  const handlePackageDownload = async (productType: string, loginReturnTab: string) => {
    if (!isUserLogin()) {
      // 设置来源标识，登录后返回首页并打开下载弹窗
      localStorage.setItem('loginSource', 'download');
      localStorage.setItem('communityDownloadInitialTab', loginReturnTab);
      // 如果sitebrand为bladepipe，则路由末尾加/
      if (siteBrand === 'bladepipe') {
        window.location.href = '/login/';
      } else {
        window.location.href = '/login';
      }
      return;
    }
    if (downloadLoadingRef.current) {
      return;
    }
    try {
      downloadLoadingRef.current = true;
      setDownloadLoading(true);
      const params = {
        productVersionType: 'COMMUNITY_VERSION',
        productType
      };
      const res = await getDownloadUrl(params);
      setDownloadInfo(res);
      setShowDownloadInfo(true);
    } catch (error) {
      console.error('Failed to get download information:', error);
      alert(translate({ id: 'downloadModal.downloadInfoError', message: 'Failed to get download information' }));
    } finally {
      downloadLoadingRef.current = false;
      setDownloadLoading(false);
    }
  };

  // 处理 TGZ 下载
  const handleBinaryDownload = async () => {
    const productType = siteBrand === 'clougence' ? 'CloudCanal_Tgz' : 'BladePipe_Tgz';
    await handlePackageDownload(productType, 'binary');
  };

  // 处理 Docker 安装包下载
  const handleDockerPackageDownload = async (productType: string) => {
    await handlePackageDownload(productType, 'dockerPackage');
  };

  // 返回产品列表视图
  const handleBackToProducts = () => {
    setShowDownloadInfo(false);
    setDownloadInfo(null);
  };

  // 一键安装命令中的版本占位符：如果拿到了版本就用真实版本，否则保留 "<version>"
  const dockerVersionPlaceholder = latestProductVer || '<version>';

  // 根据 siteBrand 生成 Docker 一键安装命令
  const dockerInstallCommand =
    siteBrand === 'clougence'
      ? `curl -fsSL https://tgzdownload.clougence.com/support/install_on_docker.sh | bash -s -- ${dockerVersionPlaceholder} ./cc_home`
      : `curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/install_on_docker.sh | bash -s -- ${dockerVersionPlaceholder} ./bp_home`;

  // 根据 siteBrand 生成 Docker 环境安装命令
  const dockerPrerequisiteCommand =
    siteBrand === 'clougence'
      ? '/bin/bash -c "$(curl -fsSL https://tgzdownload.clougence.com/support/install_centos_docker.sh)"'
      : '/bin/bash -c "$(curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/install_centos_docker.sh)"';

  // 根据 siteBrand 生成 K8S 一键安装命令
  const k8sInstallCommand =
    siteBrand === 'clougence'
      ? `curl -fsSL https://tgzdownload.clougence.com/support/install_on_k8s.sh | bash -s -- ${dockerVersionPlaceholder}`
      : `curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/install_on_k8s.sh | bash -s -- ${dockerVersionPlaceholder}`;

  const dockerPackageProducts = siteBrand === 'clougence'
    ? [
        { label: 'ARM', productType: 'CloudCanal_ARM', icon: '/img/home/icon/download_arm.svg' },
        { label: 'X86', productType: 'CloudCanal', icon: '/img/home/icon/download_x86.svg' }
      ]
    : [
        { label: 'ARM', productType: 'BladePipe_ARM', icon: '/img/home/icon/download_arm.svg' },
        { label: 'X86', productType: 'BladePipe', icon: '/img/home/icon/download_x86.svg' }
      ];

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      width={640}
      title=""
      hideCloseButton={true}
    >
      <div className='w-full bg-white rounded-[16px] p-[50px] shadow-[0_8px_-4px_rgba(16,24,40,0.03),0_20px_-4px_rgba(21,53,126,0.2)] relative'>
        {/* 关闭按钮 - 右上角 */}
        <button 
          className='absolute top-[20px] right-[20px] w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors'
          onClick={handleClose}
          style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'transparent' }}>
          <svg width='22' height='22' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M18 6L6 18M6 6L18 18' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </button>
        
        {/* 标题 */}
        <div className='text-center text-[24px] font-bold mb-[16px]'>
          {siteBrand === 'clougence' ? (
            <Translate id='banner.communityModalTitle.clougence'>CloudCanal Free Community Edition</Translate>
          ) : (
            <Translate id='banner.communityModalTitle'>BladePipe Free Community Edition</Translate>
          )}
        </div>

        {/* 免费续期提示 */}
        {/*{!showDownloadInfo && (*/}
        {/*  <div className='mb-[16px]'>*/}
        {/*    <div className='flex items-center justify-center gap-[16px] flex-wrap'>*/}
        {/*      <div className='flex items-center gap-[6px]'>*/}
        {/*        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">*/}
        {/*          <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM11.0607 6.56066L7.56066 10.0607C7.26777 10.3536 6.79289 10.3536 6.5 10.0607L4.93934 8.5C4.64645 8.20711 4.64645 7.73223 4.93934 7.43934C5.23223 7.14645 5.70711 7.14645 6 7.43934L7.03033 8.46967L9.93934 5.56066C10.2322 5.26777 10.7071 5.26777 11 5.56066C11.2929 5.85355 11.2929 6.32843 11.0607 6.56066Z" fill="#0087c7"/>*/}
        {/*        </svg>*/}
        {/*        <span className='text-[15px] font-bold' style={{ color: '#005f8c' }}>*/}
        {/*          <Translate id='banner.communityModal.freeTag.foreverFree'>Forever Free</Translate>*/}
        {/*        </span>*/}
        {/*      </div>*/}
        {/*      <span className='text-[16px] select-none' style={{ color: '#b8dff0' }}>|</span>*/}
        {/*      <div className='flex items-center gap-[6px]'>*/}
        {/*        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">*/}
        {/*          <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM11.0607 6.56066L7.56066 10.0607C7.26777 10.3536 6.79289 10.3536 6.5 10.0607L4.93934 8.5C4.64645 8.20711 4.64645 7.73223 4.93934 7.43934C5.23223 7.14645 5.70711 7.14645 6 7.43934L7.03033 8.46967L9.93934 5.56066C10.2322 5.26777 10.7071 5.26777 11 5.56066C11.2929 5.85355 11.2929 6.32843 11.0607 6.56066Z" fill="#0087c7"/>*/}
        {/*        </svg>*/}
        {/*        <span className='text-[15px] font-bold' style={{ color: '#005f8c' }}>*/}
        {/*          <Translate id='banner.communityModal.freeTag.unlimitedRenewal'>Unlimited Renewal</Translate>*/}
        {/*        </span>*/}
        {/*      </div>*/}
        {/*      <span className='text-[16px] select-none' style={{ color: '#b8dff0' }}>|</span>*/}
        {/*      <div className='flex items-center gap-[6px]'>*/}
        {/*        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">*/}
        {/*          <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM11.0607 6.56066L7.56066 10.0607C7.26777 10.3536 6.79289 10.3536 6.5 10.0607L4.93934 8.5C4.64645 8.20711 4.64645 7.73223 4.93934 7.43934C5.23223 7.14645 5.70711 7.14645 6 7.43934L7.03033 8.46967L9.93934 5.56066C10.2322 5.26777 10.7071 5.26777 11 5.56066C11.2929 5.85355 11.2929 6.32843 11.0607 6.56066Z" fill="#0087c7"/>*/}
        {/*        </svg>*/}
        {/*        <span className='text-[14px] font-bold' style={{ color: '#005f8c' }}>*/}
        {/*          <Translate id='banner.communityModal.freeTag.zeroCost'>No Credit Cards</Translate>*/}
        {/*        </span>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
        
        {/* 环境选择 */}
        {!showDownloadInfo && (
          <div className='flex mb-[30px]' style={{ marginLeft: '-50px', marginRight: '-50px' }}>
            <button
              className={`flex-1 h-[60px] text-[16px] font-bold transition-colors duration-200 ${
                activeTab === 'docker' ? 'text-black' : 'text-black/70'
              }`}
              onClick={() => setActiveTab('docker')}
              style={{ 
                background: 'none', 
                border: 'none', 
                outline: 'none',
                borderBottom: activeTab === 'docker' ? '2px solid #0087c7' : '1px solid rgba(0,0,0,0.1)'
              }}>
              <Translate id='banner.communityModal.tab.docker'>Docker</Translate>
            </button>
            <button
              className={`flex-1 h-[60px] text-[16px] font-bold transition-colors duration-200 ${
                activeTab === 'k8s' ? 'text-black' : 'text-black/70'
              }`}
              onClick={() => setActiveTab('k8s')}
              style={{ 
                background: 'none', 
                border: 'none', 
                outline: 'none',
                borderBottom: activeTab === 'k8s' ? '2px solid #0087c7' : '1px solid rgba(0,0,0,0.1)'
              }}>
              <Translate id='banner.communityModal.tab.k8s'>K8S</Translate>
            </button>
            <button
              className={`flex-1 h-[60px] text-[16px] font-bold transition-colors duration-200 ${
                activeTab === 'binary' ? 'text-black' : 'text-black/70'
              }`}
              onClick={() => setActiveTab('binary')}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                borderBottom: activeTab === 'binary' ? '2px solid #0087c7' : '1px solid rgba(0,0,0,0.1)'
              }}>
              <Translate id='banner.communityModal.tab.binaryPackage'>Binary Package</Translate>
            </button>
          </div>
        )}
        
        {/* 内容区 */}
        <div className='w-full'>
          {/* 下载信息视图 */}
          {showDownloadInfo ? (
            <DownloadInfoView 
              info={downloadInfo} 
              loading={downloadLoading} 
              onBack={handleBackToProducts}
              onClose={handleClose}
            />
          ) : (
            <>
              {activeTab === 'docker' && (
                <div className='flex justify-center mb-[18px]'>
                  <div className='inline-flex rounded-[8px] border border-black/10 overflow-hidden' style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                    <button
                      className={`h-[36px] px-[28px] text-[14px] font-bold transition-colors ${
                        dockerInstallMethod === 'command' ? 'bg-[#0087c7] text-white' : 'bg-white text-black/70 hover:bg-[#f0faff]'
                      }`}
                      style={{ border: 'none', outline: 'none' }}
                      onClick={() => setDockerInstallMethod('command')}>
                      <Translate id='banner.communityModal.tab.command'>Command Install</Translate>
                    </button>
                    <button
                      className={`h-[36px] px-[28px] text-[14px] font-bold transition-colors ${
                        dockerInstallMethod === 'binary' ? 'bg-[#0087c7] text-white' : 'bg-white text-black/70 hover:bg-[#f0faff]'
                      }`}
                      style={{ border: 'none', outline: 'none' }}
                      onClick={() => setDockerInstallMethod('binary')}>
                      <Translate id='banner.communityModal.tab.downloadPackage'>Download Package</Translate>
                    </button>
                  </div>
                </div>
              )}

              {/* Docker Tab 内容 */}
              {activeTab === 'docker' && dockerInstallMethod === 'command' && (
            <>
              <div className='space-y-[16px]'>
                <div>
                  <div className='flex items-center gap-[10px] mb-[8px] flex-wrap'>
                    <span className='text-[15px] font-bold text-black flex-shrink-0'>1.</span>
                    <span className='text-[15px] font-bold text-black'>
                      <Translate id='banner.communityModal.dockerStep.installDocker'>Install Docker</Translate>
                    </span>
                    <span className='text-[13px] text-black/50'>
                      <Translate id='banner.communityModal.dockerStep.installDockerTip'>Skip if installed; use another Docker command if needed.</Translate>
                    </span>
                  </div>
                  <div className="relative border border-black/20 rounded-[6px] bg-white px-[10px] py-[10px] pr-[36px]" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                    <div className="text-[14px] font-mono text-black overflow-x-auto break-all">
                      {dockerPrerequisiteCommand}
                    </div>
                    <div
                      className='absolute top-[10px] right-[10px] w-[16px] h-[16px] flex items-center justify-center cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode(dockerPrerequisiteCommand, 'dockerPrerequisite');
                      }}
                      title={translate({ id: 'banner.copy', message: 'Copy' })}>
                      {copiedTab === 'dockerPrerequisite' ? (
                        <img
                          src="/img/home/icon/check.svg"
                          alt={translate({ id: 'banner.communityModal.copied', message: 'Copied' })}
                          className="w-4 h-4"
                          style={{ width: '16px', height: '16px' }}
                        />
                      ) : (
                        <img src="/img/home/icon/copy.svg" alt={translate({ id: "banner.copy", message: "Copy" })} className="w-4 h-4" style={{ width: "16px", height: "16px" }} />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className='flex items-center gap-[10px] mb-[8px]'>
                    <span className='text-[15px] font-bold text-black flex-shrink-0'>2.</span>
                    <span className='text-[15px] font-bold text-black'>
                      {siteBrand === 'clougence' ? (
                        <Translate id='banner.communityModal.dockerStep.installProduct.clougence'>Install CloudCanal Community Edition</Translate>
                      ) : (
                        <Translate id='banner.communityModal.dockerStep.installProduct'>Install BladePipe Community Edition</Translate>
                      )}
                    </span>
                  </div>
                  <div className="relative border border-black/20 rounded-[6px] bg-white px-[10px] py-[10px] pr-[36px]" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                    <div className="text-[14px] font-mono text-black overflow-x-auto break-all">
                      {dockerInstallCommand}
                    </div>
                    <div
                      className='absolute top-[10px] right-[10px] w-[16px] h-[16px] flex items-center justify-center cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode(dockerInstallCommand, 'docker');
                      }}
                      title={translate({ id: 'banner.copy', message: 'Copy' })}>
                      {copiedTab === 'docker' ? (
                        <img
                          src="/img/home/icon/check.svg"
                          alt={translate({ id: 'banner.communityModal.copied', message: 'Copied' })}
                          className="w-4 h-4"
                          style={{ width: '16px', height: '16px' }}
                        />
                      ) : (
                        <img src="/img/home/icon/copy.svg" alt={translate({ id: "banner.copy", message: "Copy" })} className="w-4 h-4" style={{ width: "16px", height: "16px" }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[16px] text-left text-[14px] text-black">
                <Translate id='banner.moreInfoPrefix'>Get more information: </Translate>
                <span
                  className="text-[#0087c7] hover:text-[#0070a6] underline cursor-pointer"
                  onClick={() => {
                    const dockerQuickStartUrl = siteBrand === 'clougence' 
                      ? '/docs/productOP/docker/install_all_in_one_docker'
                      : '/docs/productOP/onPremise/installation/install_all_in_one_docker';
                    window.open(dockerQuickStartUrl, '_blank');
                  }}
                >
                  <Translate id='banner.quickStartLink'>Quick Start</Translate>
                </span>
                <span className="mx-[6px] text-black/40 select-none">|</span>
                <span
                  className="text-[#0087c7] hover:text-[#0070a6] underline cursor-pointer"
                  onClick={() => {
                    const licenseUrl = siteBrand === 'clougence'
                      ? '/docs/license/license_use'
                      : '/docs/license/license_use/#get-apply-code';
                    window.open(licenseUrl, '_blank');
                  }}
                >
                  <Translate id='banner.freeRenewLink'>Free Renewal</Translate>
                </span>
              </div>
            </>
          )}
          
          {/* K8S Tab 内容 */}
          {activeTab === 'k8s' && (
            <>
              <div className="text-left text-[14px] text-black mb-[10px]">
                {siteBrand === 'clougence' ? (
                  <Translate id='banner.communityModalDescription.clougence'>One-click quick install of CloudCanal free community edition:</Translate>
                ) : (
                  <Translate id='banner.communityModalDescription'>One-click quick install of BladePipe free community edition:</Translate>
                )}
              </div>
              <div className="relative border border-black/20 rounded-[6px] bg-white px-[10px] py-[10px] pr-[36px]" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                <div className="text-[14px] font-mono text-black overflow-x-auto break-all">
                  {k8sInstallCommand}
                </div>
                <div
                  className='absolute top-[10px] right-[10px] w-[16px] h-[16px] flex items-center justify-center cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyCode(k8sInstallCommand, 'k8s');
                  }}
                  title={translate({ id: 'banner.copy', message: 'Copy' })}>
                  {copiedTab === 'k8s' ? (
                    <img 
                      src="/img/home/icon/check.svg" 
                      alt={translate({ id: 'banner.communityModal.copied', message: 'Copied' })} 
                      className="w-4 h-4" 
                      style={{ width: '16px', height: '16px' }}
                    />
                  ) : (
                    <img src="/img/home/icon/copy.svg" alt={translate({ id: "banner.copy", message: "Copy" })} className="w-4 h-4" style={{ width: "16px", height: "16px" }} />
                  )}
                </div>
              </div>
              <div className="mt-[16px] text-left text-[14px] text-black">
                <Translate id='banner.moreInfoPrefix'>Get more information: </Translate>
                <span
                  className="text-[#0087c7] hover:text-[#0070a6] underline cursor-pointer"
                  onClick={() => {
                    const k8sQuickStartUrl = siteBrand === 'clougence' 
                      ? '/docs/productOP/kubernetes/install_all_in_one_k8s'
                      : '/docs/productOP/onPremise/installation/install_all_in_one_k8s';
                    window.open(k8sQuickStartUrl, '_blank');
                  }}
                >
                  <Translate id='banner.quickStartLink'>Quick Start</Translate>
                </span>
                <span className="mx-[6px] text-black/40 select-none">|</span>
                <span
                  className="text-[#0087c7] hover:text-[#0070a6] underline cursor-pointer"
                  onClick={() => {
                    const licenseUrl = siteBrand === 'clougence'
                      ? 'https://www.clougence.com/docs/license/license_use'
                      : '/docs/license/license_use/#get-apply-code';
                    window.open(licenseUrl, '_blank');
                  }}
                >
                  <Translate id='banner.freeRenewLink'>Free Renewal</Translate>
                </span>
              </div>
            </>
          )}
          
          {/* Binary Package Tab 内容 */}
            {activeTab === 'docker' && dockerInstallMethod === 'binary' && (
              <>
                <div className='flex gap-[24px] justify-center mb-[30px] flex-wrap min-h-[224px]'>
                  {dockerPackageProducts.map((item) => (
                    <div
                      key={item.productType}
                      className={`w-[231px] h-[224px] border border-black/10 rounded-[12px] p-[40px] flex flex-col items-center justify-center transition-shadow ${
                        downloadLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:shadow-md'
                      }`}
                      style={{ borderStyle: 'solid', borderWidth: '1px' }}
                      onClick={() => {
                        if (!downloadLoading) {
                          handleDockerPackageDownload(item.productType);
                        }
                      }}>
                      <img
                        src={item.icon}
                        alt={item.label}
                        className='w-[88px] h-[88px] mb-[16px]'
                      />
                      <button
                        className={`w-[151px] h-[40px] bg-white border border-[#0087c7] text-[#0087c7] rounded-[8px] text-[16px] font-bold transition ${
                          downloadLoading ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#0087c7] hover:text-white'
                        }`}
                        style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#0087c7' }}
                        disabled={downloadLoading}>
                        {downloadLoading ? (
                          <Translate id='downloadModal.loadingInfo'>Loading...</Translate>
                        ) : (
                        translate({
                          id: 'downloadModal.downloadVersionBtn',
                          message: '{version}'
                        }, { version: item.label })
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-[16px] text-left text-[14px] text-black">
                <Translate id='banner.moreInfoPrefix'>Get more information: </Translate>
                <span
                  className="text-[#0087c7] hover:text-[#0070a6] underline cursor-pointer"
                  onClick={() => {
                    window.open('/docs/quick/quick_start', '_blank');
                  }}
                >
                  <Translate id='banner.quickStartLink'>Quick Start</Translate>
                </span>
                <span className="mx-[6px] text-black/40 select-none">|</span>
                <span
                  className="text-[#0087c7] hover:text-[#0070a6] underline cursor-pointer"
                  onClick={() => {
                    const licenseUrl = siteBrand === 'clougence'
                      ? 'https://www.clougence.com/docs/license/license_use'
                      : '/docs/license/license_use/#get-apply-code';
                    window.open(licenseUrl, '_blank');
                  }}
                >
                  <Translate id='banner.freeRenewLink'>Free Renewal</Translate>
                </span>
              </div>
            </>
          )}

          {/* TGZ Binary Package Tab 内容 */}
            {activeTab === 'binary' && (
              <>
                <div className='flex gap-[24px] justify-center mb-[30px] flex-wrap min-h-[224px]'>
                  <div
                    className={`w-[231px] h-[224px] border border-black/10 rounded-[12px] p-[40px] flex flex-col items-center justify-center transition-shadow ${
                      downloadLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:shadow-md'
                    }`}
                    style={{ borderStyle: 'solid', borderWidth: '1px' }}
                    onClick={() => {
                      if (!downloadLoading) {
                        handleBinaryDownload();
                      }
                    }}>
                    <img
                      src="/img/home/icon/download_x86.svg"
                      alt={translate({ id: 'banner.communityModal.crossPlatform', message: 'Cross-platform' })}
                      className='w-[88px] h-[88px] mb-[16px]'
                    />
                    <button
                      className={`w-[151px] h-[40px] bg-white border border-[#0087c7] text-[#0087c7] rounded-[8px] text-[16px] font-bold transition ${
                        downloadLoading ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#0087c7] hover:text-white'
                      }`}
                      style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#0087c7' }}
                      disabled={downloadLoading}>
                    {downloadLoading ? (
                      <Translate id='downloadModal.loadingInfo'>Loading...</Translate>
                    ) : (
                      translate({
                        id: 'downloadModal.downloadVersionBtn',
                        message: '{version}'
                      }, { version: translate({ id: 'banner.communityModal.crossPlatform', message: 'Cross-platform' }) })
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-[16px] text-left text-[14px] text-black">
                <Translate id='banner.moreInfoPrefix'>Get more information: </Translate>
                <span
                  className="text-[#0087c7] hover:text-[#0070a6] underline cursor-pointer"
                  onClick={() => {
                    window.open('/docs/quick/quick_start', '_blank');
                  }}
                >
                  <Translate id='banner.quickStartLink'>Quick Start</Translate>
                </span>
                <span className="mx-[6px] text-black/40 select-none">|</span>
                <span
                  className="text-[#0087c7] hover:text-[#0070a6] underline cursor-pointer"
                  onClick={() => {
                    const licenseUrl = siteBrand === 'clougence'
                      ? 'https://www.clougence.com/docs/license/license_use'
                      : '/docs/license/license_use/#get-apply-code';
                    window.open(licenseUrl, '_blank');
                  }}
                >
                  <Translate id='banner.freeRenewLink'>Free Renewal</Translate>
                </span>
              </div>
            </>
          )}
            </>
          )}
        </div>
        
        {/* 底部关闭按钮 - 仅在非下载信息视图时显示 */}
        {!showDownloadInfo && (
          <div className='mt-[20px] flex justify-center'>
            <button
              className='w-full h-[40px] bg-[#0087c7] rounded-[8px] flex items-center justify-center text-white text-[16px] font-bold hover:bg-[#0070a6] transition-colors'
              style={{ border: 'none', outline: 'none' }}
              onClick={handleClose}>
              <Translate id='banner.close'>Close</Translate>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// 下载信息视图组件
function DownloadInfoView({ 
  info, 
  loading, 
  onBack, 
  onClose,
}: { 
  info: any; 
  loading?: boolean; 
  onBack: () => void;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState<string>('');

  // 兼容 loading 或 info 为空
  if (loading) {
    return (
      <div className='w-full flex flex-col items-center justify-center min-h-[516px]'>
        <div className='text-center text-[20px] font-bold mb-4'>
          <Translate id='downloadModal.loadingInfo'>Getting download information...</Translate>
        </div>
      </div>
    );
  }
  if (!info) return null;
  
  // 兼容老数据结构
  const version = info.productVersion || info.version || info.data?.productVersion;
  const md5 = info.pkgMd5 || info.md5 || info.data?.pkgMd5;
  const url = info.downloadUrl?.direct || info.url || info.data?.downloadUrl?.direct;
  const wget = info.downloadUrl?.wget || info.wget || info.data?.downloadUrl?.wget;
  const curl = info.downloadUrl?.curl || info.curl || info.data?.downloadUrl?.curl;
  
  // 复制逻辑
  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1000);
    } catch (error) {
      console.error('复制失败', error);
    }
  };

  // 复制图标
  const CopyIcon = () => (
    <img src="/img/home/icon/copy.svg" alt={translate({ id: "banner.copy", message: "Copy" })} className="w-4 h-4" style={{ width: "16px", height: "16px" }} />
  );

  // 提示图标
  const TipIcon = () => (
    <img 
      src="/img/home/icon/tip.svg" 
      alt={translate({ id: 'downloadModal.tip', message: 'Tip' })} 
      className="w-4 h-4" 
      style={{ width: '16px', height: '16px' }}
    />
  );

  // 下载图标
  const DownloadIcon = () => (
    <img 
      src="/img/home/icon/download-cloud.svg" 
      alt={translate({ id: 'downloadModal.download', message: 'Download' })} 
      className="w-4 h-4" 
      style={{ width: '16px', height: '16px' }}
    />
  );

  // 勾选图标
  const CheckIcon = () => (
    <img 
      src="/img/home/icon/check.svg" 
      alt={translate({ id: 'banner.communityModal.success', message: 'Success' })} 
      className="w-4 h-4" 
      style={{ width: '16px', height: '16px' }}
    />
  );

  // 渲染可复制行
  const renderCopyRow = (label: string, value: string, key: string) => {
    return (
      <div className='flex items-center w-full min-w-0'>
        <div className='w-[100px] h-[40px] flex items-center flex-shrink-0'>
          <span className='text-[14px] font-bold text-black'>{label}</span>
        </div>
        <div className='flex-1 ml-[8px] h-[40px] border border-black/20 rounded-[6px] flex items-center justify-between px-[10px] bg-white min-w-0 max-w-full' style={{ borderStyle: 'solid', borderWidth: '1px' }}>
          <span className='flex-1 text-[14px] font-medium text-black truncate pr-[10px] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
            {value || translate({ id: 'downloadModal.noData', message: 'No data' })}
          </span>
          <div
            className='w-[16px] h-[16px] flex items-center justify-center cursor-pointer flex-shrink-0'
            onClick={(e) => {
              e.stopPropagation();
              if (value) handleCopy(value, key);
            }}
            title={translate({ id: 'downloadModal.copy', message: 'Copy' })}>
            {copied === key ? (
              <CheckIcon />
            ) : (
              <CopyIcon />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 标题 */}
      <div className='text-center text-[24px] font-bold mb-[30px]'>
        <Translate id='downloadModal.downloadTitle'>Download Private Deployment</Translate>
      </div>
      
      {/* 警告提示 */}
      <div className='w-full h-[36px] bg-[#fff7e6] border border-[#f7d78c] rounded-[8px] flex items-center justify-center mb-[30px]'>
        <TipIcon />
        <span className='ml-[10px] text-[14px] font-bold text-[#3E1700]'>
          <Translate id='downloadModal.linkExpiry'>This download link is valid for 1 hour, please download promptly.</Translate>
        </span>
      </div>
      
      {/* 版本信息 */}
      <div className='w-full mb-[30px]'>
        <div className='flex items-center mb-[8px] w-full min-w-0'>
          <div className='w-[100px] h-[20px] flex items-center flex-shrink-0'>
            <span className='text-[14px] font-bold text-black'>
              <Translate id='downloadModal.version'>Version: </Translate>
            </span>
          </div>
          <div className='flex-1 ml-[8px] h-[20px] flex items-center px-[10px] min-w-0'>
            <span className='text-[14px] font-medium text-black truncate min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
              {version || translate({ id: 'downloadModal.noData', message: 'No data' })}
            </span>
          </div>
        </div>
        <div className='flex items-center w-full min-w-0'>
          <div className='w-[100px] h-[20px] flex items-center flex-shrink-0'>
            <span className='text-[14px] font-bold text-black'>
              <Translate id='downloadModal.md5'>MD5: </Translate>
            </span>
          </div>
          <div className='flex-1 ml-[8px] h-[20px] flex items-center px-[10px] min-w-0'>
            <span className='text-[14px] font-medium text-black truncate min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
              {md5 || translate({ id: 'downloadModal.noData', message: 'No data' })}
            </span>
          </div>
        </div>
      </div>
      
      {/* 下载信息 */}
      <div className='w-full mb-[30px] space-y-[10px] min-w-0 overflow-hidden'>
        {renderCopyRow(translate({ id: 'downloadModal.downloadUrl', message: 'Download:' }), url || '', 'url')}
        {renderCopyRow(translate({ id: 'downloadModal.wgetCommand', message: 'Wget Method:' }), wget || '', 'wget')}
        {renderCopyRow(translate({ id: 'downloadModal.curlCommand', message: 'Curl Method:' }), curl || '', 'curl')}
      </div>
      
      {/* 按钮组 */}
      <div className='flex gap-[12px]'>
        <button
          className='flex-1 h-[40px] bg-white border border-[#0087c7] text-[#0087c7] rounded-[8px] flex items-center justify-center text-[16px] font-bold hover:bg-[#f0faff] transition-colors'
          style={{ borderStyle: 'solid', borderWidth: '1px' }}
          onClick={onBack}>
          <Translate id='downloadModal.back'>Back</Translate>
        </button>
        <button
          className='flex-1 h-[40px] bg-[#0087c7] rounded-[8px] flex items-center justify-center text-white text-[16px] font-bold hover:bg-[#0070a6] transition-colors'
          style={{ border: 'none', outline: 'none' }}
          onClick={() => {
            if (url) {
              const link = document.createElement('a');
              link.href = url;
              const linkArr = url.split('/');
              link.setAttribute('download', linkArr[linkArr.length - 1]);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}>
          <span className='mr-[10px]'>
            <Translate id='downloadModal.directDownload'>Download</Translate>
          </span>
          <DownloadIcon />
        </button>
      </div>
    </>
  );
}
