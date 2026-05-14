import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import PlusIcon from '@site/static/img/home/icon/plus.svg';
import MinusIcon from '@site/static/img/home/icon/minus.svg';
import siteConfig from '@generated/docusaurus.config';
import { normalizeLinkForSiteBrand } from '@site/src/utils/nav';
import JsonLd from '@site/src/components/JsonLd';
import { getFaqStructuredData } from '@site/src/utils/structuredData';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

const FAQ: React.FC = () => {
  const siteBrand = siteConfig.customFields?.siteBrand as string;

  // 根据 sitebrand 选择不同的 FAQ 内容
  const getFAQItems = (): FAQItem[] => {
    if (siteBrand === 'clouddm') {
      return [
        {
          id: 1,
          question: translate({ id: 'faq.clouddm.communityExpiry', message: '社区版会到期吗，到期后怎么办？' }),
          answer: translate({ id: 'faq.clouddm.communityExpiryAnswer', message: '社区版到期后可到官网续期，具体请参考：{{link:许可证获取:/docs/license/license_use}}。' }),
          isOpen: false
        }
      ];
    } else {
      // 默认的 FAQ 内容
      return [
        {
          id: 1,
          question: siteBrand === 'clougence' ? translate({ id: 'faq.credits.clougence', message: 'What are CloudCanal credits?' }) : translate({ id: 'faq.credits', message: 'What are BladePipe credits?' }),
          answer: siteBrand === 'clougence' ? translate({ id: 'faq.creditsAnswer.clougence', message: 'Each newly registered user will receive a certain amount of credit vouchers (1 credit = 1 yuan), which are used for cloud services and will be deducted first in each billing cycle. Therefore, you can start the free trial without recharge and card binding. If you have special circumstances and would like to apply for more credit vouchers, please contact us.' }) : translate({ id: 'faq.creditsAnswer', message: 'Each newly registered user will receive 300 credits (1 credit= 1 dollar), which will be deducted first during each billing cycle. Therefore, you can start the free trial without a credit card. If you have special circumstances and would like to request more credits, please contact us.' }),
          isOpen: false
        },
        {
          id: 2,
          question: translate({ id: 'faq.link', message: 'What is a link?' }),
          answer: translate({ id: 'faq.linkAnswer', message: 'A link is a connection between two data sources that allows data to flow from one to the other. It represents a data pipeline that can be configured to transform and transfer data according to your specific requirements.' }),
          isOpen: false
        },
        {
          id: 3,
          question: translate({ id: 'faq.discounts', message: 'Do you offer discounts for higher volumes?' }),
          answer: translate({ id: 'faq.discountsAnswer', message: 'Yes, we offer volume discounts for enterprise customers. The more data you process, the better rates you get. Please contact our sales team for custom pricing based on your specific volume requirements.' }),
          isOpen: false
        },
        {
          id: 4,
          question: siteBrand === 'clougence' ? translate({ id: 'faq.architecture.clougence', message: 'What\'s the architecture of CloudCanal?' }) : translate({ id: 'faq.architecture', message: 'What\'s the architecture of BladePipe?' }),
          answer: siteBrand === 'clougence' ? translate({ id: 'faq.architectureAnswer.clougence', message: 'The architectural information of CloudCanal can be found in the {{link:Architecture:/docs/intro/product_arch}}. We also welcome the opportunity to engage with you to share further details.' }) : translate({ id: 'faq.architectureAnswer', message: 'The architectural information of BladePipe can be found in the {{link:Architecture:/docs/intro/product_arch}}. We also welcome the opportunity to engage with you to share further details.' }),
          isOpen: false
        }
      ];
    }
  };

  const [faqItems, setFaqItems] = useState<FAQItem[]>(getFAQItems());
  const faqJsonLdItems = faqItems.map((item) => ({
    question: item.question,
    answer: item.answer.replace(/\{\{link:([^:]+):([^}]+)\}\}/g, '$1'),
  }));

  const toggleFAQ = (id: number) => {
    setFaqItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
      )
    );
  };

  // 解析答案中的链接占位符并转换为可点击链接
  const renderAnswerWithLinks = (answer: string) => {
    // 匹配 {{link:链接文本:链接地址}} 格式的占位符
    const linkRegex = /\{\{link:([^:]+):([^}]+)\}\}/g;
    
    if (!linkRegex.test(answer)) {
      return answer;
    }

    const parts = [];
    let lastIndex = 0;
    let match;

    // 重置正则表达式的lastIndex
    linkRegex.lastIndex = 0;
    
    while ((match = linkRegex.exec(answer)) !== null) {
      // 添加占位符前的文本
      if (match.index > lastIndex) {
        parts.push(answer.slice(lastIndex, match.index));
      }
      
      // 添加链接
      parts.push(
        <a 
          key={match.index} 
          href={normalizeLinkForSiteBrand(match[2], siteBrand)} 
          className="text-[#0087c7] hover:underline"
        >
          {match[1]}
        </a>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // 添加剩余的文本
    if (lastIndex < answer.length) {
      parts.push(answer.slice(lastIndex));
    }
    
    return parts;
  };

  return (
    <div className="w-full bg-white py-[48px] sm:py-[72px] lg:py-[96px] px-4 sm:px-8 lg:px-[80px]">
      <JsonLd data={getFaqStructuredData(faqJsonLdItems)} />
      <div className="w-full max-w-[1320px] mx-auto">
        {/* 标题部分 */}
        <div className="w-full max-w-[612px] mx-auto mb-[40px] sm:mb-[50px] lg:mb-[60px]">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black mb-[8px] sm:mb-[10px] lg:mb-[12px] leading-[36px] sm:leading-[42px] lg:leading-[50px] text-center">
            <Translate id="faq.title">
              Frequently Asked Questions
            </Translate>
          </h2>
          <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-black leading-[24px] sm:leading-[26px] lg:leading-[28px] text-center">
            <Translate id="faq.subtitle">
              Can't find the answer you're looking for? 
            </Translate>
            <a href={normalizeLinkForSiteBrand('/about#ContactUs', siteBrand)} className="text-[#0087c7]">
              <Translate id="faq.contact_support">
                Reach out to our support team.
              </Translate>
            </a>
          </p>
        </div>

        {/* FAQ列表 */}
        <div className="w-full max-w-[980px] mx-auto">
          {faqItems.map((item, index) => (
            <div key={item.id} className="last:mb-0">
              <div 
                className={`w-full cursor-pointer ${
                  item.isOpen ? 'h-auto rounded-[16px] sm:rounded-[20px] lg:rounded-[24px]' : 'min-h-[80px] sm:min-h-[90px] lg:h-[100px] bg-white'
                }`}
                style={{
                  ...(item.isOpen ? {
                    background: 'linear-gradient(135deg, #e8f4ff 0%, #ffffff 91.35%)',
                    boxShadow: '0px 4px 8px rgba(175, 199, 238, 0.1), 0px 14px 14px rgba(175, 199, 238, 0.09), 0px 32px 19px rgba(175, 199, 238, 0.05), 0px 56px 22px rgba(175, 199, 238, 0.01), 0px 88px 25px rgba(175, 199, 238, 0)'
                  } : {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
                  })
                }}
                onClick={() => toggleFAQ(item.id)}
              >
                <div className="p-[20px] sm:p-[28px] lg:p-[36px]">
                  {/* 问题行 */}
                  <div className={`flex justify-between items-start sm:items-center gap-[16px] ${
                    item.isOpen ? 'mb-[20px] sm:mb-[25px] lg:mb-[30px]' : 'mb-0'
                  }`}>
                    <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-black leading-[24px] sm:leading-[26px] lg:leading-[28px] flex-1 pr-[8px]">
                      {item.question}
                    </h3>
                    <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] flex items-center justify-center flex-shrink-0">
                      {item.isOpen ? (
                        <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </div>
                  </div>
                  
                  {/* 答案 */}
                  {item.isOpen && (
                    <div className="text-[14px] sm:text-[15px] lg:text-[16px] text-black leading-[20px] sm:leading-[22px] lg:leading-[24px] opacity-80 pr-[28px] sm:pr-[32px] lg:pr-[40px]">
                      {renderAnswerWithLinks(item.answer)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 
