---
id: one_cluster_13k_task_test
description: 本文主要介绍 CloudCanal 单集群 1300 个同步任务系统健康状况
title: 单集群 1300 个实时同步任务验证
---

## 背景

对于将数据作为重要生产资料的公司来说，超大规模的数据迁移同步系统( **1k、5k、10k 条同步任务**)是刚需。

本文以此为出发点，介绍近期 CloudCanal 所做的一个容量测试：在单个 [CloudCanal](https://www.clougence.com?src=cc-doc-data-verification-and-correction) 集群上创建 1300 实时任务，验证系统是否健康。

这个健康度主要包括 **同步任务是否运行正常**、**页面功能操作是否顺畅**、**容灾能力是否可靠** 三个方面。

当然这个测试也带给我们一些新的思路和改进点，让产品更加健壮。


## 资源与环境

本次测试资源以云资源为主，详单如下：

|资源用途|资源规格|
|-------------------|-------------------------------------------------------------------------|
|console | 2 个 2core8GB 虚拟机 (阿里云 ecs.u1-c1m4.large)|
|元数据库 |1 个 8core16GB MySQL 8.0 (阿里云 RDS mysql.n2m.xlarge.2c)|
|sidecar |8 个 12core96GB 虚拟机 (阿里云 ecs.u1-c1m8.3xlarge)|
|业务库 |2 个 4core8GB MySQL 8.0 (阿里云 RDS mysql.n2m.large.2c)|
|负载均衡|1 个 4 层负载均衡 (sidecar->console 7007 端口，阿里云 NLB) <br /> 1 个 7 层负载均衡 (CloudCanal 页面操作，console 8111 端口，阿里云 ALB)|

## 测试步骤
### 安装 console
- 根据 [tgz 安装文档](../productOP/tgz/firstinstall_with_tgz.md)初始化环境并安装
- [激活 CloudCanal](../license/license_use.md),因社区版任务数限制,我们临时申请了一个 2000 个同步任务的 license
  ![console](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/console.png)

### 安装节点
- **机器管理** > **机器列表** > **添加机器**，选择自动安装
  ![auto_install](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/auto_install.png)
- 等待节点安装完成
  ![auto_install_result](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/auto_install_result.png)

### 业务数据库准备
- 两个  RDS 分别创建源端 src_test_a 和 src_test_b 库，以及 **target_db_0~target_db_999 1000个目标库**。
- 一个任务源端和目标分别是 src_test_a/src_test_b -> target_db_(i)
  ![target_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/target_1.png)
  ![target_2](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/target_2.png)
- 源端各创建 1 张表，并各生成 1000 条数据
  ![source_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/source_1.png)
  ![source_2](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/source_2.png)

### 基于 OpenAPI 创建任务
- 设置任务参数模版 **LE_256MB_TASK** ，以便生成任务时自动调整
  ![task_config_template](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/task_config_template.png)

- 获取 AccessKey 和 SecretKey 以便调用 API 创建任务
  ![ak_sk_fetch](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/ak_sk_fetch.png)

- 向元数据库插入 **128MB 规格**数据
  ![prepare_spec_data](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/prepare_spec_data.png)

- 编写调用 OpenAPI 代码，1 次 100 个任务创建, [代码参考](https://gitee.com/clougence/cloudcanal-openapi-sdk/blob/master/src/test/java/com/clougence/cloudcanal/openapi/sdk/DataJobApiHugeJobAction.java)
  ![data_job_create_base_api](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/data_job_create_base_api.png)

## 健康状况
- 任务正常运行，任务查看/新建/启停/删除、任务调度、监控告警、页面功能查看均表现正常顺滑
  ![datajob_status](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/datajob_status.png)

- 控制台负载偏高，因为只用了 2 core 节点，需提升为 4 core
  ![console_status](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/console_status.png)

- 节点负载正常
  ![worker_status](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/worker_status.png)

- 元数据库负载正常，qps 偏高，需要优化任务数据（状态、位点等）上传频率和方式
  ![db_status](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/13k/db_status.png)

## 可改进点
- 任务数据（状态/位点等）上报频率、种类需要优化，对元数据库压力较高
- 监控指标依赖的 promethus 需要进行调优

## 总结

本次容量测试是 CloudCanal 针对单集群 1000 个以上任务的场景验证，从中找到一些可能存在的问题并逐步改进，为大型客户大规模使用做好基本的验证与后续优化。