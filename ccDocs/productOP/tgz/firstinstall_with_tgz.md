---
id: firstinstall_with_tgz
title: 全新安装(TGZ Linux)
description: 本文档主要介绍如何以 TGZ 方式来安装部署 CloudCanal
---

本文主要介绍如何在 Linux 操作系统下安装 CloudCanal TGZ 版。

因此方式涉及产品各个组件，建议先了解 [产品架构文档](../../intro/product_arch.md) 以提升部署成功率。

## 资源准备

- 资源列表
 
  | 资源种类            | 系统或软件      | 推荐配置    | 数量&nbsp;&nbsp;   | 说明               |
  | -----------------|--------------------|  ------ | --------------- |-----------------------| 
  | CloudCanal 部署机器 | **Centos 7.4 / RHEL / Cloud Linux**        | 4 core, 16 GiB Mem, 100 GiB Disk | 1 台| 运行控制台、任务运行机器、数据任务进程以及监控服务 |
  | 元数据库    | **MySQL 8**        | 2 core, 4 GiB Mem, 100 GiB Disk        | 1 台| 存储数据源、任务、节点等元数据     |
  | [告警机器人](../dailyOP/alarm_conf.md)    | 钉钉告警 / 微信告警 / 飞书告警 / Slack 告警 / Discord 告警 | 1 个 | | 群机器人或自定义 WebHook     |

- 端口占用: **8111**, **8084**, **8085**, **7007**, **8083**, **9090**

## 环境准备

### 登录机器

以 root 用户登录 CloudCanal 部署机器。

### 安装基础环境

1. 安装 JDK (需要 Open JDK)。
    ```bash
    yum -y install java-1.8.0-openjdk-devel.x86_64
    ```

2. 添加用户。
    ```bash
    useradd -d /home/clougence -m clougence

    passwd clougence
    ```
    
    :::info
    可通过 **修改用户主目录** 达成变更软件安装目录的目的。

    如已修改，在执行后续命令时请手动修改默认目录(/home/clougence)。
   
    示例
    - **useradd -d /app/clougence -m clougence**
    - **useradd -d /u01/clougence -m clougence**
    - **...**
    :::

4. 给用户赋 sudo 权限。
    ```bash
    echo "clougence ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
    ```

5. 创建业务目录。
    ```bash
    mkdir -p /home/clougence/{logs,backup,tar_gz}
    
    chown clougence:clougence /home/clougence/*
    ```

6. （可选）关闭系统防火墙, 并设置 selinux=disabled。
    ```bash
    firewall-cmd --state

    systemctl stop firewalld.service

    systemctl disable firewalld.service

    firewall-cmd --state
    ```

7. 调整内核参数。
    ```bash
    vim /etc/security/limits.conf

    # nofile - maximal opened files, * for all users
    
    *           soft       nofile     65535
    *           hard       nofile     65535
    ```

    ```bash
    # optional file is 20-nproc.conf
    vim /etc/security/limits.d/90-nproc.conf

    # modify clougence's maximal opened processes
    *             soft       nproc      1024 
    clougence     soft       nproc      131072
    ```

### 安装元数据库

1. 安装 MySQL 客户端。
    ```bash
    rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

    rpm -ivh https://repo.mysql.com/mysql80-community-release-el7-11.noarch.rpm

    yum -y install mysql-community-client.x86_64
    ```

2. 安装 MySQL 数据库，如使用自己数据库，则此步略。
    ```bash
    yum -y install mysql-community-server.x86_64
    
    # start the mysql
    systemctl start mysqld
    ```
    :::info
    可通过 `vi /var/log/mysqld.log` 指令找到 root 用户临时密码。
    :::

3. 登录元数据库，并修改密码。
    ```bash
    mysql -hlocalhost -uroot -p
    
    ALTER USER 'root'@'localhost' IDENTIFIED BY '你的密码'
    ```

