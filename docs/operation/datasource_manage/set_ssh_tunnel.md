---
id: set_ssh_tunnel
title: Connect using SSH
description: It tells how to connect BladePipe to connectors via an SSH tunnel.
---
BladePipe supports connecting to data sources via an **SSH tunnel**. This guide explains how to configure SSH tunnel access in BladePipe.

## Supported Data Sources
- **Self-managed Databases**: MySQL, MariaDB, PostgreSQL, Greenplum, StarRocks, Doris, SelectDB (not Alibaba Cloud-hosted), ClickHouse, OpenGauss
- **Alibaba Cloud DataSources**: Alibaba Cloud RDS for MySQL/PostgreSQL, Alibaba Cloud PolarDB for PostgreSQL, Alibaba Cloud ADB for PostgreSQL
- **AWS DataSources**: AWS Aurora for MySQL/PostgreSQL, AWS RDS for MySQL/MariaDB/PostgreSQL
- **Azure DataSources**: Azure for MySQL/MariaDB/PostgreSQL

## Prepare a Jump Server
Before configuration, prepare a lightweight virtual machine (e.g., 1 vCPU, 1 GB RAM) as the **jump server**. Ensure that:
- The jump server can be accessed via SSH from the BladePipe worker.  
- The jump server can access the target databases.

## Configure SSH Tunnel Access
### Option 1: Configure when Adding DataSources
1. Enter the required connection details for your DataSource. For **Address**, enter the address accessible from the jump server.  
   :::warning
   During this step, **DO NOT click “Test Connection”**.
   :::

2. Modify the following parameters in Extra Info:  
   - **proxyMode**: set to **SSH**. 
   - **remoteProxyIp**: set to the jump server IP address accessible from the BladePipe worker.  
   - **remoteProxyPort**: set to the SSH port of the jump server (default: `22`).  
   - **remoteProxyAccount**: set to the SSH username for the jump server. 
   - **remoteProxyPwd**: set to the SSH password for the jump server.  

3. Click **Add DataSource** to save.  
4. On the DataSource list page, find the newly added DataSource and click **Test Connection** in the **Operation** column to verify connectivity.

### Option 2: Configure for an Existing DataSources
1. On the DataSource list page, click **More** > **Modify DataSource Params**.  
2. Modify the following parameters:  
   - **proxyMode**: set to **SSH**. 
   - **remoteProxyIp**: set to the jump server IP address accessible from the BladePipe worker.  
   - **remoteProxyPort**: set to the SSH port of the jump server (default: `22`).  
   - **remoteProxyAccount**: set to the SSH username for the jump server. 
   - **remoteProxyPwd**: set to the SSH password for the jump server.  
3. Click **Save**.
4. On the DataSource list page, find the newly added DataSource and click **Test Connection** in the **Operation** column to verify connectivity.

## Modify IP Whitelist
### Get BladePipe Worker IP List
- **For On-Prem or BYOC**:  
  1. Log in to the BladePipe and go to **Sync Settings** > **Sync Worker**.  
  2. Select the relevant cluster and click **Workers**.  
  3. Click the ![](../../assets/set_ssh_tunnel/1.png) icon next to each worker description to view **Public Network** for the outbound IP addresses.

- **For SaaS**:
  1. Log in to the BladePipe and click **Sync Settings**.  
  2. Select the relevant cluster and click **Machine IP List**.

### Add BladePipe Worker IPs to Jump Server Whitelist
Add the BladePipe worker IPs to your jump server’s access whitelist using one of the following methods:
- Use **iptables** to restrict SSH access to the BladePipe worker IPs.  
- On public cloud environments, use **security groups** to limit SSH port access to the BladePipe worker IPs.