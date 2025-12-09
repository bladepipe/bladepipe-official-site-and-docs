---
id: loop_data_sync_advance
description: CloudCanal 数据同步相关案例-双向数据同步(进阶)
title: 双向数据同步(进阶)
date: 2023-05-28
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/loop_data_sync_advance.png 
slug: /data_sync_sample/loop_data_sync_advance
---

## 简述
本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mysql-twoway-sync) MySQL 双向同步新版本功能,特点包括:

- 不依赖 GTID
- 不依赖事务的顺序，可并行
- 对端操作减少
- 对云数据库(MySQL)的普遍支持
- 支持库表列裁剪、映射以及自定义数据处理

## 技术点

### 防冲突标记

GTID 防冲突标记包含 MySQL 的 server_uuid 和事务号，新方案我们选择 binlog 数据标记。

DML 在 Binlog 中正常的事件顺序依次为 QueryEvent(TxBegin)、TableMapEvent、WriteRowEvent(IUD)、QueryEvent(TxEnd)  , 如果需要对同步的数据打上标记，除非对 WriteRowEvent 做标记，否则没有可下手的地方。但是要达成这个目标，以我们的认知来看，除非改引擎代码。

然后，我们盯上了 MySQL binlog 中一个描述变更行 statement 的事件 RowsQueryLogEvent ，这个事件只在打开 MySQL binlog_rows_query_log_events 参数才会出现，而这个事件可以带上执行 sql 的注释。

为此，我们设计了 CloudCanal 写入对端时自动带上 /\*ccw\*/ 标记，这样在 RowsQueryLogEvent 的 sql 语句中也会出现该标记，在双向同步中，如果遇到这个标记，过滤即可。

新的 DML 事件顺序变成了 QueryEvent(TxBegin)、TableMapEvent、RowsQueryLogEvent、WriteRowEvent(IUD)、QueryEvent(TxEnd)。

## 操作示例

### 准备 CloudCanal
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-mysql-twoway-sync),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)

### 添加数据源
- 本案例采用  **阿里云 RDS for MySQL**,  为测试便利起见，2台数据库都位于 hangzhou 区域
- 在 RDS **实例详情**->**参数设置**，设置 **binlog_rows_query_log_events** 为 on
- 登录 CloudCanal 平台 ，**数据源管理** -> **添加数据源**  , 将准备的数据库逐步添加进来
- 建议对数据源进行描述修改，防止配置正反链路时，识别错数据库
  ![loop_sync_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_1.png)

### 创建正向同步任务
- **任务管理**->**新建任务**
- 双向同步中，正向任务一般指源端有数据，目标端无数据的链路，涉及对端数据初始化
- 第一个页面，选择源端和目标端数据源和相关信息，点击**下一步**
  ![loop_sync_2](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_2.png)

- 第二个页面
  - 选择 **数据同步**，并且勾选 **全量数据初始化**
  - 勾选 **DDL 同步**
  - **置灰自动启动**，以便创建任务后设置双向同步参数
  - 点击 **下一步**
  
  ![loop_sync_3](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_3.png)

- 第三个、第四个页面，表、列映射裁剪...此处省略，点击 **下一步**
- 第五个页面
  - 点击**确认创建**
  
  ![loop_sync_4](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_4.png)
  
- **任务详情** -> **参数设置**
  - 设置目标数据源配置 **deCycle** 参数为 true
  - 此处和 GTID 方案有较大差别, **不需要开启 enableTransaction 和 gtidMode**
  - 生效配置并启动

  ![截屏2021-10-28 下午2.26.17.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/21_loop_data_sync_advance/%E6%88%AA%E5%B1%8F2021-10-28-%E4%B8%8B%E5%8D%882.26.17.png)

### 创建反向同步任务
- **任务管理**->**新建任务**
- 第一个页面，选择源端和目标端选择数据源（**请和正向任务所选数据源对调**）和相关信息，点击**下一步**
  ![loop_sync_5](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_5.png)

- 第二个页面
  - 选择 **数据同步**，并去除**全量数据初始化**勾选
  - 勾选 **DDL 同步**
  - **置灰自动启动**，以便创建任务后设置双向同步参数
  - 点击 **下一步**

  ![loop_sync_6](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_6.png)

- 第三、四个页面，表、列映射裁剪...此处省略，点击 **下一步**
- 第五个页面，点击**确认创建**
- **任务详情** -> **参数设置**
  - 设置目标数据源配置 **deCycle** 参数为 true
  - 此处和 GTID 方案有较大差别, **不需要开启 enableTransaction 和 gtidMode**
  - 生效配置并启动

  ![loop_sync_7](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_7.png)

- 任务正常运行
  ![loop_sync_8](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_8.png)

### 测试
- 源端数据库做数据变更，正向任务监控有变更，反向任务没有(即无循环)
  ![loop_sync_9](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_9.png)
  ![loop_sync_10](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_10.png)
  ![loop_sync_11](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_11.png)

- 目标端数据库做数据变更，反向任务监控有变更，正向任务没有(即无循环)
  ![loop_sync_12](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_12.png)
  ![loop_sync_13](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_13.png)
  ![loop_sync_14](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/loop_data_sync/loop_sync_14.png)
## 常见问题

### 新方案有什么不利因素

需要修改 MySQL 全局变量 binlog_rows_query_log_events 为 on ,这个参数默认是关闭的，相比 GTID 普遍打开，这是不利因素。

再者 ， binlog 增长相对快速，可能带来磁盘增长烦恼，清理 binlog 周期会变短。

最后，对于 CloudCanal 而言，增加了语句文本的内存占用，导致资源损耗加大。

不过相对于新方案带来的好处-性能和稳定性大幅度提升，我们认为这些损失是值得的。

### 新方案除了 MySQL->MySQL 还支持哪些链路？

其他数据源是否存在 DML 语句或者数据可标记，我们还没来得及深入研究，不过这个实现方向(数据打标)我们认为是比较友好的。

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mysql-twoway-sync) 构建 MySQL->MySQL 双向同步链路新功能。