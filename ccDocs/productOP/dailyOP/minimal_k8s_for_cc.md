---
id: minimal_k8s_for_cc
title: 部署最小化 Kubernetes 环境
description: 本文档主要介绍在 Linux 操作系统下，部署 CloudCanal 所需的最小化 Kubernetes 环境。
---

本文档主要介绍在 Linux 操作系统下，部署 CloudCanal 所需的最小化 Kubernetes 环境。

## 服务器要求

- **Master** 节点 (1台)
    - 2Gi CPU
    - 2GB Memory
- **Node** 节点 (1台)
    - 6Gi CPU
    - 8GB Memory

## 部署步骤

### 安装基础软件

- 首先在 **所有节点** 上安装如下基础软件

- Docker 容器

  ```shell
  ## centos / rhel
  sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  
  sudo yum install -y docker-ce-20.10.9-3.* docker-ce-cli-20.10.9-3.*
  
  sudo systemctl start docker
  
  sudo echo '{"exec-opts": ["native.cgroupdriver=systemd"]}' > /etc/docker/daemon.json
  
  sudo systemctl restart docker
  
  ## ubuntu
  curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
  
  sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
  
  sudo apt-get update

  sudo apt-get -y install docker-ce=5:20.10.24~3-0~ubuntu-* docker-ce-cli=5:20.10.24~3-0~ubuntu-*
  
  sudo systemctl start docker
  
  sudo echo '{"exec-opts": ["native.cgroupdriver=systemd"]}' > /etc/docker/daemon.json
  
  sudo systemctl restart docker
  ```

- K8S 工具

  ```shell
  ## centos / rhel
  sudo cat > /etc/yum.repos.d/kubernetes.repo << EOF
  [kubernetes]
  name=Kubernetes
  baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
  enabled=1
  gpgcheck=0
  repo_gpgcheck=0
  gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
  EOF
  
  sudo yum install -y kubelet-1.23.6 kubeadm-1.23.6 kubectl-1.23.6
  
  sudo systemctl daemon-reload
  
  sudo systemctl restart docker
  
  sudo systemctl start kubelet
  
  ## Ubuntu
  curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -

  echo "deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
    
  sudo apt-get update
  
  sudo apt-get install -y kubelet=1.23.6-00 kubeadm=1.23.6-00 kubectl=1.23.6-00
    
  sudo systemctl daemon-reload
  
  sudo systemctl restart docker
  
  sudo systemctl start kubelet
  ```

### 部署 Kubernetes Master 节点

#### Kubeadm 初始化 Master 节点

- 修改下方 **`${local_ip}`** 为机器私网 ip，并在 **Master 节点** 中执行初始化语句

  ```shell
  kubeadm init \
      --apiserver-advertise-address=`${local_ip}` \
      --image-repository registry.aliyuncs.com/google_containers \
      --kubernetes-version v1.23.6 \
      --service-cidr=10.96.0.0/12 \
      --pod-network-cidr=10.244.0.0/16
  ```
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/kubeadm_init.png)

- 安装成功后，执行如下命令

  ```shell
  mkdir -p $HOME/.kube
  
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
  ```
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/kubeadm_finished.png)

- 保存 **join 命令**，下面加入 Kubernetes Node 时需要执行

  ```shell
  kubeadm join 192.168.2.251:6443 --token brv7nq.adkd0xr0wgl69z3k \
	--discovery-token-ca-cert-hash sha256:4cb876273f80cb023c4b00c35272d762ab7511aec461fe615f81af84edf8b5a4
  ```

#### 部署 CNI 网络插件

- 在 **Master 节点** 中，下载 calico 配置文件
  ```shell
  curl https://gitee.com/clougence/public-demo/raw/master/calico-yaml/calico.tar.gz -O
  tar -xzvf calico.tar.gz
  ```

- 在 calico.yaml 文件中，取消注释 **CALICO_IPV4POOL_CIDR** 配置项，并将其 value 修改为 **Master** 节点初始化时指定的网段 (--pod-network-cidr=10.244.0.0/16)
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/k8s_calico_edit.png)

- 安装 calico
  ```shell
  kubectl create -f calico.yaml
  ```
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/k8s_calico_install.png)

### 加入 Kubernetes Node 节点

- 在 **Node 节点** 中，执行上面保存的 **join** 命令
  ```shell
  kubeadm join 192.168.2.251:6443 --token brv7nq.adkd0xr0wgl69z3k \
	--discovery-token-ca-cert-hash sha256:4cb876273f80cb023c4b00c35272d762ab7511aec461fe615f81af84edf8b5a4
  ```
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/kubeadm_join.png)

### 验证部署

- 在 **Master 节点** 中查看所有节点状态
  ```shell
  kubectl get nodes
  ```
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/k8s_kubectl_get_nodes.png)

- 在 **Master 节点** 中查看 Pod 状态，等待 **READY** 项全为 **1/1** 后，即为部署成功
  ```shell
  kubectl get pod -n kube-system
  ```
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/k8s_check.png)
