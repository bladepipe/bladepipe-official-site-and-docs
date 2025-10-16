---
id: rn-cloudcanal-1-0-3
title: 1.0.3
---

## CloudCanal-1.0.3

发版时间:2021年8月31日
版本号: 1.0.3

### 新特性

1. 支持高可用集群化部署
2. 支持钉钉群 & 短信告警发送给同为 SYSTEM 角色的团队伙伴，以支持团队化运维
3. 支持 PostgreSQL->MySQL 结构迁移、数据迁移、数据同步、数据校验
4. 支持 MySQL->Redis 数据迁移、数据同步、数据校验
5. 支持 MySQL->ClickHouse DDL 同步
6. 支持 MySQL->TiDB DDL 同步，对于 alter table 多个 action (add/drop/modify column) 自动拆解成 TiDB 支持的多个 DDL
7. 支持 Oracle 11g (原支持19c、12c)
8. 支持创建任务选择 ClickHouse 表引擎，默认表引擎为 ReplacingMergeTree
9. 支持 ES 对端选择阿里云、腾讯云、IK等主流分析器
10. 支持 RocketMQ tag & key 分别设置 db & schema & table & action 和 主键列表
11. 支持 MySQL & PostgreSQL 源端 where 条件操作符 != (暂限定为全量迁移)
12. 支持自定义主键选择其他非唯一约束列
13. 支持对端 ES 自定义分析器(需符合 CloudCanal 命名规范)

### 优化

1. 任务详情按任务阶段查看任务日志
2. 当任务预检出错时可略过并继续创建
3. 支持数据源只填写外网地址
4. 优化 Kafka header 生成方式
5. 结构迁移支持展示unsigned类型
6. 支持非标准化的 ARRAY 类型写入到 ES Nested 类型
7. 容器内目录 owner 调整，避免 clougence 用户运行脚本权限报错

### Bug Fix

1. 修复到消息中间件(RocketMQ/Kafka/RabbitMQ) update 类型变更前数据问题
2. 修复数据源写入对端时纳秒时间精度丢失的问题
3. 修复 Oracle 到 MySQL、Oracle 到 Oracle 链路中 DDL 同步问题。
4. 修复 Oracle 作为源端数据源，Date 类型解析格式异常导致无法同步到对端到问题。
5. 修复数据校验任务详情页面无法查看进度和日志的问题
6. 修复内核元数据引用时的NPE问题
7. 修复MySQL json字符串写入对端 nested 类型的异常问题
8. 修复短信告警实例信息错误的问题
9. 修复结构迁移unsigned 类型映射没有做类型升级的问题
10. 修复 RocketMQ 元信息获取错误问题(升级 RocketMQ 客户端版本)
11. 修复无账号密码ES实例连通性测试失败问题
