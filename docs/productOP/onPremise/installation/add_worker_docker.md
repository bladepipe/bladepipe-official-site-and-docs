---
id: add_worker_docker
title: Add a Worker (Docker)
description: This page introduces how to add a BladePipe Worker using the Docker.
---

This page introduces how to use the Docker to add a BladePipe Worker.

## Prerequisite

- Docker and [Docker Compose](https://docs.docker.com/compose/install/) have been installed. Please refer to [Minimal Docker Installation](../maintenance/minimal_docker_for_centos.md) for guidance.
- BladePipe has been installed with Docker. Please refer to [Install All-In-One(Docker)](install_all_in_one_docker.mdx) for guidance.

## Procedure

1. Replace the parameter **&lt;version&gt;** in the command below, then execute the command.

   ```bash
   curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/add_one_docker_node.sh | bash -s -- <version> ./bp_home
   ```
   :::info
   Parameter `<version>`: The target version of Worker. Keep it the same as the version of BladePipe console.
   :::

1. Successfully install **Worker**.

   ```bash
   Install new sidecar SUCCESS , enter sidecar container,edit global_conf and restart.
   ```

2. Log in to the BladePipe console, click **Sync Settings** > **Workers**.
3. Click **Add Worker** > **Generating Unique Identification**.
4. Click **Configuration** and copy the content, then modify the `bladepipe.console.domain` value to BladePipe console IP.
    :::info
    The default verify code: 777777
    :::
5. Return to the node. Execute `docker exec -it bladepipe-worker /bin/bash` to log in to the container.
6. Execute `su - bladepipe`.
7. Modify `/home/bladepipe/bladepipe/global_conf/conf.properties`. Paste the config content you copied to the `conf.properties` and save.
8. Enter `/home/bladepipe/bladepipe/worker/bin/` and execute the shell `./startWorker.sh` to start the Worker.

