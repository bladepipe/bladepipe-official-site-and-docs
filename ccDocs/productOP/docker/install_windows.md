---
id: install_windows
title: 全新安装(Docker Windows)
description: 本文主要介绍如何在 Windows 下安装 CloudCanal Docker 版。
---

本文主要介绍如何在 Windows 操作系统下安装 CloudCanal Docker 版。

MacOS/Linux 请参考[全新安装(Docker Linux/MacOS)](install_linux_macos.md)。

## 安装步骤

### 环境准备

- 部署前请确保以下端口未被占用(Windows 脚本暂不支持预检，请人工校验端口不被占用并且 docker 内存分配至少 6GB)

  | 组件                  | 端口   |用途                       |
  | -------------------- | -------|--------------------------|
  | cloudcanal-mysql     |  25000 | 元数据库 mysql 对外映射端口  |
  | cloudcanal-prometheus|  19090 | prometheuse 监控指标查询端口|
  | cloudcanal-console   |  7007  | console 和 sidecar 通信端口|
  | cloudcanal-console   |  8111  | console web控制台端口      |
  | cloudcanal-sidecar   |  18787 | 任务 debug 端口（e.g.,自定义代码 debug） |


- 机器规格建议
  - **CPU架构**
    - x86
    :::info
    不支持 vmware、virtualbox 和 windows 的 linux 子系统。
    :::
  - **最低配置**
    - 2 核cpu
    - 6GB 内存

### Docker 准备

- 安装 docker 和 docker-compose
  - 参考文档:https://docs.docker.com/docker-for-windows/

- 安装完毕后，设置 -> Resouces -> ADVANCED下，建议将内存限制至少调至 6GB
  - CloudCanal 要求至少 6GB 容器内存，默认 docker 内存分配为 2GB

  ![2723bb43-a8f8-445f-8250-10920ce46136-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/windows1.png)
  

### 下载安装包

- 登录[官方网站](https://www.clougence.com?src=cc-doc-install-windows)点击**下载私有部署版**按钮
  
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/license_biz/1.png)
  

###  解压安装包

- 安装 7z 解压缩软件,并解压 CloudCanal 安装包到某一个目录
  
  ```shell
  https://www.7-zip.org/download.html
  ```

- 解压目录内容包括
  - **镜像**
    - images 目录下四个 tar 结尾的压缩文件
  - **docker 容器编排文件**（位置：解压目录/install_on_docker/）
    - docker-compose.yml 文件
  - **脚本**（位置：解压目录/install_on_docker/scripts/windows）
    
  | 重要脚本                 | 用途                       |
  | ----------------------------- | -------------------------- |
  | ./install.bat                  | 全新安装 CloudCanal|
  | ./upgrade.bat                  | 升级 CloudCanal, 清理相关内容后调用 install.sh 安装|
  | ./uninstall.bat                | 卸载 CloudCanal，包含停止容器、删除镜像、删除元数据库、删除相应的卷等操作|
  | ./stop.bat                     | 停止 CloudCanal 相关容器运行|
  | ./start.bat                    | 启动 CloudCanal 相关容器 |
  | ./restart.bat                  | 重启 CloudCanal 相关容器 |
  | other                         | 其他辅助脚本|

### 启动 CloudCanal

- 在 Windows CMD 窗口中，进入`解压目录/scripts/windows`，执行脚本

  ```bash
  ## 安装 Windows CloudCanal
  install.bat
  ```

### 确认启动成功

- 启动耗时 1 分钟左右
- 启动成功可以看到如下内容
![7b00e562-cd45-4905-a626-1356503d8213-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/Linux-MacOS2.png)

### 开始使用

- 使用浏览器登陆控制台

  ```shell
  http://{your deploy CloudCanal ip}:8111
  ```

- 使用试用账号登陆
  - 账号:**`test@clougence.com`**
  - 密码:**`clougence2021`**
  - 默认验证码: **777777**

- [申请免费许可证并激活](../../license/license_use.md)

- [添加自建数据源](../../operation/datasource_manage/add_self_maintain_ds.md) 并 [创建一条数据同步任务](../../operation/job_manage/create_job/create_full_incre_task.md)

## FAQ

### 启动mysql容器报错 cannot start a stopped process: unknown

docker-compose logs 查看mysql服务的日志可以看到报错，找不到符号。

  ```
  undefined symbol: seccomp_api_get
  ```

  这个是因为Linux操作系统有个lib版本低于2.4导致，升级下版本。

  ```
  yum update libseccomp
  ```

### mount through procfd: possibly malicious path detected

如果采用 virtual box 这样的虚拟机，使用 docker 时会遇到这样的问题，当前不支持在虚拟机上执行。

### manifest for clougence not found manifest unknow

这种一般是没有正常安装镜像或者历史老版本残留数据影响导致，请先通过 scripts 中的 delete_all 脚本清理镜像、容器、卷然后再执行 startup.sh 脚本。
