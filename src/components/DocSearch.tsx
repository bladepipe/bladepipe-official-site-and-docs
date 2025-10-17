import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';

// 搜索按钮组件，模拟 DocSearch 的样式
function SearchButton({ onClick, translations }) {
  return (
    <button
      type="button"
      className="DocSearch DocSearch-Button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: '#f5f5f5',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#666',
        minWidth: '200px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#0087c7';
        e.currentTarget.style.boxShadow = '0 0 0 1px #0087c7';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e0e0e0';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = '#0087c7';
        e.currentTarget.style.boxShadow = '0 0 0 1px #0087c7';
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = '#e0e0e0';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={onClick}
    >
      {/* 搜索图标 */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      
      {/* 搜索文本 */}
      <span style={{ flex: 1, textAlign: 'left' }}>
        {translations?.buttonText || '搜索文档'}
      </span>
      
      {/* 快捷键提示 */}
      <span
        style={{
          fontSize: '12px',
          padding: '2px 6px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '3px',
          fontFamily: 'monospace',
        }}
      >
        ⌘K
      </span>
    </button>
  );
}

// 提示模态框组件
function SearchModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>
          <Translate id="docSearch.configRequired.title">
            配置搜索服务
          </Translate>
        </h3>
        <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: 1.6 }}>
          <Translate id="docSearch.configRequired.description">
            要启用搜索功能，需要申请 Algolia DocSearch 服务。请访问 Algolia DocSearch 提交申请，或联系开发者配置搜索服务。
          </Translate>
          {' '}
          <a 
            href="https://docsearch.algolia.com/apply" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#0087c7', textDecoration: 'underline' }}
          >
            申请链接
          </a>
        </p>
        <button
          onClick={onClose}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0087c7',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          <Translate id="docSearch.configRequired.close">
            关闭
          </Translate>
        </button>
      </div>
    </div>
  );
}

function DocSearch({ className }: { className?: string }) {
  const { siteConfig } = useDocusaurusContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchClick = () => {
    if (siteConfig.themeConfig.algolia) {
      // 如果配置了 Algolia，这里可以打开真实的搜索
      console.log('Algolia 搜索配置已就绪');
    } else {
      // 显示配置提示
      setIsModalOpen(true);
    }
  };

  return (
    <div className={className}>
      <SearchButton
        onClick={handleSearchClick}
        translations={siteConfig.themeConfig.algolia?.translations?.button}
      />
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default function DocSearchWrapper() {
  return <DocSearch />;
}
