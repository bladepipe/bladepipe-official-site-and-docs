---
id: upgrade_tgz
title: 升级安装
description: 本文档主要介绍如何在 Linux/MacOS 系统下，全新安装 CloudDM。
---

CloudDM TGZ 安装属于 “自托管” 模式，适用于有安全/合规要求的业务场景。部署后与外界完全隔离，只需要 JDK 运行时即可快速实施部署。

## 前置条件

在开始之前请确保系统环境符合 **[依赖需求](./install_require)**。

## 安装准备

```shell title='解压 CloudDM'
# download package.
wget -c "..." -Oclouddm.tgz

# extract package
tar -xvf clouddm.tgz
tar -xvf ./clouddm-console.tar.gz
tar -xvf ./clouddm-sidecar.tar.gz
```

## 解压后的安装目录

安装包在解压后包含如下主要内容：
- **查询控制台**
  - 位于 &lt;解压目录&gt;/clouddm/console 目录下。
- **SQL执行器**
  - 位于 &lt;解压目录&gt;/clouddm/sidecar 目录下。

目录说明：
- console 和 sidecar 两个模块都遵循如下目录结构
  - bin：存放启动脚本
  - conf：存放配置文件
  - lib：存放依赖的 jar 包
  - logs：存放日志文件
  - drivers：存放数据库驱动文件
  - plugins：存放功能插件文件

在 bin 目录下包含如下脚本：

| 脚本          | 用途                                         |
|-------------|--------------------------------------------|
| init.sh     | 全新安装、升级安装后的 数据库变更初始化脚本。                    |
| startup.sh  | 启动应用，启动后会在 bin 目录同层出现一个 dm.pid 文件，用于记录进程ID |
| shutdown.sh | 停止应用，脚本会通知 dm.pid 文件中记录的进程退出。              |
| setenv.sh   | 用于设置 JVM 的参数。                              |
| run.sh      | 以前台模式启动应用，脚本退出意味着应用也退出。                    |
| catalina.sh | 基础脚本。                                      |

## 产品升级

升级前请务必备份好现有的数据库和配置文件，以防升级失败时可以回滚。

```shell title='1. 停止服务'
# 停止 Sidecar 服务
cd ./clouddm/sidecar/bin
./shutdown.sh

# 停止 Console 服务
cd ./clouddm/console/bin
./shutdown.sh
```

```shell title='2. 备份数据'
# 备份 Console 数据库
mysqldump -h <database server> -u <username> -p<password> clouddm_console > clouddm_console_backup.sql
# 备份 RDP 数据库
mysqldump -h <database server> -u <username> -p<password> clouddm_rdp > clouddm_rdp_backup.sql
# 备份配置文件
cp -r ./clouddm/console/conf ./clouddm/console/conf_backup
cp -r ./clouddm/sidecar/conf ./clouddm/sidecar/conf_backup
``` 

```shell title='3. 覆盖安装包'
# 覆盖安装包
rm -rf ./clouddm/console
rm -rf ./clouddm/sidecar
tar -xvf clouddm-console.tar.gz
tar -xvf clouddm-sidecar.tar.gz
```

```shell title='4. 恢复配置文件'
# 恢复配置文件
cp -r ./clouddm/console/conf_backup/* ./clouddm/console/conf/
cp -r ./clouddm/sidecar/conf_backup/* ./clouddm/sidecar/conf/
```

```shell title='5. 执行数据库升级脚本'
# 执行数据库升级脚本
cd ./clouddm/console/bin
./init.sh
```

```shell title='6. 启动服务'
# 启动 Console 服务
cd ./clouddm/console/bin
./startup.sh
# 启动 Sidecar 服务
cd ./clouddm/sidecar/bin
./startup.sh
```
