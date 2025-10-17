---
id: api_datajob_schema
title: DataJob MetaData
description: This document describes how to understand the structure of metadata such as data source database tables
---

## Interface Overview 

In the BladePipe DataJob configuration, it is difficult to understand two parts: one is to **describe the structure of metadata such as data source database tables**, and the other is the **mapping relationship between source and target metadata**.

This document describes how to understand the **structure of metadata such as data source database tables**.

## For Example

The following structure generally appears in the DataJob configuration srcSchema or dstSchema, representing information such as a data source database table. This structure has several features:
- Structure content nesting represents the hierarchy of data source metadata
- Different data source types have different hierarchies
- There are some elements that differ between data source types
- The information described by each layer contains the common targetAutoCreate and inBlackList attributes, the former indicating whether the peer structure is automatically created and the latter indicating whether it is in the blacklist

```json
[
    {
        "db": "dingtax",
        "dbPattern": "",
        "tables": [
            {
                "table": "access_table_111112222222333333333333344444444444444",
                "tablePattern": "",
                "columns": [
                    {
                        "column": "id",
                        "targetAutoCreate": true,
                        "inBlackList": false
                    },
                    {
                        "column": "guid",
                        "targetAutoCreate": true,
                        "inBlackList": false
                    }
                ],
                "actions": [
                    "INSERT",
                    "UPDATE",
                    "DELETE"
                ],
                "inBlackList": false,
                "targetAutoCreate": true,
                "specifiedPks": []
            },
            {
                "table": "kbs_no_pk_have_uniq",
                "tablePattern": "",
                "columns": [
                    {
                        "column": "name",
                        "targetAutoCreate": false,
                        "inBlackList": false
                    },
                    {
                        "column": "uniq_id",
                        "targetAutoCreate": false,
                        "inBlackList": false
                    }
                ],
                "actions": [
                    "INSERT"
                ],
                "inBlackList": false,
                "targetAutoCreate": false,
                "specifiedPks": [
                    "uniq_id"
                ]
            }
        ],
        "targetAutoCreate": false,
        "inBlackList": false
    }
]
```

## Common data source hierarchies and special attributes

