---
id: add_azure_ds
title: Add Azure DataSources
description: It describes how to add an Azure data source as a connector in BladePipe.
---

BladePipe supports both **self-managed DataSources** and **cloud DataSources**. This page introduces how to add a **Azure DataSource** to BladePipe.

## Supported DataSources
 Currently, the supported DataSources include:     
 Azure for MariaDB, Azure for MySQL, Azure for PostgreSQL, Azure SQL.

## Procedure
1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. In the top navigation bar, click **DataSource**.
3. In the upper-right corner, click **Add DataSource**.
4. Select **Microsoft Azure** for Deployment and complete the following configuration.
     - Type: Select the desired Database type.
     - Region: Select according to the actual situation (not affect the use of DataSource).
     - Environment: Test Environment by default. Support for [Custom Environment](../system_manage/env_manage.md).
     - Method: manual by default.
     - Address: Select **Public** or **Private** network and enter the IP address.
     - Security Type: Select the corresponding authentication method and fill in the required information, such as account and password. Click **Test Connection**.
     - Description: Fill in the description for easy identification.
     - Physical Region: Select according to the actual situation (not affect the use of DataSource).
     - Extra Info: Different kinds of parameters can be set for different DataSources. Mouse over the ![](../../assets/add_datasource/self_maintain/1.png) icon to see the parameter description. To change it, click the ![](../../assets/add_datasource/self_maintain/2.png) icon in the **Modified Value** column, enter the value, and click **Submit**.
5. Click **Add Datasource** to add a datasource.
6. The **State** of the DataSource is **Created** in the DataSource list.