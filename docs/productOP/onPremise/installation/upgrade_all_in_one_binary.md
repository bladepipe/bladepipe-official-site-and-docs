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

2. Switch to the user bladepipe on the machine deploying BladePipe and go to the **tar_gz** directory.

    ```bash
    sudo su - bladepipe 
    
    cd tar_gz
    ```

3. Create a script file **wgetbinary.sh** and write the following script. 

    ```bash
    #!/bin/bash
    echo "begin download bladepipe.tgz"
    cd ~/tar_gz
    rm -rf ~/tar_gz/bladepipe*
    wget "$1" -O bladepipe.tgz
    if [ $? -eq 0 ];then
        echo "download successful"
        tar xaf bladepipe.tgz
    else
        echo "download fail, please check."
    fi
    ```

4. Download the package obtained in the first step.

    ```bash
    sh wgetbinary.sh "{paste the download link got from BladePipe website}" 
    ```

### Upgrade Console

1. Create a new script file named **upgrade_console.sh** in the **tar_gz** directory and write the following script.
  
    ```bash
    #!/bin/bash
    # check the user bladepipe 
    if [ "$(whoami)" != "bladepipe" ]; then
        echo "Error: as 'bladepipe' user to execute this script."
        exit 1
    fi

    # check the package
    cd /home/bladepipe/tar_gz
    if [ ! -f "/home/bladepipe/tar_gz/bladepipe-console.tar.gz" ];then
        echo "File not exist, extract package first."
        exit
    else
        tar xavf bladepipe-console.tar.gz
    fi
    
    # stop current console
    cd /home/bladepipe/bladepipe/console/bin && sh stopConsole.sh
    
    # backup directory check and build
    BACKUP_DIR="/home/bladepipe/backup"

    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
        echo "Directory $BACKUP_DIR is been created successfully."
    else
        echo "Directory $BACKUP_DIR is exist."
    fi

    # backup the old deployment
    TODAY=$(date +%F)
    TARGET_DIR="$BACKUP_DIR/console_$TODAY"
    SOURCE_DIR="/home/bladepipe/bladepipe/console"

    if [ -d "$TARGET_DIR" ]; then
        rm -rf "$TARGET_DIR"
        echo "Same date backup is been deleted: $TARGET_DIR"
    else
        echo "$TARGET_DIR have no same date backup,continue."
    fi

    mv "$SOURCE_DIR" "$TARGET_DIR"
  
    # update console
    cp -r /home/bladepipe/tar_gz/bladepipe/console /home/bladepipe/bladepipe

    ORIGIN_CONF="$TARGET_DIR/conf/business-north_america.properties"
    cp "$ORIGIN_CONF" /home/bladepipe/bladepipe/console/conf/

    # start console
    cd /home/bladepipe/bladepipe/console/bin && sh startConsoleAndUpdDb.sh
    ```

2. Run the scripts.

    ```bash
    sh upgrade_console.sh
    ```

3. (**Optional**) If an upgrade error occurs and BladePipe is not functionable, you can perform the following **rollback** operation.

    ```bash
    cd /home/bladepipe/cloudcanal/
    
    mv console console_error_`date +%F`
    
    mv /home/bladepipe/backup/console_`date +%F` ./console
    
    cd console/bin && sh startConsole.sh
    ```

### Upgrade a Worker

#### Upgrade Automatically

1. Make sure that there are the **SSH** access rights to the **Console** and the **Worker**.
2. Log in to the Console, and navigate to **Sync Settings** > **Sync Worker**.
3. Click **Workers** in the Operation column.
4. Select the Worker, and click **More** > **Upgrade Worker**.
5. Enter the Worker's **username and password** or **key address** to upgrade. 
6. (**Optional**) If an upgrade error occurs and BladePipe is not functionable, you can **roll back**: click **Sync Worker** > **Workers** > **More** > **Roll Back Worker**.


#### Upgrade Manually

1. Create a script file named **upgrade_sidecar.sh** in the **tar_gz** directory and write the following script:

    ```bash
    #!/bin/bash
    cd /home/bladepipe/tar_gz
    rm -rf bladepipe bladepipe-*
    if [ ! -f "/home/bladepipe/tar_gz/bladepipe.tgz" ];then
        echo "file not exist,please check!!!!!!!"
        exit
    else
        tar xavf bladepipe.tgz
        tar xaf bladepipe-core.tar.gz && tar xaf bladepipe-sidecar.tar.gz && tar xaf bladepipe-ds.tar.gz
    fi
    source /etc/profile
    cd /home/clougence/cloudcanal
    mkdir /home/clougence/backup/cloudcanal_`date +%F`
    mv /home/bladepipe/bladepipe/{bladepipe,ds_lib,release_info,sidecar} /home/clougence/backup/bladepipe_`date +%F`
    cp -r /home/bladepipe/tar_gz/bladepipe/{bladepipe,ds_lib,release_info,sidecar} /home/bladepipe/bladepipe
    jps -l|grep -E 'task|SidecarApplication'|awk '{print $1}'|xargs kill -9
    cd /home/bladepipe/bladepipe/worker/bin && sh startWorker.sh
    ```

2. Run the scripts.

    ```bash
    sh upgrade_sidecar.sh
    ```

3. (**Optional**) If an upgrade error occurs and BladePipe is not functionable, you can perform the following **rollback** operation.

    ```bash
    mkdir /home/bladepipe/bladepipe/bladepipe_error_`date +%F`
    
    mv /home/bladepipe/bladepipe/{bladepipe,ds_lib,release_info,sidecar} /home/bladepipe/bladepipe/bladepipe_error_`date +%F`
    
    mv /home/bladepipe/bladepipe/bladepipe_`date +%F`/{bladepipe,ds_lib,release_info,sidecar} /home/bladepipe/bladepipe
    
    jps -l|grep -E 'task|SidecarApplication'|awk '{print $1}'|xargs kill -9
    
    cd /home/bladepipe/bladepipe/worker/bin && sh startWorker.sh
    ```
