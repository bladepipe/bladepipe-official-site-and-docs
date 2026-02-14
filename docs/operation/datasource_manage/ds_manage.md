---
id: ds_manage
title: Manage DataSources
description: It describes how to view, modify and delete a connector in BladePipe.
---

This article describes how to manage the added DataSources, including modifying addresses, accounts, etc.

## View DataSource List
1. In the top navigation bar, click **DataSource** to enter the DataSource list page. 
2. The list of DataSources shows all the added DataSources. You can search DataSources by type, DataSource ID, DataSource numeric ID, DataSource description, deployment, network type, and host address.

## Modify a DataSource Address
1. Select the DataSource you want to modify the address of, and click **More** in the Operation column. 
2. Click **Modify Public Address** or **Modify Private Address**. 
3. Enter the modified address in the dialog box and click **Submit**.

## Modify a DataSource Account
1. Select the DataSource you want to modify the account of, and click **More** in the Operation column. 
2. Click **Modify Account**. 
3. In the dialog box, select the security type and fill in the corresponding information, then click **Submit**.

## Delete an Account
1. Select the DataSource of which you want to delete the account, and click **More**. 
2. Click **Delete Account**. 
3. Click **Submit** in the dialog box.

## Modify AccessKey ID (AK)/AccessKey Secret (SK)
1. Select the Alibaba Cloud DataSource you want to modify and click **More**. 
2. Click **Modify Alibaba Cloud AK/SK**. 
3. Enter the appropriate information in the dialog box and click **Submit**.

## Add a Worker into Whitelist
When a Worker is out of the whitelist to access a Alibaba Cloud DataSource or the Worker IP is changed, you can add the Worker into the whitelist in the DataSource list page.
1. Select the Alibaba Cloud DataSource that needs to be modified and click **Add Whitelist**. 
2. Select the cluster to be added in the whitelist and the type of network address. Click **Submit**.

## Test Connection
1. Select the DataSource you want to test the connection to, and click **Test Connection** in the Operation column. 
2. Select the cluster and network type to test and click **Test Connection**.

## Delete a DataSource
1. Select the DataSource to be deleted and click **More**. 
2. Click **Delete**.
3. Enter **DELETE_DATASOURCE** in the dialog box and click **Submit**.
:::tip
A DataSource cannot be deleted if a DataJob has been created using this DataSource and has not been deleted. You need to delete the DataJob related to this DataSource before you can delete it.
:::
