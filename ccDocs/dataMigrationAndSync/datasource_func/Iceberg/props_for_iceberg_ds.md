---
id: props_for_iceberg_ds
title: Iceberg 数据源配置
description: 添加 Iceberg 数据源到系统的一些配置说明 
---

本文简要介绍添加 Iceberg 数据源时，需要填写的配置说明。

CloudCanal 支持 Iceberg 3 种 Catalog 和 2 种存储方式，搭配关系为

- AWS Glue + AWS S3 
- Nessie + MinIO / AWS S3
- Rest + MinIO / AWS S3

CloudCanal 的 Iceberg 配置即由此支持关系展开。

## 操作路径

点击 **数据源管理** > **新增数据源**，选择 **自建** 选项卡下的 **Iceberg** 数据源类型。

## 通用配置

- **网络地址**：即 Catalog 服务地址，3 种方式对应的示例地址如下（`<>`内部分根据实际情况替换）。

  - AWS Glue : **glue.&lt;aws_glue_region_code&gt;.amazonaws.com**
  - Nessie : **&lt;nessie_server_ip&gt;:19120/api/v1**
  - Rest : **&lt;rest_server_ip&gt;:&lt;rest_server_port&gt;**

- **版本号**：根据 Iceberg 实际版本进行选择。

- **描述**：根据承载业务等信息进行数据源描述。

- **物理位置**：根据 Catalog 实际部署位置，就近选择，也可保持默认值，做标记用途。

## 额外参数

- **httpsEnabled**：如果 Catalog 为 AWS Glue ，则需要为 true (即打开开关) ，其他 2 种，根据部署的 Catalog 服务 ssl 开闭状态进行选择。

- **catalogName**：为 Catalog 取一个名称，无特殊规定。建议以 **&lt;Catalog类型&gt;_catalog** 进行命名，如 **glue_catalog**。

- **catalogType**：即 Catalog 类型，可选填充 **GLUE** / **NESSIE** / **REST** 之一。

- **catalogWarehouse**：Iceberg 文件存储的根目录，如 **s3://bladepipe-iceberg**，则元数据和数据文件会基于目标存储 /bladepipe-iceberg 文件夹创建。

- **catalogProps**：根据 Catalog 和存储方式的不同搭配，配置有所区别，如下所示（`<>`内容根据实际情况替换）:

  - **AWS Glue + AWS S3**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "https://s3.&lt;aws_s3_region_code&gt;.amazonaws.com",
    "s3.access-key-id": "<aws_s3_iam_user_access_key>",
    "s3.secret-access-key": "<aws_s3_iam_user_secret_key>",
    "s3.path-style-access": "true",
    "client.region": "&lt;aws_s3_region&gt;",
    "client.credentials-provider.glue.access-key-id": "&lt;aws_glue_iam_user_access_key&gt;",
    "client.credentials-provider.glue.secret-access-key": "&lt;aws_glue_iam_user_secret_key&gt;",
    "client.credentials-provider": "com.amazonaws.glue.catalog.credentials.GlueAwsCredentialsProvider"
  }
  ```

  - **Nessie + AWS S3**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "https://s3.&lt;aws_s3_region_code&gt;.amazonaws.com",
    "s3.access-key-id": "<aws_s3_iam_user_access_key>",
    "s3.secret-access-key": "<aws_s3_iam_user_secret_key>",
    "s3.path-style-access": "true",
    "client.region": "&lt;aws_s3_region_code&gt;"
  }
  ```
  
  - **Nessie + MinIO**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "http://&lt;minio_server&gt;:&lt;minio_port&gt;",
    "s3.access-key-id": "&lt;minio_user&gt;",
    "s3.secret-access-key": "&lt;minio_password&gt;",
    "s3.path-style-access": "true",
    "client.region": "us-east-1"
  }
  ```
  
  - **Rest + AWS S3**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "https://s3.&lt;aws_s3_region_code&gt;.amazonaws.com",
    "s3.access-key-id": "<aws_s3_iam_user_access_key>",
    "s3.secret-access-key": "<aws_s3_iam_user_secret_key>",
    "s3.path-style-access": "true",
    "client.region": "&lt;aws_s3_region_code&gt;"
  }
  ```
  
  - **Rest + MinIO**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "http://&lt;minio_server&gt;:&lt;minio_port&gt;",
    "s3.access-key-id": "&lt;minio_user&gt;",
    "s3.secret-access-key": "&lt;minio_password&gt;",
    "s3.path-style-access": "true",
    "client.region": "us-east-1"
  }
  ```