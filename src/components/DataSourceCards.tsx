import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import siteConfig from '@generated/docusaurus.config';
import Pagination from './Pagination';

interface DataSourceCardProps {
  name: string;
  icon: string;
  description: string;
  isBusinessOnly?: boolean;
  supportsSource?: boolean;
  supportsTarget?: boolean;
}

const DataSourceCard: React.FC<DataSourceCardProps> = ({ 
  name, 
  icon, 
  description, 
  isBusinessOnly = false,
  supportsSource = false,
  supportsTarget = false
}) => {
  return (
    <div className="w-[429px] h-[386px] bg-white rounded-[20px] border border-gray-200 p-8 flex flex-col gap-8 justify-start items-start relative box-border hover:bg-gradient-to-b hover:from-[#EAF7FF] hover:to-white hover:border-[#8DC6F1] hover:shadow-[0_6px_13px_0_rgba(0,135,199,0.1),0_23px_23px_0_rgba(0,135,199,0.09),0_53px_32px_0_rgba(0,135,199,0.05),0_94px_37px_0_rgba(0,135,199,0.01)] transition-all duration-300" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
      {/* 顶部区域：图标和标签 */}
      <div className="w-full flex justify-between items-start">
        {/* 图标区域 - 白色背景，有阴影 */}
        <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center box-border shadow-[0_5px_10px_0_rgba(0,0,0,0.07)] p-4" style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'rgba(0,0,0,0.08)' }}>
          <svg className="icon-v2 w-8 h-8" aria-hidden="true">
            <use xlinkHref={`#icon-v2-${icon}`} />
          </svg>
        </div>
        
        {/* Business ONLY 标签 - 包含在卡片内 */}
        {isBusinessOnly && (
          <div className="bg-[#E6F3FF] rounded-full px-3 py-1 box-border">
            <span className="text-[#0087C7] text-xs font-medium">Business ONLY</span>
          </div>
        )}
      </div>
      
      {/* 标题 - 24px 字体，粗体 */}
      <h3 className="text-2xl font-bold text-black leading-8 m-0" translate="no">{name}</h3>
      
      {/* 描述文本 - 16px 字体，80% 透明度，固定四行高度 */}
      <p className="text-base text-black opacity-80 leading-6 font-medium flex-1 m-0 min-h-[96px] flex items-start">
        <Translate id={`connector.datasource.${icon.toLowerCase()}.description`}>
          {description}
        </Translate>
      </p>
      
      {/* 按钮区域 - 根据配置显示 Source/Target 按钮 */}
      <div className="flex gap-3 w-full">
        {supportsSource && (
          <button className="w-1/2 h-9 bg-white border border-[#0087C7] rounded-full px-5 py-2 flex items-center justify-center box-border cursor-pointer outline-none" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
            <span className="text-[#0087C7] text-sm font-bold">
              <Translate id="connector.filter.source">Source</Translate>
            </span>
          </button>
        )}
        {supportsTarget && (
          <button className="w-1/2 h-9 bg-white border border-[#0087C7] rounded-full px-5 py-2 flex items-center justify-center box-border cursor-pointer outline-none" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
            <span className="text-[#0087C7] text-sm font-bold">
              <Translate id="connector.filter.target">Target</Translate>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

interface DataSourceCardsProps {
  searchFilter?: string;
  sourceFilter?: boolean;
  targetFilter?: boolean;
  businessOnlyFilter?: boolean;
}

const DataSourceCards: React.FC<DataSourceCardsProps> = ({ 
  searchFilter = '', 
  sourceFilter = false, 
  targetFilter = false, 
  businessOnlyFilter = false 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 固定每页显示9个数据源
  const siteBrand = siteConfig.customFields?.siteBrand as string;

  const dataSources = [
    {
      name: 'MySQL',
      icon: 'MySQL',
      description: 'MySQL is the world\'s most popular open-source relational database management system, known for high performance, reliability, and ease of use.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Oracle',
      icon: 'Oracle',
      description: 'Oracle Database is the industry-leading enterprise relational database, providing robust transaction processing, data security, and high availability.',
      isBusinessOnly: siteBrand === 'clougence',
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'PostgreSQL',
      icon: 'PostgreSQL',
      description: 'PostgreSQL is a powerful open-source object-relational database, renowned for its advanced features and standards compliance.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'SQLServer',
      icon: 'SQLServer',
      description: 'Microsoft SQL Server is an enterprise-grade relational database management system with powerful analytics and reporting capabilities.',
      isBusinessOnly: siteBrand === 'clougence',
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'RDS for MySQL',
      icon: 'RDSforMySQL',
      description: 'Amazon RDS for MySQL is a managed MySQL cloud database service offering automated backups, monitoring, and scaling features.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'ElasticSearch',
      icon: 'ElasticSearch',
      description: 'Elasticsearch is a distributed search and analytics engine designed for real-time search and analysis of large-scale data.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Hive',
      icon: 'Hive',
      description: 'Apache Hive is a data warehouse software built on Hadoop, supporting big data queries and analytics.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'Kafka',
      icon: 'Kafka',
      description: 'Apache Kafka is a high-throughput distributed publish-subscribe messaging system for building real-time data pipelines.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'RocketMQ',
      icon: 'RocketMQ',
      description: 'Apache RocketMQ is Alibaba\'s open-source distributed messaging middleware, featuring low latency and high reliability.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'RDS for PG',
      icon: 'RDSforPostgreSQL',
      description: 'Amazon RDS for PostgreSQL provides fully managed PostgreSQL database service with high availability and security.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'ADB for PostgreSQL',
      icon: 'ADBforPG',
      description: 'AnalyticDB for PostgreSQL is Alibaba Cloud\'s massively parallel processing data warehouse service based on open-source Greenplum.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Greenplum',
      icon: 'Greenplum',
      description: 'Greenplum is a massively parallel processing database designed for big data analytics and data warehouse applications.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'RabbitMQ',
      icon: 'RabbitMQ',
      description: 'RabbitMQ is a feature-rich message broker supporting multiple messaging protocols, widely used in microservices architecture.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'TiDB',
      icon: 'TiDB',
      description: 'TiDB is an open-source distributed NewSQL database supporting horizontal scaling, strong consistency, and high availability.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'PolarDb for MySQL',
      icon: 'PolarDbMySQL',
      description: 'PolarDB for MySQL is Alibaba Cloud\'s cloud-native relational database, MySQL-compatible with higher performance.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'ClickHouse',
      icon: 'ClickHouse',
      description: 'ClickHouse is a columnar database management system optimized for OLAP workloads and real-time analytical queries.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'PolarDB-X',
      icon: 'PolarDbX',
      description: 'PolarDB-X is Alibaba Cloud\'s cloud-native distributed database providing horizontal scaling and MySQL compatibility.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Redis',
      icon: 'Redis',
      description: 'Redis is an open-source in-memory data structure store used as a database, cache, and message broker.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Kudu',
      icon: 'Kudu',
      description: 'Apache Kudu is a columnar storage manager developed for the Apache Hadoop ecosystem, supporting fast analytics.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'MongoDB',
      icon: 'MongoDB',
      description: 'MongoDB is a popular NoSQL document database offering flexible data models and horizontal scaling capabilities.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Dameng',
      icon: 'Dameng',
      description: 'Dameng Database is a domestic relational database management system with high security and stability, supporting domestic substitution.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'StarRocks',
      icon: 'StarRocks',
      description: 'StarRocks is a next-generation high-speed full-scenario MPP database designed for real-time analytics, supporting multiple data models.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'OceanBase',
      icon: 'OceanBase',
      description: 'OceanBase is Ant Group\'s self-developed enterprise-grade distributed relational database with high availability and performance.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Doris',
      icon: 'Doris',
      description: 'Apache Doris is a modern MPP analytical database supporting real-time data analysis and high-concurrency queries.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'SelectDB',
      icon: 'SelectDB',
      description: 'SelectDB is a cloud-native real-time data warehouse based on Apache Doris, providing ultra-fast queries and simplified operations.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'SAP Hana',
      icon: 'Hana',
      description: 'SAP HANA is an in-memory computing platform combining database, data processing, and application platform capabilities.',
      isBusinessOnly: siteBrand === 'clougence',
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'MariaDB',
      icon: 'MariaDB',
      description: 'MariaDB is a fork of MySQL offering more storage engines and features while maintaining MySQL compatibility.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Aurora MySQL',
      icon: 'AuroraMySQL',
      description: 'Amazon Aurora MySQL is a fully managed MySQL-compatible database with cloud-native performance and availability.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'RedShift',
      icon: 'Redshift',
      description: 'Amazon Redshift is a fully managed petabyte-scale data warehouse service designed for large-scale data analytics.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'IBM Db2',
      icon: 'Db2',
      description: 'IBM Db2 is an enterprise-grade relational database providing AI-enhanced data management and advanced analytics capabilities.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'GaussDB for OpenGauss',
      icon: 'GaussDBForOpenGauss',
      description: 'GaussDB for openGauss is Huawei Cloud\'s enterprise-grade database service based on the open-source openGauss kernel.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'OceanBase for Oracle',
      icon: 'ObForOracle',
      description: 'OceanBase for Oracle provides Oracle compatibility mode, supporting seamless migration of Oracle applications to distributed architecture.',
      isBusinessOnly: siteBrand === 'clougence',
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Tunnel',
      icon: 'Tunnel',
      description: 'MaxCompute Tunnel is Alibaba Cloud\'s big data computing service data channel, supporting high-speed data upload and download.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'DocumentDB',
      icon: 'DocumentDB',
      description: 'Amazon DocumentDB is a fully managed MongoDB-compatible document database service with high availability and security.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Iceberg',
      icon: 'Iceberg',
      description: 'Apache Iceberg is an open table format standard providing reliable data lake storage for large analytical datasets.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'GuassDB for MySQL',
      icon: 'GaussDBForMySQL',
      description: 'GaussDB for MySQL is Huawei Cloud\'s enterprise-grade cloud-native database, fully compatible with MySQL ecosystem.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Hudi',
      icon: 'Hudi',
      description: 'Apache Hudi is a data lake storage framework supporting real-time data ingestion, updates, and delete operations.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'ADB for MySQL',
      icon: 'AdbForMySQL',
      description: 'AnalyticDB for MySQL is Alibaba Cloud\'s cloud-native data warehouse, MySQL protocol-compatible with real-time analytics support.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Aurora for PostgreSQL',
      icon: 'AuroraPostgreSQL',
      description: 'Amazon Aurora PostgreSQL is a fully managed PostgreSQL-compatible database with cloud-native architecture.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'AutoMQ',
      icon: 'AutoMQ',
      description: 'AutoMQ is a cloud-native Kafka service offering lower cost and higher elasticity message queue solutions.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Pulsar',
      icon: 'Pulsar',
      description: 'Apache Pulsar is a cloud-native distributed messaging and streaming platform supporting multi-tenancy and geo-replication.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'GreptimeDB',
      icon: 'GreptimeDB',
      description: 'GreptimeDB is a cloud-native time-series database designed for IoT, monitoring, and real-time analytics scenarios.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'TDengine',
      icon: 'TDengine',
      description: 'TDengine is a high-performance time-series database designed for IoT with extremely high write and query performance.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: false
    },
    {
      name: 'SshFile',
      icon: 'SshFile',
      description: 'SSH file transfer supports remote file access and data transmission through secure SSH protocol.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: false
    },
    {
      name: 'OssFile',
      icon: 'OssFile',
      description: 'Alibaba Cloud Object Storage Service (OSS) provides massive, secure, low-cost, and highly reliable cloud storage services.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: false
    },
    {
      name: 'S3File',
      icon: 'S3File',
      description: 'Amazon S3 is an object storage service providing industry-leading scalability, data availability, and security.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: false
    },
    {
      name: 'OpenAI',
      icon: 'OpenAI',
      description: 'OpenAI API provides advanced AI model services including GPT series, DALL-E, and Whisper.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: false
    },
    {
      name: 'HuggingFace',
      icon: 'HuggingFace',
      description: 'Hugging Face is a machine learning community platform providing pre-trained models, datasets, and ML tools.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: false
    },
    {
      name: 'Coherelin',
      icon: 'Cohere',
      description: 'Cohere provides enterprise-grade large language model API services focused on natural language understanding and generation.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: false
    },
    {
      name: 'RagApi',
      icon: 'RagApi',
      description: 'RAG API provides Retrieval-Augmented Generation services combining knowledge base retrieval and large model generation capabilities.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'DeepSeek',
      icon: 'DeepSeek',
      description: 'DeepSeek is a domestic large language model service providing high-quality Chinese understanding and generation capabilities.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: false
    },
    {
      name: 'Ollama',
      icon: 'Ollama',
      description: 'Ollama is a tool for running large language models locally, supporting deployment and usage of AI models on personal devices.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: false
    },
    {
      name: 'Anthropic',
      icon: 'Anthropic',
      description: 'Anthropic Claude is a safe and helpful AI assistant focused on reliable and interpretable AI systems.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: false
    },
    {
      name: 'Bedrock',
      icon: 'Bedrock',
      description: 'Amazon Bedrock is a fully managed service providing foundation models from multiple AI companies.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: false
    },
    {
      name: 'DuckDB',
      icon: 'DuckDB',
      description: 'DuckDB is an embedded analytical database designed for OLAP queries with extremely fast query performance.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'Google Drive',
      icon: 'GoogleDrive',
      description: 'Google Drive is a cloud storage service that offers file storage, synchronization, and collaboration features.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: false
    },
    {
      name: 'DynamoDB',
      icon: 'DynamoDB',
      description: 'Amazon DynamoDB is a fully managed NoSQL database service providing fast and predictable performance.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Paimon',
      icon: 'Paimon',
      description: 'Apache Paimon is a streaming data lake storage that supports high-throughput real-time data updates and OLAP queries.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'Yuque',
      icon: 'Yuque',
      description: 'Yuque is a knowledge management platform that helps teams organize and share knowledge efficiently.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: false
    },
    {
      name: 'ElastiCache',
      icon: 'ElastiCache',
      description: 'Amazon ElastiCache is a web service that makes it easy to deploy, operate, and scale an in-memory cache in the cloud.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'Amazon MSK',
      icon: 'AmazonMSK',
      description: 'Amazon Managed Streaming for Apache Kafka (MSK) is a fully managed service that makes it easy to build and run applications that use Apache Kafka.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'PolarDb for PostgreSQL',
      icon: 'PolarDBPg',
      description: 'PolarDB for PostgreSQL is Alibaba Cloud\'s cloud-native relational database, PostgreSQL-compatible with enhanced performance and scalability.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'DeltaLake',
      icon: 'DeltaLake',
      description: 'Delta Lake is an open-source storage layer that brings ACID transactions to Apache Spark and big data workloads.',
      isBusinessOnly: false,
      supportsSource: false,
      supportsTarget: true
    },
    {
      name: 'TDSQL-C',
      icon: 'TdsqlCMySQL',
      description: 'TDSQL-C is Tencent Cloud\'s enterprise-grade cloud-native database, MySQL-compatible with high availability and elasticity.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'TDSQL',
      icon: 'TdsqlMySQL',
      description: 'TDSQL is Tencent\'s high-performance distributed database with strong consistency, high availability, SQL compatibility, and horizontal scaling.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    },
    {
      name: 'KingBase',
      icon: 'KingbaseES',
      description: 'KingBase is a domestic relational database management system with high security, reliability, and support for mission-critical applications.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: false
    },
    {
      name: 'VastBase',
      icon: 'Vastbase',
      description: 'Vastbase G100 is an independently developed enterprise-grade relational database by Vastdata. It features high performance, high concurrency, high availability, high security, and high compatibility.',
      isBusinessOnly: false,
      supportsSource: true,
      supportsTarget: true
    }
    // {
    //   name: 'ZhipuAI',
    //   icon: 'ZhipuAI',
    //   description: 'ZhipuAI is a domestic AI company providing large language model services and AI application solutions.',
    //   isBusinessOnly: false,
    //   supportsSource: false,
    //   supportsTarget: false
    // }
  ];

  // 筛选数据源
  const filteredDataSources = dataSources.filter(source => {
    // 搜索筛选
    if (searchFilter && !source.name.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    
    // Source 筛选
    if (sourceFilter && !source.supportsSource) {
      return false;
    }
    
    // Target 筛选
    if (targetFilter && !source.supportsTarget) {
      return false;
    }
    
    // Business Only 筛选
    if (businessOnlyFilter && !source.isBusinessOnly) {
      return false;
    }
    
    return true;
  });

  // 计算分页
  const totalPages = Math.ceil(filteredDataSources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDataSources = filteredDataSources.slice(startIndex, endIndex);

  // 当筛选条件改变时重置分页
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter, sourceFilter, targetFilter, businessOnlyFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full pt-12 pb-24 flex flex-col items-center gap-12 box-border">
      {/* 卡片区域 - 固定间距的flex布局 */}
      <div className="w-[1320px] max-w-full mx-auto flex gap-4 justify-start items-start flex-wrap box-border overflow-x-auto">
        {currentDataSources.map((source, index) => (
          <DataSourceCard
            key={startIndex + index}
            name={source.name}
            icon={source.icon}
            description={source.description}
            isBusinessOnly={source.isBusinessOnly}
            supportsSource={source.supportsSource}
            supportsTarget={source.supportsTarget}
          />
        ))}
      </div>
      
      {/* 分页组件 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default DataSourceCards; 