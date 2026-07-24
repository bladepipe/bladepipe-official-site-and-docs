---
id: aws_glue_s3_iam_policy
title: AWS Glue 和 S3 IAM Policy
description: CloudCanal 使用 AWS Glue Catalog + Amazon S3 作为 Iceberg 数据源时，需要的 IAM 权限策略。
---

本文介绍 CloudCanal 使用 **AWS Glue Catalog + Amazon S3** 作为 Iceberg 数据源时，建议授予 IAM 用户或 IAM Role 的权限。

## 权限概览

| 使用场景 | AWS Glue 权限 | Amazon S3 权限 | 说明 |
| --- | --- | --- | --- |
| 任务创建和结构迁移 | 读取 Catalog、Database、Table、Table Version、Partition | 列出 bucket prefix，读取 Iceberg metadata/data 文件 | 添加数据源、刷新结构、选择同步对象时使用 |
| 作为源端 | 读取 Iceberg 表元数据 | 读取 Iceberg metadata、manifest、data file、delete file | 全量迁移和增量同步会扫描 Iceberg 表文件 |
| 作为目标端 | 创建/更新 Database 和 Table，删除 Table | 写入对象、分片上传、读取已提交文件、必要时删除临时或废弃文件 | 结构迁移、全量写入、增量写入和 schema 变更时使用 |
| 可选权限 | Lake Formation、跨账号 Catalog、KMS 相关权限 | KMS、bucket policy、VPC Endpoint policy | 仅在对应 AWS 能力启用时需要 |

## 作为源端

Iceberg 作为源端时，CloudCanal 会通过 Glue Catalog 定位 namespace 和 table，并通过 S3 读取表的 metadata、manifest、data file 和 delete file。

### 任务创建和结构迁移

需要以下 AWS Glue 读权限：

- `glue:GetDatabase`
- `glue:GetDatabases`
- `glue:GetTable`
- `glue:GetTables`
- `glue:GetTableVersion`
- `glue:GetTableVersions`
- `glue:GetPartition`
- `glue:GetPartitions`

### 全量迁移和增量同步

需要以下 Amazon S3 读权限：

- `s3:ListBucket`
- `s3:GetObject`

如果 S3 bucket 开启版本控制，并且 Iceberg 表元数据中显式引用了对象版本，可额外授予 `s3:GetObjectVersion`。

## 作为目标端

Iceberg 作为目标端时，CloudCanal 会根据源端表结构自动创建或更新 Iceberg 表，并通过 Iceberg commit 流程提交 snapshot。用户不需要手动执行这些操作，但用于连接 Iceberg 的 AWS 凭证需要具备对应权限。

### 结构迁移和结构变更

需要以下 AWS Glue 权限：

- `glue:GetDatabase`
- `glue:GetDatabases`
- `glue:GetTable`
- `glue:GetTables`
- `glue:GetTableVersion`
- `glue:GetTableVersions`
- `glue:CreateDatabase`
- `glue:CreateTable`
- `glue:UpdateTable`
- `glue:DeleteTable`

说明：

- CloudCanal 创建 Iceberg namespace 时，对应 Glue Database 创建动作。
- CloudCanal 创建 Iceberg table 时，对应 Glue Table 创建动作。
- CloudCanal 提交数据写入、schema 变更或 Iceberg snapshot 时，通常会更新 Glue Table 元数据。
- 权限 `glue:DeleteTable` 用于任务创建时选择删除重建目标 Iceberg 表。可选择去除，则该功能不可用。

### 全量写入和增量写入

需要以下 Amazon S3 权限：

- `s3:ListBucket`
- `s3:GetObject`
- `s3:PutObject`
- `s3:DeleteObject`
- `s3:ListBucketMultipartUploads`
- `s3:ListMultipartUploadParts`
- `s3:AbortMultipartUpload`

说明：

- 权限 `s3:PutObject` 用于写入 Iceberg data file、delete file、manifest 或 metadata 文件。
- 权限 `s3:GetObject` 用于读取已有 Iceberg metadata、manifest 和已提交数据文件。
- 权限 `s3:DeleteObject` 和 multipart 相关权限用于全量写入、增量写入或提交 Iceberg snapshot 过程中，清理失败上传、临时文件或废弃文件。

## 示例 IAM Policy

