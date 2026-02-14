---
id: create_regex_table_job
title: Regular Expression
description: Users can define the tables to be replicated using regular expressions, allowing moving hundreds of thousands of tables with one expression.
---
BladePipe supports selecting tables by **regular expression** when creating DataJobs. The capability is applicable to **schema migration**, **full data load** and **incremental sync**. The expression is allowed to be changed in editing subscription.

This page explains how to create an expression-based DataJob.

## Select DataSources
1. Go to **DataJob** > **Create DataJob** to start the DataJob creation workflow.
2. Configure the source and target databases. Select the source and target instances, then click **Test Connection** for each.
3. Choose the database or schema. Some pipelines support multiple schemas.
4. Click **Next Step**.

## Configure the DataJob
1. In the Properties page, choose the DataJob type. By default, Incremental is selected with Full Data enabled.
2. Select the DataJob specification. The default specification works for most scenarios.
3. Click **Next Step**.

## Select Tables
1. In the Tables page, choose a schema on the left panel.
2. In the top-left dropdown, select **Use Regular Expression** and enter a regular expression for tables to be selected. To add additional expressions, click **Add Expression** at the bottom-left.
    :::info
    - The default expression is **.*** , which means that all tables under the selected schema are to be migrated.
    - If the pipeline supports CREATE/DROP TABLE DDL sync, tables will be added or removed automatically during synchronization.
    - Target table names are mapped 1:1 from the source by default. You can also manually specify a target table name. If so, all matching source tables will be consolidated into that target table.
    :::
3. In the upper-right corner of the table list, click **Open Action Blacklist** to filter DML/DDL events.
5. Click **Batch Operation** to configure action blacklist, edit target table names, or apply mapping rules in bulk.
6. Click **Next Step**.


## Confirm DataJob Creation
1. Review the DataJob information on the page.
2. Confirm that everything is correct and click **Create DataJob**.

## View the DataJob
1. On the DataJob list page, you can track DataJob progress.
2. Click **Details** in the operation column to view the specific information.