import React, { useState } from 'react';
import { getDownloadUrl } from '@site/src/apis/download';
import { useModal, Modal } from '../hooks/useModal';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export interface DownloadModalProps {
  visible: boolean;
  onClose: () => void;
  downloadProducts?: any[];
  downloadType?: 'enterprise' | 'personal'; // 新增：区分企业版和个人版
}

export default function DownloadModal({ visible, onClose, downloadProducts = [], downloadType = 'enterprise' }: DownloadModalProps) {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  const [modalType, setModalType] = useState<'normal' | 'downloadInfo'>('normal');
  const [downloadTypeState, setDownloadTypeState] = useState<string>('');
  const [downloadInfo, setDownloadInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setModalType('normal');
    setDownloadTypeState('');
    setDownloadInfo(null);
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      width={640}
      title=""
      hideCloseButton={true}>
      {modalType === 'normal' ? (
        <ModalContent
          downloadProducts={downloadProducts}
          downloadType={downloadType}
          siteBrand={siteBrand as string}
          onSelectDownload={async (productType) => {
            setDownloadTypeState(productType);
            setModalType('downloadInfo');
            setLoading(true);
            let params: any = { 
              productVersionType: (siteBrand === 'clougence' || siteBrand === 'clouddm') ? 'COMMUNITY_VERSION' : 'ENTERPRISE_VERSION',
              productType: productType
            };
            try {
              const res = await getDownloadUrl(params);
              setDownloadInfo(res);
            } catch (e) {
              alert(translate({ id: 'downloadModal.downloadInfoError', message: 'Failed to get download information' }));
              setDownloadInfo(null);
            } finally {
              setLoading(false);
            }
          }}
          onClose={handleClose}
        />
      ) : (
        <DownloadInfo info={downloadInfo} type={downloadTypeState} loading={loading} onClose={handleClose} />
      )}
    </Modal>
  );
}

