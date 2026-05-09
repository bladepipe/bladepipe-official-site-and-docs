---
id: api_worker_createandinstall
title: 添加机器(带自动部署)
sidebar_position: 1
description: 接口描述：添加机器, 以便选择正常的机器 进行任务调度 或 数据库信息获取。
---

## 接口描述 

添加机器, 以便选择正常的机器 **进行任务调度** 或 **数据库信息获取**。

## 接口地址 

`/cloudcanal/console/api/v1/openapi/worker/createandinstall`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明 |     请求类型 | 是否必须 |  数据类型   |
| ------------ | ---------------------------- |-----------|------|----|
| cloudOrIdcName  |SELF_MAINTENANCE(自建) <br/>ALIBABA_CLOUD(阿里云) |   body    | 是    |string  |     
| clusterId  | 集群 id |   body    | 是    |long  |    
| region  | 集群所在区域 <br/><br/>hangzhou <br/>shanghai <br/>beijing <br/>shenzhen <br/>qingdao <br/>zhangjiakou <br/>huhehaote <br/>hongkong <br/>singapore <br/>silicon_valley <br/>london <br/>mq_internet_access <br/>customer |   body    | 是    |string  |
| executeTag  | 远程执行模式<br/><br/>DEFAULT_REMOTE(默认远程执行)|   body    | 是    |string  |
| remoteUser  | 机器远程用户名 |   body    | 否    |string  |
| remotePassword  | 机器远程密码 |   body    | 否    |string  |   
| remoteIp  | 机器 ip |   body    | 否    |string  |   

## 公共响应结果

| 参数名称         | 参数说明 |    类型(java) |  不为空 |
| ------------ | ----------------|-------|----------- |
| code     |  1:成功 0:失败 |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## 响应示例

```json
{
  "requestId": "89a71b85-2cb7-11ec-a410-1100c6102ca7",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


