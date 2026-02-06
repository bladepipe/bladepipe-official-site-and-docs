---
id: upgrade_version
title: 版本升级(Docker Legacy)
description: 本文档主要介绍在 Linux/MacOS/Windows 操作系统下，已经安装 CloudCanal Docker 版用户如何升级 CloudCanal 新版本。
---

本文主要介绍如何在 Linux/MacOS 操作系统下更新 CloudCanal Docker 版。

如果您从未安装过 CloudCanal Docker 版，请参考 [CloudCanal 全新安装(Docker Linux/MacOS)](./install_linux_macos)。

## 升级步骤

### 下载安装包
登录 [官方网站](https://www.clougence.com?src=cc-doc-upgrade)，点击 **下载私有部署版** 按钮。

### 解压缩新安装包
在相同目录下解压覆盖原来的文件。
  ```bash
  7z x cloudcanal.7z -o./cloudcanal_home
  ```

### 进入安装脚本目录
进入 Docker 安装脚本目录。

  ```bash
  cd cloudcanal_home/install_on_docker
  ```

### 升级容器
1. 停止正在运行的容器。
  ```sh
  ## CentOS / Rhel / Ubuntu / MacOS
  ./stop.sh

  ## Windows
  stop.bat
  ```

2. 更新到新版本并自动运行。

  ```sh
  ## CentOS / Rhel / Ubuntu / MacOS
  ./upgrade.sh

  ## Windows
  upgrade.bat
  ```

### 确认已升级
执行以下命令查看 CloudCanal 相关容器已升级到新版本。
  ```sh
  docker ps | grep cloudcanal
  ```
  ![062331e8-1d29-40cb-bf41-2969a139e2a4-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/uploade2.png)

## 常见问题

### 数据是否要备份？
若有以下情况，建议备份：
  - 对控制台 (Console) 或者任务运行机器 (Sidecar) 做过一些特殊配置（统一告警配置、通信超时参数等）。
  - 有重要的任务运行日志需要保留。

### 如何进行备份？
1. 执行 **scripts** 目录下脚本 **备份配置** 和 **任务运行日志**。
2. 备份存放在 **…/scripts/console_backup** 和 **…/scripts/sidecar_task_backup** 两个目录中。
3. 容器重要配置和日志路径：
 
  ```bash
  ### console config and logs
  /home/clougence/cloudcanal/console/conf
  /home/clougence/logs
  
  ### sidecar config and logs
  /home/clougence/cloudcanal/sidecar/conf
  /home/clougence/logs
  ```

### CloudCanal 元数据库结构不一致怎么办？
1. 解压目录下 **ddl_history.sql** 文件，检查 **当前版本** 和 **升级版本** 是否存在 **系统元数据** 变更。
2. **如有变更**，在 Docker 宿主机上使用命令或客户端登录元数据库 (cloudcanal_console)，执行相关 SQL 进行变更。

  ```sql
  mysql -uclougence -h127.0.0.1 -P25000 -p123456
  ```
  
  例如：当前版本为 1.0.3。在新包 **ddl_history.sql** 中看到 1.0.4 版本及往后的变更如下图。按序执行这些变更到元数据库即可。

  ![e2e76c27-250f-49db-96e4-1be333854854-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/update1.png)

### 特殊版本怎么处理？

- **2.2.6.12** 之后新增自定义告警接口，在控制台 (Console) 容器的 `/home/clougence/cloudcanal/console/conf/business-output.properties` 中新增配置。

```
cosole.config.alert.custom.alerturl=
```
![image-20221205141715889](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/change_conf.png)

- **2.3.0.11**（及之前）升级到 **2.3.1.0**（及之后），需要先执行 `uninstall.sh`，再执行 `install.sh`。
```sh
./uninstall.sh
./install.sh
```

- **2.3.1.0**（及之前）升级到该版本之后的版本，需要备份再恢复元数据库。
```
// enter old mysql container and backup and download
docker exec -it cloudcanal-mysql /bin/bash
mysqldump -uclougence -p123456 --single-transaction -R -E --databases cloudcanal_console >/tmp/cloudcanal_console.sql
  
// enter new mysql container and copy backup to container
docker cp ./cloudcanal_console.sql cloudcanal-mysql:/tmp
docker exec -it cloudcanal-mysql /bin/bash
  
// login meta database
mysql -uclougence -p123456
  
// recover from backup
mysql> drop database cloudcanal_console;
         Query OK, 59 rows affected (0.17 sec)
mysql> source /tmp/cloudcanal_console.sql;
```
