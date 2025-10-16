---
id: rn-cloudcanal-1-0-1
title: 1.0.1
---

## CloudCanal-1.0.1

发版时间:2021年8月12日
版本号: 1.0.1

### 新特性

1. 创建任务支持批量裁剪列
2. 支持MySQL->MySQL数据源数据校验、订正任务
3. 支持数据校验和数据订正任务的重跑
4. 无主键无唯一键表也支持update delete
5. 支持用户自定义配置异步任务调度相关参数
6. parser新增监控项：增量数据处理与写入队列发布延迟
7. 支持oracle->oracle迁移
8. 支持pg->pg 无嵌套结构的array类型结构迁移和同步
9. 新增约束冲突处理策略，针对pg/tidb为对端时，发生duplicated key时支持insert转update逻辑
10. 新增kafka commit log

### BugFix&优化

1. 内核获取列meta信息性能优化
2. 优化页面展示数据源顺序，优先展示使用频次高的数据源
3. 修复polardb reader读取时cpu load异常偏高的问题
4. 修复任务状态展示异常问题
5. Oracle->Oracle结构迁移采用新的schema体系
6. ES写入优化，单主键表使用主键作为默认_id值
7. 修复由于没有获取时间精度、timeformat等ES结构迁移异常
8. 优化oracle 物化视图drop index逻辑
9. 修复ClickHouse写入null值问题
10. 修复mysql->ck无主键表结构迁移问题
11. 修复mysql->pg结构迁移中约束中列的映射问题
12. 隐藏资源限制相关无效页面
13. 修复mysql->tidb同步时schema is null的问题