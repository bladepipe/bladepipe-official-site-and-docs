---
id: mysql_loop_data_sync
description: 本文主要介绍如何使用 CloudCanal 快速构建 MySQL 双向同步任务
title: MySQL 双向数据同步
---

## 简述

本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-twoway-sync) 如何实现 MySQL 双向同步并防循环，方案特点包括:

- 不依赖 GTID
- 不依赖事务的顺序，可并行
- 对端操作减少
- 对云数据库 (MySQL) 的普遍支持
- 支持库表列裁剪、映射以及自定义数据处理

## 技术点

### 防冲突标记

GTID 防冲突标记包含 MySQL 的 server_uuid 和事务号。CloudCanal 使用新方案，即 binlog 数据标记。

DML 在 binlog 中正常的事件顺序依次为 QueryEvent(TxBegin)、TableMapEvent、WriteRowEvent(IUD)、QueryEvent(TxEnd)，如果需要对同步的数据打上标记，需要对 WriteRowEvent 做标记，根据当前的认知，这需要通过修改引擎代码来实现。

经过研究，ClouGence 注意到 MySQL binlog 中一个描述变更行 statement 的事件 RowsQueryLogEvent，这个事件只在打开 MySQL binlog_rows_query_log_events 参数才会出现，而这个事件可以带上执行 SQL 的注释。

为此，ClouGence 设计了 CloudCanal 写入对端时自动带上 /\*ccw\*/ 标记，这样在 RowsQueryLogEvent 的 SQL 语句中也会出现该标记。在双向同步中，如果遇到这个标记，过滤即可。

新的 DML 事件顺序变成了 QueryEvent(TxBegin)、TableMapEvent、RowsQueryLogEvent、WriteRowEvent(IUD)、QueryEvent(TxEnd)。

## 操作示例

### 准备 CloudCanal
下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-mysql-twoway-sync)。

### 添加数据源

本案例采用 **阿里云 RDS for MySQL**。为测试便利起见，2 台数据库都位于杭州区域。


1. 在 RDS **实例详情** > **参数设置** 中，设置 **binlog_rows_query_log_events** 为 on。
2. 登录 CloudCanal 平台，点击 **数据源管理** > **新增数据源**，逐步添加准备的数据库。建议对数据源进行恰当描述，防止配置正反链路时，识别错数据库。


### 创建正向同步任务
:::info
双向同步中，正向任务一般指源端有数据，目标端无数据的链路，涉及对端数据初始化。
:::

1. 点击 **同步任务** > **创建任务**。
2. 进入源&目标设置页面，选择源端和目标端数据源和相关信息，点击 **下一步**。

    ![loop_sync_2](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/2.png)
   
1. 进入功能配置页面，进行以下配置：
    1. 任务类型选择 **增量同步**，并且勾选 **全量初始化**。
    2. **是否同步 DDL** 选择 **是**。
    3. 不开启 **自动启动任务**，以便创建任务后设置双向同步参数。
    4. 点击 **下一步**。

    ![loop_sync_3](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/3.png)
 
4. 进入表& action 过滤页面，设置需迁移的表，并点击 **下一步**。
5. 进入数据处理页面，设置需迁移的列，并点击 **下一步**。
6. 进入创建确认页面，点击 **创建任务**。
7. 进入任务详情页，点击 **功能列表** > **修改参数**。
   1. 设置 **目标数据源配置** 页签下的 ***deCycle*** 参数为 true。
   2. 点击 **生效配置** 并启动任务。

    ![loop_sync_4](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/4.png)

### 创建反向同步任务
1. 点击 **同步任务** > **创建任务**。
2. 进入源&目标设置页面，选择源端和目标端数据源（**请和正向任务所选数据源对调**）和相关信息，点击**下一步**。
   ![loop_sync_5](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/5.png)

3. 进入功能配置页面，进行以下配置：
    1. 任务类型选择 **增量同步**，并去除 **全量初始化** 勾选。
    2. **是否同步 DDL** 选择 **是**。
    3. 不开启 **自动启动任务**，以便创建任务后设置双向同步参数。
    4. 点击 **下一步**。
  
    ![loop_sync_6](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/6.png)

4. 进入表& action 过滤页面，设置需迁移的表，并点击 **下一步**。
5. 进入数据处理页面，设置需迁移的列，并点击 **下一步**。
6. 进入创建确认页面，点击 **创建任务**。
7. 进入任务详情页，点击 **功能列表** > **修改参数**。
    1. 设置 **目标数据源配置** 页签下的 ***deCycle*** 参数为 true。
    2. 此处和 GTID 方案有较大差别，**不需要开启** ***enableTransaction*** 和 ***gtidMode***。
    3. 点击 **生效配置** 并启动任务。 

    ![loop_sync_7](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/7.png)

1. 任务正常运行。
  ![loop_sync_8](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/8.png)

### 测试
- 源端数据库做数据变更，正向任务监控有变更，反向任务没有（即无循环）。
  ![loop_sync_9](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/9.png)
  ![loop_sync_10](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/10.png)
  ![loop_sync_11](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/11.png)

- 目标端数据库做数据变更，反向任务监控有变更，正向任务没有（即无循环）。
  ![loop_sync_12](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/12.png)
  ![loop_sync_13](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/13.png)
  ![loop_sync_14](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/loop_data_sync/14.png)


## 常见问题

### 新方案有什么不利因素？

第一，需要修改 MySQL 全局变量 binlog_rows_query_log_events 为 on，这个参数默认是关闭的，相比 GTID 普遍打开，这是不利因素。

第二，binlog 增长相对快速，可能带来磁盘增长烦恼，清理 binlog 周期会变短。

第三，对于 CloudCanal 而言，增加了语句文本的内存占用，导致资源损耗加大。

不过考虑到新方案大幅提升了性能和稳定性，ClouGence 认为利大于弊。

### 新方案除了 MySQL > MySQL 还支持哪些链路？

目前 ClouGence 还未深入研究其他数据源是否存在 DML 语句或者数据可标记，但标记数据这一实现路径是可探索的方向之一。

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-twoway-sync) 构建 MySQL > MySQL 双向同步，助力用户实现异地多活、灾备业务目标。 