---
id: api_datajob_mapping
title: 元数据映射说明
description: 接口描述：本文档主要介绍如何理解源和目标元数据映射关系。
---

## 描述 

CloudCanal 任务配置中，比较难理解的包含两部分内容，一是**描述数据源库表列等元数据的结构**，二是**源和目标元数据映射关系**。

本文档主要介绍如何理解**源和目标元数据映射关系**。

## 举个例子

如下结构一般出现在 DataJob 配置 mappingDef 中，表示源和目标元数据多层映射。一般和 srcSchema 配合计算出对端相应元数据。这个结构有几个特点
- 以json数组表示多个层次的映射
- 当前层次的映射元素从低向上呈现
- 一个层次的映射有优先级，serializeMapping 最优先，serializeAutoGenRules 次之(当前未使用)，commonGenRule 打底

### MySQL->PostgreSQL 库表列映射示例

```json
[
    {
        "method": "DB_SCHEMA",
        "serializeMapping": {
            "{\"value\":\"dingtax\"}": "{\"parent\":{\"value\":\"dingtax_target\"},\"value\":\"public\"}"
        },
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    },
    {
        "serializeMapping": {
            "{\"parent\":{\"value\":\"dingtax\"},\"value\":\"worker_stats\"}": "{\"value\":\"re_worker_stats\",\"parent\":{\"value\":\"public\",\"parent\":{\"value\":\"dingtax_target\"}}}"
        },
        "method": "TABLE_TABLE",
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    },
    {
        "method": "COLUMN_COLUMN",
        "serializeMapping": {
            "{\"parent\":{\"value\":\"worker_stats\",\"parent\":{\"value\":\"dingtax\"}},\"value\":\"worker_id\"}": "{\"value\":\"re_worker_id\",\"parent\":{\"value\":\"re_worker_stats\",\"parent\":{\"value\":\"public\",\"parent\":{\"value\":\"dingtax_target\"}}}}",
            "{\"parent\":{\"value\":\"worker_stats\",\"parent\":{\"value\":\"dingtax\"}},\"value\":\"cpu_stat\"}": "{\"value\":\"re_cpu_stat\",\"parent\":{\"value\":\"re_worker_stats\",\"parent\":{\"value\":\"public\",\"parent\":{\"value\":\"dingtax_target\"}}}}"
        },
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    }
]
```

### MySQL->Kafka 表topic映射示例

```json
[
    {
        "serializeMapping": {
            "{\"parent\":{\"value\":\"dingtax\"},\"value\":\"unsigned_table\"}": "{\"value\":\"my-6716s8rryux1366.dingtax.unsigned_table\"}",
            "{\"parent\":{\"value\":\"dingtax\"},\"value\":\"worker_stats\"}": "{\"value\":\"my-6716s8rryux1366.dingtax.worker_stats\"}"
        },
        "method": "TABLE_TOPIC",
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    },
    {
        "method": "COLUMN_COLUMN",
        "serializeMapping": {},
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    }
]
```

## method 可选择的值

method 参数表明了当前层次映射所计算出的结果值是什么。可选的参数包括

```
    DB_DB,
    SCHEMA_SCHEMA,
    TABLE_TABLE,
    COLUMN_COLUMN,
    // jump level
    DB_SCHEMA,
    SCHEMA_DB,
    // mq
    DB_TOPIC,
    TABLE_TOPIC,
    TOPIC_TABLE,
    TOPIC_INDEX,
    ANY_DB,
    // es
    TABLE_INDEX,
    // cache key prefix
    TABLE_KEYPREFIX
```
    

## serializeMapping KV格式

serializeMapping 信息表示当前层次映射详情，其中 key 或者 value 有哪些信息，可以通过 [数据源元数据映射信息](../constApi/api_constant_dsmappingmeta.md) 接口获取,所获取到的 parents 按顺序构建 

## commonGenRule 可选的值

commonGenRule 为兜底的映射规则，如果 serializeMapping 未指定，serializeAutoGenRules 未设置特殊规则，则使用 commonGenRule 计算。

**无特殊情况，一般设置 MIRROR 规则即可，即和源端保持一致**

```
    MIRROR

    TO_LOWER_CASE

    TO_UPPER_CASE

    /**
     * instance_id,db_name -> instance_id.db_name
     */
    SOURCE_INS_DB_BY_DOT

    /**
     * instance_id,db_name,table -> instance_id.db_name.table
     */
    SOURCE_INS_DB_TABLE_BY_DOT

    /**
     * instance_id,db_name,schema_name,table -> instance_id.db_name.schema_name.table
     */
    SOURCE_INS_DB_SCHEMA_TABLE_BY_DOT

    /**
     * instance_id,db_name -> instance_id%db_name
     */
    SOURCE_INS_DB_BY_PERCENT

    /**
     * instance_id,db_name,table -> instance_id%db_name%table
     */
    SOURCE_INS_DB_TABLE_BY_PERCENT

    /**
     * instance_id,db_name,schema_name,table -> instance_id%db_name%schema_name%table
     */
    SOURCE_INS_DB_SCHEMA_TABLE_BY_PERCENT

    /**
     * instance_id.db_name.schema_name.table -> table
     */
    SOURCE_LAST_ITEM_BY_DOT

    /**
     * instance_id%db_name%schema_name%table -> table
     */
    SOURCE_LAST_ITEM_BY_PERCENT

    NUMBER_SUFFIX_REG_EXPRESSION

    DEFAULT_TOPIC

    /**
     * db_name,table -> db_name:table
     */
    SOURCE_DB_TABLE_BY_COLON

    /**
     * db_name,schema_name,table -> db_name:schema_name:table
     */
    SOURCE_DB_SCHEMA_TABLE_BY_COLON

    /**
     * aa_bb_cc -> aaBbCc
     */
    TO_CAMEL_FORMAT
```
