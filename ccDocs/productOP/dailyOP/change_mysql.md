---
id: change_mysql
title: 更换元数据库(Docker)
description: CloudCanal 默认提供了元数据库镜像(MySQL), 但是用户上生产，希望能够用自有的、更加稳定、且得到良好维护的元数据库，本文档介绍 CloudCanal docker 部署如何更换元数据库。
---

本文档介绍 CloudCanal Docker 部署如何更换元数据库。

CloudCanal 默认提供了元数据库镜像（MySQL），但是用户上生产，希望能够用自有的、更加稳定、且得到良好维护的元数据库，本文做了具体的操作描述。

## 导出已有元数据库

- docker 宿主机上执行以下命令，导出元数据库内容

  ```bash
  # enter cloudcanal-mysql container
  docker exec -it cloudcanal-mysql /bin/bash
  
  # export metadata db to *.sql
  mysqldump -uroot -proot --databases cloudcanal_console > ./cloudcanal_console.sql
  
  # ver 4.x extra operation
  mysqldump -uroot -proot --databases clougence_rdp > ./clougence_rdp.sql
  
  # exist the container and copy *.sql to host
  docker cp cloudcanal-mysql:/tmp/cloudcanal_console.sql .
  
  # ver 4.x extra operation
  docker cp cloudcanal-mysql:/tmp/clougence_rdp.sql .
  ```

## 导入新元数据库

- 登录新元数据库，并赋好相应账号权限

  ```bash
  mysql> source ${YOUR_PATH}/cloudcanal_console.sql;

  # ver 4.x extra operation
  mysql> source ${YOUR_PATH}/cloudcanal_console.sql;
  ```

## 修改 console 容器中 springboot 配置文件中配置

- 文件路径:/`${LOGIN_USER}`/cloudcanal_home/console_data/console/conf/business-output.properties
- 修改配置项
  - spring.datasource.url (ver 3.x)
  - spring.datasource.username (ver 3.x)
  - spring.datasource.password (ver 3.x)
  - spring.datasource-cc.url (ver 4.x)
  - spring.datasource-cc.username (ver 4.x)
  - spring.datasource-cc.password (ver 4.x)
  - spring.datasource-rdp.url (ver 4.x)
  - spring.datasource-rdp.username (ver 4.x)
  - spring.datasource-rdp.password (ver 4.x)
  
  :::info
  CloudCanal 4.x 因为引入平台能力，对元数据库进行了调整，和 3.x 版本有区别
  :::

## 重启 console 容器

## 常见问题

#### 账号权限

* 请确保修改后的账号对 CloudCanal 元数据库有以下权限： `SELECT`、`UPDATE`、`DELETE`、`INSERT`、`CREATE`、`DROP`、`INDEX`、`ALTER`、`EXECUTE`、`CREATE ROUTINE`、`ALTER ROUTINE`。
    ```sql
    GRANT SELECT,UPDATE,DELETE,INSERT,CREATE,DROP,INDEX,ALTER,EXECUTE,CREATE ROUTINE,ALTER ROUTINE ON cloudcanal_console.* TO common_user@'%';
    ```
