import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {PolarDbForMySQL} from "./polardbmysql";
import {AnalyticDbForPg, Greenplum, PostgreSQL, AuroraForPg, OpenGauss} from "./postgresql";
import {StarRocks} from "./starrocks";
import {Oracle} from "./oracle";
import {Doris, SelectDB} from "./doris";
import {AnalyticDbForMySQL} from "./adbmysql";
import {ClickHouse} from "./clickhouse";
import {Kafka, AutoMQ} from "./kafka";
import {Elasticsearch} from "./elasticsearch";
import {Redis} from "./redis";
import {OceanBase} from "./oceanbase";
import {MongoDB} from "./mongodb";
import {PolarDbX} from "./polardbx";
import {TiDB} from "./tidb";
import {Hive} from "./hive";
import {Hana} from "./Hana";
import {Db2} from "./db2";
import {Tunnel} from "./tunnul";
import {SQLServer} from "./sqlserver";
import {RocketMQ} from "./rocketmq";
import {RabbitMQ} from "./rabbitmq";
import {ObForOracle} from "./obfororacle";
import {Iceberg} from "./iceberg";
import {Pulsar} from "./pulsar";
import {GreptimeDB} from "./greptimedb";

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
    GreptimeDB
}
