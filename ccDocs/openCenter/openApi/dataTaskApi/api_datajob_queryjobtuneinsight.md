---
id: api_datajob_queryjobtuneinsight
title: 导出任务调优诊断信息
description: 接口描述：根据任务id和子任务id导出任务调优诊断信息
---

## 接口描述

根据任务 ID 和子任务 ID 导出任务调优诊断信息。返回内容包括任务基础信息、任务关键配置、指定时间窗口内的监控指标和任务日志，可用于排查任务延迟、资源使用异常、源端或目标端性能问题。

该接口返回 JSON 文件附件，不使用 OpenAPI 通用的 `code`、`data`、`msg`、`requestId` 响应包装。

## 接口地址

`/cloudcanal/console/api/v1/openapi/datajob/queryjobtuneinsight`

## 请求方式

`POST`

## 请求参数

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| -------- | -------- | -------- | -------- | -------- |
| dataJobId | 任务id | body | 是 | long |
| dataTaskId | 子任务id | body | 是 | long |
| startTimeMs | 诊断时间窗口开始时间，Unix毫秒时间戳 | body | 否 | long |
| endTimeMs | 诊断时间窗口结束时间，Unix毫秒时间戳 | body | 否 | long |

## 时间窗口说明

- `startTimeMs` 和 `endTimeMs` 要么同时为空，要么同时传入。
- 两个参数都为空时，默认导出最近 5 分钟的诊断信息。
- 两个参数同时传入时，`startTimeMs` 必须小于 `endTimeMs`。
- 单次导出的时间窗口不能超过 1 小时。
- 建议尽量缩小时间窗口（推荐 1 分钟），窗口过大时日志量增加，会显著抬高 Console 与 Sidecar 之间的网络负载。

## 响应结果

接口调用成功时返回 JSON 文件附件，响应头示例：

```text
Content-Disposition: attachment;filename=canalxxxx_INCREMENT_20260601164144.json
Content-Type: application/json;charset=UTF-8
```

## JSON 文件参数说明

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | -------- | ------ | -------- |
| dataJobId | 任务id | 是 | long |
| dataTaskId | 子任务id | 是 | long |
| taskName | 子任务名称 | 是 | string |
| sourceDataSourceType | 源端数据源类型 | 否 | string |
| targetDataSourceType | 目标端数据源类型 | 否 | string |
| consoleVersion | Console版本 | 否 | string |
| authCodeType | 授权版本类型 | 否 | string |
| taskType | 子任务类型，可选值：FULL、INCREMENT、CHECK、REVISE、BUILD_STRUCT等 | 是 | string |
| windowStart | 诊断窗口开始时间 | 是 | string |
| windowEnd | 诊断窗口结束时间 | 是 | string |
| configs | 任务关键配置列表 | 否 | array |
| monitorSections | 监控指标分组列表 | 否 | array |
| taskLogs | 任务日志 | 否 | object |

### configs 参数说明

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | -------- | ------ | -------- |
| configName | 配置名称 | 是 | string |
| configType | 配置所属实体，可选值：BUSINESS、SERVER_CORE、DATASOURCE、MAPPING | 否 | string |
| configValue | 配置值 | 否 | string |
| description | 配置描述 | 否 | string |
| endPointType | 配置所属端，可选值：SOURCE、TARGET、INDEPENDENT | 否 | string |

### monitorSections 参数说明

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | -------- | ------ | -------- |
| sectionType | 指标分组类型，可选值：resource、source、target | 是 | string |
| monitorType | 监控类型，可选值：mac、task_resource、task_performance | 否 | string |
| title | 指标分组标题 | 否 | string |
| metrics | 指标列表 | 否 | array |

### metrics 参数说明

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | -------- | ------ | -------- |
| title | 指标名称 | 否 | string |
| status | 指标查询状态，可选值：success、no_data、error | 是 | string |
| maxValue | 指标最大值 | 否 | decimal |
| miniValue | 指标最小值 | 否 | decimal |
| points | 指标时间序列点 | 否 | array |

### points 参数说明

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | -------- | ------ | -------- |
| time | 指标时间 | 是 | string |
| value | 指标值 | 是 | decimal |

