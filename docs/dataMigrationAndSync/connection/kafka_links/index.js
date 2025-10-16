import {AutoMQ, Kafka} from "./kafka";
import {MariaDB, MySQL, AuroraForMySQL} from "./mysql";
import {Oracle} from "./oracle"
import {PostgreSQL} from "./postgresql"
import {ClickHouse} from "./clickhouse"
import {Elasticsearch} from "./elasticsearch"
import {StarRocks} from "./starrocks";
import {Doris} from "./doris"
import {MongoDB} from "./mongo"
import {OceanBase} from "./oceanbase"
import {SQLServer} from "./sqlserver";

export default {
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    Oracle,
    PostgreSQL,
    'SQL Server': SQLServer,
    OceanBase,
    StarRocks,
    Doris,
    ClickHouse,
    Elasticsearch,
    MongoDB,
    Kafka,
    AutoMQ,
}
