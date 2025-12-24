---
id: api_cluster_stopworker
title: 停止机器
description: 接口描述：停止指定的机器节点
---

## 接口描述 

停止指定的机器节点，将节点状态更新为等待下线

## 接口地址 

`/cloudcanal/console/api/v1/openapi/worker/stopWorker`

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

- 停止后节点状态将变为 `WAIT_TO_OFFLINE`（等待下线）
- 节点上的 Sidecar 客户端停止后会自动将状态更新为 `OFFLINE`（下线）
- 停止节点前请确保节点上没有挂载任何任务，否则本操作将会失败，可提前通过手动调度将任务挪到其他节点
