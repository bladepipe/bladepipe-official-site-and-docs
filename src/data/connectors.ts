export type SiteBrand = 'bladepipe' | 'clougence' | 'clouddm' | string;

export interface ConnectorDefinition {
  slug: string;
  name: string;
  icon: string;
  description: string;
  descriptionI18nKey: string;
  category: string;
  supportsSource: boolean;
  supportsTarget: boolean;
  businessOnlyBrands?: string[];
  useCases: string[];
}

export type Connector = ConnectorDefinition & {
  isBusinessOnly: boolean;
};

export const CONNECTORS: ConnectorDefinition[] = [
  {
    "slug": "mysql",
    "name": "MySQL",
    "icon": "MySQL",
    "description": "MySQL is the world's most popular open-source relational database management system, known for high performance, reliability, and ease of use.",
    "descriptionI18nKey": "connector.datasource.mysql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "MySQL real-time data synchronization",
      "MySQL migration with full and incremental data"
    ]
  },
  {
    "slug": "oracle",
    "name": "Oracle",
    "icon": "Oracle",
    "description": "Oracle Database is the industry-leading enterprise relational database, providing robust transaction processing, data security, and high availability.",
    "descriptionI18nKey": "connector.datasource.oracle.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Oracle real-time data synchronization",
      "Oracle migration with full and incremental data"
    ],
    "businessOnlyBrands": [
      "clougence"
    ]
  },
  {
    "slug": "postgresql",
    "name": "PostgreSQL",
    "icon": "PostgreSQL",
    "description": "PostgreSQL is a powerful open-source object-relational database, renowned for its advanced features and standards compliance.",
    "descriptionI18nKey": "connector.datasource.postgresql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "PostgreSQL real-time data synchronization",
      "PostgreSQL migration with full and incremental data"
    ]
  },
  {
    "slug": "sql-server",
    "name": "SQLServer",
    "icon": "SQLServer",
    "description": "Microsoft SQL Server is an enterprise-grade relational database management system with powerful analytics and reporting capabilities.",
    "descriptionI18nKey": "connector.datasource.sqlserver.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "SQLServer real-time data synchronization",
      "SQLServer migration with full and incremental data"
    ],
    "businessOnlyBrands": [
      "clougence"
    ]
  },
  {
    "slug": "rds-for-mysql",
    "name": "RDS for MySQL",
    "icon": "RDSforMySQL",
    "description": "Amazon RDS for MySQL is a managed MySQL cloud database service offering automated backups, monitoring, and scaling features.",
    "descriptionI18nKey": "connector.datasource.rdsformysql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "RDS for MySQL real-time data synchronization",
      "RDS for MySQL migration with full and incremental data"
    ]
  },
  {
    "slug": "elasticsearch",
    "name": "ElasticSearch",
    "icon": "ElasticSearch",
    "description": "Elasticsearch is a distributed search and analytics engine designed for real-time search and analysis of large-scale data.",
    "descriptionI18nKey": "connector.datasource.elasticsearch.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "ElasticSearch real-time data synchronization",
      "ElasticSearch migration with full and incremental data"
    ]
  },
  {
    "slug": "hive",
    "name": "Hive",
    "icon": "Hive",
    "description": "Apache Hive is a data warehouse software built on Hadoop, supporting big data queries and analytics.",
    "descriptionI18nKey": "connector.datasource.hive.description",
    "category": "Analytics",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into Hive",
      "Hive as an analytics or serving destination",
      "Hive real-time analytics pipelines"
    ]
  },
  {
    "slug": "kafka",
    "name": "Kafka",
    "icon": "Kafka",
    "description": "Apache Kafka is a high-throughput distributed publish-subscribe messaging system for building real-time data pipelines.",
    "descriptionI18nKey": "connector.datasource.kafka.description",
    "category": "Streaming",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Kafka real-time data synchronization",
      "Kafka migration with full and incremental data",
      "Kafka streaming data pipelines"
    ]
  },
  {
    "slug": "rocketmq",
    "name": "RocketMQ",
    "icon": "RocketMQ",
    "description": "Apache RocketMQ is Alibaba's open-source distributed messaging middleware, featuring low latency and high reliability.",
    "descriptionI18nKey": "connector.datasource.rocketmq.description",
    "category": "Streaming",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "RocketMQ real-time data synchronization",
      "RocketMQ migration with full and incremental data",
      "RocketMQ streaming data pipelines"
    ]
  },
  {
    "slug": "rds-for-postgresql",
    "name": "RDS for PG",
    "icon": "RDSforPostgreSQL",
    "description": "Amazon RDS for PostgreSQL provides fully managed PostgreSQL database service with high availability and security.",
    "descriptionI18nKey": "connector.datasource.rdsforpostgresql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "RDS for PG real-time data synchronization",
      "RDS for PG migration with full and incremental data"
    ]
  },
  {
    "slug": "adb-for-postgresql",
    "name": "ADB for PostgreSQL",
    "icon": "ADBforPG",
    "description": "AnalyticDB for PostgreSQL is Alibaba Cloud's massively parallel processing data warehouse service based on open-source Greenplum.",
    "descriptionI18nKey": "connector.datasource.adbforpg.description",
    "category": "Analytics",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "ADB for PostgreSQL real-time data synchronization",
      "ADB for PostgreSQL migration with full and incremental data",
      "ADB for PostgreSQL real-time analytics pipelines"
    ]
  },
  {
    "slug": "greenplum",
    "name": "Greenplum",
    "icon": "Greenplum",
    "description": "Greenplum is a massively parallel processing database designed for big data analytics and data warehouse applications.",
    "descriptionI18nKey": "connector.datasource.greenplum.description",
    "category": "Analytics",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Greenplum real-time data synchronization",
      "Greenplum migration with full and incremental data",
      "Greenplum real-time analytics pipelines"
    ]
  },
  {
    "slug": "rabbitmq",
    "name": "RabbitMQ",
    "icon": "RabbitMQ",
    "description": "RabbitMQ is a feature-rich message broker supporting multiple messaging protocols, widely used in microservices architecture.",
    "descriptionI18nKey": "connector.datasource.rabbitmq.description",
    "category": "Streaming",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "RabbitMQ real-time data synchronization",
      "RabbitMQ migration with full and incremental data",
      "RabbitMQ streaming data pipelines"
    ]
  },
  {
    "slug": "tidb",
    "name": "TiDB",
    "icon": "TiDB",
    "description": "TiDB is an open-source distributed NewSQL database supporting horizontal scaling, strong consistency, and high availability.",
    "descriptionI18nKey": "connector.datasource.tidb.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "TiDB real-time data synchronization",
      "TiDB migration with full and incremental data"
    ]
  },
  {
    "slug": "polardb-for-mysql",
    "name": "PolarDb for MySQL",
    "icon": "PolarDbMySQL",
    "description": "PolarDB for MySQL is Alibaba Cloud's cloud-native relational database, MySQL-compatible with higher performance.",
    "descriptionI18nKey": "connector.datasource.polardbmysql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "PolarDb for MySQL real-time data synchronization",
      "PolarDb for MySQL migration with full and incremental data"
    ]
  },
  {
    "slug": "clickhouse",
    "name": "ClickHouse",
    "icon": "ClickHouse",
    "description": "ClickHouse is a columnar database management system optimized for OLAP workloads and real-time analytical queries.",
    "descriptionI18nKey": "connector.datasource.clickhouse.description",
    "category": "Analytics",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "ClickHouse real-time data synchronization",
      "ClickHouse migration with full and incremental data",
      "ClickHouse real-time analytics pipelines"
    ]
  },
  {
    "slug": "polardb-x",
    "name": "PolarDB-X",
    "icon": "PolarDbX",
    "description": "PolarDB-X is Alibaba Cloud's cloud-native distributed database providing horizontal scaling and MySQL compatibility.",
    "descriptionI18nKey": "connector.datasource.polardbx.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "PolarDB-X real-time data synchronization",
      "PolarDB-X migration with full and incremental data"
    ]
  },
  {
    "slug": "redis",
    "name": "Redis",
    "icon": "Redis",
    "description": "Redis is an open-source in-memory data structure store used as a database, cache, and message broker.",
    "descriptionI18nKey": "connector.datasource.redis.description",
    "category": "Cache",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Redis real-time data synchronization",
      "Redis migration with full and incremental data"
    ]
  },
  {
    "slug": "kudu",
    "name": "Kudu",
    "icon": "Kudu",
    "description": "Apache Kudu is a columnar storage manager developed for the Apache Hadoop ecosystem, supporting fast analytics.",
    "descriptionI18nKey": "connector.datasource.kudu.description",
    "category": "Analytics",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into Kudu",
      "Kudu as an analytics or serving destination",
      "Kudu real-time analytics pipelines"
    ]
  },
  {
    "slug": "mongodb",
    "name": "MongoDB",
    "icon": "MongoDB",
    "description": "MongoDB is a popular NoSQL document database offering flexible data models and horizontal scaling capabilities.",
    "descriptionI18nKey": "connector.datasource.mongodb.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "MongoDB real-time data synchronization",
      "MongoDB migration with full and incremental data"
    ]
  },
  {
    "slug": "dameng",
    "name": "Dameng",
    "icon": "Dameng",
    "description": "Dameng Database is a domestic relational database management system with high security and stability, supporting domestic substitution.",
    "descriptionI18nKey": "connector.datasource.dameng.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Dameng real-time data synchronization",
      "Dameng migration with full and incremental data"
    ]
  },
  {
    "slug": "starrocks",
    "name": "StarRocks",
    "icon": "StarRocks",
    "description": "StarRocks is a next-generation high-speed full-scenario MPP database designed for real-time analytics, supporting multiple data models.",
    "descriptionI18nKey": "connector.datasource.starrocks.description",
    "category": "Analytics",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "StarRocks real-time data synchronization",
      "StarRocks migration with full and incremental data",
      "StarRocks real-time analytics pipelines"
    ]
  },
  {
    "slug": "oceanbase",
    "name": "OceanBase",
    "icon": "OceanBase",
    "description": "OceanBase is Ant Group's self-developed enterprise-grade distributed relational database with high availability and performance.",
    "descriptionI18nKey": "connector.datasource.oceanbase.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "OceanBase real-time data synchronization",
      "OceanBase migration with full and incremental data"
    ]
  },
  {
    "slug": "doris",
    "name": "Doris",
    "icon": "Doris",
    "description": "Apache Doris is a modern MPP analytical database supporting real-time data analysis and high-concurrency queries.",
    "descriptionI18nKey": "connector.datasource.doris.description",
    "category": "Analytics",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Doris real-time data synchronization",
      "Doris migration with full and incremental data",
      "Doris real-time analytics pipelines"
    ]
  },
  {
    "slug": "selectdb",
    "name": "SelectDB",
    "icon": "SelectDB",
    "description": "SelectDB is a cloud-native real-time data warehouse based on Apache Doris, providing ultra-fast queries and simplified operations.",
    "descriptionI18nKey": "connector.datasource.selectdb.description",
    "category": "Analytics",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "SelectDB real-time data synchronization",
      "SelectDB migration with full and incremental data",
      "SelectDB real-time analytics pipelines"
    ]
  },
  {
    "slug": "sap-hana",
    "name": "SAP Hana",
    "icon": "Hana",
    "description": "SAP HANA is an in-memory computing platform combining database, data processing, and application platform capabilities.",
    "descriptionI18nKey": "connector.datasource.hana.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "SAP Hana real-time data synchronization",
      "SAP Hana migration with full and incremental data"
    ],
    "businessOnlyBrands": [
      "clougence"
    ]
  },
  {
    "slug": "mariadb",
    "name": "MariaDB",
    "icon": "MariaDB",
    "description": "MariaDB is a fork of MySQL offering more storage engines and features while maintaining MySQL compatibility.",
    "descriptionI18nKey": "connector.datasource.mariadb.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "MariaDB real-time data synchronization",
      "MariaDB migration with full and incremental data"
    ]
  },
  {
    "slug": "aurora-mysql",
    "name": "Aurora MySQL",
    "icon": "AuroraMySQL",
    "description": "Amazon Aurora MySQL is a fully managed MySQL-compatible database with cloud-native performance and availability.",
    "descriptionI18nKey": "connector.datasource.auroramysql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Aurora MySQL real-time data synchronization",
      "Aurora MySQL migration with full and incremental data"
    ]
  },
  {
    "slug": "redshift",
    "name": "Redshift",
    "icon": "Redshift",
    "description": "Amazon Redshift is a fully managed petabyte-scale data warehouse service designed for large-scale data analytics.",
    "descriptionI18nKey": "connector.datasource.redshift.description",
    "category": "Analytics",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into Redshift",
      "Redshift as an analytics or serving destination",
      "Redshift real-time analytics pipelines"
    ]
  },
  {
    "slug": "lindorm",
    "name": "Lindorm",
    "icon": "Lindorm",
    "description": "Lindorm is Alibaba Cloud's multi-model database service that integrates wide-table, time-series, search, and file capabilities for massive-scale data scenarios.",
    "descriptionI18nKey": "connector.datasource.lindorm.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Lindorm real-time data synchronization",
      "Lindorm migration with full and incremental data"
    ]
  },
  {
    "slug": "apache-spanner",
    "name": "Apache Spanner",
    "icon": "Spanner",
    "description": "Apache Spanner is a globally distributed relational database service with strong consistency, horizontal scalability, and high availability.",
    "descriptionI18nKey": "connector.datasource.spanner.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Apache Spanner real-time data synchronization",
      "Apache Spanner migration with full and incremental data"
    ]
  },
  {
    "slug": "ibm-db2",
    "name": "IBM Db2",
    "icon": "Db2",
    "description": "IBM Db2 is an enterprise-grade relational database providing AI-enhanced data management and advanced analytics capabilities.",
    "descriptionI18nKey": "connector.datasource.db2.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "IBM Db2 real-time data synchronization",
      "IBM Db2 migration with full and incremental data"
    ]
  },
  {
    "slug": "gaussdb-for-opengauss",
    "name": "GaussDB for OpenGauss",
    "icon": "GaussDBForOpenGauss",
    "description": "GaussDB for openGauss is Huawei Cloud's enterprise-grade database service based on the open-source openGauss kernel.",
    "descriptionI18nKey": "connector.datasource.gaussdbforopengauss.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "GaussDB for OpenGauss real-time data synchronization",
      "GaussDB for OpenGauss migration with full and incremental data"
    ]
  },
  {
    "slug": "oceanbase-for-oracle",
    "name": "OceanBase for Oracle",
    "icon": "ObForOracle",
    "description": "OceanBase for Oracle provides Oracle compatibility mode, supporting seamless migration of Oracle applications to distributed architecture.",
    "descriptionI18nKey": "connector.datasource.obfororacle.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "OceanBase for Oracle real-time data synchronization",
      "OceanBase for Oracle migration with full and incremental data"
    ],
    "businessOnlyBrands": [
      "clougence"
    ]
  },
  {
    "slug": "tunnel",
    "name": "Tunnel",
    "icon": "Tunnel",
    "description": "MaxCompute Tunnel is Alibaba Cloud's big data computing service data channel, supporting high-speed data upload and download.",
    "descriptionI18nKey": "connector.datasource.tunnel.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Tunnel real-time data synchronization",
      "Tunnel migration with full and incremental data"
    ]
  },
  {
    "slug": "documentdb",
    "name": "DocumentDB",
    "icon": "DocumentDB",
    "description": "Amazon DocumentDB is a fully managed MongoDB-compatible document database service with high availability and security.",
    "descriptionI18nKey": "connector.datasource.documentdb.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "DocumentDB real-time data synchronization",
      "DocumentDB migration with full and incremental data"
    ]
  },
  {
    "slug": "iceberg",
    "name": "Iceberg",
    "icon": "Iceberg",
    "description": "Apache Iceberg is an open table format standard providing reliable data lake storage for large analytical datasets.",
    "descriptionI18nKey": "connector.datasource.iceberg.description",
    "category": "File and lake",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into Iceberg",
      "Iceberg as an analytics or serving destination"
    ]
  },
  {
    "slug": "gaussdb-for-mysql",
    "name": "GuassDB for MySQL",
    "icon": "GaussDBForMySQL",
    "description": "GaussDB for MySQL is Huawei Cloud's enterprise-grade cloud-native database, fully compatible with MySQL ecosystem.",
    "descriptionI18nKey": "connector.datasource.gaussdbformysql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "GuassDB for MySQL real-time data synchronization",
      "GuassDB for MySQL migration with full and incremental data"
    ]
  },
  {
    "slug": "hudi",
    "name": "Hudi",
    "icon": "Hudi",
    "description": "Apache Hudi is a data lake storage framework supporting real-time data ingestion, updates, and delete operations.",
    "descriptionI18nKey": "connector.datasource.hudi.description",
    "category": "File and lake",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into Hudi",
      "Hudi as an analytics or serving destination"
    ]
  },
  {
    "slug": "adb-for-mysql",
    "name": "ADB for MySQL",
    "icon": "AdbForMySQL",
    "description": "AnalyticDB for MySQL is Alibaba Cloud's cloud-native data warehouse, MySQL protocol-compatible with real-time analytics support.",
    "descriptionI18nKey": "connector.datasource.adbformysql.description",
    "category": "Analytics",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "ADB for MySQL real-time data synchronization",
      "ADB for MySQL migration with full and incremental data",
      "ADB for MySQL real-time analytics pipelines"
    ]
  },
  {
    "slug": "aurora-for-postgresql",
    "name": "Aurora for PostgreSQL",
    "icon": "AuroraPostgreSQL",
    "description": "Amazon Aurora PostgreSQL is a fully managed PostgreSQL-compatible database with cloud-native architecture.",
    "descriptionI18nKey": "connector.datasource.aurorapostgresql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Aurora for PostgreSQL real-time data synchronization",
      "Aurora for PostgreSQL migration with full and incremental data"
    ]
  },
  {
    "slug": "automq",
    "name": "AutoMQ",
    "icon": "AutoMQ",
    "description": "AutoMQ is a cloud-native Kafka service offering lower cost and higher elasticity message queue solutions.",
    "descriptionI18nKey": "connector.datasource.automq.description",
    "category": "Streaming",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "AutoMQ real-time data synchronization",
      "AutoMQ migration with full and incremental data",
      "AutoMQ streaming data pipelines"
    ]
  },
  {
    "slug": "pulsar",
    "name": "Pulsar",
    "icon": "Pulsar",
    "description": "Apache Pulsar is a cloud-native distributed messaging and streaming platform supporting multi-tenancy and geo-replication.",
    "descriptionI18nKey": "connector.datasource.pulsar.description",
    "category": "Streaming",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Pulsar real-time data synchronization",
      "Pulsar migration with full and incremental data",
      "Pulsar streaming data pipelines"
    ]
  },
  {
    "slug": "greptimedb",
    "name": "GreptimeDB",
    "icon": "GreptimeDB",
    "description": "GreptimeDB is a cloud-native time-series database designed for IoT, monitoring, and real-time analytics scenarios.",
    "descriptionI18nKey": "connector.datasource.greptimedb.description",
    "category": "Database",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into GreptimeDB",
      "GreptimeDB as an analytics or serving destination"
    ]
  },
  {
    "slug": "tdengine",
    "name": "TDengine",
    "icon": "TDengine",
    "description": "TDengine is a high-performance time-series database designed for IoT with extremely high write and query performance.",
    "descriptionI18nKey": "connector.datasource.tdengine.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": false,
    "useCases": [
      "Ingest data from TDengine",
      "TDengine data extraction for downstream pipelines"
    ]
  },
  {
    "slug": "ssh-file",
    "name": "SshFile",
    "icon": "SshFile",
    "description": "SSH file transfer supports remote file access and data transmission through secure SSH protocol.",
    "descriptionI18nKey": "connector.datasource.sshfile.description",
    "category": "File and lake",
    "supportsSource": true,
    "supportsTarget": false,
    "useCases": [
      "Ingest data from SshFile",
      "SshFile data extraction for downstream pipelines"
    ]
  },
  {
    "slug": "oss-file",
    "name": "OssFile",
    "icon": "OssFile",
    "description": "Alibaba Cloud Object Storage Service (OSS) provides massive, secure, low-cost, and highly reliable cloud storage services.",
    "descriptionI18nKey": "connector.datasource.ossfile.description",
    "category": "File and lake",
    "supportsSource": true,
    "supportsTarget": false,
    "useCases": [
      "Ingest data from OssFile",
      "OssFile data extraction for downstream pipelines"
    ]
  },
  {
    "slug": "s3-file",
    "name": "S3File",
    "icon": "S3File",
    "description": "Amazon S3 is an object storage service providing industry-leading scalability, data availability, and security.",
    "descriptionI18nKey": "connector.datasource.s3file.description",
    "category": "File and lake",
    "supportsSource": true,
    "supportsTarget": false,
    "useCases": [
      "Ingest data from S3File",
      "S3File data extraction for downstream pipelines"
    ]
  },
  {
    "slug": "openai",
    "name": "OpenAI",
    "icon": "OpenAI",
    "description": "OpenAI API provides advanced AI model services including GPT series, DALL-E, and Whisper.",
    "descriptionI18nKey": "connector.datasource.openai.description",
    "category": "AI",
    "supportsSource": false,
    "supportsTarget": false,
    "useCases": [
      "OpenAI integration for AI data workflows",
      "OpenAI AI and RAG data workflows"
    ]
  },
  {
    "slug": "huggingface",
    "name": "HuggingFace",
    "icon": "HuggingFace",
    "description": "Hugging Face is a machine learning community platform providing pre-trained models, datasets, and ML tools.",
    "descriptionI18nKey": "connector.datasource.huggingface.description",
    "category": "AI",
    "supportsSource": false,
    "supportsTarget": false,
    "useCases": [
      "HuggingFace integration for AI data workflows",
      "HuggingFace AI and RAG data workflows"
    ]
  },
  {
    "slug": "cohere",
    "name": "Coherelin",
    "icon": "Cohere",
    "description": "Cohere provides enterprise-grade large language model API services focused on natural language understanding and generation.",
    "descriptionI18nKey": "connector.datasource.cohere.description",
    "category": "AI",
    "supportsSource": false,
    "supportsTarget": false,
    "useCases": [
      "Coherelin integration for AI data workflows",
      "Coherelin AI and RAG data workflows"
    ]
  },
  {
    "slug": "rag-api",
    "name": "RagApi",
    "icon": "RagApi",
    "description": "RAG API provides Retrieval-Augmented Generation services combining knowledge base retrieval and large model generation capabilities.",
    "descriptionI18nKey": "connector.datasource.ragapi.description",
    "category": "AI",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into RagApi",
      "RagApi as an analytics or serving destination",
      "RagApi AI and RAG data workflows"
    ]
  },
  {
    "slug": "deepseek",
    "name": "DeepSeek",
    "icon": "DeepSeek",
    "description": "DeepSeek is a domestic large language model service providing high-quality Chinese understanding and generation capabilities.",
    "descriptionI18nKey": "connector.datasource.deepseek.description",
    "category": "AI",
    "supportsSource": false,
    "supportsTarget": false,
    "useCases": [
      "DeepSeek integration for AI data workflows",
      "DeepSeek AI and RAG data workflows"
    ]
  },
  {
    "slug": "ollama",
    "name": "Ollama",
    "icon": "Ollama",
    "description": "Ollama is a tool for running large language models locally, supporting deployment and usage of AI models on personal devices.",
    "descriptionI18nKey": "connector.datasource.ollama.description",
    "category": "AI",
    "supportsSource": false,
    "supportsTarget": false,
    "useCases": [
      "Ollama integration for AI data workflows",
      "Ollama AI and RAG data workflows"
    ]
  },
  {
    "slug": "anthropic",
    "name": "Anthropic",
    "icon": "Anthropic",
    "description": "Anthropic Claude is a safe and helpful AI assistant focused on reliable and interpretable AI systems.",
    "descriptionI18nKey": "connector.datasource.anthropic.description",
    "category": "AI",
    "supportsSource": false,
    "supportsTarget": false,
    "useCases": [
      "Anthropic integration for AI data workflows",
      "Anthropic AI and RAG data workflows"
    ]
  },
  {
    "slug": "bedrock",
    "name": "Bedrock",
    "icon": "Bedrock",
    "description": "Amazon Bedrock is a fully managed service providing foundation models from multiple AI companies.",
    "descriptionI18nKey": "connector.datasource.bedrock.description",
    "category": "AI",
    "supportsSource": false,
    "supportsTarget": false,
    "useCases": [
      "Bedrock integration for AI data workflows",
      "Bedrock AI and RAG data workflows"
    ]
  },
  {
    "slug": "duckdb",
    "name": "DuckDB",
    "icon": "DuckDB",
    "description": "DuckDB is an embedded analytical database designed for OLAP queries with extremely fast query performance.",
    "descriptionI18nKey": "connector.datasource.duckdb.description",
    "category": "Analytics",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into DuckDB",
      "DuckDB as an analytics or serving destination",
      "DuckDB real-time analytics pipelines"
    ]
  },
  {
    "slug": "google-drive",
    "name": "Google Drive",
    "icon": "GoogleDrive",
    "description": "Google Drive is a cloud storage service that offers file storage, synchronization, and collaboration features.",
    "descriptionI18nKey": "connector.datasource.googledrive.description",
    "category": "File and lake",
    "supportsSource": true,
    "supportsTarget": false,
    "useCases": [
      "Ingest data from Google Drive",
      "Google Drive data extraction for downstream pipelines"
    ]
  },
  {
    "slug": "dynamodb",
    "name": "DynamoDB",
    "icon": "DynamoDB",
    "description": "Amazon DynamoDB is a fully managed NoSQL database service providing fast and predictable performance.",
    "descriptionI18nKey": "connector.datasource.dynamodb.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "DynamoDB real-time data synchronization",
      "DynamoDB migration with full and incremental data"
    ]
  },
  {
    "slug": "paimon",
    "name": "Paimon",
    "icon": "Paimon",
    "description": "Apache Paimon is a streaming data lake storage that supports high-throughput real-time data updates and OLAP queries.",
    "descriptionI18nKey": "connector.datasource.paimon.description",
    "category": "File and lake",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into Paimon",
      "Paimon as an analytics or serving destination"
    ]
  },
  {
    "slug": "yuque",
    "name": "Yuque",
    "icon": "Yuque",
    "description": "Yuque is a knowledge management platform that helps teams organize and share knowledge efficiently.",
    "descriptionI18nKey": "connector.datasource.yuque.description",
    "category": "File and lake",
    "supportsSource": true,
    "supportsTarget": false,
    "useCases": [
      "Ingest data from Yuque",
      "Yuque data extraction for downstream pipelines"
    ]
  },
  {
    "slug": "elasticache",
    "name": "ElastiCache",
    "icon": "ElastiCache",
    "description": "Amazon ElastiCache is a web service that makes it easy to deploy, operate, and scale an in-memory cache in the cloud.",
    "descriptionI18nKey": "connector.datasource.elasticache.description",
    "category": "Cache",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "ElastiCache real-time data synchronization",
      "ElastiCache migration with full and incremental data"
    ]
  },
  {
    "slug": "amazon-msk",
    "name": "Amazon MSK",
    "icon": "AmazonMSK",
    "description": "Amazon Managed Streaming for Apache Kafka (MSK) is a fully managed service that makes it easy to build and run applications that use Apache Kafka.",
    "descriptionI18nKey": "connector.datasource.amazonmsk.description",
    "category": "Streaming",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "Amazon MSK real-time data synchronization",
      "Amazon MSK migration with full and incremental data",
      "Amazon MSK streaming data pipelines"
    ]
  },
  {
    "slug": "polardb-for-postgresql",
    "name": "PolarDb for PostgreSQL",
    "icon": "PolarDBPg",
    "description": "PolarDB for PostgreSQL is Alibaba Cloud's cloud-native relational database, PostgreSQL-compatible with enhanced performance and scalability.",
    "descriptionI18nKey": "connector.datasource.polardbpg.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "PolarDb for PostgreSQL real-time data synchronization",
      "PolarDb for PostgreSQL migration with full and incremental data"
    ]
  },
  {
    "slug": "delta-lake",
    "name": "DeltaLake",
    "icon": "DeltaLake",
    "description": "Delta Lake is an open-source storage layer that brings ACID transactions to Apache Spark and big data workloads.",
    "descriptionI18nKey": "connector.datasource.deltalake.description",
    "category": "File and lake",
    "supportsSource": false,
    "supportsTarget": true,
    "useCases": [
      "Load data into DeltaLake",
      "DeltaLake as an analytics or serving destination"
    ]
  },
  {
    "slug": "tdsql-c",
    "name": "TDSQL-C",
    "icon": "TdsqlCMySQL",
    "description": "TDSQL-C is Tencent Cloud's enterprise-grade cloud-native database, MySQL-compatible with high availability and elasticity.",
    "descriptionI18nKey": "connector.datasource.tdsqlcmysql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "TDSQL-C real-time data synchronization",
      "TDSQL-C migration with full and incremental data"
    ]
  },
  {
    "slug": "tdsql",
    "name": "TDSQL",
    "icon": "TdsqlMySQL",
    "description": "TDSQL is Tencent's high-performance distributed database with strong consistency, high availability, SQL compatibility, and horizontal scaling.",
    "descriptionI18nKey": "connector.datasource.tdsqlmysql.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "TDSQL real-time data synchronization",
      "TDSQL migration with full and incremental data"
    ]
  },
  {
    "slug": "kingbase",
    "name": "KingBase",
    "icon": "KingbaseES",
    "description": "KingBase is a domestic relational database management system with high security, reliability, and support for mission-critical applications.",
    "descriptionI18nKey": "connector.datasource.kingbasees.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": false,
    "useCases": [
      "Ingest data from KingBase",
      "KingBase data extraction for downstream pipelines"
    ]
  },
  {
    "slug": "vastbase",
    "name": "VastBase",
    "icon": "Vastbase",
    "description": "Vastbase G100 is an independently developed enterprise-grade relational database by Vastdata. It features high performance, high concurrency, high availability, high security, and high compatibility.",
    "descriptionI18nKey": "connector.datasource.vastbase.description",
    "category": "Database",
    "supportsSource": true,
    "supportsTarget": true,
    "useCases": [
      "VastBase real-time data synchronization",
      "VastBase migration with full and incremental data"
    ]
  }
];

export function getConnectors(siteBrand: SiteBrand): Connector[] {
  return CONNECTORS.map((connector) => ({
    ...connector,
    isBusinessOnly: Boolean(connector.businessOnlyBrands?.includes(siteBrand)),
  }));
}

export function getConnectorBySlug(slug: string, siteBrand: SiteBrand): Connector | undefined {
  return getConnectors(siteBrand).find((connector) => connector.slug === slug);
}
