export const Hana = {
    notice: [
        {
            key: "DDL Change Handling",
            desc: "BladePipe captures data changes in a source SAP HANA instance through triggers. DDL synchronization is not supported. If there are DDL changes, follow the steps in [Change Schema in a Source SAP HANA Instance](../../datasource_func/Hana/sap_hana_ddl)."
        },
        {
            key: "Hana Data Types in Incremental Sync",
            desc: "In the incremental data sync phase with a source Hana instance, it does not allow capturing changes for **TEXT**, **BIN_TEXT**, **ST_POINT**, and **ST_GEOMETRY** data types by triggers."
        }
    ],
    faq: [
        '[What should I do if an error occurs when connecting to a Sap Hana instance?](../../../faq/solve_hana_test_connection_fail)'
    ],
    prepare: [
        {
            key: "Permissions for Account",
            desc: "See [Permissions Required for Hana](../../datasource_func/Hana/privs_for_hana)"
        }
    ],
    params: [
        {
            key: "sysTriggerDataSchema",
            desc: "The schema name where the trigger writes incremental data."
        },
        {
            key: "sysTriggerDataTable",
            desc: "The table name where the trigger writes incremental data."
        },
        {
            key: "incrPagingCount",
            desc: "The total amount of data queried each time by the trigger during incremental data synchronization."
        },
        {
            key: "incrIdleSleepSecond",
            desc: "The interval between queries for the trigger during idle period of incremental data synchronization (in seconds)."
        },
        {
            key: "incrScanIntervalMs",
            desc: "The interval between data queries for the trigger during incremental data synchronization (in milliseconds)."
        },
        {
            key: "autoCheckTriggerAndReInstall",
            desc: "Check the trigger status and reinstall it when the DataJob starts."
        },
        {
            key: "triggerDataCleanEnabled",
            desc: "Enable scheduled cleanup of trigger incremental data."
        },
        {
            key: "triggerDataCleanIntervalMin",
            desc: "The cleanup interval for trigger incremental data (in minutes)."
        },
        {
            key: "triggerDataRetentionMin",
            desc: "The retention time for trigger incremental data (in minutes)."
        },
        {
            key: "dbHeartbeatEnable",
            desc: "Configure whether to enable heartbeat for the source database."
        },
        {
            key: "needTriggerDataJsonEscape",
            desc: "Whether to escape characters (\\\\) in the trigger incremental JSON."
        },
        {
            key: "triggerDataJsonQuotation",
            desc: "Custom quotation marks for trigger incremental JSON."
        },
        {
            key: "triggerParamBathSize",
            desc: "Set the number of columns involved per variable in the trigger template."
        },
        {
            key: "fullBeforeImageEnabled",
            desc: "Enable the trigger to record the complete data before all column changes."
        }
    ],
    master_function: [
        {
            key: "Trigger-based Incremental Data Sync",
            desc: "The DataJob automatically creates triggers on tables. These triggers capture INSERT, UPDATE, and DELETE events and write them to the CDC tables."
        }
    ]
}
