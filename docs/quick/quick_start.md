---
id: quick_start
title: Quickstart (On-Premise)
description: Learn how to get started with BladePipe Community and Enterprise. Follow this quickstart to deploy BladePipe locally and run a secure On-Premise data integration task.
---
BladePipe On-Premise offers two local deployment editions: **Community (free)** and **Enterprise**. Both editions allow you to keep BladePipe and all your data securely within your own network environment. 

Follow this quickstart to create your first DataJob and perform database synchronization using **BladePipe On-Premise** in just a few steps.

## Step 1: Install BladePipe

Deploy BladePipe by following the instructions in [Install All-In-One (Docker)](../productOP/onPremise/installation/install_all_in_one_docker.mdx). 

Alternatively, you can deploy BladePipe using the [Kubernetes](../productOP/onPremise/installation/install_all_in_one_k8s.mdx) or [Binary](../productOP/onPremise/installation/install_all_in_one_binary.md) methods.


## Step 2: Add a DataSource

1. In the top navigation bar, click **DataSource**.
2. Click **Add DataSource**.
3. Configure the following information:
   - **Deployment**: Choose **Self Maintenance** or a cloud provider.
   - **Type**: Select your database type. 
   - **Host**: Enter the IP Address and port necessary to connect to your [DataSource](../intro/product_nouns.md#datasource).
   - **Account & Password**: Enter the username and password.
4. Click **Test Connection** to verify your database connection. 
5. Click **Add DataSource**.
   
   ![Add Self-Managed DataSource MySQL](../assets/quickstart/on-premise/1.png)

## Step 3: Create a DataJob

1. In the top navigation bar, click **DataJob**.
2. Click **Create DataJob**. 
3. Select your added MySQL instance as both the Source and Target, and click **Test Connection**. 
4. Select the databases to be synchronized, and click **Next**. 
   
   ![Select Databases for Synchronization](../assets/quickstart/on-premise/3.png)
5. Choose **[Incremental](../intro/product_nouns.md#incremental)** as the **[DataJob](../intro/product_nouns.md#datajob)** type, and select **Initial Load**. Click **Next**. 
   
   ![Select Incremental and Full DataJob Type](../assets/quickstart/on-premise/4.png)
6. Select the tables you want to sync, and click **Next**. 
   
   ![Select Tables for Database Synchronization](../assets/quickstart/on-premise/5.png)
7. Select all required columns, and click **Next**. 
   
   ![Select Columns for Data Integration](../assets/quickstart/on-premise/6.png)
8. Click **Create DataJob**. 
9. Navigate to the DataJob list page to monitor the progress of your **DataJob**.
   
   ![Monitor DataJob Synchronization Progress](../assets/quickstart/on-premise/7.png)


## Step 4: Verify the Data

1. Perform **insert**, **update**, and **delete** operations in your source database.
2. Verify that the changes dynamically replicate to the target database and ensure data consistency.
