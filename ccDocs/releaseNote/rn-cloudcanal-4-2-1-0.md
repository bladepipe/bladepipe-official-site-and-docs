---
id: rn-cloudcanal-4-2-1-0
title: 4.2.1.0
---
## CloudCanal-4.2.1.0

发版时间:2024年7月31日 版本号: 4.2.1.0

## 新链路

- 开放 MySQL -> AutoMQ 结构迁移、全量同步、增量同步
- 开放 AutoMQ -> MySQL 增量同步
- 开放 MongoDB -> Oracle 全量同步、增量同步
- 开放 Oracle -> ElasticSearch 结构迁移、全量同步、增量同步、数据校验、DDL同步（加列）
- 开放 OceanBase -> ElasticSearch 结构迁移、全量同步、增量同步、数据校验、DDL同步（加列）
- 开放 PolarDbX -> PostgreSQL 结构迁移、全量同步、增量同步、数据校验与订正

## 新特性

- 支持 PostgreSQL 源端分区表的数据同步
- 支持 Redis &lt;-&gt; Redis 双向同步 UnLink、Eval、PExpire 命令
- 支持 MySQL 目标端 KEY_UPGRADE_TABLE 写入策略，解决唯一键字段更新导致的数据冲突问题
- 支持 增量、全量同步按行打印数据到日志中便于排查问题，避免页面查看日志卡顿（参数 printDataInLog）
- 支持 ElasticSearch/MongoDB 对端二次数据校验
- 支持 自建 RocketMQ 增加 AK/SK 鉴权模式
- 支持 PostgreSQL -> ElasticSearch DDL同步（加列）
- 支持 SQLServer -> StarRocks DDL 同步 (ALTER TABLE ADD/DROP/MODIFY COLUMN)
- 支持 MySQL 8.4.x 版本（源和目标），适配新版本 MySQL 元数据查询语句差异
- 支持 自动安装/升级 Sidecar 自定义是否下载包功能
- 支持 自动安装/升级/回滚/启动 Sidecar 自定义 SSH 端口功能
- 支持 通过 Open API 从独立集群（>=2.2.x）迁移任务（增量）到当前集群，方便业务安全、平滑升级
- 支持 批量对目标表增加表前缀、后缀
- 支持 数据校验浮点类型精度 (参数 checkFloatNumScale) 和时间精度 (参数 checkTimePrecision) 设置
- 支持 数据校验最大差异数量阈值设置，超过则校验任务退出，并打印信息到 diff.log 中（参数 maxDiffAndLoss）
- 支持 任务退出不自动重启，除非手动点击页面按钮重启（参数 noAutoReboot）


## 优化

