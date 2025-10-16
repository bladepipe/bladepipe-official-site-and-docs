---
id: file_schema_format
title: 文件 schema 结构说明
---

CloudCanal 支持文件类型数据源，添加该类型数据源时可定义内容的解析格式，本文主要介绍该格式定义，方便用户集成数据。

## 文件数据集成机制

CloudCanal 当前支持 **SshFile**、**OssFile**、**S3File** 3种文件类型数据源，分别对应通过 ssh 远程（或本地）访问 POSIX 文件系统、阿里云 OSS、以及 AWS S3。

添加上述 3 种数据源时，可以设定额外参数，说明如下：

| 参数名称         | 参数用途 | 
|-----------------|-------|
| **dbsJson** |定义文件解析 schema（往下有详细章节说明）   | 
| **defaultLineSchemaJson**    |  如果未在 dbsJson 中找到文件的解析 schema, 则默认使用本参数配置（往下有详细章节说明），即获取一行中的第一列（如文本文件通过 `colSep` 无切割则整行数据为一列）   | 
| **fileSuffixArray** |  文件类型过滤，可多个文件，以逗号分割。如果为空，则获取所有文件（非目录）。EMPTY 为特殊后缀，即没获取到任何后缀的文件，默认当作文本文件处理 |
| **withMetaFields** |   是否带上文本所在的文件元信息。为 true 时，默认带上 `__cc_src_file` varchar(512) DEFAULT NULL，`__cc_src_url` varchar(512) DEFAULT NULL    |

当通过上述 3 种方式访问对应文件时，CloudCanal 根据不同文件类型做切分，再从 **dbsJson** 参数内容中寻找对应文件 schema 进行数据处理（选择列和类型转换）。

CloudCanal 通过文件后缀对文件类型进行判定，当前支持如下：

- Text (EMPTY , .log , .sql , .txt , .java , .js , .cpp , .c)
- Markdown (.md)
- Json (.json)
- Excel (.xls , .xlsx)
- CSV (.csv)

:::info
Markdown 和 Json 当前也按照 Text 方式进行处理（按行读取），Excel 和 CSV 则进行标准格式解析，其中 CSV 可以通过任务参数 **skipRows** 忽略表头。
:::

## dbsJson 解析

dbsJson 即文件的格式定义，可应用于所有的文本文件，其主要作用包括到结构化数据库（比如关系型数据库、数据仓库）的结构迁移，集成需要的数据（列选择），类型转换。

