---
id: product_advantage
title: Advantages
description: BladePipe features real-time synchronization, diverse database support, robust stability, one-stop management, flexible deployment, and complex data transformation capabilities.
---

BladePipe provides a modern data integration platform designed for efficiency, stability, and scalability. It handles complex data transformations and supports diverse database engines, delivering a comprehensive solution for your integration needs.

## Real-Time Synchronization

Data synchronization in BladePipe generally operates with **a latency of less than 3 seconds**. The precise **CDC (Change Data Capture)** engine continuously processes incremental data logs, handling batch collection, action filtering, data conversion, metadata mapping, and data writing in real time.

## Diverse Database Support

BladePipe connects a wide range of databases across different versions. It manages the precise mapping and conversion of data types, schemas, and read/write characteristics between your source and target data sources. It also supports automatic **schema evolution** to align structures as your data changes.

## Stability and Scalability

BladePipe builds and scales high-quality data pipelines with confidence. It uses a streamlined, steady single-process architecture at its core. Thousands of concurrent data operations can run reliably on a highly available distributed system.

## One-Stop Management

BladePipe orchestrates your entire ETL workflow from a unified interface. It enables schema migration, initial full data migration, ongoing data synchronization, data verification, and subscription modifications. Operations transition automatically through a finite state machine, vastly simplifying data preparation and long-term synchronization.


## Complex Data Transformation
 
BladePipe executes advanced data processing directly within your pipeline. It provides standard out-of-the-box capabilities such as metadata mapping, transformation, truncation, and filtering. 

For highly tailored scenarios, you can also [upload custom Java code](../operation/job_manage/create_job/create_process_job.md) to resolve complex data transformation requirements.

## Flexible Deployment

BladePipe supports resilient self-hosted, fully-managed cloud, and Bring Your Own Cloud (BYOC) deployment options, attaching great importance to your data security. 

Choose the [deployment model](../price/plans_diff.md) that fits your team's size, needs, and budget.

## Get Started

- Install BladePipe ([Docker](../productOP/onPremise/installation/install_all_in_one_docker.mdx), [K8s](../productOP/onPremise/installation/install_all_in_one_k8s.mdx) or [Binary](../productOP/onPremise/installation/upgrade_all_in_one_binary.md))
- [Start your first pipeline](../quick/quick_start.md)