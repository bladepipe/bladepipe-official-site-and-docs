---
id: api_worker_updateworkeralertconfig
title: 更新机器告警配置
description: 接口描述：更新指定机器节点的告警配置
---

## 接口描述 

更新指定机器节点的告警配置，包括电话、邮件、即时通讯和短信告警开关

## 接口地址 

`/cloudcanal/console/api/v1/openapi/worker/updateWorkerAlertConfig`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| workerId  |机器节点id|   body    |   是   |  long |  
| phone  |是否开启电话告警|   body    |   否   |  boolean |  
| email  |是否开启邮件告警|   body    |   否   |  boolean |  
| im  |是否开启即时通讯告警（如钉钉）|   body    |   否   |  boolean |  
| sms  |是否开启短信告警|   body    |   否   |  boolean |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## 请求示例

```json
{
  "workerId": 1,
  "phone": false,
  "email": true,
  "im": true,
  "sms": false
}
```

## 响应示例

```json
{
  "requestId": "ebd0b7dc-54ed-11ed-b820-5bd47d77dc8c",
  "code": "1",
  "msg": "request success",
  "data": null
}
```

## 注意事项

- 告警配置修改后立即生效
- 需要在系统中配置好相应的告警通道（邮件服务器、钉钉机器人等）才能正常发送告警