// 弹窗内容组件
function ModalContent({ 
  downloadProducts, 
  onSelectDownload, 
  onClose, 
  downloadType,
  siteBrand
}: { 
  downloadProducts: any[]; 
  onSelectDownload: (type: string) => void; 
  onClose: () => void;
  downloadType: string;
  siteBrand: string;
}) {
  
  // 根据deployType分组产品
  const groupedProducts = React.useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    // 如果是 clouddm 个人版，根据 productType 分组
    if (siteBrand === 'clouddm' && downloadType === 'personal') {
      downloadProducts.forEach(product => {
        const productType = product.productType || '';
        let groupKey = '';
        
        if (productType.includes('Mac')) {
          groupKey = 'Mac';
        } else if (productType.includes('Win')) {
          groupKey = 'Windows';
        } else if (productType.includes('Linux')) {
          groupKey = 'Linux';
        }
        
        if (groupKey) {
          if (!groups[groupKey]) {
            groups[groupKey] = [];
          }
          groups[groupKey].push(product);
        }
      });
    } else {
      // 默认的分组逻辑
      downloadProducts.forEach(product => {
        const deployType = product.deployType || 'UNKNOWN';
        if (!groups[deployType]) {
          groups[deployType] = [];
        }
        groups[deployType].push(product);
      });
    }
    
    return groups;
  }, [downloadProducts, siteBrand, downloadType]);

  // 生成tabs
  const tabs = React.useMemo(() => {
    // 如果是 clouddm 个人版，使用特殊的 tab 配置
    if (siteBrand === 'clouddm' && downloadType === 'personal') {
      return [
        { key: 'Mac', label: 'Mac' },
        { key: 'Windows', label: 'Windows' },
        { key: 'Linux', label: 'Linux' }
      ];
    }
    
    // 默认的 tab 生成逻辑
    return Object.keys(groupedProducts).map(deployType => {
      const products = groupedProducts[deployType];
      const label = products[0]?.deployTypeI18n || deployType;
      return {
        key: deployType,
        label: label
      };
    });
  }, [groupedProducts, siteBrand, downloadType]);

  const [tab, setTab] = React.useState(() => tabs[0]?.key || 'BINARY');

  return (
    <div className='w-full bg-white rounded-[16px] p-[50px] shadow-[0_8px_-4px_rgba(16,24,40,0.03),0_20px_-4px_rgba(21,53,126,0.2)] relative'>
      {/* 关闭按钮 - 右上角 */}
      <button 
        className='absolute top-[20px] right-[20px] w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors'
        onClick={onClose}
        style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'transparent' }}>
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M18 6L6 18M6 6L18 18' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
      </button>
      
      {/* 标题 */}
      <div className='text-center text-[24px] font-bold mb-[30px]'>
        {siteBrand === 'clouddm' ? (
          downloadType === 'personal' ? (
            <Translate id='downloadModal.title.personal'>下载 CloudDM 个人版</Translate>
          ) : (
            <Translate id='downloadModal.title.enterprise'>下载 CloudDM 私有部署版</Translate>
          )
        ) : (
          <Translate id='downloadModal.title'>Download On-Premise BladePipe</Translate>
        )}
      </div>
      
      {/* Tab栏 - 撑满整个弹窗宽度 */}
      <div className='flex mb-[30px]' style={{ marginLeft: '-50px', marginRight: '-50px' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`flex-1 h-[60px] text-[16px] font-bold transition-colors duration-200 ${
              tab === t.key 
                ? 'text-black' 
                : 'text-black/70'
            }`}
            onClick={() => setTab(t.key)}
            style={{ 
              background: 'none', 
              border: 'none', 
              outline: 'none',
              borderBottom: tab === t.key ? '2px solid #0087c7' : '1px solid rgba(0,0,0,0.1)'
            }}>
            {t.label}
          </button>
        ))}
      </div>
      
      {/* 内容区 */}
      <div className='flex gap-[24px] justify-center mb-[30px] flex-wrap min-h-[224px]'>
        {(groupedProducts[tab] || []).length > 0 ? (
          (groupedProducts[tab] || []).map((product, index) => {
            // 根据cpuArc决定图标
            const getIcon = (cpuArc: string) => {
              if (cpuArc?.toLowerCase().includes('arm')) {
                return '/img/home/icon/download_arm.svg';
              }
              return '/img/home/icon/download_x86.svg';
            };

            // 根据cpuArc决定按钮文字
            const getButtonText = (cpuArcI18n: string, cpuArc: string) => {
              return translate({ 
                id: 'downloadModal.downloadVersionBtn', 
                message: '{version}' 
              }, { version: cpuArcI18n });
            };

            return (
              <div
                key={`${product.productType}_${index}`}
                className='w-[231px] h-[224px] border border-black/10 rounded-[12px] p-[40px] flex flex-col items-center justify-center cursor-pointer transition-shadow'
                style={{ borderStyle: 'solid', borderWidth: '1px' }}
                onClick={() => onSelectDownload(product.productType)}>
                <img 
                  src={getIcon(product.cpuArc)} 
                  alt={product.cpuArcI18n || product.cpuArc} 
                  className='w-[88px] h-[88px] mb-[16px]' 
                />
                <button className='w-[151px] h-[40px] bg-white border border-[#0087c7] text-[#0087c7] rounded-[8px] text-[16px] font-bold transition hover:bg-[#0087c7] hover:text-white cursor-pointer' style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#0087c7' }}>
                  {getButtonText(product.cpuArcI18n, product.cpuArc)}
                </button>
              </div>
            );
          })
        ) : (
          <div className='w-full flex flex-col items-center justify-center h-[224px]'>
            <div className='text-[16px] text-gray-400 mb-4'>
              <Translate id='downloadModal.noProducts'>No downloadable products available</Translate>
            </div>
            <div className='text-[14px] text-gray-400'>
              <Translate id='downloadModal.contactAdmin'>Please contact administrator or try again later</Translate>
            </div>
          </div>
        )}
      </div>
      
      {/* 安装部署帮助链接 - 仅在企业版显示 */}
      {downloadType !== 'personal' && (
        <div className='text-center mb-[20px]'>
          <a 
            href='/docs/quick/quick_start' 
            className='inline-flex items-center text-[#0087c7] text-[14px] font-medium hover:text-[#0070a6] transition-colors'
            target='_blank'
            rel='noopener noreferrer'>
            <svg 
              width='16' 
              height='16' 
              viewBox='0 0 16 16' 
              fill='none' 
              xmlns='http://www.w3.org/2000/svg' 
              className='mr-[8px]'>
              <path 
                d='M8 1L10.5 5.5L15.5 6L11.75 9.5L12.5 14.5L8 12L3.5 14.5L4.25 9.5L0.5 6L5.5 5.5L8 1Z' 
                fill='#0087c7'/>
            </svg>
            <Translate id='downloadModal.howToInstall'>How to install and deploy?</Translate>
          </a>
        </div>
      )}
      
      {/* 底部协议文字 */}
      <div className='text-center text-black/60 text-[12px]'>
        {siteBrand === 'clouddm' ? (
          downloadType === 'personal' ? (
            <Translate id='downloadModal.agreementPrefix.personal'>在下载 CloudDM 个人版时，您同意 </Translate>
          ) : (
            <Translate id='downloadModal.agreementPrefix.enterprise'>在下载 CloudDM 私有部署版时，您同意 </Translate>
          )
        ) : (
          <Translate id='downloadModal.agreementPrefix'>By downloading BladePipe, you agree to the </Translate>
        )}
        <a href='#' className='underline text-black/60 hover:text-[#0087c7]'>
          <Translate id='downloadModal.termsOfService'>Terms of Service</Translate>
        </a>
      </div>
    </div>
  );
}

