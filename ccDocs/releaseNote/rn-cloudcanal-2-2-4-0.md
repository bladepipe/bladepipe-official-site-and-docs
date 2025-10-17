---
id: rn-cloudcanal-2-2-4-0
title: 2.2.4.0
---

## CloudCanal-2.2.4.0

发版时间:2022年6月17日  版本号: 2.2.4.0

### 新特性 

- 支持异地多活冲突检测条件(创建任务列选择页->对端更新条件)
- 支持异地多活防循环标记自定义，以支持星型结构多活变更事件可传递能力
- 支持 MongoDB 整形(Long、Integer)和字符串类型主键("_id")
- 支持用户级任务异常/延迟可自定义告警抑制间隔、告警方式、IM告警群
- 支持任务异常/延迟告警等级，以便发送到不同级别的IM告警群
- 支持 StarRocks/Doris 对端可配置的刷出等待时间（参数realFlushPauseSec）
- 支持阿里云 Vrigina 区域数据源
- 支持 MySQL -> MySQL 对端更新条件，创建任务和修改订阅
- 支持消息对端（Kafka/RocketMQ/RabbitMQ）选择一个已存在的 Topic/Queue 作为上游 DDL 接收 Topic/Queue
- 支持飞书群机器人告警（目前已支持钉钉、企业微信、飞书三种告警方式）

### 优化

- 优化  StarRocks/Doris 对端参数 flushTimeoutSec ，修改为 asyncFlushIntervalSec
- 优化用户配置为 kv 形式，并对既有用户的配置进行页面级补全操作
- 优化组件间通信超时参数设置，以缓解某些场景下控制信息交互超时问题(部署级参数，xxx.rsocket.wait_result_timeout_ms 和xxx.rsocket.connect_timeout_ms)
- 优化自定义代码包过大(>50MB), 导致更新代码不生效问题,支持参数控制部署新代码等待时间(部署级参数，sidecar.config.pkg.download_to_ready_ms)
- 升级 fastjson版本到 1.2.83，避免安全问题
- 升级 Druid 链接池到 1.2.8，解决部分 DDL SQL 解析问题
- 升级 RocketMQ http sdk 到 1.0.3.2 , 以消除 Log4j 风险
- 开放大部分阿里云 Region

### 问题修复

- 修复 PolarDBMySQL 源端，数据库切换时，按时间戳回退位点可能丢数据的问题
- 修复 MySQL/PolarDBMySQL 源端，全库同步时 RENAME 操作无法被过滤的问题
- 修复 MySQL 异地多活，编辑任务时产生的子任务没有继承父任务参数配置的问题
- 修复 MySQL 异地多活，DDL 发生循环问题
- 修复 MongoDB 源端 3.2、3.4、4.0、4.2、4.4、5.0 版本存在的增量获取时间戳位点的问题
- 修复 MongoDB -> Kafka 新增数据类型后的问题
- 修复部分数据源之间校验，如果指定主键会导致校验任务报错的问题
- 修复多数据源对端，长时间未写入数据或 DDL 导致半开链接报错的问题（e.g.,源端定时写入数据）
- 修复数据源更新数据源账号密码时无法更新 ssl 密钥文件问题
- 修复 Oracle 源端识别 redo 日志中时间戳类型多出空格的问题，导致 Oracle to Oracle 链路同步中 删除/修改 操作的失败
- 修复 PostgreSQL 增量任务删除的时候 slot 没有清理的问题
- 修复过滤条件将数据完全过滤完毕造成的写入问题
- 修复前端创建任务 Oracle->MySQL 选择 Oracle 库不自动映射，选择表空间后再自动映射的问题
- 修复前端任务列表页当位点列表为空时的问题
- 修复前端修改订阅添加库支持待创建
- 修复 StarRocks/Oceanbase 对端，结构迁移进度显示不准确问题
- 修复 OceanBase 无法重置位点的问题
- 移除 OceanBase 源端尚不支持的对端数据源
- 修复 MySQL 获取表源数据 DATA_FREE  字段数据过长问题
- 修复控制台连接元数据库因使用 Druid 连接池引起的  discard long time none received connection 问题