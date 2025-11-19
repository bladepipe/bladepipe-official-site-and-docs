---
id: encrypt_data_when_sync
description: 介绍使用 CloudCanal 做同步时如何对特定数据做脱敏处理
title: 数据同步脱敏
---

## 简述

本文主要介绍使用 [CloudCanal](https://www.clougence.com?src=cc-doc-data-sync-masking) 做数据迁移同步时如何对特定数据做脱敏处理。

## 技术点

### 自定义代码

CloudCanal 允许用户上传业务代码到数据任务中，完成数据迁移、同步过程中数据处理的目的。

数据同步脱敏也是基于自定义代码实现，具备以下特点：

- 脱敏范围灵活，可选择任何一个或多个表字段
- 脱敏算法可依赖外部算法包
- 脱敏逻辑和策略可自定义

## 操作示例

### 脱敏代码开发
- 数据脱敏逻辑开发。[Gitee 上完整代码](https://gitee.com/clougence/cloudcanal-data-process/blob/master/data-transform/src/main/java/com/clougence/cloudcanal/dataprocess/datatransform/MaskColumn.java)
  ![custom_code_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_code_1.png)
  ![custom_code_2](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_code_2.png)
- 代码打包
  ![custom_code_3](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_code_3.png)
- 代码包位置
  ![custom_code_4](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_code_4.png)

### 安装 CloudCanal
- 下载、安装并激活 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-data-sync-masking)

### 任务创建
- **任务管理** > **创建任务**
- 选择源和目标数据库
  ![custom_task_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_task_1.png)
- 选择增量同步，并勾选数据初始化
  ![custom_task_2](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_task_2.png)
- 选择同步表
  ![custom_task_3](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_task_3.png)
- 选择列，右上角 **上传自定义代码** jar 包
  ![custom_task_4](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_task_4.png)
- 创建任务
  ![custom_task_5](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_task_5.png)
- 任务结构迁移、全量迁移、增量同步，正常运行
  ![custom_task_6](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_task_6.png)
### 验证数据
- 源端与目标端数据
  ![custom_data_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_data_1.png)
  ![custom_data_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_data_2.png)
- 对测试表造一些 DML 操作后，源端和目标端数据
  ![custom_data_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_data_3.png)
  ![custom_data_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/encrypt_data_when_sync/custom_data_4.png)

## 常见问题

### 目前还存在什么问题？

- 只支持 Java 语言，对于非开发同学不够友好，后续希望能支持常用脚本语言。
- 数据校验和数据订正暂时不支持，对于基于自定义代码实现的数据迁移同步，无法做到数据质量校验。

## 总结

主要介绍使用 [CloudCanal](https://www.clougence.com?src=cc-doc-data-sync-masking) 做数据迁移同步时数据脱敏工作。