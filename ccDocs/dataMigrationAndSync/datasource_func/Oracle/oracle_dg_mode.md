---
id: oracle_dg_mode
title: Oracle 源端 DataGuard 备库配置
description: 指导如何在 Oracle DataGuard 备库中配置字典文件目录，以支持 CloudCanal 增量同步任务。
---

本文档说明如何在 Oracle 源端的 DataGuard 备库中配置用于增量同步的 LogMiner 字典文件目录，以便 CloudCanal 能正常解析归档日志。

## 前置条件

CloudCanal 版本 ≥ 4.7.1.0

## 操作步骤

### 步骤 1：在备库服务器上创建物理目录

以 Oracle 安装用户登录服务器，创建字典文件存储目录：

```shell
su - oracle
mkdir -p /u01/app/oracle/dic
```

### 步骤 2：在 Oracle 中配置逻辑目录与权限
若版本为 **Oracle 19c**，进行以下操作：
```sql
-- 创建逻辑目录
CREATE DIRECTORY DIC_DIR AS '/u01/app/oracle/dic';

-- 授权访问
GRANT READ, WRITE ON DIRECTORY DIC_DIR TO PUBLIC;

-- 查看目录配置
SELECT * FROM SYS.DBA_DIRECTORIES;
```

若版本为 **Oracle 11g**，还需额外设置 `utl_file_dir` 参数并重启数据库：
```sql
ALTER SYSTEM SET utl_file_dir='/u01/app/oracle/dic' SCOPE=SPFILE;

-- 重启数据库后生效
STARTUP FORCE;
```


### 步骤 3：验证目录可写性

通过 PL/SQL 构建 LogMiner 字典文件：

```sql
BEGIN
  DBMS_LOGMNR_D.BUILD(
    dictionary_filename => 'logminer_dict.ora',
    dictionary_location => 'DIC_DIR',
    options => DBMS_LOGMNR_D.STORE_IN_FLAT_FILE
  );
END;
```

验证目录中是否生成对应文件，若无报错即表示配置成功。

### 步骤 4：CloudCanal 数据源配置

在 CloudCanal 控制台添加数据源时，额外参数配置如下：

- `isDataGuard=true`
- `dgDicLocation=DIC_DIR`

:::info
`dgDicLocation` 需与 Oracle 中的 `CREATE DIRECTORY` 名称保持一致。
:::