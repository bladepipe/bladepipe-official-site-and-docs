---
id: rn-cloudcanal-2-7-1-5
title: 2.7.1.5
---

## CloudCanal-2.7.1.5

发版时间:2023年6月16日 版本号: 2.7.1.5

### 新链路

- 暂无

### 新特性

- 支持 SSL 链接 ElasticSearch ，兼容 AWS OpenSearch , Aliyun ElasticSearch
- 支持 MySQL -> ElasticSearch 加列自动同步
- 支持 Redis Cluster 对端，包括数据迁移、数据同步、数据校验和订正功能
- 支持 Doris2.x 版本
- 支持 Flyway 元数据结构自动升级，版本升级不需要再手动变更元数据库
- 支持 Slack 和 Discord IM 告警配置，配置代理发送
- 支持 TiDB 源端回溯位点和清除位点功能
- 支持 SQL Server TEXT/NTEXT/IMAGE 结构迁移到对端映射为 VARCHAR(MAX)/NVARCHAR(MAX)/VARBINARY(MAX)
- 支持 MySQL -> PostgreSQL 结构迁移 BIT 类型映射为 BOOLEAN 类型，TIME 类型映射为 VARCHAR 类型
- 支持 OceanBase -> OceanBase/Kafka/MySQL JSON类型
- 支持 用户自定义邮箱配置，支持内网 SMTP 服务器
- 支持 主动验证邮箱和IM配置
- 支持 用户自定义 extraDDL 和 dbHeartbeatEnable 默认配置
- 支持 非 root 且无 sudo 权限的账号进行 sidecar 自动部署安装升级
- 支持 源端新增列同步到对端 StarRocks/Doris，允许列为空

### 优化

- 优化 Oracle/MySQL DDL 大小写自动转换
- 优化 SQL Server 源端大表全量 snapshotRead 为默认值情况下的任务性能
- 优化 SQL Server -> SQL Server 数据校验大表的性能
- 优化 Redis 写入默认并发数

### 问题修复

- 修复 StarRocks/Doris/SelectDB HttpHost 不支持更新的问题
- 修复 MySQL 清除位点 ServerID 未被清除的 BUG
- 修复 Kafka -> MySQL/PostgreSQL/Oracle/SQL Server 查看映射报错的问题
- 修复 创建任务回退到第一步时相关配置信息未被保存的问题
- 修复 机器管理-任务列表中任务CPU使用率排序的问题
- 修复 回溯位点没有选择时间，会自动设置为当前时间的问题
- 修复 SQL Server 作为源端，在任务增量同步的情况下，延迟时间不准确的问题
- 修复 dbo.mt_balance 表全量报错问题（SQL Server 联合主键中包含日期类型）
- 修复 PostgreSQL 源端删除任务后 pg_publication 没有清理的问题
- 修复 SQL Server -> SQL Server 数据校验 soTimeoutSec 参数不生效的问题
- 修复 SQL Server -> MySQL 时间类型（含有精度和默认值）情况下的结构迁移报错的问题
- 修复 MySQL 源端 DDL 有注释大小写转换失败的问题
- 修复 任务告警-IM 发送异常的问题
- 修复 Kafka -> Kafka /cloudcanal/console/api/v1/openapi/datajob/queryjobschemabyid 接口返回为空，服务器报NPE的问题
- 修复 MySQL 增量同步时存入snapshot中的schema名称带有‘’，致使show create table 报错的问题
- 修复 MySQL -> StarRocks 结构迁移 类型默认值为“0000-00-00”异常的问题
- 修复 SQL Server -> SQL Server 带条件筛选同步异常的问题
- 修复 PostgreSQL -> PostgreSQL 源端主键 UUID 类型增量报错的问题
- 修复 PostgreSQL 源端修改订阅增加表合并后数据丢失的问题
- 修复 PostgreSQL 作为对端无主键表写入的问题
- 修复 Console 启动异常堆栈的问题
- 修复 历史添加的 StarRocks/Doris/SelectDB 数据源，创建任务出现的NPE问题
- 修复 Redis 迁移同步监控指标部分不显示的问题
- 修复 对端选中 Redis 高级配置中缓存格式没有默认选中的问题
