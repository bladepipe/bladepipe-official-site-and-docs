---
id: api_datajob_updateincrepos
title: Reset Position (Incremental)
description: API reference： reset the consumer position to re-process past events or skip ahead.
---

## Overview

Reset the incremental position when you need to re-consume earlier data or fast-forward past the current stream.

**Caveats**
- Only allowed while the job is **STOPPED** and in **Incremental** phase.
- The action is **irreversible**—proceed with caution.
- Choosing a future position may **drop data** between the old and new offsets.

## Endpoint

`POST /cloudcanal/console/api/v1/openapi/datajob/updateincrepos`

## Request

| Name              | Description                                           | In   | Required | Type   |
|-------------------|-------------------------------------------------------|------|----------|--------|
| taskId            | DataJob ID                                            | body | yes      | long   |
| posType           | Position type                                         | body | yes      | string |
| journalFile       | MySQL binlog file name                                | body | no       | string |
| filePosition      | MySQL binlog offset                                   | body | no       | long   |
| gtidPosition      | MySQL GTID                                            | body | no       | string |
| positionTimestamp | Timestamp-based position (ms)                         | body | no       | long   |
| serverId          | MySQL server-id                                       | body | no       | long   |
| lsn               | LSN for PG / SQL Server                               | body | no       | string |
| scn               | Oracle SCN                                            | body | no       | long   |
| scnIndex          | Oracle SCN index                                      | body | no       | long   |
| transactionId     | Oracle transaction ID                                 | body | no       | long   |
| commonPosStr      | Engine-specific JSON blob                             | body | no       | string |
| dataId            | HANA CDC table dataId                                 | body | no       | long   |



## Response

| Name      | Description              | Type   | Always present |
|-----------|--------------------------|--------|----------------|
| code      | 1 = success, 0 = failure | string | yes            |
| data      | payload (nullable)       | object | no             |
| msg       | human-readable message   | string | no             |
| requestId | trace id                 | string | yes            |

## Request Examples

Position-type determines the required payload.
<br/>

- MYSQL_LOG_FILE_POS
- AURORA_MYSQL_LOG_FILE_POS
- MARIADB_LOG_FILE_POS
- POLAR_MY_LOG_FILE_POS
- POLAR_X_LOG_FILE_POS
- OCEANBASE_LOG_FILE_POS
```json
{
  "taskId": 254,
  "posType": <posType> ,
  "journalFile": "binlog.000482",
  "filePosition": 3881575,
  "serverId": 1
}
```

- MYSQL_TIMESTAMP_POS
- AURORA_MYSQL_TIMESTAMP_POS
- MARIADB_TIMESTAMP_POS
- POLAR_MY_TIMESTAMP_POS
- POLAR_X_TIMESTAMP_POS
- TDSQLC_MY_TIMESTAMP_POS
- OCEANBASE_BINLOG_TIMESTAMP_POS

```json
{
  "taskId": 254,
  "posType": <posType> ,
  "positionTimestamp": 1766735726031,
  "serverId": 1
}
```

- AMAZON_MSK_TIMESTAMP_POS
- KAFKA_TIMESTAMP_POS
- AUTOMQ_TIMESTAMP_POS
- PULSAR_TIMESTAMP_POS
- ROCKETMQ_TIMESTAMP_POS
- OCEANBASE_TIMESTAMP_POS
- MONGODB_TIMESTAMP_POS
- TIDB_TIMESTAMP_POS
- SQLSERVER_TIMESTAMP_POS
- OB_FOR_ORACLE_TIMESTAMP_POS
- HANA_TIMESTAMP_POS

```json
{
  "taskId": 254,
  "posType": <posType> ,
  "positionTimestamp": 1766735726031
}
```


- DAMENG_LSN_POS
- PG_LSN_POS
- POLAR_PG_LSN_POS
- AURORA_PG_LSN_POS
- SQLSERVER_LSN_POS
- KES_LSN_POS

```json
{
  "taskId": 254,
  "posType": <posType> ,
  "lsn": "0/123ABC"
}
```


- HANA_DATA_ID_POS

```json
{
  "taskId": 254,
  "posType": <posType> ,
  "dataId": 111
}
```

- TDENGINE_MULTI_POS
- TDSQL_MULTI_POS
- DYNAMO_MULTI_POS
- REDIS_POS
- HANA_MULTI_POS
- SQLSERVER_MULTI_POS
- DAMENG_MULTI_POS
- DAMENG_DSC_POS

```json
{
  "taskId": 254,
  "posType": <posType> ,
  "commonPosStr": "{...}"   // see Job Details → Incremental → Reset Position
}
```

## Response Example
```json
{
  "code": "1",
  "msg": "request success",
  "data": null,
  "requestId": "9ee3c617-e225-11f0-aa63-01d225a87225"
}
```