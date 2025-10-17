---
id: change_job_setting
title: Modify DataJob Settings
---
This article describes how to modify the DataJob settings in BladePipe.

## Procedure
1. Go to the DataJob Details page, and click **Functions** > **Modify DataJob Setting**. 
2. Modify the settings according to your needs.

| Setting | Description |
| :-- | :-- |
| **Clean Target before Full** | If enabled, the data in the Target will be automatically removed before Full Data DataTask each time a scheduled DataJob is executed, or when a one-time DataJob is rerun. |
| **Recreate Target Schema** | If enabled, the schemas in the Target will be recreated automatically each time a scheduled DataJob is executed or a one-time DataJob is rerun. If a new table is added in the DataJob after you modify the subscription, the schema of it in the Target will also be recreated automatically. |
| **Scheduled Check Crontab Expr** (for scheduled DataJobs) | Modify the Cron string to change the schedule for the DataJob. | 