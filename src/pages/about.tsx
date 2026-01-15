import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FadeInSection from '@site/src/components/FadeInSection';
import Footer from '@site/src/components/Footer';
import AnimatedBanner from '@site/src/components/AnimatedBanner';
import RotatingWords from '@site/src/components/RotatingWords';
import { Popover } from 'antd';
import { getPageMeta } from '@site/src/utils/meta';
// 获取时间轴数据的函数
const getTimelineData = (siteBrand: string) => {
  if (siteBrand === 'clouddm') {
    // CloudDM 品牌的时间轴数据
    return [
      {
        year: 'about.timeline.clouddm.2019.year',
        yearText: '2019',
        title: 'about.timeline.clouddm.2019.title',
        titleText: '创办',
        description: 'about.timeline.clouddm.2019.description',
        descriptionText: 'ClouGence 公司成立，故事开始了。'
      },
      {
        year: 'about.timeline.clouddm.2021.year',
        yearText: '2021',
        title: 'about.timeline.clouddm.2021.title',
        titleText: 'V1 版本问世',
        description: 'about.timeline.clouddm.2021.description',
        descriptionText: '经过思考和打磨，我们迎来了CloudDM 1.0版本。'
      },
      {
        year: 'about.timeline.clouddm.2023a.year',
        yearText: '2023',
        title: 'about.timeline.clouddm.2023a.title',
        titleText: 'CloudDM 社区',
        description: 'about.timeline.clouddm.2023a.description',
        descriptionText: '为了完善我们的产品，我们建立了 CloudDM 社区。'
      },
      {
        year: 'about.timeline.clouddm.2023b.year',
        yearText: '2023',
        title: 'about.timeline.clouddm.2023b.title',
        titleText: '个人版的问世',
        description: 'about.timeline.clouddm.2023b.description',
        descriptionText: 'CloudDM for Desktop 诞生，在随后的几个月内达到几百的日活'
      },
      {
        year: 'about.timeline.clouddm.2024.year',
        yearText: '2024',
        title: 'about.timeline.clouddm.2024.title',
        titleText: 'V2版本问世',
        description: 'about.timeline.clouddm.2024.description',
        descriptionText: '面向团队化提供更多的数据源更安全的数据库访问，深受企业用户喜爱。'
      },
      {
        year: 'about.timeline.clouddm.2025.year',
        yearText: '2025',
        title: 'about.timeline.clouddm.2025.title',
        titleText: '未完待续（至今）',
        description: 'about.timeline.clouddm.2025.description',
        descriptionText: '故事仍在继续。让我们一起期待下一个里程碑。'
      }
    ];
  } else if (siteBrand === 'clougence') {
    // ClouGence 品牌的时间轴数据
    return [
      {
        year: 'about.timeline.clougence.2019.year',
        yearText: '2019',
        title: 'about.timeline.clougence.2019.title',
        titleText: '创立',
        description: 'about.timeline.clougence.2019.description',
        descriptionText: 'ClouGence 公司成立，标志着故事的开始'
      },
      {
        year: 'about.timeline.clougence.2021.year',
        yearText: '2021',
        title: 'about.timeline.clougence.2021.title',
        titleText: 'CloudCanal社区',
        description: 'about.timeline.clougence.2021.description',
        descriptionText: '为了完善我们的产品，我们建立了 CloudCanal 社区。'
      },
      {
        year: 'about.timeline.clougence.2023a.year',
        yearText: '2023',
        title: 'about.timeline.clougence.2023a.title',
        titleText: '更多活跃用户',
        description: 'about.timeline.clougence.2023a.description',
        descriptionText: '累计近百个客户，10k 次下载激活使用'
      },
      {
        year: 'about.timeline.clougence.2024.year',
        yearText: '2024',
        title: 'about.timeline.clougence.2024.title',
        titleText: '设立香港公司',
        description: 'about.timeline.clougence.2024.description',
        descriptionText: '开启海外全新品牌 BladePipe'
      },
      {
        year: 'about.timeline.clougence.2025a.year',
        yearText: '2025',
        title: 'about.timeline.clougence.2025a.title',
        titleText: 'Saas 化',
        description: 'about.timeline.clougence.2025a.description',
        descriptionText: '推出 CloudCanal 云服务，朝着更便利的方向发展'
      },
      {
        year: 'about.timeline.clouddm.2025.year',
        yearText: '2025',
        title: 'about.timeline.clouddm.2025.title',
        titleText: '未完待续（至今）',
        description: 'about.timeline.clouddm.2025.description',
        descriptionText: '故事仍在继续。让我们一起期待下一个里程碑。'
      }
    ];
  } else {
    // 默认 BladePipe 品牌的时间轴数据
    return [
      {
        year: 'about.timeline.2019.year',
        yearText: '2019',
        title: 'about.timeline.2019.title',
        titleText: 'Foundation',
        description: 'about.timeline.2019.description',
        descriptionText: 'BladePipe was established, marking the beginning of a story.'
      },
      {
        year: 'about.timeline.2021.year',
        yearText: '2021',
        title: 'about.timeline.2021.title',
        titleText: 'BladePipe Community',
        description: 'about.timeline.2021.description',
        descriptionText: 'To refine our product, we established the BladePipe community.'
      },
      {
        year: 'about.timeline.2023.year',
        yearText: '2023',
        title: 'about.timeline.2023.title',
        titleText: 'More Active Users',
        description: 'about.timeline.2023.description',
        descriptionText: 'We have over 1k+ users actively using our product, and more and more users are joining us.'
      },
      {
        year: 'about.timeline.2024.year',
        yearText: '2024',
        title: 'about.timeline.2024.title',
        titleText: 'BladePipe Cloud',
        description: 'about.timeline.2024.description',
        descriptionText: 'BladePipe offers a cloud deployment option, giving users greater flexibility.'
      },
      {
        year: 'about.timeline.2024b.year',
        yearText: '2025',
        title: 'about.timeline.2024b.title',
        titleText: 'To be Continued(Until now)',
        description: 'about.timeline.2024b.description',
        descriptionText: 'The story is ongoing. Let us look forward together to the next milestone.'
      }
    ];
  }
};

