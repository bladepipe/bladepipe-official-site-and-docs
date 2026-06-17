---
id: prepare_for_oracle_blob_sync
title: Oracle BLOB Synchronization
description: This page describes the required BladePipe task parameters for Oracle BLOB synchronization and the performance impact after BLOB synchronization is enabled.
---

This page describes the required configurations before synchronizing Oracle BLOB columns in BladePipe, and the performance impact after BLOB synchronization is enabled.

## Applicable Scenario

Enable the configurations in this document when the Oracle source tables contain BLOB columns and the BLOB content needs to be synchronized during incremental synchronization.

In Oracle LogMiner, a BLOB update is usually not represented as a single regular `UPDATE`. Instead, it is split into multiple log events, such as locating the target row, locating the target column, and writing BLOB fragments. BladePipe needs to identify these events, restore the final BLOB value after the transaction is committed, and then write the value to the target.

:::info
If a task does not need to synchronize Oracle BLOB columns, we do not recommend enabling BLOB synchronization.
:::

## Prerequisites

1. Complete the Oracle LogMiner preparation, including archive logging, supplemental logging, and required privileges. See [Oracle LogMiner](prepare_for_oracle_logminer.md).
2. Make sure the BLOB columns in the source tables are included in the task mapping.
3. Make sure the task runtime node has enough local disk space and disk I/O capacity for temporary files generated during BLOB fragment assembly.

## Enable BLOB Synchronization

Oracle BLOB incremental synchronization requires both the task-level parameter and the source datasource parameter to be enabled.

<table>
<thead>
    <tr>
        <th>Parameter Location</th>
        <th>Parameter Name</th>
        <th>Value</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Task Core Configuration</td>
        <td><code>useTypedField</code></td>
        <td><code>true</code></td>
        <td>Enables typed field transfer. The file reference generated after BLOB assembly is passed through the pipeline as a typed field.</td>
    </tr>
    <tr>
        <td>Source Datasource Configuration</td>
        <td><code>oraLmLobEnable</code></td>
        <td><code>true</code></td>
        <td>Enables Oracle LogMiner BLOB event parsing, so BladePipe can identify BLOB locator and write events.</td>
    </tr>
</tbody>
</table>

### Procedure

1. Go to the task details page.
2. Click **Function List** > **Modify Parameters** in the upper-right corner.
3. In **Task Core Configuration**, set `useTypedField` to `true`.
4. In **Source Datasource Configuration**, set `oraLmLobEnable` to `true`.
5. Click **Apply Configuration** in the upper-right corner and confirm the changes.
6. If the page indicates that the task must be restarted, restart the task or wait for the system to restart it automatically.

:::tip
We recommend completing the configuration before the task runs for the first time. If you enable BLOB synchronization for an existing task, make sure the task has restarted before continuing incremental synchronization.
:::

## Performance Impact

After Oracle BLOB synchronization is enabled, BladePipe performs additional processing for BLOB-related log events and assembles BLOB fragments locally. Compared with synchronizing regular columns only, the task may be affected in the following ways.

### Higher Source Log Parsing Cost

After `oraLmLobEnable=true` is enabled, BladePipe identifies BLOB locator and write events from LogMiner results, and parses each BLOB write fragment.

If the source database has frequent BLOB updates, LogMiner may return more events, and the task may consume more CPU resources in log fetching, SQL parsing, and event conversion.

### Possible Latency Increase in Long Transactions

BLOB writes depend on transaction context. To avoid losing BLOB locator information or rollback information when a long transaction crosses LogMiner windows, BladePipe retains the required transaction window in BLOB synchronization scenarios.

If the source database has large transactions that remain uncommitted for a long time, incremental parsing may need to look back to earlier SCN ranges. Some logs may be scanned repeatedly, and task latency may increase.

### Higher Local Disk I/O and Space Usage

BLOB fragments are not kept in JVM memory for a long time. Instead, they are assembled into local temporary files on the task runtime node. This reduces JVM memory pressure for large objects, but introduces local disk write overhead.

Disk usage is mainly related to:

- Total BLOB data size in uncommitted transactions.
- Number of BLOB rows and columns updated in the same transaction.
- Source-side BLOB update frequency.
- Accumulated BLOB changes during task latency.

After a transaction is committed, the temporary file continues to flow through the write pipeline. If the transaction is rolled back, BladePipe cleans up the corresponding invalid temporary files.

### Longer Target Write Time

BLOB columns are usually larger than regular columns. Writing them to the target consumes more network bandwidth and target-side write resources. If a single record contains a large BLOB column, or if many BLOB updates occur in a short period of time, target write time may increase and further affect incremental task latency.

## Recommendations

1. Enable `oraLmLobEnable=true` only for tasks that need to synchronize Oracle BLOB columns.
2. Before enabling BLOB synchronization, make sure the task runtime node has enough disk space, and use disks with good I/O performance when possible.
3. For tables with frequent BLOB updates, large BLOB values, or many long transactions, evaluate task latency, disk usage, and target write time in a test environment first.
4. After enabling BLOB synchronization in production, monitor incremental latency, disk space on the task runtime node, disk I/O, Oracle archive log retention, and target-side write load.
5. If latency increases significantly, consider excluding unnecessary BLOB columns from synchronization, or increase the task specification and disk capacity of the runtime node.
