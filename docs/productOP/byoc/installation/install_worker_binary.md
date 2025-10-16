---
id: install_worker_binary
title: Install Worker (Binary)
description: Install BladePipe Worker in your local environment using Binary Package.
---

This page describes how to install a **BladePipe Worker** in your local environment using a **binary package**.

## Prerequisites

### Prepare Hardware and OS

| **Hardware/OS** | **Requirement**                   |
|------------|-------------------------------|
| Operating System | CentOS/RHEL, Ubuntu, MacOS    |
| CPU Architecture | x86, arm64                    |
| CPU Cores  | 4                             |
| RAM        | 8 GB                          |

### Prepare Environment

Before deployment, make sure that the following ports are unoccupied.

  | Component        | Port   | Purpose           |
  |--------| ------------- | ----------- |
  | BladePipe-Worker | 8083, 8085 | To run the Worker |

## Procedure
1. Log in to the **[BladePipe Cloud](https://cloud.bladepipe.com)**.
2. In the top navigation bar, click **Sync Settings** > **Sync Worker**.
3. Click **Add Cluster** in the upper right corner to add a cluster.
4. Run the following command to install the **BladePipe Worker** in your local environment using a binary package:
    ```shell
    /bin/bash -c "$(curl -fsSL https://download.bladepipe.com/binary/install_run.sh)"
    ```
    :::info
    BladePipe uses **BYOC** (Bring Your Own Cloud) deployment model.

    The Worker is installed in your local environment, and BladePipe Cloud monitors all the Workers you create.
    
    BladePipe will never access your databases directly. Only the Workers can do so.
    
    For more information, see **[Connect Worker to BladePipe Cloud](../maintenance/worker_network.md)**.
    :::
5. Obtain the **BladePipe Worker** configuration.
    1. Click **Workers** in the Operation column.
    2. Click **Add Worker** > **Create a Worker**. 
    3. Click **Configuration** > **Get Code**. A verification code is sent to your e-mail box. Enter the code in the dialog box.
    4. Copy the **configuration**.
      ```
      bladepipe.auth.ak=***
      bladepipe.auth.sk=***
      bladepipe.worker.wsn=***
      bladepipe.console.domain=***
      ```
   5. Paste the **configuration** you copied in **Step iv**.
6. Check the worker status on the **BladePipe Cloud**.
   1. Click **Sync Settings** > **Sync Worker** > **Workers**.
   2. Make sure the Worker status is **Online**.