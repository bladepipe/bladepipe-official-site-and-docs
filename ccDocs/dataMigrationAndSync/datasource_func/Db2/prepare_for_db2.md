---
id: prepare_for_db2
title: Db2 源端 CDC 同步准备
---

如您只需要全量数据迁移，可跳过本步骤。


## 数据库开启归档日志

1. 切换到 db2inst1 用户，并连接到数据库。
    ```bash
    su - db2inst1
    db2 connect to <db_name>
    ```

2. 查看数据库当前主日志模式。如果返回为 OFF 则未开启归档模式。
    ```bash
    db2 get db cfg for <db_name> | grep LOGARCHMETH1
    ```

3. 更改数据库日志模式。
    - 具体的日志模式配置请参见 [主日志归档方法](https://www.ibm.com/support/knowledgecenter/zh/SSEPGG_10.5.0/com.ibm.db2.luw.admin.config.doc/doc/r0011448.html) 和 [辅助日志归档方法](https://www.ibm.com/support/knowledgecenter/zh/SSEPGG_10.5.0/com.ibm.db2.luw.admin.config.doc/doc/r0011449.html)。
    - ASN 代理必须有一个最近的起点来读取。以下命令可能会修剪数据，保证只有最新版本可用。如果您不需要保留旧版本的数据，请指定 ```dev/null``` 为备份位置。
    ```bash
    db2 update db cfg for <db_name> using LOGARCHMETH1 <backup_path>
    ```

4. 断开其他应用的数据库连接。
    ```bash
    db2 force applications all
    ```

5. 首次把 Db2 改成归档日志后，数据库处于 BACKUP PENDING 状态，需要进行一次全备份。
    ```bash
    db2 backup db <db_name>
    ```

6. 连接到数据库，检查该数据库是否是归档日志模式。
    ```bash
    db2 connect to <db_name>
    db2 get db cfg for <db_name> | grep -i LOGARCHMETH1
    ```
## 初始化 Db2 ASN Capture 程序

1. 数据库开启归档模式，并同时开启 Db2 CDC 后，用户所订阅表的增 / 删 / 改操作会被 Db2 ASN Capture 捕获到并写入到 CDC 表中，之后 CloudCanal 将会扫描相关的表进行增量同步。
2. 通过以下脚本，可以一键初始化 Db2 ASN Capture 程序。
    ```bash
    # 安装 CDC 初始化工具
    /bin/bash -c "$(curl -fsSL https://gitee.com/clougence/db2-cdc-tools/raw/master/script/install.sh)"
    
    # 运行脚本，<db_name> 需要替换为数据库名
    bash ./cdc_tools/cdc_setup.sh <db_name>
    ```
