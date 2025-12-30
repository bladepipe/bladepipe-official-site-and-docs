---
id: api_cluster_startworker
title: 启动机器
description: 接口描述：启动指定的机器节点
---

## 接口描述 

启动指定的机器节点，将节点状态更新为等待上线

## 接口地址 

`/cloudcanal/console/api/v1/openapi/worker/startWorker`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| workerId  |机器节点id|   body    |   是   |  long |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

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

- 启动后节点状态将变为 `WAIT_TO_ONLINE`（等待上线）
- 节点上的 Sidecar 客户端启动后会自动将状态更新为 `ONLINE`（在线）
