---
id: rn-cloudcanal-3-2-1-0
title: 3.2.1.0
---

## CloudCanal-3.2.1.0

发版时间:2023年9月14日 版本号: 3.2.1.0

### 新链路

- 开放 MySQL -> Dameng 结构迁移、全量、同步、数据校验、数据订正、DDL同步（加减列）
- 开放 MySQL -> Redshift 结构迁移、全量、同步、数据校验、DDL同步（加列/减列/修改列/重命名列/减表/truncate表/rename表）
- 开放 Hana -> StarRocks/Doris/SelectDB/MySQL/MariaDB 结构迁移、全量、同步、数据校验、数据订正
- 开放 TiDB -> StarRocks 结构迁移、全量、同步、数据校验、DDL同步（加列/减列）
- 开放 Aurora MySQL -> ElasticSearch 结构迁移、全量、同步、数据校验、数据订正、DDL同步（加列）

### 新特性

- 支持 K8s 部署 CloudCanal (CentOS/Ubuntu/MacOS)
- 支持 Oracle -> PostgreSQL 增量过程中 DDL 同步（加列/减列/修改列/重命名列/rename表）
- 支持 Aurora MySQL -> StarRocks 数据订正
- 支持 StarRocks 分桶为空，自动进行分桶（StarRocks 版本需要大于2.5.7）
- 支持 Doris/SelectDB 分桶录入 auto 关键字，创建自动分桶表（Doris/SelectDB版本需要大于1.2.2）
- 支持 Dameng/PostgreSQL/SQL Server 对端 ROW 写入模式
- 支持 修改任务规格时，当前机器内存不足自动调度到其他机器
- 支持 open api sdk 新接口, 帮助用户快速集成 CloudCanal 到自己的系统中
    - [获取数据源列表](https://gitee.com/clougence/cloudcanal-openapi-sdk/blob/master/src/test/java/com/clougence/cloudcanal/openapi/sdk/DataSourceApiTest.java) ([api](https://www.clougence.com/cc-doc/openCenter/openApi/dataSourceApi/api_datasource_listds))
    - [添加数据源](https://gitee.com/clougence/cloudcanal-openapi-sdk/blob/master/src/test/java/com/clougence/cloudcanal/openapi/sdk/DataSourceApiTest.java) ([api](https://www.clougence.com/cc-doc/openCenter/openApi/dataSourceApi/api_datasource_addds))
    - [删除数据源](https://gitee.com/clougence/cloudcanal-openapi-sdk/blob/master/src/test/java/com/clougence/cloudcanal/openapi/sdk/DataSourceApiTest.java) ([api](https://www.clougence.com/cc-doc/openCenter/openApi/dataSourceApi/api_datasource_deleteds))
    - [获取任务列表](https://gitee.com/clougence/cloudcanal-openapi-sdk/blob/master/src/test/java/com/clougence/cloudcanal/openapi/sdk/DataJobApiTest.java) ([api](https://www.clougence.com/cc-doc/openCenter/openApi/dataTaskApi/api_datajob_list))
    - [创建任务](https://gitee.com/clougence/cloudcanal-openapi-sdk/blob/master/src/test/java/com/clougence/cloudcanal/openapi/sdk/DataJobApiTest.java) ([api](https://www.clougence.com/cc-doc/openCenter/openApi/dataTaskApi/api_datajob_create))
    - [停止任务](https://gitee.com/clougence/cloudcanal-openapi-sdk/blob/master/src/test/java/com/clougence/cloudcanal/openapi/sdk/DataJobApiTest.java) ([api](https://www.clougence.com/cc-doc/openCenter/openApi/dataTaskApi/api_datajob_stop))
    - [删除任务](https://gitee.com/clougence/cloudcanal-openapi-sdk/blob/master/src/test/java/com/clougence/cloudcanal/openapi/sdk/DataJobApiTest.java) ([api](https://www.clougence.com/cc-doc/openCenter/openApi/dataTaskApi/api_datajob_delete))

### 优化

- 优化 TiDB 源端位点策略
- 优化 Console、Sidecar 资源监控（CPU个数、内存占用）
- 优化 数据校验打印日志逻辑，数据在 diff 失败的时候使用 json 格式化后打印日志
- 优化 PostgreSQL/SQL Server 写入策略，增加对端写入参数 dstSameEventReduce 默认为false，设置为 true 后可以开启合并相似事件以优化 Batch 写入性能
- 优化 writeStrategy 参数设置为 MULTI_SQL 后，拼写方式由 insert into ...values(...),(...) 转换为多条独立的 insert 语句


### 问题修复

- 修复 源端为 PostgreSQL 的链路库/表映射弹框无法搜索的问题
- 修复 源端为 PostgreSQL 的链路回溯位点和清除位点功能不可用的问题
- 修复 修改订阅没有更新表或列，仍然可以进行修改订阅的问题
- 修复 修改订阅添加源端为 MySQL/PostgreSQL 空库时，页面报错并且无法关闭添加库的组件问题
- 修复 Db2 作为源端（CHARACTER、GRAPHIC、VARCHAR、VARGRAPHIC）末尾含有空格和回车符导致数据同步不一致的问题
- 修复 SQL Server ColReader 在读取 CHAR/NCHAR 类型数据时不需要 Trim
- 修复 SQL Server 对端写入 Update/Where 字段列名没有添加引号限定符的问题
- 修复 StarRocks 写入大数据量（100MB以上）失败的问题
- 修复 MySQL -> Doris 因为 default 值单引号没有转义造成结构迁移报错的问题
- 修复 MySQL -> RabbitMQ 创建任务第一步对端测试连接报空指针的问题
- 修复 MySQL &lt;-&gt; MySQL 双向同步开启 sqlCaseConversionEnable 使 /*ccw*/ 防循环标识丢失
- 修复 MySQL -> MySQL 全库同步失败的问题
- 修复 MySQL 部分版本默认不设置 useSSL=false 会报异常的问题
- 修复 PostgreSQL/SQL Server/Dameng 作为对端 MULTI_SQL 模式下监控指标数据缺失的问题
- 修复 PostgreSQL/Dameng/SQL Server 监控指标记录不准确的问题
- 修复 PostgreSQL 作为对端 COPY 模式下源端 NULL 写入对端为空字符串的问题
- 修复 数据库时区与连接串 serverTimeZone 时区不同导致的任务异常问题

