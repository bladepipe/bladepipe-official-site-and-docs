---
id: add_worker_binary
title: Add a Worker (Binary)
description: This page introduces how to use the Binary package to add a BladePipe Worker.
---

This page introduces how to use the Binary package to add a BladePipe Worker.

## Prerequisite
Please make sure that the BladePipe Console has been installed via Binary.

If not, please install the Console following the doc [Install All-in-One (Binary)](./install_all_in_one_binary.md).

## Procedure

### Deploy Automatically

1. Make sure that there are the SSH access rights to the Console and the Worker.
2. In the top navigation bar, click **Sync Settings** > **Sync Worker**.
3. Click **Workers** in the Operation column.
4. Click **Add Worker** in the upper-right conner, and select **Automatic**. 
5. Fill in the following server information of the Worker and click **Test Connection**.
   
    | Item | Description |
    | :-- | :-- |
    | ip | IP of the Worker |
    | port | Port of the Worker, can be customized |
    | Remote installation path | Installation path |
    | Package path | The path where the installation package is stored |
    | SSH Type | You can choose to log in using **Password** or **Secret Key** |
    | Username | Username of the Worker |

6. Click **Deploy Automatically**.
7. Make sure that the Worker IP has been updated and system metrics have been collected, which means the Worker is successfully installed.


### Deploy Manually

1. Make sure that there are the SSH access rights to the Console and the Worker.
2. In the top navigation bar, click **Sync Settings** > **Sync Worker**.
3. Click **Workers** in the Operation column.
4. Click **Add Worker** in the upper-right conner, and select **Manual**. 
5. Click **Generating Unique Identification**.
6. Get the link of the installation package at [BladePipe website](https://www.bladepipe.com).  
7. Download the package to the specified path.
    ```bash
    cd /home/bladepipe/tar_gz

    wget "{paste the download link got from BladePipe website}" -O bladepipe.tgz
    ```

8. Run the following command to unzip the package.
    ```bash
    tar xavf bladepipe.tgz

    tar xaf bladepipe-core.tar.gz && tar xaf bladepipe-worker.tar.gz && tar xaf bladepipe-ds.tar.gz

    mv /home/bladepipe/tar_gz/bladepipe /home/bladepipe/
    ```

9. Return to the BladePipe Worker list page. Select the Worker to be confirmed, and click **Configuration**. 
10. Click **Get Code** and enter **777777**.
11. Get the unique identification information and click **Copy**.
12. Paste the configuration information to the following Worker configuration file.
    ```shell
    vi /home/bladepipe/bladepipe/global_conf/conf.properties
    ```

13.  Start the Worker.
      ```bash
      cd /home/bladepipe/bladepipe/worker/bin

      sh ./startWorker.sh
      ```
14. Make sure that the Worker IP has been updated and system metrics have been collected, which means the Worker is successfully installed.
