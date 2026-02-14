---
id: product_scenarios
title: Use Cases
description: BladePipe is usually used for enterprise data warehousing, big data analysis, cloud data migration, and homogeneous and heterogeneous data sync.
---

This topic describes some of the use cases of BladePipe to help you leverage data in business.

![](../assets/product_intro/business_scenarios.png)

## Bidirectional Data Sync

BladePipe enables the two-way data synchronization between databases and message-oriented middleware without circular data replication for **geo-redundancy, data backup and disaster recovery**.

Example: [MySQL Bidirectional Synchronization](../bestPractice/mysql_loop_data_sync.md)

## Data Sync for Data Warehouse

Through real-time synchronization, you can not only use the data easily to meet the mandatory requirements in business, but also leverage the data in many other cases, including but not limited to **complex data retrieval (multi-dimensional screening, aggregation, connection, etc.)**, **fuzzy search**, **sub-business process triggering**, **data sharing**, **data mining**, etc.

Example: [MySQL to ClickHouse Synchronization](https://www.bladepipe.com/blog/tech_share/mysql_clickhouse_sync/)

## Data Sync for Big Data

 **Decouple online business and big data analysis** through message-oriented middleware. Online data appears in message-oriented middleware in real time, and the data is processed by batch or stream processing to build a data platform.

Example: [MySQL to Kafka Synchronization](https://www.bladepipe.com/blog/tech_share/mysql_kafka_sync/)

## Multiple/Hybrid-cloud Data Sync

BladePipe Tunnel data sources allow **databases on both ends not to be exposed to the public network**, and the authentication and encrypted transmission make data synchronization more secure.

Example: [Cross Internet Data Synchronization](../bestPractice/http_base_internet_data_sync.md)

## Data Architecture Upgrade

BladePipe allows uploading custom codes, enabling you to perform complex data migration and synchronization, The data to be migrated or synchronized is transmitted through the bladepipe-sdk interface for data transformation and processing. The remote services can be called during the process. Then the data is returned to BladePipe.

This capability allows you to completely change the old business data structure and **upgrade the business with minimized downtime**.

Example: [Data Synchronization Masking](../bestPractice/encrypt_data_when_sync.md)

## Homogeneous Data Sync
BladePipe supports for data movement between several **homogeneous data sources**, including MySQL, PostgreSQL, Oracle, Kafka, SQL Server, MongoDB, Redis, SAP HANA and TiDB. This functionality brings great convenience to **database upgrading, multiple/hybrid-cloud data sync, cross-region data migration and sync, and data sync for disaster recovery**.

Example: [Sync Data from PostgreSQL to PostgreSQL](https://www.bladepipe.com/blog/tech_share/pg_pg_sync/)

## More

BladePipe facilitates the application of data in various use cases, giving full play to the value of data. More use cases are to be discovered.

Example: [Data Verification and Correction](../bestPractice/verification_and_correction.md)