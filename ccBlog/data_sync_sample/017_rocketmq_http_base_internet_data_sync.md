---
id: rocketmq_http_base_internet_data_sync
description: CloudCanal 数据同步相关案例-跨互联网数据互通 (RocketMQ)
title: 跨互联网数据互通(RocketMQ)
date: 2023-02-18
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/rocketmq_http_base_internet_data_sync.png 
slug: /data_sync_sample/rocketmq_http_base_internet_data_sync
---

## 操作示例

### 准备 CloudCanal
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-rocketmq-http-sync),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)

### 添加数据源
* 本案例采用 MySQL 和阿里云 RocketMQ
* 登录 CloudCanal 平台 ，数据源管理 -> 添加数据源 , 将准备的数据库逐步添加进来
* 建议对数据源进行描述修改，防止配置正反链路时，识别错数据库
  RocketMQ 的 topic 创建要选择分区顺序消息
  ![53bdb8eb-d4cc-45cb-b114-ea8fb0dc7755-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0017/1.png)

### 创建 MySQL->RocketMQ 同步任务
* 任务管理->新建任务
* 任务同步一般指源端有数据，目标端无数据的链路，涉及对端数据初始化
* 第一个页面
  ·选择源端和目标端数据源和相关信息，点击下一步
* 第二个页面
  ·选择全量/增量等功能配置相关信息，点击下一步
* 第三个、第四个页面
  ·表、列映射裁剪…此处省略
  ·点击 下一步

* 确认创建
  ![696865b5-1121-4ba4-a4e5-8617302148cf-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0017/2.png)

* 任务详情 -> 参数设置
  ·设置目标 DATASOURCE 参数配置 **nameServer** 参数为阿里云RocketMQ 的 **HTTP** 协议客户端公网访问接入点
  ·设置目标 DATASOURCE 参数配置 protocol 为 **HTTP**
  ·生效配置并启动
  ![8d7ed86c-d152-4e29-a6da-3f84c25135f0-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0017/3.png)

### 创建RocketMQ->MySQL同步任务

* 任务管理->新建任务
* 任务同步一般指源端有数据，目标端无数据的链路，涉及对端数据初始化
* 第一个页面
  ·选择源端和目标端数据源和相关信息，点击下一步
* 第二个页面
  ·选择全量/增量等功能配置相关信息，点击下一步
* 第三个、第四个页面
  ·表、列映射裁剪…此处省略
  ·点击 下一步
* 确认创建
  ![1473637d-5475-4061-baf6-5571fd74e9f1-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0017/4.png)

* 任务详情 -> 参数设置
  ·设置源端 DATASOURCE 参数配置 nameServer 参数为阿里云RocketMQ 的 HTTP 协议客户端公网访问接入点
  ·设置源端 DATASOURCE 参数配置 protocol 为 HTTP
  ·生效配置并启动
  ![dfb7282d-31b4-4db2-9598-a057106dbcb0-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0017/5.png)
