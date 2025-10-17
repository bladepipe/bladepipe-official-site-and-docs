---
id: solve_sr_dr_dst_writer_http_host
title: Data Write Error with StarRocks/Doris as Target
description: This page describes how to resolve the error occured when writing data to StarRocks/Doris.
---

This page describes how to resolve the error occured when writing data to StarRocks/Doris.

## Issue
The test of connecting to StarRocks/Doris succeeds, but the Incremental task is interrupted. The following error occurs in the log:
```
async flush data to doris failed,try to exist task, msg:UnknownHostException: null: Name or service not known java.net.UnknownHostException: null: Name or service not known
```

```
async flush data to starrocks failed, msg:ConnectException: Connection timed out (Connection timed out)
org.apache.http.conn.HttpHostConnectException: Connect to 172.20.0.5:8040 [/172.20.0.5] failed: Connection timed out (Connection timed out)
```


## Cause
- Connection test: BladePipe tests connection and gets metadata by using Java Database Connectivity (JDBC). By default, it uses FE MySQL server port (ip:9030).
- Data write: BladePipe writes data to StarRocks/Doris by using [StreamLoad](https://docs.starrocks.io/docs/loading/Stream_Load_transaction_interface/). By default, it uses one of the following ports:
  - FE HTTP server: ip:8030
  - BE HTTP server: ip:8040

## Solution

### Solution 1: Add a DataSource
1. Click **DataSource** > **Add DataSource**.
2. Select **StarRocks**/**Doris** for DataSource type.
3. Set (private/public) Client Address as ip:9030 (the dafault FE MySQL server port is 9030).
4. Set the value of the parameter *privateHttpHost* / *publicHttpHost* (which differs based on private/public client address) in **Extra Info** as:
   - ip:8030 (the default FE HTTP server port is 8030)
     :::info
     In a Incremental task, FE may return a BE address. The address may be a private IP or a unparseable hostname, causing an error during the Incremental task.
     :::
   - or ip:8040 (the default BE HTTP server port is 8040)

### Solution 2: Modify DataSource
1. Click **DataSource**.
2. Choose the **StarRocks**/**Doris** DataSource, and click **More** > **View Configuration** in the Operation column on the right of the page.
3. Change the value of the parameter *privateHttpHost* / *publicHttpHost* (which differs based on private/public client address) to:
   - ip:8030 (the default FE HTTP server port is 8030)
     :::info
     In a Incremental task, FE may return a BE address. The address may be a private IP or a unparseable hostname, causing an error during the Incremental task.
     :::
   - or ip:8040 (the default BE HTTP server port is 8040)
4. Go to the Details page of the DataJob. Click **Functions** > [**Modify Parameters**](../operation/job_manage/job_op/job_params.md) > **Target**, and change the value of the parameter *httpHost* to the value entered in *privateHttpHost* / *publicHttpHost* at step 3 of Solution 2.
