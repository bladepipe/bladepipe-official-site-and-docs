---
id: kafka_msg_format_type
title: MQ 消息同步格式说明
---

CloudCanal 支持选择同步到 MQ 的消息存储格式，本文介绍 MQ 多种消息格式的定义说明，方便下游消费和使用。

## 消息格式介绍
### 支持的消息同步格式
- **CloudCanal Json**：CloudCanal 默认的消息格式，解析数据库增量日志传输至 Kafka，支持批量消息传输。
- **Canal Json**：对于 Canal 的兼容格式，数据存储格式为 Canal Json。
- **Aliyun DTS Avro**：一种数据序列化格式，可以将数据结构或对象转化成便于存储或传输的格式。
- **Debezium Envelope**：Debezium 官方的 CDC 消息格式，携带 SCHEMA 信息，对大数据下游消费友好。

### 目标端 MQ 支持情况
| 消息格式            | Kafka | RocketMQ | RabbitMQ |
|-----------------|-------|----------|----------|
| CloudCanal Json | 支持    | 支持       | 支持       |
| Canal Json      |  支持     | 支持       | 支持       |
| Aliyun DTS Avro |  支持     | -        | -        |
| Debezium Envelope |   支持    | -        | -        |

### 源端 MQ 支持情况
| 消息格式            | Kafka | RocketMQ | RabbitMQ |
|-----------------|-------|----------|----------|
| CloudCanal Json | 支持    | 支持       | 支持       |
| Canal Json      |  支持   | 支持       | 支持       |
| Aliyun DTS Avro |  -    | -        | -        |
| Debezium Envelope |  支持   | -        | -        |

## 消息格式具体说明
### CloudCanal Json
参数说明：

| 参数 | 类型 | 说明                                 |
| --- | --- |------------------------------------|
| **action** | String | 操作的类型，如：INSERT / UPDATE / DELETE。  |
| **bid** | Long | BatchEventBuffer 的 Batch Id。       |
| **before** | List | 变更前的数据。                            |
| **data** | List | 当前操作的数据。                           |
| **db** | String | 数据库名称。                             |
| **schema** | String | SCHEMA 名称。                         |
| **table** | String | 表名。                                |
| **dbValType** | Map | 字段数据类型名称。                          |
| **jdbcType** | Map | [字段 JDBC 数据类型](java_jdbc_types)。                      |
| **entryType** | String | 源端事件类型，如：ROWDATA / TRANSACTIONEND。 |
| **isDdl** | Boolean | 是否为 DDL 操作。                        |
| **pks** | List | 源端主键名称。                            |
| **execTs** | Long | 源端 SQL 执行的时间，13位Unix时间戳，单位为毫秒。     |
| **sendTs** | Long | 操作发送的时间，13 位 Unix 时间戳，单位为毫秒。       |
| **sql** | String | 源端执行的 DDL 语句。                      |
| **tableChanges** | Json | 该消息为 DDL 时，携带的该表的元信息，如：主键，列。       |

