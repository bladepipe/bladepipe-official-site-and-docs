import { AuroraForMySQL, MariaDB, MySQL } from "./mysql";
import { PolarDbForMySQL } from "./polardbmysql";
import { AnalyticDbForPg, AuroraForPg, Greenplum, PostgreSQL } from "./postgresql";
import { OpenGauss } from "./opengauss";
import { Oracle } from "./oracle";
import { StarRocks } from "./starrocks";
import { Doris, SelectDB } from "./doris";
import { AnalyticDbForMySQL } from "./adbmysql";
import { ClickHouse } from "./clickhouse";
import { Elasticsearch } from "./elasticsearch";
import { Redis } from "./redis";
import { Kafka } from "./kafka";
import { PolarDbX } from "./polardbx"
import { OceanBase } from "./oceanbase";
import { MongoDB } from "./mongodb";
import { TiDB } from "./tidb";
import { SQLServer } from "./sqlserver";
import { Hive } from "./hive";
import { Tunnel } from './tunnel'
import { AutoMQ } from "./automq";
import { Db2 } from "./db2";
import { ObForOracle } from "./obfororacle";
import { Iceberg } from "./iceberg";
import { Pulsar } from "./pulsar";
import { GreptimeDB } from "./greptimedb";
import { RagApi } from "./ragapi";
import { Dameng } from "./dameng";
import { DynamoDB } from "./dynamodb";
import { Kudu } from "./kudu";
import { Lindorm } from "./lindorm";
import { Redshift } from "./redshift";
import { Lake } from "./lake";
import { Paimon } from "./paimon";
import { RocketMQ } from "./rocketmq";
import { RabbitMQ } from "./rabbitmq";

export const TargetInfo = {
    MySQL,
    MariaDB,
    'AnalyticDb for MySQL': AnalyticDbForMySQL,
    'PolarDb for MySQL': PolarDbForMySQL,
    'Aurora for MySQL': AuroraForMySQL,
    'PolarDB-X': PolarDbX,
    PostgreSQL,
    Greenplum,
    'AnalyticDb for Pg': AnalyticDbForPg,
    'Aurora for Pg': AuroraForPg,
    OpenGauss,
    Oracle,
    StarRocks,
    Doris,
    SelectDB,
    ClickHouse,
    Elasticsearch,
    Redis,
    Kafka,
    'RocketMQ': RocketMQ,
    'RabbitMQ': RabbitMQ,
    AutoMQ,
    OceanBase,
    MongoDB,
    TiDB,
    Db2,
    'SQL Server': SQLServer,
    Hive,
    Tunnel,
    'OceanBase for Oracle': ObForOracle,
    Iceberg,
    Pulsar,
    GreptimeDB,
    RagApi,
    Dameng,
    DynamoDB,
    Kudu,
    Lindorm,
    Redshift,
    Paimon,
    'PolarDB for PostgreSQL': PostgreSQL,
    'DocumentDB': MongoDB,
    'MongoDB Atlas': MongoDB,
    'GaussDB for MySQL': MySQL,
    'GaussDB': MySQL,
    'AWS ElastiCache': Redis,
    'DataLakeFormation': Lake,
    'DeltaLake': Lake,
    'Hudi': Lake,
    'Amazon MSK': Kafka
}
