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
const DATA_SOURCE_COLUMN_LIST = ["MySQL/MariaDB/AuroraMySQL", "Oracle", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "SQL Server", "Db2", "Kafka", "RocketMQ", "RabbitMQ", "AutoMQ", "PolarDB-MySQL", "Tunnel", "MongoDB", "DocumentDB", "MongoDB Atlas", "OceanBase", "TiDB", "PolarDB-X", "Redis", "Hana", "StarRocks", "ClickHouse", "Doris", "SelectDB", "Elasticsearch", "ADB for MySQL", "openGauss", "GaussDB for MySQL", "Hive", "Kudu", "Iceberg", "Apache Paimon", "达梦", "Redshift", "Pulsar", "GreptimeDB", "DuckDB", "RagApi"]
const DATA_SOURCE_LINK = {
  "MySQL/MariaDB/AuroraMySQL": [
    "MySQL/MariaDB/AuroraMySQL", "Oracle", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "SQL Server", "Db2", "Kafka", "RocketMQ", "RabbitMQ", "AutoMQ", "PolarDB-MySQL", "Tunnel", "MongoDB", "DocumentDB", "OceanBase", "TiDB", "PolarDB-X", "Redis", 
    "Hana", "StarRocks", "ClickHouse", "Doris", "SelectDB", "ElasticSearch", "ADB for MySQL", "openGauss", "GaussDB for MySQL", "Hive", "Kudu", "Iceberg", "达梦", "Redshift", "Pulsar", "GreptimeDB", "DuckDB", "Apache Paimon"
  ],
  "Oracle": [
    "MySQL/MariaDB/AuroraMySQL", "Oracle", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "SQL Server", "Kafka", "Tunnel", "Iceberg", 
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "OceanBase", "TiDB", "Kudu", "RocketMQ", "Elasticsearch", "达梦"
  ],
  "PostgreSQL": [
    "MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "Kafka", "Iceberg", 
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "OceanBase", "ElasticSearch", "Kudu", "Elasticsearch", "达梦", "RagApi", "DuckDB"
  ],
  "AuroraPostgreSQL": [
    "MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "Kafka",
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "OceanBase", "ElasticSearch", "Kudu", "达梦"
  ],
  "Greenplum": [
    "PostgreSQL", "AuroraPostgreSQL", "Greenplum", 
    "StarRocks", "Doris", "OceanBase", "Kudu", "Hana"
  ],
  "SQL Server": [
    "MySQL/MariaDB/AuroraMySQL", "Oracle", "SQL Server", "Kafka", "Tunnel", "Iceberg", 
    "StarRocks", "Doris", "SelectDB", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "达梦"
  ],
  "Db2": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka",
    "StarRocks", "TiDB", "达梦", "Redis"
  ],
  "Hana": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "PostgreSQL",
    "StarRocks", "Doris", "TiDB", "SelectDB", "OceanBase", "Hana", "ADB for MySQL"
  ],
  "PolarDB-MySQL": [
    "MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "Kafka", "RocketMQ", "PolarDB-MySQL", "Tunnel",
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "TiDB", "Redis", "ADB for MySQL", "OceanBase", "Tunnel", "达梦", "Elasticsearch"
  ],
  "MongoDB": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "PolarDB-MySQL", "MongoDB Atlas", 
    "MongoDB", "TiDB", "RocketMQ", "DocumentDB", "Oracle", "StarRocks", "ClickHouse"
  ],
  "DocumentDB": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "PolarDB-MySQL",
    "MongoDB", "TiDB", "RocketMQ", "DocumentDB", "Oracle", "StarRocks"
  ],
  "MongoDB Atlas": [
    "RagApi"
  ],
  "Kafka": [
    "MySQL/MariaDB/AuroraMySQL", "Oracle", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "SQL Server", "Kafka", "PolarDB-MySQL", "Tunnel",
    "ClickHouse", "StarRocks", "Doris", "SelectDB", "MongoDB", "DocumentDB", "OceanBase", "PolarDB-X", "ElasticSearch", "AutoMQ", "Iceberg", "Apache Paimon"
  ],
  "RocketMQ": ["MySQL/MariaDB/AuroraMySQL", "RocketMQ", "PolarDB-MySQL", "MongoDB", "DocumentDB"],
  "RabbitMQ": ["MySQL/MariaDB/AuroraMySQL"],
  "AutoMQ": ["MySQL/MariaDB/AuroraMySQL", "Kafka", "AutoMQ"],
  "OceanBase": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "PostgreSQL", "AuroraPostgreSQL", "Greenplum", "RocketMQ", "SQL Server", "MongoDB", "DocumentDB",
    "StarRocks", "Doris", "SelectDB", "MongoDB", "ADB for MySQL", "TiDB", "ElasticSearch", "Oracle", "ClickHouse", "OceanBase", "达梦"
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
  "TiDB": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka", "OceanBase", "PostgreSQL", "Greenplum",
    "StarRocks", "MongoDB", "TiDB", "Redis", "达梦", "ElasticSearch", "ClickHouse", "Doris", "SelectDB"
  ],
  "Elasticsearch": [
    "MySQL/MariaDB/AuroraMySQL", "Elasticsearch",
    "Kafka", "RagApi"
  ],
  "PolarDB-X": [
    "MySQL/MariaDB/AuroraMySQL", "Kafka",
    "StarRocks", "Doris", "PolarDB-X", "达梦", "PostgreSQL"
  ],
  "openGauss": [
    "openGauss", "Kafka"
  ],
  "Redis": ["Redis"],
  "Hana": ["MySQL/MariaDB/AuroraMySQL", "StarRocks", "Doris", "SelectDB"],
  "Pulsar": ["MySQL/MariaDB/AuroraMySQL", "Pulsar"],
  "TDengine": ["MySQL/MariaDB/AuroraMySQL"],
  "达梦": ["MySQL/MariaDB/AuroraMySQL", "达梦", "Kafka", "ClickHouse", "StarRocks", "Doris", "OceanBase"],
  "SshFile": ["MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "StarRocks", "Elasticsearch", "MongoDB Atlas"],
  "S3File": ["MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "StarRocks", "Elasticsearch", "MongoDB Atlas"],
  "OssFile": ["MySQL/MariaDB/AuroraMySQL", "PostgreSQL", "StarRocks", "Elasticsearch", "MongoDB Atlas"],
  "Google Drive": ["PostgreSQL"],
  "Tunnel": ["MySQL/MariaDB/AuroraMySQL"],
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
