import { MongoDB, DocumentDB, MongoDBAtlas } from "./mongodb";
import { Kafka } from "./kafka";
import { MySQL, MariaDB, AuroraForMySQL, PolarDbForMySQL, GaussDB } from "./mysql";
import { TiDB } from "./tidb";
import { Oracle } from "./oracle";
import { StarRocks } from "./starrocks";
import { ClickHouse } from "./clickhouse";
import { RagApi } from "./ragapi";

export default {
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    'PolarDb for MySQL': PolarDbForMySQL,
    'GaussDB': GaussDB,
    Oracle,
    TiDB,
    MongoDB,
    'MongoDB Atlas': MongoDBAtlas,
    'DocumentDB': DocumentDB,
    Kafka,
    StarRocks,
    ClickHouse,
    RagApi,
}
