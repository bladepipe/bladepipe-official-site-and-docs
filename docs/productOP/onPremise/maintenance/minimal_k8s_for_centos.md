---
id: minimal_k8s_for_centos
title: Minimal K8s for CentOS
description: This page introduces how to install a Minimal K8s for BladePipe installation.
---

This page introduces how to install a Minimal K8s for CentOS.

## Resource Preparation
    
- Prepare two nodes for K8s.
  
  | Node       | Recommended Spec.             | Operating system and CPU arch.   |
  |------------|-------------------------------|----------------------------------|
  | k8s_master | 2core , 8GB mem , 100GB disk  | CentOS 7/8, Rockey Linux , amd64 |
  | k8s_node1  | 8core , 16GB mem , 200GB disk | CentOS 7/8, Rockey Linux , amd64 |

## Procedure

1. Log in the **k8s_master** node and execute the script blow.
   
   ```bash
   /bin/bash -c "$(curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/install_centos_k8s.sh)"
   ```

2. Wait to finish, then replace the **local_ip** in blow and execute.
   
   ```bash
   kubeadm init \
        --apiserver-advertise-address=<local_ip> \
        --kubernetes-version v1.28.15 \
        --service-cidr=10.96.0.0/12 \
        --pod-network-cidr=10.244.0.0/16 \
        --ignore-preflight-errors=Swap
   ```
   
   :::info
   Record the **kubeadm join** command output after executing the script.
   :::

3. Prepare K8s configuration.

   ```bash
   mkdir -p $HOME/.kube
   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
   sudo chown $(id -u):$(id -g) $HOME/.kube/config

   # if user is root
   export KUBECONFIG=/etc/kubernetes/admin.conf
   ```

4. Install the CNI network plugin and wait for all Pods to be **READY**.
  
   ```bash
   kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
  
   watch kubectl get pods -n kube-system
   ```

5. Log in the **k8s_node1** node and execute the script blow.

   ```shell
   /bin/bash -c "$(curl -fsSL https://bladepipe-docker.s3.ap-southeast-1.amazonaws.com/install_centos_k8s.sh)"
   ```
   
6. Still in the **k8s_node1** node, execute the **kubeadm join** command recorded above.
7. Return to **k8s_master** node, execute the script below until all nodes' **STATUS** to **READY**.

   ```bash
   watch kubectl get nodes
   ```