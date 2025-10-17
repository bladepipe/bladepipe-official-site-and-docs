import React from 'react';
import Layout from '@theme/Layout';
import Navbar from '@site/src/components/Navbar';
import Footer from '@site/src/components/Footer';
import FadeInSection from '@site/src/components/FadeInSection';
import { getApiBaseUrl } from '@site/src/utils/api';
import { loginCheckAndRedirect } from '@site/src/utils';
import { isUserLogin } from '@site/src/store/user';
import { listDownloadProduct } from '@site/src/apis/constant';
import DownloadModal from '@site/src/components/DownloadModal';
import { Dropdown } from 'antd';
import Translate from '@docusaurus/Translate';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from '@docusaurus/Link';
import { useState } from 'react';
import BlogCardGrid from '@site/src/components/BlogCardGrid';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// @ts-ignore
import dmBlogListData from '../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

// 数据源配置
const dataSources = [
  { name: 'MySQL', icon: 'MySQL' },
  { name: 'Oracle', icon: 'Oracle' },
  { name: 'MariaDB', icon: 'MariaDB' },
  { name: 'PostgreSQL', icon: 'PostgreSQL' },
  { name: 'IBM Db2', icon: 'Db2' },
  { name: 'Gitee', icon: 'Gitee' },
  { name: 'SQL Server', icon: 'SQLServer' },
  { name: 'OceanBase', icon: 'OceanBase' },
  { name: 'PolarDB-X', icon: 'PolarDbX' },
  { name: 'TiDB', icon: 'TiDB' },
  { name: 'Greenplum', icon: 'Greenplum' },
  { name: 'Jenkins', icon: 'Jenkins' }
];

// 合作伙伴配置
const partners = [
  { name: '阿里云', icon: 'aliyun' },
  { name: '华为云', icon: 'huaweiyun' },
  { name: 'Azure', icon: 'Azure' },
  { name: 'AWS', icon: 'Aws' }
];

// 使用场景配置
const useScenes = [
  {
    id: 'scene1',
    title: '统一数据库访问',
    description: '多种数据源一站式访问，通过基于角色和资源的细粒度权限控制，实现多维度授权管理，无需暴露账号密码。',
    image: '/img/clouddm/scene/scene1.svg',
    url: ''
  },
  {
    id: 'scene2',
    title: 'GitOps & DataBase CI/CD',
    description: '将数据库变更发布与应用发布的流程整合，无论是通过DevOps Pipeline 还是例如 Jenkins 任务，都可以实现两个步骤的无缝衔接，从而显著提升生产效率。',
    image: '/img/clouddm/scene/scene2.svg',
    url: '/docs/devops/devops_about'
  },
  {
    id: 'scene3',
    title: '标准化工单流程',
    description: '通过工单系统管理所有数据库的变更操作，审核每一条将要执行的 SQL 语句确保符合流程情况下对关键数据库的保护。',
    image: '/img/clouddm/scene/scene3.svg',
    url: '/docs/approval/approval_about'
  },
  {
    id: 'scene4',
    title: '多种数据源统一管理',
    description: '您的组织常使用多种类型的数据库，CloudDM Team 支持统一管理这些数据源，并提供可视化工具以便于创建和编辑数据库对象。',
    image: '/img/clouddm/scene/scene4.svg',
    url: ''
  },
  {
    id: 'scene5',
    title: 'SQL 开发规范',
    description: '基于自主研发的 Rule Script 规则脚本引擎，可以灵活制定 SQL 代码检查规则，用于识别反模式并确保组织内 SQL 代码风格的一致性。',
    image: '/img/clouddm/scene/scene5.svg',
    url: '/blog/data_management/database_sql_policy'
  },
  {
    id: 'scene6',
    title: '敏感数据保护',
    description: '基于脱敏规则、权限和有效范围的设定，可以根据上下文对 SQL 编辑器查询结果中的敏感数据进行掩蔽处理。它有助于企业保护敏感数据不被未授权用户获取。',
    image: '/img/clouddm/scene/scene6.svg',
    url: '/blog/data_management/data_masking_in_minutes'
  }
];

