---
id: install_on_k8s
title: 全新安装(K8s Legacy)
description: 本文档主要介绍在 Linux/MacOS 操作系统下，全新安装 CloudCanal Kubernetes 版。
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本文主要介绍如何在 Linux/MacOS 操作系统下安装 CloudCanal Kubernetes 版，仅适用于 [CloudCanal 商业版](../../intro/product_version.md)。


## 安装步骤

### 硬件和系统准备

| 项目         | 要求/说明                                                                 |
|--------------|---------------------------------------------------------------------------|
| **操作系统** | CentOS/RHEL 或 Ubuntu 或 macOS                                           |
| **CPU 架构** | x86 或 arm64v8                                                           |
| **最低配置** | **Master 节点（1 台）**：2 Gi CPU，2 GB Memory <br />**Node 节点（1 台）**：6 Gi CPU，8 GB Memory |
:::warning
当前不支持 VMware、VirtualBox 及 Windows Subsystem for Linux（WSL）。
:::

### 运行环境准备

- Linux 系统安装 Kubernetes,可参考 [最小化 Kubernetes 环境部署](../dailyOP/minimal_k8s_for_cc.md)，也可参考 [官方文档](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/) (版本 **1.19** 及以上)。

- MacOS 系统请进行如下设置，安装 Kubernetes 单机版。
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/k8s_install_2.png)

