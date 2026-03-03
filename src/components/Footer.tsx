import React, { useState } from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Popover } from 'antd';

const footerLinks = [
  {
    title: translate({id: 'footer.product', message: 'Product'}),
    links: [
      { name: translate({id: 'footer.product.what', message: 'What is BladePipe'}), href: '/' },
      { name: translate({id: 'footer.product.why', message: 'Why BladePipe'}), href: '/why/' },
      { name: translate({id: 'footer.product.connectors', message: 'Connectors'}), href: '/connector/' },
      { name: translate({id: 'footer.product.pricing', message: 'Pricing'}), href: '/pricing/' },
    ],
  },
  {
    title: translate({id: 'footer.resources', message: 'Resources'}),
    links: [
      { name: translate({id: 'footer.resources.intro', message: 'Introduction'}), href: '/docs/intro/product_intro/' },
      { name: translate({id: 'footer.resources.quickstart', message: 'Quick Start'}), href: '/docs/quick/quick_start_byoc/' },
      { name: translate({id: 'footer.resources.license', message: 'Get a License'}), href: '/docs/license/license_use/' },
      { name: translate({id: 'footer.resources.spec', message: 'Granularity & Specifications'}), href: '/docs/reference/service_difference/' },
      { name: translate({id: 'footer.resources.blog', message: 'Blog'}), href: '/blog' },
    ],
  },
  {
    title: translate({id: 'footer.partners', message: 'Partners'}),
    links: [
      { name: translate({id: 'footer.partners.starrocks', message: 'StarRocks'}), href: 'https://www.starrocks.io/' },
      { name: translate({id: 'footer.partners.oceanbase', message: 'OceanBase'}), href: 'https://en.oceanbase.com/' },
      { name: translate({id: 'footer.partners.automq', message: 'AutoMQ'}), href: 'https://www.automq.com/' },
      { name: translate({id: 'footer.partners.doris', message: 'Doris'}), href: 'https://doris.apache.org/' },
      { name: translate({id: 'footer.partners.greptime', message: 'Greptime'}), href: 'https://greptime.com/' },
    ],
  },
  {
    title: translate({id: 'footer.company', message: 'Company'}),
    links: [
      { name: translate({id: 'footer.company.about', message: 'About'}), href: '/about' },
      { name: translate({id: 'footer.company.contact', message: 'Contact Us'}), href: '/about#contact' },
      { name: translate({id: 'footer.company.terms', message: 'Terms of Service'}), href: '/docs/protocol/terms_of_use' },
      { name: translate({id: 'footer.company.privacy', message: 'Privacy Policy'}), href: '/docs/protocol/privacy_policy' },
    ],
  },
];

const clouddmFooterLinks = [
  {
    title: '产品',
    links: [
      { name: '价格', href: '/pricing' },
      { name: '产品文档', href: '/docs/intro/product_intro' },
      { name: '版本记录', href: '/docs/category/版本说明' },
      { name: '支持的数据库', href: '/docs/intro/product_func' },
    ],
  },
  {
    title: '资源',
    links: [
      { name: '博客', href: '/blog' },
      { name: '媒体资源', href: '/docs/resource/resource_download' },
      { name: '合作认证', href: '/blog/announcement/dameng_compatible' },
    ],
  },
  {
    title: '公司',
    links: [
      { name: '公司简介', href: '/about' },
      { name: '联系我们', href: '/about#contact' },
      { name: '服务条款', href: '/docs/protocol/terms_of_use' },
      { name: '隐私策略', href: '/docs/protocol/privacy_policy' },
    ],
  },
];