// 获取团队成员配置数据
const getTeamMembers = (siteBrand: string) => {
  if (siteBrand === 'clouddm') {
    // CloudDM 品牌的团队成员
    return [
      {
        id: 'liqiang',
        name: 'about.team.liqiang.name',
        nameText: '励强',
        title: 'about.team.liqiang.title',
        titleText: '创始人 & CEO',
        avatar: '/img/about/team/junyu.png',
        quote: 'about.dm.team.liqiang.quote',
        quoteText: '我们专注于保护用户数据的安全，深耕数据防护。无论团队化协作还是作为个人用户，CloudDM 带来的不仅是便利更是对数据安全的思考。',
        cardHeight: '314px',
        contentHeight: '234px',
        quoteHeight: '96px',
        nameWidth: '173px',
        titleWidth: '155px'
      },
      {
        id: 'zhaoyongchun',
        name: 'about.team.zhaoyongchun.name',
        nameText: '赵永春',
        title: 'about.team.zhaoyongchun.title',
        titleText: '首席架构师',
        avatar: '/img/about/team/mode.jpg',
        quote: 'about.dm.team.zhaoyongchun.quote',
        quoteText: '我们是产品提供者同时也是开发者，作为双重身份我们深知在保证安全的同时用户体验对效率提升也至关重要。因此 CloudDM 在保证安全的前提下，也注重用户体验的提升。',
        cardHeight: '314px',
        contentHeight: '210px',
        quoteHeight: '72px',
        nameWidth: '183px',
        titleWidth: '168px'
      },
      {
        id: 'luomengting',
        name: 'about.team.luomengting.name',
        nameText: '罗梦婷',
        title: 'about.team.luomengting.title',
        titleText: '联合创始人 & 产品总监',
        avatar: '/img/about/team/buding.png',
        quote: 'about.dm.team.luomengting.quote',
        quoteText: '见证 CloudDM 发展成为一个成熟的解决方案，我们充满成就感和无限可能。我们致力于使其成为行业中最可靠的数据库管理工具。',
        cardHeight: '338px',
        contentHeight: '258px',
        quoteHeight: '120px',
        nameWidth: '228px',
        titleWidth: '129px'
      },
      {
        id: 'zhanglei',
        name: 'about.team.zhanglei.name',
        nameText: '张磊',
        title: 'about.team.zhanglei.title',
        titleText: '商务总监',
        avatar: '/img/about/team/zhanglei.png',
        quote: 'about.dm.team.zhanglei.quote',
        quoteText: 'CloudDM 正在被更多业界的人熟知与使用，我们渴望在未来扩大我们的影响力和足迹。',
        cardHeight: '338px',
        contentHeight: '210px',
        quoteHeight: '72px',
        nameWidth: '206px',
        titleWidth: '117px'
      }
    ];
  } else if (siteBrand === 'clougence') {
    // ClouGence 品牌的团队成员 
    return [
      {
        id: 'john',
        name: 'about.team.clougence.john.name',
        nameText: '励强',
        title: 'about.team.clougence.john.title',
        titleText: '创始人 & CEO',
        avatar: '/img/about/team/junyu.svg',
        quote: 'about.team.clougence.john.quote',
        quoteText: 'CloudCanal 专注于数据基础设施解决方案，优先考虑客户交付，同时认识到服务与产品卓越性同等重要。',
        cardHeight: '314px',
        contentHeight: '234px',
        quoteHeight: '96px',
        nameWidth: '173px',
        titleWidth: '155px'
      },
      {
        id: 'barry',
        name: 'about.team.clougence.barry.name',
        nameText: '罗根生',
        title: 'about.team.clougence.barry.title',
        titleText: '首席技术官',
        avatar: '/img/about/team/juantu.svg',
        quote: 'about.team.clougence.barry.quote',
        quoteText: '在 CloudCanal 这个充满活力团队中，我们追求探索精神，鼓励大家在工作环境中持续学习，保持创新。',
        cardHeight: '314px',
        contentHeight: '210px',
        quoteHeight: '72px',
        nameWidth: '183px',
        titleWidth: '168px'
      },
      {
        id: 'meta',
        name: 'about.team.clougence.meta.name',
        nameText: '罗梦婷',
        title: 'about.team.clougence.meta.title',
        titleText: '联合创始人 & 产品总监',
        avatar: '/img/about/team/buding.svg',
        quote: 'about.team.clougence.meta.quote',
        quoteText: '见证 CloudCanal 发展成为一个成熟的解决方案，我们充满成就感和无限可能。我们致力于使其成为行业中最可靠的实时数据同步工具。',
        cardHeight: '338px',
        contentHeight: '258px',
        quoteHeight: '120px',
        nameWidth: '228px',
        titleWidth: '129px'
      },
      {
        id: 'lei',
        name: 'about.team.clougence.lei.name',
        nameText: '张磊',
        title: 'about.team.clougence.lei.title',
        titleText: '销售总监',
        avatar: '/img/about/team/zhanglei.svg',
        quote: 'about.team.clougence.lei.quote',
        quoteText: 'CloudCanal 现在正在被多个国家的用户使用，我们渴望在未来扩大我们的全球足迹。',
        cardHeight: '338px',
        contentHeight: '210px',
        quoteHeight: '72px',
        nameWidth: '206px',
        titleWidth: '117px'
      }
    ];
  } else {
    // BladePipe 品牌的团队成员（默认）
    return [
      {
        id: 'john',
        name: 'about.team.john.name',
        nameText: 'John Li',
        title: 'about.team.john.title',
        titleText: 'Chief Executive Officer',
        avatar: '/img/about/team/junyu.svg',
        quote: 'about.team.john.quote',
        quoteText: 'BladePipe specializes in data infrastructure solutions, prioritizing customer delivery while recognizing that service holds equal importance to product excellence.',
        cardHeight: '314px',
        contentHeight: '234px',
        quoteHeight: '96px',
        nameWidth: '173px',
        titleWidth: '155px'
      },
      {
        id: 'barry',
        name: 'about.team.barry.name',
        nameText: 'Barry',
        title: 'about.team.barry.title',
        titleText: 'Chief Technology Officer',
        avatar: '/img/about/team/juantu.svg',
        quote: 'about.team.barry.quote',
        quoteText: 'At BladePipe, our dynamic and exploration-driven team fosters continuous learning in an energizing work environment.',
        cardHeight: '314px',
        contentHeight: '210px',
        quoteHeight: '72px',
        nameWidth: '183px',
        titleWidth: '168px'
      },
      {
        id: 'meta',
        name: 'about.team.meta.name',
        nameText: 'Meta Luo',
        title: 'about.team.meta.title',
        titleText: 'Co-founder & CPO',
        avatar: '/img/about/team/buding.svg',
        quote: 'about.team.meta.quote',
        quoteText: 'Witnessing BladePipe evolve into a mature solution fills us with accomplishment and boundless possibilities. We\'re committed to making it the most reliable real-time data replication tool in the industry.',
        cardHeight: '338px',
        contentHeight: '258px',
        quoteHeight: '120px',
        nameWidth: '228px',
        titleWidth: '129px'
      },
      {
        id: 'lei',
        name: 'about.team.lei.name',
        nameText: 'Lei Zhang',
        title: 'about.team.lei.title',
        titleText: 'Global VP & Sales',
        avatar: '/img/about/team/zhanglei.svg',
        quote: 'about.team.lei.quote',
        quoteText: 'BladePipe is now utilized by users across multiple countries, and we aspire to expand our global footprint in the future.',
        cardHeight: '338px',
        contentHeight: '210px',
        quoteHeight: '72px',
        nameWidth: '206px',
        titleWidth: '117px'
      }
    ];
  }
};

