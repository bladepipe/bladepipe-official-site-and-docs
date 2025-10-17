---
id: change_mysql_on_k8s
title: 更换元数据库(Kubernetes)
description: CloudCanal 默认提供了元数据库镜像(MySQL), 但是用户上生产，希望能够用自有的、更加稳定、且得到良好维护的元数据库，本文档介绍 CloudCanal K8S 部署如何更换元数据库。
---

本文档介绍 CloudCanal K8S 部署如何更换元数据库。

CloudCanal 默认提供了元数据库镜像（MySQL）, 但是用户上生产，希望能够用自有的、更加稳定、且得到良好维护的元数据库，本文做了具体的操作描述。

## 导出已有元数据库

- 在 K8S 集群上执行以下命令，导出 cloudcanal_console 库内容

  ```bash
  # enter cloudcanal-mysql pod
  kubectl exec -it mysql-xxx-xxx -n cloudcanal /bin/bash
  
  # export metadata db to *.sql
  mysqldump -uroot -proot --databases cloudcanal_console > ./cloudcanal_console.sql
  
  # ver 4.x extra operation
  mysqldump -uroot -proot --databases clougence_rdp > ./clougence_rdp.sql
  
  # exist Pod and copy *.sql to host
  kubectl cp cloudcanal/mysql-xxx-xxx:/tmp/cloudcanal_console.sql .
  
  # ver 4.x extra operation
  kubectl cp cloudcanal/mysql-xxx-xxx:/tmp/clougence_rdp.sql .
  ```

## 导入新元数据库

- 登录新元数据库，并赋好相应账号权限

  ```bash
  mysql> source ${YOUR_PATH}/cloudcanal_console.sql;

  # ver 4.x extra operation
  mysql> source ${YOUR_PATH}/cloudcanal_console.sql;
  ```

## 修改 Console 的 Configmap 里的配置，修改后会自动同步到 Console Pod 中

- 编辑 Configmap：```kubectl edit cm console-config -n cloudcanal```
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

## 重启 console

## 常见问题

#### 账号权限

* 请确保修改后的账号对 CloudCanal 元数据库有以下权限： `SELECT`、`UPDATE`、`DELETE`、`INSERT`、`CREATE`、`DROP`、`INDEX`、`ALTER`、`EXECUTE`、`CREATE ROUTINE`、`ALTER ROUTINE`。
    ```sql
    GRANT SELECT,UPDATE,DELETE,INSERT,CREATE,DROP,INDEX,ALTER,EXECUTE,CREATE ROUTINE,ALTER ROUTINE ON cloudcanal_console.* TO common_user@'%';
    ```