DML操作示例如下：
```json
{
    "action":"INSERT/DELETE/UPDATE",
    "before":[
      // UPDATE 的 before 字段
      {
        "col1":"22",
        "col2":"22",
        "col_pk":"22"
      }
    ],
    "bid":0,
    "data":[
      {
        "col1":"11",
        "col2":"11",
        "col_pk":"11"
      }
    ],
    "db":"db_test",
    "dbValType":{
        "col1":"varchar(22)",
        "col2":"varchar(22)",
        "col_pk":"varchar(22)"
    },
    "isDdl":false,
    "entryType":"ROWDATA",
    "execTs":1669789152000,
    "jdbcType":{
        "col1":12,
        "col2":12,
        "col_pk":12
    },
    "pks":[],
    "schema":"db_test",
    "sendTs":1669789153377,
    "sql":"",
    "table":"table_test"
}
```
DDL操作示例如下：
```json
{
    "action":"ALTER",
    "before":[],
    "bid":0,
    "data":[],
    "db":"db_test",
    "dbValType":{
        "col1":"varchar(22)",
        "col2":"varchar(22)",
        "col_pk":"varchar(22)"
    },
    "isDdl":true,
    "entryType":"ROWDATA",
    "execTs":1669789188000,
    "jdbcType":{
        "col1":12,
        "col2":12,
        "col_pk":12
    },
    "pks":[],
    "schema":"db_test",
    "sendTs":1669789189533,
    "sql":"alter table table_test add col2 varchar(22) null",
    "table":"table_test",
    "tableChanges":{
        "table":{
            "columns":[
                {
                    "jdbcType":12, // jdbc 类型。
                    "name":"col1",    // 字段名称。
                    "position":0,  // 字段的顺序。
                    "typeExpression":"varchar(22)", // 类型描述。
                    "typeName":"varchar" // 类型名称。
                },
                {
                    "jdbcType":12,
                    "name":"col2",
                    "position":1, 
                    "typeExpression":"varchar(22)", 
                    "typeName":"varchar" 
                },
                {
                    "jdbcType":12, 
                    "name":"col_pk",   
                    "position":2,  
                    "typeExpression":"varchar(22)", 
                    "typeName":"varchar" 
                }
            ],
            "primaryKeyColumnNames":["col_pk"] // 主键名列表。
        },
        "type":"ALTER"
    }
}
```
### Canal Json
参数说明：

| 参数 | 类型 | 说明 |
| --- | --- |----|
| **type** | String | 操作的类型，如：INSERT / UPDATE / DELETE。 |
| **id** | Long | 操作的序列号。 |
| **old** | List | 变更前的数据。 |
| **data** | List | 当前操作的数据。 |
| **database** | String | 数据库名称。 |
| **table** | String | 表名。 |
| **mysqlType** | Map | 字段数据类型名称。 |
| **sqlType** | Map | [字段 JDBC 数据类型](java_jdbc_types)。 |
| **isDdl** | Boolean | 是否为 DDL 操作。 |
| **pkNames** | List | 源端主键名称。 |
| **es** | Long | 源端 SQL 执行的时间，13位Unix时间戳，单位为毫秒。 |
| **ts** | Long | 操作发送的时间，13 位 Unix 时间戳，单位为毫秒。 |
| **sql** | String | 源端执行的 DDL 语句。 |
| **tableChanges** | Json | 该消息为 DDL 时，携带的该表的元信息，如：主键，列。 |