// 工作方式配置数据
const workStyles = [
  {
    id: 'onsite',
    icon: '/img/about/careers/1.svg',
    alt: 'On-site',
    title1: 'about.careers.onsite.line1',
    title1Text: 'On-site',
    title2: 'about.careers.onsite.line2',
    title2Text: '（office）',
    width: '88px'
  },
  {
    id: 'remote',
    icon: '/img/about/careers/2.svg',
    alt: 'Remote work',
    title1: 'about.careers.remote.line1',
    title1Text: 'Remote',
    title2: 'about.careers.remote.line2',
    title2Text: 'work',
    width: '86px'
  },
  {
    id: 'customer',
    icon: '/img/about/careers/3.svg',
    alt: 'Customer-facing R&D',
    title1: 'about.careers.customer.line1',
    title1Text: 'Customer-',
    title2: 'about.careers.customer.line2',
    title2Text: 'facing R&D',
    width: '99px'
  },
  {
    id: 'support',
    icon: '/img/about/careers/4.svg',
    alt: 'about.careers.support.alt',
    title1: 'about.careers.support.line1',
    title1Text: 'Remote',
    title2: 'about.careers.support.line2',
    title2Text: 'Support',
    width: '86px'
  }
];

// 时间轴项目组件
interface TimelineItemProps {
  item: {
    year: string;
    yearText: string;
    title: string;
    titleText: string;
    description: string;
    descriptionText: string;
  };
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item }) => {
  return (
    <div className="w-[380px] h-[209px] flex flex-col gap-[32px] justify-start items-center relative z-10">
      <div className="w-[56px] h-[32px] text-[24px] font-bold leading-[32px] text-black whitespace-nowrap">
        <Translate id={item.year}>{item.yearText}</Translate>
      </div>
      <div className="w-[13px] h-[13px] bg-white border-2 border-solid border-[#0087c7] rounded-full relative z-20"></div>
      <div className="w-[380px] h-[100px] flex flex-col gap-[20px] justify-start items-center">
        <h3 className="w-[380px] h-[32px] text-[24px] font-bold leading-[32px] text-black text-center">
          <Translate id={item.title}>{item.titleText}</Translate>
        </h3>
        <p className="w-[380px] h-[48px] text-[16px] font-medium leading-[24px] text-black/80 text-center">
          <Translate id={item.description}>
            {item.descriptionText}
          </Translate>
        </p>
      </div>
    </div>
  );
};

