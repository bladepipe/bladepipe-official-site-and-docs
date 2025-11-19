---
id: oracle_starrocks_sync
description: Oracle 到 Starrocks 数据迁移同步,具备可视化创建、结构迁移、数据初始化、数据同步、自动化流程等能力
title: Oracle 到 Starrocks 数据同步
date: 2023-10-29
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/oracle_starrocks_sync.png 
slug: /data_sync_sample/oracle_starrocks_sync
---

## 简述
[CloudCanal](https://www.clougence.com?src=cc-doc-blog-oracle-starrocks-sync) 当前最新版本已经支持源端 Oracle、SqlServer 等主流传统数据库作为源端迁移同步数据到 StarRocks 来构建实时数仓。

本文简要介绍如何快速构建一个 **Oracle 到 StarRocks 数据迁移同步任务**。

## 技术要点

### 基于StreamLoad的导入方式
CloudCanal 采用了 **StreamLoad 方式进行导入**，源端的消息会转成字节流，最后会以批量发送的形式通过 HTTP 协议发往 StarRocks。

CloudCanal 默认采用 **json 格式**来进行StreamLoad导入，如果用户内容特殊字符较少，也可以开启 csv 格式导入，分隔符可以通过参数 columnSeparator 和 lineSeparator 设置。

基于 StreamLoad 的写入方式，实际写入对端的操作均为 INSERT，CloudCanal 同步时会**自动将 UPDATE / DELETE 转成 INSERT 语句**，并**修改 __op 值**，StarRocks会自动进行数据合并。

### 支持常用DDL实时同步
Oracle -> StarRocks 支持**新增列**、**删除列**DDL。**DDL实时同步**到对端时会自动转换成 StarRocks 兼容的语法，数据类型也会根据映射关系进行自动转换。

### 编辑订阅功能
CloudCanal 提供了便利的修改订阅能力。对于一个已经创建好的正在运行的增量同步任务，如业务需求有新增表需要订阅，可以在原有任务的基础上新增需要订阅的表，生成子任务，自动完成全量、增量迁移同步，在完成后会子任务会自动与原有的任务合并。

### 数据类型映射
CloudCanal结构迁移和数据迁移同步时会自动进行数据类型映射。类型映射见下表：

| Oracle类型 | StarRocks类型 |
| --- | --- |
| CHAR | VARCHAR |
| NCHAR | VARCHAR |
| VARCHAR2 | VARCHAR |
| NVARCHAR | VARCHAR |
| NVARCHAR2 | VARCHAR |
| LONG | STRING |
| NUMBER_BIGINT | BIGINT |
| NUMBER_DECIMAL | DECIMAL |
| FLOAT | FLOAT |
| BINARY_FLOAT | DECIMAL |
| BINARY_DOUBLE | DECIMAL |
| CLOB | STRING |
| NCLOB | STRING |
| DATA | DATETIME |
| TIMESTAMP | DATETIME |
| TIMESTAMP_WITH_TIME_ZONE | DATETIME |
| TIMESTAMP_WITH_LOCAL_TIME_ZONE | DATETIME |
| INTERVAL_YEAR_TO_MONTH | DATETIME |
| INTERVAL_DAY_TO_SECOND | DATETIME |
| ROWID | STRING |
| PLSQL_BOOLEAN | BOOLEAN |
| XMLTYPE | STRING |
| HTTPURITYPE | STRING |

## 操作示例
### 准备CloudCanal
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-oracle-starrocks-sync),使用参见[快速上手文档](https://www.clougence.com/docs/productop/docker/install_linux_macos)
- 准备好源端和目标端数据库及对应数据

### Oracle源端前置准备
CloudCanal在做Oracle作为源端的数据迁移同步时，需要做一些前置准备。具体可以参考 [ORACLE LogMiner同步准备](https://www.clougence.com/docs/dataMigrationAndSync/datasource_func/Oracle/prepare_for_oracle_logminer)。
### 添加数据源

- 登录CloudCanal平台
- **数据源管理**->**添加数据源**
  ![添加数据源](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/1.png)

- 创建源端数据源：选择**自建数据源**，选择Oracle，并填写相关数据库信息
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/2.png)
  - **logminerUser**
    - ORACLE源端增量任务使用redo解析(logminer)方式时使用的账号，需要CDB类型用户
  - **logminerPasswd**
    - ORACLE源端增量任务使用redo解析(logminer)方式时使用的账号密码
  - **logminerConnectType**
    - ORACLE源端增量任务使用redo解析(logminer)方式时使用的连接方式，目前支持ORACLE_SID或ORACLE_SERVICE模式
  - **logminerSidOrService**
    - ORACLE源端增量任务使用redo解析(logminer)方式时使用的连接标识符，和logminerConnectType参数配合使用，ORACLE_SID连接方式，则填写sid,ORACLE_SERVICE连接方式，则填写service name


- 创建目的端数据源，选择**自建数据源**，选择StarRocks，并填写相关数据库信息
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/3.png)

- **Client地址**
  - StarRocks 提供的 MySQL 交互协议端口，CloudCanal 用其查询库表表的元数据信息，对应 StarRocks QueryPort，默认端口为 9030
- **Http地址**
  - StarRocks 接收 streamload 的 http 请求，此处可填写 BE 节点地址，默认端口为 8030
  - 如需负载均衡也可直接填写 FE 地址和端口
  
- 数据源创建成功
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/4.png)

### 任务创建

- 任务管理->创建任务
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/5.png)

- 选择集群
- 源端选择刚添加的**Oracle**数据源，目标端选择**StarRocks**数据源，分别点击**测试连接**按钮以测试数据库连通性和获取schema级别元信息，显示连接成功后，设置数据库映射关系
- **StarRocks**的结构迁移支持用户自定义分桶数等自定义建表信息
- 点击下一步
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/6.png)

- 选择**增量同步**，并且勾选**全量初始化**
- 点击下一步
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/7.png)

- 选择订阅的表
- 点击下一步
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/8.png)

- 配置列映射
- 点击下一步
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/9.png)

- 点击创建任务
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/10.png)

- 任务创建成功并启动后，会自动执行结构迁移、全量迁移、增量同步
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0030/11.png)

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-oracle-starrocks-sync) 进行 Oracle 到 StarRocks 数据迁移同步。

StarRocks 作为新兴的**实时数仓**产品，为传统数据业务带去更加**实时、一致**的体验，让数据得到更加广泛的使用，CloudCanal希望助一臂之力，让数据流动更加平滑顺畅。

