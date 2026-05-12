---
id: upgrade_all_in_one_binary
title: Upgrade All-In-One (Binary)
description: This page introduces how to upgrade BladePipe On-Premise Binary version.
---

This page introduces how to upgrade BladePipe On-Premise Binary version.


## Prerequisites

Please make sure that the BladePipe Console has been installed via Binary.

If not, please install the Console following the doc [Install All-in-One (Binary)](./install_all_in_one_binary.md).

## Procedure

### Download the Package

1. Get the link of the latest installation package at [BladePipe website](https://www.bladepipe.com). 

2. Switch to the user `bladepipe` on the machine where BladePipe is deployed.

    ```bash
    sudo su - bladepipe 
    ```

3. Download the package to the **tar_gz** directory and extract it.

    ```bash
    cd ~/tar_gz

    wget "{paste the download link got from BladePipe website}" -O bladepipe.tgz

    tar -xaf bladepipe.tgz
    ```

### Upgrade Automatically

- Make sure that the **Console** can log in to the target node through **SSH**.

  :::info
  If the **Console** and **Worker** are deployed on the same server, also make sure that `ssh bladepipe@127.0.0.1` can log in successfully on that server. The automatic upgrade executes upgrade scripts through this SSH channel.
  :::

#### Upgrade Console

1. Log in to the Console, and click **Sync Settings** > **Console** > **Upgrade**.

2. Enter the node's **username and password** or **key address** to upgrade.

#### Upgrade Worker

1. Log in to the Console, and click **Sync Settings** > **Sync Worker** > **Workers** > **More** > **Upgrade Worker**.

2. Enter the Worker's **username and password** or **key address** to upgrade.

3. (**Optional**) If an upgrade error occurs and BladePipe is not functional, you can **roll back**: click **Sync Settings** > **Sync Worker** > **Workers** > **More** > **Roll Back Worker**.

### Upgrade Manually

- Download and extract the manual upgrade scripts.

    ```shell
    wget -cO "bp_upgrade_scripts.tgz" "https://bladepipe-docker.s3.amazonaws.com/scripts/bp_upgrade_scripts.tgz"
  
    mkdir -p ~/tar_gz/scripts

    tar -zxvf bp_upgrade_scripts.tgz -C ~/tar_gz/scripts
    ```

#### Upgrade Console

- Run the upgrade script.

    ```shell
    bash ~/tar_gz/scripts/upgrade_console.sh
    ```

- (**Optional**) If an upgrade error occurs and BladePipe is not functional, run the rollback script.

    ```shell
    bash ~/tar_gz/scripts/rollback_console.sh
    ```

#### Upgrade a Worker

- Run the upgrade script.

    ```shell
    bash ~/tar_gz/scripts/upgrade_worker.sh
    ```

- (**Optional**) If an upgrade error occurs and BladePipe is not functional, run the rollback script.

    ```shell
    bash ~/tar_gz/scripts/rollback_worker.sh
    ```
