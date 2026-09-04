import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './EcosystemPartners.module.css';

const partners = [
  { name: 'StarRocks', description: '实时分析数据库', href: 'https://www.starrocks.io/', logo: '/img/home/partners/starrocks.svg' },
  { name: 'OceanBase', description: '分布式关系型数据库', href: 'https://www.oceanbase.com/', logo: '/img/home/partners/oceanbase.png' },
  { name: 'AutoMQ', description: '云原生消息流平台', href: 'https://www.automq.com/', logo: '/img/home/partners/automq.svg' },
  { name: 'Apache Doris', description: '实时数据仓库', href: 'https://doris.apache.org/', logo: '/img/home/partners/doris.svg' },
  { name: 'Greptime', description: '时序数据库', href: 'https://greptime.com/', logo: 'https://github.com/GreptimeTeam/.github/raw/main/img/logo/text-padding-tined.svg' },
];

export default function EcosystemPartners() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;

  if (siteBrand !== 'clougence') return null;

  return (
    <section className={styles.section} aria-labelledby="ecosystem-partners-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="ecosystem-partners-title">生态合作伙伴</h2>
          <p>与优秀的技术、服务及解决方案伙伴协同，为企业提供更完整的产品与服务体验。</p>
        </div>
        <div className={styles.stage}>
          <div className={styles.stageCopy}>
            <span>PARTNER ECOSYSTEM</span>
            <h3>与伙伴一起<br />拓展服务边界</h3>
            <p>连接技术、服务与解决方案伙伴，为用户创造更丰富、更可靠的价值。</p>
          </div>
          <div className={styles.grid}>
            {partners.map((partner) => (
              <a key={partner.name} className={styles.card} href={partner.href} target="_blank" rel="noopener noreferrer">
                <div className={styles.logoWrap}>
                  <img src={partner.logo} alt={`${partner.name} Logo`} />
                </div>
                <span>{partner.description}</span>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
