---
id: worker_manage
title: Manage Workers
---

This article introduces various operations related to the Worker.

## Add a Worker
BladePipe allows you to add Workers. For more information, see [Install Worker (Docker)](../../../productOP/byoc/installation/install_worker_docker.md) and [Install Worker (Binary)](../../../productOP/byoc/installation/install_worker_binary.md).

## Add Whitelist

If the address of the Worker has been changed or the single list of the dataSource has been sent, the dataSource needs to be added to the white list again. You can add it by dataSource on the dataSource management page, or add it by Worker ip on the Worker management page. 

To add a whitelist by Worker, the system will add the whitelist of the Worker to these dataSources in sequence according to the dataSources related to the DataTask bound on the Worker.

1. Select the Worker that needs to be added to the whitelist, and click **More**.
2. Click **Check Whitelist**.
3. Select the IP type to be checked, and click **Check Whitelist**.
4. If there is no dataSource that needs to be added, indicate the DataTask-related dataSource bound to the current Worker and the whitelist that has been added to the Worker, and there is no need to add it repeatedly.
5. If there is a dataSource that needs to be added, click **More**.
6. Click **Add Whitelist**.
7. Select the IP type to be added, and click **Add Whitelist**.
8. The operation is an async consoleJob and will be performed in the background.
9. The whitelist is added successfully.

## Search Binding DataTask

It supports searching DataTask by dataSource on the Worker management page.
1. Click **Search Binding DataTask** in the upper-right corner.
2. Select the dataSource associated with the DataTask to be queried, and click **Search**.
3. The DataTask associated with the dataSource appear in the list.

## Schedule DataTask Manually

BladePipe supports automatic scheduling DataTask. But for Worker migration or other purposes, BladePipe also supports manual scheduling DataTask. For more information, see [Schedule DataJob](../../job_manage/job_op/job_schedule.md).

## Overcommit Worker Memory

See [Overcommit Worker Memory](oversell_mac_memory.md)