---
id: api_cluster_modifymemoversoldpercent
title: 修改内存超卖比例
description: 接口描述：修改指定机器节点的内存超卖比例
---

## 接口描述 

修改指定机器节点的内存超卖比例，用于控制节点上任务可创建数量。

## 接口地址 

`/cloudcanal/console/api/v1/openapi/worker/modifyMemOverSoldPercent`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| workerId  |机器节点id|   body    |   是   |  long |  
| memOverSoldPercent  |内存超卖比例，范围 50-400，100 表示不超卖，大于 100 表示超卖|   body    |   是   |  int |  

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

## 参数说明

### memOverSoldPercent 取值说明

| 取值范围 | 说明 |
|---------|------|
| 50 | 只使用 50% 的物理内存 |
| 100 | 不超卖，使用 100% 的物理内存 |
| 200 | 超卖一倍，逻辑上可分配 200% 的物理内存 |
| 400 | 超卖三倍，逻辑上可分配 400% 的物理内存 |

## 注意事项

- 内存超卖比例过高可能导致节点 OOM（内存溢出）
- 建议根据实际任务负载情况合理设置超卖比例
- 修改后立即生效，但不会影响已经分配的任务内存
