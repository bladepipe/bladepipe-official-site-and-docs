---
id: java_jdbc_types 
title: Explanation on Java Types 
---

In BladePipe, for DataSources or DataJobs that need to define schema, the **jdbcType** attribute of the column usually needs to be described, such as **message**, **Tunnel**, **file** and other data sources and related connections.

The jdbcType is the integer value corresponding to a type variable defined in **java.sql.Types**.

This page briefly lists the jdbcType and the corresponding integer value for reference.

### jdbcType - Integer Table
| jdbcType | Integer |
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
