import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Banner from '@site/src/components/Banner';
import Navbar from '@site/src/components/Navbar';
import UserLogos from '@site/src/components/UserLogos';
import BusinessData from '@site/src/components/BusinessData';
import CompareSection from '../components/CompareSection';
import ProductFeatures from '@site/src/components/ProductFeatures';
import ProductFunctions from '@site/src/components/ProductFunctions';
import Footer from '@site/src/components/Footer';
import UserGuide from '@site/src/components/UserGuide';
import FadeInSection from '@site/src/components/FadeInSection';
import DataSourceList from '../components/DataSourceList';
import SceneSection from '../components/SceneSection';
import DeployModeSection from '../components/DeployModeSection';
import CustomBlog from '@site/src/components/custom-blog';
import Translate from '@docusaurus/Translate';
import CloudDM from './clouddm';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title">{siteConfig.title}</Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">{siteConfig.tagline}</Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate id="homepage.tutorialBtn">Docusaurus Tutorial - 5min ⏱️</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  
  // 当 siteBrand 为 clouddm 时，渲染 CloudDM 页面
  if (siteBrand === 'clouddm') {
    return <CloudDM />;
  }

  // 否则渲染原有的首页内容
  return (
    <Layout>
      <FadeInSection><Banner /></FadeInSection>
      <FadeInSection><UserLogos /></FadeInSection>
      <FadeInSection><BusinessData /></FadeInSection>
      <FadeInSection><CompareSection showLearnMore={true} /></FadeInSection>
      <FadeInSection><ProductFeatures /></FadeInSection>
      <FadeInSection><ProductFunctions /></FadeInSection>
      <FadeInSection><DataSourceList /></FadeInSection>
      <FadeInSection><SceneSection /></FadeInSection>
      <FadeInSection><DeployModeSection /></FadeInSection>
      <FadeInSection><UserGuide /></FadeInSection>
      <FadeInSection><CustomBlog /></FadeInSection>
      <Footer />
    </Layout>
  );
}
