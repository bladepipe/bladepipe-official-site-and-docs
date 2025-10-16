---
id: privs_for_tdengine
title: TDengine 需要的权限
description: CloudCanal 在做 TDengine 源端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 TDengine 作为源端数据源迁移或同步数据时，CloudCanal 所需的账号权限。如果使用 root 超级用户，则无需进行以下步骤。

## 作为源端
- **全量迁移**：迁移库表的 **READ** 权限。
- **增量同步**：
  - 迁移库表的 **READ** 权限。
  - 增量同步需要创建 Topic，可以交由 CloudCanal 自动创建，自动创建需要用户拥有该库的读权限；或者通过有权限的用户手动创建，并赋予该用户订阅权限。    
  示例：
    1. 通过 root 或任意有该库读权限的用户创建 Topic，topic name 为 任务名称\_increment\_库名\_表名，具体可以参考 [Query Topic](https://docs.tdengine.com/advanced-features/data-subscription/#query-topic)。
    - 超级表查询 Topic：
    ```sql
    create topic if not exists canal4wr61rj2jdq_increment_us_power_sall_types as select ts,t,a,a1,b,b1,c,d,e,f,f1,g,g1,h,i,j from us_power.sall_types where tbname in ('s2') and location in ('California.SanJose');
    ```
    - 子表/普通表查询 Topic：
    ```sql
    create topic if not exists canal4wr61rj2jdq_increment_us_power_s1 as select ts,t,a,a1,b,b1,c,d,e,f,f1,g,g1,h,i,j from us_power.s1;
    ```
    2. 赋予用户订阅权限。
    ```sql
    GRANT SUBSCRIBE ON topic_name TO user_name;
    ```