---
id:  solve_install_fail_docker
title: Docker 版安装失败
description: Docker 版安装失败
---
## 现象描述
* 初次安装 CloudCanal 安装脚本有如下提示：
  ![install_script_fail.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/solve_install_fail_image_01.png)
* 进入 CloudCanal Web 页面有如下报错：
  ![solve_install_fail_image_02.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/solve_install_fail_image_02.png)
* 执行 `docker ps -a | grep cloudcanal` 命令，正在运行的容器只有 Console 和 MySQL。
  ![solve_install_fail_image_03.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/solve_install_fail_image_03.png)

## 问题排查
* 初次安装时修改 MySQL 容器密码，导致 Console 容器连接不上 MySQL 容器。
* Console 容器启动失败，导致无法拉起 Sidecar、Prometheus 容器。

## 解决方法
### Console 容器连接不上 MySQL 容器
1. 将 docker-compose.yml 文件中的 MySQL 容器密码还原。
2. 执行 **uninstall.sh** 和 **install.sh** 脚本，重新安装 CloudCanal。
3. 修改 MySQL 容器密码。
4. [修改 Console 容器配置](../productOP/dailyOP/change_mysql.md#修改-console-容器中-springboot-配置文件中配置)。

### 无法拉起 Sidecar、Prometheus 容器
执行以下命令，手动拉起容器。
  ```shell
  ## docker-compose v1
  docker-compose up -d sidecar
  docker-compose up -d prometheus
  ## docker compose v2
  docker compose up -d sidecar
  docker compose up -d prometheus
  ```
