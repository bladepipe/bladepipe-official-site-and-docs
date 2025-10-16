---
id: quick_start_byoc
title: Quickstart (BYOC)
description: This page introduces how to get started with BladePipe BYOC
---

BladePipe Cloud includes two modes: SaaS Managed and BYOC. BYOC allows you to deploy BladePipe on your own cloud insfrastructure. This page describes how to move data using **BladePipe BYOC** in just a few steps.

## Step 1: Install BladePipe

Follow the instructions in [Install Worker (Docker)](../productOP/byoc/installation/install_worker_docker.md) / [Install Worker (Binary)](../productOP/byoc/installation/install_worker_binary.md) to install a BladePipe [Worker](../intro/product_nouns.md#worker).

## Step 2: Add a DataSource
Here we use a self-managed MySQL DataSource as an example. For more details, see [Add Self-managed DataSource](../operation/datasource_manage/add_self_maintain_ds.md). For the other supported DataSources, see [Supported DataSources](../dataMigrationAndSync/datasource_version.md).
1. In the top navigation bar, click **DataSource**.
2. In the upper right corner of the page, click **Add DataSource**.
3. Configure the following information:
   - **Deployment**: Choose **Self Maintenance**.
   - **Type**: Choose the datasource type. Here we choose **[MySQL](../dataMigrationAndSync/connection/mysql2)**.
   - **Address**: Fill out the endpoint to connect to the [DataSource](../intro/product_nouns.md#datasource).
   - **Account & Password**: Fill out the username and password.
4. Click **Test Connection** to verify the connection. 
5. Click **Add DataSource**.
![](../assets/quickstart/cloud/1.png)

## Step 3: Payment (Optional)
1. Add a card.
    1. Navigate to **Settings** > **Payment** page.
    2. Click **Add New Card**.
    3. Enter card info and save.
2. Subscribe BladePipe.
    1. Navigate to **Settings** > **Payment** page.
    2. Choose one card already added.
    3. Click **Subscribe**.

    :::info
    A new user of BladePipe will receive a voucher by default, so a new user can skip this step.

    Please note that after the voucher is used up, the DataJobs will be suspended within 24 hours. To avoid DataJob interruption, please add a payment card and subscribe to BladePipe service in time.
    :::

## Step 4: Create a DataJob
Here we take a MySQL-MySQL data synchronization as an example. For more details, see [Create General DataJob](../operation/job_manage/create_job/create_full_incre_task.md).

1. In **BladePipe**, click **DataJob** in the top navigation bar.
2. In the upper right corner, click **Create DataJob**. 
![](../assets/quickstart/cloud/2.png)
3. Select the added MySQL instance as both the Source and Target, and click **Test Connection**. Then click **Next Step**.
![](../assets/quickstart/cloud/3.png) 
4. Choose **[Incremental](../intro/product_nouns.md#incremental)** as the **[DataJob](../intro/product_nouns.md#datajob)** type, and select **[Full Data](../intro/product_nouns.md#full-data)**. Then click **Next Step**. 
![](../assets/quickstart/cloud/4.png)
5. Choose the **tables** you want to sync, then click **Next Step**. 
![](../assets/quickstart/cloud/5.png)
6. Select all columns, then click **Next Step**. 
![](../assets/quickstart/cloud/6.png)
7. Click **Create DataJob**. 
8. Go to the DataJob list page to check the progress of the **DataJob**.
![](../assets/quickstart/cloud/7.png)

## Step 5: Verify the Data
1. **Insert**, **update**, and **delete** data in the source database.
2. Check whether the data in the target database is consistent with the data in the source.
