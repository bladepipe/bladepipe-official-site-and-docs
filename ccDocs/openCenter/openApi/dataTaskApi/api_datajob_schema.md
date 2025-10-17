---
id: api_datajob_schema
title: 元数据结构说明
description: 接口描述：本文档主要介绍如何理解描述数据源库表列等元数据的结构
---

## 描述 

CloudCanal 任务配置中，比较难理解的包含两部分内容，一是**描述数据源库表列等元数据的结构**，二是**源和目标元数据映射关系**。

本文档主要介绍如何理解**描述数据源库表列等元数据的结构**。

## 举个例子

如下结构一般出现在 DataJob 配置 srcSchema 或者 dstSchema 中，表示一个数据源库表列等信息。这个结构有几个特点
- 结构内容嵌套展现了数据源元信息的层次结构
- 不同数据源类型具有差异的层次结构
- 不同数据源类型存在一些差异的元素
- 每一层描述的信息包含通用的 targetAutoCreate 和 inBlackList 属性,前者表示对端对应的结构是否自动创建，后者表示是否在黑名单中

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

## 常用数据源层次结构和特殊属性

| 数据源名称         | 第一层元素和属性    | 第二层元素和属性     |  第三层元素和属性      |第四层元素和属性      |
| ------------ | -------------------------------- |-----------|----|----|
| MySQL  |数据库 <br/><br/>db(数据库名) <br/>dbPattern(数据库名表达式，未使用) <br/>tables (表信息列表,见第二层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**) <br/>specifiedPks(指定主键列表) <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>columns(列列表，见第三层描述)|列 <br/><br/>column(列名) |无|
| PolarDbMySQL  |数据库 <br/><br/>db(数据库名) <br/>dbPattern(数据库名表达式，未使用) <br/>tables (表信息列表,见第二层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**) <br/>specifiedPks(指定主键列表) <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>columns(列列表，见第三层描述)|列 <br/><br/>column(列名) | 无|
| PostgreSQL  |数据库 <br/><br/>db(数据库名) <br/>schemas(pg schema列表，见第二层描述)|schema <br/><br/>schema(schema名) <br/>schemaPattern(schema表达式,未使用) <br/>tables (表信息列表,见第三层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**) <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>columns(列列表，见第四层描述)|列 <br/><br/>column(列名) |
| Greenplum  |数据库 <br/><br/>db(数据库名) <br/>schemas(pg schema列表，见第二层描述)|schema <br/><br/>schema(schema名) <br/>schemaPattern(schema表达式,未使用) <br/>tables (表信息列表,见第三层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**) <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>columns(列列表，见第四层描述)|列 <br/><br/>column(列名) |
| Oracle  | 数据库 <br/><br/>db(数据库名) <br/>tableSpaces(oracle schema列表，见第二层描述)|schema <br/><br/>tableSpace(schema名) <br/>tableSpacePattern(schema表达式,未使用) <br/>tables (表信息列表,见第三层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**) <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>columns(列列表，见第四层描述)|列 <br/><br/>column(列名) |      
| SQLServer  |暂未开放|   暂未开放    |  暂未开放    |  暂未开放|
| Redis  |缓存key命名空间 <br/><br/>prefix(缓存key命名前缀) <br/>suffixFields(缓存key命名空间属性列表)|   无    |无|无|   
| ElasticSearch  |索引 <br/><br/>indexName(索引名称) <br/>idFieldNames(构建ES主键的属性列表) <br/>numberOfShards(分片数量,int类型) <br/>numberOfReplicas(副本数量,int类型) <br/>globalTimeZone(时区字符串) <br/>fields(列信息列表，见第二层描述) | 列 <br/><br/>fieldName(列名) <br/>fieldTypeName(Es中列类型) <br/>needIndex(是否需要索引,boolean类型) <br/>timeFormat(时间格式) <br/>esAnalyzerType(分词器类型，见**esAnalyzerType说明**) <br/>needAutoCreated(是否自动创建,boolean类型)  | |   
| AdbForMySQL  |数据库 <br/><br/>db(数据库名) <br/>dbPattern(数据库名表达式，未使用) <br/>tables (表信息列表,见第二层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**)  <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>columns(列列表，见第三层描述)|列 <br/><br/>column(列名) |无| 
| TiDB  |数据库 <br/><br/>db(数据库名) <br/>dbPattern(数据库名表达式，未使用) <br/>tables (表信息列表,见第二层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**)  <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>columns(列列表，见第三层描述)|列 <br/><br/>column(列名) |无|     
| ClickHouse   |数据库 <br/><br/>db(数据库名) <br/>dbPattern(数据库名表达式，未使用) <br/>tables (表信息列表,见第二层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**)  <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>columns(列列表，见第三层描述)|列 <br/><br/>column(列名) |无|        
| Kudu  | 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>dataFilter(json 结构，见下方**dataFilter结构说明**)  <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素) <br/>partitions(分区列表，见第二层描述) <br/>columns(列列表，见第二层描述)|分区 <br/><br/>columns(分区的列) <br/>partitionType(分区类型，可选值**Range**,**Hash**) <br/>列 <br/><br/>column(列名)  |无| 无|无|       
| MongoDB  |数据库 <br/><br/>db(数据库名) <br/>collections(集合列表，见第二层描述)|集合 <br/><br/>collection(集合名) <br/>actions(操作列表，目前包含**INSERT**,**UPDATE**,**DELETE**可选元素)| 无|无|
| Kafka  |Topic <br/><br/>topic(topic名) <br/>topicPattern(topic表达式，未使用) <br/>partitions(分区数,整数类型) <br/>partitionKeys(分区字段列表)|无|无|无|      
| RocketMQ   |Topic <br/><br/>topic(topic名) <br/>topicPattern(topic表达式，未使用) <br/>partitions(分区数,整数类型) <br/>partitionKeys(分区字段列表)|无|无|无|           
| RabbitMQ   |队列 <br/><br/>queue(队列名) <br/>queuePattern(队列表达式，未使用)|无|无|无|       
| Hive   |数据库 <br/><br/>db(数据库名) <br/>dbPattern(数据库名表达式，未使用) <br/>tables (表信息列表,见第二层描述)| 表 <br/><br/>table(表名) <br/>tablePattern(表名表达式，未使用) <br/>partitionKeys(分区键列表，详见**partitionKeys结构说明**)   <br/>columns(列列表，见第三层描述)|列 <br/><br/>column(列名) |无|      


### dataFilter结构说明

| 属性名称         | 属性说明    |
| ------------ | -------------------------------- |
| type  | 数据过滤器类型 <br/><br/> SQL_WHERE <br/>JAVA_CODE(未实现) <br/>REGULAR_EXPRESSION(未实现) <br/>AVIATOR_EXPRESSION(未实现) |
| expression | 对应类型的数据过滤表达式|

### partitionKeys结构说明

| 属性名称         | 属性说明    |
| ------------ | -------------------------------- |
| keyName  | 分区键名称|
| originCol | 数据来源字段|
| partitionFunction | 分区方式 <br/><br/>EQUAL <br/>YEAR_FORMAT <br/>MONTH_FORMAT <br/>DAY_FORMAT <br/>HOUR_FORMAT <br/>MINUTE_FORMAT|

### esAnalyzerType说明

可选值包含以下几种，其中`CUSTOM_A`,`CUSTOM_B`,`CUSTOM_C`,`CUSTOM_D`,`CUSTOM_E`比较特殊，表示用户自定义分词器，对应 ElasticSearch 中分词器需要命名为对应小写字符串,即 `custom_a`,`custom_b`,`custom_c`,`custom_d`,`custom_e`,(后续修改成更加优雅的方式)

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
