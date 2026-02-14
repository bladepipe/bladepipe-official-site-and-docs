---
id: privs_for_tdengine
title:  Required Privileges for TDengine
description: To migrate or sync data from or to TDengine instances, BladePipe requires certain user privileges to be granted.
---

To migrate or sync data from or to TDengine instances, BladePipe requires certain user permissions to be granted. If you are the root user, you can skip the following steps.

## As the Source
- **Full Data**: **READ** permission for the databases and tables to be migrated.
- **Incremental**：
  - **READ** permission for the databases and tables to be migrated.
  - To sync data, a topic has to be created. The topic can be created automatically by BladePipe, and the user should have **READ** permission for this database. Or the user with proper permissions can create the topic mannually, and the user should have subscription permission.     
  e.g.:
    1. The root user or a user with READ permission of this database create a topic. The topic name format is DataJobName\_increment\_DatabaseName\_TableName. For more information, see [Query Topic](https://docs.tdengine.com/advanced-features/data-subscription/#query-topic)。
    - Topic for supertable query:
    ```sql
    create topic if not exists canal4wr61rj2jdq_increment_us_power_sall_types as select ts,t,a,a1,b,b1,c,d,e,f,f1,g,g1,h,i,j from us_power.sall_types where tbname in ('s2') and location in ('California.SanJose');
    ```
    - Topic for subtable/normal table query:
    ```sql
    create topic if not exists canal4wr61rj2jdq_increment_us_power_s1 as select ts,t,a,a1,b,b1,c,d,e,f,f1,g,g1,h,i,j from us_power.s1;
    ```
    2. Grant the user subscription permission.
    ```sql
    GRANT SUBSCRIBE ON topic_name TO user_name;
    ```