- 优化 Oracle 源端检查日志文件连续性，避免在线日志长时间不归档导致的延迟
- 优化 MySQL/MariaDB/PostgreSQL/TiDB -> ElasticSearch 结构迁移，采用新架构，更加简洁统一
- 优化 MySQL/MariaDB/TiDB -> ElasticSearch DDL同步（加列），采用新架构，更加简洁统一
- 优化 MySQL 源端修改订阅时，过滤 binlog 中时间戳为 0 的事件
- 优化 MySQL -> MySQL 时间类型时区同步（相关类型：datatime / timestamp，参数：srcTimezone，dstTimezone）
- 优化 MySQL -> SQLServer 时间类型时区同步（目标类型：smalldatetime，datetime，datetime2、参数：srcTimeZone，TimeZone，enableTimeZoneProcess）
- 优化 MySQL -> PostgreSQL 时间类型时区同步（目标类型：timestamp_whitout_timezone、参数：srcTimeZone，TimeZone，enableTimeZoneProcess）
- 优化 MySQL -> StarRocks 时间类型时区同步（目标类型：datetime、参数：srcTimeZone，TimeZone，enableTimeZoneProcess）
- 优化 MySQL -> Doris 时间类型时区同步（目标类型：datetime、参数：srcTimeZone，TimeZone，enableTimeZoneProcess）
- 优化 SQLServer -> MySQL DDL 同步为新架构，和其他链路保持一致
- 优化 SQLServer -> StarRocks/Doris/MySQL/Oracle 类型映射，money 和 smallmoney 映射为 decimal 或 number（Oracle）
- 优化 PostgreSQL -> StarRocks/Doris/MySQL/Oceanbase 类型映射，money 映射为 decimal
- 优化 PostgreSQL -> StarRocks/Oceanbase 类型映射，uuid 映射为 varchar(36)
- 优化 MySQL/PolarDbMySQL -> PostgreSQL 类型映射，float 映射为 real, double 映射为 double precision
- 优化 MySQL/PolarDbMySQL 源端 float/double 在结构迁移时，填充有效小数位数（float 8 位，double 16 位），方便对端采用精确类型（如无匹配近似类型）
- 优化 浮点类型数据校验，比对策略由 RoundingMode.DOWN 改为 RoundingMode.HALF_UP，解决订正差异数据后，仍然校验不正确的问题
- 优化 MySQL/SQLServer/PostgreSQL/Oracle/StarRocks/Doris 修改订阅创建子任务时，自动复制主任务相关时区参数
- 优化 [cloudcanal-openapi-sdk](https://gitee.com/clougence/cloudcanal-openapi-sdk) 功能，新增对 [queryjob](https://www.clougence.com/cc-doc/openCenter/openApi/dataTaskApi/api_datajob_query) ，[queryjobschemabyid](https://www.clougence.com/cc-doc/openCenter/openApi/dataTaskApi/api_datajob_queryjobschema) 开放 api 的支持, 并 release [1.0.0](https://mvnrepository.com/artifact/com.clougence.cloudcanal/cloudcanal-openapi-sdk/1.0.0) 版本
- 优化 [cloudcanal-sdk](https://gitee.com/clougence/cloudcanal-sdk) 功能，新增对 Hana、SelectDB、GaussDBForMySQL、MariaDB、PolarDbMySQL 等数据源开放支持, 并 release [1.3.1](https://mvnrepository.com/artifact/com.clougence.cloudcanal/cloudcanal-sdk/1.3.1) 版本
- 优化 Docker 版 CloudCanal 的安装脚本，防止 MySQL 服务启动缓慢导致 Flyway 初始化失败
- 优化 Console 控制台页面的启动提示，防止操作页面而引发 Flyway 初始化失败
- 优化 Doris 添加数据源页面增加额外参数 privateHost、publicHost 的描述


## 问题修复

- 修复 修改订阅添加子任务检查 License 授权任务数的问题
- 修复 全量迁移存在过滤条件任务始终无法停止的问题
- 修复 全量迁移部分表有过滤条件，无过滤条件表 SQL 拼接错误的问题
- 修复 数据校验 fullBatchSize 参数无效的问题
- 修复 RabbitMQ 目标端默认 vhost 为 cloudcanal 时测试链接报错的问题
- 修复 MongoDB 源端 Document、List Document、sub-Document 类型写入目标端时 Document 序列化问题
- 修复 MySQL 5.x -&gt; MySQL 5.x 结构迁移后数值类型显示宽度不一致的问题
- 修复 ElasticSearch >= 8 获取不存在的 index 抛异常的问题，修改为打印日志并忽略异常
- 修复 ElasticSearch 对端数据校验，如果字段为 Date 类型，校验时可能存在 NPE 的问题
- 修复 Oracle -&gt; ElasticSearch 数据校验带地点时区报错的问题
- 修复 PostgreSQL 目标端将空字符串数据（非 NULL）转换为 NULL 导致的数据校验不一致的问题
- 修复 PostgreSQL 目标端 Bytea 类型数据校验不一致的问题
- 修复 PostgreSQL 增量同时进行修改订阅丢数据的问题
- 修复 OceanBase 源端全量同步初始化位点设置超时时间无效的问题
- 修复 新 Apply 覆盖式写入唯一键冲突导致覆盖失败的问题
- 修复 Oracle 获取唯一索引元信息错误的问题
- 修复 Oracle/PostgreSQL/SQLServer/Hana 源端链路修改订阅，已订阅的表主键、虚拟列，数据过滤条件失效的问题
- 修复 Hana 源端任务没有 incrTableMode 参数，导致页面位点空白的问题
- 修复 新部署的 CloudCanal 页面右上角，点击去激活按钮无效的问题
- 修复 页面上修改待创建表名为自定义表名失效的问题
- 修复 K8S 版 CloudCanal 安装时，预检 Containerd 容器失败的问题
- 修复 MQ 目标端自定义格式 TABLE_TABLE_REGEX 规则下，匹配失败导致规则无效的问题
- 修复 StarRocks 不支持 char 类型主键的问题，将字段类型转换为 varchar
- 修复 PostgreSQL/Greenplum 对端 DDL 同步时，预检列、表等信息失败导致 DDL 被略过的问题
- 修复 SQLServer money/smallmoney 所映射的 JDBC type 错误的问题，从 Types.OTHER 修正为 Types.DECIMAL，该问题可能导致同步数据错误
- 修复 SQLServer -> MySQL DDL 同步 money/smallmoney/uniqueidentifier 类型字段长度不对问题
- 修复 ElasticSearch 对端忽略 DDL 异常失效问题
- 修复 数据校验的预检步骤日志归档，导致订正不准的问题






