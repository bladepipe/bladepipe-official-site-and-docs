---
id: create_retl_job
title: Scheduled Scan
description: This topic describes how to create a scheduled scan (rETL) sync DataJob in BladePipe.
---

**Reverse ETL (Scheduled Scan)** continuously pulls data from the source and writes it to the target on a fixed schedule. This approach is ideal for:

- Data sources that lack CDC (Change Data Capture) logging capabilities.
- Scenarios requiring data refreshes at specific intervals (like every *N* seconds or minutes).
- Near real-time synchronization where slight delays are acceptable.

## Supported Pipelines

| Source -> Target | Sync Mode | Pre-execution Action (Optional) | Incremental Field<b><sup>1</sup></b> Type |
|---:|---:|---:|---:|
| StarRocks -> MySQL | Scheduled Scan | Truncate Target<b><sup>2</sup></b>, Rename and Create<b><sup>3</sup></b> | DateTime |
| Doris -> MySQL | Scheduled Scan | Truncate Target, Rename and Create | DateTime, High-Precision DateTime |
| Redshift -> MySQL | Scheduled Scan | Truncate Target | Timestamp | 
| Elasticsearch -> Elasticsearch | Scheduled Scan | Truncate Target | Date, Nanosecond Date, ES Timestamp |
| OssFile -> PostgreSQL | Scheduled Scan | Truncate Target<b><sup>4</sup></b> | / |
| SshFile -> PostgreSQL | Scheduled Scan | Truncate Target | / |
| S3File -> PostgreSQL | Scheduled Scan | Truncate Target | / |
| Yuque -> PostgreSQL | Scheduled Scan | Truncate Target | / |

:::info
1. The Incremental Field requires a time-type column. Once configured, BladePipe automatically extracts newly added or updated records where the time is "after the last scan". This achieves incremental synchronization. (**Note: This method cannot sync hard-deleted records from the source.**)
2. **Truncate Target**: BladePipe empties the target table before starting the current scan. This is useful for periodic full table migrations (such as report results).
3. **Rename and Create**: BladePipe executes **`rename table A to A_arc_timestamp`** and **`create table A like A_arc_timestamp`** before starting the current scan. This is also useful for periodic full table migrations.
4. For file-based sources, "Truncate Target" **only deletes the corresponding file data** rather than emptying the entire table.
:::

## Operations

### Select Data Sources
1. Select the source and target data sources, and click **Test Connection**.
2. Select the specific schema you want to synchronize.

### Configure DataJob
1. On the **DataJob** page, select **Incremental** as the **DataJob Type**.
2. Select **Periodic Scan** as the **Sync Mode**, and set the parameters:
   - **Interval**: The interval between each scan in seconds (defaults to 300 seconds).
   - **Pre-execution Action**: The action you want to perform before starting a scan.
   
### Select Data Tables
1. On the **Tables** page, select the tables you want to migrate.
2. Click **Open Action Blacklist** to filter out specific DML/DDL operations as needed.

### Process Data
1. On the **Data Processing** page, select the columns you want to migrate.
2. Configure the **Incremental Field** as needed. If you skip this, BladePipe performs a full table scan every time.
   - **Set individually**: Click **Operation > Incremental Field** to set it for a single table.
   - **Set in batches**: Click **Batch Operation > Incremental Field** to apply the setting to multiple tables.

### Confirm Creation
1. On the **Creation** page, verify all DataJob information.
2. Click **Create DataJob**.

## Recommended Settings

- **Interval**: Start with a larger interval (such as 300 seconds). You can decrease it later once the pipeline runs stably.
- **Pre-execution Action**: 
  - If you want to perform an incremental sync (by setting an Incremental Field on the Data Processing page), select **None**.
  - If the tables are small and you need to replicate source deletions, skip the Incremental Field and select **Truncate Target** instead.
- **Incremental Field**: Prioritize time fields that are **sortable, clearly incremental, and comparable**.

## FAQs

**Q: Why can't I see the "Incremental Field" option?**

Your current data pipeline does not support this feature, or the selected field type is not supported.

**Q: Can I skip configuring an Incremental Field?**

Yes, if your data pipeline supports it. The system will generally perform a full scan or replication on every cycle.

**Q: How do I know if the DataJob is running in RETL mode?**

A distinct "clock" icon (Scheduled Scan) appears in the DataJob list and DataJob details page.
