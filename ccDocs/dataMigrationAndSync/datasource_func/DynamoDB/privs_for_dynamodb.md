---
id: privs_for_dynamodb
title: DynamoDB 需要的权限
description: CloudCanal 在做 DynamoDB 源端或对端的数据迁移同步时，需要的 IAM 权限配置。
---

本文介绍 DynamoDB 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

## 作为源端
- **全量迁移**：需要对 DynamoDB 表执行 **Scan / Query / GetItem / BatchGetItem** 权限，以及 **ListTables / DescribeTable** 来发现表。  
  
  示例:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DynamoDBTableReadAndList",
        "Effect": "Allow",
        "Action": [
          "dynamodb:ListTables",
          "dynamodb:DescribeTable",
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:GetItem",
          "dynamodb:BatchGetItem"
        ],
        "Resource": "*"
      }
    ]
  }
  ```
  
- **增量同步**：需要读取 DynamoDB Streams，包括 **ListStreams / DescribeStream / GetShardIterator / GetRecords**。
  
  示例:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DynamoDBStreamReadAll",
        "Effect": "Allow",
        "Action": [
          "dynamodb:ListStreams",
          "dynamodb:DescribeStream",
          "dynamodb:GetShardIterator",
          "dynamodb:GetRecords"
        ],
        "Resource": "*"
      }
    ]
  }
  ```
  
## 作为目标端
- **全量迁移 / 增量同步**：需要向 DynamoDB 表写入数据的权限，包括 **PutItem / UpdateItem / DeleteItem / BatchWriteItem**。

  示例:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DynamoDBTableWrite",
        "Effect": "Allow",
        "Action": [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:BatchWriteItem"
        ],
        "Resource": "*"
      }
    ]
  }
  ```
