import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';

export default function WechatFloat() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  const [isVisible, setIsVisible] = useState(true);
  const isSupportedBrand = siteBrand === 'clouddm' || siteBrand === 'clougence';
  const qrcodeSrc = siteBrand === 'clougence' ? '/img/contact/wechat.png' : '/img/contact/wechat-clouddm.png';

  if (!isSupportedBrand) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="wechat-float-container">
      <div className="wechat-float-content">
        <div className="wechat-float-header">
          <span className="wechat-float-title">
            <Translate id="wechatFloat.title">联系我们</Translate>
          </span>
          <button 
            className="wechat-float-close" 
            onClick={handleClose}
            aria-label="关闭"
          >
            ×
          </button>
        </div>
        <div className="wechat-float-body">
          <img 
            src={qrcodeSrc}
            alt="微信二维码"
            className="wechat-float-image"
          />
          <p className="wechat-float-text">
            <Translate id="wechatFloat.description">扫码添加微信，获取技术支持</Translate>
          </p>
        </div>
      </div>
    </div>
  );
}
