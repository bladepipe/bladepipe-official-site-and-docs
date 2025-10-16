import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {TiDB} from "./tidb";
import {OceanBase} from "./oceanbase";
import {Kafka} from "./kafka";
import {StarRocks} from "./starrocks";
import {Elasticsearch} from "./elasticsearch";
import {ClickHouse} from "./clickhouse";
import {Doris, SelectDB} from "./doris";

export default {
    MySQL,
    'Aurora for MySQL': AuroraForMySQL,
    OceanBase,
    MariaDB,
    TiDB,
    Elasticsearch,
    ClickHouse,
    StarRocks,
    SelectDB,
    Doris,
    Kafka,
}
