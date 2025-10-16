---
id: props_for_paimon_ds
title: Add a Paimon DataSource
description: Configurations when adding Paimon DataSource in BladePipe
---

This page explains the configuration required when adding a Paimon DataSource.

BladePipe only supports the **filesystem** catalog mode, which is compatible with various stores such as Amazon S3, MinIO, HDFS, and local file systems.

## Configuration Explaination

Click **DataSource** > **Add DataSource**. Select **Paimon** under **Self Maintenance**.

### General Configuration

- **Address**: Fill in the catalog service endpoint based on the storage location specified by the Warehouse. 

  - **Amazon S3**: Fill in the S3 endpoint, for example, `s3.<aws_s3_region_code>.amazonaws.com`
  - **MinIO**: Fill in the MinIO endpoint, for example, `localhost:9000`
  - **Local file system**: Fill in `localhost`
  - **HDFS**: Fill in `localhost`

- **Version**: Select the exact Paimon version. 

- **Description**: Add a description to easily identify the DataSource. 

- **Physical Region**: Select a region closer to the place where Catalog is deployed or keep the default value. It is used for identification. 

## Parameter Configuration

- **httpsEnabled**: If the Catalog is AWS Glue, this parameter must be set to true. For the other types, set this value based on whether SSL is enabled for the deployed Catalog service. 

- **warehouse**: Specify the root directory URI of the Paimon warehouse. All table metadata and data files will be stored under this directory. 

  - **Example for Amazon S3**: `s3://<your_bucket_name>/path/to/warehouse`
  - **Example for MinIO**: `s3://<your_bucket_name>/path/to/warehouse`
  - **Example for HDFS**: `hdfs://<your_namenode_host>:<port>/path/to/warehouse`
  - **Example for local file system**: `file:///path/on/your/machine`

- **metastoreType**: Enable the file system mode. Currently, only filesystem is supported.

- **catalogProps**: The configuration varies for different catalogs. Examples are provided below (replace values inside `<>` with actual ones): 
  
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