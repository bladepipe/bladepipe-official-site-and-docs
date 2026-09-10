---
id: privs_for_dynamodb
title: DynamoDB 需要的权限
description: CloudCanal 在做 DynamoDB 源端或对端的数据迁移同步时，需要的 IAM 权限配置。
---

本文介绍 DynamoDB 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

## 作为源端

### 全量迁移

- 需要对 DynamoDB 表执行 **Scan / Query / GetItem / BatchGetItem** 权限，以及 **ListTables / DescribeTable** 来发现表。其中 **ListTables** 为 CloudCanal 添加数据源时连接测试所需，缺失时连接测试会报 `not authorized ... ListTables` 错误，请勿省略。

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

### 增量同步

- 需要读取 DynamoDB Streams，包括 **ListStreams / DescribeStream / GetShardIterator / GetRecords**。

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

### 最小权限配置（推荐）

如果希望将权限收敛到具体表，可参考以下按 **Discovery / Table / Stream** 三段拆分的最小权限策略 ：

- **Discovery 段**：`ListTables`、`ListStreams` 属于全局列表类 Action，不支持资源级授权，只能配置 `Resource: "*"`。
- **Table 段**：全量迁移所需，资源 ARN 收敛到具体表及其全局二级索引。若任务不涉及全量迁移，可删除 `GetItem / BatchGetItem / Query / Scan` 中实际未用到的 Action。
- **Stream 段**：增量同步所需。注意 Stream 资源 ARN 的格式为 `table/<表名>/stream/*`，不能只写表 ARN，否则 DescribeStream 会被拒绝。

示例（请替换 `<Region>`、`<Account-ID>`、`<表名>`）:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DynamoDbDiscovery",
      "Effect": "Allow",
      "Action": [
        "dynamodb:ListTables",
        "dynamodb:ListStreams"
      ],
      "Resource": "*"
    },
    {
      "Sid": "DynamoDbTableRead",
      "Effect": "Allow",
      "Action": [
        "dynamodb:DescribeTable",
        "dynamodb:GetItem",
        "dynamodb:BatchGetItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:<Region>:<Account-ID>:table/<表名>",
        "arn:aws:dynamodb:<Region>:<Account-ID>:table/<表名>/index/*"
      ]
    },
    {
      "Sid": "DynamoDbStreamRead",
      "Effect": "Allow",
      "Action": [
        "dynamodb:DescribeStream",
        "dynamodb:GetShardIterator",
        "dynamodb:GetRecords"
      ],
      "Resource": "arn:aws:dynamodb:<Region>:<Account-ID>:table/<表名>/stream/*"
    }
  ]
}
```

### 网络来源限制（可选）

在 Action 与 Resource 之外，还可以通过 Condition 限制请求来源。**配置前请先确认 CloudCanal 访问 DynamoDB 的真实网络路径**，可通过 AWS CloudTrail 查看该 IAM 用户请求事件中的 `sourceIPAddress`（公网出口 IP）与 `vpcEndpointId` 字段来判断：

- **公网 / NAT 出口访问**：使用 `aws:SourceIp` 条件键，取值为 CloudCanal 出口的固定公网 IP。
- **经由 VPC Endpoint 访问**：优先使用 `aws:SourceVpce`（精确到 Endpoint），也可使用 `aws:SourceVpc`（限制到 VPC）。

:::info
`aws:SourceVpc` / `aws:SourceVpce` 条件键只有在请求实际经过对应 VPC Endpoint 时才会出现在请求上下文中，「服务部署在某个 VPC」并不等于「请求经过该 VPC 的 Endpoint」。

若 Condition 与真实路径不符，即使 Action、Resource 配置正确，也会报 `no identity-based policy allows ...` 错误，这是最常见的配置问题。

另外，DynamoDB 表 API（Gateway Endpoint）与 Streams API（Interface Endpoint）是两个不同的 VPC Endpoint，需要分别确认。
:::

公网出口限制示例（其他 Statement 如需限制，添加同样的 Condition 即可）:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DynamoDbStreamReadFromCloudCanal",
      "Effect": "Allow",
      "Action": [
        "dynamodb:DescribeStream",
        "dynamodb:GetShardIterator",
        "dynamodb:GetRecords"
      ],
      "Resource": "arn:aws:dynamodb:<Region>:<Account-ID>:table/<表名>/stream/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "<CloudCanal-出口IP>"
        }
      }
    }
  ]
}
```

VPC Endpoint 限制示例:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DynamoDbStreamReadViaVpce",
      "Effect": "Allow",
      "Action": [
        "dynamodb:DescribeStream",
        "dynamodb:GetShardIterator",
        "dynamodb:GetRecords"
      ],
      "Resource": "arn:aws:dynamodb:<Region>:<Account-ID>:table/<表名>/stream/*",
      "Condition": {
        "StringEquals": {
          "aws:SourceVpce": "<VPC-Endpoint-ID>"
        }
      }
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
