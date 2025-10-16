---
id: rn-cloudcanal-1-2-1
title: 1.2.1
---

## CloudCanal-1.2.1

发版时间:2021年11月12日
版本号: 1.2.1

### 新特性

1. 支持 MySQL/PolarDBMySQL 源端周期性探测心跳能力（dbHeartbeatEnable，dbHeartbeatOp，dbHeartbeatIntervalSec 参数），此特性主要解决无任何变更延迟问题
2. 支持多阶段性能调优(fetchFromBrokerTimeoutMs，actionFilterParallel，dataProcessParallel，waitStrategy，parseBinlogBufferSize 参数)
3. 支持数据过滤表达式（col % 数字 = 数字），此功能对于想要做数据水平拆分的业务比较实用
4. 支持对端 ADB MYSQL 虚拟列能力
5. 支持 kudu 对端表名映射新规则
6. 支持修改 console 和 sidecar 之间通信超时时间
7. 支持并验证腾讯云 RDS for MySQL(5.6 无心跳包问题) 和华为云 RDS for MySQL(默认binlog保留时间为0问题)
8. 新增 [OpenAPI java SDK](https://gitee.com/clougence/cloudcanal-openapi-sdk) , 帮助用户更容易集成 CloudCanal 产品
9. 支持 MacOS M1/M1X （linux aarch64）, azul-1.8 JDK(非 docker 部署方式)

### 优化

1. 优化刷新元数据间隔时间，从 24 小时变成 6 小时
2. 优化 MySQL 表选择，默认去掉视图和系统表
3. console默认的启动堆大小修改为1024MB，避免创建任务涉及表数量较多时OOM
4. 规格预检算法避免计算所有的任务阶段，导致需求的内存比实际情况多很多导致预检失败

### BugFix

1. 修复任务列表展示，子任务状态机误用主任务状态机导致任务删除不了问题
2. 修复 MySQL -> Greenplum DDL 同步转换的问题
3. 修复 MySQL 增量任务位点中的 server id 可能碰到非链接机器 server id 问题，此问题可能导致在主备切换时任务中断
4. 修复任务添加数据过滤条件后，全量和校验任务统计数据不准的问题
5. 修复 MySQL/PolarDBMySQL 目标端 bit 类型写入问题
6. 修复 ADB MYSQL 对端初始化数据处理器问题
7. 修复 PolarDBMySQL 源端增量无法重置位点的问题
8. 通过升级 MySQL 驱动版本，修复可能报 ssl 协议不支持问题
