---
id: clear_worker_log
title: Clean Up Worker Logs
description: BladePipe allows to clean up the Worker logs to free up the storage.
---

## Overview

BladePipe uses the Logback to generate and manage logs.

In the architecture of BladePipe, each DataJob corresponds to an independent process instance. Limited by Logback's log management mechanism, log archiving and clearing are only performed when the process is started (that is, the DataJob is running). When a DataJob is stopped or deleted, its related logs will still remain on the Worker, and uncleaned logs will accumulate over time, often occupying a large amount of host storage space.

BladePipe allows to clean up the remaining Worker logs. By default, the log files in the following paths can be cleaned up:

- **`${user.home}`/logs/bladepipe/tasks/`${TaskName}`**(Unarchived DataJob Logs)
- **`${user.home}`/logs/bladepipe/tasks/`${ArchiveDate}`/`${TaskName}`**(Archived DataJob Logs)

:::tip
Log cleaning consumes certain system I/O resources. It is recommended to clean up logs when the the DataJob load is low to reduce the impact on your business.
:::

## Procedure

1. Navigate to **Sync Settings** > **Sync Worker**, and click **Workers** in the **Operation** column.
2. Select the Worker whose logs need to be cleaned up, and click **More** > **Clean worker log**. 
3. Select the date from which the logs are to be deleted (the default date is when the Worker is created), and click **Submit** to start the ConsoleJob. 
4. View the ConsoleJob results at the ConsoleJob details page.
    
:::info
Explanation of parameters:
- **Total delete log file**: Number of log files cleaned up
- **Total release space**: Storage space released after log cleaning up
- **File failed to delete**: Logs failed to delete (which need to be deleted manually)
:::

## FAQ

**Q: Which logs will not be deleted?**  
**A:** The following logs won't be deleted:
  - Logs of DataJobs that have been assigned to a Worker
  - Logs that have been archived in the past 60 days (corresponding to the value of MaxHistory in the configuration file)
  - Logs occupied by other processes

**Q: I want to adjust the log retention period or the path of logs to be deleted. How can I configure it?**  
**A:** Please pay attention to the following two log configuration files, both of which are named `logback.xml`: 
   - **/home/bladepipe/bladepipe/bladepipe/conf** （DataJob log configuration file）
   - **/home/bladepipe/bladepipe/worker/conf** (Worker log configuration file)

You can find the TaskLogRemover, which is disguised as an Appender, in the Worker log configuration file. The default configuration and its description are as follows:
   ```xml
    <appender name="TaskLogRemover" class="ch.qos.logback.classic.sift.SiftingAppender">
        <discriminator>
            <Key>destination</Key>
            <DefaultValue>%instance</DefaultValue>
        </discriminator>
        <sift>
            <appender name="FILE-${module}" class="com.clougence.cloudcanal.base.service.logback.TaskRemoverPretendAppender">
                <!-- It defines the regular expression used to match DataJob names. It doesn't need to be modified in most cases. -->
                <instancePattern>(canal.*?)_(FULL|CHECK|INCREMENT|REVISE)</instancePattern>
                <!-- It specifies the path for unarchived DataJob logs. -->
                <instanceDirNamePattern>
                    ${user.home}/logs/bladepipe/tasks/${destination}
                </instanceDirNamePattern>
                <!-- It specifies the path for archived DataJob logs. -->
                <rollingDirNamePattern>
                    ${user.home}/logs/bladepipe/tasks/%d{yyyy-MM-dd}/${destination}
                </rollingDirNamePattern>
                <!-- It specifies the maximum retention period for DataJob logs, that is, only the logs stored for more than ${maxHistory} days will be removed. -->
                <maxHistory>60</maxHistory>
            </appender>
        </sift>
    </appender>
   ```

:::info
Both `instanceDirNamePattern` and `rollingDirNamePattern` are consistent with the file path described by the PROJECT Appender in the DataJob log configuration file.
:::


**Q: How can I address the following exception shown in the ConsoleJob details:**
   ```text
   RuntimeException: last date to clean should before than maxHistory(60) which is set in sidecar logback.xml.
   ```

**A:** Cause: The specified date from which the logs are to be deleted doesn't satisfy the configuration of the minimum log retention period.

   Solution: Choose aother date to delete the logs stored for over 60 days or reduce the value of `<maxHistory>` in the configuration shown in Q2. 