---
id: rdb_kudu_sync
description: CloudCanal 数据同步链路创建示例-主流 RDB 到 Kudu
title: 主流 RDB 到 Kudu 数据同步
date: 2023-06-11
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/rdb_kudu_sync.png 
slug: /data_sync_sample/rdb_kudu_sync
---

## 简述
Kudu 是 Cloudera 开源的新型列式存储系统，是 Apache Hadoop 生态圈的成员之一。它专门为了对快速变化的数据进行快速的分析，填补了以往Hadoop 存储层的空缺。

本篇文章将会介绍几种数据数据同步到 Kudu 的方案选择，然后从功能和使用角度介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-rdb-kudu-sync) 如何帮助我们解决数据实时同步到 Kudu。

## 几种方案

Kudu 是一个存储层组建，若要同步数据到 Kudu 的可以有三种选择
- （**基于RDB**）选用类似 DataX 这类开源中间件，同时 Kudu 搭建上层 SQL 引擎。可选的 SQL 引擎有：Hive、Impala
- （**基于MQ**）选用 Kafka 生态，基于 Kafka + Flume + Kudu 实现数据同步。
- （**基于编码**）开发对应的数据迁移程序，直接将数据写入 Kudu 存储。

## 如何选择？

基于RDB方案
- 需要 Kudu 上层有一个 SQL 引擎。在官方文档上提到了两种使用Kudu 的方式
  - Hive 是基于 MapReduce 架构、Impala 是基于 MPP 架构
- 单纯的数据写入并不需要复杂的计算逻辑，选择 MPP 架构显然更适合一些。
  - 这种情况下推荐  Impala + Kudu + DataX

基于MQ方案
- 比较适合源端数据变化有多个不同的消费者，数据同步仅仅是其中一条链路。

基于编码方案
- 比较适合在数据同步过程中需要对数据进行加工。

## 同步的技术点
建表
- 对于 Kudu 上的建表需要通过  kudu-client 来进行，例如：
```
List<ColumnSchema> columns = new ArrayList(2);
columns.add(new ColumnSchema.ColumnSchemaBuilder("key", Type.INT32).key(true).build());
columns.add(new ColumnSchema.ColumnSchemaBuilder("value", Type.STRING).build());
List<String> rangeKeys = new ArrayList<>();
rangeKeys.add("key");
Schema schema = new Schema(columns);
client.createTable(tableName, schema, new CreateTableOptions().setRangePartitionColumns(rangeKeys));
```
- Kudu 由于存储引擎限制，每张表必须要指定 Partition Column。
- 被设置为 Partition 的列不允许 update，如若修改 Partition Column 列的值。需要删除整行数据重新插入。

数据写入
- Kudu 数据写入 Kudu 支持 **Insert**、**Update**、**Delete**、**Upsert** 四种操作

```
KuduTable table = client.openTable(tableName);
KuduSession session = client.newSession();
session.setTimeoutMillis(60000);
for (int i = 0; i < 3; i++) {
    Insert insert = table.newInsert();
    PartialRow row = insert.getRow();
    row.addInt(0, i);
    row.addString(1, "value " + i);
    session.apply(insert);
}
session.flush();
session.close();
```

数据类型
- Kudu 1.6 之前，不支持 Decimal。因此源端数据类型如果是浮点数只可以选择：float、double、int、string 来承载
- Kudu 1.15 开始，提供了 varchar 类型可以与 数据库的 varchar 相互对应。在此之前应当选择 string 类型。

## 基于 CloudCanal 快速实现数据同步
前面介绍的三种方式中 RDB方案要求增加配置 SQL 引擎、MQ 方案 则要求增加 Kafka 和 Flume。它们的数据同步链路都较长一旦出现问题，比较不容易排查原因所在。CloudCanal 是采用了第三种方式。

- 从源端直接订阅数据变更
- 通过 kudu-client 直接将数据写入到 Kudu 存储引擎
- 整个过程无需 MQ 或 SQL 引擎的支持。

对比前面两种方式具有下列几个优势
- 资源开销小
- 链路简单高效
- 产品化操作便捷

## 举个"栗子"

### 准备 CloudCanal
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-rdb-kudu-sync),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)

### 配置 Host
- 由于 Kudu Client 通信时会通过链接串配置的 master 地址获取到所有 Tablet Server 节点信息，这些节点信息通常是 host 名。因此 sidecar 无法直接解析，需要通过 Host 配置文件来指定。
- （Docker 方式）配置 hosts 时候需要在 sidecar 容器中进行
- （Tar）版本部署，直接配置物理机 host 文件


```
# 比如 笔者机器的配置是如下的
192.168.0.244 kudu001
192.168.0.245 kudu002
192.168.0.246 kudu003

192.168.0.176 cdh6-1
192.168.0.248 cdh6-2
192.168.0.254 cdh6-3
192.168.0.247 cdh6-4
```

## 添加数据源
- 登录 CloudCanal 平台
-  **数据源管理** -> **添加数据源**
- 选择 **自建数据源** ，并填写相关数据库信息，其中 **网络地址** 请按提示带上端口号
  ![3a8f9a9c-b778-4dd5-a509-4032691b37a5-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0022/1.png)
- 这里需要有两点提示
  - kudu-client 默认访问的是 **7051** 端口，并非提供 Web 界面的 **8051**
  - 如果 Kudu 是集群化部署，那么在配置网络地址时需要填写集群 **ip:port** 列表。逗号间隔。

## 同步任务
-  **任务管理管理** -> **创建任务**  
   ![71e902c8-dae2-466f-ba43-4f0fac04314c-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0022/2.png)
- 在创建任务的时候，默认高级选项中会要求至少 3副本。可以根据 Kudu 集群情况来修改对应配置。

-  任务类型环节选择 **数据同步**
   ![fd4e3aec-71fb-4c3e-93e1-4a48e1111f8a-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0022/3.png)
- 在表选择环节可以选择要同步的源端表以及同步的动作
  ![9fbd24b3-e7c6-4a49-8574-ee589fe5f864-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0022/4.png)
- 最后到确认环节创建任务即可。
  ![3d7cd041-9fcc-4305-acc6-b73263e2d60f-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0022/5.png)

- 在结构迁移任务跑完之后，就可以看到 Kudu 控制台上已经把对应的 Kudu 表全部创建完毕
  ![53f2f62b-6b2b-4beb-ad1f-dbe9ae19fbe9-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0022/6.png)

在最后举例使用 Impala 来查询位于 Kudu 中的数据，如下是建表语句：
```
CREATE EXTERNAL TABLE `canal_test_case_column_default` STORED AS KUDU
TBLPROPERTIES(
    'kudu.table_name' = 'my-j52hri3880d6dka.canal_test_case.column_default',
    'kudu.master_addresses' = '192.168.0.254:7051')
```

- 任务在进入增量同步之后尝试对源端就会发现数据已经实时的进入到 Kudu 啦，此时通过 SQL 查询 Impala 上的 Kudu 表就可以看到数据
  ![072225fc-562f-4313-a1f8-3e4caa3b0cd9-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0022/7.png)

## 能力和限制
- 支持 MySQL、PostgreSQL、Oracle 作为源端到 Kudu 的同步
- 支持主键变更同步，转换为 Kudu 删除在插入
- 对端 Kudu 要求 1.6 版本
- 不支持源端 无主键表
- 不支持 DDL 增量同步

# 总结
本文简单介绍了几种将数据同步到 Kudu 的方式，以及基于 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-rdb-kudu-sync) 是如何实现实时同步数据到 Kudu。