---
id: db2_incr_ddl_notice
title: Db2 DDL Execution Requirements
---
BladePipe, which is based on IBM DB2's CDC replication technology, synchronizes incremental update data from Db2 databases to target databases. However, CDC replication technology itself has limitations, please refer to the [General data restrictions for SQL Replication](https://www.ibm.com/support/knowledgecenter/SSTRGZ_11.4.0/com.ibm.swg.im.iis.db.repl.sqlrepl.doc/topics/iiyrssubdatarestrict.html).

Due to the restrictions of CDC replication, Incremental does not support DDL operations, though some DDL operations can be executed without stopping the task (the specific execution needs to adhere to execution rules).
- The source DataJob configuration **filterDDL** needs to be set to **false**.
- The table structure needs to be reorganized after executing the DDL operation.
```sql
call sysproc.admin_cmd('reorg table <schema>.<table>');
```

When executing DDL, strict adherence to the following execution order is required, and the interval between executing the CD table and source table in two steps must be less than **metaFreshCoolMs** (The configuration of the source DataJob can be modified, with a default of 5000 milliseconds)

| DDL Operation | Execution Order and Requirements                                                                                                                                                                      |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Add Column    | 1. Execute the add column operation on the CDC table corresponding to the source table.<br />2. Execute the add column operation on the source table.                                                 |
| Delete Column | 1. Execute the delete column operation on the source table.<br />2. Execute the delete column operation on the CDC table corresponding to the Source.                                                 |
| Modify Type   | 1. Execute the modify column operation on the source table.<br />(Only Type A can be modified to Type B. DDL synchronization does not support changes in precision, constraints, and default values.) |
