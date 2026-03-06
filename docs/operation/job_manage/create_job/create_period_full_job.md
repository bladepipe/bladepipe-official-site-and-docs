---
id: create_period_full_job
title: Scheduled Full Data
description: BladePipe supports migrating data periodically based on the configured interval. Users can build ETL pipelines easily and run them on a scheduled basis.
---

This article introduces how to create a scheduled Full Data DataJob using MySQL to MySQL data migration as an example.

## Create DataJob

1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. In the top navigation bar, click **DataJob**.
3. Click **Create DataJob**.
4. Select the source and target DataSource. Click **Next Step**.
5. Select Full Data for DataJob Type. **DO NOT** select Incremental option, but select **Periodic**, and set the cycle. Then click **Next Step**.
6. Select the tables and columns.
7. Click **Create DataJob** button.

## Manage DataJob
In the DataJob list, the Period Full Data DataJob displays the next execution time, and the system will automatically start executing the DataJob when it is time.

To execute the DataJob immediately, click **Execute Immediately**, and the DataJob will start in two minutes.