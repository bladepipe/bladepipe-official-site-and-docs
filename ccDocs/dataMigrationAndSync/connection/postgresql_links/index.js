import { AnalyticDbForPg, AuroraForPg, Greenplum, PostgreSQL, OpenGauss, PolarDbForPg } from "./postgresql";
import { MySQL, MariaDB, AuroraForMySQL } from "./mysql";
import { StarRocks } from "./starrocks";
import { Kafka } from "./kafka";
import { Elasticsearch } from "./elasticsearch";
import { OceanBase } from "./oceanbase";
import { Doris, SelectDB } from "./doris";
import { RAG_API, RagApi } from "./ragapi";
import { ClickHouse } from "./clickhouse";
import { RocketMQ } from "./rocketmq";
import { RabbitMQ } from "./rabbitmq";
import { Iceberg } from "./iceberg";
import { Kudu } from "./kudu";

export default {
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    PostgreSQL,
    'AnalyticDb for Pg': AnalyticDbForPg,
    'Aurora for Pg': AuroraForPg,
    Greenplum,
    OpenGauss,
    'PolarDB for PostgreSQL': PolarDbForPg,
    OceanBase,
    StarRocks,
    ClickHouse,
    Doris,
    SelectDB,
    Kafka,
    Elasticsearch,
    RocketMQ,
    RabbitMQ,
    Iceberg,
    Kudu,
    RagApi,
}
