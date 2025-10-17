export const OpenGauss = {
    notice: [
        {
            key: "No Support for DDL Sync",
            desc: "DDL synchronization is not supported because OpenGauss WAL logs do not provide any DDL-related information."
        }
    ],
    prepare: [
        {
            key: "Permissions for Account",
            desc: "Required permissions (taking a self-managed database as an example): \n- <b>GRANT ALL PRIVILEGES ON DATABASE sync_db TO sync_user</b> (or SELECT permissions on all views in the sync_db information_schema, and SELECT permissions on tables, indexes, and constraints that need synchronization) \n- <b>ALTER USER sync_user REPLICATION</b>"
        },
        {
            key: "Incremental Data Sync Preparation",
            desc: "Prepare as follows: \n- Modify postgresql.conf to set <b>wal_level=logical and wal_log_hints = on</b> \n- Modify pg_hba.conf to set <b>host replication sync_user CIDR_net md5</b>, <b>host sync_db sync_user CIDR_net md5</b>, <b>host postgres sync_user CIDR_net md5</b> \n- Restart PostgreSQL"
        },
        {
            key: "Port Preparation",
            desc: "Allow the migration and sync node (Worker) to connect to the OpenGauss port (e.g., 5432)."
        }
    ],
    params: [
        {
            key: 'fullFetchSize',
            desc: 'Fetch size for scaning full data.'
        },
        {
            key: 'eventStoreSize',
            desc: 'Cache size for parsed incremental events.'
        },
        {
            key: 'ignoreGisSRID',
            desc: 'Whether to ignore SRID when parsing GIS data types.'
        },
        {
            key: 'defaultGisSRID',
            desc: 'Set the SRID for GIS data types.'
        }
    ]
}