4. 创建元数据库。
    ```bash
    CREATE DATABASE  `cloudcanal_console` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    
    # ver 4.x 
    CREATE DATABASE  `clougence_rdp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```

5. 创建用户名密码并授权。
    ```bash
    create user 'cloudcanal'@'%' identified by 'Clougence#2021'; 

    grant all on cloudcanal_console.* to 'cloudcanal'@'%'; 
    
    # ver 4.x
    grant all on clougence_rdp.* to 'cloudcanal'@'%'; 

    flush privileges;
    
    exit;
    ```

### 安装监控服务 (Prometheus)

1. 下载 CloudCanal 提供的 prometheus 包并安装。
    ```bash
    su - clougence

    cd ~/tar_gz

    wget "https://pc.clougence.com/prometheus.tar.gz"

    tar -zxvf prometheus.tar.gz -C /home/clougence

    cd /home/clougence/prometheus

    ./startup.sh
    ```

## 安装控制台 (Console)

1. 进入 [官网](https://www.clougence.com)，在页面右上角点击 **下载 CloudCanal 私有部署版** > **Binary Package** > **下载 Cross-platform 版本** (兼容 X86/ARM64)。

2. 下载安装包到指定目录。
    ```bash
    cd /home/clougence/tar_gz

    wget "{从官网获取的下载地址}" -O cloudcanal.tgz
    ```

3. 修改安装包权限。
    ```bash
    chown -R clougence:clougence /home/clougence/
    ```

4. 切换为 clougence 用户，并进入用户主目录。
    ```bash
    su - clougence

    cd /home/clougence/tar_gz
    ```
5. 解压安装包。
    ```bash
    tar -xaf cloudcanal.tgz

    tar -zxvf cloudcanal-console.tar.gz

    mv /home/clougence/tar_gz/cloudcanal /home/clougence
    ```
6. 修改配置文件参数。
    ```bash
    cd ~/cloudcanal/console/conf

    vi business-output.properties
    ```

7. **设置必要参数**。
  
    | 参数名      |版本| 说明                  |      
    | --------------------------------| ---------------|-----------------------------------------| 
    | spring.datasource.url          | 3.x | 元数据库 cloudcanal_console 地址，修改 host:port, 数据库名称, 时区配置（如有变化） |
    | spring.datasource.username     |3.x| 元数据库 cloudcanal_console 用户名                                |
    | spring.datasource.password     |3.x| 元数据库 cloudcanal_console 密码                                 |
    | spring.datasource-cc.url*       | 4.x | 元数据库 cloudcanal_console 地址，修改 host:port, 数据库名称, 时区配置（如有变化） |
    | spring.datasource-cc.username*  |4.x| 元数据库 cloudcanal_console 用户名                                |
    | spring.datasource-cc.password*  |4.x| 元数据库 cloudcanal_console 密码                                 |
    | spring.datasource-rdp.url*      |4.x | 元数据库 clougence_rdp 地址，修改 host:port, 数据库名称, 时区配置（如有变化）      |
    | spring.datasource-rdp.username* |4.x| 元数据库 clougence_rdp 用户名                                     |
    | spring.datasource-rdp.password* |4.x| 元数据库 clougence_rdp 密码                                      |
    | jwt.secret                      | all | 系统登录验证算法的密钥，可以是一个 64 位随机码                                  |
    | console.rsocket.dns             | all | 部署机器内网 host (不带端口)                                         |
    | prometheus.host                 | all | 部署机器内网 host (带端口，e.g. http://127.0.0.1:9090)      |
    
    :::info  
    *：变化配置  
    CloudCanal 4.x 因为引入平台能力，对元数据库进行了调整，和 3.x 版本有区别。  
    `spring.datasource-cc.url` 此连接串需要将 cloudcanal 库名修改成 cloudcanal_console。
    :::

8. 启动控制台 (Console)。
    ```bash
    cd ~/cloudcanal/console/bin

    sh ./startConsoleAndUpdDb.sh
    ```

## 开始使用
1. 登录 CloudCanal 控制台：
   - 控制台地址(请使用 **Chrome** 浏览器访问): `http://${你部署CloudCanal的机器ip}:8111`
   - 默认账号: `test@clougence.com`
   - 默认密码: `clougence2021`
   - 默认验证码: `777777`
  
   :::info
   推荐参考以下文档修改系统敏感信息：
    - [修改账号密码](../dailyOP/change_on_premise_password)
    - [修改验证码](../dailyOP/change_verify_code_777777)
    - [修改 AccessKey & SecretKey](../dailyOP/change_ak_sk)
   :::

2. [申请免费许可证并激活](../../license/license_use) 。
3. [添加任务运行机器](./ad_worker_tgz)。
4. [添加自建数据源](../../operation/datasource_manage/add_self_maintain_ds) 并 [创建一条数据同步任务](../../operation/job_manage/create_job/create_full_incre_task)。

## FAQ

- [升级 4.x 后登陆提示 Empty key](../../faq/solve_login_empty_key_error)
- [自动部署/升级节点失败](../../faq/solve_auto_deploy_node_by_jdk_error)
- [对任务分配执行机器失败](../../faq/solve_schedule_task_fail)
