---
id: postgresql_ddl_sync_pitfalls
description: 分享异构数据库 DDL 同步中遇到的几类问题，包括对象定位、列属性补全、索引和表达式转换，以及函数、触发器的同步范围，并介绍对应处理方式。
title: 最基础的异构数据库 DDL 同步，我们踩过哪些坑？
date: 2026-11-13
authors: junyu
tags:
  - tech_share
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/tech_share/postgresql_ddl_sync_pitfalls.webp
slug: /data_insight/postgresql_ddl_sync_pitfalls
---

# 最基础的异构数据库 DDL 同步，我们踩过哪些坑？

最近，我们围绕 CloudCanal 的数据库 DDL 同步能力做了一轮完善，从解析、结构提取到目标端执行，并通过 PG → MySQL 链路做了验证。

我们测试了加列、修改默认值、列注释、主键、索引、生成列，以及事务中的多条 DDL。

**一条 DDL 能被正确解析，只是同步成功的第一步。** 下面说说我们在过程中遇到的几个坑。

## 1. 增量 DDL 无法定位索引和约束

跨数据库同步时，不只表名和列名要对应，索引和约束的名字也要处理。

以索引为例，PostgreSQL 要求索引名在 schema 内唯一，MySQL 则只要求在表内唯一。两张表上的索引都叫 `idx_code`，迁移到 MySQL 时可以保留原名；反向迁移到 PostgreSQL 时，就可能要改名。

迁移时，索引名可能会这样对应：

```text
源端索引：idx_code
目标索引：orders_idx_code
```

最初建表没问题。等源端删除或修改这个索引时，才会发现源端 SQL 里的名字不能直接用来操作目标端。

约束也有类似问题，不过不同约束的命名规则不完全一样。比如，PostgreSQL 的普通约束名主要在所属表内区分，主键和唯一约束还会受到关联索引的命名限制。

### 删除索引或约束时，还要找到对应对象

我们测试过这样一条 SQL：

```sql
DROP INDEX cc_ddl_pg17.ddl_indexes_code_idx;
```

这条语句给出了 schema 和索引名，却没有表名。

同步到 MySQL 时，需要知道索引属于哪张表。如果采集记录里没保存这层关系，而源端索引又已经删除，之后再查元数据就可能查不到。

约束删除也一样：

```sql
ALTER TABLE orders DROP CONSTRAINT orders_code_key;
```

只看约束名，无法确定它是主键、唯一约束、外键还是 CHECK 约束，也不能靠名称后缀来猜。

处理增量 DDL 时，我们还得知道对象属于哪张表、在目标端叫什么。找不到对应对象时，我们会过滤这条操作，避免生成可能删错对象的 SQL。

![PostgreSQL 索引名称映射到 MySQL 后，后续删除事件因对象映射信息不足而无法定位。](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/postgresql_ddl_sync_pitfalls/1-object-mapping.webp)

## 2. 修改列属性时，目标端需要完整列定义

下面这条 PostgreSQL 语句很简单：

```sql
COMMENT ON COLUMN orders.note IS '订单备注';
```

它只改 `note` 列的注释。

源端不需要再说明这列的类型、是否允许 NULL、默认值是什么。

但在 MySQL 中，修改列注释通常要用 `MODIFY COLUMN` 重写列定义。假设目标列原本是：

```sql
note varchar(80) NOT NULL DEFAULT 'base'
```

那么修改注释时，这些属性也要保留下来：

```sql
ALTER TABLE orders
MODIFY COLUMN note varchar(80)
NOT NULL DEFAULT 'base'
COMMENT '订单备注';
```

MySQL 的 `MODIFY`、`CHANGE` 不会自动保留所有未写出的原有列属性。缺少默认值、可空性等描述，可能在修改注释的同时改变其他属性。

换句话说，源端 SQL 只写要改什么，目标端 SQL 还要写出修改后的完整列定义。

![PostgreSQL 的 COMMENT 只提供注释内容，而 MySQL 修改列注释时还需要完整列定义。](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/postgresql_ddl_sync_pitfalls/2-column-information.webp)

类似情况还会出现在：

```sql
ALTER TABLE orders ALTER COLUMN code TYPE varchar(100);

ALTER TABLE orders ALTER COLUMN code SET NOT NULL;
```

### 直接查元数据为什么还不够？

可以查元数据来补，但得先确定查的是哪一端、哪个时刻的结构。

