---
id: uninstall_all_in_one_k8s
title: Uninstall All-In-One (K8s)
description: This page introduces how to uninstall BladePipe On-Premise on K8s in the Linux operating system.
---

This page introduces how to uninstall BladePipe using Kubernetes.

## Procedure

1. Log in to the **K8s master** node.

2. Execute the script blow.
  
   ```bash
   curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/uninstall_on_k8s.sh | bash 
   ```
    :::info
    If you are not to clean images, add extra content `-s -- not_del_images` after the command.
    :::

1. Successfully **uninstall** the **BladePipe**.