---
id: api_datajob_updateincrepos
title: 重置位点(增量)
description: 接口描述：对位点进行重置，以应对某些场景下需要重新消费之前的数据，或者直接跳过当前数据的情况。
---

## 接口描述 

对位点进行重置，以应对某些场景下需要重新消费之前的数据，或者直接跳过当前数据的情况。

注意事项：
- 目前仅支持 **增量阶段** 任务在 **停止** 时重置位点。
- 重置位点操作 **不可逆**，请谨慎操作。
- 重置的位点时间如果大于当前的位点时间，可能有 **数据丢失风险**。


## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/updateincrepos`

## 请求方式

`POST`       

## 请求参数

| 参数名称              | 参数说明                                                  |     请求类型 | 是否必须 | 数据类型   |
|-------------------|-------------------------------------------------------|-----------|------|--------|
| taskId            | data task Id                                          |   body    | 是    | long   |  
| posType           | 位点类型                                                  |   body    | 是    | string |  
| journalFile       | MySQL binlog file name                                |   body    | 否    | string |  
| filePosition      | MySQL binlog file offset                              |   body    | 否    | long   |
| gtidPosition      | MySQL binlog gtid                                     |   body    | 否    | string |
| positionTimestamp | 时间戳位点                                                 |   body    | 否    | long   |
| serverId          | MySQL binlog server id                                |   body    | 否    | long   |
| lsn               | pg/sqlserver  日志序列号                                   |   body    | 否    | string |
| scn               | oracle scn                                            |   body    | 否    | string |
| scnIndex          | oracle scn Index                                      |   body    | 否    | string |
| commonPosStr      |  |   body    | 否    | string |
| dataId            | hana CDC表 dataId                                      |   body    | 否    | long   |
## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |


## 请求示例

不同位点类型所需要的参数不同。
<br/>

- MYSQL_LOG_FILE_POS
- AURORA_MYSQL_LOG_FILE_POS
- MARIADB_LOG_FILE_POS
- POLAR_MY_LOG_FILE_POS
- POLAR_X_LOG_FILE_POS
- OCEANBASE_LOG_FILE_POS

示例
```json
{
  "taskId":254,
  "posType": <posType> ,
  "journalFile":"binlog.000482",
  "filePosition":3881575,
  "serverId":1  //选填
}
```

- MYSQL_TIMESTAMP_POS
- AURORA_MYSQL_TIMESTAMP_POS
- MARIADB_TIMESTAMP_POS
- POLAR_MY_TIMESTAMP_POS
- POLAR_X_TIMESTAMP_POS
- TDSQLC_MY_TIMESTAMP_POS
- OCEANBASE_BINLOG_TIMESTAMP_POS

示例
```json
{
  "taskId":254,
  "posType": <posType> ,
  "positionTimestamp":1766735726031,
  "serverId": 1 //选填
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

示例
```json
{
  "taskId":254,
  "posType": <posType> ,
  "positionTimestamp":1766735726031
}
```

- DAMENG_LSN_POS
- PG_LSN_POS
- POLAR_PG_LSN_POS
- AURORA_PG_LSN_POS
- SQLSERVER_LSN_POS
- KES_LSN_POS

示例
```json
{
  "taskId":254,
  "posType": <posType> ,
  "lsn":"lsn"
}
```


- HANA_DATA_ID_POS

示例
```json
{
  "taskId":254,
  "posType": <posType> ,
  "positionTimestamp":"lsn",
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
  "taskId":254,
  "posType": <posType> ,
  "commonPosStr": <json> // 具体格式参考 任务详情 -> 增量同步 -> 重置位点
}
```


## 响应示例

```json
{
  "code": "1",
  "msg": "request success",
  "data": null,
  "requestId": "9ee3c617-e225-11f0-aa63-01d225a87225"
}
```