DML操作示例如下：
```json
{
    "data":[
      {
        "col1":"11",
        "col2":"11",
        "col_pk":"11"
      }
    ],
    "database":"db_test",
    "es":1669790847000,
    "id":0,
    "isDdl":false,
    "mysqlType":{
        "col1":"varchar(22)",
        "col2":"varchar(22)",
        "col_pk":"varchar(22)"
    },
    "old":[
      // UPDATE 的 old 字段
      {
        "col1":"22",
        "col2":"22",
        "col_pk":"22"
      }
    ],
    "pkNames":["col_pk"],
    "sql":"",
    "sqlType":{
        "col1":12,
        "col2":12,
        "col_pk":12
    },
    "table":"table_test",
    "ts":1669790848072,
    "type":"INSERT/DELETE/UPDATE"
}
```
DDL操作示例如下：
```json
{
    "data":[],
    "database":"db_test",
    "es":1669790951000,
    "id":0,
    "isDdl":true,
    "mysqlType":{
        "col1":"varchar(22)",
        "col2":"varchar(22)",
        "col_pk":"varchar(22)"
    },
    "old":[],
    "pkNames":[],
    "sql":"alter table table_test add col2 varchar(22) null",
    "sqlType":{
        "col1":12,
        "col2":12,
        "col_pk":12
    },
    "table":"table_test",
    "tableChanges":{
        "table":{
            "columns":[
                {
                    "jdbcType":12, // jdbc 类型。
                    "name":"col1", // 字段名称。
                    "position":0,  // 字段的顺序。
                    "typeExpression":"varchar(22)", // 类型描述。
                    "typeName":"varchar" // 类型名称。
                },
                {
                    "jdbcType":12,
                    "name":"col2",
                    "position":1,
                    "typeExpression":"varchar(22)",
                    "typeName":"varchar"
                },
                {
                    "jdbcType":12,
                    "name":"col_pk",
                    "position":2,
                    "typeExpression":"varchar(22)",
                    "typeName":"varchar"
                }
            ],
            "primaryKeyColumnNames":["col_pk"] // 主键名列表。
        },
        "type":"ALTER"
    },
    "ts":1669790952584,
    "type":"ALTER"
}
```
### Aliyun DTS Avro
该消息类型需要根据 DTS Avro 的 SCHEMA 定义进行数据解析，DTS Avro 定义详情参见 [DTS Avro 的 SCHEMA 定义](https://github.com/LioRoger/subscribe_example/tree/master/avro)。

### Debezium Envelope
该消息类型主要由 SCHEMA 和 PAYLOAD 构成，SCHEMA 是数据的元信息，PADYLOAD 是记录数据变化的内容。

SCHEMA 定义详情参见 [Debezium 官方文档](https://debezium.io/documentation/reference/2.0/connectors/index.html)。

Kafka 源端使用该消息格式，参见：[源端 Kafka Debezium Json 使用说明](../reference/debezium_json_notice.md)。

参数说明：

| 参数 | 类型 | 说明 |
|----| --- |----|
| **op** | String | 操作的类型，如：c(INSERT)，u(UPDATE)，d(DELETE)，a(ALTER)。 |
| **ts_ms** | Long | 操作发送的时间，13 位 Unix 时间戳，单位为毫秒。 |
| **after** | Json | 变更前的数据。 |
| **before** | Json | 变更后的数据。 |
| **source** | Json | 事件的元信息，如：db，table。 |
| **ddl** | String | 源端执行的 DDL 语句。 |
| **tableChanges** | Json | 该消息为 DDL 时，携带的该表的元信息，如：主键，列。 |

DML操作示例如下：
```json
{
  "schema":...,
  "payload":{
    "op":"c",
    "ts_ms":1669796261933,
    "after":{
      "col1":"11",
      "col2":"11",
      "col_pk":"11"
    },
    "before":{},
    "source":{
      "ts_ms":1669796261933,
      "db":"db_test",
      "table":"table_test",
      "connector":"MySQL",
      "gtid": null,
      "file": "mysql-bin.000003",
      "pos": 154,
      "server_id": 223344,
      ...
    }
  }
}
```
DDL操作示例如下：
```json
{
  "schema":...,
  "payload":{
    "databaseName":"db_test",
    "ddl":"alter table table_test add col2 varchar(22) null",
    "ts_ms":1669797213247,
    "source":{
      "ts_ms":1669796261933,
      "db":"db_test",
      "table":"table_test",
      "connector":"MySQL",
      "gtid": null,
      "file": "mysql-bin.000003",
      "pos": 154,
      "server_id": 223344,
      ...
    },
    "tableChanges":{
      "type":"ALTER",
      "table":{
        "columns":[
          {
            "jdbcType":12, // jdbc 类型。
            "name":"col1",    // 字段名称。
            "position":0,  // 字段的顺序。
            "typeExpression":"varchar(22)", // 类型描述。
            "typeName":"varchar" // 类型名称。
          },
          {
            "jdbcType":12,
            "name":"col2",
            "position":1,
            "typeExpression":"varchar(22)",
            "typeName":"varchar"
          },
          {
            "jdbcType":12,
            "name":"col_pk",
            "position":2,
            "typeExpression":"varchar(22)",
            "typeName":"varchar"
          }
        ],
        "primaryKeyColumnNames":["col_pk"], // 主键名列表。
      }
    }
  }
}
```
