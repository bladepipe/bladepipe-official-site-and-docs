---
id: rn-cloudcanal-1-0-2
title: 1.0.2
---

## CloudCanal-1.0.2

发版时间:2021年8月20日
版本号: 1.0.2

### 新特性

1. 新增Oracle源端
2. 新增PostgreSQL源端
3. 新增Greenplum源端
4. 新增PolarDbMySQL源端
5. 新增Oracle目标端
6. 新增PostgreSQL目标端
7. 新增Greenplum目标端
8. 新增Hive目标端
9. 新增DRDS目标端
10. 新增PolarDbMySQL目标端
11. 新增AdbForMySQL目标端
12. 新增校验任务结果查看
13. 支持ClickHouse最新版本到22.1
14. ClickHouse 新增 ReplacingMergeTree 支持，并且默认选中该表引擎

### BugFix&优化

1. 修复timestamp on update current timestamp不同步问题
2. 修复树状选择，筛选表，勾选掉一张表后又加载全部的问题
3. 修复校验、订正任务重跑刷新的问题
4. 修复源端阿里云 kafka 初始位点问题
5. 修复Clickhouse对端同步无主键表问题
6. 修复sidecar stdout打印过多日志问题
7. 修复Kafka任务，获取分区NPE问题
8. 修复因机器规格低导致的sidecar访问管控超时问题
9. 修复机器timezone非东八区时的时区问题，现在CloudCanal时间值的写入和机器操作系统时区解耦
10. 修复sidecar容器重启，sidecar进程没法正常重启的问题
11. 优化写入对端 RocketMQ 性能
12. 放开任务创建数量限制
