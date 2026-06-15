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
import GoogleTranslate from '@site/src/components/GoogleTranslate';

const CLOUDDM_GITHUB_URL = 'https://github.com/ClouGence/open-cdm';
const CLOUDDM_GITEE_URL = 'https://gitee.com/clougence/open-cdm';

type LearnMoreLink = {
  key: string;
  href: string;
  labelId: string;
  defaultLabel: string;
};

const CLOUGENCE_LEARN_MORE_LINKS: LearnMoreLink[] = [
  { key: 'bladepipe', href: 'https://www.bladepipe.com', labelId: 'navbar.learnMore.bladepipe', defaultLabel: 'CloudCanal Overseas Edition' },
  { key: 'clouddm', href: 'https://www.cdmgr.com/', labelId: 'navbar.learnMore.clouddm', defaultLabel: 'CloudDM Enterprise Data Management Platform' },
  { key: 're-akh', href: 'https://www.reakh.com/', labelId: 'navbar.learnMore.reakh', defaultLabel: 'Reakh AI' },
  { key: 'icuecast', href: 'https://www.icuecast.com', labelId: 'navbar.learnMore.icuecast', defaultLabel: 'CueCast Automated Testing Tool' },
];

const CLOUDDM_LEARN_MORE_LINKS: LearnMoreLink[] = [
  { key: 're-akh', href: 'https://www.reakh.com/', labelId: 'navbar.learnMore.reakh', defaultLabel: 'Reakh AI' },
  { key: 'cloudcanal', href: 'https://www.clougence.com', labelId: 'navbar.learnMore.cloudcanal', defaultLabel: 'CloudCanal Data Sync Tool' },
  { key: 'icuecast', href: 'https://www.icuecast.com', labelId: 'navbar.learnMore.icuecast', defaultLabel: 'CueCast Automated Testing Tool' },
];

function getLearnMoreLinks(siteBrand: string | undefined): LearnMoreLink[] {
  if (siteBrand === 'clouddm') {
    return CLOUDDM_LEARN_MORE_LINKS;
  }
  if (siteBrand === 'clougence') {
    return CLOUGENCE_LEARN_MORE_LINKS;
  }
  return [];
}

function renderLearnMoreDropdownItems(links: LearnMoreLink[]): MenuProps['items'] {
  return links.map(({ key, href, labelId, defaultLabel }) => ({
    key,
    label: (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
      >
        <Translate id={labelId}>{defaultLabel}</Translate>
      </a>
    ),
  }));
}

function GitHubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.59 2 12.253c0 4.529 2.865 8.371 6.839 9.728.5.095.683-.222.683-.494 0-.244-.009-.89-.014-1.747-2.782.62-3.369-1.375-3.369-1.375-.455-1.184-1.11-1.499-1.11-1.499-.908-.636.069-.623.069-.623 1.004.073 1.532 1.057 1.532 1.057.892 1.565 2.341 1.113 2.91.851.091-.662.349-1.113.635-1.369-2.221-.259-4.555-1.138-4.555-5.064 0-1.119.39-2.034 1.029-2.75-.103-.26-.446-1.302.098-2.713 0 0 .84-.276 2.75 1.05A9.388 9.388 0 0 1 12 6.966a9.37 9.37 0 0 1 2.504.345c1.909-1.326 2.747-1.05 2.747-1.05.546 1.411.203 2.453.1 2.713.64.716 1.028 1.631 1.028 2.75 0 3.936-2.337 4.802-4.566 5.056.359.318.679.944.679 1.902 0 1.372-.013 2.479-.013 2.815 0 .274.18.594.688.493C21.138 20.62 24 16.78 24 12.253 24 6.59 19.523 2 14 2h-2z" />
    </svg>
  );
}

function GiteeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" aria-hidden="true" className={className} fill="currentColor">
      <path d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z" />
    </svg>
  );
}

