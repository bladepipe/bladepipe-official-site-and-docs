---
id: job_group
title: Group DataJobs
---

BladePipe supports DataJob groups, where multiple DataJobs with the same business purpose can be placed in one DataJob group for convenient management and operation.


## Overview

A DataJob group is a group of DataJobs that are related to each other in terms of business or function. Currently, it supports two types: **Business DataJob Group** and **Parallel DataJob Group**.


### Business DataJob Group

In a Business DataJob Group, DataJobs are not required to be closely related. They can be defined as DataJobs for a particular team, for a particular application, or with a similar function.

For example, if multiple DataJobs consume messages from the same topic list in the same message middleware, these DataJobs can be grouped into one DataJob group.


### Parallel DataJob Group

When creating a Parallel DataJob Group, you have to set the **Parallel** parameter, and the number of DataJobs added in the Group cannot exceed this value.

When a DataJob is added to the Parallel DataJob Group, BladePipe automatically assigns a sequence number to the DataJob. When DataJob runs, data is filtered automatically based on **hash(primary key) mod Parallel value == current DataJob sequence number**.

By filtering data, each DataJob only consumes the data it is assigned to, enhancing data replication performance.


:::info
Please make sure that the number of DataJobs within the Parallel DataJob Group is consistent with the set **Parallel** value. If the number of DataJobs in the group is fewer than the set **Parallel** value, there will be sequence number(s) left to be assigned to DataJob(s). As a result, the data that should be replicated in a DataJob associated with the left sequence number will be missing.
:::

## Limits
- A single DataJob group is currently not allowed to hold more than 10 DataJobs.
- DataJobs that already exist in a DataJob group cannot be added repeatedly.
- If a DataJob is deleted, the association with the DataJob group will be automatically deleted.
- The number of DataJobs in a Parallel DataJob group is not allowed to exceed the set **Parallel** value.
- The **Parallel** value of a Parallel DataJob group is not allowed to exceed the maximum number of DataJobs in a single DataJob group (currently 10).


## Procedure
### Create a DataJob Group
1. Navigate to the **DataJob** page, and click **Advanced Features** > **Manage DataJob Group** in the upper-right corner.
2. In the upper-right corner of the page, click **Create DataJob Group**.
3. Select the type of a DataJob Group and enter the information, then create the DataJob Group.

### Join a DataJob Group
1. Navigate to the **DataJob** page, and click **More** > **Join Group** in the **Operation** column.
2. Select the DataJob Group, and click **Submit**.
3. You can check the DataJobs in the Group on the **Manage DataJob Group** page.

### Remove from a DataJob Group
On the **Manage DataJob Group** page, click **Remove** in the **Operation** column, and the DataJob is disassociated with the Group.
