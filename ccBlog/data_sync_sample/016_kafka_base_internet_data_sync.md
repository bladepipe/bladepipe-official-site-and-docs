---
id: kafka_base_internet_data_sync
description: CloudCanal 数据同步相关案例-跨互联网数据互通 (Kafka)
title: 跨互联网数据互通 (Kafka)
date: 2022-12-21
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/kafka_base_internet_data_sync.png 
slug: /data_sync_sample/kafka_base_internet_data_sync
---

## 简介

本文主要介绍如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-kafka-internet-sync) 快速构建安全的混合云在线数据生态。

此方案具有以下几个特点
- 采用 Kafka 做数据中转
- 双边数据库都不开公网端口
- 互联网数据经过 SSL 加密
- 数据出口经过用户名、密码验证，并设置 ip 白名单加强安全管控

例子中的云数据库、云消息产品、自建数据库等都可以替换成自己当前环境的自建资源或各种云资源。

## 技术点
混合云数据生态主要的难点在于 **网络安全** ,部分用户因为传输同步数据较多，也比较在意**流量**资源损耗。

基于 CloudCanal 实现的方案，更加关注 **网络安全** 层面的问题，做到敏感资源 **网络单向隔离**、**链接鉴权**、**传输加密**。

下图简要示例了下 **互联网模式** 和 **专线模式** 数据上下云。
![截屏2021-08-04 下午7.48.27.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E6%88%AA%E5%B1%8F2021-08-04-%E4%B8%8B%E5%8D%887.48.27.png)

## 举个"栗子"

本文案例主要演示 **互联网模式** 的跨云数据迁移和同步,具体场景是如何进行数据上云(自建机房数据库-> 阿里云云数据库)，并且长期维持混合云数据体系。当然，相同的方案也可以反过来使用，只是在数据源选择外网内网有所区别。

### 安装 CloudCanal
- 请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/docs/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-kafka-base-internet-data-sync)。

