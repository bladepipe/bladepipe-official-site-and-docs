import {MariaDB, MySQL, AuroraForMySQL, AnalyticDbForMySQL} from "./mysql";
import {Oracle} from "./oracle";
import {AuroraForPg, Greenplum, PostgreSQL} from "./postgresql";
import {OpenGauss} from "./openguass";
import {OceanBase} from "./oceanbase";
import {PolarDbMySQL} from "./polardbmysql";
import {PolarDbX} from "./polardbx";
import {Redis} from "./redis"
import {MongoDB} from "./mongodb";
import {Kafka} from "./kafka";
import {AutoMQ} from "./automq";
import {Hana} from "./hana";
import {SQLServer} from "./sqlserver";
import {TiDB} from "./tidb";
import {RocketMQ} from "./rocketmq";
import {RabbitMQ} from "./rabbitmq";
import {StarRocks} from "./starrocks";
import {Tunnel} from './tunnel';
import {Db2} from './db2';
import {ObForOracle} from './obfororacle';
import {Pulsar} from "./pulsar";
import {TDengine} from "./tdengine";

export const SourceInfo = {
    MySQL,
    MariaDB,
    AnalyticDbForMySQL,
    PolarDbMySQL,
    AuroraForMySQL,
    PolarDbX,
    PostgreSQL,
    AuroraForPg,
    Greenplum,
    OpenGauss,
    OceanBase,
    TiDB,
    Oracle,
    Hana,
    StarRocks,
    SQLServer,
    Db2,
    Redis,
    MongoDB,
    Kafka,
    AutoMQ,
    RocketMQ,
    RabbitMQ,
    Tunnel,
    ObForOracle,
    Pulsar,
    TDengine
}

