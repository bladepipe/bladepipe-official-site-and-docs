---
id: prepare_for_dameng_logminer
title: Preparation for Dameng LogMiner Sync
description: BladePipe uses LogMiner to synchronize Dameng. This article describes the preparation steps before synchronization.
---

BladePipe uses LogMiner to achieve incremental data synchronization for Dameng. This article describes the preparation work before data synchronization.

## Preparation 1 - Enable Log Archiving

1. Check if archiving is currently enabled in the database. If the `ARCH_INI` parameter is 1, ignore this step.
   ```sql
   SELECT PARA_NAME,PARA_VALUE FROM V$DM_INI WHERE PARA_NAME = 'ARCH_INI';
   ```
2. Modify the `dm.ini` parameter.
   ```text
   ARCH_INI = 1
   ```
3. Configure `dmarch.ini` for local archiving.
   ```text
   [ARCHIVE_LOCAL1]
   ARCH_TYPE = LOCAL
   ARCH_DEST = d:\dmdata\arch
   ARCH_FILE_SIZE = 128 # Unit: Mb
   ARCH_SPACE_LIMIT = 0 # Unit: Mb, 0 means unlimited, range: 1024~4294967294M
   ```

## Preparation 2 - Modify Archive Log Mode

1. Check the current database log mode. If the `RLOG_APPEND_LOGIC` parameter is 2, ignore this step.
   ```sql
   SELECT PARA_NAME,PARA_VALUE FROM V$DM_INI WHERE PARA_NAME = 'RLOG_APPEND_LOGIC';
   ```
2. Modify the `dm.ini` parameter.
   ```text
   RLOG_APPEND_LOGIC = 2
   ```

   :::info
   For more details, refer to: [Logmnr Interface Instructions](https://eco.dameng.com/document/dm/zh-cn/pm/logmnr-interface-instructions)
   :::

## Preparation 3 - Extra Configuration for Dameng DSC (Data Shared Cluster)

   If the Dameng instance is not DSC, ignore this step.

1. Create a table structure for BladePipe to synchronize global LSN.
   ```sql
   CREATE TABLE "CC_DSC_SYNC_TABLE" (
      "ID" INT NOT NULL,
      "GMT_MODIFIED" DATETIME(6),
      NOT CLUSTER PRIMARY KEY("ID")
   );
   ```
2. When adding the data source in the BladePipe console, configure the following additional parameters:
     - **isDscNode**: Whether it is a DSC cluster, change the parameter value to true.
     - **dscHosts**: Information for all nodes of the DSC source, example value: ip1:port1,ip2:port2,ip3:port3...
     - **dscSyncLsnTable**: The table name used by DSC to synchronize global LSN, fill in the table name created in step 1 and the database name. Example value: "DbName"."TableName"
