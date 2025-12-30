---
id: api_constant_listspecs
title: 获取规格
description: 接口描述：获取数据任务规格列表，以便创建任务时选择。
---

## 接口描述 

获取数据任务规格列表，以便创建任务时选择

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/listspecs`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobType  |数据任务类型 <br/><br/>MIGRATION(数据迁移) <br/>SYNC(数据同步) <br/>CHECK(数据校验) <br/>REVISE(数据订正) <br/>STRUCT_MIGRATION(结构迁移) |   body    |   是   |string  |
|initialSync  |当 dataJobType 选择为 SYNC 时,是否进行数据初始化(全量数据迁移)|body| 否| boolean|
|shortTermSync  |当 dataJobType 选择为 MIGRATION 时,是否进行有限时长的增量数据同步|body| 否|boolean|

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   是    |
| msg      |      |    string   |   是    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组，数组元素为规格实体

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| id           |  规格id    |    string   |   是    |
| specKind     |  规格系列       |    string   |   是    |
| specKindCn   |  规格中文名称    |    string   |   是    |
| spec         |  规格   |    string   |   是    |
| description  |  规格描述   |    string   |   是    |
| fullMemoryMb |  全量内存占用(MB)   |    integer  |   是    |
| increMemoryMb|  增量内存占用(MB)   |    integer   |   是    |
| checkMemoryMb|  校验内存占用(MB)   |    integer   |   是    |

## 响应示例

```json
{
  "taskId": 0,
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "id": 1,
      "specKind": "IncreEnhance",
      "specKindCn": "增量增强型",
      "spec": "cloudcanal.increenhance.large.full.xlarge.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 1k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 2048,
      "checkMemoryMb": 1024
    },
    {
      "id": 2,
      "specKind": "IncreEnhance",
      "specKindCn": "增量增强型",
      "spec": "cloudcanal.increenhance.large.full.2xlarge.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 2k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 3072,
      "checkMemoryMb": 1024
    },
    {
      "id": 3,
      "specKind": "IncreEnhance",
      "specKindCn": "增量增强型",
      "spec": "cloudcanal.increenhance.large.full.3xlarge.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 10k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 4096,
      "checkMemoryMb": 1024
    },
    {
      "id": 4,
      "specKind": "IncreEnhance",
      "specKindCn": "增量增强型",
      "spec": "cloudcanal.increenhance.xlarge.full.2xlarge.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 2k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 3072,
      "checkMemoryMb": 2048
    },
    {
      "id": 5,
      "specKind": "IncreEnhance",
      "specKindCn": "增量增强型",
      "spec": "cloudcanal.increenhance.xlarge.full.3xlarge.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 10k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 4096,
      "checkMemoryMb": 2048
    },
    {
      "id": 6,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.large.full.small.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 0.2k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 512,
      "checkMemoryMb": 1024
    },
    {
      "id": 7,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.xlarge.full.small.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 0.2k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 512,
      "checkMemoryMb": 2048
    },
    {
      "id": 8,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.2xlarge.full.small.incre",
      "description": "1 KB/record , record count < 500 m, incre tps < 0.2k",
      "fullMemoryMb": 3072,
      "increMemoryMb": 512,
      "checkMemoryMb": 3072
    },
    {
      "id": 9,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.3xlarge.full.small.incre",
      "description": "1 KB/record , record count < 2 b, incre tps < 0.2k",
      "fullMemoryMb": 4096,
      "increMemoryMb": 512,
      "checkMemoryMb": 4096
    },
    {
      "id": 10,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.xlarge.full.large.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 0.5k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 1024,
      "checkMemoryMb": 2048
    },
    {
      "id": 11,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.2xlarge.full.large.incre",
      "description": "1 KB/record , record count < 500 m, incre tps < 0.5k",
      "fullMemoryMb": 3072,
      "increMemoryMb": 1024,
      "checkMemoryMb": 3072
    },
    {
      "id": 12,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.3xlarge.full.large.incre",
      "description": "1 KB/record , record count < 2 b, incre tps < 0.5k",
      "fullMemoryMb": 4096,
      "increMemoryMb": 1024,
      "checkMemoryMb": 4096
    },
    {
      "id": 13,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.2xlarge.full.xlarge.incre",
      "description": "1 KB/record , record count < 500 m, incre tps < 1k",
      "fullMemoryMb": 3072,
      "increMemoryMb": 2048,
      "checkMemoryMb": 3072
    },
    {
      "id": 14,
      "specKind": "FullEnhance",
      "specKindCn": "全量增强型",
      "spec": "cloudcanal.fullenhance.3xlarge.full.xlarge.incre",
      "description": "1 KB/record , record count < 2 b, incre tps < 1k",
      "fullMemoryMb": 4096,
      "increMemoryMb": 2048,
      "checkMemoryMb": 4096
    },
    {
      "id": 15,
      "specKind": "Balance",
      "specKindCn": "平衡型",
      "spec": "cloudcanal.balance.large.full.large.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 0.5k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 1024,
      "checkMemoryMb": 1024
    },
    {
      "id": 16,
      "specKind": "Balance",
      "specKindCn": "平衡型",
      "spec": "cloudcanal.balance.xlarge.full.xlarge.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 1k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 2048,
      "checkMemoryMb": 2048
    },
    {
      "id": 17,
      "specKind": "Balance",
      "specKindCn": "平衡型",
      "spec": "cloudcanal.balance.2xlarge.full.2xlarge.incre",
      "description": "1 KB/record , record count < 500 m, incre tps < 2k",
      "fullMemoryMb": 3072,
      "increMemoryMb": 3072,
      "checkMemoryMb": 3072
    },
    {
      "id": 18,
      "specKind": "Balance",
      "specKindCn": "平衡型",
      "spec": "cloudcanal.balance.3xlarge.full.3xlarge.incre",
      "description": "1 KB/record , record count < 2 b, incre tps < 10k",
      "fullMemoryMb": 4096,
      "increMemoryMb": 4096,
      "checkMemoryMb": 4096
    },
    {
      "id": 19,
      "specKind": "Balance",
      "specKindCn": "平衡型",
      "spec": "cloudcanal.balance.small.full.small.incre",
      "description": "1 KB/record , record count < 10 m, incre tps < 0.2k",
      "fullMemoryMb": 512,
      "increMemoryMb": 512,
      "checkMemoryMb": 512
    }
  ]
}
```


