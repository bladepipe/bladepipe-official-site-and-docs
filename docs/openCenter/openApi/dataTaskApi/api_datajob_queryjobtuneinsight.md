---
id: api_datajob_queryjobtuneinsight
title: Export DataJob Tune Insight
description: Export DataJob tune insight data by DataJob ID and DataTask ID
---

## Interface Overview

Export tune insight data by DataJob ID and DataTask ID. The exported JSON contains basic task information, key task configurations, monitoring metrics, and task logs within the specified time window. It can be used to troubleshoot task delay, resource usage issues, and source or target performance problems.

This interface returns a JSON file attachment. It does not use the common OpenAPI response wrapper with `code`, `data`, `msg`, and `requestId`.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/queryjobtuneinsight`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobId | DataJob ID | body | True | long |
| dataTaskId | DataTask ID | body | True | long |
| startTimeMs | Start time of the diagnostic window, Unix timestamp in milliseconds | body | False | long |
| endTimeMs | End time of the diagnostic window, Unix timestamp in milliseconds | body | False | long |

## Time Window

- `startTimeMs` and `endTimeMs` must be both empty or both provided.
- If both parameters are empty, the latest 5 minutes are exported by default.
- If both parameters are provided, `startTimeMs` must be less than `endTimeMs`.
- The time window cannot exceed 1 hour.

## Response Result

When the request succeeds, the interface returns a JSON file attachment. Response header example:

```text
Content-Disposition: attachment;filename=canalxxxx_INCREMENT_20260601164144.json
Content-Type: application/json;charset=UTF-8
```

## JSON File Parameters

| ParameterName | Parameter Description | NotNull | DataType |
| ------------ |---|--------|----|
| dataJobId | DataJob ID | True | long |
| dataTaskId | DataTask ID | True | long |
| taskName | DataTask name | True | string |
| sourceDataSourceType | Source DataSource type | False | string |
| targetDataSourceType | Target DataSource type | False | string |
| consoleVersion | Console version | False | string |
| authCodeType | License version type | False | string |
| taskType | DataTask type. Options: FULL, INCREMENT, CHECK, REVISE, BUILD_STRUCT, etc. | True | string |
| windowStart | Start time of the diagnostic window | True | string |
| windowEnd | End time of the diagnostic window | True | string |
| configs | Key task configurations | False | array |
| monitorSections | Monitoring metric sections | False | array |
| taskLogs | Task logs | False | object |

### configs

| ParameterName | Parameter Description | NotNull | DataType |
| ------------ |---|--------|----|
| configName | Configuration name | True | string |
| configType | Configuration entity type. Options: BUSINESS, SERVER_CORE, DATASOURCE, MAPPING | False | string |
| configValue | Configuration value | False | string |
| description | Configuration description | False | string |
| endPointType | Endpoint type. Options: SOURCE, TARGET, INDEPENDENT | False | string |

### monitorSections

| ParameterName | Parameter Description | NotNull | DataType |
| ------------ |---|--------|----|
| sectionType | Metric section type. Options: resource, source, target | True | string |
| monitorType | Monitor type. Options: mac, task_resource, task_performance | False | string |
| title | Section title | False | string |
| metrics | Metric list | False | array |

### metrics

| ParameterName | Parameter Description | NotNull | DataType |
| ------------ |---|--------|----|
| title | Metric title | False | string |
| status | Metric query status. Options: success, no_data, error | True | string |
| maxValue | Maximum metric value | False | decimal |
| miniValue | Minimum metric value | False | decimal |
| points | Metric time series points | False | array |

### points

| ParameterName | Parameter Description | NotNull | DataType |
| ------------ |---|--------|----|
| time | Metric time | True | string |
| value | Metric value | True | decimal |

### taskLogs

| ParameterName | Parameter Description | NotNull | DataType |
| ------------ |---|--------|----|
| taskMainLog | Main task log | False | object |
| applyCommitLog | Apply commit log | False | object |

Task log object parameters:

| ParameterName | Parameter Description | NotNull | DataType |
| ------------ |---|--------|----|
| fileName | Log file name | False | string |
| description | Log description | False | string |
| lineCount | Number of log lines | True | int |
| lines | Log content split by line | True | array |

Logs returned for different DataTask types:

- `BUILD_STRUCT`: No task logs are returned.
- `CHECK` and `REVISE`: `taskMainLog` is returned.
- Other DataTask types: `taskMainLog` and `applyCommitLog` are returned.

## Request Example

```json
{
  "dataJobId": 2222,
  "dataTaskId": 4507,
  "startTimeMs": 1780299703372,
  "endTimeMs": 1780303303343
}
```

## Response Example

```json
{
  "dataJobId": 2222,
  "dataTaskId": 4507,
  "taskName": "canalf7ica030db6_INCREMENT",
  "sourceDataSourceType": "MySQL",
  "targetDataSourceType": "MySQL",
  "consoleVersion": "6.1.0",
  "authCodeType": "V6",
  "taskType": "INCREMENT",
  "windowStart": "2026-06-01 15:41:43.372",
  "windowEnd": "2026-06-01 16:41:43.343",
  "configs": [
    {
      "configName": "increBatchSize",
      "configType": "SERVER_CORE",
      "configValue": "64",
      "description": "Incremental batch size",
      "endPointType": "INDEPENDENT"
    }
  ],
  "monitorSections": [
    {
      "sectionType": "resource",
      "monitorType": "task_resource",
      "title": "Resource",
      "metrics": [
        {
          "title": "CPU",
          "status": "success",
          "maxValue": 0.42,
          "miniValue": 0.12,
          "points": [
            {
              "time": "2026-06-01 15:41:40.000",
              "value": 0.12
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
      "lineCount": 1,
      "lines": [
        "2026-06-01 15:41:43.372 INFO task started"
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
