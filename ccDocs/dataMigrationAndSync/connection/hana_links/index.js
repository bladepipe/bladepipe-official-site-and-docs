import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {StarRocks} from "./starrocks"
import {Doris, SelectDB} from "./doris"
import {OceanBase} from "./oceanbase";
import {TiDB} from "./tidb";
import {Kafka} from "./kafka";
import {PostgreSQL} from "./postgresql";

export default {
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    PostgreSQL,
    StarRocks,
    Doris,
    SelectDB,
    OceanBase,
    TiDB,
    Kafka,
}
