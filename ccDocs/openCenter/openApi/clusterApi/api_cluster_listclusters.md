---
id: api_cluster_listclusters
title: 机器集群列表
sidebar_position: 1
description: 接口描述：获取集群列表，以便选择有正常运行机器的集群 进行任务挂载 或 数据库信息获取。
---

## 接口描述 

获取集群列表，以便选择有正常运行机器的集群 **进行任务挂载** 或 **数据库信息获取**。

## 接口地址 

`/cloudcanal/console/api/v1/openapi/cluster/listclusters`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| cloudOrIdcName  |SELF_MAINTENANCE <br/>ALIBABA_CLOUD |   body    |   否   |string  |     
| clusterDescLike  |  |   body    |   否   |string  |    
| clusterNameLike  |  |   body    |   否    |string  |   
| region  | 集群所在区域 <br/><br/>hangzhou <br/>shanghai <br/>beijing <br/>shenzhen <br/>qingdao <br/>zhangjiakou <br/>huhehaote <br/>hongkong <br/>singapore <br/>silicon_valley <br/>london <br/>mq_internet_access <br/>customer |   body    |   否   |string  |  

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
| id     |  主键    |    Long   |   是    |
| gmtCreate    | 创建时间     |    String   |    是   |
| gmtModified      |   修改时间   |    String   |  是     |
| clusterName     |  集群实例id    |    String   |   是    |
| region     |  集群所在区域    |    String   |   是    |
| cloudOrIdcName     | ALIBABA_CLOUD(阿里云) <br/>SELF_MAINTENANCE(自建)   |    String   |  是   |
| clusterDesc     | 集群描述   |    String   |    否   |
| workerCount     | 该集群机器总数  |    int   |   是    |
| runningCount     | 该集群正常运行的机器总数  |    int   |   是    |
| abnormalCount     | 该集群异常的机器总数  |    int   |   是    |
| ownerName     | 拥有人名称  |    String   |   是    |

## 响应示例

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "id": 2,
      "gmtCreate": "2021-05-27T13:15:43.000+0000",
      "gmtModified": "2021-05-27T13:15:43.000+0000",
      "clusterName": "cluster553wq2b252",
      "region": "shanghai",
      "cloudOrIdcName": "ALIBABA_CLOUD",
      "clusterDesc": "阿里云上海",
      "workerCount": 0,
      "runningCount": 0,
      "abnormalCount": 0,
      "ownerName": "liqiang"
    },
    {
      "id": 1,
      "gmtCreate": "2021-03-26T03:59:02.000+0000",
      "gmtModified": "2021-03-26T03:59:23.000+0000",
      "clusterName": "defaultclusterwu9eamx8ae",
      "region": "hangzhou",
      "cloudOrIdcName": "SELF_MAINTENANCE",
      "clusterDesc": "默认集群",
      "workerCount": 1,
      "runningCount": 1,
      "abnormalCount": 0,
      "ownerName": "liqiang"
    }
  ]
}
```


