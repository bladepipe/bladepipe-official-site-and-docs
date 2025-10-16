---
id: rn-cloudcanal-4-2-0-0
title: 4.2.0.0
---
## CloudCanal-4.2.0.0

发版时间:2024年7月3日 版本号: 4.2.0.0

## 新链路

- 开放 Kafka -> SelectDB / Doris / AutoMQ 增量同步
- 开放 AutoMQ -> AutoMQ / Kafka 增量同步

## 新特性

- 支持 Oracle 目标端新写入模式（新增参数：enableNewApplyStrategy、writeStrategy）
- 支持 Redis Db 映射 （新增参数：enableDbMapping）
- 支持 Redis &lt;-&gt; Redis 双向同步 SRem、SetNx、SetEx、Append、GetSet、MSet、LInsert 命令
- 支持 二次差异校验数据，大幅度减少因为数据延迟造成的校验误差
- 支持 校验、订正任务自定义代码
- 支持 主账号重置子账号登录密码能力
- 支持 主账号设置禁止删除子账号能力（偏好设置 forbidDelSubAccount）
- 支持 主账号设置密码强度表达式（正则，偏好设置 subAccountPwdVerifyExpr 和 subAccountPwdVerifyTips），未设置则采用系统默认验证表达式
- 支持 主账号设置子账号密码强制过期能力 (偏好设置 subAccountPwdExpireDays)
- 支持 结构迁移 StarRocks 分区设置, 包括 RANGE 分区、表达式分区、LIST 分区
- 支持 TiDB -> TiDB 结构迁移 AUTO_RANDOM 和 SHARD_ROW_ID_BITS 属性
- 支持 SelectDB、Doris 新增数据源时添加 useSSL 选项

## 优化

- 优化 Redis 源端对于不支持的指令集抛出异常
- 优化 Redis 源端全量阶段对于超大 Key 抛出异常（新增参数：keySizeMb）
- 优化 Kafka 源端 Debezium Envelop Json 消息格式，把 source 字段作为非必要项
- 优化 MySQL 源端修改订阅创建子任务时，会自动复制主任务的 srcTimeZone connectTimeZone 参数
- 优化 Oracle 源端的结构迁移，如对端数据源支持 NUMBER（不带长度精度）类型（如 Oracle , PostgreSQL），则保持一致
- 优化 Doris / SelectDB 对端连续 DDL 报错问题，会通过查询目标端数据库元数据或识别错误信息进行等待或重试
- 优化 私有部署登录，私有部署禁止使用短信验证码登录
- 优化 私有部署重置密码操作逻辑，去掉未登录情况重置密码（忘记密码），登录状态重置密码采用老密码验证方式
- 优化 私有部署更新手机、邮箱操作逻辑，去掉短信验证码验证逻辑，采用当前用户密码验证方式
- 优化 Kubernetes 部署模式下机器管理页面的展示
- 优化 Kubernetes 部署脚本，修改相关镜像为阿里云镜像源
- 优化 Docker 部署支持脚本，修改 Docker 官网 Repo 改成阿里云镜像源
- 优化 审计日志功能（去除无用操作审计，保留任务、数据源操作审计），支持在线查看审计详细日志
- 优化 创建任务和修改订阅数据处理步骤筛选表的逻辑，支持批量精确筛选
- 优化 创建任务元数据获取，过滤 SQLServer 源端 ReportServer$xxxx,ReportServer$xxxxTempDB 等系统库，防止选择 Schema 页面出现权限不足问题
- 优化 子账号维护逻辑，禁止有权限管理子账号的子账号删除自己
- 优化 偏好设置，支持开关类型配置操作


## 问题修复

- 修复 Oracle -> PostgreSQL NUMBER 类型（不带长度精度）主键表数据校验失败问题
- 修复 Oracle NCHAR / CHAR 主键且值为空字符串时写入报错的问题
- 修复 Oracle 目标端主键为 NCHAR / CHAR 时更新性能低的问题
- 修复 Oracle 目标端 BLOB / CLOB / RAW 类型写入报错的问题
- 修复 Oracle 源端 ADD PK / UK 字段大小写转换的问题
- 修复 Oracle 源端设置目标主键无效的问题
- 修复 MySQL -&gt; Redis 修改订阅报错的问题
- 修复 MySQL &lt;-&gt; MySQL 双向同步由于心跳未更新导致的任务延迟问题
- 修复 MySQL 重置文件位点错误更新时间戳位点的问题
- 修复 MySQL 源端 lower_case_table_names = 2 时，增量同步白名单过滤错误的问题
- 修复 Hana 源端增量任务延迟指标显示异常的问题
- 修复 Hana 源端对超大事务无法读取的问题
- 修复 Kafka -> Kafka 结构迁移源端信息获取错误导致的报错问题
- 修复 Tunnel / MQ 目标端序列化 byte[] 错误的问题
- 修复 SQL Server -> SQL Server 结构迁移 NVARCHAR 类型长度 MAX 变成 1 问题
- 修复 创建任务上传自定义代码过大导致报错的问题
- 修复 子账号批量授权任务时，任务包含子任务的情况下报错的问题
- 修复 删除子任务，没有删除数据源使用记录的问题
- 修复 删除子账号后，对应数据同步任务创建人为空从而报错的问题，默认更新成任务拥有者
- 修复 页面组件国际化、面包屑导航不准的问题

