---
id: rn-cloudcanal-4-3-0-0
title: 4.3.0.0
---
## CloudCanal-4.3.0.0

发版时间:2024年9月3日 版本号: 4.3.0.0

## 新链路

- 开放 Elasticsearch -> Elasticsearch 结构迁移，全量迁移，增量同步 (alpha)，[安装插件](https://github.com/ClouGence/cloudcanal-es-trigger)后使用

## 新特性

- 支持 Hana 基于操作创建触发器（Insert/Update/Delete），即可选部分操作对应的触发器创建
- 支持 Hana 源端全量迁移无主键表（Column 类型）根据 $rowid$ 断点续传
- 支持 MySQL -> MySQL 同步 MySQL 系统库结构迁移，全量同步，增量同步，校验订正
- 支持 StarRocks 源端全量迁移过滤条件拼接（新增任务参数：fullDataSqlConditionEnabled）
- 支持 StarRocks / Doris 写入报错重试（新增任务参数：retryCount、retryWaitTimeMs）
- 支持 MQ 对端过滤增量任务中 data 为空的数据（新增任务参数：filterEmptyData）
- 支持 OceanBase 源端自定义代码功能
- 支持 目标端 StarRocks、Doris、SelectDB 高级配置可从用户偏好参数中读取（migrationBucketNumber、migrationPropertiesConfig）
- 支持 任务延迟 和 延迟恢复 国内电话通知（依赖阿里云语音服务）
- 支持 任务延迟恢复通知（IM、电话、短信、邮件）
- 支持 显示和设置任务级别，高到低 P0,P1,P2,P3,P4 ，配合监控指标 tag 方便接入用户系统告警体系
- 支持 任务监控指标更多 tag, 包括 task_name (e.g.,canalxxxx_INCREMENT), job_desc (任务描述)，job_level(任务级别)
- 支持 [配置任务 Grafana 监控仪表盘](../productOP/platform/add_job_grafana_dashbord.md)，方便用户对接其他告警方式
- 支持 审计页面展示修改前后的参数变化
- 支持 系统偏好按标签筛选参数
- 支持 系统配置变更进行审计记录
- 支持 主账号级别的手机告警设置，包括 alterVoiceType、taskErrorVoiceTc、taskRecoverVoiceTc、voiceAccessKey、voiceSecretKey 用户偏好参数
- 支持 主账号级别的短信告警设置，包括 alterSmsType、smsSignName、sysErrorSmsTc、taskErrorSmsTc、taskRecoverSmsTc、smsAccessKey、smsSecretKey 用户偏好参数
- 支持 openapi 创建任务接口增加设置开启心跳参数
- 支持 openapi 任务重跑接口
- 支持 子账号资源批量授权


## 优化

- 优化 TiDB 源端增量同步拉取数据性能，支持并行数据拉取
- 优化 对接口中的密码明文进行加密传输
- 优化 SQLServer / MySQL 源端表字段元数据获取速度（新增系统参数 parallelFetchMetaBatchSize）
- 优化 PostgreSQL 源端增量订阅分区表，自动设置复制标识为 FULL
- 优化 子账号可查看有权限的任务异常日志以及调度任务
- 优化 任务默认告警抑制时间调为 5 分钟
- 优化 配置任务告警的内容展示，使其更简洁、聚焦
- 优化 Oracle 源端 DDL 同步，过滤 alter table xxx shrink space check 语句
- 优化 数据校验空字符串与 NULL 视为相等（新增参数 checkEmptyStringEqualToNull；全链路支持 Oracle 源对端默认开启）

## 问题修复

- 修复 MySQL -> OceanBase enum 类型设置为 '0' 时同步失败的问题
- 修复 Kafka -> MariaDB 链路创建任务时提示不支持的问题
- 修复 系统偏好设置参数后无法撤销的问题
- 修复 系统偏好点击编辑按钮弹框中取值错误的问题
- 修复 Docker 版添加机器，任务重启出现僵尸进程的问题
- 修复 Oracle -> Oracle 链路表中存在联合索引导致数据校验结果有误的问题
- 修复 PostgreSQL 不支持 vector 数据类型导致任务创建失败的问题
- 修复 MySQL 对端结构迁移中，对于 text 类型字段的索引创建，如果带有前缀长度则创建普通索引，如果不带则创建全文索引
- 修复 MySQL 对端结构迁移中，计算表字段总长度，varchar 类型字节数进行调整，防止做过度类型变换 (varchar->text)
- 修复 OpenGauss / Greenplum 获取元信息报错的问题
- 修复 Hana 源端全量迁移 Binary / Blob 类型主键为空字符串报错的问题
- 修复 TiDB 源端增量同步大数据量卡住的问题





