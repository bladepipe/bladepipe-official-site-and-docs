import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({id: 'features.easy', message: 'Easy to Use'}),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <Translate id="features.easy.desc">Docusaurus was designed from the ground up to be easily installed and used to get your website up and running quickly.</Translate>
      </>
    ),
  },
  {
    title: translate({id: 'features.focus', message: 'Focus on What Matters'}),
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <Translate id="features.focus.desc">Docusaurus lets you focus on your docs, and we'll do the chores. Go ahead and move your docs into the <code>docs</code> directory.</Translate>
      </>
    ),
  },
  {
    title: translate({id: 'features.react', message: 'Powered by React'}),
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <Translate id="features.react.desc">Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the same header and footer.</Translate>
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
