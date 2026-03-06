---
id: install_all_in_one_binary
title: Install All-In-One (Binary)
description: This page introduces how to install BladePipe On-Premise Binary version in the Linux operating system.
---

This page introduces how to install BladePipe On-Premise Binary version in the Linux operating system.

On-prem deployment involves various components of BladePipe. It is recommended to first learn about [BladePipe architecture](../../../intro/product_arch.md) to facilicate deployment process.

## Resource Preparation

- Resource List

  | Resource            | System/Software                                      | Recommendation    | Number&nbsp;&nbsp;   | Description                              |
  -----------------|--------------------------------------------|  ------ | ----------------------------------- |---------------------------------|
  | Machine to deploy BladePipe | **Centos 8.5 / RHEL / Cloud Linux**        | 4 core, 16 GiB Mem, 100 GiB Disk | 1 | Run the Console, Workers, DataJobs and monitoring services  |
  | Metadata database            | **MySQL 8**                                | 2 core, 4 GiB Mem, 100 GiB Disk        | 1 | Store metadata such as data sources, DataJobs, Workers, etc.                |
  | [Alert Notification](../maintenance/alarm_conf.md)          |  Slack  / Discord  |   | 1 | Slack / Discord bot or Webhook          |

- Ports occupied: **8111**, **8084**, **8085**, **7007**, **8083**, **9090**

## Environment Preparation

### Log in to the Machine

Log in to the machine to deploy BladePipe as the root user.

### Set up the Environment

1. Run the following comand to install JDK (OpenJDK).
    ```bash
    yum -y install java-17-openjdk-devel.x86_64
    ```

2. Add a user.
    ```bash
    useradd -d /home/bladepipe -m bladepipe

    passwd bladepipe
    ```

3. Grant sudo privileges to the user.
    ```bash
    echo "bladepipe ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
    ```

4. Create a catalog.
    ```bash
    mkdir -p /home/bladepipe/{logs,backup,tar_gz}
    
    chown bladepipe:bladepipe /home/bladepipe/*
    ```

5. (Optional) Disable the system firewall and set selinux=disabled.
    ```bash
    firewall-cmd --state

    systemctl stop firewalld.service

    systemctl disable firewalld.service

    firewall-cmd --state
    ```

6. Configure core parameters.
    ```bash
    vim /etc/security/limits.conf

    # nofile - maximal opened files, * for all users
    
    *           soft       nofile     65535
    *           hard       nofile     65535
    ```

    ```bash
    # optional file is 20-nproc.conf
    vim /etc/security/limits.d/90-nproc.conf

    # modify bladepipe's maximal opened processes
    *             soft       nproc      1024 
    bladepipe     soft       nproc      131072
    ```

### Install Metadata Database

1. Install the MySQL command-line tool and database. If you use an existing database, just skip this step.
    ```bash
    rpm -ivh https://repo.mysql.com/mysql80-community-release-el8-9.noarch.rpm

    yum -y install mysql-server.x86_64
    
    # start the mysql
    systemctl start mysqld
    ```

2. Log in to the command line using `mysql`.
    ```bash
    [root@myhost ~]# mysql
    ```

3. Create a metadata database.
    ```bash
    CREATE DATABASE  `bladepipe_console` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    
    CREATE DATABASE  `bladepipe_rdp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```

4. Create a username and password and grant privileges.
    ```bash
    create user 'bladepipe'@'%' identified by 'Bladepipe#2024'; 

    grant all on bladepipe_console.* to 'bladepipe'@'%'; 
    
    grant all on bladepipe_rdp.* to 'bladepipe'@'%'; 

    flush privileges;
    
    exit;
    ```

## Install BladePipe Console

1. Go to [BladePipe](https://www.bladepipe.com). Click **Enterprise Edition** > **Download** (compatible with X86/ARM64) to get the download link.

2. Download the package to the specified path.
    ```bash
    cd /home/bladepipe/tar_gz

    wget -c "{paste the download link got from BladePipe website}" -Obladepipe.tgz
    ```

3. Modify the privilege to the package. 
    ```bash
    chown -R bladepipe:bladepipe /home/bladepipe/
    ```

4. Switch to the user `bladepipe`, and enter the home directory.
    ```bash
    su - bladepipe

    cd /home/bladepipe/tar_gz
    ```
5. Unzip the package. 
    ```bash
    tar -xaf bladepipe.tgz

    tar -zxvf bladepipe-console.tar.gz

    mv /home/bladepipe/tar_gz/bladepipe /home/bladepipe
    ```
6. Modify the parameters in the configuration file.
    ```bash
    cd ~/bladepipe/console/conf

    vi business-north_america.properties
    ```

7. **Configure the following parameters**.

    | Parameter                           | Description                                         |             
    | --------------------------------| ------------------------------------------------------------|
    | spring.datasource-cc.url       | URL of the metadata database bladepipe_console. Modify host:port, database name and time zone(if in different time zone)  |
    | spring.datasource-cc.username  | Username of the metadata database bladepipe_console      |
    | spring.datasource-cc.password  | Password of the metadata database bladepipe_console          |
    | spring.datasource-rdp.url      | URL of the metadata database bladepipe_rdp. Modify host:port, database name and time zone(if in different time zone)  |
    | spring.datasource-rdp.username | Username of the metadata database bladepipe_rdp                               |
    | spring.datasource-rdp.password | Password of the metadata database bladepipe_rdp                          |
    | jwt.secret                      |  The secret key of the system login authentication algorithm. It can be a 64-bit random code.                 |
    | console.rsocket.dns             |  Private network host of the machine (without port)               |
    | prometheus.host                 |  Private network host of the machine (without port)               |

8. Start the Console.
    ```bash
    cd ~/bladepipe/console/bin

    sh ./startConsoleAndUpdDb.sh
    ```

## Install Prometheus

1. Download from [Prometheus official site](https://prometheus.io/download/)
    ```bash
    su - bladepipe

    cd ~/tar_gz

    wget -c "https://github.com/prometheus/prometheus/releases/download/v2.53.4/prometheus-2.53.4.linux-amd64.tar.gz" -Oprometheus.tar.gz

    tar -zxvf prometheus.tar.gz -C /home/bladepipe
    ```

2. Edit `prometheus.yml`.
    ```bash
    cd /home/bladepipe/prometheus
  
    vi prometheus.yml
    ```

3. Add config to `scrape_configs` section in file.
    ```bash
    - job_name: 'bladepipe-worker'
      scrape_interval: 10s
      metrics_path: '/metrics'
      static_configs:
      - targets: ['localhost:8084']
    - job_name: 'bladepipe-console'
      scrape_interval: 10s
      metrics_path: '/console/metrics/prometheus'
      static_configs:
      - targets: ['localhost:8111']
    ```

4. Start up prometheus using the following scripts.
    ```bash
    ./prometheus --log.level=debug 1>>stdout.log 2>&1 &
    ```
   
## Log in to the Console

- Console Address (Please visit it in Chrome): `http://${your_bladepipe_console_ip}:8111`
- Default username: `test@clougence.com`
- Default password: `clougence2021`
- Default verification code: `777777`
  :::info
  It is recommended to change the credentials according to the following docs:
    - [Change password](../maintenance/change_on_premise_password.md)
    - [Change verification code](../maintenance/change_verify_code_777777.md)
    - [Change AccessKey and SecretKey](../maintenance/change_ak_sk.md)
  :::


## Activate BladePipe

Please refer to [License](../../../license/license_use.md) to get the activation code.

## Install a Worker

Please refer to [Install a Worker](add_worker_binary.md).