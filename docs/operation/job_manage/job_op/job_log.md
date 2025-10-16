---
id: job_log
title: View DataJob Logs
---

The DataJob Details page provides the ability to view logs online, making maintenance DataJob simpler.

## Schema Migration Log

Go to DataJob Details page. Click **Schema Migration** tab > **Log**.   

The log contains descriptive information about the current log and the file path where it resides.

## DataTask Log

Go to the DataJob Details page. Click **Full Data**/**Incremental** tab > **Log**.   

The DataTask logs that can be viewed online mainly include the following types:
  - **`${taskName}`.log:**  Task logs that begin with the DataTask name, containing core log information about the running of the task. Exceptions during task execution are also primarily recorded in this log.
  - **apply_commit.log:** Submit logs for BladePipe DataTask. The logs record information about the primary keys of events successfully written to the destination, source database tables, and write time.

