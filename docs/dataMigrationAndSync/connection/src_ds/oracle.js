export const Oracle = {
    prepare: [
        {
            key: "Permissions for Account",
            desc: "See [Permissions Required for Oracle](../datasource_func/Oracle/privs_for_oracle)."
        },
        {
            key: "Incremental Data Sync Preparation",
            desc: "See [Preparation for Oracle LogMiner](../datasource_func/Oracle/prepare_for_oracle_logminer)."
        },
        {
            key: "Port Preparation",
            desc: "Allow the migration and sync node (Worker) to connect to the Oracle port (e.g., 1521)."
        }
    ],
    params: [
        {
            key: "fullFetchSize",
            desc: "Fetch size for scaning full data."
        },
        {
            key: "eventStoreSize",
            desc: "Cache size for parsed incremental events."
        },
        {
            key: "logminerUser",
            desc: "User name for connection to Oracle to execute LogMiner SQL."
        },
        {
            key: "logminerPasswd",
            desc: "Password for connection to Oracle to execute LogMiner SQL."
        },
        {
            key: "logminerConnectType",
            desc: "Way to connect to Oracle (PDB) to execute LogMiner SQL, including <b>ORACLE_SID</b> and <b>ORACLE_SERVICE</b> options."
        },
        {
            key: "logminerSidOrService",
            desc: "SID or service name for connection to Oracle (PDB) to execute LogMiner SQL."
        },
        {
            key: "parseRedoSqlParallel",
            desc: "Number of threads for parallel parsing of LogMiner data."
        },
        {
            key: "parseRedoSqlBufferSize",
            desc: "Size of the circular buffer for parsing LogMiner data."
        },
        {
            key: "redoFetchSize",
            desc: "Number of rows of LogMiner analyzed data to fetch each time."
        },
        {
            key: "redoOfferTransMaxSize",
            desc: "Maximum number of unconsumed but committed transactions in cache."
        },
        {
            key: "oraMiningSessionPauseSec",
            desc: "Interval between LogMiner sessions, in seconds."
        },
        {
            key: "maxEventCountPerTxInMem",
            desc: "Maximum number of events per transaction in memory."
        },
        {
            key: "logMiningScnStep",
            desc: "Analysis range specified when Oracle LogMiner analyzes redo logs."
        },
        {
            key: "abandonUnCommitTxTimeoutSec",
            desc: "Automatically abandon transactions that have not been committed for longer than the specified timeout."
        },
        {
            key: "restartTxWithDataTimeoutSec",
            desc: "Automatically restart DataJobs for transactions with data changes that have not been committed for longer than the specified timeout."
        },
        {
            key: "oraUseOnlineDic",
            desc: "Whether to use online logs; false means using offline logs, which may put more stress on Oracle."
        },
        {
            key: "oraReleaseIntervalSec",
            desc: "Interval for recreating connection for analysis to release Oracle server resources."
        },
        {
            key: "oraMiningSessionPauseSec",
            desc: "Interval between execution of LogMiner commands for analysis."
        },
        {
            key: "fallBackScnStep",
            desc: "Distance to keep from the latest Redo log data; 0 means to keep right behind the latest Redo log data."
        },
        {
            key: "sqlCaseConversionEnabled",
            desc: "Whether to enable DDL case conversion (according to the default case rules of the current database)."
        }
    ],
    notice: [
        {
            key: "Incremental Data Sync Performance",
            desc: "Due to LogMiner performance limits and BladePipe's lack of parallel analysis, the performance benchmark is set at 3000 records per second."
        },
        {
            key: "Data Types",
            desc: "Do not support <b>BLOB</b> and derived types."
        }
    ],
    examples: [
    ],
    master_function: [
        {
            key: "Automatic Dictionary Creation",
            desc: "When using offline dictionaries to parse Oracle Redo files, the dictionary is automatically created during DataJob creation."
        }
    ]
}
