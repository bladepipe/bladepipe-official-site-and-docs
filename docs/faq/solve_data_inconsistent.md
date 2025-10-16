---
id: solve_data_inconsistent
title: Data Inconsistencies
description: There are various reasons why data inconsistencies may occur during data migration and synchronization. 
---
This article outlines some of the possible causes and steps for troubleshooting.

## Possible Causes
There are various reasons why data inconsistencies may occur during data migration and synchronization. Some of the possible causes include:
- Data constraint conflicts, such as conflicts with primary keys, unique keys, foreign keys, etc. on the peer end.
- Data writes on the peer end.
- Custom code is used for data processing or data filtering.
- Bugs triggered by special scenarios or loads.
- Bugs triggered by special data or structures.

## Troubleshooting Steps
1. Identify 1-5 data points that are confirmed to be inconsistent.
2. Compare the table structures on the source and target databases to determine if there may be constraint conflicts.
3. Check if the data exists in the audit logs of the source database (optional) or change logs (such as binlog).
4. Check if the data exists in the apply_commit.log file of the BladePipe DataJob.
   :::info
   The apply\_commit.log file is saved in the Worker container: /home/bladepipe/logs/bladepipe/tasks/`${taskName}`_`${taskType}`/   

   The log format is as follows: Event Type$Database Name$Schema Name$Table Name$Primary Key Value$Response Time (in ms) of the Target DataSource.
   :::
5. Check if the data exists in the audit logs of the target database (optional) or change logs (such as binlog).
6. Use the logs obtained from the steps 3, 4, and 5 to confirm whether the data has been correctly read and written to the peer. If there were no issues during the read and write process, suspect that non-BladePipe system data was written to the peer.
7. If the logs obtained from steps 3, 4, and 5 indicate that the data was not written, suspect that there may be constraint conflicts, special loads, or special structures causing data loss.
8. If the logs obtained from step 3 indicate that the data was read but the logs obtained from steps 4 and 5 do not show any record of the data being written, it may be a tool bug. Please contact the support group for feedback.
9. If the logs obtained from steps 3, 4, and 5 do not show any record of the data, there may be issues with the data write process on the source end.
10. If the above steps are unsuccessful in resolving the issue, please join the support group and provide a description of the problem, error logs, or screenshots.