| Datasource Name         | First level    | Second level  |  Third level      |Fourth level     |
| ------------ | -------------------------------- |-----------|----|----|
| MySQL | Database <br/><br/> db (Database name) <br/> dbPattern (Expression to match database names, not used) <br/> tables (List of table information, see second level description) | Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> specifiedPks (List of specified primary keys) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/> columns (List of columns, see third level description) | Column <br/><br/> column (Column name) | None |
| PolarDbMySQL | Database <br/><br/> db (Database name) <br/> dbPattern (Expression to match database names, not used) <br/> tables (List of table information, see second level description) | Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> specifiedPks (List of specified primary keys) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/> columns (List of columns, see third level description) | Column <br/><br/> column (Column name) | None |
| PostgreSQL | Database <br/><br/> db (Database name)<br/> schemas (List of pg schemas, see second level description) | Schema <br/><br/> schema (Schema name) <br/> schemaPattern (Expression to match schema names, not used) <br/> tables (List of table information, see third level description) | Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/> columns (List of columns, see fourth level description) | Column <br/><br/> column (Column name) |
| Greenplum | Database <br/><br/> db (Database name) <br/> schemas (List of pg schemas, see second level description) | Schema <br/><br/> schema (Schema name) <br/> schemaPattern (Expression to match schema names, not used) <br/> tables (List of table information, see third level description) | Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/> columns (List of columns, see fourth level description) | Column <br/><br/> column (Column name) |
| Oracle | Database <br/><br/> db (Database name) <br/> tableSpaces (List of oracle schemas, see second level description) | Schema <br/><br/> tableSpace (Schema name) <br/> tableSpacePattern (Expression to match schema names, not used) <br/> tables (List of table information, see third level description) | Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/>columns (List of columns, see fourth level description) | Column <br/><br/> column (Column name) |
| SQLServer | Not available | Not available | Not available | Not available |
| Redis | Namespace for cache key <br/><br/> prefix (Prefix for cache key namespace) <br/> suffixFields (List of properties for cache key namespace)| None |None|None| 
| ElasticSearch | Index <br/><br/> indexName (Name of the index) <br/> idFieldNames (List of property names to construct the primary key of ES) <br/> numberOfShards (Number of shards, type int) <br/> numberOfReplicas (Number of replicas, type int) <br/> globalTimeZone (Timezone string) <br/> fields (List of column information, see second level description) | Field <br/><br/> fieldName (Field name) <br/> fieldTypeName (Type of field in ES) <br/> needIndex (Whether the field needs to be indexed, type boolean) <br/> timeFormat (Time format) <br/> esAnalyzerType (Analyzer type, see esAnalyzerType description below) <br/> needAutoCreated (Whether the field should be automatically created, type boolean) | |
| AdbForMySQL | Database <br/><br/> db (Database name) <br/> dbPattern (Expression to match database names, not used) <br/> tables (List of table information, see second level description)| Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/> columns (List of columns, see third level description)| Column <br/><br/> column (Column name) |None|
| TiDB | Database <br/><br/> db (Database name) <br/> dbPattern (Expression to match database names, not used) <br/> tables (List of table information, see second level description)| Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/> columns (List of columns, see third level description)| Column <br/><br/> column (Column name) |None|    
| ClickHouse | Database <br/><br/> db (Database name) <br/> dbPattern (Expression to match database names, not used) <br/> tables (List of table information, see second level description)| Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/> columns (List of columns, see third level description)| Column <br/><br/> column (Column name) |None|
| Kudu | Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> dataFilter (JSON structure, see dataFilter structure description below) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) <br/> partitions (List of partitions, see second level description) <br/> columns (List of columns, see second level description)| Partition <br/><br/> columns (Columns of the partition) <br/> partitionType (Partition type, possible values are Range and Hash) <br/> Column <br/><br/> column (Column name) |None| None| None |
| MongoDB | Database <br/><br/> db (Database name) <br/> collections (List of collections, see second level description)| Collection <br/><br/> collection (Collection name) <br/> actions (List of actions, currently including INSERT, UPDATE, and DELETE) | None|None|
| Kafka |Topic <br/><br/> topic (Topic name) <br/> topicPattern (Expression to match topic names, not used) <br/> partitions (Number of partitions, type integer) <br/> partitionKeys (List of partition keys)|None|None|None|     
| RocketMQ | Topic <br/><br/> topic (Topic name) <br/> topicPattern (Expression to match topic names, not used) <br/> partitions (Number of partitions, type integer) <br/> partitionKeys (List of partition keys)|None|None|None|
| RabbitMQ | Queue <br/><br/> queue (Queue name) <br/> queuePattern (Expression to match queue names, not used)|None|None|None|
| Hive | Database <br/><br/> db (Database name) <br/> dbPattern (Expression to match database names, not used) <br/> tables (List of table information, see second level description)| Table <br/><br/> table (Table name) <br/> tablePattern (Expression to match table names, not used) <br/> partitionKeys (List of partition keys, see partitionKeys structure description below) <br/> columns (List of columns, see third level description)| Column <br/><br/> column (Column name) |None| 


### Data Filter structure description

| Property Name | Property Description |
| ------------ | -------------------------------- |
| Type | Data filter type <br/><br/> SQL_WHERE <br/>JAVA_CODE (not implemented) <br/>REGULAR_EXPRESSION (not implemented) <br/>AVIATOR_EXPRESSION (not implemented)|
| Expression | Data filter expression corresponding to the type |

### Partition Keys Structure description

| Property Name | Property Description |
| ------------ | -------------------------------- |
| Key Name | Name of the partition key |
| OriginCol | Data source column |
| PartitionFunction | Partition method <br/><br/>EQUAL <br/>YEAR_FORMAT <br/>MONTH_FORMAT <br/>DAY_FORMAT <br/>HOUR_FORMAT <br/>MINUTE_FORMAT|

### EsAnalyzer Type Description

User-defined classifier. In ElasticSearch, the word splitter needs to be named to the corresponding lowercase string, i.e. 'custom_a', 'custom_b', 'custom_c', 'custom_d', 'custom_e',(later modified to be more elegant).
```
STANDARD
SIMPLE
WHITESPACE
STOP
KEYWORD
PATTERN
ENGLISH
FINGERPRINT

ALIWS

QQ_SMART
QQ_MAX
QQ_SMART_NER
QQ_MAX_NER

IK_SMART
IK_MAX_WORD
SMARTCN

CUSTOM_A
CUSTOM_B
CUSTOM_C
CUSTOM_D
CUSTOM_E
```
