import React, { useState } from 'react';
import { Tabs } from 'antd';
import Translate, { translate } from '@docusaurus/Translate';
import Slider from './Slider';
import siteConfig from '@generated/docusaurus.config';

interface PriceCalculatorProps {
  priceMeta?: {
    currency: string;
    currencyI18n: string;
    licensePriceVO: {
      priceOneJobPerHour: string;
    };
    payAsYouGoPriceVO: {
      pricePerRow: {
        BUILD_STRUCT: string;
        INCREMENT: string;
        FULL: string;
        REVISE: string;
        CHECK: string;
      };
    };
  };
}

// 数值输入框组件 - 移到组件外部以避免重新渲染时失焦
const NumberInput = ({ value, onChange, className = "" }: { value: number, onChange: (value: number) => void, className?: string }) => {
  const [inputValue, setInputValue] = React.useState(value.toString());

  // 当外部value变化时，同步到内部状态
  React.useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // 只有当输入是有效数字时才更新父组件
    const numValue = Number(newValue);
    if (newValue === '' || newValue === '-') {
      // 允许临时为空或只有负号，传递0给父组件
      onChange(0);
    } else if (!isNaN(numValue) && numValue >= 0) {
      onChange(Math.floor(numValue)); // 确保是整数
    }
  };

  const handleBlur = () => {
    // 失焦时，如果输入无效或为空，重置为当前有效值
    const numValue = Number(inputValue);
    if (inputValue === '' || isNaN(numValue) || numValue < 0) {
      setInputValue(value.toString());
    } else {
      // 格式化为整数
      const formattedValue = Math.floor(numValue).toString();
      setInputValue(formattedValue);
      onChange(Math.floor(numValue));
    }
  };

  return (
    <div className={`w-[70px] h-[40px] sm:h-[44px] bg-white border border-black/10 border-solid rounded-[6px] flex items-center justify-center flex-shrink-0 ${className}`}>
      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full h-full text-center text-[14px] sm:text-[16px] font-medium text-black bg-transparent border-none outline-none"
      />
    </div>
  );
};

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ priceMeta }) => {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const [activeTab, setActiveTab] = useState('cloud-byoc');
  const [isMobile, setIsMobile] = useState(false);
  const [etlValue, setEtlValue] = useState(40);
  const [cdcValue, setCdcValue] = useState(25);
  
  // 根据 priceMeta 或 siteBrand 确定货币单位
  const currencySymbol = priceMeta?.currency === 'RMB' ? '' : '$';
  const currencyUnit = (siteBrand === 'clougence' ? priceMeta?.currencyI18n || translate({ id: 'pricing.currency.yuan', message: '元' }) : '');
  
  // Enterprise版本的配置状态
  const [syncLinks, setSyncLinks] = useState(5);
  const [syncDuration, setSyncDuration] = useState(1);
  const [unitPrice, setUnitPrice] = useState(
    priceMeta?.licensePriceVO?.priceOneJobPerHour ? parseFloat(priceMeta.licensePriceVO.priceOneJobPerHour) : 0.2
  );
  const [consoleNodes, setConsoleNodes] = useState(1);
  const [metabaseNodes, setMetabaseNodes] = useState(1);
  const [workNodes, setWorkNodes] = useState(1);

  // 监听 priceMeta 变化，更新 unitPrice
  React.useEffect(() => {
    if (priceMeta?.licensePriceVO?.priceOneJobPerHour) {
      setUnitPrice(parseFloat(priceMeta.licensePriceVO.priceOneJobPerHour));
    }
  }, [priceMeta]);

  // 监听链路条数变化，重置机器数量
  React.useEffect(() => {
    // 当链路条数从 ≤5 变为 >5 时，重置所有机器数量为1
    if (syncLinks > 5) {
      setConsoleNodes(1);
      setMetabaseNodes(1);
      setWorkNodes(1);
    }
    // 当链路条数从 >5 变为 ≤5 时，重置 Worker 数量为1
    else {
      setWorkNodes(1);
    }
  }, [syncLinks]);
  
  // Cloud (BYOC)版本的Worker配置
  const [byocWorkNodes, setByocWorkNodes] = useState(1);

  // 动态价格计算
  const etlPricePerMillion = priceMeta?.payAsYouGoPriceVO?.pricePerRow?.FULL 
    ? Math.ceil(parseFloat(priceMeta.payAsYouGoPriceVO.pricePerRow.FULL) * 1000000 * 100) / 100
    : 0.01;
  
  const cdcPricePerMillion = priceMeta?.payAsYouGoPriceVO?.pricePerRow?.INCREMENT 
    ? Math.ceil(parseFloat(priceMeta.payAsYouGoPriceVO.pricePerRow.INCREMENT) * 1000000 * 100) / 100
    : 10;

  // 计算总价格
  const calculatePrice = () => {
    if (activeTab === 'enterprise') {
      return calculateEnterprisePrice();
    } else if (activeTab === 'cloud-byoc') {
      return calculateByocPrice();
    }
    // 默认为cloud-managed版本
    const etlCost = (etlValue / 100) * 1000 * 0.01; // 假设最大ETL成本为8000
    const cdcCost = (cdcValue / 100) * 100 * 10; // 假设最大CDC成本为1000
    return (etlCost + cdcCost).toFixed(2);
  };

  const workerCost = siteBrand === 'clougence' ? 0.67 : 0.3712;
  const consoleWorkerCost = siteBrand === 'clougence' ? 0.33 : 0.1014;
  const metabaseWorkerCost = siteBrand === 'clougence' ? 0.7 : 0.3012;

  // 计算Enterprise版本价格
  const calculateEnterprisePrice = () => {
    const hoursPerMonth = syncDuration * 30 * 24; // 按月计算小时数
    
    // 根据链路条数决定机器配置
    let consoleCost = 0;
    let metabaseCost = 0;
    let workCost = 0;
    
    if (syncLinks <= 5) {
      // 链路条数 <= 5 时，只显示 Worker，其他数量为 0
      workCost = workNodes * workCost * hoursPerMonth;
    } else {
      // 链路条数 > 5 时，显示所有机器，使用用户输入的数量
      consoleCost = consoleNodes * consoleWorkerCost * hoursPerMonth;
      metabaseCost = metabaseNodes * metabaseWorkerCost * hoursPerMonth;
      workCost = workNodes * workCost * hoursPerMonth;
    }
    
    const syncCost = syncLinks * unitPrice * hoursPerMonth; // 假设sync link的基础费用
    
    return (consoleCost + metabaseCost + workCost + syncCost).toFixed(2);
  };

  // 计算Cloud (BYOC)版本价格
  const calculateByocPrice = () => {
    const etlCost = (etlValue / 100) * 1000 * etlPricePerMillion; // ETL成本
    const cdcCost = (cdcValue / 100) * 100 * cdcPricePerMillion; // CDC成本
    const workerCost = siteBrand === 'clougence' ? 0.67 : 0.3712;
    const hoursPerMonth = 30 * 24; // 每月小时数
    const workNodeCost = byocWorkNodes * workerCost * hoursPerMonth; // Worker成本
    
    return (etlCost + cdcCost + workNodeCost).toFixed(2);
  };

  // 格式化显示值
  const formatEtlValue = (value?: number) => {
    const val = value !== undefined ? value : etlValue;
    const maxValue = 1000;
    const currentValue = Math.round((val / 100) * maxValue);
    return `${currentValue}${translate({ id: 'pricing.calculator.million', message: ' Million' })}/${translate({ id: 'pricing.calculator.month', message: 'month' })}`;
  };

  const formatCdcValue = (value?: number) => {
    const val = value !== undefined ? value : cdcValue;
    const maxValue = 100;
    const currentValue = Math.round((val / 100) * maxValue);
    return `${currentValue}${translate({ id: 'pricing.calculator.million', message: ' Million' })}/${translate({ id: 'pricing.calculator.month', message: 'month' })}`;
  };

  const items = [
    // {
    //   key: 'cloud-managed',
    //   label: 'Cloud (Managed)',
    //   children: (
    //     <div className="w-[1320px] bg-white rounded-[24px] p-[64px] border border-[#0087c7] border-solid shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]">
    //       <div className="w-full flex gap-[60px]">
    //         {/* 左侧滑块部分 */}
    //         <div className="flex-1">
    //           {/* ETL滑块 */}
    //           <div className="mb-[40px]">
    //             <div className="flex gap-[24px] items-center">
    //               <div className="w-[320px] flex-shrink-0">
    //                 <div className="text-[18px] font-bold text-black mb-[8px]">
    //                   Number of rows to replicate (ETL)
    //                 </div>
    //                 <div className="text-[14px] text-black">
    //                   * 0.00000002 USD/row+
    //                 </div>
    //               </div>
    //               <div className="w-[500px] flex-shrink-0">
    //                 <Slider
    //                   value={etlValue}
    //                   onChange={setEtlValue}
    //                   min={0}
    //                   max={100}
    //                   step={1}
    //                   tooltipFormatter={formatEtlValue}
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           {/* CDC滑块 */}
    //           <div>
    //             <div className="flex gap-[24px] items-center">
    //               <div className="w-[320px] flex-shrink-0">
    //                 <div className="text-[18px] font-bold text-black mb-[8px]">
    //                   Number of rows to replicate(CDC)
    //                 </div>
    //                 <div className="text-[14px] text-black">
    //                   *Includes rows added, edited or deleted
    //                 </div>
    //               </div>
    //               <div className="w-[500px] flex-shrink-0">
    //                 <Slider
    //                   value={cdcValue}
    //                   onChange={setCdcValue}
    //                   min={0}
    //                   max={100}
    //                   step={1}
    //                   tooltipFormatter={formatCdcValue}
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* 右侧总价格部分 */}
    //         <div className="w-[300px] flex flex-col justify-center items-end">
    //           <div className="text-[48px] font-bold text-black mb-[8px]">
    //             {calculatePrice()}$
    //           </div>
    //           <div className="text-[16px] text-black">
    //             Total price/month
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      key: 'cloud-byoc',
      label: translate({ id: 'pricing.calculator.cloudByoc', message: 'Cloud (SaaS Managed & BYOC)' }),
      children: (
        <div className="w-full max-w-[1320px] bg-white rounded-[24px] p-[24px] sm:p-[44px] lg:p-[64px] border border-[#0087c7] border-solid shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]">
          <div className="w-full flex flex-col lg:flex-row gap-[40px] sm:gap-[50px] lg:gap-[60px]">
            {/* 左侧滑块部分 */}
            <div className="flex-1">
              {/* ETL滑块 */}
              <div className="mb-[32px] sm:mb-[36px] lg:mb-[40px]">
                <div className="flex flex-col lg:flex-row gap-[16px] sm:gap-[20px] lg:gap-[24px] lg:items-center">
                  <div className="w-full lg:w-[320px] lg:flex-shrink-0">
                    <div className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-black mb-[6px] sm:mb-[8px]">
                      <Translate id="pricing.calculator.etlRows">Number of Rows to Replicate (ETL)</Translate>
                    </div>
                    <div className="text-[12px] sm:text-[13px] lg:text-[14px] text-black">
                      * {currencySymbol}{etlPricePerMillion}{currencyUnit}/{translate({ id: 'pricing.calculator.millionRows', message: 'million rows' })}
                    </div>
                  </div>
                  <div className="w-full lg:w-[450px] lg:flex-shrink-0">
                    <Slider
                      value={etlValue}
                      onChange={setEtlValue}
                      min={0}
                      max={100}
                      step={1}
                      tooltipFormatter={formatEtlValue}
                    />
                  </div>
                </div>
              </div>

              {/* CDC滑块 */}
              <div className="mb-[32px] sm:mb-[36px] lg:mb-[40px]">
                <div className="flex flex-col lg:flex-row gap-[16px] sm:gap-[20px] lg:gap-[24px] lg:items-center">
                  <div className="w-full lg:w-[320px] lg:flex-shrink-0">
                    <div className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-black mb-[6px] sm:mb-[8px]">
                      <Translate id="pricing.calculator.cdcRows">Number of Rows to Replicate(CDC)</Translate>
                    </div>
                    <div className="text-[12px] sm:text-[13px] lg:text-[14px] text-black">
                      * {currencySymbol}{cdcPricePerMillion}{currencyUnit}/{translate({ id: 'pricing.calculator.millionRows', message: 'million rows' })},{translate({ id: 'pricing.calculator.includesRows', message: 'includes rows added, edited or deleted' })}
                    </div>
                  </div>
                  <div className="w-full lg:w-[450px] lg:flex-shrink-0">
                    <Slider
                      value={cdcValue}
                      onChange={setCdcValue}
                      min={0}
                      max={100}
                      step={1}
                      tooltipFormatter={formatCdcValue}
                    />
                  </div>
                </div>
                <div className="w-full text-[13px] text-[#888] mt-8">
                  <Translate id="pricing.calculator.additionalDiscounts">*We will offer additional discounts on top of this. The greater the usage, the bigger the discount.</Translate>
                </div>
                <div className="border-t border-black/10 border-solid border-0 border-l-0 border-r-0 border-b-0 mt-2"></div>
              </div>

              {/* Worker配置 */}
              <div>
                <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[20px] lg:gap-[24px] sm:items-center">
                  <div className="w-full sm:w-[140px] sm:flex-shrink-0">
                    <div className="text-[18px] sm:text-[20px] font-bold text-black">
                      <Translate id="pricing.calculator.worker">Worker</Translate>
                    </div>
                  </div>
                  <div className="w-full sm:w-[240px] lg:w-[310px] sm:flex-shrink-0">
                    <div className="text-[14px] sm:text-[16px] lg:text-[18px] text-black">
                      <Translate id="pricing.calculator.workerSpecs">4 core cpu ,16GB mem,100 GB disk</Translate>
                    </div>
                  </div>
                  <div className="flex gap-[12px] sm:gap-[16px] items-center">
                    <NumberInput value={byocWorkNodes} onChange={setByocWorkNodes} />
                    <div className="text-[14px] sm:text-[16px] font-medium text-black">
                      {currencySymbol}{workerCost}{currencyUnit}/{translate({ id: 'pricing.calculator.hour', message: 'hour' })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full text-[13px] text-[#888] mt-2">
                {siteBrand === 'clougence' && (
                  <Translate id="pricing.calculator.aliyunReference">*This Aliyun ECS reference price is included for total cost estimation. To view only the CloudCanal cost, set the quantity to 0.</Translate>
                )}
                {siteBrand === 'bladepipe' && (
                  <Translate id="pricing.calculator.awsReference">*This AWS EC2 reference price is included for total cost estimation. To view only the BladePipe cost, set the quantity to 0.</Translate>
                )}
              </div>
            </div>

            {/* 右侧总价格部分 */}
            <div className="w-full lg:w-[300px] flex flex-col justify-center items-center lg:items-end">
              <div className="text-[36px] sm:text-[42px] lg:text-[48px] font-bold text-black mb-[6px] sm:mb-[8px]">
                <span>{currencySymbol}{calculatePrice()}{currencyUnit}</span>
                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-black leading-[20px] sm:leading-[24px] lg:leading-[28px]">
                  <Translate id="pricing.calculator.totalPrice">/month</Translate>
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'enterprise',
      label: translate({ id: 'pricing.calculator.enterprise', message: 'Enterprise' }),
      children: (
        <div className="w-full max-w-[1320px] min-h-[280px] sm:min-h-[320px] lg:min-h-[364px] bg-white rounded-[24px] p-[24px] sm:p-[44px] lg:p-[64px] flex flex-col lg:flex-row gap-[24px] sm:gap-[30px] lg:gap-[36px] items-start lg:items-center border border-[#0087c7] border-solid shadow-[0_4px_8px_rgba(175,199,238,0.1),0_14px_14px_rgba(175,199,238,0.09),0_32px_19px_rgba(175,199,238,0.05),0_56px_22px_rgba(175,199,238,0.01),0_88px_25px_rgba(175,199,238,0)]">
          {/* 左侧配置部分 */}
          <div className="w-full lg:w-[856px] flex flex-col gap-[24px] sm:gap-[30px] lg:gap-[36px]">
            {/* 顶部配置行 */}
            <div className="w-full flex flex-col gap-[12px] sm:gap-[14px] lg:gap-[16px]">
              {/* Number of sync links */}
              <div className="w-full flex flex-col lg:flex-row gap-[12px] lg:gap-[24px] xl:gap-[36px] items-start lg:items-center">
                <span className="w-full lg:w-[120px] xl:w-[160px] text-[18px] sm:text-[19px] lg:text-[20px] font-bold text-black leading-[26px] sm:leading-[28px] lg:leading-[30px] lg:flex-shrink-0">
                  <Translate id="pricing.calculator.numberOfLinks">Number of Links</Translate>
                </span>
                <div className="w-full flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] lg:gap-[24px] xl:gap-[36px] items-start sm:items-center">
                  <div className="flex gap-[12px] sm:gap-[16px] items-center flex-shrink-0">
                    <NumberInput value={syncLinks} onChange={setSyncLinks} />
                    <span className="text-[12px] sm:text-[14px] lg:text-[16px] font-medium text-black leading-[18px] sm:leading-[20px] lg:leading-[24px] whitespace-nowrap">{currencySymbol}{unitPrice}{currencyUnit}/{translate({ id: 'pricing.calculator.hour', message: 'hour' })}</span>
                  </div>
                </div>
              </div>
              <div className="w-full text-[13px] text-[#888] mt-8">
                  <Translate id="pricing.calculator.linksDiscount">*We will offer additional discounts on top of this. The more links, the bigger the discount.</Translate>
                </div>
              <div className="border-t border-black/10 border-solid border-0 border-l-0 border-r-0 border-b-0 mt-2"></div>
            </div>
            
            {/* 资源配置列表 */}
            <div className="w-full flex flex-col gap-[12px] sm:gap-[14px] lg:gap-[16px]">
              {/* Console node - 只在链路条数 > 5 时显示 */}
              {syncLinks > 5 && (
                <div className="w-full flex flex-col lg:flex-row gap-[12px] lg:gap-[24px] xl:gap-[36px] items-start lg:items-center">
                  <span className="w-full lg:w-[120px] xl:w-[240px] text-[18px] sm:text-[19px] lg:text-[20px] font-bold text-black leading-[26px] sm:leading-[28px] lg:leading-[30px] lg:flex-shrink-0">
                    <Translate id="pricing.calculator.console">Console</Translate>
                  </span>
                  <div className="w-full flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] lg:gap-[24px] xl:gap-[36px] items-start sm:items-center">
                    <span className="w-full sm:flex-1 lg:w-[240px] xl:w-[310px] text-[14px] sm:text-[16px] lg:text-[18px] text-black leading-[20px] sm:leading-[24px] lg:leading-[28px]">
                      <Translate id="pricing.calculator.consoleSpecs">2-core CPU, 8 GB RAM, 100 GB storage</Translate>
                    </span>
                    <div className="flex gap-[12px] sm:gap-[16px] items-center flex-shrink-0">
                      <NumberInput value={consoleNodes} onChange={setConsoleNodes} />
                      <span className="text-[12px] sm:text-[14px] lg:text-[16px] font-medium text-black leading-[18px] sm:leading-[20px] lg:leading-[24px] whitespace-nowrap">
                        {currencySymbol}{consoleWorkerCost}{currencyUnit}/{translate({ id: 'pricing.calculator.hour', message: 'hour' })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Worker - 始终显示 */}
              <div className="w-full flex flex-col lg:flex-row gap-[12px] lg:gap-[24px] xl:gap-[36px] items-start lg:items-center">
                <span className="w-full lg:w-[120px] xl:w-[240px] text-[18px] sm:text-[19px] lg:text-[20px] font-bold text-black leading-[26px] sm:leading-[28px] lg:leading-[30px] lg:flex-shrink-0">
                  {syncLinks > 5 ? (
                    <Translate id="pricing.calculator.worker">Worker</Translate>
                  ) : (
                    <Translate id="pricing.calculator.consoleWorkerMetadb">Console,Worker,MetaDB</Translate>
                  )}
                </span>
                <div className="w-full flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] lg:gap-[24px] xl:gap-[36px] items-start sm:items-center">
                  <span className="w-full sm:flex-1 lg:w-[240px] xl:w-[310px] text-[14px] sm:text-[16px] lg:text-[18px] text-black leading-[20px] sm:leading-[24px] lg:leading-[28px]">
                    <Translate id="pricing.calculator.workerSpecsEnterprise">4-core CPU ,16GB RAM,100 GB storage</Translate>
                  </span>
                  <div className="flex gap-[12px] sm:gap-[16px] items-center flex-shrink-0">
                    <NumberInput value={workNodes} onChange={setWorkNodes} />
                    <span className="text-[12px] sm:text-[14px] lg:text-[16px] font-medium text-black leading-[18px] sm:leading-[20px] lg:leading-[24px] whitespace-nowrap">
                      {currencySymbol}{workerCost}{currencyUnit}/{translate({ id: 'pricing.calculator.hour', message: 'hour' })}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Metadata DB - 只在链路条数 > 5 时显示 */}
              {syncLinks > 5 && (
                <div className="w-full flex flex-col lg:flex-row gap-[12px] lg:gap-[24px] xl:gap-[36px] items-start lg:items-center">
                  <span className="w-full lg:w-[120px] xl:w-[240px] text-[18px] sm:text-[19px] lg:text-[20px] font-bold text-black leading-[26px] sm:leading-[28px] lg:leading-[30px] lg:flex-shrink-0">
                    <Translate id="pricing.calculator.metadb">MetaDB</Translate>
                  </span>
                  <div className="w-full flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] lg:gap-[24px] xl:gap-[36px] items-start sm:items-center">
                    <span className="w-full sm:flex-1 lg:w-[240px] xl:w-[310px] text-[14px] sm:text-[16px] lg:text-[18px] text-black leading-[20px] sm:leading-[24px] lg:leading-[28px]">
                      <Translate id="pricing.calculator.metadbSpecs">2-core CPU, 4 GB RAM, 100 GB storage</Translate>
                    </span>
                    <div className="flex gap-[12px] sm:gap-[16px] items-center flex-shrink-0">
                      <NumberInput value={metabaseNodes} onChange={setMetabaseNodes} />
                      <span className="text-[12px] sm:text-[14px] lg:text-[16px] font-medium text-black leading-[18px] sm:leading-[20px] lg:leading-[24px] whitespace-nowrap">
                        {currencySymbol}{metabaseWorkerCost}{currencyUnit}/{translate({ id: 'pricing.calculator.hour', message: 'hour' })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="w-full text-[13px] text-[#888] mt-2">
              {siteBrand === 'clougence' && (
                  <Translate id="pricing.calculator.aliyunReference">*This Aliyun ECS reference price is included for total cost estimation. To view only the CloudCanal cost, set the quantity to 0.</Translate>
                )}
                {siteBrand === 'bladepipe' && (
                  <Translate id="pricing.calculator.awsReference">*This AWS EC2 reference price is included for total cost estimation. To view only the BladePipe cost, set the quantity to 0.</Translate>
                )}
              </div>
            </div>
          </div>
          
          {/* 右侧价格部分 */}
          <div className="w-full lg:w-[300px] flex flex-col gap-[6px] sm:gap-[9px] justify-center items-center lg:items-start lg:pb-[20px]">
            <div className="w-full text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-black leading-[40px] sm:leading-[50px] lg:leading-[60px] text-center lg:text-end">
            <span>{currencySymbol}{calculatePrice()}{currencyUnit}</span>
            <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-black leading-[20px] sm:leading-[24px] lg:leading-[28px]">/{translate({ id: 'pricing.calculator.month', message: 'month' })}</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // 监听窗口宽度，移动端直接上下平铺计算器，不使用 Tab
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-[#eaf6ff] to-[#f8fbff] py-[40px] sm:py-[60px] lg:py-[80px] px-4 sm:px-8">
      <style>{`
        .price-calculator-tabs {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }
        
        .price-calculator-tabs .ant-tabs-nav {
          margin-bottom: 30px !important;
          border: none !important;
          width: 100% !important;
          max-width: 1320px !important;
          display: flex !important;
          justify-content: center !important;
        }
        
        .price-calculator-tabs .ant-tabs-nav-list {
          width: 100% !important;
          max-width: 1320px !important;
          display: flex !important;
          justify-content: center !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
        }
        
        .price-calculator-tabs .ant-tabs-tab {
          font-size: 16px !important;
          font-weight: bold !important;
          color: rgba(0, 0, 0, 0.8) !important;
          padding: 10px 20px !important;
          margin: 0 !important;
          border: none !important;
          background: transparent !important;
          width: 100% !important;
          max-width: 440px !important;
          height: 48px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
        }
        
        @media (min-width: 640px) {
          .price-calculator-tabs .ant-tabs-tab {
            font-size: 18px !important;
            padding: 12px 24px !important;
            height: 52px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .price-calculator-tabs .ant-tabs-tab {
            font-size: 20px !important;
            padding: 14px 28px !important;
            height: 58px !important;
          }
        }
        
        .price-calculator-tabs .ant-tabs-tab:hover {
          color: #0087c7 !important;
        }
        
        .price-calculator-tabs .ant-tabs-tab.ant-tabs-tab-active {
          color: #0087c7 !important;
          border-bottom: 2px solid #0087c7 !important;
          background: none !important;
          margin-bottom: -1px !important;
          text-shadow: none !important;
        }

        .price-calculator-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #0087c7 !important;
        }
        
        .price-calculator-tabs .ant-tabs-ink-bar {
          display: none !important;
        }
        
        .price-calculator-tabs .ant-tabs-content-holder {
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
          margin-top: 40px !important;
        }
        
        @media (min-width: 1024px) {
          .price-calculator-tabs .ant-tabs-content-holder {
            margin-top: 60px !important;
          }
        }
        
        .price-calculator-tabs .ant-tabs-tabpane-active {
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
        }
        
        .price-calculator-tabs .ant-tabs-tabpane-inactive {
          display: none !important;
        }
      `}</style>
      <div className="w-full max-w-[1320px] mx-auto" id="calculator">
        {/* 标题 */}
        <div className="w-full flex flex-col items-center mb-[32px] sm:mb-[40px] lg:mb-[48px]">
          <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] font-bold text-black text-center mb-3">
            <Translate id="pricing.calculator.title">BladePipe Pricing Calculator</Translate>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#666] text-center max-w-[800px]">
            <Translate id="pricing.calculator.description">Estimate your monthly cost based on pipeline usage, links, and data volume — with transparent, usage-based pricing.</Translate>
          </p>
        </div>

        {/* 桌面端：使用 Tab 切换；移动端：上下平铺两个计算器 */}
        {isMobile ? (
          <div className="flex flex-col gap-6 sm:gap-8">
            <section className="w-full">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-black mb-3 text-center">
                <Translate id="pricing.calculator.cloudByoc">Cloud (SaaS Managed & BYOC)</Translate>
              </h3>
              {items[0].children}
            </section>
            <section className="w-full">
              <h3 className="text-[20px] sm:text-[22px] font-bold text-black mb-3 text-center">
                <Translate id="pricing.calculator.enterprise">Enterprise</Translate>
              </h3>
              {items[1].children}
            </section>
          </div>
        ) : (
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={items}
            className="price-calculator-tabs"
            destroyInactiveTabPane={true}
          />
        )}
      </div>
    </div>
  );
};

export default PriceCalculator; 