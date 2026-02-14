---
id: rds_mysql_ram_least_privilege
title: Least-privilege Permissions of a RAM User
description: This page describes the required least privileges for a Alibaba Cloud RAM user.
---

When adding a Alibaba Cloud DataSource to BladePipe or synchronizing its data with BladePipe, AccessKey ID and AccessKey Secret (AK/SK) are required to provide, together with certain permissions of the RAM user. This page introduces the least-privilege permissions for BladePipe to synchronize data in RDS for MySQL.

## Required Permissions
### Add a Alibaba Cloud DataSource

For adding a RDS for MySQL instance, see [Add a Alibaba Cloud DataSource](../operation/datasource_manage/add_aliyun_ds.md). The permissions of a RAM user can be configured by a master account at [RAM Permission Policies](https://ram.console.aliyun.com/policies/edit).

The permissions required of a RAM user is as follows: 

| Permission | Description |
| --- | --- |
| rds:DescribeDBInstances  | Query the list of instances |
| rds:DescribeDBInstanceNetInfo  | Query the IP addresses of instances |
| rds:DescribeDBInstanceAttribute  | Query the attributes of instances |
| rds:DescribeDBInstanceIPArrayList  | Query the IP whitelist of RDS instances |
| rds:ModifySecurityIps  | Modify the IP whitelist |
| rds:AllocateInstancePublicConnection  | Allocate public IP addresses to instances |
| rds:DescribeDatabases  | View the information of databases in a instance |
| rds:DescribeAccounts  | Query the account information |
| rds:CreateDatabase  | Create databases |
| rds:CreateAccount  | Create accounts |
| rds:GrantAccountPrivilege  | Grant permissions to accounts to access databases |
| rds:DescribeBinlogFiles  | View Binlog |
| rds:DescribeBackupPolicy  | Query backup policies |
| rds:ModifyBackupPolicy  | Modify backup policies |


### Add a Alibaba Cloud DataSource as a Self-managed DataSource

To grant the fewest permissions, some users may add a RDS for MySQL instance as a self-managed DataSource, and then change it to the type of Alibaba Cloud DataSource.

In this way, the permissions required of a RAM user is as follows: 

| Permission | Description |
| --- | --- |
| rds:DescribeDBInstanceIPArrayList  | Query the IP whitelist of RDS instances |
| rds:ModifySecurityIps  | Modify the IP whitelist |
| rds:DescribeBinlogFiles  | View Binlog |
| rds:DescribeBackupPolicy  | Query backup policies |
| rds:ModifyBackupPolicy  | Modify backup policies |
:::info
The above permissions are the minimum permissions for running DataJobs. If the DataJob has special requirements, such as creating a new database, you can add additional permissions or manually build a database.
:::

## Grant Permissions to Access Alibaba Cloud DataSource
1. In the top navigation bar, click **Settings**.
2. In the left-side navigation pane, click **Third-party**. 
3. Enter the AccessKey ID and AccessKey Secret with the permissions to call the OpenAPI of DataSources.
4. Click **Authorized**.
:::info
If you do not want BladePipe to store the AccessKey ID and AccessKey Secret, you can open the window again after adding the DataSource and click **Remove Access**.
:::
