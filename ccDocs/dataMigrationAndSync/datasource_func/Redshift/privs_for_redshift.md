---
id: privs_for_redshift
title: AWS Redshift 需要的权限
description: CloudCanal 在做 AWS Redshift 源端或对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 AWS Redshift 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

如果添加数据源时使用的 AWS Redshift 账号已经具有高权限，可忽略以下具体权限申请。

## 权限概览

| 使用场景 | 需要的权限范围 | 说明 |
| --- | --- | --- |
| 添加数据源/连接测试 | 可连接默认数据库并执行基础查询 | CloudCanal 会执行连接测试、版本查询、字符集查询等操作 |
| 源端全量迁移/增量同步 | Schema **USAGE**，表 **SELECT** | 用于读取业务表数据 |
| 目标端结构迁移 | Schema **USAGE**、**CREATE**，按需 **ALTER**、**DROP** | 用于创建表、主键、唯一键、表/列注释等结构 |
| 目标端全量写入/增量写入 | 数据库 **TEMP**，目标表 **SELECT**、**INSERT**、**UPDATE**、**DELETE** | 用于写入、更新和删除目标表数据 |
| 目标端清空表 | 目标表 **TRUNCATE** | 仅在任务配置了清空目标表等动作时需要 |

## 账号创建

```sql
-- 以下为示例，请替换 <> 中的内容
CREATE USER <your_account> WITH PASSWORD '<your_password>';
```

## 作为源端

### 全量迁移/增量同步权限

- 迁移库表所在 Schema 的 **USAGE** 权限。
- 迁移库表的 **SELECT** 权限。

```sql
-- 以下为示例，请替换 <> 中的内容
GRANT USAGE ON SCHEMA <source_schema> TO <your_account>;
GRANT SELECT ON ALL TABLES IN SCHEMA <source_schema> TO <your_account>;
```

如只授权部分表，可改为表级授权。

```sql
GRANT USAGE ON SCHEMA <source_schema> TO <your_account>;
GRANT SELECT ON TABLE <source_schema>.<source_table> TO <your_account>;
```

:::info
`GRANT ... ON ALL TABLES IN SCHEMA` 只覆盖当前已存在的表和视图。如源端后续新增表也需要被读取，请参考本文“后续新增表授权”。
:::

## 作为对端

### 结构迁移权限

- 目标 Schema 的 **USAGE** 权限。
- 需要自动创建目标表时，目标 Schema 的 **CREATE** 权限。
- 如结构迁移需要修改或删除已存在对象，需要对应对象的 **ALTER**、**DROP** 权限。

```sql
-- 以下为示例，请替换 <> 中的内容
GRANT USAGE ON SCHEMA <target_schema> TO <your_account>;
GRANT CREATE ON SCHEMA <target_schema> TO <your_account>;
```

如果任务需要由 CloudCanal 自动创建 Schema，还需要授予目标数据库的 **CREATE** 权限。

```sql
GRANT CREATE ON DATABASE <target_database> TO <your_account>;
```

### 全量写入权限

- 目标数据库的 **TEMP** 权限。
- 目标表的 **SELECT**、**INSERT**、**UPDATE** 权限。
- 如全量阶段需要覆盖目标已有数据，建议同时授予目标表 **DELETE** 权限。

```sql
-- 以下为示例，请替换 <> 中的内容
GRANT TEMP ON DATABASE <target_database> TO <your_account>;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA <target_schema>
TO <your_account>;
```

### 增量写入权限

- 目标数据库的 **TEMP** 权限。
- 目标表的 **SELECT**、**INSERT**、**UPDATE**、**DELETE** 权限。

```sql
-- 以下为示例，请替换 <> 中的内容
GRANT TEMP ON DATABASE <target_database> TO <your_account>;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA <target_schema>
TO <your_account>;
```

如只授权部分表，可改为表级授权。

```sql
GRANT USAGE ON SCHEMA <target_schema> TO <your_account>;
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE <target_schema>.<target_table>
TO <your_account>;

-- 如需要清空对端表
GRANT TRUNCATE ON TABLE <target_schema>.<target_table> TO <your_account>;
```

### 清空目标表权限

如任务包含清空目标表动作，需要授予目标表 **TRUNCATE** 权限。

```sql
GRANT TRUNCATE
ON ALL TABLES IN SCHEMA <target_schema>
TO <your_account>;
```

## 示例权限脚本

以下示例适用于同一个账号既用于读取源端 Redshift，又用于写入目标端 Redshift 的场景。实际使用时可按源端或目标端拆分账号。

```sql
-- 以下为示例，请替换 <> 中的内容
CREATE USER <your_account> WITH PASSWORD '<your_password>';

-- 源端读取
GRANT USAGE ON SCHEMA <source_schema> TO <your_account>;
GRANT SELECT ON ALL TABLES IN SCHEMA <source_schema> TO <your_account>;

-- 目标端结构迁移和写入
GRANT CREATE ON DATABASE <target_database> TO <your_account>;
GRANT USAGE, CREATE ON SCHEMA <target_schema> TO <your_account>;
GRANT TEMP ON DATABASE <target_database> TO <your_account>;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA <target_schema>
TO <your_account>;

-- 如需要清空目标表
GRANT TRUNCATE
ON ALL TABLES IN SCHEMA <target_schema>
TO <your_account>;
```

### 后续新增表授权

`GRANT ... ON ALL TABLES IN SCHEMA` 只覆盖当前已存在的表和视图。如业务后续会新增表，建议由对象 Owner 或高权限用户设置默认权限。

```sql
-- 源端后续新增表读取权限
ALTER DEFAULT PRIVILEGES IN SCHEMA <source_schema>
GRANT SELECT ON TABLES TO <your_account>;

-- 对端后续新增表写入权限
ALTER DEFAULT PRIVILEGES IN SCHEMA <target_schema>
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO <your_account>;
```

## 注意事项

- Redshift 目标端增量写入依赖主键或可用于匹配的唯一字段，否则 `MERGE` 无法可靠定位目标行。
- Redshift 作为目标端时，当前不支持自动应用源端增量 DDL。如需要结构变更，请通过结构迁移、手工变更或重新配置任务处理。