export default function CloudDM() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  
  const [activeScene, setActiveScene] = React.useState('scene1');
  
  // 下载相关状态
  const [downloadModalVisible, setDownloadModalVisible] = React.useState(false);
  const [downloadLoading, setDownloadLoading] = React.useState(false);
  const [downloadProducts, setDownloadProducts] = useState([]);
  const [downloadType, setDownloadType] = useState<'enterprise' | 'personal'>('enterprise');
  
  // 用户引导模块背景滚动动画状态
  
  const [offsetY, setOffsetY] = React.useState(0);
  const [section, setSection] = React.useState(false);
  const userGuideRef = React.useRef(null);
  
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

  // 近期 Blog 数据 - 从 dmBlog 文件夹动态获取
  // 过滤出 dmBlog 的内容（permalink 以 /blog/ 开头）
  const dmBlogItems = dmBlogListData.items.filter((item: any) => 
    item.permalink.startsWith('/blog/')
  );
  
  const latestBlogs = dmBlogItems.slice(0, 3).map((item: any) => {
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
  });
  const startScrollY = React.useRef<number | null>(null);
  const startOffset = 500;

  // Download 按钮点击逻辑
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
        orderProductType: 'CloudDM'
      });
      console.log('Download products:', response);
      // 保存接口返回的产品数据
      setDownloadProducts(response?.data || response || []);
      // 接口调用成功后显示下载弹窗
      setDownloadModalVisible(true);
    } catch (error) {
      console.error('获取下载产品列表失败:', error);
      // 可以在这里添加错误提示，比如使用 message 或 notification
      alert('Failed to get download information, please try again later');
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
      console.error('获取下载产品列表失败:', error);
      // 可以在这里添加错误提示，比如使用 message 或 notification
      alert('Failed to get download information, please try again later');
    } finally {
      setDownloadLoading(false);
    }
  };

  // 查看个人版版本信息
  const handleViewPersonalVersion = () => {
    // 跳转到个人版版本信息页面
    window.location.href='/docs/releasenote_personal/desktop_latest';
  };

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

  // 用户引导模块背景滚动动画效果
  React.useEffect(() => {
    if (!userGuideRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSection(true);
            if (startScrollY.current === null) {
              startScrollY.current = window.scrollY;
            }
          } else {
            setSection(false);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(userGuideRef.current);

    const handleScroll = () => {
      if (section && startScrollY.current !== null) {
        const relativeY = window.scrollY - startScrollY.current;
        setOffsetY(relativeY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [section]);

  return (
    <Layout>
      <div className="w-full bg-white">
        {/* Banner 部分 */}
        <FadeInSection>
          <section className="w-full min-h-[560px] bg-gradient-to-b from-white to-[#eaf6ff] flex justify-center items-center py-[37px] px-4">
            <div className="w-full max-w-[1320px] flex flex-col lg:flex-row gap-[32px] lg:gap-[40px] justify-center items-center">
              {/* 左侧内容区域 */}
              <div className="w-full lg:w-[560px] h-auto lg:h-[396px] flex flex-col gap-[32px] lg:gap-[50px] justify-start items-start">
                {/* 标题区域 */}
                <div className="w-full lg:w-[560px] h-auto lg:h-[218px] flex flex-col gap-[20px] lg:gap-[26px] justify-start items-start">
                  <h1 className="w-full lg:w-[560px] h-auto lg:h-[136px] text-[32px] sm:text-[40px] lg:text-[60px] font-bold leading-[110%] lg:leading-[68px] text-black font-['PingFang SC'] m-0">
                    一站式多数据源开发管理工具
                  </h1>
                  <p className="w-full lg:w-[467px] h-auto lg:h-[56px] text-[16px] lg:text-[18px] font-medium leading-[24px] lg:leading-[28px] text-black opacity-80 font-['PingFang SC'] m-0">
                    安全的数据访问，一键串联数据库变更与应用发布，简化流程，提升生产力
                  </p>
                </div>

                {/* 按钮区域 */}
                <div className="w-full lg:w-[397px] h-auto lg:h-[54px] flex flex-col sm:flex-row gap-[16px] justify-start items-start lg:items-center">
                  {/* 下载安装按钮 - 与首页 Try Cloud Free 保持一致 */}
                  <button 
                    className={`cursor-pointer h-[48px] lg:h-[54px] flex items-center justify-center gap-[10px] rounded-full bg-[#0087c7] text-white text-[14px] lg:text-[16px] font-bold font-['Plus Jakarta Sans'] px-[20px] lg:px-[30px] py-[12px] lg:py-[15px] shadow-none border-none transition hover:bg-[#0070a6] focus:outline-none w-full sm:w-auto whitespace-nowrap ${
                      downloadLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    style={{ boxShadow: '0px 2px 8px 0px rgba(0,135,199,0.10)' }}
                    onClick={handleDownloadClick}
                  >
                    <span>{downloadLoading ? 'Loading...' : '下载安装'}</span>
                    <img src="/img/clouddm/icon/download.svg" alt="Download" className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
                  </button>

                  {/* 免费获取许可证按钮 - 与下载安装按钮样式保持一致 */}
                  <button 
                    className="cursor-pointer h-[48px] lg:h-[54px] flex items-center justify-center gap-[10px] rounded-full bg-[#0087c7] text-white text-[14px] lg:text-[16px] font-bold font-['Plus Jakarta Sans'] px-[20px] lg:px-[30px] py-[12px] lg:py-[15px] shadow-none border-none transition hover:bg-[#0070a6] focus:outline-none w-full sm:w-auto whitespace-nowrap"
                    style={{ boxShadow: '0px 2px 8px 0px rgba(0,135,199,0.10)' }}
                    onClick={(e) => {
                      e.preventDefault();
                      loginCheckAndRedirect(() => {
                        window.location.href = getApiBaseUrl() + '/#/system/license';
                      }, 'get_free_license');
                    }}
                  >
                    <span>免费获取许可证</span>
                  </button>

                  {/* 快速开始按钮 - 与首页 Quick Start 保持一致 */}
                  <button 
                    className="cursor-pointer h-[48px] lg:h-[54px] flex items-center justify-center gap-[10px] rounded-full border border-1 border-solid border-[#0087c7] text-[#0087c7] text-[14px] lg:text-[16px] font-bold font-['Plus Jakarta Sans'] bg-white px-[20px] lg:px-[36px] py-[12px] lg:py-[15px] shadow-none transition hover:bg-[#f0faff] focus:outline-none w-full sm:w-auto whitespace-nowrap"
                    style={{ boxShadow: '0px 2px 8px 0px rgba(0,135,199,0.10)' }}
                    onClick={() => window.location.href='/docs/quick/quick_start'}
                  >
                    <span>快速开始</span>
                  </button>

                  {/* 更多按钮 */}
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'personal-download',
                          label: (
                            <Link 
                              to="#" 
                              className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePersonalDownload();
                              }}
                            >
                              <Translate id="clouddm.more.downloadPersonal">下载 CloudDM个人版</Translate>
                            </Link>
                          ),
                        },
                        {
                          key: 'personal-version',
                          label: (
                            <Link 
                              to="#" 
                              className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                handleViewPersonalVersion();
                              }}
                            >
                              <Translate id="clouddm.more.viewPersonalVersion">查看个人版版本信息</Translate>
                            </Link>
                          ),
                        },
                      ],
                    }}
                    placement="bottomLeft"
                    trigger={['click']}
                    overlayClassName="navbar-dropdown"
                    destroyPopupOnHide={true}
                    getPopupContainer={(trigger) => trigger.parentElement || document.body}
                  >
                    <div className="w-full sm:w-auto h-[48px] lg:h-[54px] flex justify-center lg:justify-start items-center px-[8px] cursor-pointer whitespace-nowrap hover:opacity-70 transition-opacity">
                      <span className="text-black opacity-80 text-[14px] lg:text-[16px] font-bold leading-[24px] font-['Plus Jakarta Sans'] flex items-center">
                        <Translate id="clouddm.more">更多</Translate>
                      </span>
                      <ChevronDownIcon className="w-4 h-4 ml-1 flex-shrink-0 text-black opacity-80" />
                    </div>
                  </Dropdown>
                </div>
              </div>

              {/* 右侧图片区域 */}
              <div className="w-full lg:w-[779px] h-[200px] lg:h-[396px] flex justify-center items-center">
                <img 
                  src="/img/clouddm/banner.svg" 
                  alt="CloudDM Banner" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 产品特性模块 */}
        <FadeInSection>
          <section className="w-full bg-white py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-9">
                {/* 特性卡片 1: 数据库访问 */}
                <div className="flex flex-col h-full">
                  <div className="bg-white border-[1px] border-solid border-[#afd1f2] rounded-xl p-6 lg:p-8 mb-6 lg:mb-8 h-[400px] flex items-center justify-center">
                    <img 
                      src="/img/clouddm/feature1.svg" 
                      alt="数据库访问" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-4 lg:px-5 flex-1 flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#131314] mb-3 lg:mb-4">
                      数据库访问
                    </h3>
                    <p className="text-sm lg:text-base text-black/80 leading-6 mb-6 lg:mb-8 flex-1">
                      简洁而强大的数据库访问IDE，集成了可视化数据库对象管理、智能代码提示、及基于角色和资源的细粒度权限控制。
                    </p>
                    <div className="flex items-center text-[#0087c7] text-sm lg:text-base font-medium cursor-pointer hover:text-[#0070a6]transition-colors">
                      <a href="/blog/data_management/team_use_database_challenges" className="flex items-center text-[#0087c7] hover:text-[#0070a6]">
                        <span>查看更多功能细节</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 25" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 20.5733C10.9024 20.1828 10.9024 19.5496 11.2929 19.1591L16.5858 13.8662L5 13.8662C4.44772 13.8662 4 13.4185 4 12.8662C4 12.3139 4.44772 11.8662 5 11.8662L16.5858 11.8662L11.2929 6.57332C10.9024 6.18279 10.9024 5.54963 11.2929 5.1591C11.6834 4.76858 12.3166 4.76858 12.7071 5.1591L19.7071 12.1591C20.0976 12.5496 20.0976 13.1828 19.7071 13.5733L12.7071 20.5733C12.3166 20.9638 11.6834 20.9638 11.2929 20.5733Z" fill="currentColor"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 特性卡片 2: 数据库 CI/CD */}
                <div className="flex flex-col h-full">
                  <div className="bg-white border-[1px] border-solid border-[#afd1f2] rounded-xl px-2 pt-6 mb-6 lg:mb-8 h-[400px] flex items-center justify-center">
                    <img 
                      src="/img/clouddm/feature2.svg" 
                      alt="数据库 CI/CD" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-4 lg:px-5 flex-1 flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#131314] mb-3 lg:mb-4">
                      数据库 CI/CD
                    </h3>
                    <p className="text-sm lg:text-base text-black/80 leading-6 mb-6 lg:mb-8 flex-1">
                      无论是通过 pipeline 还是 CLI，使用 CloudDM都能灵活组装、简化应用发布流程，涵盖 SQL 检查、审查及变更执行。
                    </p>
                    <div className="flex items-center text-[#0087c7] text-sm lg:text-base font-medium cursor-pointer hover:text-[#0070a6] transition-colors">
                      <a href="/docs/devops/devops_about" className="flex items-center text-[#0087c7] hover:text-[#0070a6]">
                        <span>查看更多功能细节</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 25" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 20.5733C10.9024 20.1828 10.9024 19.5496 11.2929 19.1591L16.5858 13.8662L5 13.8662C4.44772 13.8662 4 13.4185 4 12.8662C4 12.3139 4.44772 11.8662 5 11.8662L16.5858 11.8662L11.2929 6.57332C10.9024 6.18279 10.9024 5.54963 11.2929 5.1591C11.6834 4.76858 12.3166 4.76858 12.7071 5.1591L19.7071 12.1591C20.0976 12.5496 20.0976 13.1828 19.7071 13.5733L12.7071 20.5733C12.3166 20.9638 11.6834 20.9638 11.2929 20.5733Z" fill="currentColor"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 特性卡片 3: 数据脱敏 */}
                <div className="flex flex-col h-full">
                  <div className="bg-white border-[1px] border-solid border-[#afd1f2] rounded-xl p-6 lg:p-8 mb-6 lg:mb-8 h-[400px] flex items-center justify-center">
                    <img 
                      src="/img/clouddm/feature3.svg" 
                      alt="数据脱敏" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-4 lg:px-5 flex-1 flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#131314] mb-3 lg:mb-4">
                      数据脱敏
                    </h3>
                    <p className="text-sm lg:text-base text-black/80 leading-6 mb-6 lg:mb-8 flex-1">
                      基于规则的数据脱敏技术，通过结合数据、权限、自定义算法以及策略脚本代码的设定，有效保护敏感信息。
                    </p>
                    <div className="flex items-center text-[#0087c7] text-sm lg:text-base font-medium cursor-pointer hover:text-[#0070a6] transition-colors">
                      <a href="/blog/data_management/data_masking_in_minutes" className="flex items-center text-[#0087c7] hover:text-[#0070a6]">
                        <span>查看更多功能细节</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 25" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 20.5733C10.9024 20.1828 10.9024 19.5496 11.2929 19.1591L16.5858 13.8662L5 13.8662C4.44772 13.8662 4 13.4185 4 12.8662C4 12.3139 4.44772 11.8662 5 11.8662L16.5858 11.8662L11.2929 6.57332C10.9024 6.18279 10.9024 5.54963 11.2929 5.1591C11.6834 4.76858 12.3166 4.76858 12.7071 5.1591L19.7071 12.1591C20.0976 12.5496 20.0976 13.1828 19.7071 13.5733L12.7071 20.5733C12.3166 20.9638 11.6834 20.9638 11.2929 20.5733Z" fill="currentColor"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 数据源列表模块 */}
        <FadeInSection>
          <section className="w-full bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* 标题 */}
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-black leading-[50px] font-['PingFang SC']">
                  丰富的数据源支持
                </h2>
              </div>
              
              {/* 数据源图标网格 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 mb-28">
                                  {dataSources.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-[84px] h-[84px] bg-white border border-solid border-gray-200 rounded-full shadow-lg flex items-center justify-center p-5 mb-2">
                        <svg className="icon-v2 w-10 h-10" aria-hidden="true">
                          <use xlinkHref={`#icon-v2-${item.icon}`} />
                        </svg>
                      </div>
                      <span className="text-sm text-[#262a2b] font-medium">{item.name}</span>
                    </div>
                  ))}
              </div>
              
              {/* 合作伙伴 Logo */}
              <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-30">
                {partners.map((partner, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <svg className="icon-v2 w-[116px] h-[26px] lg:w-[108px] lg:h-[38px]" aria-hidden="true">
                      <use xlinkHref={`#icon-v2-${partner.icon}`} />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 使用场景模块 */}
        <FadeInSection>
          <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* 标题 */}
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-black leading-[60px] font-['PingFang SC']">
                  使用场景
                </h2>
              </div>
              
              {/* 内容区域 */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-9">
                {/* 左侧选项列表 */}
                <div className="w-full lg:w-[460px] bg-white rounded-xl">
                  {useScenes.map((scene, idx) => (
                    <div key={scene.id} className="relative">
                      {/* 主要场景项 */}
                      <div 
                        className={`cursor-pointer transition-all duration-300 border-b border-t-0 border-x-0 border-solid border-gray-200 relative ${
                          activeScene === scene.id ? 'bg-white' : 'bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveScene(scene.id)}
                      >
                        {/* 展开状态的蓝色底部边框 - 只显示前面一半 */}
                        {activeScene === scene.id && (
                          <div className="absolute bottom-0 left-0 w-1/2 h-[1px] bg-[#0087c7]"></div>
                        )}
                        <div className={`${activeScene === scene.id ? 'py-5' : 'h-11 flex items-center'}`}>
                          <div className="flex items-center justify-between w-full">
                            <h3 className={`text-[16px] font-bold mb-0 ${
                              activeScene === scene.id ? 'text-[#0087c7]' : 'text-black'
                            }`}>
                              {scene.title}
                            </h3>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${
                              activeScene === scene.id ? 'rotate-90' : 'rotate-0'
                            }`} viewBox="0 0 16 16" fill="none">
                              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          
                          {/* 描述文字 - 只在选中时显示 */}
                          {activeScene === scene.id && (
                            <p className="text-sm text-black/80 leading-6 mt-4">
                              {scene.description}
                            </p>
                          )}
                          
                          {/* 查看更多按钮 - 只在选中时显示 */}
                          {activeScene === scene.id && scene.url && (
                            <div className="mt-4">
                              <a 
                                href={scene.url}
                                className="inline-block bg-white border border-solid border-black/20 rounded-full px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-50 transition-colors"
                              >
                                查看更多功能细节
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 右侧场景图片卡片 */}
                <div className="w-full lg:w-[824px] h-[480px] bg-gradient-to-br from-white to-[#eaf6ff] border-[1px] border-solid border-[#afd1f2] rounded-xl p-6 lg:p-8 flex items-center justify-center">
                  <img 
                    src={useScenes.find(scene => scene.id === activeScene)?.image || '/img/clouddm/scene/scene1.svg'} 
                    alt="使用场景" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 用户引导模块 */}
        <FadeInSection>
          <section 
            ref={userGuideRef}
            className="w-full min-h-[416px] flex justify-center items-center bg-gradient-to-b from-[#0064c7] to-[#0087c7] py-24 relative overflow-hidden"
          >
            {/* 背景图层1 */}
            <div
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              style={{
                backgroundImage: 'url(/img/home/guideBack.svg)',
                backgroundRepeat: 'repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                transform: `translateY(${startOffset - offsetY}px)`,
                willChange: 'transform',
                transition: 'transform 0.1s linear'
              }}
            />

            {/* 背景图层2 */}
            <div
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              style={{
                backgroundImage: 'url(/img/home/guideBack.svg)',
                backgroundRepeat: 'repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                transform: `translateY(${startOffset - offsetY * 0.5}px)`,
                willChange: 'transform',
                transition: 'transform 0.1s linear',
                opacity: 0.5
              }}
            />

            {/* 主体内容 */}
            <div className="w-[1320px] flex flex-col items-center justify-center gap-12 relative z-10">
              <div className="flex flex-col items-center gap-5">
                <h2 className="text-[48px] font-bold leading-[60px] text-white text-center font-['Plus Jakarta Sans']">
                  即刻感受团队化的数据库访问方式，<br />
                  更安全，更自动化
                </h2>
              </div>

              {/* 按钮区 */}
              <div className="flex flex-row gap-6 mt-8">
                {/* 下载安装按钮 */}
                <button 
                  className={`cursor-pointer h-[54px] px-7 py-[15px] flex items-center gap-3 rounded-full bg-white text-[#0087c7] text-[16px] font-bold font-['Plus Jakarta Sans'] shadow-none border-none transition hover:bg-[f0faff] focus:outline-none min-w-fit w-auto ${
                    downloadLoading ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  style={{ boxShadow: '0px 2px 8px 0px rgba(0,135,199,0.10)' }}
                  onClick={handleDownloadClick}
                >
                  <span>{downloadLoading ? 'Loading...' : <Translate id="clouddm.userGuide.downloadInstall">下载安装</Translate>}</span>
                </button>

                {/* 快速开始按钮 */}
                <button 
                  className="cursor-pointer h-[54px] px-7 py-[15px] flex items-center gap-3 rounded-full border border-1 border-solid border-white/60 text-white text-[16px] font-bold font-['Plus Jakarta Sans'] bg-transparent shadow-none transition hover:bg-white/10 focus:outline-none min-w-fit w-auto"
                  style={{ boxShadow: '0px 2px 8px 0px rgba(255,255,255,0.10)' }}
                  onClick={() => window.open('/docs/quick/quick_start')}
                >
                  <span><Translate id="clouddm.userGuide.quickStart">快速开始</Translate></span>
                </button>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 近期 Blog 模块 - 当 siteBrand 不为 clougence 时显示 */}
        {siteBrand !== 'clougence' && (
          <FadeInSection>
            <section className="w-full py-24 flex flex-col items-center bg-white">
              <div className="w-full max-w-[1728px] mx-auto px-4 md:px-8 flex flex-col items-center gap-16">
                {/* 标题区 */}
                <div className="flex flex-col items-center gap-3 mb-6">
                  <h2 className="text-[40px] font-bold text-black leading-[50px] text-center">了解更多</h2>
                  <div className="text-[18px] text-[#26272B] leading-[28px] font-medium text-center">发现 CloudDM 的更多可能性</div>
                </div>
                {/* 博客卡片区 */}
                <BlogCardGrid blogs={latestBlogs} className="max-w-[1320px]" />
              </div>
            </section>
          </FadeInSection>
        )}
        
        {/* 下载弹窗 */}
        <DownloadModal
          visible={downloadModalVisible}
          onClose={() => setDownloadModalVisible(false)}
          downloadProducts={downloadProducts}
          downloadType={downloadType}
        />
        
        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
}
