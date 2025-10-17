---
id: create_db_sync_job
title: Whole Database 
description: introduces how to create a Whole Database DataJob using MySQL to MySQL synchronization as an example.
---

The Whole Database DataJob supports tables and data that are added, modified, or deleted during synchronization.

This article introduces how to create a Whole Database DataJob using MySQL to MySQL synchronization as an example.

## Procedure
1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. In the top navigation bar, click **DataJob**.
3. Click **Create DataJob**.
4. Select the source and target DataSource.
5. Select **Advanced** of source DataSource and select **Full Database** option. Click **Next Step**.
6. Select Incremental and select Full Data option. Click **Next Step**.
7. Tables are not selectable but actions (insert, update, delete, etc.) can be selected.
8. Click **Create DataJob**.
    :::info
    By default, the schema that don't exit in target will be migrated.
    :::
9. On the left side of DataJob Details page, click **View** next to **Mapping**. The information of the tables will be shown.
10. (Optional) When DataJob is in Incremental, click **Functions** > **Modify Subscription** in the upper-right corner of DataJob Details page, and you can add or reduce the tables to be replicated.
