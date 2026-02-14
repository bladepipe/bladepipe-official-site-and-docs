---
id: upgrade_worker_docker
title: Upgrade Worker (Docker)
description: It guides you to upgrade a BladePipe Worker in your local environment using Docker Compose.
---
This page describes how to upgrade a **BladePipe Worker** in your local environment using **Docker Compose**.

Before you begin, you need to install a **[BladePipe Worker](./install_worker_docker.md)** first.

## Procedure

1. Run the following command to quickly upgrade the BladePipe Worker in your local environment using Docker Compose:
    ```shell
    /bin/bash -c "$(curl -fsSL https://download.bladepipe.com/docker/upgrade.sh)"
    ```

2. Check the worker status on the **[BladePipe Cloud](https://cloud.bladepipe.com)**.
   1. Click **Sync Settings** > **Sync Worker** > **Workers**.
   2. Make sure the Worker status is **Online**.