---
id: job_params
title: Modify Parameters
---

BladePipe supports modifying the runtime parameters for DataJob. DataJob parameters are closely related to its performance and operation mechanisms. Many of BladePipe's capabilities are also enabled by setting DataJob parameters.

## Procedure
1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. There are four types of DataJob parameter configuration, which can be viewed by switching between tabs:
    - **Core**: mainly consists of some configuration items that are not related to the DataSource when the DataJob is running.
    - **Source**: contains some configurations that are related to the source DataSource or reading data.
    - **Target**: contains some configurations that are related to the target DataSource or writing data.
    - **Mapping**: contains configurations related to the mapping relationship between the database objects of the Source and Target.
3. Select a non-read-only configuration. Click the edit button, and enter the value. You can refer to the Reference column for guidance.
4. Click **Save** in the upper-right corner to confirm the parameters and their new values. Also, confirm whether you need to restart the DataJob after modifying.
5. Click **Submit**. If there are configurations that require the DataJob to be restarted while it is currently running, the DataJob will be **automatically restarted** to apply the new configuration. If there are no configurations that require a restart, the new configurations will take effect immediately.
