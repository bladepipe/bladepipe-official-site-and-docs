---
id: api_datajob_mapping
title: DataJob Mapping
description: This document describes how to understand source and target metadata mappings.
---

## Interface Overview

In the BladePipe DataJob configuration, it is difficult to understand two parts: one is to **describe the structure of metadata such as data source database tables**, and the other is the **mapping relationship between source and target metadata**.

This document describes how to understand **source and target metadata mappings**

## For Example

The following structure generally appears in the DataJob configuration mappingDef, representing a multi-layer mapping between source and target metadata. The metadata of the peer end is calculated in conjunction with srcSchema. This structure has several features:
- A json array represents multiple levels of mapping
- The mapping elements of the current level are presented from the bottom up
- serializeMapping takes precedence, followed by serializeAutoGenRules (currently unused), and commonGenRule takes precedence

### MySQL->PostgreSQL Library table column mapping example

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

### MySQL->Kafka Table topic mapping example

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

## Method A value that can be selected

The method parameter indicates what the resulting value of the current hierarchy map is. Optional parameters include

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
    

## SerializeMapping KV Format

serializeMapping indicates details about the current hierarchical mapping. You can view the information about key or value in the information by running the [Data Source Metadata Mapping Information](../constApi/api_constant_dsmappingmeta.md) interface. The obtained parents are constructed in sequence

## CommonGenRule Optional Value

CommonGenRule is the mapping rule at the bottom. If serializeMapping is not specified and serializeAutoGenRules is not set, use commonGenRule for calculation.

**In no special cases, set the MIRROR rule to be consistent with the source end**

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
