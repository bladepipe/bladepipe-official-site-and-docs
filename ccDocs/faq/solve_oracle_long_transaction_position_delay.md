---
id: solve_oracle_long_transaction_position_delay
title: Oracle 源端长事务导致位点延迟持续增大
description: 本文介绍使用 Oracle LogMiner 进行增量同步时，因源端长事务导致位点延迟持续增大的排查和处理方法
---

本文介绍 CloudCanal 使用 Oracle LogMiner 进行增量同步时，因源端事务长时间未提交或未回滚，导致位点延迟持续增大的排查和处理方法。

## 适用版本

所有 CloudCanal 版本。

## 现象描述

任务同时出现以下现象：

- **位点延迟**持续增大，达到数小时甚至更久。
- **最新提交延迟**很小，通常只有数秒。

这通常表示 Oracle 源端存在长时间未提交或未回滚的事务。其他已经提交的事务仍可继续同步，但为了保证任务重启后不丢失数据，安全位点不能越过该事务的开始位置。

## 问题排查

### 1 找到最早未完成的事务

在增量同步日志中执行以下命令，查找最早未完成事务的信息：

```bash
grep "Minimum tx id:" <increment-log-file> | tail -n 1
```

记录日志中的事务 ID（XID）、开始 SCN 和时间。日志格式如下：

```text
Minimum tx id:<XID>,scn:<START_SCN>,ts:<TIMESTAMP>
```

如果同一个 XID 长时间不变，执行以下命令检查该事务的事件：

```bash
grep "transactionId='<XID>'" <increment-log-file>
```

正常事务应以 `COMMIT` 或 `ROLLBACK` 结束。如果日志中只有 `START` 和 DML 事件，说明 CloudCanal 尚未收到该事务的最终状态。

继续执行以下命令，确认日志采集仍在向前推进：

```bash
grep "Query redo, currScn:" <increment-log-file> | tail -n 1
grep "operation='COMMIT'" <increment-log-file> | tail -n 1
```

如果 SCN 持续增加，并且其他事务不断提交，说明采集链路正常，延迟由未完成的长事务导致。

### 2 在 Oracle 中确认事务

使用日志中记录的开始 SCN 查询事务和对应会话：

```sql
SELECT s.inst_id,
       s.sid,
       s.serial#,
       s.username,
       s.status,
       s.machine,
       s.program,
       s.module,
       s.sql_id,
       s.prev_sql_id,
       s.last_call_et,
       t.xidusn,
       t.xidslot,
       t.xidsqn,
       t.start_scn,
       t.start_time,
       t.used_ublk,
       t.used_urec
FROM gv$transaction t
JOIN gv$session s
  ON s.inst_id = t.inst_id
 AND s.taddr = t.addr
WHERE t.start_scn = <START_SCN>;
```

重点关注以下字段：

- `STATUS`：`INACTIVE` 只表示会话空闲，不表示事务已经提交。
- `LAST_CALL_ET`：会话空闲时间，单位为秒。
- `MACHINE`、`PROGRAM` 和 `MODULE`：用于定位发起事务的业务应用或开发机器。
- `USED_UBLK` 和 `USED_UREC`：用于粗略评估事务回滚量。

### 3 查询最后执行的 SQL

如果查询结果中的 `SQL_ID` 为空，使用 `PREV_SQL_ID` 查询该会话最后执行的 SQL：

```sql
SELECT inst_id,
       sql_id,
       parsing_schema_name,
       module,
       action,
       sql_fulltext
FROM gv$sql
WHERE inst_id = <INST_ID>
  AND sql_id = '<PREV_SQL_ID>';
```

## 解决方法

优先联系对应的业务负责人，由原连接执行 `COMMIT` 或 `ROLLBACK`，正常结束事务。

如果连接已经废弃，并且业务负责人确认可以放弃该事务的修改，可由 DBA 执行以下命令终止会话并触发回滚：

```sql
ALTER SYSTEM KILL SESSION '<SID>,<SERIAL#>,@<INST_ID>' IMMEDIATE;
```

:::caution
终止会话会中断该连接并回滚未提交的修改。执行前必须确认会话身份、业务影响和回滚量，并由具备相应权限的 DBA 操作。
:::
