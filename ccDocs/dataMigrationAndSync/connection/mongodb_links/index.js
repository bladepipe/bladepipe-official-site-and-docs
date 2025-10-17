import {MongoDB} from "./mongodb";
import {Kafka} from "./kafka";
import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {TiDB} from "./tidb";
import {Oracle} from "./oracle";

export default {
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    Oracle,
    TiDB,
    MongoDB,
    Kafka,
}
