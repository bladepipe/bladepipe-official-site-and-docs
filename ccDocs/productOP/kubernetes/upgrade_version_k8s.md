---
id: upgrade_version_on_k8s
title: 版本升级(Kubernetes)
description: 本文档主要介绍在 Linux/MacOS 操作系统下，已经安装 CloudCanal Kubernetes 版用户如何升级新版本。
---

本文主要介绍如何在 Kubernetes 环境下更新 CloudCanal 版本。

如果您从未安装过 CloudCanal，请参考 [CloudCanal 全新安装(K8S Linux/MacOs)](./install_on_k8s) 文档。

## 升级步骤

### 下载安装包

登录[官方网站](https://www.clougence.com?src=cc-doc-upgrade)，点击 **下载私有部署版** 按钮。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/license_biz/1.png)

### 解压缩新安装包

在相同目录下解压覆盖原来的文件。
```bash
7z x cloudcanal.7z -o./cloudcanal_home
```

### 进入安装脚本目录

进入 k8s 安装脚本目录

```bash
cd cloudcanal_home/install_on_kubernetes
```

### 升级
使用以下任一种方式升级。
#### 方式一：使用脚本升级
更新到新版本并自动重启。

  ```sh
  ## CentOS / Rhel / Ubuntu / MacOS
  ./upgrade.sh
  ```
  ![k8s_upgrade.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/k8s_upgrade.png)

#### 方式二：使用 Helm Chart 升级
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
  建议先备份原有 values.yaml 配置文件内容，再将其中的关键配置拷贝至新版 Chart 中，以避免配置丢失或错误覆盖。
  :::
3. 使用 Helm 升级部署。
  ```shell
  helm upgrade cloudcanal ./ -f values.yaml -n cloudcanal
  ```

### 确认已升级

执行以下命令查看 CloudCanal 相关节点已升级到新版本。
  ```sh
  kubectl get po -n cloudcanal
  ```
  ![k8s_upgrade2.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/k8s_upgrade_2.png)

## FAQ

### CloudCanal 元数据库结构不一致怎么办？

解压目录下 **ddl_history.sql** 文件，检查 **当前版本** 和 **升级版本** 是否存在 **系统元数据** 变更。

**如有变更**，在宿主机上使用命令或客户端登录元数据库(cloudcanal_console)，执行相关 SQL 进行变更。

  ```bash
  kubectl exec -it mysql-xxx -n cloudcanal bash
  
  mysql -uroot -p123456
  ```
例如：当前版本为 1.0.3，在新包 **ddl_history.sql** 中看到 1.0.4 版本及往后的变更如下图。按序执行这些变更到元数据库即可。

  ![e2e76c27-250f-49db-96e4-1be333854854-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/update1.png)

### 特殊版本怎么处理？

**2.2.6.12** 之后新增自定义告警接口，在 configmap 里进行编辑后，重启节点后生效。

  ```bash
  kubectl edit cm console-config -n cloudcanal
  ```

  ```
  console.config.alert.custom.alerturl=
  ```

![image-20221205141715889](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/change_conf.png)
