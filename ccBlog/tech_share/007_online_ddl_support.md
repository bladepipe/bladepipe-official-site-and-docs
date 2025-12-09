---
id: online_ddl_support
description: CloudCanal支持 Online DDL 同步工具 GH-OST 和 PT-OSC 
title: 支持 GH-OST 和 PT-OSC 
date: 2022-12-23
authors: junyu
tags:
  - tech_share
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/tech_share/online_ddl_support.png
slug: /data_insights/online_ddl_support
---

## 简介

[CloudCanal](https://www.clougence.com?src=cc-doc-blog-cloudcanal-online-ddl) 实现了对 Online DDL 工具如 GH-OST 和 PT-OSC 的支持，保证了对端实时同步源端的 Online DDL 操作。

本文以 MySQL -> MySQL 同步链路使用 GH-OST 为例，介绍 CloudCanal 是如何支持实时同步 GH-OST 产生的 DDL 的。

## Online DDL 技术背景

市面上常用的两款MySQL Online DDL 工具分别是 GH-OST 和 PT-OSC，CloudCanal 对他们都做了兼容处理使得用户可以实时同步 Online DDL 工具产生的 DDL 。下面简单介绍下他们的工作流程，以便于读者理解后续章节的内容。

### Online DDL 工具 PT-OSC 原理

PT-OSC 是较为常用的 Online DDL 工具，通过触发器来同步增量数据，相较于 MySQL 原生的 Online DDL 性能得到了极大的提高，原理如下：

- 对源表进行检查
- 创建一个与源表（origin）结构一致的空表，命名为 _origin_new
- 根据alter参数修改新表的表结构
- 在源表中创建三个触发器：Delete / Update / Insert，将源表中的增删改语句同步执行到新表中，同时将源表中的数据以数据块的形式 copy 到新表
- 将源表（origin）rename为 _origin_old，将 _origin_new rename 为 origin，然后删除旧表（可选）
- 删除触发器

**总结**：PT-OSC 是通过创建临时表，并用触发器将增量数据同步到新表，通过当前读和事务来实现增量与全量的有序，不会阻塞读写操作，但**运行过程中出现异常，无法从上一个位置继续进行，需要从头开始。**

### Online DDL 工具 GH-OST 原理
GH-OST 也是一款常用的 Online DDL 工具，采用读取 binlog 日志的方式来同步增量数据，原理如下：

- 对源表（origin）进行检查
- 在主/从节点中添加binlog日志监听
- 创建日志记录表（_origin_ghc）和与源表结构一致的影子表（_origin_gho）
- 根据alter参数修改影子表的表结构
- 全量拷贝源表数据同时拷贝源表增量数据到影子表中，并记录日志到日志记录表中
- 删除日志记录表，将源表改名为 _origin_del, 将影子表改名为 origin，_origin_del 可选删除

**总结：** GH-OST 的性能与 PT-OSC 相近，相较于PT-OSC 的优点就在于其是不使用触发器的，只异步读取二进制日志，因此修改表定义的负载和正常的业务负载解耦开了，它不需要考虑被修改的表上的并发操作和竞争等，并且相较于 PT-OSC 的中断从头开始，GH-OST 可以从心跳日志中恢复到指定位置。

## CloudCanal 技术点
前文中对 Online DDL 工具的原理中我们知道，无论采用哪种 Online DDL 工具，源端都会产生一些临时表的创建和数据写入，如果不做任何兼容处理，这会影响正常的迁移同步链路。

因此为了支持 GH-OST 和 PT-OSC 工具的使用，CloudCanal 在 MySQL 源端做了大量优化，完美的适配并优化了 GH-OST 和 PT-OSC 的 Online DDL 能力

### 同步临时表数据
GH-OST 和 PT-OSC 工具都有一个共同的特点，其原理都是采用临时表的方式来保证 DDL 与 DML 的并发操作。

CloudCanal 默认的表订阅模式是只订阅原表，不订阅与原表相关的临时表（订阅表即同步该表的 DDL 与 DML 语句），而 CloudCanal 为了满足对 Online DDL 工具的支持，在源数据端配置上新增了 extraDDL 参数来实现对临时表的订阅。

- **extraDDL参数**：
    - 可选参数：NONE / GHOST / PT
    - 作用：选择 NONE 则不订阅任何临时表，选择 GHOST / PT 则订阅相应的默认临时表

CloudCanal 针对临时表订阅采用的是两种模式：**自动订阅临时表模式和自动同步元数据模式**

- **自动订阅临时表**：CloudCanal 会自动根据 extraDDL 参数将默认的临时表加入到订阅表集合中，随后读取binlog日志时将不会过滤掉临时表的所有变更事件，保证了对端数据源表结构与数据的最终一致性
- **自动同步元数据**：CloudCanal 会自动过滤临时表，在读取binlog日志时不会执行 Online DDL 的操作，在 Online DDL 执行完毕后发送最新的表结构，期间的 DML 语句也会同步发送到对端，保证对端数据源表结构与数据的最终一致性

由于各数据源对同步数据的消费并不相同，如消息队列只需要解析 Online DDL 后的表结构即可，无需订阅临时表，因此我们需要根据对端数据源的消费模式做出不同的处理。

  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0002/1.png)

### DDL 解析与转换
不同数据源的 DDL 语句会有所差异，CloudCanal 对不同数据源 DDL 语句的解析和转换做了大量的优化。

