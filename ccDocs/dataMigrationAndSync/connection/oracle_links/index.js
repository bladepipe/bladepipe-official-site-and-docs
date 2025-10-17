import {Oracle} from "./oracle"
import {MariaDB, MySQL, AuroraForMySQL} from "./mysql";
import {AnalyticDbForPg, AuroraForPg, Greenplum, PostgreSQL} from "./postgresql";
import {StarRocks} from "./starrocks";
import {Doris, SelectDB} from "./doris";
import {ClickHouse} from "./clickhouse";
import {Kafka} from "./kafka";
import {TiDB} from "./tidb";
import {RocketMQ} from "./rocketmq";
import {Elasticsearch} from "./elasticsearch";

export default {
    Oracle,
    MySQL,
    MariaDB,
    PostgreSQL,
    Greenplum,
    StarRocks,
    Doris,
    SelectDB,
    ClickHouse,
    Elasticsearch,
    TiDB,
    Kafka,
    RocketMQ,
    'Aurora for MySQL': AuroraForMySQL,
    'AnalyticDb for Pg': AnalyticDbForPg,
    'Aurora for Pg': AuroraForPg,
}