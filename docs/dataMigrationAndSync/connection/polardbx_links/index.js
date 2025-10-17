import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {StarRocks} from "./starrocks";
import {Kafka} from "./kafka";
import {PostgreSQL} from "./postgresql";
import {Doris} from "./doris";


export default {
    MySQL,
    MariaDB,
    Doris,
    Kafka,
    StarRocks,
    PostgreSQL,
    'Aurora for MySQL': AuroraForMySQL,
}