const clougenceFooterLinks = [
  {
    title: translate({id: 'footer.product', message: 'Product'}),
    links: [
      { name: translate({id: 'footer.product.what.cloudcanal', message: 'What is CloudCanal'}), href: '/' },
      { name: translate({id: 'footer.product.why.cloudcanal', message: 'Why CloudCanal'}), href: '/why' },
      { name: translate({id: 'footer.product.connectors', message: 'Connectors'}), href: '/connector' },
      { name: translate({id: 'footer.product.pricing', message: 'Pricing'}), href: '/pricing' },
    ],
  },
  {
    title: translate({id: 'footer.resources', message: 'Resources'}),
    links: [
      { name: translate({id: 'footer.resources.intro', message: 'Introduction'}), href: '/docs/intro/product_intro' },
      { name: translate({id: 'footer.resources.quickstart', message: 'Quick Start'}), href: '/docs/quick/quick_start_byoc' },
      { name: translate({id: 'footer.resources.license', message: 'Get a License'}), href: '/docs/license/license_use' },
      { name: translate({id: 'footer.resources.spec', message: 'Granularity & Specifications'}), href: '/docs/reference/service_difference' },
      { name: translate({id: 'footer.resources.blog', message: 'Blog'}), href: '/blog' },
    ],
  },
  {
    title: translate({id: 'footer.partners', message: 'Partners'}),
    links: [
      { name: translate({id: 'footer.partners.starrocks', message: 'StarRocks'}), href: 'https://www.starrocks.io/' },
      { name: translate({id: 'footer.partners.oceanbase', message: 'OceanBase'}), href: 'https://en.oceanbase.com/' },
      { name: translate({id: 'footer.partners.automq', message: 'AutoMQ'}), href: 'https://www.automq.com/' },
      { name: translate({id: 'footer.partners.doris', message: 'Doris'}), href: 'https://doris.apache.org/' },
      { name: translate({id: 'footer.partners.greptime', message: 'Greptime'}), href: 'https://greptime.com/' },
    ],
  },
  {
    title: translate({id: 'footer.company', message: 'Company'}),
    links: [
      { name: translate({id: 'footer.company.about', message: 'About'}), href: '/about' },
      { name: translate({id: 'footer.company.contact', message: 'Contact Us'}), href: '/about#contact' },
      { name: translate({id: 'footer.company.terms', message: 'Terms of Service'}), href: '/docs/protocol/terms_of_use' },
      { name: translate({id: 'footer.company.privacy', message: 'Privacy Policy'}), href: '/docs/protocol/privacy_policy' },
    ],
  },
];

