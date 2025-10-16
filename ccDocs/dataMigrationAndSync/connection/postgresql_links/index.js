import {AnalyticDbForPg, AuroraForPg, Greenplum, PostgreSQL} from "./postgresql";
import {MySQL, MariaDB, AuroraForMySQL} from "./mysql";
import {StarRocks} from "./starrocks";
import {Kafka} from "./kafka";
import {Elasticsearch} from "./elasticsearch";
import {OceanBase} from "./oceanbase";
import {Doris, SelectDB} from "./doris";
import {RAG_API, RagApi} from "./ragapi";

export default {
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    PostgreSQL,
    'AnalyticDb for Pg': AnalyticDbForPg,
    'Aurora for Pg': AuroraForPg,
    Greenplum,
    OceanBase,
    StarRocks,
    Kafka,
    Doris,
    SelectDB,
    Elasticsearch,
    RagApi,
}
