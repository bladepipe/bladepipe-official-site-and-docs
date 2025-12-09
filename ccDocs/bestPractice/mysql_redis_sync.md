---
id: mysql_redis_sync
description: 本文主要介绍如何使用 CloudCanal 快速构建一条 MySQL 到 Redis 数据迁移同步链路
title: MySQL 到 Redis 同步
---

## 简述

本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-redis-sync) 如何快速构建一条 MySQL 到 Redis 数据迁移同步链路,方案特点包括:

- 支持 Redis 单节点、主备、分片集群
- 支持设置写入 Redis 缓存过期时间

## 技术点

### 自动适配 Redis 部署形态

Redis 分片集群和非分片集群，写入数据方式存在差异。

CloudCanal 通过获取 Redis 参数自动识别其部署形态，并调整写入方式，使迁移同步任务正常运行。

### 支持缓存过期

Redis 写入数据时可设置缓存过期时间。CloudCanal 创建任务时，可选设置过期时间（秒），在任务进行数据迁移同步时，自动设置，达成业务目标。

## 操作示例

### 准备 CloudCanal
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-mysql-redis-sync)

### 添加数据源
- 本案例采用  **阿里云云市场购买的 1 个 Redis 集群**, 以及一个自建的 MySQL 库
- 登录 CloudCanal 平台 ，**数据源管理** -> **添加数据源** , 添加 2 个数据源
- Redis 如果为一个集群，可填写所有节点或所有 master 节点，以英文逗号分割

  ![mysql_redis_sync_add_ds](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_add_ds.png)

### 创建任务
- **任务管理**->**新建任务**
- 选择源端和目标端数据源和相关信息
- 目标端数据源高级配置，可设置 **缓存超时时间**，\<=0 表示不设置
- 点击**下一步**

  ![mysql_redis_sync_first_step](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_first_step.png)

- 选择 **数据同步**，并且勾选 **全量数据初始化**，点击 **下一步**

  ![mysql_redis_sync_second_step](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_second_step.png)

- 选择需要迁移同步的表
- 因为 Redis 内数据 key 由源端数据主键构成，故无主键表数据迁移同步会不正常，所以不建议勾选
- 点击 **下一步**

  ![mysql_redis_sync_third_step](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_third_step.png)

- 选择需要迁移同步的列
- 点击 **下一步**

  ![mysql_redis_sync_fouth_step](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_fouth_step.png)

- 确认创建任务，并正常运行

  ![mysql_redis_sync_final_step](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_final_step.png)

  ![mysql_redis_sync_data_job_normal](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_data_job_normal.png)

### 测试并验证数据
- 造增删改数据

  ![mysql_redis_sync_make_data_load](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_make_data_load.png)

- 停止造数据
- 创建校验任务，结果一致

  ![mysql_redis_sync_data_correct](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_redis_sync/mysql_redis_sync_data_correct.png)

## 常见问题

### Redis 主备切换了怎么办？

- CloudCanal 使用了 JedisCluster 进行写入，能自动感知主备变化

### Redis 更换节点怎么办？

- 可手动修改任务配置的节点信息，重启任务继续即可

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-redis-sync) 快速构建一条 MySQL 到 Redis 数据迁移同步链路，助力用户业务查询加速目标。