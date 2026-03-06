---
id: service_difference
title: Granularity and Specifications
description: This page describes how BladePipe define a link for different connectors.
---
## DataJob Granularity

BladePipe DataJob refer to configuration groups that complete a data migration, synchronization, verification, correction, and other goals for a specific database, and perform actual actions successively through a set of specific processes.

BladePipe DataJob is also called **Link**.

Individual DataJob migrate or synchronize maximum and minimum database scopes (granularity) depending on the database type. This is shown in the following table.

|Source DataSource | The Maximum Granularity of a Link | The Minimum Granularity of a Link | Active Rows Limited |
| --- | --- | --- | --- |
| MySQL | Multiple Schemas | Single Table |  Unlimited |
| Oracle | Single Schema | Single Table | Unlimited |
| SQLServer | Single Schema | Single Table | Unlimited |
| Db2 | Single Schema | Single Table | Unlimited |
| PostgreSQL | Multiple Schemas | Single Table | Unlimited |
| MongoDB | Multiple Schemas | Single Collection | Unlimited |
| OceanBase | Multiple Schemas | Single Table | Unlimited |
| PolarDbX | Multiple Schemas | Single Table | Unlimited |
| StarRocks | Multiple Schemas |Single Table | Unlimited |
| Tunnel | Multiple Schemas | Single Table | Unlimited |
| TiDB | Multiple Schemas | Single Table | Unlimited |
| Kafka | Multiple Topics | Single Topic | Unlimited |
| RocketMQ | Multiple Topics | Single Topic | Unlimited |
| RabbitMQ |  Multiple Queues | Single Queue |Unlimited | 
| AutoMQ | Multiple Topics | Single Topic | Unlimited |
| Hana | Single Schema | Single Table | Unlimited |
| OpenGauss | Multiple Schemas | Single Table | Unlimited |
| Greenplum | Multiple Schemas | Single Table | Unlimited |
| Elasticsearch | Multiple Indexes | Single Index | Unlimited |
| Pulsar | Multiple Topics | Single Topic | Unlimited |
| TDengine | Multiple Schemas | Single Table  | Unlimited |
| Dameng | Multiple Schemas  | Single Table | Unlimited |
| SshFile | Single Catalog  | Single File | Unlimited |
| S3File | Single Bucket  | Single File | Unlimited |
| OssFile | Single Bucket | Single File | Unlimited |

## DataJob Specifications

When a BladePipe DataJob uses a specific set of processes to sequentially complete a data migration / synchronization work, the combination of memory footprint when these processes run is called a specification.

There are four types of processes: **Full Data**, **Incremental**, **Verification**, and **Correction**. The following table briefly describes the specifications that comprise these process memory configurations.

| Specification Number | Series | Process Memory Size |
| --- | --- | --- |
| 1 | Incremental Enhanced | Full Data 1GB，Incremental 2GB，Verification 1GB，Correction 1GB |
| 2 | Incremental Enhanced | Full Data 1GB，Incremental 3GB，Verification 1GB，Correction 1GB |
| 3 | Incremental Enhanced | Full Data 1GB，Incremental 4GB，Verification 1GB，Correction 1GB |
| 4 | Incremental Enhanced | Full Data 2GB，Incremental 3GB，Verification 2GB，Correction 2GB |
| 5 | Incremental Enhanced | Full Data 2GB，Incremental 4GB，Verification 2GB，Correction 2GB |
| 6 | Full Data Enhanced | Full Data 1GB，Incremental 0.5GB，Verification 1GB，Correction 1GB |
| 7 |  Full Data Enhanced | Full Data 2GB，Incremental 0.5GB，Verification 2GB，Correction 2GB |
| 8 |  Full Data Enhanced | Full Data 3GB，Incremental 0.5GB，Verification 3GB，Correction 3GB |
| 9 |  Full Data Enhanced | Full Data 4GB，Incremental 0.5GB，Verification 4GB，Correction 4GB |
| 10 |  Full Data Enhanced | Full Data 2GB，Incremental 1GB，Verification 2GB，Correction 2GB |
| 11 |  Full Data Enhanced | Full Data 3GB，Incremental 1GB，Verification 3GB，Correction 3GB |
| 12 |  Full Data Enhanced | Full Data 4GB，Incremental 1GB，Verification 4GB，Correction 4GB |
| 13 |  Full Data Enhanced | Full Data 3GB，Incremental 2GB，Verification 3GB，Correction 3GB |
| 14 |  Full Data Enhanced | Full Data 4GB，Incremental 2GB，Verification 4GB，Correction 4GB |
| 15 | Balanced | Full Data 1GB，Incremental 1GB，Verification 1GB，Correction 1GB |
| 16 | Balanced | Full Data 2GB，Incremental 2GB，Verification 2GB，Correction 2GB |
| 17 | Balanced | Full Data 3GB，Incremental 3GB，Verification 3GB，Correction 3GB |
| 18 | Balanced | Full Data 4GB，Incremental 4GB，Verification 4GB，Correction 4GB |
| 19 | Balanced | Full Data 0.5GB，Incremental 0.5GB，Verification 0.5GB，Correction 0.5GB |
| 20 | Incremental Enhanced | Full Data 2GB，Incremental 5GB，Verification 2GB，Correction 2GB |
| 21 | Incremental Enhanced | Full Data 2GB，Incremental 6GB，Verification 2GB，Correction 2GB |
| 22 | Incremental Enhanced | Full Data 2GB，Incremental 7GB，Verification 2GB，Correction 2GB |
| 23 | Incremental Enhanced | Full Data 2GB，Incremental 8GB，Verification 2GB，Correction 2GB |
| 24 | Incremental Enhanced | Full Data 2GB，Incremental 12GB，Verification 2GB，Correction 2GB |
| 25 | Incremental Enhanced | Full Data 2GB，Incremental 16GB，Verification 2GB，Correction 2GB |
| 26 | Incremental Enhanced | Full Data 2GB，Incremental 20GB，Verification 2GB，Correction 2GB |
| 27 | Full Data Enhanced | Full Data 8GB，Incremental 2GB，Verification 2GB，Correction 2GB |
| 28 | Full Data Enhanced | Full Data 16GB，Incremental 2GB，Verification 2GB，Correction 2GB |

Note:
- A balanced version of specification number 16 is recommended and will meet most requirements.
- The 0.5GB memory associated specification is not recommended for production use.
- Sub-DataJob generated by editing subscriptions automatically inherits the specifications of the parent DataJob.
- Only specification numbers 15/16/17/18/19/20/21/22/23/24/25/26 can be used by Modify Parameters.
- Incremental DataTask pre-occupy machine memory (logical), and the occupied memory (logical) is released after a single Full Data/Verification DataTask is completed.