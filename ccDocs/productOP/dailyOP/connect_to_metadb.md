---
id: connect_to_metadb
title: 访问元数据库
description: 本文档介绍 CloudCanal 如何访问元数据库。
---

本文档介绍 CloudCanal 如何访问元数据库。

## 步骤

- TGZ 部署
  - 登录 CloudCanal 部署节点
    ```shell
    ssh root@xx.xx.xx.xx
    ```
  - Linux 宿主机上如果没有安装 MySQL Client 可以使用如下命令安装，其他操作系统宿主机请自行安装 MySQL Client
    ```shell
     rpm -ivh https://repo.mysql.com//mysql57-community-release-el7-11.noarch.rpm

     yum install mysql-community-client.x86_64
    
     mysql -h127.0.0.1 -uroot -P3306 -p123456
     ```

- Docker 部署
  - 登录 MySQL 元数据库
    ```shell
    docker exec -it cloudcanal-console /bin/bash
    
    mysql -h127.0.0.1 -uroot -P3306 -p123456
    ```

- K8s 部署
  - 登录 MySQL 元数据库
    ```shell
    kubectl get po -ncloudcanal | grep "mysql"

    kubectl exec -it mysql-xxx -ncloudcanal -- bash
    
    mysql -h127.0.0.1 -uroot -P3306 -p123456
    ```
