import type { PageMeta } from './meta';

type SiteBrand = 'bladepipe' | 'clougence' | 'clouddm' | string;

const BRAND_PROFILES = {
  bladepipe: {
    name: 'BladePipe',
    legalName: 'BladePipe',
    url: 'https://www.bladepipe.com',
    logo: 'https://www.bladepipe.com/img/home/BladePipe.png',
    description:
      'BladePipe is a real-time data integration and CDC pipeline platform for analytics, AI, migration, replication, and enterprise data synchronization.',
    productName: 'BladePipe',
    applicationCategory: 'Data integration software',
    operatingSystem: 'Cloud, Linux, Kubernetes, Docker',
  },
  clougence: {
    name: 'ClouGence',
    legalName: 'ClouGence',
    url: 'https://www.clougence.com',
    logo: 'https://www.clougence.com/img/home/CloudCanal.svg',
    description:
      'ClouGence provides CloudCanal, a data migration, data synchronization, data integration, data verification, and real-time replication platform.',
    productName: 'CloudCanal',
    applicationCategory: '数据迁移与同步软件',
    operatingSystem: 'Cloud, Linux, Kubernetes, Docker',
  },
  clouddm: {
    name: 'CloudDM',
    legalName: 'ClouGence',
    url: 'https://www.clougence.com',
    logo: 'https://www.clougence.com/img/home/CloudDM.svg',
    description:
      'CloudDM is a multi-source database development and management tool for secure data access, database change management, and team collaboration.',
    productName: 'CloudDM',
    applicationCategory: 'Database management software',
    operatingSystem: 'Cloud, Desktop',
  },
};

export function getBrandProfile(siteBrand: SiteBrand) {
  return BRAND_PROFILES[siteBrand as keyof typeof BRAND_PROFILES] ?? BRAND_PROFILES.bladepipe;
}

export function getHomeStructuredData(siteBrand: SiteBrand, meta: PageMeta) {
  const brand = getBrandProfile(siteBrand);
  const organizationId = `${brand.url}/#organization`;
  const productId = `${brand.url}/#product`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: brand.name,
      legalName: brand.legalName,
      url: brand.url,
      logo: brand.logo,
      description: brand.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': productId,
      name: brand.productName,
      applicationCategory: brand.applicationCategory,
      operatingSystem: brand.operatingSystem,
      url: brand.url,
      description: meta.description,
      publisher: {
        '@id': organizationId,
      },
      offers: {
        '@type': 'Offer',
        url: `${brand.url}/pricing/`,
        price: '0',
        priceCurrency: siteBrand === 'bladepipe' ? 'USD' : 'CNY',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${brand.url}/#website`,
      name: brand.name,
      url: brand.url,
      description: meta.description,
      publisher: {
        '@id': organizationId,
      },
    },
  ];
}

export function getArticleStructuredData(params: {
  siteBrand: SiteBrand;
  title: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  const brand = getBrandProfile(params.siteBrand);
  const articleUrl = params.url || brand.url;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    image: params.image,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: params.authorName
      ? {
          '@type': 'Person',
          name: params.authorName,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: brand.name,
      logo: {
        '@type': 'ImageObject',
        url: brand.logo,
      },
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: brand.name,
        item: brand.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${brand.url}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: params.title,
        item: articleUrl,
      },
    ],
  };

  return [article, breadcrumb];
}

export function getFaqStructuredData(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
