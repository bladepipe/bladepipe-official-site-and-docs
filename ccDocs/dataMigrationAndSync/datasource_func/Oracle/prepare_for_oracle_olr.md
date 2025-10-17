---
id: prepare_for_oracle_olr
title: Oracle OpenLogReplicator 同步准备
description: CloudCanal 使用 OpenLogReplicator 来同步 Oracle。本文介绍同步前的准备动作。
---
[CloudCanal](https://www.clougence.com/) 使用 [OpenLogReplicator](https://github.com/bersler/OpenLogReplicator) 实现 Oracle 增量数据同步。本文介绍数据同步前的准备工作。

## 准备动作 1 - 开启日志归档
1. 使用 DBA 权限的账号登录 Oracle (e.g.,sqlplus)。
2. 检查数据库日志模式。
    - 如果 log_mode 返回 `ARCHIVELOG` 则忽略后续步骤。
    - 如果 log_mode 返回  `NOARCHIVELOG` 则继续后续步骤。
    ```sql
    SELECT DBID,NAME,LOG_MODE FROM V$DATABASE;
    ```

3. 关闭当前数据库。
    ```sql
    SHUTDOWN IMMEDIATE;
    ```

4. 启动并挂载数据库。
    ```sql
    STARTUP MOUNT;
    ```

5. 指定归档日志路径。
    ```sql
    -- mkdir -p /u01/app/oracle/fra
    ALTER SYSTEM SET DB_RECOVERY_FILE_DEST_SIZE = '5G' SCOPE = BOTH;
    ALTER SYSTEM SET DB_RECOVERY_FILE_DEST = '/u01/app/oracle/fra' SCOPE = BOTH;
    ```

6. 开启归档日志，并打开数据库。
    ```sql
    ALTER DATABASE ARCHIVELOG;
    ALTER DATABASE OPEN READ WRITE;
    ```
7. 开启补全日志。
    ```sql
    ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
    ALTER SYSTEM ARCHIVE LOG CURRENT;
    ```

## 准备动作 2 - 授予账号权限
    ```sql
    CREATE USER USR1 IDENTIFIED BY USR1PWD;
          
    GRANT CONNECT TO USR1;
    GRANT RESOURCE TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.CCOL$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.CDEF$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.COL$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.DEFERRED_STG$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.ECOL$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.LOB$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.LOBCOMPPART$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.LOBFRAG$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.OBJ$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.TAB$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.TABCOMPART$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.TABPART$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.TABSUBPART$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.TS$ TO USR1;
    GRANT SELECT, FLASHBACK ON SYS.USER$ TO USR1;
    GRANT SELECT ON SYS.DBA_TAB_COLS TO USR1;
    GRANT SELECT ON SYS.DBA_COL_COMMENTS TO USR1;
    GRANT SELECT ON SYS.V_$ARCHIVED_LOG TO USR1;
    GRANT SELECT ON SYS.V_$DATABASE TO USR1;
    GRANT SELECT ON SYS.V_$DATABASE_INCARNATION TO USR1;
    GRANT SELECT ON SYS.V_$LOG TO USR1;
    GRANT SELECT ON SYS.V_$LOGFILE TO USR1;
    GRANT SELECT ON SYS.V_$PARAMETER TO USR1;
    GRANT SELECT ON SYS.V_$STANDBY_LOG TO USR1;
    GRANT SELECT ON SYS.V_$TRANSPORTABLE_PLATFORM TO USR1;
    GRANT SELECT, FLASHBACK ON XDB.XDB$TTSET TO USR1;

    ALTER USER USR1 QUOTA UNLIMITED ON USERS;
    
    DECLARE
    CURSOR C1 IS SELECT TOKSUF FROM XDB.XDB$TTSET;
    CMD VARCHAR2(2000);
    BEGIN
    FOR C IN C1 LOOP
            CMD := 'GRANT SELECT, FLASHBACK ON XDB.X$NM' || C.TOKSUF || ' TO USR1';
    EXECUTE IMMEDIATE CMD;
    CMD := 'GRANT SELECT, FLASHBACK ON XDB.X$QN' || C.TOKSUF || ' TO USR1';
    EXECUTE IMMEDIATE CMD;
    CMD := 'GRANT SELECT, FLASHBACK ON XDB.X$PT' || C.TOKSUF || ' TO USR1';
    EXECUTE IMMEDIATE CMD;
    END LOOP;
    END;
    /
    ```
## 准备动作 3 - 准备 OpenLogReplicator 组件
1. 编译环境准备，需要 Docker、Docker Compose、Git。
2. 新增用户。
      ```bash
    sudo useradd -d /home/clougence -m clougence

    sudo passwd clougence

    ### clougence/CloudCanal@2021

    ## centos
    sudo echo "clougence ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
      ```
3. 编译 OpenLogReplicator 镜像。
    ```bash
    su - clougence
    
    git clone https://github.com/bersler/OpenLogReplicator-docker
    
    cd OpenLogReplicator-docker
    
    bash build-prod.sh
    ```
    :::info
    OpenLogReplicator 镜像的编译过程较长（在网络畅通的情况下约需十几分钟）。建议在其他服务器上预先完成编译，然后上传至目标环境。
    :::
4. 准备 OpenLogReplicator 启动目录。
    ```bash
    su - clougence
    cd ~
    
    mkdir OpenLogReplicator
    
    cd OpenLogReplicator
    
    touch docker-compose.yaml
    
    mkdir checkpoint
    chmod 777 checkpoint
    
    mkdir log
    chmod 777 log
    
    mkdir output
    chmod 777 output
    
    mkdir scripts
    touch scripts/OpenLogReplicator.json
    
    chmod 777 scripts
    chmod 644 scripts/OpenLogReplicator.json
    ```

5. 编写 docker-compose.yaml 文件。
    ```yml
    services:
        openlogreplicator:
          image: bersler/openlogreplicator:debian-12.0
          container_name: CloudCanal-OpenLogReplicator
          privileged: true
          ports:
              - 1222:1222
          volumes:
              - ./checkpoint:/opt/OpenLogReplicator/checkpoint
              - ./log:/opt/OpenLogReplicator/log
              - ./output:/opt/output
              - ./scripts:/opt/OpenLogReplicator/scripts
          command: tail -f /dev/null
          entrypoint: [""]
          restart: "no"
          networks:
              - internal
    networks:
        internal:
    ```
6. 编写 OpenLogReplicator.json 文件。
    :::info
    有关此文件所需格式的更多信息，请参阅 [OpenLogReplicator](https://github.com/bersler/OpenLogReplicator/blob/master/documentation/reference-manual/reference-manual.adoc) 文档。
    :::
    ```json
    {
        "version": "1.8.5",
        "log-level": 3,
        "source": [
          {
            "alias": "SOURCE",
            "name": "CLOUDCANAL",
            "reader": {
            "type": "offline",
            "path-mapping": ["/u01/app/oracle","/home/user1/oracle"]
          },
            "format": {
              "type": "json",
              "column": 2,
              "db": 3,
              "interval-dts": 9,
              "interval-ytm": 4,
              "message": 2,
              "rid": 1,
              "schema": 7,
              "scn-type": 1,
              "timestamp-all": 1
          },
            "flags": 32,
            "filter": {
              "table": [
                {"owner": "<Schema>", "table": "<Table>", "tag": "[all]"}
              ]
            }
          }
        ],
        "target": [
          {
            "alias": "CLOUDCANAL",
            "source": "SOURCE",
            "writer": {
            "type": "network",
            "uri": "0.0.0.0:1222"
            }
          }
        ]
      }
    ```
7. 准备 OpenLogReplicator CheckPoint 文件。
   - **方式一**：参考 [OpenLogReplicator 官方文档](https://github.com/bersler/OpenLogReplicator/blob/master/scripts/gencfg.sql) 准备 CheckPoint 文件。
   - **方式二**：按照如下步骤构建 CheckPoint 文件。
     1. 点击 **创建任务**，选择 Oracle 数据源，并在高级配置中选择 OpenLogReplicator，填写源名称以及主机地址。
     2. 在创建任务的第二步，取消勾选 **自动启动任务**。
     3. 进入任务运行的 Sidecar 服务器，找到生成的 **checkPoint** 文件(以.json结尾的文件)。
       - 文件所在目录：`/home/clougence/cloudcanal/data/oracle/任务名称_INCREMENT/*.json`
     4. 将生成的 json 文件拷贝到 OpenLogReplicator/checkpoint 启动目录。
8. 启动 OpenLogReplicator 容器。
    ```bash
    su - clougence

    cd ~/OpenLogReplicator

    docker compose up -d
    ```
9. 通过 sshfs 挂载 Oracle Arch 和 Redo 日志文件。
    :::info
   OpenLogReplicator 需要访问 Oracle 数据库的日志文件，可通过其他方式将其共享至 OpenLogReplicator 的工作目录。
    :::

    ```bash
    docker exec -tiu root CloudCanal-OpenLogReplicator bash -c "apt-get update && apt-get -y install sshfs"

    docker exec -ti CloudCanal-OpenLogReplicator bash

    mkdir -p /home/user1/oracle/fra
    
    mkdir -p /home/user1/oracle/oradata

    sshfs root@{oracleIp}:/u01/app/oracle/fra/ /home/user1/oracle/fra

    sshfs root@{oracleIp}:/u01/app/oracle/oradata/ /home/user1/oracle/oradata
    ```

10. 启动 OpenLogReplicator 进程。
    ```bash
    docker exec -ti  CloudCanal-OpenLogReplicator bash

    bash /opt/run.sh &
    ```
