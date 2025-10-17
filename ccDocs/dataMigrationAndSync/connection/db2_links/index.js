import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {StarRocks} from "./starrocks";
import {Kafka} from "./kafka";
import {TiDB} from "./tidb";

export default {
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    StarRocks,
    Kafka,
    TiDB
}
