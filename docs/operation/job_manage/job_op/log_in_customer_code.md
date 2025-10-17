---
id: log_in_customer_code
title: Logging in Custom Code
description: Introduces how to print logs in BladePipe Custom Code
---
This article introduces how to print logs in BladePipe Custom Code.

## Procedure
1. Add the following logger to the Custom Code.
   ```
   protected static final Logger customLogger = LoggerFactory.getLogger("custom_processor");
   ```
   ![custom_code_log_3](../../../assets/create_process_job/custom_code_log_3.png)
2. Upload Custom Code jar and run DataJob.
3. After the DataJob is running, view the log content in the BladePipe Cloud ( **Details** > **Log** > **custom_process.log** ), or go to the DataTask log directory to view the log content in log file.
  ![custom_code_log_1](../../../assets/create_process_job/custom_code_log_1.png)