同步程序处理这条 DDL 时，源端可能已经执行了下一次变更；源端类型也可能经过映射，和目标端类型不同。如果直接把最新的源端列定义用到目标端，可能会提前带入还没处理的变更，或者覆盖目标端已有属性。

所以要补全列定义，得先确认查到的结构对应哪个时刻，再按顺序处理变更。只加一次元数据查询还不够。

这次 PG → MySQL 同步中，对于还不能准确补全的类型、可空性和列注释修改，我们选择跳过，并保留原因。

默认值操作不同：设置和删除默认值都有对应的局部修改语句，可以单独支持。所以不能把所有 `ALTER COLUMN` 都当成同一种操作。

## 3. GIN 索引和表达式不能直接照搬

我们测试过这样一条索引语句：

```sql
CREATE INDEX metadata_gin
ON orders USING gin(metadata);
```

源端的 `metadata` 是 JSONB，索引使用 GIN。

如果转换时只保留索引名和列名，目标 SQL 可能会变成：

```sql
CREATE INDEX metadata_gin ON orders(metadata);
```

GIN 索引用来索引复合值里的各个组成部分；MySQL 的 JSON 索引则要根据具体路径和表达式来设计。光看这条 DDL，同步工具不知道业务要查哪些路径、路径值要映射成什么类型，也不知道要建几个索引。

因此，不能只删掉 `USING gin`、改成普通索引。目前这类操作我们会在转换时过滤。

### 表达式可能改变数据或索引结果

例如：

```sql
ALTER TABLE orders
ALTER COLUMN amount TYPE bigint
USING amount::bigint + 100;
```

它不仅修改类型，还要求重新计算已有数据。

如果目标端只修改列类型，却没有为旧数据加上 100，那么即使 SQL 执行成功，两端的数据也已经不一致。

![PostgreSQL 使用 USING 将示例值从 50 计算为 150，MySQL 只改类型后仍是 50。](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/postgresql_ddl_sync_pitfalls/3-semantic-mismatch.webp)

索引表达式也需要逐项判断：

```sql
CREATE INDEX orders_lower_idx
ON orders ((lower(note)));
```

有些目标数据库支持表达式索引，但还得看具体版本、函数语义和类型规则，也要确认同步程序能不能完整表示这些信息。当前处理不了的复杂表达式，不能直接改成普通列索引。

这里要区分两种情况：

- **目标数据库没有直接对应的功能**：需要另行设计目标端的做法。
- **目标数据库有相关能力，但同步程序还没支持**：需要明确实现边界。

这两种情况下，SQL 能执行都不代表转换正确。

## 4. 解析器能识别的 DDL 不一定会被同步

完善解析器时，我们补充了很多 PostgreSQL 语法，包括函数、过程、触发器等。

但解析器能识别的语法，不一定会被产品采集和同步。

例如：

```sql
CREATE FUNCTION ...;

CREATE TRIGGER ...;
```

在当前这套以订阅表结构变更为主的同步方案中，FUNCTION、TRIGGER 等对象的创建和修改不在同步范围内。

![FUNCTION 和 TRIGGER 可以被解析，但不纳入当前同步范围，在边界处停止。](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/postgresql_ddl_sync_pitfalls/4-sync-scope.webp)

PostgreSQL 提供事件触发器来捕获相关 DDL。是否采集并同步这些对象，则由同步产品的范围决定。

迁移这类对象时，还要处理它们依赖的其他对象、执行语言和业务逻辑，不是替换几个关键字就够了。

尤其要注意业务触发器：源端执行触发器后产生的数据变化如果又同步到目标端，而目标端也执行了相同逻辑，业务逻辑就可能重复执行并产生副作用。目标端要不要保留触发器，得看整套数据同步方案。

排查时还要分清问题出在哪一步：

- 没有采集到；
- 采集后按范围过滤；
- 解析或转换失败；
- 已生成 SQL，但目标执行失败。

这些情况都可能导致目标端没有变化，但排查环节各不相同。

## 总结

这四个问题单看都不复杂，但处理不当，目标端的结果就可能和预期不一样。回头看，跨库 DDL 同步不只是改写 SQL，还要确认目标端要改哪个对象、生成语句需要哪些信息、改完后效果是否符合预期，以及这类操作是否在同步范围内。

写下这些问题，一方面是复盘这次工作，另一方面也希望给正在做跨库同步的团队一些参考，欢迎交流。