以下示例按一个 Glue Catalog、一个或多个 Glue Database，以及一个 S3 bucket prefix 收敛资源范围。请将占位符替换为实际值。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "GlueCatalogRead",
      "Effect": "Allow",
      "Action": [
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetTableVersion",
        "glue:GetTableVersions",
        "glue:GetPartition",
        "glue:GetPartitions"
      ],
      "Resource": [
        "arn:aws:glue:<region>:<aws_account_id>:catalog",
        "arn:aws:glue:<region>:<aws_account_id>:database/<database_name_or_pattern>",
        "arn:aws:glue:<region>:<aws_account_id>:table/<database_name_or_pattern>/*"
      ]
    },
    {
      "Sid": "GlueCatalogWriteForTarget",
      "Effect": "Allow",
      "Action": [
        "glue:CreateDatabase",
        "glue:CreateTable",
        "glue:UpdateTable",
        "glue:DeleteTable"
      ],
      "Resource": [
        "arn:aws:glue:<region>:<aws_account_id>:catalog",
        "arn:aws:glue:<region>:<aws_account_id>:database/<database_name_or_pattern>",
        "arn:aws:glue:<region>:<aws_account_id>:table/<database_name_or_pattern>/*"
      ]
    },
    {
      "Sid": "S3WarehouseList",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:ListBucketMultipartUploads"
      ],
      "Resource": "arn:aws:s3:::<bucket_name>",
      "Condition": {
        "StringLike": {
          "s3:prefix": [
            "<warehouse_prefix>",
            "<warehouse_prefix>/*"
          ]
        }
      }
    },
    {
      "Sid": "S3WarehouseObjectReadWrite",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListMultipartUploadParts",
        "s3:AbortMultipartUpload"
      ],
      "Resource": "arn:aws:s3:::<bucket_name>/<warehouse_prefix>/*"
    }
  ]
}
```

如果该 Iceberg 数据源只作为源端使用，可以删除示例中的 `GlueCatalogWriteForTarget`，并从 `S3WarehouseObjectReadWrite` 中移除 `s3:PutObject`、`s3:DeleteObject`、`s3:ListMultipartUploadParts`、`s3:AbortMultipartUpload`。

如果该 Iceberg 数据源只作为目标端使用，建议保留 Glue 读权限和 S3 读权限。Iceberg 提交 snapshot 前仍需要读取已有表元数据和已提交文件。

## 可选权限

### 使用 SSE-KMS 加密的 S3 bucket

如果 Iceberg warehouse 所在 bucket 使用 SSE-KMS，需要额外授予 KMS 权限，并确保 KMS key policy 允许该 IAM 主体使用对应 key。

源端读取通常需要：

- `kms:Decrypt`

目标端写入通常需要：

- `kms:Decrypt`
- `kms:Encrypt`
- `kms:GenerateDataKey`
- `kms:DescribeKey`

示例：

```json
{
  "Sid": "KmsForS3Warehouse",
  "Effect": "Allow",
  "Action": [
    "kms:Decrypt",
    "kms:Encrypt",
    "kms:GenerateDataKey",
    "kms:DescribeKey"
  ],
  "Resource": "arn:aws:kms:<region>:<aws_account_id>:key/<kms_key_id>"
}
```

### 启用 Lake Formation 管理 Glue Data Catalog

如果 AWS Glue Data Catalog 由 Lake Formation 管理，仅授予 IAM 权限可能仍无法访问表。需要在 Lake Formation 中为 CloudCanal 使用的 IAM 用户或 IAM Role 额外授予 Database、Table 和 Data location 权限。

建议按使用场景授权：

- 作为源端：授予 Database/Table 的 `DESCRIBE`、`SELECT`，以及 S3 Data location 访问权限。
- 作为目标端：授予 Database/Table 的 `DESCRIBE`、`CREATE_TABLE`、`ALTER`、`DROP`、`INSERT`，以及 S3 Data location 写入权限。

### 跨账号 Glue Catalog 或跨账号 S3

如果 Glue Catalog 或 S3 bucket 与 CloudCanal 使用的 IAM 主体不在同一个 AWS 账号，需要同时配置：

- CloudCanal 侧 IAM 用户或 IAM Role 的权限策略。
- 目标账号中的 Glue resource policy 或 Lake Formation 授权。
- S3 bucket policy。
- 如使用 AssumeRole，还需要配置信任策略和 `sts:AssumeRole` 权限。

### VPC Endpoint policy

如果 CloudCanal 通过 VPC Endpoint 访问 Glue 或 S3，除 IAM policy 外，还需要确认 VPC Endpoint policy 允许上述 Glue 和 S3 action。

## 参考资料

- [AWS Glue IAM action 列表](https://docs.aws.amazon.com/service-authorization/latest/reference/list_awsglue.html)
- [Amazon S3 IAM action 列表](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazons3.html)
- [Apache Iceberg AWS 集成说明](https://iceberg.apache.org/docs/latest/aws/)
