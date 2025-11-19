---
id: ha_install_on_k8s
title: 添加机器(Kubernetes)
---

本文档主要介绍如何在 K8S 环境中添加 CloudCanal 节点，达到同步任务高可用目的。

本文档前置条件为已安装一套 CloudCanal，如未安装，请先参考 [CloudCanal 全新安装(Kubernetes Linux/MacOs)](install_on_k8s) 文档进行安装。

高可用特点如下：

- **任务容灾自动切换**
- **任务手动调度**
- **自动分配任务至低负载机器**

## 步骤

### 添加机器
1. 登录 CloudCanal 控制台，点击 **同步设置** > **同步机器** > **机器列表** > **新增机器**。

![a4c405c7-ef68-4c04-88b6-e5059f853e61-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/ha1.png)
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/ha2.png)

2. 点击 **获取验证码**，输入 **777777** 。
  
![b64bccae-b56a-4a20-bab5-ce10e4bdbb86-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/ha3.png)

3. 获取机器唯一识别配置信息。
  
![60acda31-94e2-43c1-93f8-114ee6b77975-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/ha4.png)

### 添加 Sidecar 节点
使用以下任一种方式添加 Sidecar 节点。

#### 方式一：使用脚本
进入 k8s 安装目录，执行以下命令 **并粘贴配置信息**，自动添加一个新的 Sidecar。

```shell
sh install_one_sidecar.sh
```
   
![ha_k8s_1.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/ha_k8s_1.png)

#### 方式二：使用 Helm Chart
:::info
建议先备份原有 values.yaml 配置文件内容，再将其中的关键配置拷贝至新版 Chart 中，以避免配置丢失或错误覆盖。
:::

1. 拉取 Helm Chart 并修改配置，设置新节点识别信息（AK/SK/WSN/Domain）
```shell
wget -cO cloudcanal-helm-0.1.0.tgz https://gitee.com/clougence/cloudcanal-helm/releases/download/0.1.0/cloudcanal-helm-0.1.0.tgz --no-check-certificate
tar -xzvf cloudcanal-helm-0.1.0.tgz
cd cloudcanal-helm
vim values.yaml  
  
# 修改 values.yaml
clougence:
  ...
  sidecar:
    replicas: 1  # 此处暂不修改副本数
    ...
    globalConfig: # 设置为新节点的唯一识别配置（AK/SK/WSN/Domain）
      ak: ak0a2c62tdo1ap2416655mpyx0v36l359p1v5rn782caw8t0qkk1s94b80lfs90
      sk: sk6206iy4pb0eydz9hg97jo3tu5d80j97e91bbql65167u8wb75x4ej6e4v4aa4
      wsn: wsn582nm54ca045p014288w6e919ec6294m430h427619v64g0pyqzcjb5040q3f
      domain: console
  
# 仅更新配置：
helm upgrade cloudcanal ./ -f values.yaml -n cloudcanal
```

2. 扩容副本数：添加新 Sidecar 实例。
```shell
vim values.yaml

# 修改 values.yaml
clougence:
  ...
  sidecar:
  replicas: 2  # 原本为 1，改为 2，表示新增一个 sidecar 节点
  ...
  globalConfig: # 设置为新节点的唯一识别配置（AK/SK/WSN/Domain）
    ak: ak0a2c62tdo1ap2416655mpyx0v36l359p1v5rn782caw8t0qkk1s94b80lfs90
    sk: sk6206iy4pb0eydz9hg97jo3tu5d80j97e91bbql65167u8wb75x4ej6e4v4aa4
    wsn: wsn582nm54ca045p014288w6e919ec6294m430h427619v64g0pyqzcjb5040q3f
    domain: console

# 自动添加一个新的 sidecar
helm upgrade cloudcanal ./ -f values.yaml -n cloudcanal
```
### 页面确认

新添加机器正常上线。
  
![22b9e92c-e864-40ee-afc4-c70c711bad83-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/ha6.png)

## FAQ

### 如何重启 Sidecar？

执行 ```kubectl get po -n cloudcanal``` 能看见 sidecar-xxx，执行 ```kubectl delete po sidecar-xxx -n cloudcanal``` 后节点将自动重启。

### 如何重新修改 global config？

执行 ```kubectl exec -it sidecar-xxx -n cloudcanal bash``` 进入节点，修改 `/home/clougence/cloudcanal/global_conf/conf.properties` 文件后重启对应 Sidecar 即可。

### properties in global config /home/clougence/cloudcanal/global_conf/conf.properties are empty

请仔细检查 `/home/clougence/cloudcanal/global_conf/conf.properties` 文件的内容，查看是否复制粘贴完整。