export default function Footer() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  
  return (
    <footer className="w-full bg-[#f8f9fb] pt-12 md:pt-20 pb-5 px-0 flex flex-col items-center">
      <div className="w-full max-w-[1320px] flex flex-col px-4 md:px-0">
        {/* 上半部分 */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-10 md:gap-0 mb-[72px]">
          {/* 左侧简介 */}
          <div className="w-full md:w-[486px] flex flex-col gap-6 md:gap-10 mb-8 md:mb-0">
            <div className="text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-[#262728] font-medium font-['Plus Jakarta Sans']">
              {siteBrand === 'clouddm' ? (
                'CloudDM 是一款专注于团队化一站式数据库开发管理工具，通过语句级别权限、数据库 CI/CD、SQL 工单、审核流程等功能在保障数据库安全情况下提升团队协作效率。'
              ) : siteBrand === 'clougence' ? (
                <Translate id="footer.intro.clougence">ClouGence（杭州开云集致科技有限公司）is a data integration platform focusing on real-time end-to-end data flow, making your data always reliable and ready to use.</Translate>
              ) : (
                <Translate id="footer.intro">BladePipe is a data integration platform focusing on real-time end-to-end data flow, making your data always reliable and ready to use.</Translate>
              )}
            </div>
            {/* logo 占位，可替换为实际 logo */}
            {siteBrand === 'bladepipe' && (
              <div className="flex flex-row items-center gap-3 md:gap-5 mt-2">
                <a href="https://trust.bladepipe.com/" target="_blank"><img src="/img/home/certifications/gdpr.svg" alt="GDPR" className="h-[36px] md:h-[50px] w-auto" /></a>
                <a href="https://trust.bladepipe.com/" target="_blank"><img src="/img/home/certifications/iso27001 1.svg" alt="ISO27001" className="h-[36px] md:h-[50px] w-auto" /></a>
                <a href="https://trust.bladepipe.com/" target="_blank"><img src="/img/home/certifications/soc2 2 1.svg" alt="SOC2" className="h-[36px] md:h-[50px] w-auto" /></a>
              </div>
            )}
            {/* 社交图标 */}
            <div className="flex flex-row gap-3 md:gap-4 mt-2">
              {siteBrand === 'clouddm' ? (
                // DM 品牌的社交媒体图标：公众号、微信、QQ、邮件
                <>
                  <Popover
                    content={
                      <div className="text-center">
                        <div className="mb-2">
                          <span className="text-[12px] text-gray-600">
                            扫码关注 CloudDM 公众号
                          </span>
                        </div>
                        <img 
                          src="/img/contact/wechat-official-code.jpg"
                          alt="CloudDM 公众号"
                          className="w-[140px] h-[140px] rounded-[4px]"
                        />
                      </div>
                    }
                    title={null}
                    trigger="click"
                    placement="top"
                    overlayClassName="wechat-qr-popover"
                  >
                    <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black cursor-pointer" title="微信">
                      <img src="/img/contact/wechat-official.svg" alt="公众号" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-400" />
                    </div>
                  </Popover>
                  <Popover
                    content={
                      <div className="text-center">
                        <div className="mb-2">
                          <span className="text-[12px] text-gray-600">
                            扫描二维码添加微信小助手
                          </span>
                        </div>
                        <img 
                          src="/img/contact/wechat-clouddm.png"
                          alt="CloudDM 微信小助手二维码"
                          className="w-[120px] h-[120px] rounded-[4px]"
                        />
                      </div>
                    }
                    title={null}
                    trigger="click"
                    placement="top"
                    overlayClassName="wechat-qr-popover"
                  >
                    <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black cursor-pointer" title="微信">
                      <img src="/img/contact/wechat.svg" alt="微信" className="w-6 h-6 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-400" />
                    </div>
                  </Popover>
                  <a href="https://qm.qq.com/cgi-bin/qm/qr?k=yKGD9ByfkVxuUB3Z2-mHXugUQcbfcQlV&jump_from=webapi&authKey=K1nBsLZ8YGsUhIG56BTJ0j9vQOow6g8oBCM2UufnU69TBIQ48T5iJdQ1sZVyrdSX" target="_blank" className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black" title="QQ">
                    <img src="/img/contact/qq.svg" alt="QQ" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-400" />
                  </a>
                  <a href="mailto:clouddm_support@clougence.com" className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black" title="邮件">
                    <img src="/img/contact/email.svg" alt="邮件" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                  </a>
                </>
              ) : siteBrand === 'clougence' ? (
                // ClouGence 品牌的社交媒体图标：微信、微信公众号、邮箱、电话
                <>
                  <Popover
                    content={
                      <div className="text-center">
                        <div className="mb-2">
                          <span className="text-[12px] text-gray-600">
                            <Translate id="footer.wechat.scan">扫码添加微信</Translate>
                          </span>
                        </div>
                        <img 
                          src="/img/contact/wechat.png"
                          alt="ClouGence 微信小助手"
                          className="w-[140px] h-[140px] rounded-[4px]"
                        />
                      </div>
                    }
                    title={null}
                    trigger="click"
                    placement="top"
                    overlayClassName="wechat-qr-popover"
                  >
                    <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black cursor-pointer" title="微信">
                      <img src="/img/contact/wechat.svg" alt="微信" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-400" />
                    </div>
                  </Popover>
                  <Popover
                    content={
                      <div className="text-center">
                        <div className="mb-2">
                          <span className="text-[12px] text-gray-600">
                            <Translate id="footer.wechat.official.scan">扫码关注 ClouGence 微信公众号</Translate>
                          </span>
                        </div>
                        <img 
                          src="/img/contact/wechat-cc-official-code.jpg"
                          alt="ClouGence 官微"
                          className="w-[140px] h-[140px] rounded-[4px]"
                        />
                      </div>
                    }
                    title={null}
                    trigger="click"
                    placement="top"
                    overlayClassName="wechat-qr-popover"
                  >
                    <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black cursor-pointer" title="微信公众号">
                      <img src="/img/contact/wechat-official.svg" alt="微信公众号" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-400" />
                    </div>
                  </Popover>
                  <a href="mailto:cloudcanal_support@clougence.com" className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black" title="邮箱">
                    <img src="/img/contact/email.svg" alt="邮箱" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                  </a>
                  <Popover
                    content={
                      <div className="text-center">
                        <div className="mb-2">
                          <span className="text-[12px] text-gray-600">
                            <Translate id="footer.phone.title">联系电话</Translate>
                          </span>
                        </div>
                        <p className="text-[14px] font-medium text-black">
                          <Translate id="footer.phone.number">0571-88603096</Translate>
                        </p>
                      </div>
                    }
                    title={null}
                    trigger="click"
                    placement="top"
                    overlayClassName="phone-popover"
                  >
                    <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black cursor-pointer" title="电话">
                      <img src="/img/about/contact/phone.svg" alt="电话" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                    </div>
                  </Popover>
                </>
              ) : (
                // 其他品牌的社交媒体图标：LinkedIn、Twitter、Email、Slack
                <>
                  <a href="https://www.linkedin.com/company/bladepipe"
                    className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black"
                    title="LinkedIn"
                  >
                    <img src="/img/contact/linkedin.svg" alt="LinkedIn" className="w-4 h-4 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                  </a>
                  <a href="https://x.com/bladepipe" className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black" title="Twitter">
                    <img src="/img/contact/twitter.svg" alt="Twitter" className="w-4 h-4 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                  </a>
                  <a href="mailto:support@bladepipe.com" className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black" title="Email">
                    <img src="/img/contact/email.svg" alt="Email" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                  </a>
                  {/*<a href="https://join.slack.com/t/bladepipehq/shared_invite/zt-2sh9op2yo-JIsDrstycVMdKM4auCTm8g" className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black" title="Slack">*/}
                  {/*  <img src="/img/contact/slack.svg" alt="Slack" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />*/}
                  {/*</a>*/}
                  <a href="https://discord.gg/HMnThuQMup" target="_blank" className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black" title="Slack">
                    <img src="/img/contact/discord.svg" alt="Discord" className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                  </a>
                </>
              )}
            </div>
          </div>
          {/* 右侧链接区 */}
          <div className="w-full md:w-[680px] flex flex-col sm:flex-row md:flex-row flex-wrap md:flex-nowrap gap-8 md:gap-[60px]">
            {siteBrand === 'clouddm' ? (
              clouddmFooterLinks.map((col, i) => (
                <div key={col.title} className="flex flex-col gap-4 md:gap-6 min-w-[110px] flex-1">
                  <div className="text-[15px] md:text-[18px] font-bold leading-[22px] md:leading-[28px] text-[#131316] font-['Plus Jakarta Sans'] mb-2 whitespace-nowrap truncate" title={col.title}>{col.title}</div>
                  <div className="flex flex-col gap-2 md:gap-3">
                    {col.links.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] text-[#3f3f46] font-medium font-['Plus Jakarta Sans'] transition-colors duration-200 hover:text-[#0087c7] hover:underline"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))
            ) : siteBrand === 'clougence' ? (
              clougenceFooterLinks.map((col, i) => (
                <div key={col.title} className="flex flex-col gap-4 md:gap-6 min-w-[110px] flex-1">
                  <div className="text-[15px] md:text-[18px] font-bold leading-[22px] md:leading-[28px] text-[#131316] font-['Plus Jakarta Sans'] mb-2 whitespace-nowrap truncate" title={col.title}>{col.title}</div>
                  <div className="flex flex-col gap-2 md:gap-3">
                    {col.links.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] text-[#3f3f46] font-medium font-['Plus Jakarta Sans'] transition-colors duration-200 hover:text-[#0087c7] hover:underline"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              footerLinks.map((col, i) => (
                <div key={col.title} className="flex flex-col gap-4 md:gap-6 min-w-[110px] flex-1">
                  <div className="text-[15px] md:text-[18px] font-bold leading-[22px] md:leading-[28px] text-[#131316] font-['Plus Jakarta Sans'] mb-2 whitespace-nowrap truncate" title={col.title}>{col.title}</div>
                  <div className="flex flex-col gap-2 md:gap-3">
                    {col.links.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] text-[#3f3f46] font-medium font-['Plus Jakarta Sans'] transition-colors duration-200 hover:text-[#0087c7] hover:underline"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* 分割线 */}
        <div className="w-full h-px bg-[#11101a]/10 mb-4"></div>
        {/* 下半部分 */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full h-auto md:h-[42px] gap-4 md:gap-0">
          <div className="text-[12px] leading-[18px] text-[#262728] font-medium font-['Plus Jakarta Sans']">
            {siteBrand === 'clouddm' ? (
              <div className="opacity-70">
                <Translate id="footer.copyright.clouddm">Copyright © 2025 杭州开云集致科技有限公司 备案号：</Translate>
                <a 
                  target="_blank" 
                  className="text-[#262728] hover:text-[#0087c7] transition-colors duration-200" 
                  href="https://beian.miit.gov.cn"
                >
                  浙ICP备20007605号-4
                </a>
                {/* <a 
                  target="_blank" 
                  className="text-[#262728] hover:text-[#0087c7] transition-colors duration-200 ml-2" 
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002015480"
                >
                  浙公网安备 33011002015480
                </a> */}
              </div>
            ) : siteBrand === 'clougence' ? (
              <div className="opacity-70">
                <Translate id="footer.copyright.clougence">Copyright © 2025 杭州开云集致科技有限公司 备案号：</Translate>
                <a 
                  target="_blank" 
                  className="text-[#262728] hover:text-[#0087c7] transition-colors duration-200" 
                  href="https://beian.miit.gov.cn"
                >
                  浙ICP备20007605号-1
                </a>
                <a 
                  target="_blank" 
                  className="text-[#262728] hover:text-[#0087c7] transition-colors duration-200 ml-2" 
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002015480"
                >
                  浙公网安备 33011002015480
                </a>
              </div>
            ) : (
              <Translate id="footer.copyright">© 2025 BladePipe Co., Ltd. All rights reserved.</Translate>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
} 