- (可选) Linux 系统安装 Helm，可参考 [官方文档](https://helm.sh/docs/intro/install/) (版本 **3.x** 及以上)。

### 环境准备

- 部署前请确保以下端口未被占用
  
  | 组件                  | 端口    | 用途                            |
  |-------|-------------------------------|--------------------------|
  | cloudcanal-mysql     | 32500 | 元数据库 mysql 对外映射端口             |
  | cloudcanal-console   | 31111 | console web 控制台端口             |
  | cloudcanal-sidecar   | 32727 | 任务 debug 端口（e.g.,自定义代码 debug） |
  | cloudcanal-prometheus| 31900 | prometheuse 监控指标查询端口          |

### 软件准备

- **Kubernetes Master** 节点，安装 **基础工具**。
  ```shell
  ## centos / rhel
  sudo yum update
  sudo yum install -y yum-utils
  sudo yum install -y lsof
  sudo yum install -y bc
  sudo yum install -y p7zip p7zip-plugins 
  
  ## ubuntu
  sudo apt update
  sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
  sudo apt-get install -y lsof
  sudo apt-get install -y bc
  sudo apt-get install -y p7zip-full
  
  ## MacOS
  ## download 7-zip from official website and install
  ```

### 安装包准备

1. 登录[官方网站](https://www.clougence.com?src=cc-doc-install-linux)，点击**下载私有部署版**按钮，获取 **软件包下载链接**。

2. 登录 **Kubernetes Master** 节点，下载安装包。
    ```shell
    wget -cO cloudcanal.7z "${软件包下载连接}"
    ```

3. 解压安装包。
    ```bash
    7z x cloudcanal.7z -o./cloudcanal_home
    cd cloudcanal_home/install_on_kubernetes
    ```
4. 解压目录内容包括
   - **镜像**
     - images 目录下四个 tar 结尾的压缩文件
   - **Kubernetes 容器编排文件**（位置：解压目录/install_on_kubernetes/yaml）
     - yaml 目录下的文件
   - **脚本**（位置：解压目录/install_on_kubernetes/）

    | 脚本                 | 用途                                           |
    |---------------------------------------------|----------------------------------------------|
    | ./install.sh                    | 全新安装 CloudCanal Kubernetes 版                 |
    | ./upgrade.sh                    | 升级 CloudCanal, 升级镜像后默认重启所有 Pod               |
    | ./uninstall.sh                  | 卸载 CloudCanal，包含停止 Pod、删除镜像、删除元数据库、删除相应的卷等操作 |
    | ./install_one_console.sh        | 新部署一个控制台节点                                   |
    | ./install_one_sidecar.sh        | 新部署一个同步节点, 具体参考高可用部署文档                       |
    | ./scripts/install_new_images.sh | 导入镜像到所有 Kubernetes Node 节点                   |
    | ./support/install_xxx_docker.sh | 辅助安装 docker 脚本                               |
    | ./support/install_xxx_kubernetes.sh   | 辅助安装 kubernetes 脚本                           |
    | other                           | 其他辅助脚本                                       |

5. CloudCanal 安装过程中，默认使用 local-path 本地存储，请根据实际情况选择其一。

   :::info
   必须在所有参与部署的 Kubernetes 节点准备镜像，否则调度时会因缺少镜像而导致节点拉取失败。

   如有私有仓库需求，可执行 docker tag 和 docker push 操作，将镜像上传至私有镜像仓库。
   :::

   - 方式一：**使用本地存储**
   ```shell
   # Local Path Provisioner（local-path 存储）
   docker pull registry.cn-hangzhou.aliyuncs.com/cloudcanal/rancher-local-path-provisioner:v0.0.24
   docker tag registry.cn-hangzhou.aliyuncs.com/cloudcanal/rancher-local-path-provisioner:v0.0.24 clougence/rancher-local-path-provisioner:v0.0.24
  
   # Busybox（用于 local-path 启动初始化）
   docker pull registry.cn-hangzhou.aliyuncs.com/cloudcanal/busybox:latest
   docker tag registry.cn-hangzhou.aliyuncs.com/cloudcanal/busybox:latest clougence/busybox:latest
   ```
   - 方式二：**选择自有或公共云存储**

### 安装 CloudCanal

使用以下任一种方式安装。
<Tabs groupId="installk8s">
  <TabItem value="script" label="使用脚本安装" default>

1. 执行安装脚本。
   ```shell
    ## centos / rhel / MacOS
    sh install.sh 
    
    ## ubuntu
    bash install.sh
    
    ## amazon linux
    sudo sh install.sh
    ```

  2. 出现如下标识即安装成功。
    ![k8s_install.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/k8s_install.png)
</TabItem>
<TabItem value="Helm Chart" label="使用 Helm Chart 安装">
1. 使用脚本导入镜像到所有 Node 节点：
    ```shell
    cd ./cloudcanal_home/install_on_kubernetes/scripts/
    ./install_new_images.sh
    ```
    :::info 注意
    脚本会自动将当前目录下的镜像（如 console.tar、sidecar.tar 等）加载到所有 Node 节点，请确保已配置好 SSH 无密登录。

    若你希望手动导入镜像，请先将  **./cloudcanal_home/images** 目录下的所有 .tar 文件（如 console.tar、sidecar.tar 等）手动传输到每个 Node 节点，再分别在每个节点上执行以下命令：

    ```shell
    docker load -i console.tar
    docker load -i sidecar.tar
    docker load -i mysql.tar
    docker load -i prometheus.tar
    ```
    :::
2. 拉取 Helm Chart 并修改配置。
    ```shell
    wget -cO cloudcanal-helm-0.1.0.tgz https://gitee.com/clougence/cloudcanal-helm/releases/download/0.1.0/cloudcanal-helm-0.1.0.tgz --no-check-certificate
    tar -xzvf cloudcanal-helm-0.1.0.tgz
    cd cloudcanal-helm
    vim values.yaml
    
    # 配置镜像地址、版本号、存储类等，按需修改
    clougence:
      ...
      imageTag: 4.7.2.0  # 需手动修改为实际版本号
      storageClassName: local-path # 可修改为自定义的存储类；若保持默认值，请确保相关镜像已导入所有 Node 节点
      ...
    ```
    :::info
    安装或升级完成后，建议立即备份 values.yaml，以便后续修改配置或版本升级时使用。
    :::
3. 使用 Helm 安装部署。
    ```shell
    helm install cloudcanal ./ -f values.yaml -n cloudcanal --create-namespace
    ```
</TabItem>
</Tabs>
### 开始使用

1. 登录 CloudCanal 控制台：
   - 控制台地址(请使用 **Chrome** 浏览器访问): **http://`${你部署CloudCanal的机器ip}`:31111**
   - 默认账号: **test@clougence.com**
   - 默认密码: **clougence2021**
   - 默认验证码: **777777**

    :::info
    推荐参考以下文档修改系统敏感信息：
      - [修改账号密码](../dailyOP/change_on_premise_password.md)
      - [修改验证码](../dailyOP/change_verify_code_777777.md)
      - [修改 AccessKey & SecretKey](../dailyOP/change_ak_sk.md)
    :::

2. [申请许可证并激活](../../license/license_use.md)。
3. [添加任务运行机器](./ha_install_on_k8s.md)。
4. [添加自建数据源](../../operation/datasource_manage/add_self_maintain_ds.md) 并 [创建一条数据同步任务](../../operation/job_manage/create_job/create_full_incre_task.md)。