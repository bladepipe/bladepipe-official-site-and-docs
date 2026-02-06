---
id: uninstall_all_in_one_docker
title: Uninstall All-In-One (Docker)
description: This document introduces how to uninstall BladePipe using Docker.
---

This page introduces how to uninstall BladePipe using Docker.

## Procedure

1. Log in to the node which deployed BladePipe.

2. Execute the script blow.
  
   ```bash
   curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/uninstall_on_docker.sh | bash  
   ```
   :::info
   If you are not to clean images, add extra content `-s -- not_del_images` after the command.
   :::

1. Successfully **uninstall** the **BladePipe**.