---
id: props_for_paimon_ds
title: Paimon 数据源配置
description: 添加 Paimon 数据源到系统的一些配置说明 
---

本文详细说明在 CloudCanal 中新增 Paimon 数据源时的配置方式。

仅支持基于 **filesystem** 的 Catalog 模式，该模式适用于直接对接 Amazon S3、MinIO、HDFS 以及本地文件系统等多种存储后端。

## 操作路径

点击 **数据源管理** > **新增数据源**，选择 **自建** 选项卡下的 **Paimon** 数据源类型。

## 通用配置

- **网络地址**：根据 Warehouse 所指向的存储路径填写对应的访问地址：

  - 若为 **Amazon S3**，填写对应的 S3 Endpoint，例如：`s3.<aws_s3_region_code>.amazonaws.com`
  - 若为 **MinIO**，填写 MinIO 服务地址，例如：`localhost:9000`
  - 若为 **本地文件系统**，可填写 `localhost`
  - 若为 **HDFS**，填写 HDFS 服务地址，如 `<your_namenode_host>:<port>`

- **版本号**：根据当前环境中实际使用的 Paimon 版本进行选择。

- **描述**：为该数据源添加业务相关的说明，方便识别和管理。

- **物理位置**：可选项，可根据数据中心位置选择，也可保持默认值，仅作标记用途。

## 额外参数

- **httpsEnabled**：如果 Warehouse 为 Amazon S3 ，则需要为 true (即打开开关)，其余则根据部署的 Catalog 服务 ssl 开闭状态进行选择。

- **warehouse**：用于指定 Paimon 仓库的根目录 URI，所有表的元数据和数据文件将保存在该目录下。

  - **Amazon S3 示例**：`s3://<your_bucket_name>/path/to/warehouse`
  - **MinIO 示例**：`s3://<your_bucket_name>/path/to/warehouse`
  - **HDFS 示例**：`hdfs://<your_namenode_host>:<port>/path/to/warehouse`
  - **本地文件系统示例**：`file:///path/on/your/machine`

- **metastoreType**：此参数用于启用文件系统模式，目前只支持 **filesystem**。

- **catalogProps**：不同 Catalog 配置有所区别，如下所示（`<>`内容根据实际情况替换）:
  
  - **AWS S3**

  ```json
  {   
    "s3.access-key": "<aws_s3_iam_user_access_key>",
    "s3.secret-key": "<aws_s3_iam_user_secret_key>",
    "s3.path-style-access": "true"
  }
  ```
  
  - **MinIO**

  ```json
  {
    "s3.access-key": "<minio_user>",
    "s3.secret-key": "<minio_password>",
    "s3.path-style-access": "true"
  }
  ```