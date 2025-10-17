import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {SQLServer} from "./sqlserver";
import {Oracle} from "./oracle";
import {StarRocks} from "./starrocks";
import {Doris, SelectDB} from "./doris";
import {Kafka} from "./kafka";

export default {
    'SQL Server': SQLServer,
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    Oracle,
    StarRocks,
    Doris,
    SelectDB,
    Kafka,
}
