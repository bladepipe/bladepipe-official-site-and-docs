---
id: api_datajob_listkvconfigsbyjobid
title: 查询任务kv配置
description: 接口描述：根据任务id查询其kv配置列表
---

## 接口描述 

根据任务id查询其kv配置列表

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/listkvconfigsbyjobid`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobId  |任务id|   body    |   是   |  long |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 是一个数组，其中每一项为一个 kv 配置项信息.其中字段参数如下,需要注意的是

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| dataJobId  | DataJob id  |   是   |  long |  
| configName  | 配置名称 |    是   |  string |   
| configValue  | 当前配置值  |   否   |  string |   
| defaultValue  | 系统默认值|   否   |  string | 
| valueRange  | 系统建议值  |    否   |  string |      
| description  | 参数项描述  |   是   |  string |     
| taskType  | 参数所作用的任务类型 <br/><br/>BUILD_STRUCT(结构迁移) <br/>FULL(全量迁移) <br/>INCREMENT(增量同步) <br/>CHECK(校验) <br/>REVISE(订正)   |   否  |  string |     
| endPointType  | 参数作用端 <br/><br/>SOURCE(源端) <br/>TARGET(目标端) <br/>INDEPENDENT(全局) |   是   |  string |     
| dynamic  | 是否动态变更（无需重启任务）,目前都为 false   |   是   |  boolean |    
| readOnly | 是否只读 |   是   |  boolean |  
| configType  | 配置所属实体 <br/><br/>SERVER_CORE(任务) <br/>DATASOURCE(数据源) <br/>MAPPING(元数据映射)  |   是   |  string |   
| configTagType  | 配置类型 <br/><br/>NORMAL(通用) <br/>PERFORMANCE(性能) |   是   | string |    
| isSecret | 配置是否是密钥，如果是 true ，则 configValue 为空  |   是   |  boolean |   
| needCreate  | 该配置是否在本任务中未出现(新版本配置)，提交配置更新时需要作为新配置插入 |   是   |  boolean |

## 响应示例

```json
{
  "requestId": "50bcb593-6673-11ed-b716-e934b5005e9f",
  "taskId": 0,
  "workerIdentity": null,
  "sendBackToTask": false,
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dataJobId": 956,
      "configName": "dataTaskDsType",
      "configValue": "MYSQL_TUNNEL",
      "defaultValue": "",
      "valueRange": "",
      "description": "任务源端和目标端数据源类型组合",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": true,
      "configType": "SERVER_CORE",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "specId",
      "configValue": "16",
      "defaultValue": "",
      "valueRange": "15/16/17/18/19/20/21/22/23/24/25/26. 15=1GB mem,16=2GB mem,17=3GB mem,18=4GB mem,19=512MB mem,20=5GB mem,21=6GB mem,22=7GB mem,23=8GB mem,24=12GB mem,25=16GB mem,26=20GB mem.",
      "description": "任务规格ID,必须为配置推荐值",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": false,
      "configType": "SERVER_CORE",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "exceptionSkipMode",
      "configValue": "NONE",
      "defaultValue": "NONE",
      "valueRange": "NONE / ApplierHandlerException / ALL",
      "description": "任务异常忽略模式，NONE:不忽略异常,ApplierHandlerException:忽略对端写入异常",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": false,
      "configType": "SERVER_CORE",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "ddlExceptionSkip",
      "configValue": "false",
      "defaultValue": "false",
      "valueRange": "true / false",
      "description": "是否忽略对端 DDL 执行异常,true:忽略，false:不忽略 ",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": false,
      "configType": "SERVER_CORE",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "fullRingBufferSize",
      "configValue": "64",
      "defaultValue": "16",
      "valueRange": "16-256",
      "description": "全量任务内部队列大小",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": false,
      "configType": "SERVER_CORE",
      "configTagType": "PERFORMANCE",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "mappingDef",
      "configValue": "[{\"method\":\"DB_SCHEMA\",\"serializeMapping\":{\"{\\\"value\\\":\\\"dingtax\\\"}\":\"{\\\"parent\\\":{\\\"value\\\":\\\"cc_virtual_db\\\"},\\\"value\\\":\\\"cc_virtual_schema\\\"}\"},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"},{\"serializeMapping\":{},\"method\":\"TABLE_TABLE\",\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"},{\"method\":\"COLUMN_COLUMN\",\"serializeMapping\":{},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"}]",
      "defaultValue": "",
      "valueRange": "",
      "description": "表结构映射信息",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": true,
      "configType": "MAPPING",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      ...
    }
  ],
  "fail": false,
  "success": true,
  "rsocketDirectionType": null
}
```


