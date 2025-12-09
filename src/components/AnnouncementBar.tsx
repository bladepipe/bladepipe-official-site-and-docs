import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface AnnouncementConfig {
  enabled: boolean;
  text?: string;
  linkUrl?: string;
  endDate?: string; // ISO 日期字符串，如 '2025-12-31T23:59:59' 或 '2025-12-31'
}

export default function AnnouncementBar() {
  const { siteConfig } = useDocusaurusContext();
  const announcementConfig = siteConfig.customFields?.announcement as AnnouncementConfig | undefined;

  // 如果未配置或未启用，则不显示
  if (!announcementConfig || !announcementConfig.enabled) {
    return null;
  }

  const { text, linkUrl, endDate } = announcementConfig;

  // 如果没有链接地址，则不显示
  if (!linkUrl) {
    return null;
  }

  // 检查是否超过结束时间
  if (endDate) {
    try {
      const endDateTime = new Date(endDate).getTime();
      const currentTime = new Date().getTime();
      
      // 如果当前时间超过了结束时间，则不显示
      if (currentTime > endDateTime) {
        return null;
      }
    } catch (error) {
      console.error('Invalid endDate format in announcement config:', error);
      // 如果日期格式错误，继续显示（避免配置错误导致功能完全失效）
    }
  }

  return (
    <Link
      to={linkUrl}
      className="announcement-bar w-full h-10 flex items-center justify-center relative z-[60] group cursor-pointer transition-all duration-300"
      style={{
        background: 'linear-gradient(90deg, #5020FF 0%, #32C5EE 100%)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(90deg, #7A4AFF 0%, #5FE5FF 100%)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(90deg, #5020FF 0%, #32C5EE 100%)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div className="w-full max-w-[1920px] mx-auto flex items-center justify-center gap-1 sm:gap-1.5 px-4 sm:px-6">
        {/* 公告文本 */}
        <span className="text-white text-xs sm:text-sm md:text-base font-medium text-center leading-relaxed">
          {text || (
            <Translate id="announcement.defaultText" description="Default announcement text">
              New features available! Check out our latest updates.
            </Translate>
          )}
        </span>
        
        {/* 箭头图标 */}
        <ArrowRightIcon 
          className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" 
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
