---
id: service_difference
title: DataJob Granularity Explained
description: Learn the supported scope and memory specifications of a BladePipe DataJob.
---
## DataJob Granularity

A BladePipe DataJob defines the configuration for data migration, synchronization, verification, or correction. It uses a set of processes to perform these operations.

The scope (granularity) of data that a single DataJob can migrate or synchronize depends on the source DataSource type.

| Source DataSource | Maximum scope per DataJob | Minimum scope per DataJob |
| --- | --- | --- |
| MySQL | Single instance<sup>[1]</sup> | Single table |
| Oracle | Single schema | Single table |
| SQL Server | Single schema | Single table |
| Db2 | Single schema | Single table |
| PostgreSQL | Full Data: single instance; Incremental: single database | Single table |
| MongoDB | Single instance | Single collection |
| OceanBase | Single instance | Single table |
| PolarDB-X | Single instance | Single table |
| StarRocks | Single instance | Single table |
| Tunnel | Single instance | Single table |
| TiDB | Single instance | Single table |
| Kafka | Multiple topics | Single topic |
| RocketMQ | Multiple topics | Single topic |
| RabbitMQ | Multiple queues | Single queue |
| AutoMQ | Multiple topics | Single topic |
| Hana | Single schema | Single table |
| OpenGauss | Single instance | Single table |
| Greenplum | Single instance | Single table |
| Elasticsearch | Multiple indexes | Single index |
| Pulsar | Multiple topics | Single topic |
| TDengine | Single instance | Single table |
| Dameng | Single instance | Single table |
| SshFile | Single directory | Single file |
| S3File | Single bucket | Single file |
| OssFile | Single bucket | Single file |

:::info
1. A single instance contains multiple schemas, and each schema contains multiple tables.
:::

## DataJob Specifications

A DataJob specification defines the memory allocated to each of its four process types: **Full Data**, **Incremental**, **Verification**, and **Correction**.

The table below lists the available specifications. All memory values are in GB.

| Specification ID | Series | Full Data | Incremental | Verification | Correction |
| --- | --- | --- | --- | --- | --- |
| 1 | Incremental Enhanced | 1 | 2 | 1 | 1 |
| 2 | Incremental Enhanced | 1 | 3 | 1 | 1 |
| 3 | Incremental Enhanced | 1 | 4 | 1 | 1 |
| 4 | Incremental Enhanced | 2 | 3 | 2 | 2 |
| 5 | Incremental Enhanced | 2 | 4 | 2 | 2 |
| 6 | Full Data Enhanced | 1 | 0.5 | 1 | 1 |
| 7 | Full Data Enhanced | 2 | 0.5 | 2 | 2 |
| 8 | Full Data Enhanced | 3 | 0.5 | 3 | 3 |
| 9 | Full Data Enhanced | 4 | 0.5 | 4 | 4 |
| 10 | Full Data Enhanced | 2 | 1 | 2 | 2 |
| 11 | Full Data Enhanced | 3 | 1 | 3 | 3 |
| 12 | Full Data Enhanced | 4 | 1 | 4 | 4 |
| 13 | Full Data Enhanced | 3 | 2 | 3 | 3 |
| 14 | Full Data Enhanced | 4 | 2 | 4 | 4 |
| 15 | Balanced | 1 | 1 | 1 | 1 |
| 16 | Balanced | 2 | 2 | 2 | 2 |
| 17 | Balanced | 3 | 3 | 3 | 3 |
| 18 | Balanced | 4 | 4 | 4 | 4 |
| 19 | Balanced | 0.5 | 0.5 | 0.5 | 0.5 |
| 20 | Incremental Enhanced | 2 | 5 | 2 | 2 |
| 21 | Incremental Enhanced | 2 | 6 | 2 | 2 |
| 22 | Incremental Enhanced | 2 | 7 | 2 | 2 |
| 23 | Incremental Enhanced | 2 | 8 | 2 | 2 |
| 24 | Incremental Enhanced | 2 | 12 | 2 | 2 |
| 25 | Incremental Enhanced | 2 | 16 | 2 | 2 |
| 26 | Incremental Enhanced | 2 | 20 | 2 | 2 |
| 27 | Full Data Enhanced | 8 | 2 | 2 | 2 |
| 28 | Full Data Enhanced | 16 | 2 | 2 | 2 |

:::info
- Specification **16** (Balanced) is recommended for most use cases.
- Specifications with any process allocated **0.5 GB** are not recommended for production.
- Child DataJobs created by editing subscriptions automatically inherit the parent DataJob's specification.
- When changing specifications through **Modify Parameters**, only IDs **15–26** are supported.
- Incremental DataJobs reserve logical memory on the host. Full Data and Verification DataJobs release their reserved logical memory when each run completes.
:::