1. 解析：将 DDL 语句解析为操作类型，如 CREATE ，DROP，ALTER 等
2. 拆分过滤：若 DDL 语句不为单条操作，则拆分为多条 DDL 语句，根据订阅表集合和binlog位点记录过滤重复执行的 DDL 语句与去除无需同步的语句后，重新合成新的 DDL 语句
3. 转换：将过滤好的 DDL 语句转换为对端数据源的方言

下图演示了CloudCanal对DDL语句的一些处理:

  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0002/2.png)

### 容错机制
当 CloudCanal 在同步 Online DDL 时，任务有可能在两个层面上被中断：Online DDL 工具层面和 CloudCanal任务层面

- **Online DDL 工具中断**：由于 PT-OSC 和 GH-OST 的原理不同，Online DDL 过程中断的恢复方案也有所不同
    - PT-OSC：Online DDL 过程中出现异常中断，重新执行 Online DDL 操作会丢弃之前的所有操作，从头开始再次执行
    - GH-OST：Online DDL 过程中出现异常中断，重新执行 Online DDL 操作会读取ghc日志心跳表，从日志中的未完成位点开始继续执行。在此过程中，CloudCanal只需读取binlog日志，照常执行 Online DDL 的所有操作即可保证数据的最终一致性

- **CloudCanal任务中断**：由于 CloudCanal 良好的异步消费特性，CloudCanal的任务中断与 Online DDL 的执行并不相关。当 CloudCanal 任务中断后，重启任务会根据位点记录继续执行binlog日志中的事件，保证了数据的最终一致性。

## 使用示例

### 前置条件

- 安装  [GH-OST](https://github.com/github/gh-ost/releases)
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-cloudcanal-online-ddl),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)
- 准备一个 MySQL 数据库，对端数据库（以 **MySQL -> MySQL** 为例）

```sql
CREATE TABLE `ghost_test`.`abc` (
  `id` int NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `cdata` datetime DEFAULT NULL,
  `udata` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
```

- 登录 CloudCanal 平台 ，添加源端与目标端数据源

### 任务创建

- **任务管理** -> **任务创建。**
- **测试连接**并选择 **源** 和 **目标** 数据库。
- 选择增量同步任务和需要订阅的表与字段，并创建任务
- 增量任务中，功能列表 -> 参数修改 -> 源数据源配置 -> 参数 **extraDDL** 设置为 **GHOST**
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0002/3.png)

创建并且启动任务，当任务正常执行到增量阶段时，此时我们可以利用数据生成工具和Online DDL工具对源端数据库触发一些增量DML变更和DDL变更，然后查看CloudCanal是否能正常实时同步这些DML和DDL事件。

### 使用 Online DDL 工具修改表结构

- 首先使用数据生成工具实时随机生成数据，增删改比例为（4：4：3）
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0002/4.png)

- 在大量写入数据的同时，使用 GH-OST 工具执行 DDL 语句：**ALTER TABLE ADD COLUMN aaa VARCHAR(30) NOT NULL AFTER id**。在我们的测试例子中，有 DML 语句的同时使用 GH-OST 执行 DDL 语句，源端总计写入14147 条数据和1条DDL。

```bash
[root@zjx local] ./gh-ost --debug --user="｛数据库用户名｝" --password="｛数据库密码｝" --host="｛数据库主机IP｝" --port="｛数据库端口号｝" --database="ghost_test" --table="abc" --initially-drop-ghost-table --initially-drop-old-table --allow-on-master --alter="ADD COLUMN aaa varchar(30) NOT NULL AFTER id" --execute
```

### 确认同步结果
CloudCanal会自动完成源端实时DML和DDL事件的同步，在执行完源端事件写入之后，我们确认下同步结果。

- 更改后的源对端 **表结构一致**
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0002/5.png)
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0002/6.png)

- 源对端进行数据校验 **数据一致**
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0002/7.png)

**总结**：由上可知，在 CloudCanal 中使用 GH-OST 工具执行 Online DDL 指令，源表完成表结构修改后，CloudCanal 将源表的表结构成功同步到了目标端数据表中。

## 常见问题
### CloudCanal 支持的同步链路
目前 CloudCanal 支持使用 Online DDL 工具的链路为：

- **MySQL -> MySQL**
- **MySQL -> PostgreSQL**
- **MySQL -> Greenplum**
- **MySQL -> Kafka**
- **MySQL -> RocketMQ**
- **MySQL -> RabbitMQ**

### 不支持同步的 DDL 语句

使用 Online DDL 工具执行的 DDL 语句中**不支持 RENAME 原表与临时表的操作**，如上述用例中，ALTER 语句若改为 RENAME TABLE ghost_test.abc TO ghost_test.ccc，那么 Online DDL 工具后续的 RENAME TABLE ghost_test.abc TO ghost_test._abc_del, ghost_test._abc_gho TO ghost_test.abc 操作就会失败，致使 Online DDL 操作失败。

## 总结
本文主要介绍了 Online DDL 工具的使用并展示了 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-cloudcanal-online-ddl) 对 Online DDL 工具的实时同步能力，得益于 GH-OST、PT-OSC 优秀的表结构修改性能和 CloudCanal 强大的同步能力，基本能满足企业在日常执行 DDL 的业务中，数据表的 DML 执行和数据同步性能要求