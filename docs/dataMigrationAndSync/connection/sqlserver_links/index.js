import { MySQL, MariaDB, AuroraForMySQL, GaussDbForMySQL, GaussDB } from "./mysql";
import { PostgreSQL, Greenplum, AnalyticDbForPg, AuroraForPg, OpenGauss, PolarDbForPg } from "./postgresql";
import { SQLServer } from "./sqlserver";
import { Oracle } from "./oracle";
import { StarRocks } from "./starrocks";
import { Doris, SelectDB } from "./doris";
import { Kafka } from "./kafka";
import { Tunnel } from "./tunnul";
import { Iceberg } from "./iceberg";

export default {
    'SQL Server': SQLServer,
    MySQL,
    MariaDB,
    'Aurora for MySQL': AuroraForMySQL,
    'GaussDB for MySQL': GaussDbForMySQL,
    GaussDB,
    Oracle,
    PostgreSQL,
    'AnalyticDb for Pg': AnalyticDbForPg,
    'Aurora for Pg': AuroraForPg,
    Greenplum,
    OpenGauss,
    'PolarDB for PostgreSQL': PolarDbForPg,
    StarRocks,
    Doris,
    SelectDB,
    Kafka,
    Tunnel,
    Iceberg,
}