// 移动端时间轴项目组件
const MobileTimelineItem: React.FC<TimelineItemProps> = ({ item }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[13px] h-[13px] bg-white border-2 border-solid border-[#0087c7] rounded-full relative z-20 mb-4"></div>
      <div className="w-full max-w-[350px] flex flex-col gap-[16px] items-center text-center">
        <div className="text-[20px] sm:text-[24px] font-bold leading-[28px] sm:leading-[32px] text-black whitespace-nowrap">
          <Translate id={item.year}>{item.yearText}</Translate>
        </div>
        <h3 className="text-[20px] sm:text-[24px] font-bold leading-[28px] sm:leading-[32px] text-black">
          <Translate id={item.title}>{item.titleText}</Translate>
        </h3>
        <p className="text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[24px] text-black/80">
          <Translate id={item.description}>
            {item.descriptionText}
          </Translate>
        </p>
      </div>
    </div>
  );
};

// 工作方式卡片组件
interface WorkStyleCardProps {
  workStyle: {
    id: string;
    icon: string;
    alt: string;
    title1: string;
    title1Text: string;
    title2: string;
    title2Text: string;
    width: string;
  };
}

const WorkStyleCard: React.FC<WorkStyleCardProps> = ({ workStyle }) => {
  return (
    <div className="w-full max-w-[120px] min-h-[120px] flex flex-col gap-[12px] sm:gap-[16px] justify-center items-center">
      <div className="w-[70px] h-[70px] sm:w-[86px] sm:h-[86px] bg-white border border-solid border-black border-opacity-10 rounded-full flex justify-center items-center p-[16px] sm:p-[20px]">
        <img 
          src={workStyle.icon} 
          alt={workStyle.alt} 
          className="w-[38px] h-[38px] sm:w-[46px] sm:h-[46px]"
        />
      </div>
      <p className="w-full text-[14px] sm:text-[16px] font-bold leading-[16px] text-black opacity-80 text-center">
        <Translate id={workStyle.title1}>{workStyle.title1Text}</Translate>
        <br />
        <Translate id={workStyle.title2}>{workStyle.title2Text}</Translate>
      </p>
    </div>
  );
};

// 团队成员卡片组件
interface TeamMemberCardProps {
  member: {
    id: string;
    name: string;
    nameText: string;
    title: string;
    titleText: string;
    avatar: string;
    quote: string;
    quoteText: string;
    cardHeight: string;
    contentHeight: string;
    quoteHeight: string;
    nameWidth: string;
    titleWidth: string;
  };
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="w-full max-w-[644px] min-h-[280px] bg-white border border-solid border-black/15 rounded-[20px] p-[16px] sm:p-[24px] lg:p-[40px] flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] lg:gap-[30px] justify-start items-start">
      {/* 头像 */}
      <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex-shrink-0 flex justify-center sm:justify-start">
        <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-black/10 rounded-full overflow-hidden">
          <img src={member.avatar} alt={member.nameText} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 flex flex-col justify-start items-start">
        <div className="w-full bg-white rounded-[16px] py-[16px] sm:py-[22px] flex flex-col gap-[16px] sm:gap-[20px] justify-start items-start">
          {/* 姓名和职位 */}
          <div className="w-full flex flex-col gap-[2px] justify-start items-start">
            <h3 className="text-[20px] sm:text-[24px] font-bold leading-[28px] sm:leading-[32px] text-black">
              <Translate id={member.name}>{member.nameText}</Translate>
            </h3>
            <p className="text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[20px] text-black/80">
              <Translate id={member.title}>{member.titleText}</Translate>
            </p>
          </div>

          {/* 分割线 */}
          <div className="w-full h-[1px] bg-[#28137c]/20"></div>

          {/* 引述 */}
          <div className="w-full flex gap-[15px] sm:gap-[30px] justify-start items-start">
            {/* 引号图标 */}
            <img src="/img/common/icon/mark.svg" alt="about.team.quote.icon" className="w-[35px] h-[30px] sm:w-[55px] sm:h-[45px] flex-shrink-0" />
            
