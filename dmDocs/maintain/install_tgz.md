---
id: install_tgz
title: 全新安装
description: 本文档主要介绍如何在 Linux/MacOS 系统下，全新安装 CloudDM。
---

CloudDM TGZ 安装属于 “自托管” 模式，适用于有安全/合规要求的业务场景。部署后与外界完全隔离，只需要 JDK 运行时即可快速实施部署。

## 前置条件

在开始之前请确保系统环境符合 **[依赖需求](./install_require)**。
:::info
已部署过 CloudDM 的环境，请进行 [升级安装](./upgrade_tgz)，如果重复执行安装可能导致系统出现异常！
:::

## 安装准备

- 安装 JDK，推荐使用 OpenJDK，最低版本为 `1.8+`。
- 准备一个 MySQL 要求版本 `8.0+`，用于存放 CloudDM Team 数据（TGZ 部署）。
- 准备好 MySQL 实例后，请创建两个数据库用于 CloudDM Team 使用，并确保该数据库的字符集为 `utf8mb4`。

创建数据库示例：
```sql
CREATE DATABASE clouddm_rdp CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE DATABASE clouddm_console CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

建议创建一个 clougence 账号并切换到该账号下进行安装。

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

## 产品安装

首先配置 Console 服务的参数，编辑 `conf/console.properties` 文件，找到 DataSource 配置数据库连接等参数。

```properties title='1. 配置数据库'
...省略其他配置...
##############################################################
##                                               DataSource ##
##############################################################
spring.datasource-dm.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource-dm.jdbcurl=jdbc:mysql://<database server>:3306/clouddm_rdp?serverTimezone=Asia/Shanghai&characterEncoding=utf8&autoReconnect=true&rewriteBatchedStatements=true&socketTimeout=30000&connectTimeout=3000&allowMultiQueries=true
spring.datasource-dm.username=
spring.datasource-dm.password=
spring.datasource-rdp.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource-rdp.jdbcurl=jdbc:mysql://<database server>:3306/clouddm_console?serverTimezone=Asia/Shanghai&characterEncoding=utf8&autoReconnect=true&rewriteBatchedStatements=true&socketTimeout=30000&connectTimeout=3000
spring.datasource-rdp.username=
spring.datasource-rdp.password=

...省略其他配置...
```

```shell title='2. 初始化数据库'
# 初始化 Console 数据库
cd ./clouddm/console/bin
./init.sh
```

```shell title='3. 启动 Console 服务'
# 启动 Console 服务
cd ./clouddm/console/bin
./startup.sh
```

通过浏览器访问 **8222** 服务端口，例如：_**http://\{ip\}:8222**_
- 默认账号: test@clougence.com
- 默认密码: clougence2021
- 参考文档 [添加 Sidecar](../operation/cluster_worker)

![common](../assets/maintain/install_docker/install_console.png)

```properties title='5. 配置 Sidecar 服务'
# 修改 conf/global_conf.properties 文件，配置 Sidecar 参数
clouddm.auth.ak=
clouddm.auth.sk=
clouddm.worker.wsn=
clouddm.console.domain=
```

```shell title='6. 启动 Sidecar 服务'
# 启动 Sidecar 服务
cd ./clouddm/sidecar/bin
./startup.sh
```

启动成功后，可以在 Console 界面看到 Sidecar 节点已经上线。
至此，CloudDM 全新安装完成，请参考 **[快速开始](../quick_start/quick_start)** 进行使用。