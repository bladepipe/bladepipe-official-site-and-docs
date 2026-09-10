import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Redirect } from '@docusaurus/router';
import Layout from '@theme/Layout';
import Footer from '@site/src/components/Footer';
import CommunityInstallModal from '@site/src/components/CommunityInstallModal';
import { clougenceCustomerCaseLogos } from '@site/src/components/UserLogos';
import { getCloudUrl } from '@site/src/utils/api';
import { isUserLogin } from '@site/src/store/user';
import styles from './customer-case.module.css';

type CaseArticle = {
  id: string;
  title: string;
  description: string;
  permalink: string;
  image: string;
};

const namedCaseIds = new Set([
  'baicaowei_data_integration',
  'beifanghanwang_oracle_mysql_sync',
  'deqinglerong_mysql_es_widetable_sync',
  'wangzhangdian_mysql_es_widetable_sync',
]);

const caseDetails: Record<string, { customer: string; industry: string }> = {
  baicaowei_data_integration: { customer: '百草味', industry: '零售与消费品' },
  beifanghanwang_oracle_mysql_sync: { customer: '北方汉王', industry: '人力资源服务' },
  deqinglerong_mysql_es_widetable_sync: { customer: '德勤乐融', industry: '金融科技' },
  wangzhangdian_mysql_es_widetable_sync: { customer: '万店掌', industry: '零售数字化' },
  _starrocks_in_medical_case: { customer: '某头部大健康企业', industry: '医疗健康' },
  ecommerce_service_provider: { customer: '某头部电商运营服务商', industry: '电商服务' },
  hospital_data_integration: { customer: '某头部医疗数字化服务商', industry: '智慧医疗' },
  police_real_time_data_replication: { customer: '某公安局', industry: '公共安全' },
  telecom_cross_cloud_migration: { customer: '某大型通信运营商子公司', industry: '通信与政企服务' },
};

function getUseCases(): CaseArticle[] {
  const req = (require as any).context(
    '../../.docusaurus/docusaurus-plugin-content-blog/default',
    false,
    /^\.\/site-cc-blog-usecase-.*\.json$/,
  );

  return req.keys().map((key: string) => {
    const item = req(key);
    return {
      id: item.frontMatter?.id || item.id,
      title: item.title,
      description: item.description || item.frontMatter?.description || '',
      permalink: item.permalink,
      image: item.frontMatter?.image || '',
    };
  });
}

function CaseCard({ article }: { article: CaseArticle }) {
  const detail = caseDetails[article.id] || { customer: '客户实践', industry: '行业案例' };

  return (
    <Link to={article.permalink} className={styles.caseCard}>
      <div className={styles.caseImageWrap}>
        {article.image ? <img src={article.image} alt={article.title} className={styles.caseImage} /> : null}
      </div>
      <div className={styles.caseContent}>
        <div className={styles.caseMeta}>
          <span>{detail.industry}</span>
          <span className={styles.caseMetaDivider} />
          <span>{detail.customer}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <span className={styles.caseLink}>阅读案例 <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  );
}

export default function CustomerCasePage() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const [communityModalVisible, setCommunityModalVisible] = useState(false);

  if (siteBrand !== 'clougence') {
    return <Redirect to="/" />;
  }

  const articles = getUseCases();
  const namedCases = articles.filter((article) => namedCaseIds.has(article.id));
  const anonymousCases = articles.filter((article) => !namedCaseIds.has(article.id));

  const handleTryCloud = () => {
    if (isUserLogin()) {
      window.location.href = getCloudUrl();
      return;
    }
    localStorage.setItem('loginSource', 'try_cloud_free');
    window.location.href = '/login';
  };

  return (
    <Layout description="了解各行业客户如何通过 CloudCanal 完成数据迁移、同步、集成与实时分析。">
      <Head>
        <title>用户案例 | CloudCanal</title>
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <h1>与用户一起，让数据持续创造价值</h1>
              <p className={styles.heroDescription}>
                从数据迁移到实时同步，从复杂集成到业务创新，CloudCanal 陪伴各行业团队构建稳定、高效的数据连接。
              </p>
            </div>
            <div className={styles.heroArtwork}>
              <img src="/img/home/customer-case-handshake.png" alt="用户合作握手插画" />
            </div>
          </div>
        </section>

        <section id="named-cases" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2>来自行业用户的真实实践</h2>
            </div>
            <div className={`${styles.caseGrid} ${styles.namedCaseGrid}`}>{namedCases.map((article) => <CaseCard key={article.id} article={article} />)}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.anonymousSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2>覆盖更多行业与业务场景</h2>
            </div>
            <div className={`${styles.caseGrid} ${styles.anonymousCaseGrid}`}>{anonymousCases.map((article) => <CaseCard key={article.id} article={article} />)}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.logosSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2>被众多行业领先团队信任</h2>
            </div>
            <div className={styles.logoGrid}>
              {clougenceCustomerCaseLogos.map((logo) => (
                <a key={logo.src} className={styles.logoCard} href={logo.url || undefined} target="_blank" rel="noopener noreferrer" aria-label="访问客户官网">
                  <img src={logo.src} alt="客户 Logo" style={{ width: logo.width, height: logo.height }} loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaBackground} aria-hidden="true" />
          <div className={styles.ctaInner}>
            <div className={styles.ctaContent}>
              <h2>让数据连接，成为业务增长的持续动力</h2>
              <p>无论您正在规划数据迁移、实时同步还是复杂集成，CloudCanal 都愿意与您一起找到合适的解决方案。</p>
            </div>
            <div className={styles.ctaActions}>
              <button type="button" className={styles.ctaPrimary} onClick={handleTryCloud}>试用云服务 <span aria-hidden="true">→</span></button>
              <button type="button" className={styles.ctaSecondary} onClick={() => setCommunityModalVisible(true)}>免费社区版</button>
            </div>
          </div>
        </section>

      </main>
      <CommunityInstallModal visible={communityModalVisible} onClose={() => setCommunityModalVisible(false)} initialTab="docker" />
      <Footer />
    </Layout>
  );
}
