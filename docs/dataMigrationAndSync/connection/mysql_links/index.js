import { MySQL, MariaDB, AuroraForMySQL, GaussDbForMySQL, GaussDB } from "./mysql";
import { PolarDbForMySQL } from "./polardbmysql";
import { AnalyticDbForPg, Greenplum, PostgreSQL, AuroraForPg, OpenGauss, PolarDbForPg } from "./postgresql";
import { StarRocks } from "./starrocks";
import { Oracle } from "./oracle";
import { Doris, SelectDB } from "./doris";
import { AnalyticDbForMySQL } from "./adbmysql";
import { ClickHouse } from "./clickhouse";
import { Kafka, AutoMQ } from "./kafka";
import { Elasticsearch } from "./elasticsearch";
import { Redis } from "./redis";
import { OceanBase } from "./oceanbase";
import { MongoDB, DocumentDB } from "./mongodb";
import { PolarDbX } from "./polardbx";
import { TiDB } from "./tidb";
import { Hive } from "./hive";
import { Hana } from "./Hana";
import { Db2 } from "./db2";
import { Tunnel } from "./tunnul";
import { SQLServer } from "./sqlserver";
import { RocketMQ } from "./rocketmq";
import { RabbitMQ } from "./rabbitmq";
import { ObForOracle } from "./obfororacle";
import { Iceberg } from "./iceberg";
import { Pulsar } from "./pulsar";
import { GreptimeDB } from "./greptimedb";
import { Paimon } from "./paimon";
import { Dameng } from "./dameng";
import { DynamoDB } from "./dynamodb";
import { Kudu } from "./kudu.js";
import { DataLakeFormation, DeltaLake, Hudi } from "./lake";
import { Redshift } from "./redshift";
import { Lindorm } from "./lindorm";
import { AmazonMSK } from "./amazonmsk";

export default {
    MySQL,
    MariaDB,
    'AnalyticDb for MySQL': AnalyticDbForMySQL,
    'PolarDb for MySQL': PolarDbForMySQL,
    'Aurora for MySQL': AuroraForMySQL,
    'PolarDB-X': PolarDbX,
    Oracle,
    'SQL Server': SQLServer,
    PostgreSQL,
    'AnalyticDb for Pg': AnalyticDbForPg,
    'Aurora for Pg': AuroraForPg,
    ClickHouse,
    Db2,
    Greenplum,
    OpenGauss,
    Hana,
    OceanBase,
    StarRocks,
    TiDB,
    Kafka,
    AutoMQ,
    RocketMQ,
    RabbitMQ,
    Redis,
    MongoDB,
    Doris,
    SelectDB,
    Elasticsearch,
    Hive,
    Tunnel,
    'OceanBase for Oracle': ObForOracle,
    Iceberg,
    Pulsar,
    GreptimeDB,
    Paimon,
    'GaussDB for MySQL': GaussDbForMySQL,
    GaussDB,
    'PolarDB for PostgreSQL': PolarDbForPg,
    DocumentDB,
    Dameng,
    DynamoDB,
    Kudu,
    DataLakeFormation,
    DeltaLake,
    Hudi,
    Redshift,
    Lindorm,
    'Amazon MSK': AmazonMSK
}
