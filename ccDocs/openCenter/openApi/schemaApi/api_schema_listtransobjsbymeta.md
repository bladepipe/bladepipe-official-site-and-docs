---
id: api_schema_listtransobjsbymeta
title: 查询同步对象
description: 接口描述：根据源端和目标端的元数据信息查询同步对象列表
---

## 接口描述 

根据源端和目标端的数据库、Schema、表名等元数据信息查询同步对象列表，用于血缘分析和对象追溯

## 接口地址 

`/cloudcanal/console/api/v1/openapi/schema/listTransObjsByMeta`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| srcDb  |源端数据库名|   body    |   否   |  string |  
| srcSchema  |源端 Schema 名|   body    |   否   |  string |  
| srcTransObj  |源端同步对象名（表名/Topic名等）|   body    |   否   |  string |  
| dstDb  |目标端数据库名|   body    |   否   |  string |  
| dstSchema  |目标端 Schema 名|   body    |   否   |  string |  
| dstTranObj  |目标端同步对象名（表名/Topic名等）|   body    |   否   |  string |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    array   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组，每个元素为一个同步对象索引信息：

### 基本信息

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| id  | 索引id  |   是   |  long |  
| dataJobId  | 所属 DataJob id |   是   |  long |   
| dataJobName  | 所属 DataJob 名称  |   是   |  string |   
| dataJobDesc  | 所属 DataJob 描述  |   否   |  string |   

### 源端信息

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| srcTransferObjName  | 源端同步对象名  |   是   |  string |  
| srcDsInstanceId  | 源端数据源实例ID |   是   |  long |   
| srcDsInstanceName  | 源端数据源实例名称  |   否   |  string |   
| srcFullTransferObjName  | 源端完整对象名（包含库名/Schema名）  |   否   |  string |   
| srcDsType  | 源端数据源类型  |   是   |  string |   
| srcDb  | 源端数据库名  |   否   |  string |   
| srcSchema  | 源端 Schema 名  |   否   |  string |   

### 目标端信息

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| dstTransferObjName  | 目标端同步对象名  |   是   |  string |  
| dstDsInstanceId  | 目标端数据源实例ID |   是   |  long |   
| dstDsInstanceName  | 目标端数据源实例名称  |   否   |  string |   
| dstFullTransferObjName  | 目标端完整对象名（包含库名/Schema名）  |   否   |  string |   
| dstDsType  | 目标端数据源类型  |   是   |  string |   
| dstDb  | 目标端数据库名  |   否   |  string |   
| dstSchema  | 目标端 Schema 名  |   否   |  string |   

### 其他信息

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| filterExpr  | 过滤表达式  |   否   |  string |  
| specifiedPks  | 指定的主键列 |   否   |  string |   

## 响应示例

```json
{
  "code": "1",
  "msg": "request success",
  "data":
  [
    {
      "id": 6000,
      "srcTransferObjName": "my_table",
      "srcDsInstanceId": 100,
      "srcDsInstanceName": "my-70o0i0ioc2a004y",
      "srcFullTransferObjName": "`from_my`.`my_table`",
      "srcDsType": "MySQL",
      "srcDb": "from_my",
      "srcSchema": null,
      "filterExpr": null,
      "specifiedPks": null,
      "dstTransferObjName": "my_table",
      "dstDsInstanceId": 159,
      "dstDsInstanceName": "sr-79838690nickf53",
      "dstFullTransferObjName": "`from_my`.`my_table`",
      "dstDsType": "StarRocks",
      "dstDb": "from_my",
      "dstSchema": null,
      "dataJobId": 271,
      "dataJobName": "canaldhm45mo4w6h",
      "dataJobDesc": ""
    },
    {
      "id": 6001,
      "srcTransferObjName": "w_company",
      "srcDsInstanceId": 100,
      "srcDsInstanceName": "my-70o0i0ioc2a004y",
      "srcFullTransferObjName": "`from_my`.`w_company`",
      "srcDsType": "MySQL",
      "srcDb": "from_my",
      "srcSchema": null,
      "filterExpr": null,
      "specifiedPks": null,
      "dstTransferObjName": "w_company",
      "dstDsInstanceId": 159,
      "dstDsInstanceName": "sr-79838690nickf53",
      "dstFullTransferObjName": "`from_my`.`w_company`",
      "dstDsType": "StarRocks",
      "dstDb": "from_my",
      "dstSchema": null,
      "dataJobId": 271,
      "dataJobName": "canaldhm45mo4w6h",
      "dataJobDesc": ""
    },
    {
      "id": 6002,
      "srcTransferObjName": "worker_stats",
      "srcDsInstanceId": 100,
      "srcDsInstanceName": "my-70o0i0ioc2a004y",
      "srcFullTransferObjName": "`from_my`.`worker_stats`",
      "srcDsType": "MySQL",
      "srcDb": "from_my",
      "srcSchema": null,
      "filterExpr": null,
      "specifiedPks": null,
      "dstTransferObjName": "worker_stats",
      "dstDsInstanceId": 159,
      "dstDsInstanceName": "sr-79838690nickf53",
      "dstFullTransferObjName": "`from_my`.`worker_stats`",
      "dstDsType": "StarRocks",
      "dstDb": "from_my",
      "dstSchema": null,
      "dataJobId": 271,
      "dataJobName": "canaldhm45mo4w6h",
      "dataJobDesc": ""
    },
    {
      "id": 6003,
      "srcTransferObjName": "workflow_version",
      "srcDsInstanceId": 100,
      "srcDsInstanceName": "my-70o0i0ioc2a004y",
      "srcFullTransferObjName": "`from_my`.`workflow_version`",
      "srcDsType": "MySQL",
      "srcDb": "from_my",
      "srcSchema": null,
      "filterExpr": null,
      "specifiedPks": null,
      "dstTransferObjName": "workflow_version",
      "dstDsInstanceId": 159,
      "dstDsInstanceName": "sr-79838690nickf53",
      "dstFullTransferObjName": "`from_my`.`workflow_version`",
      "dstDsType": "StarRocks",
      "dstDb": "from_my",
      "dstSchema": null,
      "dataJobId": 271,
      "dataJobName": "canaldhm45mo4w6h",
      "dataJobDesc": ""
    }
  ],
  "fail": false,
  "success": true
}
```
