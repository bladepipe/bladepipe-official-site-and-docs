---
id:  open_mongodb_heartbeat
title: Enable MongoDB Heartbeat
description: It guides you to enable MongoDB heartbeat so that BladePipe can display accurate latency.
---

This page describes how to enable MongoDB heartbeat in Incremental stage when there is no data written to MongoDB, so that the latency can be displayed accurately.

## Overview

When moving data from a MongoDB instance, if there is no change for a long time, there will be latency displayed on the page.

By enabling MongoDB heartbeat, **new UPDATE events are generated regularly**, so that the latency is displayed accurately.

## Prerequisites
- The user of MongoDB has **UPDATE** permission. The collection for heartbeats can be modified through the parameter **dbHeartbeatCollection**.
- [Modify the DataJob Parameter](../../../operation/job_manage/job_op/job_params#Procedure) to make sure that the value of parameter **captureMode** is **CHANGE_STREAM**.
  

## Procedure

1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. At the **Source** tab, modify the values of the following parameters:
    - Modify the value of **dbHeartbeatEnable** to true.
    - Modify the value of **dbHeartbeatCollection** to **test.__cc_hb_collection** (the collection can be customized).
3. **Create a collection in the Source instance**:
   1. Create a collection **test.__cc_hb_collection** in MongoDB.
   2. Make sure that the user has **UPDATE** permission on this collection. 
4. Go back to BladePipe, and click **Save** in the upper-right corner.
5. Click **Submit**.



