---
id: kafka_msg_format_type
title: Message Format
---

BladePipe supports selecting the synchronized message store format with MQ, this article introduces the definition and description of multiple message formats of MQ, which facilitates downstream consumption and use.

## Message format introduction
### Supported message synchronization formats
- **CloudCanal Json**: BladePipe's default message format, parsing incremental logs from the database and transmitting to Kafka, supporting batch message transmission.
- **Canal Json**: A compatible format for Canal, data stored in the Canal Json format.
- **Aliyun DTS Avro**: An data serialization format that can transform data structures or objects into a format suitable for storage or transmission.
- **Debezium Envelope**: Debezium official CDC message format, carrying SCHEMA information, friendly to large data downstream consumption.

### Target end MQ support
| Message format    | Kafka     | RocketMQ  | RabbitMQ  |
|-------------------|-----------|-----------|-----------|
| CloudCanal Json   | Supported | Supported | Supported |   
| Canal Json        | Supported | Supported | Supported |
| Aliyun DTS Avro   | Supported | -         | -         |
| Debezium Envelope | Supported | -         | -         |

### Source end MQ support
| Message format    | Kafka     | RocketMQ  | RabbitMQ  |
|-------------------|-----------|-----------|-----------|
| CloudCanal Json   | Supported | Supported | Supported |    
| Canal Json        | Supported | Supported | Supported |
| Aliyun DTS Avro   | -         | -         | -         |
| Debezium Envelope | -         | -         | -         |

## Message format details

### CloudCanal Json

Parameter description:

| Parameter    | Type    | Description                                                                                      |
|--------------|---------|--------------------------------------------------------------------------------------------------|
| action       | String  | The type of operation, such as: INSERT / UPDATE / DELETE.                                        |
| bid          | Long    | BatchEventBuffer's Batch Id.                                                                     |  
| before       | List    | The data before the change.                                                                      |
| data         | List    | The current operation data.                                                                      |
| db           | String  | Database name.                                                                                   |  
| schema       | String  | SCHEMA name.                                                                                     |
| table        | String  | Table name.                                                                                      |
| dbValType    | Map     | The field data type name.                                                                        |
| jdbcType     | Map     | The field JDBC data type.                                                                        |
| entryType    | String  | The source event type, such as: ROWDATA / TRANSACTIONEND.                                        |
| isDdl        | Boolean | Whether it is a DDL operation.                                                                   |
| pks          | List    | The primary key names of the source end.                                                         |      
| execTs       | Long    | The time of source end SQL execution, a 13-digit Unix timestamp in milliseconds.                 |         
| sendTs       | Long    | The time of operation transmission, 13 digit Unix timestamp in milliseconds.                     |         
| sql          | String  | The DDL statement executed at the source end.                                                    |       
| tableChanges | Json    | When this message is a DDL, it carries the metadata of this table, such as: primary key, column. |

DML operation example is as follows:
```json
{
    "action":"INSERT/DELETE/UPDATE",
    "before":[
      // The before field of an UPDATE statement.
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
DDL operation example is as follows:
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
                    "jdbcType":12, // Jdbc type.
                    "name":"col1",    // Column name.
                    "position":0,  // Column order.
                    "typeExpression":"varchar(22)", // Type annotation.
                    "typeName":"varchar" // Type name.
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
            "primaryKeyColumnNames":["col_pk"] // The name list of primary key.
        },
        "type":"ALTER"
    }
}
```
### Canal Json
Parameter description:

| Parameter        | Type    | Description                                                                                               |  
|------------------|---------|-----------------------------------------------------------------------------------------------------------|
| **type**         | String  | The operation type, e.g.: INSERT / UPDATE / DELETE.                                                       |    
| **id**           | Long    | The sequence number of the operation.                                                                     |
| **old**          | List    | The data before the change.                                                                               |     
| **data**         | List    | The data of the current operation.                                                                        |   
| **database**     | String  | The database name.                                                                                        |       
| **table**        | String  | The table name.                                                                                           |        
| **mysqlType**    | Map     | The field data type names.                                                                                |      
| **sqlType**      | Map     | The field JDBC data types.                                                                                |        
| **isDdl**        | Boolean | Whether it is a DDL operation.                                                                            |
| **pkNames**      | List    | The primary key names of the source end.                                                                  |        
| **es**           | Long    | The time of the SQL execution at the source end, Unix timestamp in milliseconds.                          |    
| **ts**           | Long    | The time when the operation was sent, Unix timestamp in milliseconds.                                     |               
| **sql**          | String  | The DDL statement executed at the source end.                                                             |    
| **tableChanges** | Json    | When the message is a DDL, it carries the meta information of the table, such as primary key and columns. |

DML operation example is as follows:
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
      // The old field for an UPDATE type.
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
DDL operation example is as follows:
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
                    "jdbcType":12, // Jdbc type.
                    "name":"col1", // Column name.
                    "position":0,  // Column order.
                    "typeExpression":"varchar(22)", // Type annotation.
                    "typeName":"varchar" // Type name.
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
            "primaryKeyColumnNames":["col_pk"] // The name list of primary key.
        },
        "type":"ALTER"
    },
    "ts":1669790952584,
    "type":"ALTER"
}
```
### Alibaba DTS Avro
This message type requires data parsing according to the SCHEMA definition of DTS Avro. Refer to the [DTS Avro's SCHEMA definition](https://github.com/LioRoger/subscribe_example/tree/master/avro) for more information on DTS Avro.

### Debezium Envelope
This message type mainly consists of SCHEMA and PAYLOAD, the SCHEMA is the metadata of the data, and the PAYLOAD contains the content that changes the records.  
Refer to the [Official Debezium documentation]( https://debezium.io/documentation/reference/2.0/connectors/index.html) for details on the SCHEMA definition.

Parameter description:

| Parameter    | Type   | Description                                                                            |   
|--------------|--------|----------------------------------------------------------------------------------------|
| op           | String | The type of operation, e.g.: c(INSERT), u(UPDATE), d(DELETE), a(ALTER).                |
| ts_ms        | Long   | The time the operation was sent, a 13 digit Unix timestamp in milliseconds.            |
| after        | Json   | The data before the change.                                                            |
| before       | Json   | The data after the change.                                                             |   
| source       | Json   | Meta information of the event, e.g.: db,table.                                         |   
| ddl          | String | The DDL statement executed at the source.                                              |
| tableChanges | Json   | The table metadata  like: primary key, columns, carried by the message in case of DDL. |

DML operation example is as follows:
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
DDL operation example is as follows:
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
            "jdbcType":12, // Jdbc type.
            "name":"col1", // Column name.
            "position":0,  // Column order.
            "typeExpression":"varchar(22)", // Type annotation.
            "typeName":"varchar" // Type name.
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
        "primaryKeyColumnNames":["col_pk"], // The name list of primary key.
      }
    }
  }
}
```
