---
id: minimal_docker_for_centos
title: Minimal Docker for CentOS
description: This page introduces how to install a Minimal Docker for BladePipe
---

This page introduces how to install a Minimal Docker for CentOS.

## Resource Preparation
    
- Prepare one node for Docker.
  
  | Node        | Recommended Spec.             | Operating system and CPU arch.  |
  |-------------|-------------------------------|---------------------------------|
  | docker_node | 4core , 16GB mem , 100GB disk | CentOS 7/8, Rockey Linux, amd64 |

## Procedure

1. Log in the node and execute the script blow.
   
   ```bash
   /bin/bash -c "$(curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/install_centos_docker.sh)"
   ```

2. Wait to finish, and then execute `docker ps` to confirm successfully installation.