---
id: rn-cloudcanal-1-2-0
title: 1.2.0
---

## CloudCanal-1.2.0

发版时间:2021年10月28日
版本号: 1.2.0

### 新链路

1. 支持 MySQL 到 PolarDB-X 链路(结构迁移、全量、增量、数据校验）,具体操作参考文章 [5分钟搞定 MySQL 到 PolarDB-X 数据迁移和同步](https://www.clougence.com/blog/data_sync_sample/mysql_polardbx_sync)

### 新特性

1. 支持 MySQL->MySQL 双向同步新方案-数据标记方式，性能更好、更稳定，详见文章[异地多活基础之数据双向同步进阶篇](https://www.clougence.com/blog/data_sync_sample/loop_data_sync_advance)
2. 支持 OpenAPI ,包含数据源、集群查询，任务查询、创建、启停等，详见 [OpenAPI 文档](https://www.clougence.com/docs/openCenter/openApi/apiUseReference/api_common_parameters) 和文章 [如何快速将CloudCanal集成到你自己的平台](https://www.clougence.com/docs/bestPractice/use_open_api_to_integrate_cc), 如何编码参考 [sdk 项目](https://gitee.com/clougence/cloudcanal-openapi-sdk)
3. 支持 MySQL & PolarDBMySQL 对端增量同步整行替换(dstWholeReplace参数), insert/update 均会被转成 INSERT…ON DUPLICATE KEY UPDATE
4. 支持 ClickHouse 自动定时 Optimize (autoOptimizeThresholdSec参数)
5. 支持自定义复杂数据过滤条件(SQL where 条件，AND OR > < = in 等组合)
6. 支持对端为 MQ , 编辑任务加库加表子任务可略过全量迁移
7. 支持并重构 Hive 和 RabbitMQ 对端，解决可用性问题
8. 支持主键为 Decimal 类型的表进行数据迁移(断点续传)
9. 支持自定义设置对端写入 0000-00-00 的替换日期或者时间戳 (defaultZeroDate 参数)
10. 支持企业微信群机器人告警(和钉钉群机器人二选一)
11. 支持已登录用户更改邮箱和手机号(带手机验证码校验)
12. 支持已登录用户获取 AK/SK , 以便 OpenAPI 认证使用(带手机验证码校验)

### 优化

1. 优化数据库元信息捞取性能
2. 优化内核关键日志打印、参数检查与开关开闭
3. 优化 ClickHouse 对端链接/TCP超时等配置
4. 优化 CloudCanal 内置消息格式兼容老版本消息格式(如果db为空，自动填充 schema 信息)
5. 优化丰富后端常量配置接口，让页面更加友好自动化
6. 优化数据过滤规则(SQL where 条件)合法性校验
7. 优化任务创建预检，同时适配 OpenAPI 和自带页面请求
8. 优化短信告警模板，由 10+ 个模板缩减为 3 个
9. 优化去除 csrf token , HTTP_ONLY 设置为 true
10. 优化机器内存的展示

### BugFix

1. 修复 PolarDbMySQL 5.6 源端无主键 binlog 消费问题
2. 修复变更规格时未重新计算任务占用资源问题
3. 修复数据校验任务详情页面进度等信息缺失问题
4. 修复多链路对端写入空字符串特殊处理问题
5. 修复 MySQL 对端 DDL 时链接半开失效问题
6. 修复 PostgreSQL 源端增量前镜像数据缺失问题
7. 修复新增表在全库迁移(同步)场景中有 schema 映射无法同步的问题
8. 修复缓存或消息对端新增列无法同步的问题
9. 修复 MongoDB 源端增量同步问题(可用性)
10. 修复多链路 DDL 同步特殊库/schema 名称问题
11. 修复 Oracle 增量源端反查参数设置问题
12. 修复 MySQL 对端结构迁移重复表报错问题
13. 修复 TiDB & Oracle & PostgreSQL 对端结构迁移问题(default值,数据类型等)
14. 修复 MySQL & PostgreSQL & ElasticSearch & Kudu & TiDB 对端写入的类型问题
15. 修复全库迁移(同步)的任务，结构迁移无法进行问题
16. 修复修改数据源认证信息时，认证类型不生效问题
17. 修复添加自建数据源页面某些数据源测试连接无效问题
18. 修复创建任务时点击上一步下一步数据不更新问题
19. 修复无法创建源端目标端同名的 MySQL-> ElasticSearch 任务问题
20. 修复定时任务查看历史弹窗无法隐藏的问题
21. 修复存在库映射的任务无法进行修改订阅问题