### taskLogs 参数说明

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | -------- | ------ | -------- |
| taskMainLog | 任务主日志 | 否 | object |
| applyCommitLog | 任务提交日志 | 否 | object |

任务日志对象参数说明：

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | -------- | ------ | -------- |
| fileName | 日志文件名 | 否 | string |
| description | 日志说明 | 否 | string |
| lineCount | 日志行数 | 是 | int |
| lines | 日志内容，按行返回 | 是 | array |

不同子任务类型返回的日志有所不同：

- `BUILD_STRUCT`：不返回任务日志。
- `CHECK`、`REVISE`：返回 `taskMainLog`。
- 其他任务类型：返回 `taskMainLog` 和 `applyCommitLog`。

## 请求示例

```json
{
  "dataJobId": 2222,
  "dataTaskId": 4507,
  "startTimeMs": 1780299703372,
  "endTimeMs": 1780303303343
}
```

## 响应示例

```json
{
  "dataJobId": 2222,
  "dataTaskId": 4507,
  "taskName": "canalf7ica030db6_INCREMENT",
  "sourceDataSourceType": "MySQL",
  "targetDataSourceType": "MySQL",
  "consoleVersion": "6.1.0.0",
  "authCodeType": "FLAGSHIP_VERSION",
  "taskType": "INCREMENT",
  "windowStart": "2026-06-01 17:05:22.210",
  "windowEnd": "2026-06-01 17:10:22.210",
  "configs": [
    {
      "configName": "increBatchSize",
      "configType": "SERVER_CORE",
      "configValue": "256",
      "description": "The max batch size of increment sync",
      "endPointType": "INDEPENDENT"
    },
    {
      "configName": "parseBinlogParallel",
      "configType": "DATASOURCE",
      "configValue": "16",
      "description": "The parse parallel for MySQL binlog source",
      "endPointType": "SOURCE"
    },
    {
      "configName": "writeParallel",
      "configType": "DATASOURCE",
      "configValue": "4",
      "description": "The write parallel for target",
      "endPointType": "TARGET"
    }
  ],
  "monitorSections": [
    {
      "sectionType": "resource",
      "monitorType": "task_resource",
      "title": "Resource",
      "metrics": [
        {
          "title": "CPU User Usage(%)",
          "status": "success",
          "maxValue": 2.7814923776410807,
          "miniValue": 2.5033288948069243,
          "points": [
            {
              "time": "2026-06-01 17:05:20.000",
              "value": 2.614030408108829
            },
            {
              "time": "2026-06-01 17:05:30.000",
              "value": 2.722177742193755
            }
          ]
        }
      ]
    },
    {
      "sectionType": "target",
      "monitorType": "task_performance",
      "title": "Incremental Target(RDB)",
      "metrics": [
        {
          "title": "Incremental Delay(ms)",
          "status": "success",
          "maxValue": 5960000,
          "miniValue": 5660000,
          "points": [
            {
              "time": "2026-06-01 17:05:20.000",
              "value": 5660000
            },
            {
              "time": "2026-06-01 17:05:30.000",
              "value": 5670000
            }
          ]
        }
      ]
    },
    {
      "sectionType": "source",
      "monitorType": "task_performance",
      "title": "Incremental Source(RDB)",
      "metrics": [
        {
          "title": "Net Receive BPS",
          "status": "success",
          "maxValue": 2.7001350067503376,
          "miniValue": 1.7999100044997751,
          "points": [
            {
              "time": "2026-06-01 17:05:20.000",
              "value": 2.7
            },
            {
              "time": "2026-06-01 17:05:30.000",
              "value": 2.7
            }
          ]
        }
      ]
    }
  ],
  "taskLogs": {
    "taskMainLog": {
      "fileName": "canalf7ica030db6_INCREMENT.log",
      "description": "The main log content when DataTask running.",
      "lineCount": 447,
      "lines": [
        "2026-06-01 17:05:22.286 [i-fetch-buf-11-thd-0] INFO  c.c.c.mysql.worker.reader.incre.MySqlIncreEventBroker - Fetch batch:256, real:0"
      ]
    },
    "applyCommitLog": {
      "fileName": "apply_commit.log",
      "description": "The commit log with primary key, elapse, action and other information.",
      "lineCount": 0,
      "lines": []
    }
  }
}
```
