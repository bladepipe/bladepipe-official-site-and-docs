---
id: prepare_for_oracle_olr
title: Oracle OpenLogReplicator
description: BladePipe allows to use OpenLogReplicator to replicate Oracle data. This page tells the prerequisites before OpenLogReplicator-based Oracle sync. 
---

[BladePipe](https://www.bladepipe.com/) can use [OpenLogReplicator](https://github.com/bersler/OpenLogReplicator) to synchronize the incremental data in Oracle. This page describes the preparations before data sync.

## Step 1: Enable ARCHIVE LOG
1. Log on to an Oracle database (e.g.,sqlplus) using a user with DBA permissions.
2. Query the database log mode.
    ```sql
    SELECT DBID,NAME,LOG_MODE FROM V$DATABASE;
    ```
  - If `ARCHIVELOG` is returned for log_mode, then skip the following steps.
  - If `NOARCHIVELOG` is returned for log_mode, then continue the following steps.

3. Shut down the database.。
    ```sql
    SHUTDOWN IMMEDIATE;
    ```

4. Start up and mount the database.
    ```sql
    STARTUP MOUNT;
    ```

5. Define the log path. 
    ```sql
    -- mkdir -p /u01/app/oracle/fra
    ALTER SYSTEM SET DB_RECOVERY_FILE_DEST_SIZE = '5G' SCOPE = BOTH;
    ALTER SYSTEM SET DB_RECOVERY_FILE_DEST = '/u01/app/oracle/fra' SCOPE = BOTH;
    ```

6. Enable ARCHIVELOG mode and open the database.
    ```sql
    ALTER DATABASE ARCHIVELOG;
    ALTER DATABASE OPEN READ WRITE;
    ```
7. Enable supplemental logging.
    ```sql
    ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
    ALTER SYSTEM ARCHIVE LOG CURRENT;
    ```

## Step 2: Grant Permissions to a User
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
## Step 3: Prepare Components of OpenLogReplicator 
1. Prepare the compilation environment, which requires Docker, Docker Compose, and Git.
2. Add a user.
    ```bash
   sudo useradd -d /home/clougence -m clougence

   sudo passwd clougence

   ### clougence/CloudCanal@2021

   ## centos
   sudo echo "clougence ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
    ```
3. Compile the image of OpenLogReplicator.
   ```bash
   su - clougence
   
   git clone https://github.com/bersler/OpenLogReplicator-docker
   
   cd OpenLogReplicator-docker
   
   bash build-prod.sh
   ```
   :::info
   It takes a long time to compile OpenLogReplicator image (about ten minutes when the network is unobstructed). It is recommended to complete the compilation on other servers in advance and then upload it to the target environment.
   :::

1. Prepare the OpenLogReplicator start directory.
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

2. Write docker-compose.yaml file.
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
3. Write OpenLogReplicator.json file.
   :::info
   For more information about the format of the file, please refer to [OpenLogReplicator](https://github.com/bersler/OpenLogReplicator/blob/master/documentation/reference-manual/reference-manual.adoc).
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
1. Prepare the OpenLogReplicator CheckPoint file.
   - **Method 1**: Please refer to [OpenLogReplicator doc](https://github.com/bersler/OpenLogReplicator/blob/master/scripts/gencfg.sql) to prepare the CheckPoint file.
   - **Method 2**: Follow the steps below to create a CheckPoint file. 
     1. Click **Create DataJob**. Select Oracle, and select OpenLogReplicator in Advanced, then fill in the source instance name and the host.  
     2. In **Properties** step, do not select **Start Automatically**. 
     3. Go to the Worker, and find the generated **CheckPoint** file (end with .json).
       - File path: `/home/bladepipe/bladepipe/data/oracle/DataJobName_INCREMENT/*.json`
     4. Copy the generated json file to the start directory of OpenLogReplicator/checkpoint.
2. Start OpenLogReplicator container.
    ```bash
    su - clougence

    cd ~/OpenLogReplicator

    docker compose up -d
    ```
3. Mount Oracle Arch and Redo log files over sshfs. 
   :::info
   OpenLogReplicator needs to access the log files of the Oracle database, which can be shared to the working directory of OpenLogReplicator through other means.
   :::

     ```bash
    docker exec -tiu root CloudCanal-OpenLogReplicator bash -c "apt-get update && apt-get -y install sshfs"

     docker exec -ti CloudCanal-OpenLogReplicator bash

     mkdir -p /home/user1/oracle/fra
 
     mkdir -p /home/user1/oracle/oradata

     sshfs root@{oracleIp}:/u01/app/oracle/fra/ /home/user1/oracle/fra

     sshfs root@{oracleIp}:/u01/app/oracle/oradata/ /home/user1/oracle/oradata
     ```

1.  Start the OpenLogReplicator process.
    ```bash
    docker exec -ti  CloudCanal-OpenLogReplicator bash

    bash /opt/run.sh &
    ```
