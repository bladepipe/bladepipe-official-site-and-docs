---
id: privs_for_dynamodb
title: Required Privileges for DynamoDB
description: IAM permission configurations required by BladePipe when performing data migration or synchronization as a DynamoDB source or target.
---

This article describes the account permissions required by BladePipe when DynamoDB is used as a source or target data source for data migration or synchronization.

## As a Source
- **Full Migration**: Requires **Scan / Query / GetItem / BatchGetItem** permissions on DynamoDB tables, as well as **ListTables / DescribeTable** to discover tables.  
  
  Example:
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
  
- **Incremental Sync**: Requires reading DynamoDB Streams, including **ListStreams / DescribeStream / GetShardIterator / GetRecords**.
  
  Example:
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
  
## As a Target
- **Full Migration / Incremental Sync**: Requires permissions to write data to DynamoDB tables, including **PutItem / UpdateItem / DeleteItem / BatchWriteItem**.

  Example:
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
