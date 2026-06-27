---
id: props_for_iceberg_ds
title: Add an Iceberg DataSource
description: It guides you to add Iceberg as a connector in BladePipe.
---

This page explains the configuration required when adding an Iceberg DataSource.

BladePipe supports three types of Iceberg Catalogs and two storage backends, with the following combinations:

- AWS Glue + AWS S3
- Nessie + MinIO / AWS S3
- REST + MinIO / AWS S3

The configuration options in BladePipe for Iceberg are based on these supported combinations.


## Configuration Explaination
Click DataSource > Add DataSource. Select **Iceberg** under **Self Maintenance**.

### General Configuration

- **Address**: Fill in the Catalog service endpoint. Example endpoints for the three supported Catalogs are as follows (replace the content within `<>` with actual values).
  
  - AWS Glue: `glue.<aws_glue_region_code>.amazonaws.com`
  - Nessie: `<nessie_server_ip>:19120/api/v1`
  - Rest: `<rest_server_ip>:<rest_server_port>`

- **Version**: Select the exact Iceberg version. 
- **Description**: Add a description to easily identify the DataSource. 
- **Physical Region**: Select a region closer to the place where Catalog is deployed or keep the default value. It is used for identification. 

### Parameter Configuration

- **httpsEnabled**: If the Catalog is AWS Glue, this parameter must be set to true. For the other two types (Nessie and Rest), set this value based on whether SSL is enabled for the deployed Catalog service. 
- **catalogName**: Specify the name of the Catalog. 
- **catalogType**: Define the Catalog type (**GLUE**/**NESSIE**/**REST**).
- **catalogWarehouse**: Fill in the root path of the Iceberg file storage. For example, if set to **s3://bladepipe-iceberg**, both metadata and data files will be created under the /bladepipe-iceberg directory in the target storage.
- **catalogProps**: The configuration varies depending on the combination of Catalog and storage type. Examples are provided below (replace values inside `<>` with actual ones): 

  - **AWS Glue + AWS S3**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "https://s3.<aws_s3_region_code>.amazonaws.com",
    "s3.access-key-id": "<aws_s3_iam_user_access_key>",
    "s3.secret-access-key": "<aws_s3_iam_user_secret_key>",
    "s3.path-style-access": "true",
    "client.region": "<aws_s3_region>",
    "client.credentials-provider.glue.access-key-id": "<aws_glue_iam_user_access_key>",
    "client.credentials-provider.glue.secret-access-key": "<aws_glue_iam_user_secret_key>",
    "client.credentials-provider": "com.amazonaws.glue.catalog.credentials.GlueAwsCredentialsProvider"
  }
  ```

  - **Nessie + AWS S3**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "https://s3.<aws_s3_region_code>.amazonaws.com",
    "s3.access-key-id": "<aws_s3_iam_user_access_key>",
    "s3.secret-access-key": "<aws_s3_iam_user_secret_key>",
    "s3.path-style-access": "true",
    "client.region": "<aws_s3_region_code>"
  }
  ```
  
  - **Nessie + MinIO**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "http://<minio_server>:<minio_port>",
    "s3.access-key-id": "<minio_user>",
    "s3.secret-access-key": "<minio_password>",
    "s3.path-style-access": "true",
    "client.region": "us-east-1"
  }
  ```
  
  - **Rest + AWS S3**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "https://s3.<aws_s3_region_code>.amazonaws.com",
    "s3.access-key-id": "<aws_s3_iam_user_access_key>",
    "s3.secret-access-key": "<aws_s3_iam_user_secret_key>",
    "s3.path-style-access": "true",
    "client.region": "<aws_s3_region_code>"
  }
  ```
  
  - **Rest + MinIO**

  ```json
  {
    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",
    "s3.endpoint": "http://<minio_server>:<minio_port>",
    "s3.access-key-id": "<minio_user>",
    "s3.secret-access-key": "<minio_password>",
    "s3.path-style-access": "true",
    "client.region": "us-east-1"
  }
  ```