---
id: api_cluster_listclusters
title: List Clusters
sidebar_position: 1
description: Retrieving the list of clusters with operational machines, to enable task mounting or retrieval of database information.
---

## Interface Overview

Retrieving the list of clusters with operational machines, to **enable task mounting** or **retrieval of database information**.

## Interface Address

`/cloudcanal/console/api/v1/openapi/cluster/listclusters`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| cloudOrIdcName  |SELF_MAINTENANCE <br/>ALIBABA_CLOUD |   Body    |   False   |String  |     
| clusterDescLike  |  |   Body    |   False   |String  |    
| clusterNameLike  |  |   Body    |   False    |String  |   
| region  | The region where the cluster is located <br/><br/>hangzhou <br/>shanghai <br/>beijing <br/>shenzhen <br/>qingdao <br/>zhangjiakou <br/>huhehaote <br/>hongkong <br/>singapore <br/>silicon_valley <br/>london <br/>mq_internet_access <br/>customer |   Body    |   False   |String  |  

## Common Response Result

| ParameterName | Parameter Description     |    Type(Java) |  NotNull |
| ------------ | -------------------|-------|----------- |
| code     |  1: Success<br/>0: Failure    |    String   |   True    |
| data     |      |    Object   |   False    |
| msg      |      |    String   |   False    |
| requestId     |      |    String   |   True    |

## Data Parameters 

The data is an array, and each set of data contains the following field descriptions:

| ParameterName | Parameter Description     |    Type(Java) |  NotNull |
| ------------ | -------------------|-------|----------- |
| id     |  Primary Key    |    Long   |   True    |
| gmtCreate    | CreateTime     |    String   |    True   |
| gmtModified      |   ModifyTime   |    String   |  True     |
| clusterName     |  Cluster instance id    |    String   |   True    |
| region     |  Region where the cluster is located.    |    String   |   True    |
| cloudOrIdcName     | ALIBABA_CLOUD <br/>SELF_MAINTENANCE   |    String   |  True   |
| clusterDesc     | Cluster description.   |    String   |    False   |
| workerCount     | Total number of machines in the cluster  |    int   |   True    |
| runningCount     | Total number of machines in the cluster that are running normally  |    int   |   True    |
| abnormalCount     | Total number of machines in the cluster that are in an abnormal state  |    int   |   True    |
| ownerName     | OwnerName  |    String   |   True    |

## Response Example

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
      "clusterDesc": "Alibaba Cloud Shanghai",
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
      "clusterDesc": "Default Cluster",
      "workerCount": 1,
      "runningCount": 1,
      "abnormalCount": 0,
      "ownerName": "liqiang"
    }
  ]
}
```


