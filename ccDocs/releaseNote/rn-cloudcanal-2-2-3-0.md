---
id: rn-cloudcanal-2-2-3-0
title: 2.2.3.0
---

## CloudCanal-2.2.3.0

发版时间:2022年5月16日  版本号: 2.2.3.0

### 新链路
- 支持 MySQL->Doris, Unique数据模型，结构迁移、全量、增量、数据校验、有限的DDL同步(加减列)
- 支持 PolarDBMySQL->StarRocks, PrimaryKey数据模型，结构迁移、全量、增量、数据校验、有限的DDL同步(加减列)
- 支持 PolarDBMySQL->Doris, Unique数据模型，结构迁移、全量、增量、数据校验、有限的DDL同步(加减列)
- 支持 MongoDB (副本集) -> TiDB(全量、增量)
- 支持 OceanBase->MySQL (结构迁移、全量、增量、数据校验、有限的DDL同步)
- 支持 OceanBase->StarRocks (PrimaryKey数据模型，结构迁移、全量、增量、数据校验)
- 支持 OceanBase->OceanBase (结构迁移、全量、增量、数据校验、有限的DDL同步)

### 新功能
- 支持新 where 过滤条件，时间字段取当前时间的上一个单位，如gmt_create > '__cc_last_hour_21:22',或者 gmt_create > '__cc_last_date_12:21:22'
- 支持源对端 PolarDBMySQL 自定义代码包
- 支持源端 Kafka 自定义代码包

### 优化
- 优化 MongoDB 源端全量初始化获取最大、最小 _id性能问题

### 问题修复
- 修复 MySQL 生成元数据时字段长度设置不对的问题(字符串、数字选择其一)
- 修复 RDB 源端全量迁移，数字主键大于  2 的 63 次方导致的位点上报问题和迁移无法结束问题
- 修复 MySQL->ClickHouse , unsigned 字段类型映射问题
- 修复 ClickHouse 对端写入 unsigned 数据溢出问题
- 修复 MySQL->ClickHouse 结构同步类型映射出错问题
- 修复 MongoDB 源端和目标端数据类型问题(Integer,Long,Double,Decimal)
- 修复控制台未显示 MySQL gtid 的问题(gtidMode为true的情况下)
- 修复前端添加虚拟列表格无法滚动的问题
- 修复前端添加虚拟列的时候对名称，类型，列值进行校验
- 修复前端卡片模式进入任务关联页面，删除主任务之后请求接口报错，现在直接跳转列表页面
- 修复 MongoDB 源端，任务详情查看库表映射不显示表的问题
- 修复任务详情页，全量阶段刷新，表格页码不跟着刷新的问题
- 修复任务列表页无法批量处理任务的问题
- 修复任务列表页批量处理任务时取消状态筛选的问题
- 修改添加机器高可用部署文档地址
- 修复创建任务列选择页面，筛选出来的数据为空会报错的问题
- 修复创建任务列选择页面，筛选有无 where 条件失败的问题
- 修复创建任务列选择页面，左侧库表之间出现空格的问题
- 修复 SQLServer 对端，创建任务选择表选择列的时候左边不显示 schema 的问题