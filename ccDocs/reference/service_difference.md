---
id: service_difference
title: 任务粒度和规格说明
---
## 任务粒度

CloudCanal 任务是指对特定数据库完成一种数据搬迁、同步、校验、订正等目标的配置组，通过一组特定进程先后执行完成实际动作。

CloudCanal 任务有时候也叫做链路。

单个任务迁移或同步最大和最小数据库范围(粒度)根据不同数据库类型有所区别。具体如下表所示

| 源端数据库类型 | 单个任务最大颗粒度 | 单个任务最小颗粒度 |
| --- | --- | --- |
| MySQL | 多个 Schema | 单个表 |
| Oracle | 单个 Schema | 单个表 |
| SQL Server | 单个 Schema | 单个表 |
| Db2 | 单个 Schema | 单个表 |
| PostgreSQL | 多个 Schema | 单个表 |
| MongoDB | 多个 Schema | 单个 Collection |
| OceanBase | 多个 Schema | 单个表 |
| PolarDB-X | 多个 Schema | 单个表 |
| StarRocks | 多个 Schema | 单个表 |
| Tunnel | 多个 Schema | 单个表 |
| TiDB | 多个 Schema | 单个表 |
| Kafka | 多个 Topic | 单个 Topic |
| RocketMQ | 多个 Topic | 单个 Topic |
| RabbitMQ | 多个 Queue | 单个 Queue |
| AutoMQ | 多个 Topic | 单个 Topic |
| Hana | 单个 Schema | 单个表 |
| OpenGauss | 多个 Schema | 单个表 |
| Greenplum | 多个 Schema | 单个表 |
| Elasticsearch | 多个 Index | 单个 Index |
| Pulsar | 多个 Topic | 单个 Topic |
| TDengine | 多个 Schema | 单个表 |
| 达梦 | 多个 Schema  | 单个表 |
| SshFile | 单个目录  | 单个文件 |
| S3File | 单个 Bucket  | 单个文件 |
| OssFile | 单个 Bucket  | 单个文件 |

## 任务规格

CloudCanal 任务使用一组特定进程先后执行完成数据迁移同步目标时，这些进程运行时内存占用大小的组合叫做规格。

进程类型主要包括全量迁移、增量同步、数据校验、数据订正 4 种。下表简要介绍下这些进程内存配置组成的规格。

| 规格编号 | 规格系列 | 进程内存大小 |
| --- | --- | --- |
| 1 | 增量增强型 | 全量 1GB，增量 2GB，校验 1GB，订正 1GB |
| 2 | 增量增强型 | 全量 1GB，增量 3GB，校验 1GB，订正 1GB |
| 3 | 增量增强型 | 全量 1GB，增量 4GB，校验 1GB，订正 1GB |
| 4 | 增量增强型 | 全量 2GB，增量 3GB，校验 2GB，订正 2GB |
| 5 | 增量增强型 | 全量 2GB，增量 4GB，校验 2GB，订正 2GB |
| 6 | 全量增强型 | 全量 1GB，增量 0.5GB，校验 1GB，订正 1GB |
| 7 | 全量增强型 | 全量 2GB，增量 0.5GB，校验 2GB，订正 2GB |
| 8 | 全量增强型 | 全量 3GB，增量 0.5GB，校验 3GB，订正 3GB |
| 9 | 全量增强型 | 全量 4GB，增量 0.5GB，校验 4GB，订正 4GB |
| 10 | 全量增强型 | 全量 2GB，增量 1GB，校验 2GB，订正 2GB |
| 11 | 全量增强型 | 全量 3GB，增量 1GB，校验 3GB，订正 3GB |
| 12 | 全量增强型 | 全量 4GB，增量 1GB，校验 4GB，订正 4GB |
| 13 | 全量增强型 | 全量 3GB，增量 2GB，校验 3GB，订正 3GB |
| 14 | 全量增强型 | 全量 4GB，增量 2GB，校验 4GB，订正 4GB |
| 15 | 平衡型 | 全量 1GB，增量 1GB，校验 1GB，订正 1GB |
| 16 | 平衡型 | 全量 2GB，增量 2GB，校验 2GB，订正 2GB |
| 17 | 平衡型 | 全量 3GB，增量 3GB，校验 3GB，订正 3GB |
| 18 | 平衡型 | 全量 4GB，增量 4GB，校验 4GB，订正 4GB |
| 19 | 平衡型 | 全量 0.5GB，增量 0.5GB，校验 0.5GB，订正 0.5GB |
| 20 | 增量增强型 | 全量 2GB，增量 5GB，校验 2GB，订正 2GB |
| 21 | 增量增强型 | 全量 2GB，增量 6GB，校验 2GB，订正 2GB |
| 22 | 增量增强型 | 全量 2GB，增量 7GB，校验 2GB，订正 2GB |
| 23 | 增量增强型 | 全量 2GB，增量 8GB，校验 2GB，订正 2GB |
| 24 | 增量增强型 | 全量 2GB，增量 12GB，校验 2GB，订正 2GB |
| 25 | 增量增强型 | 全量 2GB，增量 16GB，校验 2GB，订正 2GB |
| 26 | 增量增强型 | 全量 2GB，增量 20GB，校验 2GB，订正 2GB |
| 27 | 全量增强型 | 全量 8GB，增量 2GB，校验 2GB，订正 2GB |
| 28 | 全量增强型 | 全量 16GB，增量 2GB，校验 2GB，订正 2GB |

:::info
- 建议使用编号为 16 的平衡型规格，能满足大部分要求。
- 0.5GB 内存关联的规格不建议在生产使用。
- 编辑订阅生成的子任务会自动继承主任务的规格。
- 通过修改参数修改规格，编号范围为 15/16/17/18/19/20/21/22/23/24/25/26。
- 增量任务会预占用机器内存(逻辑)，单次全量/校验任务完成后会释放占用的内存(逻辑)。
:::