- 示例
  ```json
  [
    {
      "db":"cc_virtual_fs",
      "schemas":[
        {
          "schema":"/Users/zylicfc/hudi_data",
          "tables":[
            {
              "table":"/Users/zylicfc/hudi_data/2025-03-25-14-52-29_EXPORT_CSV_18356972_222_worker_stats_0.csv",
              "columns":[
                {
                  "column":"id",
                  "jdbcType":-5,
                  "typeName":"bigint",
                  "precise":20,
                  "idx":0
                },
                {
                  "column":"gmt_create",
                  "jdbcType":93,
                  "typeName":"timestamp",
                  "idx":1
                },
                {
                  "column":"worker_id",
                  "jdbcType":-5,
                  "typeName":"bigint",
                  "precise":20,
                  "idx":3
                },
                {
                  "column":"decimal_col_new",
                  "jdbcType":3,
                  "typeName":"decimal",
                  "precise":10,
                  "scale":2,
                  "idx":16
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  ```
  ```json
  [
    {
        "db": "cc_virtual_fs",
        "schemas": [
            {
                "schema": "1d2xlY6o_xV3TSRsl2fS7IZbpP_tFVlx5",
                "tables": [
                    {
                        "table": "person#1Pyd8_gqTQWb4rPvHoC2OIqBvQO8fNs9G5KRFlhKuj7E",
                        "colSep": "",
                        "sheetRanges": [
                            "person",
                            "person1"
                        ],
                        "columns": [
                            {
                                "column": "ID",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 32,
                                "idx": 0
                            },
                            {
                                "column": "NAME",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 128,
                                "idx": 1
                            },
                            {
                                "column": "GENDER",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 128,
                                "idx": 3
                            }
                        ]
                    },
                    {
                        "table": "person#1Pyd8_gqTQWb4rPvHoC2OIqBvQO8fNs9G5KRFlhKuj7E#person",
                        "colSep": "",
                        "sheetRanges": [
                            "person"
                        ],
                        "columns": [
                            {
                                "column": "ID",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 32,
                                "idx": 0
                            },
                            {
                                "column": "GENDER",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 128,
                                "idx": 3
                            }
                        ]
                    },
                    {
                        "table": "person#1Pyd8_gqTQWb4rPvHoC2OIqBvQO8fNs9G5KRFlhKuj7E#person_person1",
                        "colSep": "",
                        "sheetRanges": [
                            "person",
                            "person1"
                        ],
                        "columns": [
                            {
                                "column": "ID",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 32,
                                "idx": 0
                            },
                            {
                                "column": "NAME",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 128,
                                "idx": 1
                            }
                        ]
                    },
                    {
                        "table": "person#1Pyd8_gqTQWb4rPvHoC2OIqBvQO8fNs9G5KRFlhKuj7E#person1",
                        "colSep": "",
                        "sheetRanges": [
                            "person1"
                        ],
                        "columns": [
                            {
                                "column": "ID",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 32,
                                "idx": 0
                            },
                            {
                                "column": "DATETIME",
                                "jdbcType": 12,
                                "typeName": "varchar",
                                "precise": 128,
                                "idx": 2
                            }
                        ]
                    }
                ]
            }
        ]
    }
  ]
  ```

  - 示例说明
    - **schema** 对于 SshFile 不能为空，创建任务时需要选择。OssFile、S3File 可以为空，仅在需要定义文件列信息时填写。GoogleDrive 则填写对应的文件夹 ID，默认值则会返回所有有权限查阅的文件。
    - **tables** 队列可以为空，仅在需要定义文件列信息时填写。
    - **table** 对于 SshFile 为本地或远程文件路径。OssFile、S3File 为对应云存储的文件路径。Google Sheet 类型的文件，需要填写为 fileName#documentId，如果需要区分单个文件内的不同 sheet，则可以填写为 fileName#documentId#sheetRanges，多个 range 之间用下划线分割。
    - **sheetRanges** Google Sheet 中的工作表范围，需要与 table 相对应。
    - **jdbcType** 类型对应的 Java Types 的整数值，具体参考[附录文档](java_jdbc_types)。
    - **typeName** 类型名称，具体值参考当前文档 **附录** > **文件 SCHEMA 支持的类型(typeName)**。
    - **precise** 布尔类型(BOOLEAN)、整数(INTEGER,BIGINT)、长文本(TEXT)、时间(DATE,TIME,TIMESTAMP)可以为空，字符串（VARCHAR）、小数(DECIMAL)、二进制(BYTES)需要指定。
    - **scale** 小数(DECIMAL) 不能未空，其他可为空。
    - **colSep** 对于文本文件单行内容进行分割，如果为空，默认使用任务级别参数 colSep 进行分割，对于 Excel 等文件，分割符无效。对于特殊符号（$,\等）需要用 `\` 进行转义。
    - **idx** 从 0 开始，可以选择部分列序号，即解析后的列进行删选（如示例中的第 2 列并不需要）。

## defaultLineSchemaJson 解析

当 dbsJson 中没有对应文件的解析定义时，则默认使用本配置，默认配置即获取一行中的第一列（如文本文件通过 `colSep` 无切割，则整行数据为一列），可通过修改该参数值定义默认的解析规则，定义和 dbsJson 中的 columns 内容保持一列。

- 默认配置
  ```json
  [
    {
      "column":"line",
      "jdbcType":12,
      "typeName":"TEXT"
    }
  ]
  ```

## 附录
### 文件 SCHEMA 支持的类型(typeName)

| 类型名字 | 说明 |
| :-- | :-- |
| boolean | true/false |
| integer | 32位整形(带符号) |
| bigint | 64位整形(带符号) |
| decimal | 精确小数，如 11.1111 |
| date | 日期类型，如 '2025-11-11' |
| time | 时间类型，如 '11:11:11' |
| timestamp | 时间戳，如 '2025-11-11 11:11:11' |
| varchar | 变长字符串，不超过 2048 个 bytes，超过请使用 text |
| text | 长文本，对应数据库 clob, text 等 |
| bytes | 二进制流，如图片、视频等，对应传统数据库 blob,binary 等 |
