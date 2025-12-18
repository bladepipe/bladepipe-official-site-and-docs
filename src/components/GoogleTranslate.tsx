import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory, useLocation } from '@docusaurus/router';

interface GoogleTranslateProps {
  className?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'navbar';
}

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: (config: any, elementId: string) => void;
      };
    };
  }
}

// 支持的语言列表
const LANGUAGES = [
  { code: '', label: 'English', flag: '🌐' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
];

const GoogleTranslate: React.FC<GoogleTranslateProps> = ({
  className = '',
  position = 'top-right'
}) => {
  const translateElementRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useDocusaurusContext();
  const history = useHistory();
  const location = useLocation();

  // 更新当前语言显示
  const updateCurrentLanguage = () => {
    const pathname = window.location.pathname;
    const localeMatch = pathname.match(/^\/(zh|en)(\/|$)/);
    const isDocsBlog = isDocsOrBlogPage();

    // 如果在中文路由下的文档/博客页面，使用 Google Translate
    if (localeMatch && localeMatch[1] === 'zh' && isDocsBlog) {
      // 从 Google Translate 的 select 元素获取当前语言
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement && selectElement.value) {
        const currentValue = selectElement.value;
        let currentLangCode = '';

        if (currentValue === '' || currentValue === 'en') {
          currentLangCode = '';
        } else {
          const parts = currentValue.split('|');
          currentLangCode = parts.length > 1 ? parts[1] : parts[0];
        }

        // 如果 Google Translate 显示的是中文，显示简体中文
        if (currentLangCode === 'zh-CN') {
          setCurrentLanguage('简体中文');
          return;
        }
      }
      // 如果 Google Translate 还没加载或显示其他语言，默认显示简体中文（因为路由是 /zh/）
      setCurrentLanguage('简体中文');
      return;
    }

    // 其他情况：首先检查是否在使用 Docusaurus i18n
    if (localeMatch) {
      // 使用 Docusaurus i18n
      const locale = localeMatch[1];
      if (locale === 'en') {
        setCurrentLanguage('English');
        return;
      } else if (locale === 'zh') {
        setCurrentLanguage('简体中文');
        return;
      }
    }

    // 检查是否有 i18n 配置
    if (i18n && i18n.locales && i18n.locales.length > 0) {
      const currentLocale = i18n.currentLocale || i18n.defaultLocale;
      // 如果路径没有语言前缀，使用默认语言
      if (!pathname.match(/^\/(zh|en)(\/|$)/)) {
        if (currentLocale === 'zh') {
          setCurrentLanguage('简体中文');
          return;
        } else {
          setCurrentLanguage('English');
          return;
        }
      }
    }

    // 如果使用 Google Translate，从 select 元素获取
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement && selectElement.value) {
      // 解析当前语言代码
      const currentValue = selectElement.value;
      let currentLangCode = '';

      if (currentValue === '' || currentValue === 'en') {
        currentLangCode = '';
      } else {
        // 格式可能是 "en|zh-CN"，提取目标语言
        const parts = currentValue.split('|');
        currentLangCode = parts.length > 1 ? parts[1] : parts[0];
      }

      // 找到对应的语言标签
      const lang = LANGUAGES.find(l => l.code === currentLangCode);
      if (lang) {
        setCurrentLanguage(lang.label);
      }
    } else {
      // 如果没有 Google Translate，默认显示英文
      setCurrentLanguage('English');
    }
  };

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // 检查当前路由，如果在中文路由下，根据页面类型决定是否清除 Google Translate
    const pathname = window.location.pathname;
    const isChineseRoute = pathname.match(/^\/(zh)(\/|$)/);
    const isDocsBlog = isDocsOrBlogPage();

    if (isChineseRoute && !isDocsBlog) {
      // 在中文路由下，但不在文档/博客页面，清除所有 Google Translate 相关状态
      const domain = window.location.hostname;
      const domainParts = domain.split('.');
      // 清除所有可能的 cookie
      document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      if (domainParts.length > 1) {
        const rootDomain = '.' + domainParts.slice(-2).join('.');
        document.cookie = `googtrans=; path=/; domain=${rootDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }

      // 如果 Google Translate 已加载，切换回英文
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement && selectElement.value !== '' && selectElement.value !== 'en') {
        const englishOption = Array.from(selectElement.options).find(opt =>
          opt.value === '' || opt.value === 'en'
        );
        if (englishOption) {
          selectElement.value = englishOption.value;
          const event = new Event('change', { bubbles: true });
          selectElement.dispatchEvent(event);
        }
      }
    } else if (isChineseRoute && isDocsBlog) {
      // 在中文路由下的文档/博客页面，应该使用 Google Translate
      // 确保 Google Translate cookie 设置为中文
      const domain = window.location.hostname;
      const cookieValue = `/en/zh-CN`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;

      // 如果 Google Translate 已加载，切换到中文
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        const options = Array.from(selectElement.options);
        const chineseOption = options.find(opt => opt.value.includes('zh-CN'));
        if (chineseOption && selectElement.value !== chineseOption.value) {
          selectElement.value = chineseOption.value;
          const event = new Event('change', { bubbles: true });
          selectElement.dispatchEvent(event);
        }
      }
    }

    // 持续监控并隐藏顶部 banner
    const hideBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame.skiptranslate') as HTMLElement | null;
      if (banner) {
        banner.style.display = 'none';
      }
      // 重置 body 的 top 属性
      if (document.body.style.top) {
        document.body.style.top = '0px';
      }

      // 如果在中文路由下，根据页面类型决定是否清除 Google Translate
      if (isChineseRoute) {
        const isDocsBlog = isDocsOrBlogPage();
        if (!isDocsBlog) {
          // 非文档/博客页面，持续检查并清除 Google Translate
          const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (selectElement && selectElement.value !== '' && selectElement.value !== 'en') {
            const englishOption = Array.from(selectElement.options).find(opt =>
              opt.value === '' || opt.value === 'en'
            );
            if (englishOption) {
              selectElement.value = englishOption.value;
              const event = new Event('change', { bubbles: true });
              selectElement.dispatchEvent(event);
            }
          }
        }
      }
    };

    // 立即执行一次
    hideBanner();

    // 使用 MutationObserver 监控 DOM 变化
    const observer = new MutationObserver(() => {
      hideBanner();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 定期检查（作为备用方案）
    const interval = setInterval(() => {
      hideBanner();

      // 如果在中文路由下，根据页面类型决定是否清除 Google Translate
      if (isChineseRoute) {
        const isDocsBlog = isDocsOrBlogPage();
        if (!isDocsBlog) {
          // 非文档/博客页面，清除 Google Translate cookie
          const domain = window.location.hostname;
          const domainParts = domain.split('.');
          document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          if (domainParts.length > 1) {
            const rootDomain = '.' + domainParts.slice(-2).join('.');
            document.cookie = `googtrans=; path=/; domain=${rootDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          }
        }
      }
    }, 500);

    let checkInterval: NodeJS.Timeout | null = null;

    // 如果脚本已经加载，直接初始化
    if (window.google?.translate?.TranslateElement) {
      // 延迟一下确保 DOM 已准备好
      setTimeout(() => {
        initializeTranslate();
      }, 100);
    } else if (!scriptLoadedRef.current) {
      // 检查是否已经有脚本标签
      const existingScript = document.querySelector('script[src*="translate_a/element.js"]');
      if (existingScript) {
        // 如果脚本已存在，等待它加载完成
        checkInterval = setInterval(() => {
          if (window.google?.translate?.TranslateElement) {
            if (checkInterval) clearInterval(checkInterval);
            scriptLoadedRef.current = true;
            setTimeout(() => {
              initializeTranslate();
            }, 100);
          }
        }, 100);
      } else {
        // 加载 Google Translate 脚本（使用 https 显式协议，避免 CSP 拒绝）
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js';
        script.async = true;

        // 定义全局回调函数（若未来需要 ?cb 形式仍可复用）
        (window as any).googleTranslateElementInit = () => {
          scriptLoadedRef.current = true;
          setTimeout(() => {
            initializeTranslate();
          }, 100);
        };

        document.head.appendChild(script);
      }
    }

    return () => {
      // 清理
      observer.disconnect();
      clearInterval(interval);
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, []);

  // 监听路由变化，更新当前语言
  useEffect(() => {
    updateCurrentLanguage();
  }, [location.pathname]);

  const initializeTranslate = () => {
    if (!translateElementRef.current) {
      return;
    }

    // 检查 Google Translate API 是否可用
    if (!window.google?.translate?.TranslateElement) {
      console.warn('Google Translate API not loaded yet');
      return;
    }

    // 清除之前的内容
    translateElementRef.current.innerHTML = '';

    // 配置 Google Translate（隐藏原生 UI）
    const config = {
      pageLanguage: 'en',
      includedLanguages: 'en,zh-CN,ja,ko,vi,th,fr,es,ms',
      layout: 0,
      autoDisplay: false,
      multilanguagePage: true,
    };

    try {
      // 确保元素有正确的 ID
      if (!translateElementRef.current.id) {
        translateElementRef.current.id = 'google_translate_element';
      }

      new window.google.translate.TranslateElement(
        config,
        'google_translate_element'
      );

      // 等待 select 元素创建后，获取当前语言
      setTimeout(() => {
        updateCurrentLanguage();
      }, 500);

      // 监听路由变化，更新当前语言
      const handleLocationChange = () => {
        updateCurrentLanguage();
      };

      // 立即执行一次
      updateCurrentLanguage();
    } catch (error) {
      console.error('Google Translate initialization error:', error);
    }
  };

  // 清除 Google Translate 翻译状态
  const clearGoogleTranslate = () => {
    // 清除 cookie
    const domain = window.location.hostname;
    document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    // 如果当前在使用 Google Translate，切换回英文（原始语言）
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement && selectElement.value !== '' && selectElement.value !== 'en') {
      // 找到英文选项
      const englishOption = Array.from(selectElement.options).find(opt =>
        opt.value === '' || opt.value === 'en' || opt.value.includes('en|')
      );
      if (englishOption) {
        selectElement.value = englishOption.value;
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      }
    }

    // 移除 Google Translate 添加的样式和类
    document.body.classList.remove('translated-ltr', 'translated-rtl');
    document.documentElement.classList.remove('translated-ltr', 'translated-rtl');

    // 移除 Google Translate 添加的 iframe
    const translateFrames = document.querySelectorAll('iframe[src*="translate"]');
    translateFrames.forEach(frame => {
      if (frame.parentNode) {
        frame.parentNode.removeChild(frame);
      }
    });
  };

  // 判断当前页面是否是文档或博客页面
  const isDocsOrBlogPage = useCallback(() => {
    const pathname = window.location.pathname;
    // 移除语言前缀后检查
    const pathWithoutLocale = pathname.replace(new RegExp(`^/(en|zh)`), '') || pathname;
    return pathWithoutLocale.startsWith('/docs/') ||
           pathWithoutLocale.startsWith('/ccDocs/') ||
           pathWithoutLocale.startsWith('/dmDocs/') ||
           pathWithoutLocale.startsWith('/blog');
  }, []);

  // 使用 Docusaurus i18n 切换语言
  const switchToDocusaurusLocale = useCallback((locale: string) => {
    const pathname = window.location.pathname;
    // 移除现有的语言前缀
    const newPath = pathname.replace(new RegExp(`^/(en|zh)`), '') || '/';
    // 构建目标路径
    const target = locale === i18n.defaultLocale ? newPath : `/${locale}${newPath}`;
    // 使用 window.location.href 强制刷新页面，确保 i18n 正确加载
    window.location.href = target;
  }, [i18n.defaultLocale]);

  // 恢复路由到默认语言（移除语言前缀）
  const restoreDefaultRoute = () => {
    const pathname = window.location.pathname;
    // 如果路径包含语言前缀，移除它
    const newPath = pathname.replace(new RegExp(`^/(en|zh)`), '') || '/';
    // 如果路径改变了，返回新路径（不立即跳转，让调用者决定何时跳转）
    if (newPath !== pathname) {
      return newPath; // 返回新路径
    }
    return null; // 表示不需要跳转
  };

  // 切换语言
  const changeLanguage = (languageCode: string, label: string) => {
    const langCode = languageCode || 'en';

    // 如果是英文，清除 Google Translate 翻译，恢复原始内容和路由
    if (langCode === '' || langCode === 'en') {
      // 清除 Google Translate 状态
      clearGoogleTranslate();

      // 恢复路由到默认语言（移除 /zh 或 /en 前缀）
      const newPath = restoreDefaultRoute();

      if (newPath) {
        // 如果需要跳转，直接跳转
        window.location.href = newPath;
        return;
      }

      // 如果路由没有变化，尝试通过 select 元素切换回原始语言
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        // 找到英文选项并切换
        const englishOption = Array.from(selectElement.options).find(opt =>
          opt.value === '' || opt.value === 'en'
        );
        if (englishOption && selectElement.value !== englishOption.value) {
          selectElement.value = englishOption.value;
          const event = new Event('change', { bubbles: true });
          selectElement.dispatchEvent(event);
        }
      } else {
        // 如果 select 不存在，刷新页面以清除翻译
        window.location.reload();
      }

      setCurrentLanguage(label);
      return;
    } else if (langCode === 'zh-CN') {
      // 判断当前页面是否是文档或博客页面
      const isDocsBlog = isDocsOrBlogPage();

      if (isDocsBlog) {
        // 文档和博客页面使用 Google Translate
        if (!window.google?.translate) {
          console.warn('Google Translate not loaded');
          return;
        }

        // 先恢复路由到默认语言（移除语言前缀）
        const newPath = restoreDefaultRoute();

        if (newPath) {
          // 如果需要跳转，在跳转前设置 Google Translate cookie 为中文
          const domain = window.location.hostname;
          const cookieValue = `/en/zh-CN`;
          document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
          // 跳转到新路径，跳转后 Google Translate 会自动应用翻译
          window.location.href = newPath;
          setCurrentLanguage(label);
          return;
        }

        // 如果不需要跳转，直接应用 Google Translate
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectElement) {
          // 找到中文选项
          const options = Array.from(selectElement.options);
          const targetOption = options.find(opt => opt.value.includes('zh-CN'));

          if (targetOption) {
            selectElement.value = targetOption.value;
            const event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);
            setCurrentLanguage(label);
          }
        } else {
          // 如果 select 不存在，通过 cookie 和刷新页面
          const domain = window.location.hostname;
          const cookieValue = `/en/zh-CN`;
          document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
          window.location.reload();
          return;
        }
      } else {
        // 其他页面使用 Docusaurus i18n
        // 清除 Google Translate 状态（包括 cookie 和 select 元素）
        clearGoogleTranslate();

        // 确保清除所有 Google Translate 相关的 cookie
        const domain = window.location.hostname;
        const domainParts = domain.split('.');
        // 清除主域名和所有可能的子域名 cookie
        document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        if (domainParts.length > 1) {
          const rootDomain = '.' + domainParts.slice(-2).join('.');
          document.cookie = `googtrans=; path=/; domain=${rootDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }

        // 如果当前在使用 Google Translate，先切换回英文
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectElement && selectElement.value !== '' && selectElement.value !== 'en') {
          const englishOption = Array.from(selectElement.options).find(opt =>
            opt.value === '' || opt.value === 'en'
          );
          if (englishOption) {
            selectElement.value = englishOption.value;
            const event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);
          }
        }

        // 使用 Docusaurus 路由切换到中文
        switchToDocusaurusLocale('zh');
      }

      setCurrentLanguage(label);
      return;
    }

    // 其他语言使用 Google Translate
    // 先恢复路由到默认语言（移除语言前缀）
    const newPath = restoreDefaultRoute();

    if (newPath) {
      // 如果需要跳转，在跳转前设置 Google Translate cookie
      const domain = window.location.hostname;
      const cookieValue = `/en/${langCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
      // 跳转到新路径，跳转后 Google Translate 会自动应用翻译
      window.location.href = newPath;
      setCurrentLanguage(label);
      return;
    }

    // 如果不需要跳转，直接应用 Google Translate
    if (!window.google?.translate) {
      console.warn('Google Translate not loaded');
      return;
    }

    // 方法1: 尝试使用 select 元素切换
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      // 找到对应的选项值（Google Translate 使用格式如 "en|zh-CN"）
      const optionValue = `en|${langCode}`;

      // 查找匹配的选项
      const options = Array.from(selectElement.options);
      const targetOption = options.find(opt => opt.value.includes(langCode));

      if (targetOption) {
        selectElement.value = targetOption.value;
        // 触发 change 事件
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
        setCurrentLanguage(label);
      }
    } else {
      // 方法2: 如果 select 不存在，通过 cookie 和刷新页面
      const domain = window.location.hostname;
      const cookieValue = `/en/${langCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
      // 刷新页面以应用翻译
      window.location.reload();
      return;
    }
  };

  // 构建菜单项
  const menuItems: MenuProps['items'] = LANGUAGES.map((lang) => ({
    key: lang.code || 'en',
    label: (
      <div
        className={`notranslate flex items-center gap-2 px-2 py-1.5 rounded transition-colors ${
          currentLanguage === lang.label
            ? 'bg-[#0087c7]/10 text-[#0087c7]'
            : 'text-[#262728] hover:bg-gray-100'
        }`}
        onClick={() => changeLanguage(lang.code, lang.label)}
      >
        {/* <span className="text-lg">{lang.flag}</span> */}
        <span className="text-[14px] font-medium notranslate">{lang.label}</span>
      </div>
    ),
  }));

  // 下拉菜单配置
  const menuProps: MenuProps = {
    items: menuItems,
  };

  // 根据位置返回不同的样式类
  const getPositionClass = () => {
    switch (position) {
      case 'top-right':
        return 'fixed top-20 right-4 z-50';
      case 'top-left':
        return 'fixed top-20 left-4 z-50';
      case 'bottom-right':
        return 'fixed bottom-4 right-4 z-50';
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-50';
      case 'navbar':
        return 'inline-block';
      default:
        return 'fixed top-20 right-4 z-50';
    }
  };

  return (
    <div className={`google-translate-wrapper ${getPositionClass()} ${className}`}>
      {/* 隐藏的 Google Translate 元素 */}
      <div
        id="google_translate_element"
        ref={translateElementRef}
        className="google-translate-element"
        style={{ display: 'none' }}
      />

      {/* 自定义语言选择器 */}
      <Dropdown
        menu={menuProps}
        trigger={['click']}
        placement={isMobile ? 'topRight' : 'bottomRight'}
        overlayClassName="google-translate-dropdown notranslate"
        className='cursor-pointer notranslate'
      >
        <button
          className="notranslate flex items-center justify-center w-10 h-10 border-0 bg-white hover:bg-gray-100 transition-colors focus:outline-none"
          aria-label="Select language"
        >
          <svg
            className="w-6 h-6 text-[#131316]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
        </button>
      </Dropdown>

      <style>{`
        /* 隐藏 Google Translate 的顶部 banner 和 iframe */
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        .skiptranslate {
          display: none !important;
        }
        #:1.container {
          display: none !important;
        }
        .skiptranslate iframe {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .goog-tooltip {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        
        /* 隐藏原生的 Google Translate 组件 */
        .google-translate-element,
        .goog-te-gadget,
        .goog-te-gadget-simple {
          display: none !important;
        }
        
        /* 自定义下拉菜单样式 */
        .google-translate-dropdown .ant-dropdown-menu {
          padding: 8px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          min-width: 180px !important;
          max-height: none !important;
          overflow: visible !important;
        }
        
        .google-translate-dropdown .ant-dropdown-menu-item {
          padding: 0 !important;
          margin: 2px 0 !important;
        }
        
        .google-translate-dropdown .ant-dropdown-menu-item:hover {
          background-color: transparent !important;
        }
        
        /* 确保下拉菜单内容不被翻译 */
        .google-translate-dropdown.notranslate,
        .google-translate-dropdown.notranslate * {
          -webkit-translate: no !important;
          -moz-translate: no !important;
          -ms-translate: no !important;
          translate: no !important;
        }
        
        /* 移动端样式 */
        .mobile-google-translate .google-translate-wrapper {
          width: 100%;
        }
        
        .mobile-google-translate .google-translate-wrapper button {
          width: 100%;
          justify-content: flex-start;
          padding: 0 12px;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
