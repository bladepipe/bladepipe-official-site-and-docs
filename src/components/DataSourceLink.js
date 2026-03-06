import React from 'react';
import {Table, ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './datasourceLink.css';

/**
 *
 * @type {string[]}
 *
 * 需要增加对端的数据源，在DATA_SOURCE_COLUMN_LIST这个数组中添加
 * 需要增加源端的列，在DATA_SOURCE_LINK多增加一个key，并在key对应的value中添加该数据源支持的对端数据源
 */
const DATA_SOURCE_COLUMN_LIST = ["MySQL/MariaDB/AuroraMySQL", "Oracle", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "SQL Server", "Db2", "Kafka", "RocketMQ", "RabbitMQ", "AutoMQ", "PolarDB-MySQL", "PolarDB PostgreSQL", "Tunnel", "MongoDB", "DocumentDB", "MongoDB Atlas", "OceanBase", "OceanBase for Oracle", "TiDB", "PolarDB-X", "Redis", "ElastiCache", "Hana", "StarRocks", "ClickHouse", "Doris", "SelectDB", "Elasticsearch", "ADB for MySQL", "ADB for PostgreSQL", "Amazon MSK", "DynamoDB", "openGauss", "GaussDB", "Hive", "Kudu", "Iceberg", "Apache Paimon", "Delta Lake", "DLF", "达梦", "Redshift", "Pulsar", "GreptimeDB", "DuckDB", "RagApi"]
const DATA_SOURCE_LINK = {
  "MySQL/MariaDB/AuroraMySQL": [
    "MySQL/MariaDB/AuroraMySQL", "Oracle", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "SQL Server", "Db2", "Kafka", "RocketMQ", "RabbitMQ", "AutoMQ", "PolarDB-MySQL", "PolarDB PostgreSQL", "Tunnel", "MongoDB", "DocumentDB", "OceanBase", "OceanBase for Oracle", "TiDB", "PolarDB-X", "Redis", 
    "Hana", "StarRocks", "ClickHouse", "Doris", "SelectDB", "Elasticsearch", "ADB for MySQL", "ADB for PostgreSQL", "openGauss", "GaussDB", "Hive", "Kudu", "Iceberg", "达梦", "Redshift", "Pulsar", "GreptimeDB", "DuckDB", "Apache Paimon", "DLF", "Delta Lake", "Amazon MSK", "DynamoDB"
  ],
  "Oracle": [
    "MySQL/MariaDB/AuroraMySQL", "Oracle", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "SQL Server", "Kafka", "Tunnel", "Iceberg", 
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "OceanBase", "TiDB", "Kudu", "RocketMQ", "Elasticsearch", "GaussDB", "ADB for PostgreSQL",
  ],
  "PostgreSQL": [
    "MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "Kafka", "RocketMQ", "RabbitMQ", "Iceberg", 
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "OceanBase", "Elasticsearch", "Kudu", "RagApi", "DuckDB", "PolarDB PostgreSQL", "ADB for PostgreSQL"
  ],
  "AuroraPostgreSQL": [
    "MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "Kafka", "RocketMQ", "RabbitMQ", "Iceberg",
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "OceanBase", "Elasticsearch", "Kudu", "RagApi", "DuckDB", "PolarDB PostgreSQL", "ADB for PostgreSQL"
  ],
  "Greenplum": [
    "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "ADB for PostgreSQL",
    "StarRocks", "Doris", "OceanBase", "Kudu", "Hana"
  ],
  "SQL Server": [
    "MySQL/MariaDB/AuroraMySQL", "Oracle", "SQL Server", "Kafka", "Tunnel", "Iceberg", 
    "StarRocks", "Doris", "SelectDB", "PostgreSQL", "GaussDB",
  ],
  "Db2": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka",
    "StarRocks", "TiDB"
  ],
  "Hana": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "PostgreSQL",
    "StarRocks", "Doris", "TiDB", "SelectDB", "OceanBase", "Hana", "ADB for MySQL"
  ],
  "PolarDB-MySQL": [
    "MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "Kafka", "RocketMQ", "PolarDB-MySQL", "Tunnel",
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "TiDB", "ADB for MySQL", "ADB for PostgreSQL", "Elasticsearch"
  ],
  "PolarDB PostgreSQL": [
    "MySQL/MariaDB/AuroraMySQL","StarRocks", "Doris", "SelectDB", "PolarDB PostgreSQL"
  ],
  "MongoDB": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "PolarDB-MySQL", "MongoDB Atlas", 
    "MongoDB", "TiDB", "DocumentDB", "Oracle", "StarRocks", "ClickHouse", "RagApi"
  ],
  "DocumentDB": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "PolarDB-MySQL",
    "MongoDB", "TiDB", "DocumentDB", "Oracle", "StarRocks","ClickHouse", "RagApi"
  ],
  "MongoDB Atlas": [
    "RagApi"
  ],
  "DynamoDB": ["MySQL/MariaDB/AuroraMySQL","StarRocks"],
  "Kafka": [
    "MySQL/MariaDB/AuroraMySQL", "Oracle", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "SQL Server", "Kafka", "PolarDB-MySQL", "ADB for PostgreSQL", "DLF",
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "MongoDB", "DocumentDB", "OceanBase", "PolarDB-X", "Elasticsearch", "AutoMQ", "Iceberg", "Apache Paimon"
  ],
  "RocketMQ": ["MySQL/MariaDB/AuroraMySQL", "RocketMQ", "PolarDB-MySQL"],
  "RabbitMQ": ["MySQL/MariaDB/AuroraMySQL"],
  "AutoMQ": ["MySQL/MariaDB/AuroraMySQL", "Kafka", "AutoMQ"],
  "OceanBase": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "RocketMQ", "SQL Server", "MongoDB", "DocumentDB",
    "StarRocks", "Doris", "SelectDB", "ADB for MySQL", "Elasticsearch", "ClickHouse", "OceanBase", "OceanBase for Oracle"
  ],
  "OceanBase for Oracle": [
    "OceanBase", "Kafka"
  ],
  "StarRocks": [
    "MySQL/MariaDB/AuroraMySQL", "StarRocks", "RagApi"
  ],
  "Doris": [
    "MySQL/MariaDB/AuroraMySQL"
  ],
  "SelectDB": [
    "MySQL/MariaDB/AuroraMySQL"
  ],
  "ClickHouse": [
    "Doris", "SelectDB", "StarRocks", "ClickHouse"
  ],
  "TiDB": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "OceanBase", "PostgreSQL", "Greenplum",
    "StarRocks", "TiDB", "Elasticsearch", "ClickHouse", "Doris", "SelectDB", "ADB for PostgreSQL"
  ],
  "Elasticsearch": [
    "Elasticsearch", "RagApi"
  ],
  "PolarDB-X": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka",
    "StarRocks", "Doris", "PostgreSQL"
  ],
  "ADB for PostgreSQL": [
    "StarRocks", "Doris", "PostgreSQL", "Greenplum", "Kudu", "OceanBase", "Hana", "ADB for PostgreSQL", "AuroraPostgreSQL"
  ],
  "openGauss": [
    "openGauss", "Kafka"
  ],
  "GaussDB": ["MySQL/MariaDB/AuroraMySQL", "Oracle", "Doris", "SelectDB", "ClickHouse"],
  "Redis": ["Redis", "ElastiCache"],
  "ElastiCache": ["Redis", "ElastiCache"],
  "Amazon MSK": ["Kafka", "Amazon MSK"],
  "Hana": ["MySQL/MariaDB/AuroraMySQL", "StarRocks", "Doris", "SelectDB", "TiDB", "OceanBase", "Hana", "Kafka", "PostgreSQL", "ADB for MySQL"],
  "Pulsar": ["MySQL/MariaDB/AuroraMySQL", "Pulsar"],
  "TDengine": ["MySQL/MariaDB/AuroraMySQL"],
  "达梦": ["MySQL/MariaDB/AuroraMySQL", "达梦", "Kafka", "ClickHouse", "StarRocks", "Doris", "OceanBase"],
  "SshFile": ["MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "StarRocks", "Elasticsearch", "MongoDB Atlas"],
  "S3File": ["MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "StarRocks", "Elasticsearch", "MongoDB Atlas"],
  "OssFile": ["MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "StarRocks", "Elasticsearch", "MongoDB Atlas"],
  "Google Drive": ["PostgreSQL"],
  "语雀": ["PostgreSQL"],
  "Tunnel": ["MySQL/MariaDB/AuroraMySQL"],
  "Spanner": ["StarRocks", "Doris"],
}

const DataSourceLink = ({ locale }) => {
  const columns = [{
    title: 'SOURCE/TARGET',
    dataIndex: 'source',
    key: 'source',
    filters: Object.keys(DATA_SOURCE_LINK).map((source) => ({text: source, value: source})),
    onFilter: (value, record) => record.source.includes(value),
    fixed: 'left'
  }];
  DATA_SOURCE_COLUMN_LIST.forEach((column) => {
    columns.push({
      align: 'center',
      title: column,
      dataIndex: column,
      key: column,
      render: (_, record) => DATA_SOURCE_LINK[record.source].includes(column) ? '✔️' : ''
    })
  })

  const dataSource = [];
  Object.keys(DATA_SOURCE_LINK).forEach((source) => {
    dataSource.push({
      source
    })
  })

  return <div style={{width: '100%', padding: '5px'}} className="datasource-link">
    <ConfigProvider locale={zhCN}>
      <Table
        columns={columns.map(item => {
          const fun = () => ({style: {whiteSpace: 'nowrap'}});
          item.onHeaderCell = fun;
          item.onCell = fun;
          return item;
        })}
        dataSource={dataSource}
        pagination={false}
        style={{overflow: 'auto'}}
        bordered
      />
    </ConfigProvider>
  </div>
}

export default DataSourceLink;
