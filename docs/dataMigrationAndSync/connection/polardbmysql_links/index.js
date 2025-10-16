import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {AnalyticDbForMySQL} from "./adbmysql";
import {AnalyticDbForPg, Greenplum, PostgreSQL} from "./postgresql";
import {StarRocks} from "./starrocks";
import {Kafka} from "./kafka";
import {TiDB} from "./tidb";

export default {
    'PolarDb for MySQL': MySQL,
    MySQL,
    MariaDB,
    PostgreSQL,
    Greenplum,
    StarRocks,
    TiDB,
    Kafka,
    'AnalyticDb for MySQL': AnalyticDbForMySQL,
    'AnalyticDb for Pg': AnalyticDbForPg,
    'Aurora for MySQL': AuroraForMySQL,
}