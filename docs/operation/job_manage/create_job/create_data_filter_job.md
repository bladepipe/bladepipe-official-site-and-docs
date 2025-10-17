---
id: create_data_filter_job
title: Data Filtering
description: introduces how to create a DataJob with data filtering
---

BladePipe supports data filtering for Incremental DataJobs to address different scenarios and requirements.

This article introduces how to create a DataJob with data filtering using MySQL to MySQL synchronization as an example.

## Procedure
1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. In the top navigation bar, click **DataJob**.
3. Click **Create DataJob**.
4. Select the source and target DataSource, and click **Next Step**.
5. Configure the DataJob settings, and click **Next Step**.
6. Select the tables to be synchronized and filter actions.
7. Select the tables which you want to set data filtering conditions. In the upper-right corner above the list, click **Batch Operation > Set Data Filtering**.
8. Enter the correct WHERE condition by filling in the content after the **WHERE** keyword.
9. Click **Create DataJob** to create the data filtering DataJob.
