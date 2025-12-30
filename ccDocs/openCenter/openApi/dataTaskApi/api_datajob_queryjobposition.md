---
id: api_datajob_queryjobposition
title: 查询任务位点信息
description: 接口描述：根据任务id查询任务的位点信息，目前仅支持校验任务
---

## 接口描述 

根据任务id查询任务的位点信息，目前仅支持 CHECK（校验）类型任务，返回表级别的校验结果

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/queryjobposition`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId  |任务id|   body    |   是   |  long |  
| dataJobType  |任务类型，目前仅支持 CHECK，参考 [获取任务类型列表](../constApi/api_constant_listdatajobtype.md)|   body    |   是   |  string |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| tableCheckResultMap  | 表校验结果映射，key 为 TableUnit 的 JSON 序列化字符串，value 为校验位点对象  |   否   |  map |  

### TableUnit（Map Key）说明

Map 的 key 是 TableUnit 对象的 JSON 序列化字符串，格式如：`{"dbName":"test_db","tableSchema":"public","tableName":"table1"}`

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| dbName  | 数据库名  |   否   |  string |  
| tableSchema  | Schema名 |   否   |  string |   
| tableName  | 表名  |   是   |  string |   

### RdbCheckPositionDTO（Map Value）说明

校验位点对象，包含表级别的校验进度和结果信息：

#### 基础信息

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| taskId  | 任务ID  |   否   |  string |  
| jobId  | 作业ID |   否   |  string |   
| taskName  | 任务名称  |   否   |  string |   
| dbName  | 数据库名  |   否   |  string |   
| schema  | Schema名  |   否   |  string |   
| tableName  | 表名  |   否   |  string |   

#### 进度信息

| 参数名称         | 参数说明  |  不为空     |  数据类型   |
| ------------ |-------|--------|----|
| handledRecordCount  | 已处理记录数 |   是   |  long |  
| maxCount  | 最大记录数 |   是   |  long |   
| percentage  | 进度百分比(0-100) |   否   |  decimal |   
| elapsedTimeMs  | 已耗时(毫秒) |   是   |  long |   
| finished  | 表校验是否完成 |   是   |  boolean |   

#### 主键信息

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| currentPk  | 当前处理到的主键值  |   否   |  string |  
| minPkNumeric  | 最小主键值（数值型） |   否   |  decimal |   
| maxPkNumeric  | 最大主键值（数值型）  |   否   |  decimal |   

#### 校验结果

| 参数名称         | 参数说明     |  不为空     |  数据类型   |
| ------------ |----------|--------|----|
| loss  | 目标端缺失的记录数（源端有但目标端没有） |   否   |  long |  
| diff  | 与目标端不一致的记录数（两端都有但内容不同） |   否   |  long |   
| checkStage  | 校验阶段  |   否   |  string |   

#### 其他字段

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| fileBlockIndex  | 文件块索引  |   是   |  long |  
| included  | 是否包含第一条记录 |   是   |  boolean |   

## 响应示例

```json
{
  "code": "1",
  "msg": "request success",
  "data":
  {
    "tableCheckResultMap":
    {
      "{\"tableName\":\"workflow_version\",\"tableSchema\":\"dingtax\"}":
      {
        "taskId": "622",
        "jobId": "266",
        "taskName": "canalsubnt1b4uqw_CHECK",
        "dbName": null,
        "schema": "dingtax",
        "tableName": "workflow_version",
        "handledRecordCount": 0,
        "maxCount": 0,
        "currentPk": "{\"index\":null,\"currPartition\":null,\"currKeyCols\":{\"id\":null},\"minKeyCols\":{\"id\":null},\"maxKeyCols\":{\"id\":null},\"eosNodes\":null}",
        "fileBlockIndex": 0,
        "minPkNumeric": null,
        "maxPkNumeric": null,
        "percentage": 100,
        "elapsedTimeMs": 77,
        "included": true,
        "finished": true,
        "loss": 0,
        "diff": 0,
        "checkStage": "INITIAL_CHECK"
      },
      "{\"tableName\":\"w_company\",\"tableSchema\":\"dingtax\"}":
      {
        "taskId": "622",
        "jobId": "266",
        "taskName": "canalsubnt1b4uqw_CHECK",
        "dbName": null,
        "schema": "dingtax",
        "tableName": "w_company",
        "handledRecordCount": 0,
        "maxCount": 0,
        "currentPk": "{\"index\":null,\"currPartition\":null,\"currKeyCols\":{\"id\":null},\"minKeyCols\":{\"id\":null},\"maxKeyCols\":{\"id\":null},\"eosNodes\":null}",
        "fileBlockIndex": 0,
        "minPkNumeric": null,
        "maxPkNumeric": null,
        "percentage": 100,
        "elapsedTimeMs": 90,
        "included": true,
        "finished": true,
        "loss": 0,
        "diff": 0,
        "checkStage": "INITIAL_CHECK"
      },
      "{\"tableName\":\"worker_stats\",\"tableSchema\":\"dingtax\"}":
      {
        "taskId": "622",
        "jobId": "266",
        "taskName": "canalsubnt1b4uqw_CHECK",
        "dbName": null,
        "schema": "dingtax",
        "tableName": "worker_stats",
        "handledRecordCount": 36352,
        "maxCount": 157458,
        "currentPk": "{\"index\":null,\"currPartition\":null,\"currKeyCols\":{\"id\":-4231478872083296211},\"minKeyCols\":{\"id\":-8835792057943077187},\"maxKeyCols\":{\"id\":9223365991561122752},\"eosNodes\":null}",
        "fileBlockIndex": 0,
        "minPkNumeric": null,
        "maxPkNumeric": null,
        "percentage": 23.09,
        "elapsedTimeMs": 22624,
        "included": true,
        "finished": false,
        "loss": 0,
        "diff": 0,
        "checkStage": "INITIAL_CHECK"
      }
    }
  },
  "requestId": "5d589cc0-ce71-11f0-8388-cf86e7c30fd4",
  "fail": false,
  "success": true
}
```

## 注意事项

- 目前该接口仅支持 `dataJobType` 为 `CHECK` 的校验任务
- 其他类型任务调用此接口会返回错误
- `loss` 表示源端有但目标端缺失的记录数
- `diff` 表示两端都存在但数据内容不一致的记录数
- 当 `finished` 为 `true` 且 `loss` 和 `diff` 都为 0 时，表示该表校验通过