            {/* 引述内容 */}
            <div className="flex-1 flex flex-col justify-start items-start">
              <p className="text-[14px] sm:text-[16px] font-medium italic leading-[20px] sm:leading-[24px] text-black/80">
                <Translate id={member.quote}>
                  {member.quoteText}
                </Translate>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function About(): React.JSX.Element {
  // 在组件内部调用 Hook
  const {siteConfig} = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  
  // 时间轴配置数据
  const timelineData = getTimelineData(siteBrand || 'bladepipe');
  
  // 团队成员配置数据
  const teamMembers = getTeamMembers(siteBrand || 'bladepipe');
  
  // 获取页面 meta 信息
  const pageMeta = getPageMeta('about');
  

  
  return (
    <Layout description={pageMeta.description}>
      <Head>
        <title>{pageMeta.title}</title>
      </Head>
      <div className="w-full bg-white">
        {/* Banner Section - 响应式设计 */}
        <FadeInSection immediate>
          <section className="w-full min-h-[400px] sm:min-h-[500px] lg:h-[554px] pt-[40px] sm:pt-[60px] lg:pt-[80px] pb-[120px] sm:pb-[180px] lg:pb-[250px] flex justify-center items-start bg-[#eaf6ff] relative px-4">
          {/* 动画背景图片 - 根据设计稿位置调整 */}
          <div className="absolute bottom-0 left-0 w-full h-[150px] sm:h-[200px] lg:h-[242px] z-0">
            <AnimatedBanner />
          </div>
          
          <div className="w-full max-w-[650px] flex flex-col gap-[10px] justify-start items-center relative z-10">
            {/* 品牌标签 */}
            <div className="w-auto min-w-[102px] h-[32px] bg-white border border-solid border-[#0087c7] rounded-full px-[16px] py-[6px] flex gap-[10px] justify-center items-center">
              <span className="text-[14px] font-bold leading-[20px] text-[#0087c7] whitespace-nowrap">
                {siteBrand === 'bladepipe' ? (
                  <Translate id="about.banner.tag.bladepipe">BladePipe</Translate>
                ) : siteBrand === 'clouddm' ? (
                  <Translate id="about.banner.tag.clouddm">CloudDM</Translate>
                ) : (
                  <Translate id="about.banner.tag.clougence">CloudCanal</Translate>
                )}
              </span>
            </div>
            
            {/* 标题区域 */}
            <div className="w-full flex flex-col gap-[16px] justify-start items-center mt-[10px]">
              <h1 className="w-full text-[32px] sm:text-[48px] lg:text-[60px] font-bold leading-[40px] sm:leading-[56px] lg:leading-[70px] text-black text-center px-4">
                {siteBrand === 'clouddm' ? (
                  <>
                    <div className="block">
                      <Translate id="about.banner.title.clouddm.line1">让团队使用数据</Translate>
                    </div>
                    <div className="block">
                      <Translate id="about.banner.title.clouddm.line2.prefix">更</Translate>{' '}
                      <RotatingWords
                        words={[
                          { key: 'about.banner.rotating.clouddm.safe', defaultText: '安全' },
                          { key: 'about.banner.rotating.clouddm.efficient', defaultText: '高效' }
                        ]}
                        interval={2000}
                        className="text-[#0087c7]"
                      />
                    </div>
                  </>
                ) : siteBrand === 'clougence' ? (
                  <>
                    <div className="block">
                      <Translate id="about.banner.title.clougence.line1">让用户高效实用数据，</Translate>
                    </div>
                    <div className="block">
                      <Translate id="about.banner.title.clougence.line2">用好数据</Translate>
                    </div>
                  </>
                ) : (
                  <>
                    <Translate id="about.banner.title.prefix">Powering</Translate>{' '}
                    <Translate id="about.banner.title.middle1">Smarter</Translate>{' '}
                    <Translate id="about.banner.title.middle2">Data</Translate>{' '}
                    <Translate id="about.banner.title.middle3">Flow</Translate>{' '}
                    <RotatingWords
                      words={[
                        { key: 'about.banner.rotating.simple', defaultText: 'Simple' },
                        { key: 'about.banner.rotating.precise', defaultText: 'Precise' },
                        { key: 'about.banner.rotating.stable', defaultText: 'Stable' },
                        { key: 'about.banner.rotating.realtime', defaultText: 'Real-Time' }
                      ]}
                      interval={2000}
                      className="text-[#0087c7]"
                    />
                  </>
                )}
              </h1>
            </div>
          </div>
          </section>
        </FadeInSection>

        {/* 公司历程时间轴部分 - 响应式设计 */}
        <FadeInSection>
          <section className="w-full min-h-[600px] py-[24px] sm:py-[36px] lg:py-[48px] px-4 sm:px-8 lg:px-[80px] flex justify-center items-start bg-gradient-to-b from-[#eaf6ff] to-white relative">
          {/* 贯穿的横线 - 仅在大屏幕显示 */}
          <div className="hidden lg:block absolute top-[118px] left-0 w-full h-[0px] bg-[#b1cef8]/70 border border-solid border-[#b1cef8]/70"></div>
          <div className="hidden lg:block absolute top-[406px] left-0 w-full h-[0px] bg-[#b1cef8]/70 border border-solid border-[#b1cef8]/70"></div>
          
          <div className="w-full max-w-[1320px] flex flex-col justify-start items-center">
            {/* 桌面端：水平时间轴 */}
            <div className="hidden lg:flex lg:flex-col lg:gap-[80px]">
              {/* 第一行 */}
              <div className="w-full h-[209px] flex gap-[24px] justify-start items-center relative">
                {/* 前三个时间轴项目 */}
                {timelineData.slice(0, 3).map((item, index) => (
                  <React.Fragment key={item.year}>
                    <TimelineItem item={item} />
                    {index < 2 && (
                      <div className="w-[38px] h-[48px] flex flex-col gap-[10px] justify-start items-start pt-[48px] relative z-10">
                        <div className="w-[24px] h-[0px] bg-gradient-to-r from-transparent to-black border border-solid border-transparent border-r-black"></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {/* 第二行 */}
              <div className="w-full h-[209px] flex gap-[24px] justify-start items-center relative">
                {/* 后三个时间轴项目 */}
                {timelineData.slice(3).map((item, index) => (
                  <React.Fragment key={item.year}>
                    <TimelineItem item={item} />
                    {index < 2 && (
                      <div className="w-[38px] h-[48px] flex flex-col gap-[10px] justify-start items-start pt-[48px] relative z-10">
                        <div className="w-[24px] h-[0px] bg-gradient-to-r from-transparent to-black border border-solid border-transparent border-r-black"></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {/* 移动端和平板：垂直时间轴 */}
            <div className="lg:hidden w-full relative">
              {/* 垂直连接线 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#b1cef8]/70 transform -translate-x-1/2"></div>
              
              <div className="space-y-12 sm:space-y-16">
                {timelineData.map((item) => (
                  <MobileTimelineItem key={item.year} item={item} />
                ))}
              </div>
            </div>
          </div>
          </section>
        </FadeInSection>

        {/* 团队介绍部分 - 响应式设计 */}
        <FadeInSection>
          <section className="w-full min-h-[600px] py-[48px] sm:py-[72px] lg:py-[96px] px-4 sm:px-8 lg:px-[80px] flex justify-center items-start bg-white">
          <div className="w-full max-w-[1320px] flex flex-col justify-start items-center">
            {/* 板块标题 */}
            <div className="w-full flex justify-center items-center mb-[40px] sm:mb-[60px] lg:mb-[80px]">
              <h2 className="text-[32px] sm:text-[48px] lg:text-[60px] font-bold leading-[40px] sm:leading-[56px] lg:leading-[70px] text-black text-center">
                <Translate id="about.team.title">Meet the Team</Translate>
              </h2>
            </div>

            {/* 团队成员卡片区域 */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[32px] justify-items-center">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
          </section>
        </FadeInSection>

        {/* Careers部分 - 响应式设计 */}
        <FadeInSection>
          <section className="w-full min-h-[600px] py-[60px] sm:py-[90px] lg:py-[120px] px-4 sm:px-8 lg:px-[80px] flex justify-center items-center bg-gradient-to-b from-[#eaf6ff] to-white">
          <div className="w-full max-w-[1320px] flex flex-col lg:flex-row gap-[40px] sm:gap-[60px] lg:gap-[100px] justify-start items-center lg:items-start">
            {/* 左侧图片部分 */}
            <div className="w-full lg:w-[590px] flex flex-col gap-[10px] justify-start items-start order-2 lg:order-1">
              <div className="w-full aspect-[590/360] rounded-[10px] overflow-hidden">
                        <img 
          src="/img/about/careers/life1.jpg" 
          alt="about.careers.life1.alt"
          className="w-full h-full object-cover"
        />
              </div>
              <div className="w-full flex gap-[10px] justify-start items-start">
                <div className="w-[32%] aspect-[190/206] rounded-[10px] overflow-hidden">
                  <img 
                    src="/img/about/careers/life3.jpg" 
                    alt="about.careers.life3.alt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[66%] aspect-[390/206] rounded-[10px] overflow-hidden">
                  <img 
                    src="/img/about/careers/life2.jpg" 
                    alt="about.careers.life2.alt"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 右侧内容部分 */}
            <div className="w-full lg:w-[630px] flex flex-col gap-[40px] sm:gap-[60px] lg:gap-[100px] justify-start items-start order-1 lg:order-2">
              {/* 标题和描述 */}
              <div className="w-full flex flex-col gap-[20px] sm:gap-[30px] justify-start items-start">
                <div className="w-full flex justify-start items-center">
                  <h2 className="text-[32px] sm:text-[48px] lg:text-[60px] font-bold leading-[40px] sm:leading-[56px] lg:leading-[70px] text-black">
                    <Translate id="about.careers.title">Our Careers</Translate>
                  </h2>
                </div>
                <div className="w-full">
                  <p className="text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[24px] text-black opacity-80">
                    <Translate id="about.careers.description">
                      We believe a focused team can craft refined products. Every member is essential,and we want everyone here to grow and thrive.
                    </Translate>
                  </p>
                </div>
              </div>

              {/* 工作方式部分 */}
              <div className="w-full flex flex-col gap-[30px] sm:gap-[40px] lg:gap-[50px] justify-start items-start">
                <div className="w-full">
                  <h3 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-[28px] sm:leading-[32px] lg:leading-[36px] text-black opacity-80">
                    <Translate id="about.careers.subtitle.line1">Work Life Balance.</Translate>
                    <br />
                    <Translate id="about.careers.subtitle.line2">Make a Wonderful Journey.</Translate>
                  </h3>
                </div>
                
                {/* 分隔线 */}
                <div className="w-full h-[1px] bg-black opacity-15 border-t border-solid border-black border-opacity-15"></div>

                {/* 工作方式图标 */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-[20px] sm:gap-[10px] justify-items-center">
                  {workStyles.map((workStyle) => (
                    <WorkStyleCard key={workStyle.id} workStyle={workStyle} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          </section>
        </FadeInSection>

        {/* 联系我们部分 - 响应式设计 */}
        <FadeInSection>
          <section id="contactUs" className="w-full min-h-[600px] py-[60px] sm:py-[90px] lg:py-[120px] px-4 sm:px-8 lg:px-[80px] flex justify-center items-center bg-white">
          <div className="w-full max-w-[1320px] flex flex-col gap-[40px] sm:gap-[50px] lg:gap-[60px] justify-start items-center">
            {/* 标题部分 */}
            <div className="w-full flex justify-start items-center">
              <h2 className="text-[32px] sm:text-[48px] lg:text-[60px] font-bold leading-[40px] sm:leading-[56px] lg:leading-[70px] text-black">
                <Translate id="about.contact.title">Contact Us</Translate>
              </h2>
            </div>

            {/* 地图和联系方式部分 */}
            <div className="w-full relative">
              {/* 地图部分 */}
              <div className="w-full flex justify-center items-start">
                <div className="w-full max-w-[1364px] aspect-[1364/650]">
                  {/* 地图背景 */}
                  <img 
                    src={siteBrand === 'bladepipe' ? "/img/about/contact/map.png" : "/img/about/contact/map_clougence.png"}
                    alt="about.contact.map.alt"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* 联系方式卡片部分 - 覆盖在地图上或地图下方 */}
              <div className="lg:absolute lg:bottom-[50px] lg:left-0 w-full bg-white lg:bg-white lg:bg-opacity-10 border border-solid border-black border-opacity-10 rounded-[20px] lg:backdrop-blur-[64px] p-[16px] sm:p-[24px] lg:px-[40px] lg:py-[30px] mt-[20px] lg:mt-0">
                {siteBrand === 'clouddm' ? (
                  // CloudDM 联系方式
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] lg:gap-[30px]">
                                                           {/* 邮箱 */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.clouddm.email.title">邮箱</Translate>
                      </h3>
                      <div className="flex gap-[8px] justify-start items-start">
                        <div className="w-[16px] h-[16px] flex justify-center items-center flex-shrink-0 mt-[2px]">
                          <img 
                            src="/img/about/contact/mail.svg" 
                            alt="about.contact.email.alt"
                            className="w-[16px] h-[16px]"
                          />
                        </div>
                        <p className="text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black underline break-all min-w-0 flex-1">
                          <Translate id="about.contact.clouddm.email.address">clouddm_support@clougence.com</Translate>
                        </p>
                      </div>
                    </div>

                    {/* 电话 */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.phone.title">电话</Translate>
                      </h3>
                      <div className="flex gap-[8px] justify-start items-start">
                        <div className="w-[16px] h-[16px] flex justify-center items-center flex-shrink-0 mt-[2px]">
                          <img 
                            src="/img/about/contact/phone.svg" 
                            alt="about.contact.phone.alt"
                            className="w-[16px] h-[16px]"
                          />
                        </div>
                        <p className="text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black break-all min-w-0 flex-1">
                          <Translate id="about.contact.clouddm.phone.number">0571-88603096</Translate>
                        </p>
                      </div>
                    </div>

                    {/* 公众号 */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.clouddm.wechat.title">微信公众号</Translate>
                      </h3>
                      <div className="flex flex-col gap-[8px] justify-start items-start">
                      <Popover
                             content={
                               <div className="text-center">
                                 <div className="mb-2">
                                   <span className="text-[12px] text-gray-600">
                                     <Translate id="about.contact.clouddm.wechat.official.scan">扫码关注 CloudDM 公众号</Translate>
                                   </span>
                                 </div>
                                 <img 
                                   src="/img/contact/wechat-official-code.jpg"
                                   alt="CloudDM 微信公众号"
                                   className="w-[140px] h-[140px] rounded-[4px]"
                                 />
                               </div>
                             }
                             title={null}
                             trigger="click"
                             placement="top"
                             overlayClassName="wechat-qr-popover"
                           >
                              <p className="cursor-pointer text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black">
                                <Translate id="about.contact.clouddm.wechat.name">CloudDM</Translate>
                              </p>
                           </Popover>
                      </div>
                    </div>
                    {/* 其他方式 */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.clouddm.other.title">其他方式</Translate>
                      </h3>
                      <div className="flex flex-col gap-[8px] justify-start items-start">
                                                 {/* 微信小助手 */}
                         <div className="flex items-start gap-[8px]">
                           <span className="text-[12px] text-black/60 mt-[2px]">
                             <Translate id="about.contact.clouddm.wechat.assistant.title">微信交流群</Translate>
                           </span>
                           <Popover
                             content={
                               <div className="text-center">
                                 <div className="mb-2">
                                   <span className="text-[12px] text-gray-600">
                                     <Translate id="about.contact.clouddm.wechat.assistant.scan">扫描二维码添加微信小助手</Translate>
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
                             <img 
                               src="/img/about/contact/wechat.svg" 
                               alt="微信图标"
                               className="w-[16px] h-[16px] cursor-pointer hover:opacity-80 transition-opacity"
                             />
                           </Popover>
                         </div>
                        
                                                 {/* QQ 群 */}
                         <div className="flex items-start gap-[8px]">
                           <span className="text-[12px] text-black/60 mt-[2px]">
                             <Translate id="about.contact.clouddm.qq.title">QQ 群</Translate>
                           </span>
                           <a 
                             target="_blank" 
                             href="https://qm.qq.com/cgi-bin/qm/qr?k=yKGD9ByfkVxuUB3Z2-mHXugUQcbfcQlV&jump_from=webapi&authKey=K1nBsLZ8YGsUhIG56BTJ0j9vQOow6g8oBCM2UufnU69TBIQ48T5iJdQ1sZVyrdSX"
                             className="hover:opacity-80 transition-opacity"
                           >
                             <img 
                               src="https://img.shields.io/badge/QQ%E7%BE%A4-984263002-orange"
                               alt="QQ 群徽章"
                               className="h-[16px] cursor-pointer"
                             />
                           </a>
                         </div>
                      </div>
                    </div>
                  </div>
                ) : siteBrand === 'clougence' ? (
                  // ClouGence 联系方式
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] lg:gap-[30px]">
                    {/* 第一列：商业洽谈和咨询 + 官微 */}
                    <div className="flex flex-col gap-[24px]">
                      {/* 商业洽谈 */}
                      <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                        <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                          <Translate id="about.contact.clougence.business.title">商业洽谈和咨询</Translate>
                        </h3>
                        <div className="flex gap-[8px] justify-start items-start">
                          <div className="w-[16px] h-[16px] flex justify-center items-center flex-shrink-0 mt-[2px]">
                            <img 
                              src="/img/about/contact/phone.svg" 
                              alt="about.contact.phone.alt"
                              className="w-[16px] h-[16px]"
                            />
                          </div>
                          <p className="text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black break-all min-w-0 flex-1">
                            <Translate id="about.contact.clougence.business.phone">0571-88603096</Translate>
                          </p>
                        </div>
                      </div>

                      {/* 官微 */}
                      <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                        <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                          <Translate id="about.contact.clougence.wechat.title">官微</Translate>
                        </h3>
                        <div className="flex flex-col gap-[8px] justify-start items-start">
                          <Popover
                            content={
                              <div className="text-center">
                                <div className="mb-2">
                                  <span className="text-[12px] text-gray-600">
                                    <Translate id="about.contact.clougence.wechat.scan">扫码关注 ClouGence 官微</Translate>
                                  </span>
                                </div>
                                <img 
                                  src="/img/contact/wechat.png"
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
                            <p className="cursor-pointer text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black">
                              <Translate id="about.contact.clougence.wechat.view">查看二维码</Translate>
                            </p>
                          </Popover>
                        </div>
                      </div>
                    </div>

                    {/* 第二列：邮箱 */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.clougence.email.title">邮箱</Translate>
                      </h3>
                      <div className="flex flex-col gap-[4px] justify-start items-start">
                        <div className="flex gap-[8px] justify-start items-start">
                          <div className="w-[16px] h-[16px] flex justify-center items-center flex-shrink-0 mt-[2px]">
                            <img 
                              src="/img/about/contact/mail.svg" 
                              alt="about.contact.email.alt"
                              className="w-[16px] h-[16px]"
                            />
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <p className="text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black underline break-all min-w-0">
                              <Translate id="about.contact.clougence.email.sales">【商务合作】sales@clougence.com</Translate>
                            </p>
                            <p className="text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black underline break-all min-w-0">
                              <Translate id="about.contact.clougence.email.support">【技术支持】cloudcanal_support@clougence.com</Translate>
                            </p>
                            <p className="text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black underline break-all min-w-0">
                              <Translate id="about.contact.clougence.email.hr">【人才招聘】hr@clougence.com</Translate>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 第三列：公司名称 */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.clougence.company.title">公司名称</Translate>
                      </h3>
                      <div className="flex gap-[8px] justify-start items-start">
                        <div className="w-[16px] h-[16px] flex justify-center items-center flex-shrink-0 mt-[2px]">
                          <img 
                            src="/img/about/contact/mail.svg" 
                            alt="about.contact.company.alt"
                            className="w-[16px] h-[16px]"
                          />
                        </div>
                        <p className="text-[12px] sm:text-[14px] font-medium leading-[16px] sm:leading-[18px] text-black break-all min-w-0 flex-1">
                          <Translate id="about.contact.clougence.company.name">杭州开云集致科技有限公司</Translate>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // BladePipe 联系方式（默认）
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] lg:gap-[30px]">
                    {/* Technical support */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.technical.title">Technical Support</Translate>
                      </h3>
                      <div className="flex gap-[12px] sm:gap-[18px] justify-start items-start">
                        <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] flex justify-start items-center flex-shrink-0 mt-[2px]">
                          <img 
                            src="/img/about/contact/mail.svg" 
                            alt="about.contact.email.alt"
                            className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                          />
                        </div>
                        <p className="text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[24px] text-black underline break-all min-w-0 flex-1">
                          <Translate id="about.contact.technical.email">support@bladepipe.com</Translate>
                        </p>
                      </div>
                    </div>

                    {/* Talent Recruitment */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.talent.title">Talent Recruitment</Translate>
                      </h3>
                      <div className="flex gap-[12px] sm:gap-[18px] justify-start items-start">
                        <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] flex justify-start items-center flex-shrink-0 mt-[2px]">
                          <img 
                            src="/img/about/contact/mail.svg" 
                            alt="about.contact.email.alt"
                            className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                          />
                        </div>
                        <p className="text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[24px] text-black underline break-all min-w-0 flex-1">
                          <Translate id="about.contact.talent.email">hire@bladepipe.com</Translate>
                        </p>
                      </div>
                    </div>

                    {/* Other contact information */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.other.title">Other Contact Information</Translate>
                      </h3>
                      {/*<a */}
                      {/*  href="https://join.slack.com/t/bladepipehq/shared_invite/zt-2sh9op2yo-JIsDrstycVMdKM4auCTm8g"*/}
                      {/*  target="_blank"*/}
                      {/*  rel="noopener noreferrer"*/}
                      {/*  className="flex gap-[12px] sm:gap-[23px] justify-start items-center hover:opacity-80 transition-opacity"*/}
                      {/*>*/}
                      {/*  <img */}
                      {/*    src="/img/about/contact/slack.svg" */}
                      {/*    alt="Slack" */}
                      {/*    className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"*/}
                      {/*  />*/}
                      {/*</a>*/}
                      <a
                          href="https://discord.gg/HMnThuQMup"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex gap-[12px] sm:gap-[23px] justify-start items-center hover:opacity-80 transition-opacity"
                      >
                        <img
                            src="/img/about/contact/discord.svg"
                            alt="Discord"
                            className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
                        />
                      </a>
                    </div>

                    {/* Social media */}
                    <div className="flex flex-col justify-start items-start gap-[8px] min-h-[80px]">
                      <h3 className="text-[14px] sm:text-[16px] font-medium text-black opacity-80">
                        <Translate id="about.contact.social.title">Social Media</Translate>
                      </h3>
                      <div className="flex gap-[12px] justify-start items-center">
                        <a href="https://www.linkedin.com/company/bladepipe" target="_blank" rel="noopener noreferrer"
                          className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black"
                          title="about.contact.social.linkedin"
                        >
                          <img src="/img/contact/linkedin.svg" alt="about.contact.social.linkedin" className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                        </a>
                        <a href="https://x.com/bladepipe" target="_blank" rel="noopener noreferrer"
                          className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] bg-white border border-[#11101a]/10 rounded-full flex items-center justify-center transition-colors duration-200 group hover:bg-black" 
                          title="about.contact.social.twitter"
                        >
                          <img src="/img/contact/twitter.svg" alt="about.contact.social.twitter" className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 group-hover:filter group-hover:invert group-hover:brightness-200" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          </section>
        </FadeInSection>
      </div>
      <Footer />
    </Layout>
  );
} 