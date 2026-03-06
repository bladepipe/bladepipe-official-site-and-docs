---
id: minimal_k8s_for_centos
title: 最小化安装 K8s (CentOS)
description: This page introduces how to install a Minimal K8s for BladePipe
---

本文介绍如何在 CentOS 系操作系统上最小化安装 Kubernetes。

## 资源准备

- 准备 2 个能访问公网的机器。

  | 节点角色       | 推荐配置                          | 操作系统和 CPU 架构                                      |
  |------------|-------------------------------|---------------------------------------------------|
  | k8s_master | 2 核心， 8GB 内存，100GB 磁盘  | CentOS 7/8，Alibaba Linux 3，Rockey Linux 8，AMD64  |
  | k8s_node1  | 8 核心，16GB 内存，200GB 磁盘 | CentOS 7/8，Alibaba Linux 3，Rockey Linux 8，AMD64 |

## 步骤

1. 登录 **k8s_master** 节点并执行以下脚本。

   ```bash
   /bin/bash -c "$(curl -fsSL https://tgzdownload.clougence.com/support/install_centos_k8s.sh)"
   ```

2. 等待上述步骤完成，替换以下脚本中的 **&lt;local_ip&gt;** 为当前节点 IP，并执行。

   ```bash
   kubeadm init \
        --apiserver-advertise-address=<local_ip> \
        --image-repository registry.aliyuncs.com/google_containers \
        --kubernetes-version v1.28.15 \
        --service-cidr=10.96.0.0/12 \
        --pod-network-cidr=10.244.0.0/16 \
        --ignore-preflight-errors=Swap
   ```

   :::info
   记录该脚本执行成功后的 **kubeadm join** 指令。
   :::

3. 准备 K8s 配置。

   ```bash
   mkdir -p $HOME/.kube
   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
   sudo chown $(id -u):$(id -g) $HOME/.kube/config

   # if user is root
   export KUBECONFIG=/etc/kubernetes/admin.conf
   ```

4. 安装 CNI 网络插件，并等待所有 Pod 状态变为 **Ready**。

   ```bash
   curl -fsSL https://gitee.com/clougence/public-demo/raw/master/calico-yaml/calico.tar.gz -O
   tar -xzvf calico.tar.gz
   kubectl apply -f ./calico.yaml
  
   watch kubectl get pods -n kube-system
   ```

5. 登录 **k8s_node1** 节点并执行以下脚本。

   ```shell
   /bin/bash -c "$(curl -fsSL https://cloudcanal-community.oss-cn-hangzhou.aliyuncs.com/support/install_centos_k8s.sh)"
   ```

6. 在 **k8s_node1** 节点执行之前记录的 **kubeadm join** 的指令。
7. 返回 **k8s_master** 节点，执行以下脚本并观察所有节点 **STATUS** 变为 **READY**。

   ```bash
   watch kubectl get nodes
   ```