### 准备 Kafka
- 在 [阿里云 Kafka 购买页](https://common-buy.aliyun.com/?commodityCode=alikafka_pre) 购买相应的 Kafka , 验证能力可先购买按量实例
  ![购买kafka_new.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E8%B4%AD%E4%B9%B0kafka_new.png)
  - 注意选择 **公网/VPC实例**，并且选择稍大的**公网流量**
- 部署实例请选择 **2.x.x** 版本，**最大消息大小** 建议调整稍大些(比如 4MB)
  ![部署kafka.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E9%83%A8%E7%BD%B2kafka.png)
- 进入实例，**创建 Consumer Group**，并记下名称
  ![创建consumer_group.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BAconsumer_group.png)

### 子账号授权并添加数据源
- 按照 [阿里云子账号准备](https://www.clougence.com/docs/reference/rds_mysql_ram_least_privilege) 文档，创建或者授权子账号，并**记住子账号 AK 和 SK** , 请授予基本的数据库访问权限 `AliyunRDSFullAccess`,`AliyunKafkaFullAccess`

- 分别添加**云下自建数据库**、**阿里云 RDS for MySQL**  和 **阿里云 Kafka**
  ![添加数据源.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E6%B7%BB%E5%8A%A0%E6%95%B0%E6%8D%AE%E6%BA%90.png)
  - 添加阿里云资源时，请在**第二步选择自动添加迁移机器白名单**
  - Kafka 用户名密码可以在 阿里云 Kafka 实例详情页最底下安全配置处找到
  - TLS 文件请从 [阿里云Kafka根证书下载](https://code.aliyun.com/alikafka/aliware-kafka-demos/raw/master/kafka-java-demo/vpc-ssl/src/main/resources/kafka.client.truststore.jks?file=kafka.client.truststore.jks)

### 开始造数据
- 源端数据库为云下自建数据库，IUD 20:60:20,  1~2 KB/条数据, 每个表 2~4 并发, 每个事务 2~4 条变更, RPS 1000 左右。
  ![造数据.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E9%80%A0%E6%95%B0%E6%8D%AE.png)

### 使用 CloudCanal 创建云下数据同步任务
- 选择数据源，并选择合适的选项
  ![创建云下任务_1.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E4%BA%91%E4%B8%8B%E4%BB%BB%E5%8A%A1_1.png)
  - 1 处请选择**云下或自建**集群
  - 2 ，3 源端自建数据库选择**内网**，对端 Kafka 选择**公网**
  - 4 处可以选择兼容 **开源 Canal 消息格式**，或自带的 **CloudCanal 消息格式**
-  选择数据同步，并勾选初始化数据
   ![创建云下任务_2.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E4%BA%91%E4%B8%8B%E4%BB%BB%E5%8A%A1_2.png)
-  选择表，此处不要修改对端 topic，按照默认规则生成即可。
   ![创建云下任务_3.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E4%BA%91%E4%B8%8B%E4%BB%BB%E5%8A%A1_3.png)
-  选择列，可以**裁剪**掉一部分列不进行迁移同步
   ![创建云下任务_4.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E4%BA%91%E4%B8%8B%E4%BB%BB%E5%8A%A1_4.png)
- 创建确认
  ![创建云下任务_5.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E4%BA%91%E4%B8%8B%E4%BB%BB%E5%8A%A1_5.png)
- 任务正常流转运行中
  ![云下任务运行中.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E4%BA%91%E4%B8%8B%E4%BB%BB%E5%8A%A1%E8%BF%90%E8%A1%8C%E4%B8%AD.png)

### 使用 CloudCanal 创建云上迁移同步任务
- 选择数据源，并选择合适的选项
  ![创建云上任务_1.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E4%BA%91%E4%B8%8A%E4%BB%BB%E5%8A%A1_1.png)
  - 1 请选择 ECS 上客户端所在集群
  - 2，3 都选择内网分别访问 Kafka 和 RDS for MySQL
  - 4 填写之前在 Aliyun Kafka  控制台创建的 Consumer Group
  - 5 选择和云下任务一致的消息格式
- 中间略过表、列选择，一路点击下一步即可
- 创建确认
  ![创建云上任务_5.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E4%BA%91%E4%B8%8A%E4%BB%BB%E5%8A%A1_5.png)
- 两者任务正常运行中
  ![任务正常运行.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E4%BB%BB%E5%8A%A1%E6%AD%A3%E5%B8%B8%E8%BF%90%E8%A1%8C.png)
- **云上消费任务创建**因为是在**云下任务运行**之后，所以需要将云上消费任务位点**回溯**到云下任务创建之前，以涵盖全部数据。
  ![重置云上任务位点_1.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E9%87%8D%E7%BD%AE%E4%BA%91%E4%B8%8A%E4%BB%BB%E5%8A%A1%E4%BD%8D%E7%82%B9_1.png)
  ![重置云上任务位点_2.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E9%87%8D%E7%BD%AE%E4%BA%91%E4%B8%8A%E4%BB%BB%E5%8A%A1%E4%BD%8D%E7%82%B9_2.png)

### 校验下数据
此次案例数据较多，我们偷个懒，直接打开 RDS for MySQL 公网链接，用云下 CloudCanal 集群链接过来直接做一个数据校验 （生产环境禁止！！！！）

- 为了让校验结果更加清晰，停止**造数据**
- 申请 RDS for MySQL 公网地址，并修改 CloudCanal 数据源管理页面对应实例的公网地址
  ![RDS开公网.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/rds%E5%BC%80%E5%85%AC%E7%BD%91.png)
- 创建校验任务
  ![创建数据校验任务_1.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E6%A0%A1%E9%AA%8C%E4%BB%BB%E5%8A%A1_1.png)
  - 1  选择**云下或本地集群**
  - 2 ，3 源端自建 MySQL 选择内网访问，目标端 RDS for MySQL 选择外网访问
- 选择任务类型为**数据校验**
  ![创建数据校验任务_2.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E6%A0%A1%E9%AA%8C%E4%BB%BB%E5%8A%A1_2.png)
- 中间略过表、列选择，一路点击即可
- 创建确认
  ![创建数据校验任务_5.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E6%A0%A1%E9%AA%8C%E4%BB%BB%E5%8A%A1_5.png)
- 任务运行完毕，结果正确
  ![创建数据校验任务_6.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/16_kafka_base_internet_data_sync/%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E6%A0%A1%E9%AA%8C%E4%BB%BB%E5%8A%A1_6.png)

## 总结
本文简要介绍如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-kafka-internet-sync) 快速构建一条安全、跨互联网数据迁移同步方案。

此方案有以下特点：
- 双边数据库都不开公网端口
- 互联网数据经过 SSL 加密
- 数据出口经过用户名、密码验证，并设置 ip 白名单加强安全管控