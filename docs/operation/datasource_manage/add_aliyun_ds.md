---
id: add_aliyun_ds
title: Add Alibaba Cloud DataSources
description: It describes how to add a Alibaba Cloud data source as a connector in BladePipe.
---
BladePipe supports both **self-managed DataSources** and **cloud DataSources**. This page introduces how to add a **Alibaba Cloud DataSource** to BladePipe.

## Supported DataSources
Currently, the supported DataSources include:     
ADB for MySQL, ClickHouse, ElasticSearch, ADB for PG, Kafka, MongoDB, RDS for MySQL, PolarDbMySQL, PolarDB-X, RDS for PostgreSQL, RabbitMQ, Redis, RocketMQ, SQL Server.

## Procedure
### Create an AccessKey pair
Create a RAM user for BladePipe to access and operate the cloud databases, and create an AccessKey pair with reference to [Resource Access Management](https://www.alibabacloud.com/help/en/ram/?spm=a2c63.p38356.0.0.5dfe450elSPQ2c). In general, BladePipe requires the following basic permissions for the RAM user when a Alibaba Cloud DataSource is added:
- Get DataSource list via Alibaba Cloud OpenAPI.
- Add Workers into the whitelist via Alibaba Cloud OpenAPI.

### Grant Permission to Access Alibaba Cloud DataSource
1. In the top navigation bar, click **Settings**.
2. In the left-side navigation pane, click **Third-party**. 
3. Enter the AccessKey ID and AccessKey Secret with the permissions to call the OpenAPI of DataSources.
4. Click **Authorized**.
   :::info
   If you once made such configuration, the original configuration will be overwritten and updated to the current configuration. 
   :::
5. If you do not want BladePipe to store the AccessKey ID and AccessKey Secret, you can open the window again after adding the DataSource and click **Remove Access**.

### Add a DataSource
1. In the top navigation bar, click **DataSource**.
2. In the upper-right corner, click **Add DataSource**.
2. Select **Alibaba Cloud** for Deployment and complete the following configuration.
     - Type: Select the desired Database type.
     - Region: Select according to the actual situation (not affect the use of DataSource).
     - Environment: Test Environment by default. Support for [Custom Environment](../system_manage/env_manage.md).
     - Method: AccessKey. If you don't configure the AccessKey ID and AccessKey Secret in **Third-party**, a dialogue box will pop up asking for the AK/SK.
3. The list below shows the DataSources that the RAM user has the permission to view.
4. Select the DataSources to be added on the left side, and click ![](../../assets/add_datasource/aliyun_rds/1.png) icon to add the DataSources to the right side, then click **Next Step** after confirming that there is no error.  
5. Select **Security Type** and enter the information such as account and password.
6. Enter the AK/SK in the **AccessKey ID / AccessKey Secret** column.
7. Click **Add Datasource** to add a datasource.
8. The **State** of the DataSource is **Created** in the DataSource list.
9. Click **More** > **Add Whitelist** in the Operation column of the DataSource list. Select the cluster and click **Submit**.
    :::info
    If you do not add a cluster into the whitelist, when you test the connection during DataJob creation, it shows **Connection Failed** and prompt you to add a cluster into the whitelist.
    :::

