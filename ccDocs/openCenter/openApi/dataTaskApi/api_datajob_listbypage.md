---
id: api_datajob_listbypage
title: 分页查询任务列表
description: 接口描述：分页查询任务列表，支持多种筛选条件
---

## 接口描述 

分页查询任务列表，支持多种筛选条件和排序方式

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/listbypage`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明                                                                  |     请求类型 |  是否必须      |  数据类型   |
| ------------ |-----------------------------------------------------------------------|-----------|--------|----|
| pageNum  | 页码，从1开始                                                               |   body    |   是   |  int |
| pageSize  | 每页数量，最小1，最大20                                                         |   body    |   是   |  int |
| dataJobId  | 任务id                                                                  |   body    |   否   |  long |
| dataJobName  | DataJob 名称，可模糊查询                                                      |   body    |   否   |  string |  
| dataJobType  | DataJob 类型，参考 [获取任务类型列表](../constApi/api_constant_listdatajobtype.md) |   body    |   否   |  string |  
| desc  | 任务描述，可模糊查询                                                            |   body    |   否   |  string |  
| sourceInstanceId  | 源端数据源id                                                               |   body    |   否   |  long |  
| targetInstanceId  | 目标端数据源id                                                              |   body    |   否   |  long |  
| workerId  | 机器节点id                                                                |   body    |   否   |  long |  
| workerIp  | 机器节点ip                                                                |   body    |   否   |  string |  
| dataTaskStatus  | 任务状态，参考 [任务状态列表](../constApi/api_constant_listdatataskstatuses.md)    |   body    |   否   |  string |  
| orderType  | 排序字段，可选值：GMT_CREATE(创建时间)、PROCESS(任务进度)                               |   body    |   否   |  string |  
| orderAsc  | 是否升序，true为升序，false为降序                                                 |   body    |   否   |  boolean |  
| transferObjName  | 同步对象名称，可模糊查询                                                          |   body    |   否   |  string |  
| specifiedUid  | 指定用户ID，用于查询特定用户的任务                                                    |   body    |   否   |  string |  

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
| jobVos  | DataJob 列表，详见 [查询任务](api_datajob_query.md) 接口字段说明  |   是   |  array |  
| allJobCounts  | 符合条件的任务总数 |   是   |  long |   
| uidUsernameVos  | 用户信息列表，包含用户ID和用户名的映射关系 |   否   |  array |   

### uidUsernameVos 元素说明

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| uid  | 用户ID  |   是   |  string |  
| username  | 用户名 |   是   |  string |
