---
id: api_worker_listworkers
title: List Workers
sidebar_position: 2
description: To query a list of machines based on the cluster ID.
---

## Interface Overview 

To query a list of machines based on the cluster ID.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/worker/listworkers`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId  | Cluster id |   Body    |   True   | Long  |     
| sourceInstanceId  | Source data source instance id |   Body    |   False   | Long  |    
| targetInstanceId  | Target data source instance id |   Body    |   False   | Long  |  

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1:Successful 0:Failed | string | True |
| data |  | Object | False |
| msg |  | string | False |
| requestId |  | string | True |

## Data Parameters

The data is an array, and each set of data contains the following field descriptions:

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| id | Node ID | long | True |
| gmtCreate | Creation time | string | True |
| gmtModified | Modification time | string | True |
| clusterId | Cluster ID | long | True |
| privateIp | Private IP | string | True |
| publicIp | Public IP (Egress IP) | string | False |
| cloudOrIdcName | Cloud provider or IDC type, <br/>ALIBABA_CLOUD <br/>SELF_MAINTENANCE | string | True |
| region | Region where the cluster is located | string | True |
| workerName | Node Name | string | True |
| workerSeqNumber | Node unique identifier | string | True |
| workerDesc | Node description | string | True |
| totalTaskMemMb | Logical memory used by tasks (MB) | long | True |
| taskHeapSizeMb | Physical memory used by tasks (MB) | long | True |
| memOverSoldPercent | Memory usage ratio, exceeding 100 indicates overselling | int | True |
| physicMemMb | Physical memory capacity (MB) | long | True |
| physicCoreNum | Number of physical cores | int | True |
| logicalCoreNum | Number of logical cores | int | True |
| physicDiskGb | Physical disk capacity (GB) | long | True |
| workerType | Node type, <br/>BARE_METAL <br/>VM <br/>ECS | string | True |
| workerState | Node status, <br/>WAIT_TO_ONLINE <br/>ONLINE <br/>WAIT_TO_OFFLINE <br/>OFFLINE <br/>ABNORMAL <br/>NOT_EXIST | string | True |
| cpuUseRatio | CPU utilization ratio | double | True |
| memUseRatio | Memory utilization ratio | double | True |
| healthLevel | Node health status, <br/>Unhealthy <br/>SubHealth <br/>Health | string | True |
| freeMemMb | Free memory (MB) | long | True |
| freeDiskGb | Free disk space (GB) | long | True |
| workerLoad | Node load | double | True |
| installConsoleJobId | Asynchronous task ID for node installation | long | True |
| uninstallConsoleJobId | Asynchronous task ID for node uninstallation | long | True |
| deployStatus | Node deployment status, <br/>INSTALLING <br/>INSTALLED <br/>UNINSTALLING <br/>UNINSTALLED | string | True |
| consoleJobId | Asynchronous task ID for adding nodes | long | True |
| consoleTaskState | Asynchronous task state for adding nodes, <br/>WAIT_START <br/>EXECUTE <br/>SUCCESS <br/>FAILED <br/>CANCELED <br/>SKIP | string | True |
| taskScheduleVOs | Task information mounted on the machine, structured as an array | List | True |
| alertConfigVO | Alert configuration | Object | True |
| installOrUpgradeDate | Installation or upgrade time | string | True |
| installOrUpgradeVersion | Software version after installation or upgrade | string | True |

### TaskScheduleVOs Illustrate
The parameter is a list, and each element in the list is described by the following fields.

| ParameterName | Parameter Description     | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| Id | ID of scheduled data | long | True |
| GmtCreate | Creation time | string | True |
| TaskId | Data Task ID | long | True |
| JobId | Data Job ID | long | True |
| TaskName | Data Task name | string | True |
| JobName | Data Job name | string | True |
| JobDesc | Data Job description | string | True |
| WorkerIp | Mounted node IP | string | True |
| WorkerId | Mounted node ID | string | True |
| ClusterName | Name of the cluster to which the node belongs | string | True |
| ClusterId | ID of the cluster to which the node belongs | long | True |
| JvmHeapMb | Memory (in MB) allocated to the Data Task | string | True |
| SrcDsId | ID of the source data source | long | True |
| SrcDsDesc | Description of the source data source | string | True |
| DstDsId | ID of the target data source | long | True |
| DstDsDesc | Description of the target data source | string | True |


### AlertConfigVO Illustrate
The parameter is an object, and the field descriptions are as follows.

| ParameterName | Parameter Description     | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| id | Alarm configuration ID | long | True |
| uid | User ID of the owner | string | True |
| phone | Whether or not to send phone alarms | boolean | True |
| email | Whether or not to send email alarms | boolean | True |
| dingding | Whether or not to send instant messaging alarms | boolean | True |
| sms | Whether or not to send SMS alarms | boolean | True |
| ruleName | Name of the alarm rule | string | True |
| expression | Alarm expression | string | True |
| sendAdmin | Whether or not to send to business administrators | boolean | True |
| sendSystem | Whether or not to send to system administrators | boolean | True |
| dataJobId | Data Job ID | long | False |
| workerId | Node ID | long | False |
| alarmLevel | Alarm level, <br/> Major <br/> Critical <br/> Blocker | string | True |
| eventType | Type of exception event, <br/> TASK_EXCEPTION_EVENT <br/> TASK_POSITION_DELAY_EVENT <br/> SIDECAR_EXCEPTION_EVENT <br/> CONSOLE_EXCEPTION_EVENT <br/> WORKER_ABNORMAL_EVENT <br/> TASK_NORMAL_EVENT | string | True |
| alertReceivers | Alarm recipients, a mapping structure where the key is the UID and the value is the username | map | False |

## Response Example

```json
{
  "requestId": "ebd0b7dc-54ed-11ed-b820-5bd47d77dc8c",
  "taskId": 0,
  "workerIdentity": null,
  "sendBackToTask": false,
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "id": 1,
      "gmtCreate": "2021-11-04T04:25:06.000+0000",
      "gmtModified": "2022-10-26T05:20:20.000+0000",
      "clusterId": 1,
      "privateIp": "192.168.0.149",
      "publicIp": "115.192.103.211",
      "cloudOrIdcName": "SELF_MAINTENANCE",
      "region": "hangzhou",
      "totalTaskMemMb": 10240,
      "memOverSoldPercent": 200,
      "physicMemMb": 65536,
      "physicCoreNum": 10,
      "logicalCoreNum": 10,
      "physicDiskGb": 926,
      "workerType": "VM",
      "workerState": "ONLINE",
      "cpuUseRatio": 20.74,
      "memUseRatio": 52,
      "healthLevel": "Health",
      "taskHeapSizeMb": 0,
      "freeMemMb": 30855,
      "freeDiskGb": 700,
      "workerLoad": 3.03,
      "workerName": "worker241gk84d2o6",
      "workerSeqNumber": "wsnkhry09td02kdvuxns3olrzpgz915r5s569rt0hail7y63vgha4xcnn3g5a8la",
      "workerDesc": "worker241gk84d2o6",
      "installConsoleJobId": null,
      "uninstallConsoleJobId": null,
      "deployStatus": null,
      "consoleJobId": 482,
      "consoleTaskState": "SUCCESS",
      "taskScheduleVOs": [
        {
          "id": 63,
          "gmtCreate": "2022-04-19T10:07:37.000+0000",
          "gmtModified": "2022-04-19T10:07:37.000+0000",
          "taskId": 71,
          "jobId": 455,
          "taskName": "canalz1yt0nutvr3_CHECK",
          "jobName": "canalz1yt0nutvr3",
          "workerIp": "192.168.0.146",
          "workerId": 1,
          "clusterName": null,
          "clusterId": 1,
          "jobDesc": "1234",
          "jvmHeapMb": 2048,
          "srcDsId": 15,
          "srcDsDesc": "External source",
          "dstDsId": 101,
          "dstDsDesc": "cloudpg12"
        },
        {
          "id": 73,
          "gmtCreate": "2022-04-20T08:15:29.000+0000",
          "gmtModified": "2022-04-20T08:15:29.000+0000",
          "taskId": 81,
          "jobId": 459,
          "taskName": "canalc51a374175o_CHECK",
          "jobName": "canalc51a374175o",
          "workerIp": "192.168.0.146",
          "workerId": 1,
          "clusterName": null,
          "clusterId": 1,
          "jobDesc": "123",
          "jvmHeapMb": 2048,
          "srcDsId": 15,
          "srcDsDesc": "External source",
          "dstDsId": 104,
          "dstDsDesc": "cloudgp_2"
        },
        {
          "id": 93,
          "gmtCreate": "2022-04-22T05:46:31.000+0000",
          "gmtModified": "2022-04-22T05:46:31.000+0000",
          "taskId": 100,
          "jobId": 468,
          "taskName": "canal1c1zu6ye2dz_CHECK",
          "jobName": "canal1c1zu6ye2dz",
          "workerIp": "192.168.0.146",
          "workerId": 1,
          "clusterName": null,
          "clusterId": 1,
          "jobDesc": "1234",
          "jvmHeapMb": 2048,
          "srcDsId": 15,
          "srcDsDesc": "External source",
          "dstDsId": 16,
          "dstDsDesc": "External target"
        },
        {
          "id": 878,
          "gmtCreate": "2022-10-25T06:46:47.000+0000",
          "gmtModified": "2022-10-25T06:46:47.000+0000",
          "taskId": 973,
          "jobId": 877,
          "taskName": "canale4g10grqgk4_INCREMENT",
          "jobName": "canale4g10grqgk4",
          "workerIp": "192.168.0.149",
          "workerId": 1,
          "clusterName": null,
          "clusterId": 1,
          "jobDesc": "123",
          "jvmHeapMb": 2048,
          "srcDsId": 15,
          "srcDsDesc": "External source",
          "dstDsId": 229,
          "dstDsDesc": "alikafka_post-cn-zmb2xhefl001"
        },
        {
          "id": 880,
          "gmtCreate": "2022-10-25T13:10:42.000+0000",
          "gmtModified": "2022-10-25T13:10:42.000+0000",
          "taskId": 975,
          "jobId": 879,
          "taskName": "canal0epg521jc7b_INCREMENT",
          "jobName": "canal0epg521jc7b",
          "workerIp": "192.168.0.149",
          "workerId": 1,
          "clusterName": null,
          "clusterId": 1,
          "jobDesc": "123",
          "jvmHeapMb": 2048,
          "srcDsId": 229,
          "srcDsDesc": "alikafka_post-cn-zmb2xhefl001",
          "dstDsId": 229,
          "dstDsDesc": "alikafka_post-cn-zmb2xhefl001"
        }
      ],
      "alertConfigVO": {
        "id": 3,
        "uid": "1661225473146964",
        "phone": false,
        "email": true,
        "dingding": true,
        "sms": true,
        "duplicated": false,
        "ruleName": "Machine Liveness Probe Alert",
        "expression": null,
        "sendAdmin": false,
        "sendSystem": false,
        "dataJobId": null,
        "workerId": 1,
        "alarmLevel": "Major",
        "eventType": "WORKER_ABNORMAL_EVENT",
        "alertReceivers": {}
      },
      "installOrUpgradeDate": null,
      "installOrUpgradeVersion": null
    }
  ],
  "fail": false,
  "success": true,
  "rsocketDirectionType": null
}
```


