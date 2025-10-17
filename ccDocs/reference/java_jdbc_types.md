---
id: java_jdbc_types 
title: Java Types 说明
---

CloudCanal 中，需要定义 Schema 信息的数据源或任务，常常需要描述列的 **jdbcType** 属性，如**消息**、**Tunnel**、**文件**等数据源以及相关链路。

此 jdbcType 即 **java.sql.Types** 中定义的某一个类型变量对应的整数值。

本文档简要罗列类型和该整数值关系，以便参考。

### jdbcType 与数字对照表
| jdbcType | 对应数字 |
| :-- | :-- |
| unknown | 10000 |
| ARRAY | 2003 |
| BIGINT | -5 |
| BINARY | -2 |
| BIT | -7 |
| BLOB | 2004 |
| BOOLEAN | 16 |
| CHAR | 1 |
| CLOB | 2005 |
| DATALINK | 70 |
| DATE | 91 |
| DECIMAL | 3 |
| DISTINCT | 2001 |
| DOUBLE | 8 |
| FLOAT | 6 |
| INTEGER | 4 |
| JAVA_OBJECT | 2000 |
| LONGVARBINARY | -4 |
| LONGVARCHAR | -1 |
| NULL | 0 |
| NUMERIC | 2 |
| OTHER | 1111 |
| REAL | 7 |
| REF | 2006 |
| SMALLINT | 5 |
| STRUCT | 2002 |
| TIME | 92 |
| TIMESTAMP | 93 |
| TINYINT | -6 |
| VARBINARY | -3 |
| VARCHAR | 12 |
