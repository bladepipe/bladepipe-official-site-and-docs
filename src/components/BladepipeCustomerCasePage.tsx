import React, { useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Footer from './Footer';
import CommunityInstallModal from './CommunityInstallModal';
import ScrollCtaBackground from './ScrollCtaBackground';
import { bladepipeCustomerLogos } from './UserLogos';
import { getCloudUrl } from '@site/src/utils/api';
import { isUserLogin } from '@site/src/store/user';
import styles from '@site/src/pages/customer-case.module.css';

const content = {
  en: {
    title: 'Customers | BladePipe',
    description: 'Explore how data teams use BladePipe to simplify data integration, power real-time analytics, and migrate critical systems. Read our customer case studies.',
    heading: 'Real-Time Data, Proven In Production',
    introduction: 'See how data teams simplify data integration, power real-time analytics, and migrate critical systems with BladePipe.',
    artworkAlt: 'Working together to connect business data',
    storiesHeading: 'Explore Case Studies',
    readStory: 'Read The Case Study',
    logosHeading: 'Trusted By Teams Across Industries',
    customerWebsite: 'Visit customer website',
    customerLogo: 'Customer logo',
    ctaHeading: 'Put Your Data To Work With BladePipe',
    ctaDescription: 'Build your first pipeline and bring fresh, reliable data to the systems your business depends on.',
    tryCloud: 'Try Cloud Free',
    tryCommunity: 'Try Community Edition',
    retail: 'Retail & Consumer Goods',
    hr: 'HR Services',
    hrCustomer: 'Leading HR Service Provider',
    retailTitle: 'How Be & Cheery Built A Real-Time Retail Analytics Platform',
    retailDescription: 'Be & Cheery connects operational databases to StarRocks to simplify its architecture and keep order, inventory, and retail reports current.',
    hrTitle: 'How An HR Service Provider Migrated Systems With Real-Time Data Sync',
    hrDescription: 'See how real-time Oracle-to-MySQL synchronization helped an HR service provider replace a critical system while maintaining business continuity.',
  },
  zh: {
    title: '用户案例 | BladePipe',
    description: '了解各行业团队如何使用 BladePipe 完成实时分析、数据集成和系统迁移，探索真实用户实践与信赖 BladePipe 的企业。',
    heading: '经生产实践验证的实时数据连接',
    introduction: '了解数据团队如何通过 BladePipe 简化数据集成、支持实时分析，并平稳迁移关键业务系统。',
    artworkAlt: '用户合作与数据连接插画',
    storiesHeading: '来自用户的真实数据集成实践',
    readStory: '阅读案例',
    logosHeading: '深受各行业团队信赖',
    customerWebsite: '访问客户官网',
    customerLogo: '客户 Logo',
    ctaHeading: '用 BladePipe 构建您的下一条数据链路',
    ctaDescription: '构建您的第一条数据链路，为关键业务系统提供及时、可靠的数据。',
    tryCloud: '免费试用云服务',
    tryCommunity: '试用社区版',
    retail: '零售与消费品',
    hr: '人力资源服务',
    hrCustomer: '某头部人力资源服务企业',
    retailTitle: '百草味通过 BladePipe 构建实时零售分析平台',
    retailDescription: '了解百草味如何将业务数据库连接到 StarRocks，简化数据架构，让零售报表与业务数据保持同步。',
    hrTitle: '通过实时数据同步，平稳完成 HR 系统迁移',
    hrDescription: '了解一家人力资源服务企业如何通过 Oracle 到 MySQL 的数据同步，在保持业务服务连续的同时完成关键系统替换。',
  },
};

export default function BladepipeCustomerCasePage() {
  const { i18n } = useDocusaurusContext();
  const copy = content[i18n.currentLocale === 'zh' ? 'zh' : 'en'];
  const [communityModalVisible, setCommunityModalVisible] = useState(false);
  const ctaRef = useRef<HTMLElement>(null);

  // These stories are already published in the BladePipe blog.
  const stories = [
    {
      customer: 'Be & Cheery',
      industry: copy.retail,
      title: copy.retailTitle,
      description: copy.retailDescription,
      permalink: '/blog/user_stories/becheery_data_integration',
      image: '/img/blog/user_stories/becheery.png',
    },
    {
      customer: copy.hrCustomer,
      industry: copy.hr,
      title: copy.hrTitle,
      description: copy.hrDescription,
      permalink: '/blog/user_stories/system_upgrade_oracle',
      image: '/img/blog/user_stories/hr_company.png',
    },
  ];

  const handleTryCloud = () => {
    if (isUserLogin()) {
      window.location.href = getCloudUrl();
      return;
    }
    localStorage.setItem('loginSource', 'try_cloud_free');
    window.location.href = '/login/';
  };

  return (
    <Layout description={copy.description}>
      <Head><title>{copy.title}</title></Head>
      <main className={`${styles.page} ${styles.bladepipePage}`}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <h1>{copy.heading}</h1>
              <p className={styles.heroDescription}>{copy.introduction}</p>
            </div>
            <div className={styles.heroArtwork}>
              <img src="/img/home/customer-case-handshake.png" alt={copy.artworkAlt} />
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="customer-stories-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2 id="customer-stories-title">{copy.storiesHeading}</h2>
            </div>
            <div className={`${styles.caseGrid} ${styles.namedCaseGrid}`}>
              {stories.map((story) => (
                <Link key={story.permalink} to={story.permalink} className={styles.caseCard}>
                  <div className={styles.caseImageWrap}>
                    <img src={story.image} alt={story.title} className={styles.caseImage} loading="lazy" />
                  </div>
                  <div className={styles.caseContent}>
                    <div className={styles.caseMeta}>
                      <span>{story.industry}</span>
                      <span className={styles.caseMetaDivider} aria-hidden="true" />
                      <span>{story.customer}</span>
                    </div>
                    <h3>{story.title}</h3>
                    <p>{story.description}</p>
                    <span className={styles.caseLink}>{copy.readStory}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.logosSection}`} aria-labelledby="customer-logos-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2 id="customer-logos-title">{copy.logosHeading}</h2>
            </div>
            <div className={styles.logoGrid}>
              {bladepipeCustomerLogos.map((logo) => {
                const customer = new URL(logo.url).hostname.replace(/^www\./, '');
                return (
                  <a key={logo.src} className={styles.logoCard} href={logo.url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.customerWebsite}: ${customer}`}>
                    <img src={logo.src} alt={`${copy.customerLogo}: ${customer}`} style={{ width: logo.width, height: logo.height }} loading="lazy" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className={styles.ctaSection}>
          <ScrollCtaBackground sectionRef={ctaRef} />
          <div className={styles.ctaInner}>
            <div className={styles.ctaContent}>
              <h2>{copy.ctaHeading}</h2>
              <p>{copy.ctaDescription}</p>
            </div>
            <div className={styles.ctaActions}>
              <button type="button" className={styles.ctaPrimary} onClick={handleTryCloud}>{copy.tryCloud}</button>
              <button type="button" className={styles.ctaSecondary} onClick={() => setCommunityModalVisible(true)}>{copy.tryCommunity}</button>
            </div>
          </div>
        </section>
      </main>
      <CommunityInstallModal visible={communityModalVisible} onClose={() => setCommunityModalVisible(false)} initialTab="docker" />
      <Footer />
    </Layout>
  );
}