// 下载信息卡片组件
function DownloadInfo({ info, type, loading, onClose }: { info: any; type: string; loading?: boolean; onClose: () => void }) {
  // 兼容 loading 或 info 为空
  if (loading) {
    return (
      <div className='w-full bg-white rounded-[16px] p-[50px] shadow-[0_8px_-4px_rgba(16,24,40,0.03),0_20px_-4px_rgba(21,53,126,0.2)] flex flex-col items-center justify-center min-h-[516px]'>
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
  const [copied, setCopied] = useState<string>('');
  
  // 复制逻辑，3秒后恢复
  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1000);
  };

  // 复制图标
  const CopyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.0002 6.46647C11.0002 6.0821 10.9993 5.83375 10.9839 5.64486C10.9691 5.4638 10.944 5.39657 10.9272 5.36361C10.8634 5.23829 10.7615 5.13648 10.6362 5.07259C10.6033 5.0558 10.536 5.03075 10.355 5.01595C10.1661 5.00052 9.91774 4.99967 9.53337 4.99967H4.13363C3.74926 4.99967 3.50091 5.00052 3.31201 5.01595C3.13096 5.03075 3.06372 5.0558 3.03076 5.07259C2.90545 5.13648 2.80364 5.23829 2.73975 5.36361C2.72296 5.39657 2.69791 5.4638 2.68311 5.64486C2.66768 5.83375 2.66683 6.0821 2.66683 6.46647V11.8662C2.66683 12.2506 2.66768 12.4989 2.68311 12.6878C2.69791 12.8689 2.72296 12.9361 2.73975 12.9691C2.80364 13.0944 2.90545 13.1962 3.03076 13.2601C3.06372 13.2769 3.13096 13.3019 3.31201 13.3167C3.50091 13.3322 3.74926 13.333 4.13363 13.333H9.53337C9.91774 13.333 10.1661 13.3322 10.355 13.3167C10.536 13.3019 10.6033 13.2769 10.6362 13.2601C10.7615 13.1962 10.8634 13.0944 10.9272 12.9691C10.944 12.9361 10.9691 12.8689 10.9839 12.6878C10.9993 12.4989 11.0002 12.2506 11.0002 11.8662V6.46647ZM13.3335 10.9997V6.2666C13.3335 5.50898 13.3332 4.98054 13.2996 4.56934C13.2667 4.16589 13.2049 3.93371 13.1154 3.75814C12.9237 3.38199 12.6179 3.07616 12.2417 2.88444C12.0661 2.79498 11.8339 2.73316 11.4305 2.7002C11.0193 2.66661 10.4909 2.66634 9.73324 2.66634H5.00017C4.63198 2.66634 4.3335 2.36786 4.3335 1.99968C4.3335 1.63149 4.63198 1.33301 5.00017 1.33301H9.73324C10.469 1.33301 11.0611 1.33236 11.5392 1.37142C12.025 1.41111 12.4517 1.49518 12.8465 1.69629C13.4737 2.01587 13.984 2.52611 14.3036 3.15332C14.5047 3.54812 14.5887 3.97481 14.6284 4.46061C14.6675 4.93872 14.6668 5.53088 14.6668 6.2666V10.9997C14.6668 11.3679 14.3684 11.6663 14.0002 11.6663C13.632 11.6663 13.3335 11.3679 13.3335 10.9997ZM12.3335 11.8662C12.3335 12.2286 12.3342 12.5408 12.3133 12.7965C12.2918 13.0601 12.2439 13.3223 12.1154 13.5745C11.9237 13.9507 11.6179 14.2565 11.2417 14.4482C10.9895 14.5767 10.7272 14.6246 10.4637 14.6462C10.2079 14.6671 9.89574 14.6663 9.53337 14.6663H4.13363C3.77126 14.6663 3.45907 14.6671 3.20329 14.6462C2.93979 14.6246 2.67749 14.5767 2.4253 14.4482C2.04915 14.2565 1.74331 13.9507 1.5516 13.5745C1.4231 13.3223 1.37522 13.0601 1.35368 12.7965C1.33278 12.5408 1.3335 12.2286 1.3335 11.8662V6.46647C1.3335 6.1041 1.33278 5.79191 1.35368 5.53613C1.37522 5.27263 1.4231 5.01034 1.5516 4.75814C1.74331 4.38199 2.04915 4.07616 2.4253 3.88444C2.67749 3.75594 2.93979 3.70806 3.20329 3.68652C3.45907 3.66563 3.77126 3.66634 4.13363 3.66634H9.53337C9.89574 3.66634 10.2079 3.66563 10.4637 3.68652C10.7272 3.70806 10.9895 3.75594 11.2417 3.88444C11.6179 4.07616 11.9237 4.38199 12.1154 4.75814C12.2439 5.01034 12.2918 5.27263 12.3133 5.53613C12.3342 5.79191 12.3335 6.1041 12.3335 6.46647V11.8662Z" fill="#0087C7"/>
    </svg>
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
      alt="下载" 
      className="w-4 h-4" 
      style={{ width: '16px', height: '16px' }}
    />
  );

  // 勾选图标
  const CheckIcon = () => (
    <img 
      src="/img/home/icon/check.svg" 
      alt="成功" 
      className="w-4 h-4" 
      style={{ width: '16px', height: '16px' }}
    />
  );

  // 关闭图标
  const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
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
    <div className='w-full max-w-[640px] bg-white rounded-[16px] p-[50px] shadow-[0_8px_-4px_rgba(16,24,40,0.03),0_20px_-4px_rgba(21,53,126,0.2)] relative overflow-hidden'>
      {/* 关闭按钮 - 右上角 */}
      <button 
        className='absolute top-[20px] right-[20px] w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors'
        onClick={onClose}
        style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'transparent' }}>
        <CloseIcon />
      </button>
      
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
      
      {/* 直接下载按钮 */}
      <button
        className='w-full h-[40px] bg-[#0087c7] rounded-[8px] flex items-center justify-center text-white text-[16px] font-bold hover:bg-[#0070a6] transition-colors'
        style={{ border: 'none', outline: 'none' }}
        onClick={() => {
          const link = document.createElement('a');
          link.href = url;
          const linkArr = url.split('/');
          link.setAttribute('download', linkArr[linkArr.length - 1]);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}>
        <span className='mr-[10px]'>
          <Translate id='downloadModal.directDownload'>Download</Translate>
        </span>
        <DownloadIcon />
      </button>
    </div>
  );
} 