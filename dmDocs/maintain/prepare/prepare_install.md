---
id: prepare_install
title: 准备工作
description: 本文档主要介绍在 CloudDM Team 产品安装之前的准备工作。
---

本文档主要介绍在 CloudDM Team 产品安装之前的准备工作。

### 准备系统账号

任何方式的安装都建议在 clougence 账号下进行。

```shell
useradd clougence
```

### 工具软件的安装

```shell title='CentOS/RHEL'
sudo yum update
sudo yum install -y yum-utils
sudo yum install -y lsof
sudo yum install -y bc
sudo yum install -y p7zip p7zip-plugins
```

```shell title='Ubuntu'
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
sudo apt-get install -y lsof
sudo apt-get install -y bc
sudo apt-get install -y p7zip-full
```

### 安装包准备

访问 **[CloudDM Team 官方网站](https://www.clougence.com/clouddm)** ，点击 **下载私有部署版** 按钮，选择你需要的软件包版本以获取下载链接。

```shell title='上传安装包到服务器'
# 在远程服务器上通过 wget 下载安装包
cd /home/clougence/

# 例如 docker 安装
wget -cO clouddm.7z "${软件包下载连接}"

# 通过 scp 上传安装包到您的服务器，例如：192.168.0.100
scp clouddm.7z clougence@192.168.0.100:/home/clougence/clouddm.7z
```
