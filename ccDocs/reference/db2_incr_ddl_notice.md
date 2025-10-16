---
id: db2_incr_ddl_notice
title: Db2 增量同步 DDL 执行要求
---
Cloudcanal 是基于 IBM DB2 的 CDC 复制技术， 将 Db2 数据库的增量更新数据同步到目标库中，但是 CDC 复制技术自身具有限制，请参见 [CDC复制技术所支持数据类型的限制](https://www.ibm.com/support/knowledgecenter/SSTRGZ_11.4.0/com.ibm.swg.im.iis.db.repl.sqlrepl.doc/topics/iiyrssubdatarestrict.html)。

由于 CDC 复制技术的限制，增量同步不支持 DDL 操作，但部分 DDL 操作可以在不停止任务的情况下去执行（具体执行需要遵循执行规则）。
   - 源端任务参数 **filterDDL** 需要设置为 **false**。
   - DDL 执行后需要重组表结构
```sql
call sysproc.admin_cmd('reorg table <schema>.<table>');
```

DDL 执行时，需严格按照以下表格的执行顺序，并且 CD 表和源表两步执行的间隔需要小于 **metaFreshCoolMs（**源端任务参数可配置，默认为 5000 毫秒)

| DDL 操作 | 执行顺序和要求 |
| --- | --- |
| 加列操作 | 1、源端对应的 CDC 表执行加列操作<br />2、源端表执行加列操作 |
| 减列操作 | 1、源端表执行减列操作<br />2、源端对应的 CDC 表执行减列操作 |
| 修改类型 | 1、源端表执行改列操作<br />（仅支持 A 类型修改为 B 类型，不支持精度、约束、默认值的改变的 DDL 同步） |