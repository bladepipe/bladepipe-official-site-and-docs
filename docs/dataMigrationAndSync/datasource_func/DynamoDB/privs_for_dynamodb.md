---
id: privs_for_dynamodb
title: Required Privileges for DynamoDB
description: IAM permission configurations required by BladePipe when performing data migration or synchronization as a DynamoDB source or target.
---

This article describes the account permissions required by BladePipe when DynamoDB is used as a source or target data source for data migration or synchronization.

## As a Source

### Full Migration

- Requires **Scan / Query / GetItem / BatchGetItem** permissions on DynamoDB tables, as well as **ListTables / DescribeTable** to discover tables. **ListTables** is required for the connection test when adding a data source in BladePipe. If it is missing, the connection test reports a `not authorized ... ListTables` error. Do not omit it.

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

### Incremental Sync

- Requires reading DynamoDB Streams, including **ListStreams / DescribeStream / GetShardIterator / GetRecords**.

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

### Minimum Permission Configuration (Recommended)

To restrict permissions to specific tables, use the following minimum permission policy split into **Discovery / Table / Stream** sections:

- **Discovery section**: `ListTables` and `ListStreams` are global list actions. They do not support resource-level authorization and must use `Resource: "*"`.
- **Table section**: Required for full migration. Restrict the resource ARN to the specific table and its global secondary indexes. If the task does not involve full migration, you can remove the unused actions from `GetItem / BatchGetItem / Query / Scan`.
- **Stream section**: Required for incremental sync. The stream resource ARN must use the `table/<Table-Name>/stream/*` format. Do not use only the table ARN, or `DescribeStream` will be denied.

Example (replace `<Region>`, `<Account-ID>`, and `<Table-Name>`):

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
        "arn:aws:dynamodb:<Region>:<Account-ID>:table/<Table-Name>",
        "arn:aws:dynamodb:<Region>:<Account-ID>:table/<Table-Name>/index/*"
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
      "Resource": "arn:aws:dynamodb:<Region>:<Account-ID>:table/<Table-Name>/stream/*"
    }
  ]
}
```

### Network Source Restrictions (Optional)

In addition to Action and Resource, you can use Condition to restrict where requests come from. **Before configuring this, confirm the actual network path that BladePipe uses to access DynamoDB**. You can check the `sourceIPAddress` (public egress IP) and `vpcEndpointId` fields in AWS CloudTrail events for requests from the IAM user:

- **Public internet / NAT egress access**: Use the `aws:SourceIp` condition key with the fixed public egress IP of BladePipe.
- **Access through a VPC Endpoint**: Prefer `aws:SourceVpce` to restrict access to a specific endpoint. You can also use `aws:SourceVpc` to restrict access to a VPC.

:::info
The `aws:SourceVpc` / `aws:SourceVpce` condition keys appear in the request context only when the request actually goes through the corresponding VPC Endpoint. A service being deployed in a VPC does not mean its requests go through that VPC's endpoint.

If the Condition does not match the actual network path, DynamoDB reports a `no identity-based policy allows ...` error even when Action and Resource are configured correctly. This is the most common configuration issue.

DynamoDB table APIs (Gateway Endpoint) and Streams APIs (Interface Endpoint) use different VPC Endpoints and must be checked separately.
:::

Public egress restriction example (add the same Condition to other statements if they also need to be restricted):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DynamoDbStreamReadFromBladePipe",
      "Effect": "Allow",
      "Action": [
        "dynamodb:DescribeStream",
        "dynamodb:GetShardIterator",
        "dynamodb:GetRecords"
      ],
      "Resource": "arn:aws:dynamodb:<Region>:<Account-ID>:table/<Table-Name>/stream/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "<BladePipe-Egress-IP>"
        }
      }
    }
  ]
}
```

VPC Endpoint restriction example:

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
      "Resource": "arn:aws:dynamodb:<Region>:<Account-ID>:table/<Table-Name>/stream/*",
      "Condition": {
        "StringEquals": {
          "aws:SourceVpce": "<VPC-Endpoint-ID>"
        }
      }
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
