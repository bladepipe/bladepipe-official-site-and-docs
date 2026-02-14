---
id:  open_pg_heartbeat
title: Enable PostgreSQL Heartbeat
description: It describes how to enable PostgreSQL heartbeat in Incremental stage when there is no data written to PostgreSQL, so that the latency can be displayed correctly.
---
:::info
This page is also applicable to Greenplum.
:::

This page describes how to enable PostgreSQL heartbeat in Incremental stage when there is no data written to PostgreSQL, so that the latency can be displayed accurately.

## Overview

When moving data from a PostgreSQL instance, if there is no change for a long time, there will be latency displayed on the page.

By enabling PostgreSQL heartbeat, **new UPDATE events are generated regularly** so that the latency is displayed accurately.

## Prerequisites
The user of PostgreSQL has **UPDATE** permission. 


## Procedure
1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. At the **Source** tab, modify the values of the following parameters:
    - Modify the value of **dbHeartbeatEnable** to true.
    - If needed, modify the value of **dbHeartbeatTable** to the heartbeat table mode and name.
3. Create a heartbeat table in the source PostgreSQL database and insert one record. The **dbHeartbeatTable** value should match the parameter value of **dbHeartbeatTable** specified in Step 2.
   ```sql
   -- Replace {dbHeartbeatTable} with the actual value, such as "public"."__bp_hb_tab"
   CREATE TABLE {dbHeartbeatTable} (
        gmt_modified date NULL
   ) TABLESPACE pg_default;

   -- Replace {dbHeartbeatTable} with the actual value, such as "public"."__bp_hb_tab"
   INSERT INTO {dbHeartbeatTable} (gmt_modified) VALUES (CURRENT_TIMESTAMP);
   ```
4. Click **Save** in the upper-right corner.
5. Click **Submit**.