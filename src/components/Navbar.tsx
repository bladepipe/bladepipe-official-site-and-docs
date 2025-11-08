import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Dropdown } from 'antd';
import { MenuProps } from 'antd';
import Link from '@docusaurus/Link';
import { getCloudUrl } from '@site/src/utils/api';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory, useLocation } from '@docusaurus/router';
import Translate, { translate } from '@docusaurus/Translate';
import { loginCheckAndRedirect } from '@site/src/utils';
import { useUserStore } from '@site/src/store/user';
import { isUserLogin } from '@site/src/store/user';

export default function Navbar() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  const logoSrc = siteBrand === 'clougence' ? '/img/home/CloudCanal.svg' : siteBrand === 'clouddm' ? '/img/home/CloudDM.svg' : '/img/home/BladePipe.png';
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  // const [SearchBarComponent, setSearchBarComponent] = useState<any>(null);
  //
  // // 动态加载 SearchBar
  // useEffect(() => {
  //   import('@theme/SearchBar')
  //     .then((module) => {
  //       setSearchBarComponent(() => module.default);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to load SearchBar:', error);
  //       setSearchBarComponent(() => null);
  //     });
  // }, []);
  const [activeNav, setActiveNav] = useState(''); // 初始为空，根据路径自动设置
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // 获取用户信息
  const userInfo = useUserStore((state) => state.userInfo);
  const logout = useUserStore((state) => state.logout);
  const isLoggedIn = isUserLogin();

  // 用户下拉菜单配置
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'usercenter',
      label: (
        <a href={`${getCloudUrl()}/#/system/profile`} rel="noopener noreferrer" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 transition-colors">
          <span className="text-[16px] font-medium">
            <Translate id="navbar.userCenter">Profile</Translate>
          </span>
        </a>
      ),
    },
    {
      key: 'billing',
      label: (
        <a
          href={siteBrand === 'clouddm' ? `${getCloudUrl()}/#/system/order` : `${getCloudUrl()}/#/system/billing`}
          rel="noopener noreferrer"
          className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <span className="text-[16px] font-medium">
            {siteBrand === 'clouddm' ? (
              <Translate id="navbar.myOrder">My Order</Translate>
            ) : (
              <Translate id="navbar.myBilling">My Billing</Translate>
            )}
          </span>
        </a>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <a
          onClick={logout}
          className="w-full flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 transition-colors text-left"
        >
          <span className="text-[16px] font-medium text-red-600">
            <Translate id="navbar.logout">Log out</Translate>
          </span>
        </a>
      ),
    },
  ];

  // 根据当前路径自动设置选中的导航项
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === '/' || pathname.startsWith('/product') || pathname.startsWith('/why') || pathname.startsWith('/connector')) {
      setActiveNav('product');
    } else if (pathname.startsWith('/solution')) {
      setActiveNav('solutions');
    } else if (pathname.startsWith('/blog') || pathname.startsWith('/docs')) {
      setActiveNav('resources');
    } else if (pathname.startsWith('/pricing')) {
      setActiveNav('pricing');
    } else if (pathname.startsWith('/about')) {
      setActiveNav('about');
    } else {
      setActiveNav(''); // 其他页面不选中任何导航项
    }
  }, [location.pathname]);

  // 监听页面滚动，实现吸顶效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 10); // 滚动超过10px时激活吸顶效果
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      {/* 占位容器 - 当 navbar fixed 时防止页面跳跃 */}
      {isScrolled && <div className="w-full h-[70px]" />}

      <nav className={`navbar w-full h-[70px] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-5 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'fixed top-0 left-0 right-0 shadow-lg navbar-blur' 
          : 'relative bg-white'
      }`}>
      {/* 左侧 Logo 区域 */}
        <div className='flex items-center gap-12 h-full min-w-[220px] flex-shrink-0'>
        <Link to='/' className='flex items-center h-full'>
          <img src={logoSrc} alt='Logo' className={`${siteBrand === 'bladepipe' ? 'w-[220px] h-[48px]' : siteBrand === 'clouddm' ? 'h-[30px]' : 'w-[180px] h-[40px]'} object-contain`} />
        </Link>
      </div>
      {/* 移动端右侧按钮区 */}
      <div className='xl:hidden flex items-center gap-2 ml-auto'>
        {/*/!* 搜索图标（移动端） *!/*/}
        {/*{SearchBarComponent && <SearchBarComponent />}*/}

        {/* 汉堡按钮 */}
        <button
          className='flex items-center justify-center w-[38px] h-[38px] rounded-lg p-2 hover:bg-gray-100 transition-colors border-0 outline-none focus:outline-none'
          onClick={() => setMobileOpen((v) => !v)}
          aria-label='Open menu'
        >
          {mobileOpen ? (
            <img src="/img/home/icon/close.svg" alt="Close" className='w-[22px] h-[22px]' />
          ) : (
            <img src="/img/home/icon/expand.svg" alt="Menu" className='w-[22px] h-[22px]' />
          )}
        </button>
      </div>
      {/* 中间导航栏 - 使用flex布局，自动隐藏溢出项（大屏显示） */}
      <div className='hidden xl:flex items-center justify-center gap-2 xl:gap-4 ml-4 xl:ml-8 flex-1 min-w-0 overflow-hidden'>
        {/* Product 下拉 - clouddm 时显示为简单链接 */}
        {siteBrand === 'clouddm' ? (
          <Link to="/" className="no-underline flex-shrink-0" onClick={() => setActiveNav('product')}>
            <div
              data-menu-item
              className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full cursor-pointer transition-all duration-200 ${
                activeNav === 'product' 
                  ? 'bg-[#0087c7]/10 px-[20px]' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#262728]">
                <Translate id="navbar.home">首页</Translate>
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex-shrink-0">
            <Dropdown
              menu={{
                items: siteBrand === 'clougence' ? [
                {
                  key: 'cloudcanal',
                  label: (
                    <Link
                      to="/"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('product')}
                    >
                      <Translate id="navbar.whatIsCloudcanal">What is CloudCanal</Translate>
                    </Link>
                  ),
                },
                {
                  key: 'why-cloudcanal',
                  label: (
                    <Link
                      to="/why"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('product')}
                    >
                      <Translate id="navbar.whyCloudcanal">Why CloudCanal</Translate>
                    </Link>
                  ),
                },
                {
                  key: 'connectors',
                  label: (
                    <Link
                      to="/connector"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('product')}
                    >
                      <Translate id="navbar.connectors">Data Sources</Translate>
                    </Link>
                  ),
                },
              ] : [
                {
                  key: 'bladepipe',
                  label: (
                    <Link
                      to="/"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('product')}
                    >
                      <Translate id="navbar.bladepipe">BladePipe</Translate>
                    </Link>
                  ),
                },
                {
                  key: 'why-bladepipe',
                  label: (
                    <Link
                      to="/why"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('product')}
                    >
                      <Translate id="navbar.whyBladepipe">Why BladePipe</Translate>
                    </Link>
                  ),
                },
                {
                  key: 'connectors',
                  label: (
                    <Link
                      to="/connector"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('product')}
                    >
                      <Translate id="navbar.connectors">Connectors</Translate>
                    </Link>
                  ),
                },
                ],
              }}
              trigger={['hover']}
              placement="bottomLeft"
              overlayClassName="navbar-dropdown"
              destroyPopupOnHide={true}
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
            >
              <div
                data-menu-item
                className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full gap-1 cursor-pointer transition-all duration-200 ${
                  activeNav === 'product' 
                    ? 'bg-[#0087c7]/10 px-[20px]' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveNav('product')}
              >
                <span className="text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#262728]">
                  <Translate id="navbar.product">Product</Translate>
                </span>
                <ChevronDownIcon className="ml-[6px] w-4 h-4 text-[#262728]" />
              </div>
            </Dropdown>
          </div>
        )}
        {/* Solutions 下拉 */}
        <div className="flex-shrink-0">
          <Dropdown
            menu={{
              items: siteBrand === 'clouddm' ? [
                {
                  key: 'team-database-collaboration',
                  label: (
                    <Link
                      to="/clouddm_solution"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('solutions')}
                    >
                      <Translate id="navbar.teamDatabaseCollaboration">团队数据库协作</Translate>
                    </Link>
                  ),
                },
              ] : siteBrand === 'clougence' ? [
                {
                  key: 'solution1',
                  label: (
                    <Link
                      to="/solution1"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('solutions')}
                    >
                      <Translate id="navbar.realtimeAnalytics">Real-time Analytics</Translate>
                    </Link>
                  ),
                },
                {
                  key: 'solution2',
                  label: (
                    <Link
                      to="/solution2"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('solutions')}
                    >
                      <Translate id="navbar.aiRag">AI & RAG</Translate>
                    </Link>
                  ),
                },
              ] : [
                {
                  key: 'solution1',
                  label: (
                    <Link
                      to="/solution1"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('solutions')}
                    >
                      <Translate id="navbar.realtimeAnalytics">Real-time Analytics</Translate>
                    </Link>
                  ),
                },
                {
                  key: 'solution2',
                  label: (
                    <Link
                      to="/solution2"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('solutions')}
                    >
                      <Translate id="navbar.aiRag">AI & RAG</Translate>
                    </Link>
                  ),
                },
              ],
            }}
            trigger={['hover']}
            placement="bottomLeft"
            overlayClassName="navbar-dropdown"
            destroyPopupOnHide={true}
            getPopupContainer={(trigger) => trigger.parentElement || document.body}
          >
            <div
              data-menu-item
              className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full gap-1 cursor-pointer transition-all duration-200 ${
                activeNav === 'solutions' 
                  ? 'bg-[#0087c7]/10 px-[20px]' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveNav('solutions')}
            >
              <span className="text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#262728]">
                <Translate id="navbar.solutions">Solutions</Translate>
              </span>
              <ChevronDownIcon className='ml-[6px] w-4 h-4 text-[#262728]' />
            </div>
          </Dropdown>
        </div>
        {/* Resources 下拉 */}
        <div className="flex-shrink-0">
          <Dropdown
            menu={{
              items: siteBrand === 'clougence' ? [
                {
                  key: 'blog',
                  label: (
                    <Link
                      to="/blog"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('resources')}
                    >
                      <Translate id="navbar.blog">Blog</Translate>
                    </Link>
                  ),
                },
                {
                  key: 'documents',
                  label: (
                    <Link
                      to="/docs/intro/product_intro"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('resources')}
                    >
                      <Translate id="navbar.documents">Documents</Translate>
                    </Link>
                  ),
                },
              ] : [
                {
                  key: 'blog',
                  label: (
                    <Link
                      to="/blog"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('resources')}
                    >
                      <Translate id="navbar.blog">Blog</Translate>
                    </Link>
                  ),
                },
                {
                  key: 'documents',
                  label: (
                    <Link
                      to="/docs/intro/product_intro"
                      className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      onClick={() => setActiveNav('resources')}
                    >
                      <Translate id="navbar.documents">Documents</Translate>
                    </Link>
                  ),
                },
              ],
            }}
            trigger={['hover']}
            placement="bottomLeft"
            overlayClassName="navbar-dropdown"
            destroyPopupOnHide={true}
            getPopupContainer={(trigger) => trigger.parentElement || document.body}
          >
            <div
              data-menu-item
              className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full gap-1 cursor-pointer transition-all duration-200 ${
                activeNav === 'resources' 
                  ? 'bg-[#0087c7]/10 px-[20px]' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveNav('resources')}
            >
              <span className='text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#262728]'>
                <Translate id='navbar.resources'>Resources</Translate>
              </span>
              <ChevronDownIcon className='ml-[6px] w-4 h-4 text-[#262728]' />
            </div>
          </Dropdown>
        </div>
        {/* Pricing */}
        <Link to="/pricing" className="no-underline flex-shrink-0">
          <div
            data-menu-item
            className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full cursor-pointer transition-all duration-200 ${
              activeNav === 'pricing' 
                ? 'bg-[#0087c7]/10 px-[20px]' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveNav('pricing')}
          >
            <span className="text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#262728]">
              <Translate id="navbar.pricing">Pricing</Translate>
            </span>
          </div>
        </Link>
        {/* About */}
        <Link to="/about" className="no-underline flex-shrink-0">
          <div
            data-menu-item
            className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full cursor-pointer transition-all duration-200 ${
              activeNav === 'about' 
                ? 'bg-[#0087c7]/10 px-[20px]' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveNav('about')}
          >
            <span className="text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#262728]">
              <Translate id="navbar.about">About</Translate>
            </span>
          </div>
        </Link>
        {/* 了解更多 - 仅 clougence 显示 */}
        {siteBrand === 'clougence' && (
          <div className="flex-shrink-0">
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'bladepipe',
                    label: (
                      <a
                        href="https://www.bladepipe.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      >
                        <Translate id="navbar.learnMore.bladepipe">CloudCanal Overseas Edition</Translate>
                      </a>
                    ),
                  },
                  {
                    key: 'clouddm',
                    label: (
                      <a
                        href="https://www.cdmgr.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                      >
                        <Translate id="navbar.learnMore.clouddm">Database Collaboration Management Tool</Translate>
                      </a>
                    ),
                  },
                ]
              }}
              placement="bottomLeft"
              trigger={['hover']}
              overlayClassName="navbar-dropdown"
              destroyPopupOnHide={true}
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
            >
              <div
                data-menu-item
                className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full cursor-pointer transition-all duration-200 ${
                  activeNav === 'learnmore' 
                    ? 'bg-[#0087c7]/10 px-[20px]' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveNav('learnmore')}
              >
                <span className="text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#262728]">
                  <Translate id="navbar.learnMore">Learn More</Translate>
                </span>
                <ChevronDownIcon className="ml-[6px] w-4 h-4 text-[#262728]" />
              </div>
            </Dropdown>
          </div>
        )}
      </div>
      {/* 右侧操作区（大屏显示） */}
      <div className='hidden xl:flex items-center gap-2 xl:gap-4 flex-shrink-0'>
        {/*/!* 搜索图标 *!/*/}
        {/*{siteBrand !== 'clougence' && SearchBarComponent && <SearchBarComponent />}*/}

        {/* 语言选择器 */}
        {/* <LanguageDropdown /> */}
        
        {/* clouddm 品牌下的占位元素 - 不可见，用于保持布局平衡 */}
        {siteBrand === 'clouddm' && (
          <div className='flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full invisible pointer-events-none'>
            <span className='text-sm lg:text-[15px] xl:text-[16px] font-bold whitespace-nowrap'>
              Try Cloud Free
            </span>
          </div>
        )}
        
        {/* 用户认证区域 */}
        {isLoggedIn ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
            overlayClassName="user-dropdown"
            destroyPopupOnHide={true}
            getPopupContainer={(trigger) => trigger.parentElement || document.body}
          >
            <div className='flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full border border-black/20 cursor-pointer hover:bg-gray-100 transition-colors'>
              <span className='text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#131316] mr-2'>
                <Translate id='navbar.hello'>Hello</Translate>, {userInfo?.username || userInfo?.email || 'User'}
              </span>
              <ChevronDownIcon className="w-4 h-4 text-gray-600" />
            </div>
          </Dropdown>
        ) : (
          <Link
            to="/login"
            className="no-underline"
            onClick={() => {
              localStorage.setItem('loginSource', 'sign_in');
            }}
          >
            <div className='flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full border border-black/20 cursor-pointer hover:bg-gray-100'>
              <span className='text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#131316]'>
                <Translate id='navbar.signin'>Log In</Translate>
              </span>
            </div>
          </Link>
        )}
        {/* Try Cloud Free */}
        { siteBrand!=='clouddm' && (
                  <div
                  className='flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full bg-[#0087c7] text-white cursor-pointer hover:bg-[#0070a6]'
                  onClick={() =>
                    loginCheckAndRedirect(() => {
                      window.location.href = getCloudUrl();
                    }, 'try_cloud_free')
                  }>
                  <span className='text-sm lg:text-[15px] xl:text-[16px] font-bold'>
                    <Translate id='navbar.tryCloud'>Try Cloud Free</Translate>
                  </span>
                </div>
        )}
      </div>
      {/* 移动端抽屉菜单 */}
      {mobileOpen && (
        <div className='fixed inset-0 top-[70px] bg-white z-50 flex flex-col shadow-lg xl:hidden' style={{height: 'calc(100vh - 70px)'}}>
          {/* 导航栏目区域 */}
          <div className='flex flex-col flex-1 overflow-y-auto'>
            {/* Product 展开菜单 - clouddm 时显示为简单链接 */}
            {siteBrand === 'clouddm' ? (
              <Link to="/" onClick={() => setMobileOpen(false)} className="no-underline">
                <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                  <span className="text-[16px] font-bold text-[#262728]">
                    <Translate id="navbar.home">首页</Translate>
                  </span>
                </div>
              </Link>
            ) : (
              <div
                className={`flex flex-col ${mobileMenuExpanded === 'product' ? 'bg-[#0087c7]/10' : ''}`}
                onClick={() => setMobileMenuExpanded(mobileMenuExpanded === 'product' ? '' : 'product')}
              >
                  <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                    <span className="text-[16px] font-bold text-[#262728]">
                      <Translate id='navbar.product'>Product</Translate>
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-black/40 transition-transform ${
                        mobileMenuExpanded === 'product' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {mobileMenuExpanded === 'product' && (
                    <div className="bg-white px-[10px] py-[10px]">
                      <div className="flex flex-col gap-[3px]">
                        {siteBrand === 'clougence' ? (
                        <>
                          <Link to="/" onClick={() => setMobileOpen(false)} className="no-underline">
                            <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                              <span className="text-[16px] font-medium text-black/80">
                                <Translate id="navbar.cloudcanal">CloudCanal</Translate>
                              </span>
                            </div>
                          </Link>
                          <Link to="/why" onClick={() => setMobileOpen(false)} className="no-underline">
                            <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                              <span className="text-[16px] font-medium text-black/80">
                                <Translate id="navbar.whyCloudcanal">Why CloudCanal</Translate>
                              </span>
                            </div>
                          </Link>
                          <Link to="/connector" onClick={() => setMobileOpen(false)} className="no-underline">
                            <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                              <span className="text-[16px] font-medium text-black/80">
                                <Translate id="navbar.connectors">Connectors</Translate>
                              </span>
                            </div>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/" onClick={() => setMobileOpen(false)} className="no-underline">
                            <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                              <span className="text-[16px] font-medium text-black/80">
                                <Translate id="navbar.bladepipe">BladePipe</Translate>
                              </span>
                            </div>
                          </Link>
                          <Link to="/why" onClick={() => setMobileOpen(false)} className="no-underline">
                            <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                              <span className="text-[16px] font-medium text-black/80">
                                <Translate id="navbar.whyBladepipe">Why BladePipe</Translate>
                              </span>
                            </div>
                          </Link>
                          <Link to="/connector" onClick={() => setMobileOpen(false)} className="no-underline">
                            <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                              <span className="text-[16px] font-medium text-black/80">
                                <Translate id="navbar.connectors">Connectors</Translate>
                              </span>
                            </div>
                          </Link>
                        </>
                      )}
                      </div>
                    </div>
                  )}
              </div>
            )}
            {/* 分割线 */}
            <div className='h-px bg-black/[0.08] w-full' />

            {/* CloudDM */}
            {/* <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
              <span className="text-[16px] font-bold text-[#262728]">CloudDM</span>
              <ChevronDownIcon className="w-4 h-4 text-black/40" />
            </div>
            <div className='h-px bg-black/[0.08] w-full' /> */}

            {/* Solutions */}
            <div
              className={`flex flex-col ${mobileMenuExpanded === 'solutions' ? 'bg-[#0087c7]/10' : ''}`}
              onClick={() => setMobileMenuExpanded(mobileMenuExpanded === 'solutions' ? '' : 'solutions')}
            >
              <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                <span className="text-[16px] font-bold text-[#262728]">
                  <Translate id='navbar.solutions'>Solutions</Translate>
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-black/40 transition-transform ${
                    mobileMenuExpanded === 'solutions' ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {mobileMenuExpanded === 'solutions' && (
                <div className="bg-white px-[10px] py-[10px]">
                  <div className="flex flex-col gap-[3px]">
                    {siteBrand === 'clouddm' ? (
                      <Link to="/clouddm_solution" onClick={() => setMobileOpen(false)} className="no-underline">
                        <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                          <span className="text-[16px] font-medium text-black/80">
                            <Translate id="navbar.teamDatabaseCollaboration">团队数据库协作</Translate>
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <Link to="/solution1" onClick={() => setMobileOpen(false)} className="no-underline">
                          <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                            <span className="text-[16px] font-medium text-black/80">
                              <Translate id="navbar.realtimeAnalytics">Real-time Analytics</Translate>
                            </span>
                          </div>
                        </Link>
                        <Link to="/solution2" onClick={() => setMobileOpen(false)} className="no-underline">
                          <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                            <span className="text-[16px] font-medium text-black/80">
                              <Translate id="navbar.aiRag">AI & RAG</Translate>
                            </span>
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className='h-px bg-black/[0.08] w-full' />

            {/* Resources */}
            <div
              className={`flex flex-col ${mobileMenuExpanded === 'resources' ? 'bg-[#0087c7]/10' : ''}`}
              onClick={() => setMobileMenuExpanded(mobileMenuExpanded === 'resources' ? '' : 'resources')}
            >
              <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                <span className="text-[16px] font-bold text-[#262728]">
                  <Translate id='navbar.resources'>Resources</Translate>
                </span>
                <ChevronDownIcon
                  className={`w-4 h-4 text-black/40 transition-transform ${
                    mobileMenuExpanded === 'resources' ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {mobileMenuExpanded === 'resources' && (
                <div className="bg-white px-[10px] py-[10px]">
                  <div className="flex flex-col gap-[3px]">
                    <Link to="/blog" onClick={() => setMobileOpen(false)} className="no-underline">
                      <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                        <span className="text-[16px] font-medium text-black/80">
                          <Translate id="navbar.blog">Blog</Translate>
                        </span>
                      </div>
                    </Link>
                    <Link to="/docs/intro/product_intro" onClick={() => setMobileOpen(false)} className="no-underline">
                      <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                        <span className="text-[16px] font-medium text-black/80">
                          <Translate id="navbar.documents">Documents</Translate>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className='h-px bg-black/[0.08] w-full' />

            {/* Pricing */}
            <Link to="/pricing" onClick={() => setMobileOpen(false)} className="no-underline">
              <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                <span className="text-[16px] font-bold text-[#262728]">
                  <Translate id='navbar.pricing'>Pricing</Translate>
                </span>
              </div>
            </Link>
            <div className='h-px bg-black/[0.08] w-full' />

            {/* About */}
            <Link to="/about" onClick={() => setMobileOpen(false)} className="no-underline">
              <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                <span className="text-[16px] font-bold text-[#262728]">
                  <Translate id='navbar.about'>About</Translate>
                </span>
              </div>
            </Link>
            <div className='h-px bg-black/[0.08] w-full' />

            {/* 了解更多 - 仅 clougence 显示 */}
            {siteBrand === 'clougence' && (
              <>
                <div
                  className={`flex flex-col ${mobileMenuExpanded === 'learnmore' ? 'bg-[#0087c7]/10' : ''}`}
                  onClick={() => setMobileMenuExpanded(mobileMenuExpanded === 'learnmore' ? '' : 'learnmore')}
                >
                  <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                    <span className="text-[16px] font-bold text-[#262728]">
                      <Translate id="navbar.learnMore">Learn More</Translate>
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-black/40 transition-transform ${
                        mobileMenuExpanded === 'learnmore' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {mobileMenuExpanded === 'learnmore' && (
                    <div className="bg-white px-[10px] py-[10px]">
                      <div className="flex flex-col gap-[3px]">
                        <a
                          href="https://www.bladepipe.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileOpen(false)}
                          className="no-underline"
                        >
                          <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                            <span className="text-[16px] font-medium text-black/80">
                              <Translate id="navbar.learnMore.bladepipe">CloudCanal Overseas Edition</Translate>
                            </span>
                          </div>
                        </a>
                        <a
                          href="https://www.cdmgr.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileOpen(false)}
                          className="no-underline"
                        >
                          <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                            <span className="text-[16px] font-medium text-black/80">
                              <Translate id="navbar.learnMore.clouddm">Database Collaboration Management Tool</Translate>
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className='h-px bg-black/[0.08] w-full' />
              </>
            )}
          </div>

          {/* 底部按钮区域 */}
          <div className="mt-auto px-5 py-[30px] flex items-center justify-end gap-[2px] flex-shrink-0">
            {/* 语言切换按钮 */}
            {/* <MobileLanguageDropdown /> */}

            {/* 用户认证区域 */}
            {isLoggedIn ? (
              <div className="flex flex-col gap-3 w-full">
                {/* 用户信息显示 */}
                <div className='flex items-center justify-center px-5 h-[50px] rounded-lg border border-black/20 bg-gray-50'>
                  <span className='text-[16px] font-bold text-[#131316]'>
                    <Translate id='navbar.hello'>Hello</Translate>, {userInfo?.username || userInfo?.email || 'User'}
                  </span>
                </div>
                {/* 用户菜单项 */}
                <div className="flex flex-col gap-2">
                  <a
                    href={`${getCloudUrl()}/#/system/profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-5 h-[40px] rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors no-underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className='text-[14px] font-medium text-[#131316]'>
                      <Translate id="navbar.userCenter">Profile</Translate>
                    </span>
                  </a>
                  <a
                    href={`${getCloudUrl()}/#/system/order`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-5 h-[40px] rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors no-underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className='text-[14px] font-medium text-[#131316]'>
                      <Translate id="navbar.myBilling">My Billing</Translate>
                    </span>
                  </a>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="flex items-center justify-center px-5 h-[40px] rounded-lg border border-red-200 cursor-pointer hover:bg-red-50 transition-colors bg-white"
                  >
                    <span className='text-[14px] font-medium text-red-600'>
                      <Translate id="navbar.logout">Log out</Translate>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => {
                  setMobileOpen(false);
                  localStorage.setItem('loginSource', 'sign_in');
                }}
                className="no-underline"
              >
                <div className='flex items-center justify-center px-5 h-[50px] w-[91px] rounded-lg border border-black/20 cursor-pointer hover:bg-gray-100'>
                  <span className='text-[16px] font-bold text-[#131316]'>
                    <Translate id='navbar.signin'>Log in</Translate>
                  </span>
                </div>
              </Link>
            )}

            {/* Try Cloud Free 按钮 */}
            <div
              className='flex items-center justify-center px-5 h-[50px] w-[172px] rounded-lg bg-[#0087c7] text-white cursor-pointer hover:bg-[#0070a6]'
              onClick={() => {
                setMobileOpen(false);
                loginCheckAndRedirect(() => {
                  window.location.href = getCloudUrl();
                }, 'try_cloud_free');
              }}
            >
              <span className='text-[16px] font-bold'>
                <Translate id='navbar.tryCloud'>Try Cloud Free</Translate>
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}

function LanguageDropdown() {
  const { i18n } = useDocusaurusContext();
  const history = useHistory();
  const currentLocale = i18n.currentLocale;
  const locales = i18n.locales;
  const localeLabels = {
    en: 'English',
    zh: '简体中文'
  };

  const handleSelect = useCallback(
    (locale: string) => {
      if (locale === currentLocale) return;
      // 跳转到对应语言的首页（或保留当前路径）
      const pathname = window.location.pathname;
      const newPath = pathname.replace(new RegExp(`^/(en|zh)`), '') || '/';
      const target = locale === i18n.defaultLocale ? newPath : `/${locale}${newPath}`;
      history.push(target);
    },
    [currentLocale, history, i18n.defaultLocale]
  );

  const menuItems: MenuProps['items'] = locales.map((locale) => ({
    key: locale,
    label: (
      <div
        className={`text-[16px] font-medium transition-colors ${
          locale === currentLocale 
            ? 'text-[#0087c7]' 
            : 'text-[#262728] hover:text-[#0087c7]'
        }`}
        onClick={() => handleSelect(locale)}
      >
        {localeLabels[locale] || locale}
      </div>
    ),
    disabled: locale === currentLocale,
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['hover']}
      placement="bottomRight"
      overlayClassName="navbar-dropdown"
      destroyPopupOnHide={true}
      getPopupContainer={(trigger) => trigger.parentElement || document.body}
    >
      <button className='flex items-center px-4 h-10 rounded-full border border-black/20 bg-white hover:bg-gray-100 transition-colors gap-2 text-[16px] font-bold text-[#131316] focus:outline-none'>
        <svg className='w-5 h-5 mr-1 text-[#0087c7]' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
          <path d='M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9z' />
        </svg>
        {localeLabels[currentLocale] || currentLocale}
        <ChevronDownIcon className='ml-1 w-4 h-4 text-[#262728]' />
      </button>
    </Dropdown>
  );
}

function MobileLanguageDropdown() {
  const { i18n } = useDocusaurusContext();
  const history = useHistory();
  const currentLocale = i18n.currentLocale;
  const locales = i18n.locales;
  const localeLabels = {
    en: 'EN',
    zh: 'CN'
  };

  const handleSelect = useCallback(
    (locale: string) => {
      if (locale === currentLocale) return;
      const pathname = window.location.pathname;
      const newPath = pathname.replace(new RegExp(`^/(en|zh)`), '') || '/';
      const target = locale === i18n.defaultLocale ? newPath : `/${locale}${newPath}`;
      history.push(target);
    },
    [currentLocale, history, i18n.defaultLocale]
  );

  const menuItems: MenuProps['items'] = locales.map((locale) => ({
    key: locale,
    label: (
      <div className="flex items-center px-[10px] py-2 h-9 gap-[10px]">
        <div className="w-5 h-5 flex items-center justify-center">
          {locale === 'en' ? (
            <div className="w-5 h-5 bg-gray-300 rounded-sm flex items-center justify-center">
              <span className="text-xs">🇬🇧</span>
            </div>
          ) : (
            <div className="w-5 h-5 bg-red-600 rounded-sm flex items-center justify-center">
              <span className="text-xs">🇨🇳</span>
            </div>
          )}
        </div>
        <span
          className={`text-[14px] font-medium ${
            locale === currentLocale ? 'text-black' : 'text-gray-600'
          }`}
        >
          {localeLabels[locale]}
        </span>
      </div>
    ),
    onClick: () => handleSelect(locale),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      placement="topLeft"
      overlayClassName="mobile-language-dropdown"
      overlayStyle={{
        minWidth: '104px',
      }}
      destroyPopupOnHide={true}
      getPopupContainer={(trigger) => trigger.parentElement || document.body}
    >
      <div className="w-[68px] h-[50px] flex items-center justify-center cursor-pointer">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
          <svg className='w-6 h-6 text-black' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path d='M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9z' />
          </svg>
        </div>
      </div>
    </Dropdown>
  );
}
