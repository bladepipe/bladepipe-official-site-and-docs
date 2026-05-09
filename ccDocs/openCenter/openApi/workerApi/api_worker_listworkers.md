---
id: api_worker_listworkers
title: 查询集群机器列表
sidebar_position: 2
description: 接口描述：根据集群id查询机器列表。
---

## 接口描述 

根据集群id查询机器列表。

## 接口地址 

`/cloudcanal/console/api/v1/openapi/worker/listworkers`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId  |集群 id |   body    |   是   |long  |     
| sourceInstanceId  |源端数据源实例 id |   body    |   否   |long  |    
| targetInstanceId  |目标数据源实例 id |   body    |   否    |long  |   

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组,其中每一组数据中的字段说明如下:

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| id     |  节点id    |    long   |   是    |
| gmtCreate    | 创建时间     |    string   |    是   |
| gmtModified      |   修改时间   |    string   |  是     |
| clusterId     |  集群id    |    long   |   是    |
| privateIp     |  私网ip    |    string   |   是    |
| publicIp     |  公网ip(出口ip)   |    string   |   否    |
| cloudOrIdcName     | ALIBABA_CLOUD(阿里云) <br/>SELF_MAINTENANCE(自建)   |    string   |  是   |
| region     |  集群所在区域    |    string   |   是    |
| workerName     | 节点名称  |    string   |   是    |
| workerSeqNumber     | 节点唯一标识  |    string   |   是    |
| workerDesc     | 节点描述  |    string   |   是    |
| totalTaskMemMb     | 任务逻辑占用内存(MB)  |    long   |    是   |
| taskHeapSizeMb     | 任务物理占用内存(MB)  |    long   |   是    |
| memOverSoldPercent     | 内存占用比例，超过100则超卖  |    int   |   是    |
| physicMemMb     | 物理内存容量（MB） |    long   |   是    |
| physicCoreNum     | 物理核数量 |    int   |   是    |
| logicalCoreNum     | 逻辑核数量  |    int   |   是    |
| physicDiskGb     | 物理磁盘容量(GB)  |    long   |   是    |
| workerType     | 节点类型，<br/> <br/>BARE_METAL(物理机) <br/>VM(虚拟机) <br/>ECS(云虚拟机) |    string   |   是    |
| workerState     | 节点状态， <br/> <br/>WAIT_TO_ONLINE(等待上线) <br/>ONLINE(在线) <br/>WAIT_TO_OFFLINE(等待下线) <br/>OFFLINE(下线) <br/>ABNORMAL(异常) <br/>NOT_EXIST(不存在) |    string   |   是    |
| cpuUseRatio     | cpu使用率  |    double  |   是    |
| memUseRatio     | 内存使用率  |    double   |   是    |
| healthLevel     | 节点健康状况，<br/> <br/>Unhealthy(不健康) <br/>SubHealth(亚健康) <br/>Health(健康)   |    string   |   是    |
| freeMemMb     | 空闲内存(MB)  |    long   |   是    |
| freeDiskGb     | 空闲磁盘(GB)  |    long   |   是    |
| workerLoad     | 节点load  |    double   |   是    |
| installConsoleJobId     | 节点安装的异步任务id  |    long   |   是    |
| uninstallConsoleJobId     | 节点卸载的异步任务id |    long   |   是    |
| deployStatus     | 节点部署状态，<br/> <br/>INSTALLING(安装中) <br/>INSTALLED(安装完毕) <br/>UNINSTALLING(卸载中) <br/>UNINSTALLED(卸载完毕)  |    string   |   是    |
| consoleJobId     | 添加节点的异步任务id  |    long   |   是    |
| consoleTaskState     | 添加节点的异步任务状态， <br/> <br/>WAIT_START(等待启动) <br/>EXECUTE(执行中) <br/>SUCCESS(成功) <br/>FAILED(失败) <br/>CANCELED(取消) <br/>SKIP(跳过) |    string   |   是    |
| taskScheduleVOs     | 挂载在该机器的任务信息，结构为一个数组  |    list   |   是    |
| alertConfigVO     | 告警配置  |    object   |   是    |
| installOrUpgradeDate     | 安装或升级时间  |    string   |   是    |
| installOrUpgradeVersion     | 安装或升级后的软件版本  |    string   |   是    |

### taskScheduleVOs 说明
该参数为一个列表，其中列表中每一个元素的字段说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| id     |  调度数据的id    |    long   |   是    |
| gmtCreate    | 创建时间     |    string   |    是   |
| taskId      |  Data Task id   |    long   |  是     |
| jobId      |  Data Job id    |    long   |  是     |
| taskName      |   Data Task 名字   |    string   |  是     |
| jobName      |   Data Job 名字   |    string   |  是     |
| jobDesc      |   Data Job 描述  |    string   |  是     |
| workerIp      |   挂载的节点 ip   |    string   |  是     |
| workerId      |   挂载的节点 id   |    string   |  是     |
| clusterName      |   节点所属的集群名称   |    string   |  是     |
| clusterId      |   节点所属的集群id   |    long   |  是     |
| jvmHeapMb      |  Data Task 任务内存(MB)   |    string   |  是     |
| srcDsId      |   源端数据源id   |    long   |  是     |
| srcDsDesc      |   源端数据源描述   |    string   |  是     |
| dstDsId      |   目标数据源id   |    long   |  是     |
| dstDsDesc      |   目标数据源描述    |    string   |  是     |


### alertConfigVO 说明
该参数为一个对象，其中字段说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| id     |  告警配置id    |    long   |   是    |
| uid    |  所属用户uid     |    string   |    是   |
| phone      |   是否发送电话告警(目前无效)   |    boolean   |  是     |
| email      |   是否发送电子邮件告警   |    boolean   |  是     |
| dingding      |   是否发送即时通信工具告警   |    boolean   |  是     |
| sms      |   是否发送短信告警   |    boolean   |  是     |
| ruleName      |   告警规则名称   |    string   |  是     |
| expression      |   告警表达式   |    string   |  是     |
| sendAdmin      |   是否发送给业务管理员(未使用)   |    boolean   |  是     |
| sendSystem      |   是否发送给系统管理员  |    boolean   |  是     |
| dataJobId      |   Data Job id |    long   |  否     |
| workerId      |   节点id  |    long   |  否     |
| alarmLevel      |   告警级别,<br/> <br/>Major(普通) <br/>Critical(致命) <br/>Blocker(完全不可用) |    string   |  是     |
| eventType      |  异常事件类型,<br/> <br/>TASK_EXCEPTION_EVENT(任务异常) <br/>TASK_POSITION_DELAY_EVENT(任务延迟) <br/>SIDECAR_EXCEPTION_EVENT(节点报错) <br/>CONSOLE_EXCEPTION_EVENT(控制台报错) <br/>WORKER_ABNORMAL_EVENT(节点异常) <br/>TASK_NORMAL_EVENT(任务恢复正常)   |    string   |  是     |
| alertReceivers      |  告警接受人,是一个映射结构，key为uid,value为用户名   |    map   |  否     |

## 响应示例

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
          "srcDsDesc": "外网源",
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
          "srcDsDesc": "外网源",
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
          "srcDsDesc": "外网源",
          "dstDsId": 16,
          "dstDsDesc": "外网目标"
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
          "srcDsDesc": "外网源",
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
        "ruleName": "机器活性探测报警",
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


