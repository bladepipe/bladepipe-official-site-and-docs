---
id: rn-cloudcanal-1-1-0
title: 1.1.0
---

## CloudCanal-1.1.0

发版时间:2021年9月24日
版本号: 1.1.0

### 新链路

1. 支持 MySQL 到 Oracle & MongoDB 链路 (结构迁移、全量、增量、校验)
2. 支持 MySQL & PostgreSQL & Oracle 到 Kudu 链路 (version >= 1.6)
3. 支持 PostgreSQL 到 MySQL 链路 (结构迁移、全量、增量、校验)
4. 支持 PolarDB MySQL 到 Greenplum 链路 (结构迁移、全量、增量、校验)

### 新特性

1. 支持增量订正数据 (暂且开放 MySQL -> MySQL)
2. 支持添加数据源时测试连通性(自建数据源)
3. 支持精确设置任务增量位点(e.g., MySQL 文件位点)
4. 支持 Kafka 压缩消息(压缩算法可选择)
5. 支持全量迁移任务重跑
6. 支持阿里云 MongoDB & Redis 数据源无缝添加(自动获取信息、加白名单等)
7. 支持系统管理员管理用户(移交资源和删除用户)
8. 支持修改个人信息(手机号和邮箱)
9. 支持新元数据架构(部分数据源，逐步完整)
10. 支持通过配置关闭验证码登录
11. 支持通过配置自定义验证码(但还是建议使用正规短信验证码)
12. 支持 MySQL 作为源端 unsigned 列自动类型提升
13. 支持 MySQL MyISAM 表引擎
14. 支持创建任务的时候使用唯一键+普通列的方式来设置对端主键(特别针对主键不全局唯一的分库分表场景)
15. 支持在任务详情可视化查看校验任务日志
16. 支持 where 过滤条件 !=

### 优化

1. 优化创建任务过程中对于数据库元信息获取效率(特别对于上千张表，分库分表等情况)
2. 优化报错信息，更加清晰和明确(特别对于控制台异步任务)
3. 优化增量任务(所有具备增量能力的链路)位点更新和重置相关的逻辑
4. 优化 MySQL 源端全量获取数据行数问题，去除对 information_schema.innodb_xx 系列表依赖
5. 优化 MySQL &lt;-&gt; MySQL 双向同步性能(multisql)
6. 统一并优化数据源认证方式
7. 优化结构迁移在获取元信息内容过多导致 RPC TIMEOUT 的问题
8. 优化 Druid 依赖，统一版本为 1.2.6
9. 优化 Oracle 为对端结构迁移过程中索引名字超过30个字符问题
10. 优化 ElasticSearch 作为对端在写入 Array 类型数据的数据兼容性
11. 优化创建任务的性能
12. 优化前端部署方式
13. 优化交互体验

### Bug Fix

1. 修复 MySQL 对端，某些情况下异常被吞问题(**致命**)
2. 修复 Redis 对端 连接池使用不当问题 (**致命**)
3. 修复 RDS 隐藏主键导致的空 field name 问题(老版本 RDS for MySQL 无主键表 , **致命**)
4. 修复 MySQL 心跳包位点干扰增量解析问题(exceed max allowed packet size，**致命**)
5. 修复 MySQL 切换可能导致的位点错位问题
6. 修复 MySQL 到 Kafka & RabbitMQ & RocketMQ 结构迁移过程中存在的问题
7. 修复 MySQL 到 ClickHouse 结构迁移类型问题(部分)
8. 修复 MySQL 到 PostgreSQL & Greenplum 结构迁移过程中的外键问题
9. 修复 MySQL 中 enum/set 类型解析问题
10. 修复 MySQL enum/set 类型配合 where 条件结合使用时的类型处理问题
11. 修复 MySQL 对端，特殊分支逻辑和常规分支逻辑不一致问题(ignore 缺失导致not null 约束字段报 can not be null 错误)
12. 修复 MySQL 多唯一键情况下，第一个唯一键被识别为主键的元信息问题
13. 修复 Oracle 到 Oracle & MySQL 数据同步过程中异常中断问题
14. 修复 Oracle 对端，时间类型写入问题
15. 修复 Oracle 创建物化视图, 虚拟列处理错误的问题
16. 修复 ElasticSearch 对端，“是否索引”添加在 object,nested 等类型上导致的创建索引失败问题
17. 修复 MySQL -> ElasticSearch 结构迁移地理信息类型同步的问题
18. 修复 ElasticSearch 对端，已存在索引设置 index 属性时，结构迁移中无法正常搜索的问题
19. 修复 ElasticSearch 对端，查询已经存在的索引时 Boolean 类型转化报错
20. 修复 ElasticSearch 对端，字段“是否索引”设置不准确的问题（设置为false，仍然为true）
21. 修复 PolarDB for MySQL 的使用 AK/SK 上的问题
22. 修复数据过滤 where条件 != 操作符全量报错问题
23. 修复多条链路结构迁移时类型映射问题
24. 修复部分数据源 unsigned type 类型映射没有指定的问题
25. 修复登录异常问题(csrf)
26. 修复结构迁移进度不准问题
27. 修复状态机异常情况下无法删除任务的问题
28. 修复任务状态显示异常问题（任务因异常不断重启，页面状态仍然显示正常）
29. 关闭 Greenplum 不能作为源端增量任务，但可被创建出来的问题
30. 修复同步进度百分比展示异常的问题
