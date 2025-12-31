---
id: rn-cloudcanal-5-3-1-0
title: 5.3.1.0
---
## CloudCanal-5.3.1.0

发版时间:2025年12月31日 版本号: 5.3.1.0


## 亮点

- 全新支持 KingbaseES V8/V9 源端

## 新链路

- 开放 [KingbaseES V8/V9 -> MySQL/StarRocks/Doris/SelectDB 全量同步/增量同步/数据校验/数据订正/结构迁移/DDL 同步](../dataMigrationAndSync/datasource_func/KingbaseES/privs_for_kes.md)（加列/减列/modify/rename/truncate）
- 开放 KingbaseES V8/V9 -> ClickHouse 全量同步/增量同步/数据校验/结构迁移/DDL 同步（加列/减列/modify/rename/truncate）
- 开放 OceanBase For MySQL -> Oracle 全量同步/增量同步/数据校验/数据订正/结构迁移/DDL 同步（加列/减列/modify/rename/truncate）
- 开放 Doris/SelectDB -> Doris/SelectDB 全量同步/数据校验/数据订正/结构迁移

## 新特性

- 支持 控制台元数据库为 OceanBase For MySQL/TiDB/PolarDB MySQL/TDSQL-C MySQL 等 MySQL 协议兼容数据库
- 支持 任务创建及已有任务对迁移同步对象做重复订阅检测，方便用户精简任务数量
- 支持 MySQL 源端 RENAME_COL 类型 DDL，并且支持 StarRocks（>= 3.3.2）对端同步该类型 DDL
- 支持 MySQL 解析 binlog 时跳过不支持的 variable part 事件
- 支持 Hana -> Doris，OceanBase -> StarRocks 虚拟列功能
- 支持 SQL Server 源端心跳，解决源端无任何写入延迟问题
- 支持 Doris/SelectDB -> MySQL 数据校验/数据订正
- 支持 DB2 源端元数据检索，方便用户查阅订阅关系
- 支持 DB2 源端性能参数的模板白名单
- 支持 达梦源端设置事务超时后自动提交的时间（参数：autoCommitTxTimeoutSec）
- 支持 达梦源端消费位点与最新的 Arch 日志保持一定间隔（参数：fallBackLsnStep）
- 支持 达梦源端显示最新提交延迟，快速判断事务没提交导致的任务延迟
- 支持 Doris 为对端，结构迁移可设置分区信息，包括自动/手动 RANGE 分区、LIST 分区
- 支持 ElasticSearch 目标端 completion 类型
- 支持 创建任务时表、字段映射规则新增驼峰转下划线格式、下划线转驼峰格式
- 支持 创建任务、添加数据源取消测试连接

## 优化

- 优化 MySQL 源端同步 OnlineDDL 默认使用 DDL Convert 逻辑，大幅提升 ONLINE DDL 同步的兼容性
- 优化 MySQL 源端结构迁移过滤非法 datetime/timestamp 默认值
- 优化 MySQL 全量多 schema 数据迁移连接池初始化逻辑，解决启动慢、连接数占用多的问题
- 优化 MySQL 源端非法 DATE/DATETIME/TIMESTAMP 数据判定逻辑
- 优化 PostgreSQL 全量迁移支持多主键表使用主键分页查询 （原为 snapshot read）
- 优化 SQL Server 延迟展示的时区偏移问题
- 优化 SQL Server 源端 2014 以下版本默认 SnapshotRead 设置为 ture，扫描动作为快照读
- 优化 SQL Server/Oracle 任务启动时获取表元数据定义逻辑，提升获取速度(10x)
- 优化 非 GTID 模式下 MySQL 源端初始化不再存储 GTID 位点，防止后者过长导致存储位点信息失败
- 优化 Doris/StarRocks 对端校验 maxInSizePerQuery 参数默认值为1024
- 优化 DB2 源端全量扫描，采用统一架构，和其他数据源保持一致
- 优化 DB2 源端启用快照读时不再获取位点范围，解决由此引发的超时问题
- 优化 DB2 源端元数据读取，采用分页方式以支持大量表获取元数据
- 优化 [Hana 源端增量权限预检缩小到表级别](../dataMigrationAndSync/datasource_func/Hana/privs_for_hana.md)
- 优化 达梦源端日志打印，新增 V$LOGMNR_CONTENTS 查询耗时统计
- 优化 修改订阅流程，新增二次确认弹窗
- 优化 输入错误/不存在路由时，重定向到任务列表
- 优化 后端同时多个接口报错，会将全部的报错信息收集起来，可在一个弹窗内翻页查看
- 优化 数据库映射树形模式下对于待创建状态的展示
- 优化 前端单个请求超时时间延长为 1 小时
- 优化 Console 和 Sidecar 的自动运维操作连接信息的显示问题
- 优化 批量操作黑名单，如果没有新增表，禁用新增表生效范围
- 优化 创建任务时大规模表（2 万+）下的表选择性能，提升全选表时浏览器的稳定性

