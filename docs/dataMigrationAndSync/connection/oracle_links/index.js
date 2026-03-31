import { Oracle } from "./oracle"
import { MariaDB, MySQL, AuroraForMySQL, GaussDB } from "./mysql";
import { AnalyticDbForPg, AuroraForPg, Greenplum, PostgreSQL } from "./postgresql";
import { StarRocks } from "./starrocks";
import { Doris, SelectDB } from "./doris";
import { ClickHouse } from "./clickhouse";
import { Kafka } from "./kafka";
import { TiDB } from "./tidb";
import { RocketMQ } from "./rocketmq";
import { Elasticsearch } from "./elasticsearch";
import { OceanBase } from "./oceanbase";
import { SQLServer } from "./sqlserver";
import { Tunnel } from "./tunnul";
import { Iceberg } from "./iceberg";
import { Kudu } from "./kudu";

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
    OceanBase,
    'SQL Server': SQLServer,
    Tunnel,
    Iceberg,
    Kudu,
    GaussDB,
    'Aurora for MySQL': AuroraForMySQL,
    'AnalyticDb for Pg': AnalyticDbForPg,
    'Aurora for Pg': AuroraForPg,
}