export default function Navbar() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  const learnMoreLinks = getLearnMoreLinks(siteBrand);
  const logoSrc = siteBrand === 'clougence' ? '/img/home/CloudCanal.svg' : siteBrand === 'clouddm' ? '/img/home/CloudDM.svg' : '/img/home/BladePipe.png';
  const location = useLocation();

  // 检查公告栏是否显示
  const announcementConfig = siteConfig.customFields?.announcement as any;
  const isAnnouncementVisible = React.useMemo(() => {
    if (!announcementConfig || !announcementConfig.enabled || !announcementConfig.linkUrl) {
      return false;
    }
    if (announcementConfig.endDate) {
      try {
        const endDateTime = new Date(announcementConfig.endDate).getTime();
        const currentTime = new Date().getTime();
        return currentTime <= endDateTime;
      } catch (error) {
        return true;
      }
    }
    return true;
  }, [announcementConfig]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollYRef = useRef<number>(0);
  const [SearchBarComponent, setSearchBarComponent] = useState<any>(null);
  const centerNavRef = useRef<HTMLDivElement | null>(null);
  const [collapsedNavItems, setCollapsedNavItems] = useState<string[]>([]);

  // 动态加载 SearchBar
  useEffect(() => {
    import('@theme/SearchBar')
      .then((module) => {
        setSearchBarComponent(() => module.default);
      })
      .catch((error) => {
        console.error('Failed to load SearchBar:', error);
        setSearchBarComponent(() => null);
      });
  }, []);

  // 检查是否是文档页面
  const isDocsPage = React.useMemo(() => {
    const pathname = location.pathname;
    return pathname.startsWith('/docs/') ||
           pathname.startsWith('/ccDocs/') ||
           pathname.startsWith('/dmDocs/');
  }, [location.pathname]);

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

  // 桌面端导航折叠：空间不足时，将右侧项目折叠到“更多”中
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!centerNavRef.current) return;

    const measure = () => {
      const container = centerNavRef.current;
      if (!container) return;

      // 仅在桌面端生效（与 xl 断点保持一致）
      const isDesktop = window.innerWidth >= 1280;
      const items = Array.from(
        container.querySelectorAll<HTMLElement>('[data-desktop-nav-item]')
      );

      if (!isDesktop) {
        // 移动端/小屏时不折叠
        items.forEach((item) => {
          item.style.display = '';
        });
        if (collapsedNavItems.length) {
          setCollapsedNavItems([]);
        }
        return;
      }

      // 先全部显示，方便重新测量宽度
      items.forEach((item) => {
        item.style.display = '';
      });

      const containerWidth = container.offsetWidth;
      if (!containerWidth) return;

      // 预留“更多”按钮的宽度
      const moreReserveWidth = 120;
      let used = 0;
      const newCollapsed: string[] = [];

      // 从右往左折叠：先按 DOM 顺序收集，再反转
      const itemsForCalc = [...items];
      itemsForCalc.forEach((item) => {
        used += item.offsetWidth;
      });

      // 如果全部都能放下，则不折叠
      if (used + moreReserveWidth <= containerWidth) {
        if (collapsedNavItems.length) {
          setCollapsedNavItems([]);
        }
        return;
      }

      // 重新计算：从左到右逐个放入，超出则折叠
      used = 0;
      itemsForCalc.forEach((item) => {
        const key = item.dataset.navKey;
        if (!key) return;

        const w = item.offsetWidth;
        if (used + w + moreReserveWidth <= containerWidth) {
          used += w;
          item.style.display = '';
        } else {
          newCollapsed.push(key);
          item.style.display = 'none';
        }
      });

      setCollapsedNavItems(newCollapsed);
    };

    measure();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measure();
      });
      resizeObserver.observe(centerNavRef.current);
    }

    window.addEventListener('resize', measure);

    return () => {
      if (resizeObserver && centerNavRef.current) {
        resizeObserver.unobserve(centerNavRef.current);
      }
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerNavRef.current]);

  // 移动端菜单打开时禁用背景滚动
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!mobileOpen) return;

    scrollYRef.current = window.scrollY;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverscroll = document.body.style.getPropertyValue('overscroll-behavior');
    const originalHtmlOverscroll = document.documentElement.style.getPropertyValue('overscroll-behavior');

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.setProperty('overscroll-behavior', 'none');
    document.documentElement.style.setProperty('overscroll-behavior', 'none');

    // 组件卸载时确保恢复滚动
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;

      if (originalBodyOverscroll) {
        document.body.style.setProperty('overscroll-behavior', originalBodyOverscroll);
      } else {
        document.body.style.removeProperty('overscroll-behavior');
      }

      if (originalHtmlOverscroll) {
        document.documentElement.style.setProperty('overscroll-behavior', originalHtmlOverscroll);
      } else {
        document.documentElement.style.removeProperty('overscroll-behavior');
      }
    };
  }, [mobileOpen]);


  return (
    <>
      {/* 占位容器 - 当 navbar fixed 时防止页面跳跃 */}
      {isScrolled && <div className="w-full h-[70px]" />}

      <nav className={`navbar w-full h-[70px] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-5 z-50 transition-all duration-300 ${isScrolled
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
          {siteBrand === 'clouddm' && (
            <>
              <a
                href={CLOUDDM_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-lg text-[#131316] hover:bg-gray-100 hover:text-[#0087c7] transition-colors"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubIcon className="w-[22px] h-[22px]" />
              </a>
              <a
                href={CLOUDDM_GITEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-lg text-[#c71d23] hover:bg-[#fff5f5] transition-colors"
                aria-label="Gitee"
                title="Gitee"
              >
                <GiteeIcon className="w-[19px] h-[19px]" />
              </a>
            </>
          )}

          {/* 搜索图标（移动端）- 仅在文档页面显示 */}
          {isDocsPage && SearchBarComponent && (
            <div className="mr-2">
              <SearchBarComponent />
            </div>
          )}

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
        {/* 中间导航栏 - 使用flex布局，空间不足时折叠到“更多”中（大屏显示） */}
        <div
          ref={centerNavRef}
          className='hidden xl:flex items-center justify-center gap-2 xl:gap-4 ml-4 xl:ml-8 flex-1 min-w-0 overflow-hidden'
        >
          {/* Product 下拉 - clouddm 时显示为简单链接 */}
          {siteBrand === 'clouddm' ? (
            <Link
              to="/"
              className="no-underline flex-shrink-0"
              onClick={() => setActiveNav('product')}
              data-desktop-nav-item
              data-nav-key="product"
            >
              <div
                data-menu-item
                className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full cursor-pointer transition-all duration-200 ${activeNav === 'product'
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
            <div className="flex-shrink-0" data-desktop-nav-item data-nav-key="product">
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
                          translate="no"
                        >
                          <Translate id="navbar.bladepipe">BladePipe</Translate>
                        </Link>
                      ),
                    },
                    {
                      key: 'why-bladepipe',
                      label: (
                        <Link
                          to="/why/"
                          className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                          onClick={() => setActiveNav('product')}
                          translate="no"
                        >
                          <Translate id="navbar.whyBladepipe">Why BladePipe</Translate>
                        </Link>
                      ),
                    },
                    {
                      key: 'connectors',
                      label: (
                        <Link
                          to="/connector/"
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
                  className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full gap-1 cursor-pointer transition-all duration-200 ${activeNav === 'product'
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
          <div className="flex-shrink-0" data-desktop-nav-item data-nav-key="solutions">
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
                        to="/real-time-analytics"
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
                        to="/ai-rag"
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
                        to="/real-time-analytics/"
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
                        to="/ai-rag/"
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
                className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full gap-1 cursor-pointer transition-all duration-200 ${activeNav === 'solutions'
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
          <div className="flex-shrink-0" data-desktop-nav-item data-nav-key="resources">
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
                        to="/blog/"
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
                        to="/docs/intro/product_intro/"
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
                className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full gap-1 cursor-pointer transition-all duration-200 ${activeNav === 'resources'
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
          {siteBrand !== 'clouddm' && (
            <Link
              to={siteBrand === 'bladepipe' ? "/pricing/" : "/pricing"}
              className="no-underline flex-shrink-0"
              data-desktop-nav-item
              data-nav-key="pricing"
            >
              <div
                data-menu-item
                className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full cursor-pointer transition-all duration-200 ${activeNav === 'pricing'
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
          )}
          {/* About */}
          <Link
            to={siteBrand === 'bladepipe' ? "/about/" : "/about"}
            className="no-underline flex-shrink-0"
            data-desktop-nav-item
            data-nav-key="about"
          >
            <div
              data-menu-item
              className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full cursor-pointer transition-all duration-200 ${activeNav === 'about'
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
          {/* 了解更多 - clougence / clouddm 显示 */}
          {learnMoreLinks.length > 0 && (
            <div
              className="flex-shrink-0"
              data-desktop-nav-item
              data-nav-key="learnmore"
            >
              <Dropdown
                menu={{
                  items: renderLearnMoreDropdownItems(learnMoreLinks),
                }}
                placement="bottomLeft"
                trigger={['hover']}
                overlayClassName="navbar-dropdown"
                destroyPopupOnHide={true}
                getPopupContainer={(trigger) => trigger.parentElement || document.body}
              >
                <div
                  data-menu-item
                  className={`flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full cursor-pointer transition-all duration-200 ${activeNav === 'learnmore'
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
          {/* 更多（折叠）菜单 */}
          {collapsedNavItems.length > 0 && (
            <Dropdown
              menu={{
                items: collapsedNavItems
                  .map<MenuProps['items'][number] | null>((key) => {
                    if (key === 'product') {
                      return {
                        key: 'more-product',
                        label: siteBrand === 'clouddm' ? (
                          <Link
                            to="/"
                            className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                            onClick={() => setActiveNav('product')}
                          >
                            <Translate id="navbar.home">首页</Translate>
                          </Link>
                        ) : (
                          <Link
                            to="/"
                            className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                            onClick={() => setActiveNav('product')}
                          >
                            <Translate id="navbar.product">Product</Translate>
                          </Link>
                        ),
                      };
                    }
                    if (key === 'solutions') {
                      if (siteBrand === 'clouddm') {
                        return {
                          key: 'more-solutions-clouddm',
                          label: (
                            <Link
                              to="/clouddm_solution"
                              className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                              onClick={() => setActiveNav('solutions')}
                            >
                              <Translate id="navbar.teamDatabaseCollaboration">团队数据库协作</Translate>
                            </Link>
                          ),
                        };
                      }
                      return {
                        key: 'more-solutions',
                        label: (
                          <Link
                            to={siteBrand === 'bladepipe' ? "/real-time-analytics/" : "/real-time-analytics"}
                            className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                            onClick={() => setActiveNav('solutions')}
                          >
                            <Translate id="navbar.solutions">Solutions</Translate>
                          </Link>
                        ),
                      };
                    }
                    if (key === 'resources') {
                      return {
                        key: 'more-resources',
                        label: (
                          <Link
                            to={siteBrand === 'bladepipe' ? "/blog/" : "/blog"}
                            className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                            onClick={() => setActiveNav('resources')}
                          >
                            <Translate id="navbar.resources">Resources</Translate>
                          </Link>
                        ),
                      };
                    }
                    if (key === 'pricing' && siteBrand !== 'clouddm') {
                      return {
                        key: 'more-pricing',
                        label: (
                          <Link
                            to={siteBrand === 'bladepipe' ? "/pricing/" : "/pricing"}
                            className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                            onClick={() => setActiveNav('pricing')}
                          >
                            <Translate id="navbar.pricing">Pricing</Translate>
                          </Link>
                        ),
                      };
                    }
                    if (key === 'pricing') {
                      return null;
                    }
                    if (key === 'about') {
                      return {
                        key: 'more-about',
                        label: (
                          <Link
                            to={siteBrand === 'bladepipe' ? "/about/" : "/about"}
                            className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                            onClick={() => setActiveNav('about')}
                          >
                            <Translate id="navbar.about">About</Translate>
                          </Link>
                        ),
                      };
                    }
                    if (key === 'learnmore' && learnMoreLinks.length > 0) {
                      return {
                        key: 'more-learnmore',
                        label: (
                          <a
                            href={learnMoreLinks[0].href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline text-[16px] text-[#262728] hover:text-[#0087c7] transition-colors"
                          >
                            <Translate id="navbar.learnMore">Learn More</Translate>
                          </a>
                        ),
                      };
                    }
                    return null;
                  })
                  .filter((item): item is MenuProps['items'][number] => item !== null),
              }}
              trigger={['hover']}
              placement="bottomLeft"
              overlayClassName="navbar-dropdown"
              destroyPopupOnHide={true}
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
            >
              <div
                data-menu-item
                className="flex items-center px-3 lg:px-4 xl:px-5 h-10 rounded-full gap-1 cursor-pointer transition-all duration-200 hover:bg-gray-100 flex-shrink-0"
              >
                <span className="text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#262728]">
                  ...
                </span>
                <ChevronDownIcon className="ml-[6px] w-4 h-4 text-[#262728]" />
              </div>
            </Dropdown>
          )}
        </div>
        {/* 右侧操作区（大屏显示） */}
        <div className='hidden xl:flex items-center gap-2 flex-shrink-0'>
          {siteBrand === 'clouddm' && (
            <>
              <a
                href={CLOUDDM_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black/20 bg-white text-[#131316] flex items-center justify-center transition-all duration-200 hover:bg-gray-100 hover:border-[#0087c7]/40 hover:text-[#0087c7] hover:scale-105"
                title="GitHub"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-6 h-6" />
              </a>
              <a
                href={CLOUDDM_GITEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 mr-2 rounded-full border border-black/20 bg-white text-[#c71d23] flex items-center justify-center transition-all duration-200 hover:bg-[#fff5f5] hover:border-[#c71d23]/40 hover:scale-105"
                title="Gitee"
                aria-label="Gitee"
              >
                <GiteeIcon className="w-[21px] h-[21px]" />
              </a>
            </>
          )}

          {/* CloudCanal：AI 助手（原右下角机器人入口移至导航栏） */}
          {/*{siteBrand === 'clougence' && (*/}
          {/*  <span*/}
          {/*    role="button"*/}
          {/*    tabIndex={0}*/}
          {/*    onClick={() => {*/}
          {/*      if (typeof window !== 'undefined') {*/}
          {/*        const w = window as Window & { openClougenceAiBot?: () => void };*/}
          {/*        w.openClougenceAiBot?.();*/}
          {/*      }*/}
          {/*    }}*/}
          {/*    onKeyDown={(e) => {*/}
          {/*      if (e.key === 'Enter' || e.key === ' ') {*/}
          {/*        e.preventDefault();*/}
          {/*        const w = window as Window & { openClougenceAiBot?: () => void };*/}
          {/*        w.openClougenceAiBot?.();*/}
          {/*      }*/}
          {/*    }}*/}
          {/*    className="inline-flex items-center justify-center w-8 h-8 cursor-pointer shrink-0 hover:opacity-80 transition-opacity"*/}
          {/*    title={translate({ id: 'navbar.aiAssistant.title', message: 'AI assistant' })}*/}
          {/*    aria-label={translate({ id: 'navbar.aiAssistant.title', message: 'AI assistant' })}*/}
          {/*  >*/}
          {/*    <span*/}
          {/*      aria-hidden="true"*/}
          {/*      className="w-7 h-7 bg-[#0087c7]"*/}
          {/*      style={{*/}
          {/*        WebkitMask: "url('/img/home/icon/robot.svg') center / contain no-repeat",*/}
          {/*        mask: "url('/img/home/icon/robot.svg') center / contain no-repeat",*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </span>*/}
          {/*)}*/}
          {/* Discord 图标链接 - 仅在 bladepipe 时显示 */}
          {siteBrand === 'bladepipe' && (
            <a
              href="https://discord.gg/HMnThuQMup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 mr-2 2xl:mr-4 rounded-full border border-black/20 bg-white flex items-center justify-center transition-all duration-200 hover:bg-gray-100 hover:border-black/30 hover:scale-105"
              title="Discord"
              aria-label="Discord"
            >
              <img
                src="/img/about/contact/discord.svg"
                alt="Discord"
                className="w-6 h-6"
              />
            </a>
          )}

          {/* Google Translate - 仅在 bladepipe 时显示 */}
          {siteBrand === 'bladepipe' && (
            <div className="navbar-google-translate">
              <GoogleTranslate position="navbar" />
            </div>
          )}
          
          {/* 语言选择器 */}
          {/* <LanguageDropdown /> */}
          {/* 用户认证区域 - 在 docs 页面时不显示 */}
          {!isDocsPage && (
            <>
              {isLoggedIn ? (
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={['click']}
                  overlayClassName="user-dropdown"
                  destroyPopupOnHide={true}
                  getPopupContainer={(trigger) => trigger.parentElement || document.body}
                >
                  <div className='flex items-center px-3 2xl:px-5 h-10 rounded-full border border-black/20 cursor-pointer hover:bg-gray-100 transition-colors'>
                    <span translate="no" className='text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#131316] mr-2'>
                      <Translate id='navbar.hello'>Hello</Translate>, {userInfo?.username || userInfo?.email || 'User'}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                  </div>
                </Dropdown>
              ) : (
                <Link
                  to={siteBrand === 'bladepipe' ? "/login/" : "/login"}
                  className="no-underline"
                  onClick={() => {
                    localStorage.setItem('loginSource', 'sign_in');
                  }}
                >
                  <div className='flex items-center px-3 2xl:px-5 h-10 rounded-full border border-black/20 cursor-pointer hover:bg-gray-100'>
                    <span className='text-sm lg:text-[15px] xl:text-[16px] font-bold text-[#131316]'>
                      <Translate id='navbar.signin'>Log In</Translate>
                    </span>
                  </div>
                </Link>
              )}
              {/* Try Cloud Free - 在 docs 页面和 CloudDM 品牌下不显示 */}
              {siteBrand !== 'clouddm' && (
                <div
                  className='flex items-center px-3 lg:px-4 2xl:px-5 h-10 rounded-full bg-[#0087c7] text-white cursor-pointer hover:bg-[#0070a6]'
                  onClick={() =>
                    loginCheckAndRedirect(() => {
                      window.location.href = getCloudUrl();
                    }, 'try_cloud_free')
                  }>
                  <span className='text-sm lg:text-[15px] xl:text-[16px] font-bold'>
                    <Translate id='navbar.tryCloud'>Try Cloud</Translate>
                  </span>
                </div>
              )}
            </>
          )}
          {/* 搜索图标 - 仅在文档页面显示，放在最右侧 */}
          {isDocsPage && SearchBarComponent && (
            <div className="mr-2">
              <SearchBarComponent />
            </div>
          )}
        </div>
        {/* 移动端抽屉菜单 */}
        {mobileOpen && (
          <div 
            className='fixed inset-0 bg-white z-50 flex flex-col shadow-lg xl:hidden' 
            style={{ 
              top: isAnnouncementVisible ? '110px' : '70px',
              height: isAnnouncementVisible ? 'calc(100vh - 110px)' : 'calc(100vh - 70px)'
            }}
          >
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
                      className={`w-4 h-4 text-black/40 transition-transform ${mobileMenuExpanded === 'product' ? 'rotate-180' : ''
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
                            <Link to="/why/" onClick={() => setMobileOpen(false)} className="no-underline">
                              <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                                <span className="text-[16px] font-medium text-black/80">
                                  <Translate id="navbar.whyBladepipe">Why BladePipe</Translate>
                                </span>
                              </div>
                            </Link>
                            <Link to="/connector/" onClick={() => setMobileOpen(false)} className="no-underline">
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
                    className={`w-4 h-4 text-black/40 transition-transform ${mobileMenuExpanded === 'solutions' ? 'rotate-180' : ''
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
                          <Link to={siteBrand === 'bladepipe' ? "/real-time-analytics/" : "/real-time-analytics"} onClick={() => setMobileOpen(false)} className="no-underline">
                            <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                              <span className="text-[16px] font-medium text-black/80">
                                <Translate id="navbar.realtimeAnalytics">Real-time Analytics</Translate>
                              </span>
                            </div>
                          </Link>
                          <Link to={siteBrand === 'bladepipe' ? "/ai-rag/" : "/ai-rag"} onClick={() => setMobileOpen(false)} className="no-underline">
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
                    className={`w-4 h-4 text-black/40 transition-transform ${mobileMenuExpanded === 'resources' ? 'rotate-180' : ''
                      }`}
                  />
                </div>
                {mobileMenuExpanded === 'resources' && (
                  <div className="bg-white px-[10px] py-[10px]">
                    <div className="flex flex-col gap-[3px]">
                      <Link to={siteBrand === 'bladepipe' ? "/blog/" : "/blog"} onClick={() => setMobileOpen(false)} className="no-underline">
                        <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                          <span className="text-[16px] font-medium text-black/80">
                            <Translate id="navbar.blog">Blog</Translate>
                          </span>
                        </div>
                      </Link>
                      <Link to={siteBrand === 'bladepipe' ? "/docs/intro/product_intro/" : "/docs/intro/product_intro"} onClick={() => setMobileOpen(false)} className="no-underline">
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
              {siteBrand !== 'clouddm' && (
                <>
                  <Link to={siteBrand === 'bladepipe' ? "/pricing/" : "/pricing"} onClick={() => setMobileOpen(false)} className="no-underline">
                    <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                      <span className="text-[16px] font-bold text-[#262728]">
                        <Translate id='navbar.pricing'>Pricing</Translate>
                      </span>
                    </div>
                  </Link>
                  <div className='h-px bg-black/[0.08] w-full' />
                </>
              )}

              {/* About */}
              <Link to={siteBrand === 'bladepipe' ? "/about/" : "/about"} onClick={() => setMobileOpen(false)} className="no-underline">
                <div className="flex items-center justify-between px-5 h-[50px] cursor-pointer">
                  <span className="text-[16px] font-bold text-[#262728]">
                    <Translate id='navbar.about'>About</Translate>
                  </span>
                </div>
              </Link>
              <div className='h-px bg-black/[0.08] w-full' />

              {/* 了解更多 - clougence / clouddm 显示 */}
              {learnMoreLinks.length > 0 && (
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
                        className={`w-4 h-4 text-black/40 transition-transform ${mobileMenuExpanded === 'learnmore' ? 'rotate-180' : ''
                          }`}
                      />
                    </div>
                    {mobileMenuExpanded === 'learnmore' && (
                      <div className="bg-white px-[10px] py-[10px]">
                        <div className="flex flex-col gap-[3px]">
                          {learnMoreLinks.map(({ key, href, labelId, defaultLabel }) => (
                            <a
                              key={key}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileOpen(false)}
                              className="no-underline"
                            >
                              <div className='flex items-center px-5 py-[10px] h-[44px] cursor-pointer hover:bg-gray-100'>
                                <span className="text-[16px] font-medium text-black/80">
                                  <Translate id={labelId}>{defaultLabel}</Translate>
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='h-px bg-black/[0.08] w-full' />
                </>
              )}
            </div>

            {/* 底部按钮区域 */}
            <div className="mt-auto px-5 py-[30px] flex flex-col gap-4 flex-shrink-0">
              {/* 第一行：Discord 和语言切换 - 左侧水平排列 */}
              <div className="flex items-center gap-3">
                {/* Discord 图标链接 - 移动端，仅在 bladepipe 时显示 */}
                {siteBrand === 'bladepipe' && (
                  <a
                    href="https://discord.gg/HMnThuQMup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-black/20 bg-white flex items-center justify-center transition-all duration-200 hover:bg-gray-100 hover:border-black/30 flex-shrink-0"
                    title="Discord"
                    aria-label="Discord"
                    onClick={() => setMobileOpen(false)}
                  >
                    <img
                      src="/img/about/contact/discord.svg"
                      alt="Discord"
                      className="w-6 h-6"
                    />
                  </a>
                )}

                {/* Google Translate - 移动端，仅在 bladepipe 时显示，语言切换 */}
                {siteBrand === 'bladepipe' && (
                  <div className="mobile-google-translate">
                    <GoogleTranslate position="navbar" />
                  </div>
                )}
                
                {/* 语言切换按钮 */}
                {/* <MobileLanguageDropdown /> */}
              </div>

              {/* 第二行：登录和跳转按钮 - 左侧垂直排列 */}
              <div className="flex flex-col gap-3 w-full">
                {/* 用户认证区域 */}
                {isLoggedIn ? (
                  <>
                    {/* 用户信息显示 */}
                    <div className='flex items-center justify-center px-5 h-[50px] rounded-lg border border-black/20 bg-gray-50'>
                      <span translate="no" className='text-[16px] font-bold text-[#131316]'>
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
                        href={siteBrand === 'clouddm' ? `${getCloudUrl()}/#/system/order` : `${getCloudUrl()}/#/system/billing`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-5 h-[40px] rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors no-underline"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className='text-[14px] font-medium text-[#131316]'>
                          {siteBrand === 'clouddm' ? (
                            <Translate id="navbar.myOrder">My Order</Translate>
                          ) : (
                            <Translate id="navbar.myBilling">My Billing</Translate>
                          )}
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
                  </>
                ) : (
                  <Link
                    to={siteBrand === 'bladepipe' ? "/login/" : "/login"}
                    onClick={() => {
                      setMobileOpen(false);
                      localStorage.setItem('loginSource', 'sign_in');
                    }}
                    className="no-underline w-full"
                  >
                    <div className='flex items-center justify-center px-5 h-[50px] w-full rounded-lg border border-black/20 cursor-pointer hover:bg-gray-100'>
                      <span className='text-[16px] font-bold text-[#131316]'>
                        <Translate id='navbar.signin'>Log in</Translate>
                      </span>
                    </div>
                  </Link>
                )}

                {/* Try Cloud Free 按钮 - CloudDM 品牌下不显示 */}
                {siteBrand !== 'clouddm' && (
                  <div
                    className='flex items-center justify-center px-5 h-[50px] w-full rounded-lg bg-[#0087c7] text-white cursor-pointer hover:bg-[#0070a6]'
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
                )}
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
        className={`text-[16px] font-medium transition-colors ${locale === currentLocale
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
          className={`text-[14px] font-medium ${locale === currentLocale ? 'text-black' : 'text-gray-600'
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
      <div className="w-10 h-10 rounded-full border border-black/20 bg-white flex items-center justify-center transition-all duration-200 hover:bg-gray-100 hover:border-black/30 cursor-pointer flex-shrink-0">
        <svg className='w-6 h-6 text-black' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
          <path d='M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9z' />
        </svg>
      </div>
    </Dropdown>
  );
}