## 问题修复

- 修复 Oracle 添加数据源用户名配置为 username as role （.e.g. sys as sysdba）导致的连接问题
- 修复 Oracle 无约束表增量同步阶段对端无法插入相同行的问题
- 修复 获取 Oracle index 列时，未限制列 owner 导致错误获取到其他 Schema 同名 index 列的问题
- 修复 PostgreSQL 增量开启强类型同步后解析公元前的 timestamp with/without time zone 数据失败的问题
- 修复 OceanBase/OceanBase for Oracle 源端 LogProxy 服务进程退出后增量同步任务无限重连的问题（新增参数 logProxyMaxReconnectTimes）
- 修复 OceanBase for Oracle 源端解析 DDL 失败导致日志监听客户端停止，但任务进程仍存活的问题
- 修复 DB2 源端子任务合并后，主任务无法启动的问题
- 修复 DB2 源端修改位点不生效的问题
- 修复 添加虚拟列列值为转化表达式时支持脚本展示缺失的问题
- 修复 创建相似任务切换对端后，数据处理时会勾选目标端不支持的列的问题
- 修复 取消自动升级 Sidecar 调用接口参数丢失的问题
- 修复 MySQL 源端大小写不敏感配置下，同步表名含大写字母时元数据映射错误的问题
- 修复 Doris 源端表信息不显示 UK 标识的问题
- 修复 对端 StarRocks 分区设置 PARTITION BY 之间存在多个空格时结构迁移分区信息丢失的问题
- 修复 SQL Server 源端任务创建时状态机状态异常，导致位点无法正常初始化的问题
- 修复 Sidecar 自动部署使用高权限账号，导致部署目录权限错误的问题
- 修复 API 分页获取任务列表信息，排序方式为空时报错的问题
- 修复 ElasticSearch 目标端 DDL 加列执行失败的问题
- 修复 数据库映射树形模式下编辑单库无效的问题
- 修复 控制台运维动作表单校验未完成也能够提交的问题
- 修复 任务详情中位点信息超长时，内容渲染异常的问题
- 修复 报错接口可以快速重复点击，短时间触发大量请求的问题
- 修复 弹窗在浏览器回退的时候不会关闭的问题
- 修复 分区表达式接口 404 的问题
- 修复 创建相似任务切换对端后，表选择时会勾选目标端不支持的表的问题
- 修复 创建相似任务数据库映射校验不完整，漏掉部分校验场景，导致直接进入下一步的问题
- 修复 创建任务/创建相似任务，切换对端的 schema 后，表&action过滤页面的目标表信息没有刷新的问题
- 修复 消息类源端修改订阅/创建相似任务，点击页面上的全选按钮，对端表会出现待创建的问题
- 修复 消息类源端到 PostgreSQL/SQL Server 修改订阅控制台报错的问题
- 修复 消息类源端到 Oracle 修改订阅加 Topic，对端映射没有下拉框的问题
- 修复 PostgreSQL 全量迁移 smallint/integer/number/bigint 类型主键发生隐式转换导致索引失效问题
- 修复 PostgreSQL 增量开启强类型无法同步 UPDATE 事件问题
- 修复 PostgreSQL 对端开启强类型写入公元前 Timestamp with time zone 与源端不一致问题
