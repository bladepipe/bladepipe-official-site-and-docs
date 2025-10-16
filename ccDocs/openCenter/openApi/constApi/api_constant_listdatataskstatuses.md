---
id: api_constant_listdatataskstatuses
title: 数据任务状态
description: 接口描述：获取任务状态常量
---

## 接口描述 

获取任务状态常量

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/datataskstatuses`

## 请求方式

`POST`       

## 请求参数

无  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组，数组元素参数说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| i18nName     |    国际化名称  |    string   |   是    |
| dataTaskStatus     |   任务状态   |    string   |   是    |

## 响应示例

```json
 {
  "requestId": "9181193f-2be3-11ec-b616-231d2f6b0021",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "初始化",
      "dataTaskStatus": "INIT"
    },
    {
      "i18nName": "等待启动",
      "dataTaskStatus": "WAIT_START"
    },
    {
      "i18nName": "运行中",
      "dataTaskStatus": "RUNNING"
    },
    {
      "i18nName": "等待停止",
      "dataTaskStatus": "WAIT_STOP"
    },
    {
      "i18nName": "停止",
      "dataTaskStatus": "STOP"
    },
    {
      "i18nName": "等待完成",
      "dataTaskStatus": "WAIT_COMPLETE"
    },
    {
      "i18nName": "完成",
      "dataTaskStatus": "COMPLETE"
    },
    {
      "i18nName": "异常",
      "dataTaskStatus": "ABNORMAL"
    },
    {
      "i18nName": "已删除",
      "dataTaskStatus": "DELETE"
    },
    {
      "i18nName": "等待重启",
      "dataTaskStatus": "WAIT_RESTART"
    }
  ]
}
```


