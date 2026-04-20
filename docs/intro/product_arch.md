---
id: product_arch
title: Architecture
description: BladePipe features an advanced architecture designed for high scalability, disaster recovery, and automated failover.
---

This topic describes the core architecture of BladePipe.

## Product Architecture

The following diagram illustrates the architecture:

![bladepipe product architecture](../assets/product_arch/product_arch_over_all.png)

BladePipe consists of three main components:

- **Console**   
  The Console acts as the central control plane. 
  
  It uses a scalable web server cluster for centralized management. It manages the lifecycles of DataSources, Workers, and DataJobs. It also handles disaster recovery scheduling, system monitoring, alerting, and metadata management.

- **Worker**    
  Workers deploy on the machines executing your DataJobs. 
  
  They fetch DataJob configurations from the Console, and start, stop, and monitor DataJobs. They also report job statuses and perform regular health checks.

- **BladePipe Core**   
  The Core engine runs on the machines executing your DataJobs. 
  
  It handles specific data tasks, including data migration, synchronization, verification and correction.

## Core Architecture

The following diagram illustrates the architecture of BladePipe Core:

![bladepipe core arch](../assets/product_arch/core_arch.png)

- **DataSource Plug-in**   
  These plug-ins contain the read and write logic, metadata extraction, and corresponding drivers. Each plug-in remains isolated via Java class loaders. A DataJob only loads the exact plug-ins needed for its specific data sources.

- **Core**   
  The Core layer contains the foundational execution code. It manages action filtering, metadata mapping, and DDL conversion. It also executes your custom data processing logic.

- **Support**   
  The Support layer manages background configuration. It handles metadata, DataJob configurations, and position tracking. It also collects monitoring metrics and facilitates communication with the Console.

## Disaster Recovery

BladePipe ensures continuous operations through robust disaster recovery mechanisms.

![bladepipe_disaster_recovery_design](../assets/product_arch/disaster_tolerate.png)

- **Console Disaster Recovery**   
  The Console supports cluster deployment for high availability. The underlying metadata database securely manages all stateful data.

- **DataJob Level 1 Disaster Recovery**   
  The Console continuously monitors Worker health and connection leases. If a Worker crashes or loses network connectivity, the Console automatically assigns its tasks to another healthy Worker.

- **DataJob Level 2 Disaster Recovery**   
  Workers monitor their own assigned DataJobs. If a DataJob process fails while the Worker remains healthy, the Worker triggers a restart or termination based on the Console's specified status.

## Multiple/Hybrid Cloud Network

BladePipe implements strict network security measures for multi-tenant and distributed deployments. It prioritizes the security of your data pipelines.

![bladepipe_network_security](../assets/product_arch/network.png)

- **One-way Connection**    
  Workers initiate outbound connections to the Console. They never actively expose internal network ports.

- **HTTPS Protocol**   
  All communication between Workers and the Console uses HTTPS. This prevents data theft and tampering.

- **Data in Private Network**   
  All data transfer happens exclusively within your intranet. BladePipe interacts securely with your data sources inside your own network environment.

- **AccessKey & SecurityKey Authentication**   
  BladePipe maintains secure TCP persistent connections. It authenticates every connection using your unique AccessKey and SecurityKey.

- **Request Validation**   
  The Console verifies every Worker request to ensure proper resource attribution.

- **Operation Audit**   
  The system audits all Worker communications with the Console. Every action remains fully traceable.
