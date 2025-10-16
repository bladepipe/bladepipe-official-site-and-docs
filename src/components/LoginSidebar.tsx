import React from 'react';
import siteConfig from '@generated/docusaurus.config';

interface LoginSidebarProps {
  title: React.ReactNode;
  description: React.ReactNode;
  features: React.ReactNode[];
}

const LoginSidebar: React.FC<LoginSidebarProps> = ({ title, description, features }) => {
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  
  // 根据 siteBrand 选择 logo
  const getLogoSrc = () => {
    switch (siteBrand) {
      case 'clougence':
        return '/img/home/CloudCanal_white.svg';
      case 'clouddm':
        return '/img/home/CloudDM_white.svg';
      default:
        return '/img/home/Bladepipe_white.svg';
    }
  };
  
  const getLogoAlt = () => {
    switch (siteBrand) {
      case 'clougence':
        return 'CloudCanal Logo';
      case 'clouddm':
        return 'CloudDM Logo';
      default:
        return 'BladePipe Logo';
    }
  };
  
  const logoSrc = getLogoSrc();
  const logoAlt = getLogoAlt();
  
  // 根据 siteBrand 选择特性列表
  const getFeatures = () => {
    if (siteBrand === 'clougence') {
      return [
        '代金券',
        '所有数据源都可用',
        '全功能开放',
        '云端和私有部署可选'
      ];
    } else if (siteBrand === 'clouddm') {
      return [
        '所有数据源都可用',
        '支持协同管理',
        '支持数据脱敏',
        '支持数据库 CI/CD'
      ];
    }
    return features;
  };
  
  const displayFeatures = getFeatures();
  
  return (
    <div className="hidden xl:flex xl:w-1/2 2xl:w-[960px] h-screen bg-[#0087c7] flex-col gap-[50px] justify-start items-center px-[60px] xl:px-[120px] 2xl:px-[160px] pt-[180px] xl:pt-[200px] 2xl:pt-[240px] relative">
      {/* 背景图片 - 在文字内容的下面一层 */}
      <img 
        src="/img/login/background.svg" 
        alt="Background" 
        className="absolute top-[150px] xl:top-[180px] 2xl:top-[200px] left-0 w-full h-[300px] xl:h-[350px] 2xl:h-[400px] object-cover z-0"
      />
      
      {/* 白色椭圆装饰 */}
      <div className="absolute top-[-100px] xl:top-[-120px] 2xl:top-[-143px] left-[20%] xl:left-[25%] 2xl:left-[196px] w-[300px] xl:w-[360px] 2xl:w-[421px] h-[200px] xl:h-[230px] 2xl:h-[267px] bg-white rounded-full blur-[150px] xl:blur-[170px] 2xl:blur-[189.8px] z-1"></div>
      
      {/* 内容区域 */}
      <div className="relative z-10 w-full max-w-[600px] h-auto flex flex-col gap-[30px] xl:gap-[40px] justify-start items-start">
        <a href="/">
          <img src={logoSrc} alt={logoAlt} className="w-[200px]" />
        </a>
        <p className="w-full text-[14px] xl:text-[16px] font-medium leading-[20px] xl:leading-[24px] text-white">
          {description}
        </p>
        <h1 className="w-full text-[36px] xl:text-[48px] 2xl:text-[60px] font-bold leading-[100%] text-white">
          {siteBrand === 'clouddm' ? '免费社区版开放中' : title}
        </h1>
      </div>

      {/* 特性列表区域 */}
      <div className="relative z-10 w-full max-w-[600px] h-auto flex flex-col gap-[10px] justify-start items-start">
        {displayFeatures.map((feature, index) => (
          <div key={index} className="w-full h-[26px] flex gap-[10px] justify-start items-start">
            <div className="w-[14px] h-[26px] flex justify-start items-center py-[6px] flex-shrink-0">
              <img 
                src="/img/home/icon/check.svg" 
                alt="Check" 
                className="w-[14px] h-[14px]"
              />
            </div>
            <p className="flex-1 h-[24px] text-[14px] xl:text-[16px] font-medium leading-[20px] xl:leading-[24px] text-white">
              {feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginSidebar;
