---
id: rn-cloudcanal-6-1-0-0
title: 6.1.0.0
---
## CloudCanal-6.1.0.0

发版时间:2026年5月28日 版本号: 6.1.0.0

## 亮点
- 大幅强化 **任务告警**，支持批量配置/告警频率/异常告警白名单过滤等能力
- 大幅优化 **KingbaseES 源端全量分区并行扫描逻辑**，性能提升明显

## 新特性
- 支持 Kafka 源端扁平化消息格式消费，具体说明参考 [MQ 消息同步格式说明](../reference/kafka_msg_format_type.md)
- 支持 OceanBase MySQL Binlog GTID 位点（主从切换更加顺滑）
- 支持 AuroraMySQL -> StarRocks 虚拟列
- 支持 达梦 -> 达梦 创建宽表任务
- 支持 Aliyun 全托管 SelectDB 5.x
- 支持 AWS DynamoDB 源端心跳检测
- 支持 AWS DynamoDB -> MySQL/StarRocks 多 Schema 迁移同步
- 支持 AWS DynamoDB 源端开启 receive.log，方便排查数据丢失
- 支持 TiDB SSL 连接，以适配 TiDB Cloud 公网连接进行数据访问必定需要开启 SSL 的特性
- 支持 全量/校验/订正任务重跑时查看上次任务执行耗时
- 支持 Open API 创建任务时，指定 dataJobLevel 参数
- 支持 用户偏好参数 kafkaPositionMode 指定默认的位点方式（单位点或多位点，Open API 兼容）
- 支持 单个任务绑定多个 IM webhook 告警地址

## 优化
- 优化 StarRocks/Doris/SelectDB 源端全量 Dynamic 查询模式不再获取 maxpk/minpk 位点信息
- 优化 Oracle（11.2 以上版本）对端写入 IGNORE keyConflictStrategy 模式支持使用 ignore_row_on_dupkey_index Hint 提示词
- 优化 同步 DDL 开关关闭时，对应操作不展示
- 优化 超多表下创建任务/修改订阅时的表搜索性能
- 优化 搜索并手动勾选模式下，搜索结果中的未勾选表优先展示
- 优化 修改订阅流程中禁止对已存在表/列的映射的相关操作
- 优化 Yuque 刷新 Cookie，让文档内容持续向量化
- 优化 新增 OceanBase 数据源时，默认参数 obIncreMode 的默认值从 LogProxy 修改为 Binlog
- 优化 OceanBase 源端通过时间戳重置位点，文件位点信息没有清空
- 优化 隔离 StarRocks 插件中的 Arrow/Netty 依赖，避免与上层工程的 Netty 类加载冲突
- 优化 同一任务短时间（与 CloudCanal 系统参数 taskAlertInhibitMin 相关）内出现不同异常，后续异常告警没有正常发送的问题

## 问题修复
- 修复 查看表结构历史页面分页问题
- 修复 Kafka 源端时，修改订阅新增表对端没有自动映射待创建的问题
- 修复 Kafka 到 MySQL 任务库表映射无法筛选的问题
- 修复 Kafka 源端修改订阅时，表搜索结果没有展示已订阅表的问题
- 修复 DynamoDB 源端任务详情中的国际化问题
- 修复 K8s 新安装缺少 Console 配置导致启动报错的问题
- 修复 Oracle、PostgreSQL、达梦等相关数据源，源端和目标端表结构主键不相同时，Replace SQL 构造错误导致目标端数据变多的问题
- 修复 Oracle 源端订正任务主键元信息获取错误的问题
- 修复 Oracle 源端订正任务多主键表因占位符数量超过 Oracle 1000 个限制导致执行失败的问题
- 修复 编辑告警出现 400 BAD_REQUEST 问题
- 修复 容器部署模式下的任务日志时间以 UTC 展示而非宿主机时间的问题
- 修复 OceanBase for Oracle 对端无主键表插入使用 MERGE 语法导致写入失败的问题
- 修复 任务异常退出时告警上报被中断导致丢失异常告警的问题
