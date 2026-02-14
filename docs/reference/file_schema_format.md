---
id: file_schema_format
title: Explanation on File Schema
description: BladePipe supports file type data sources. This page explains the file schema definition.
---

BladePipe supports file type data sources. When adding this type of data source, you can define the parsing format. This page introduces the format definition to facilitate users to integrate data.

## File Ingestion Process

BladePipe supports three file type data sources: **SshFile**, **OssFile**, **S3File**, which are the files obtained by remote access via SSH or local access to POSIX file system, Alibaba Cloud OSS, and AWS S3.

When adding the above three data sources, you can configure additional parameters, as follows:

| Parameter         | Description | 
|-----------------|-------|
| **dbsJson** | Define the schema to parse files (explained in the following section)   | 
| **defaultLineSchemaJson**    |  If the file schema is not found in dbsJson, this parameter configuration is used by default (explained in the following section), that is, the first column in a row is obtained (if the text file is not split by `colSep`, the entire row of data is deemed as one column)    | 
| **fileSuffixArray** |  Filter file type. Multiple file types can be written here, separated by commas. If it is empty, all files (directory files excluded) will be obtained. EMPTY is a special suffix, that is, files with no suffix are obtained, and they are processed as text files by default. |
| **withMetaFields** |  Whether to include the file meta information where the text is located. If it's true, `__cc_src_file` varchar(512) DEFAULT NULL，`__cc_src_url` varchar(512) DEFAULT NULL is included.   |

When accessing the files through the above three methods, BladePipe splits the files according to the file type, and then searches the corresponding file schema from the value of the **dbsJson** parameter for data processing (selecting columns and type conversion).

BladePipe determines the file type by the file suffix. It supports the following file suffixes:

- Text (EMPTY, .log, .sql, .txt, .java, .js, .cpp, .c)
- Markdown (.md)
- Json (.json)
- Excel (.xls, .xlsx)
- CSV (.csv)

:::info
Markdown and Json files are currently processed as Text files (read row by row), while Excel and CSV are parsed in standard format. For CSV, the table header can be ignored by setting the value of parameter **skipRows**.
:::

## dbsJson Parsing

dbsJson is the file format definition, which can be applied to all text files. Its main functions include schema migration to structured databases (such as relational databases and data warehouses), integration of required data (column selection), and type conversion.

- e.g.
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

  - Explanation:
    - **schema**: For SshFile, its value cannot be empty and needs to be selected when creating a DataJob. For OssFile and S3File,  its value can be empty and it needs to be filled in only when the file column information needs to be defined. 
    - **tables**: Its value can be empty and is only filled in when the file column information needs to be defined.
    - **jdbcType**: The integer value of the Java Types corresponding to the jdbcType. For details, refer to the [Explanation on Java Types](java_jdbc_types).
    - **typeName**: Type name. For specific values, please refer to [Supported TypeNames of File Schema](#supported-typenames-of-file-schema).
    - **precise**: For boolean (BOOLEAN), integer (INTEGER, BIGINT), long text (TEXT), and time (DATE, TIME, TIMESTAMP) types, the value can be empty. For string (VARCHAR), decimal (DECIMAL), and binary (BYTES) types, it needs to be specified. 
    - **scale**: For decimal (DECIMAL) type, the value cannot be empty. For other types, it can be empty.
    - **colSep**: Split single-line content in text files. If it is empty, the default task-level parameter `colSep` is used for splitting. For Excel and other files, the separator is invalid. Special symbols ($, \, etc.) need to be escaped with `\`. 
    - **idx**: Start from 0. You can select part of column numbers, that is, filter the parsed columns (for example, the second column in the example is not needed). 

## defaultLineSchemaJson Parsing

When there is no parsing definition of the file in dbsJson, this configuration is used by default. The default configuration is to get the first column in a row (if the text file is not split by `colSep`, the whole row of data is deemed as one column). You can define the default parsing rules by modifying this parameter value to obtain the same column as the columns in dbsJson.

- Default configuration:
  ```json
  [
    {
      "column":"line",
      "jdbcType":12,
      "typeName":"TEXT"
    }
  ]
  ```

## Appendix
### Supported TypeNames of File Schema

| Type Name | Description |
| :-- | :-- |
| boolean | true/false |
| integer | 32-bit signed integer |
| bigint | 64-bit signed integer |
| decimal | Exact decimal, such as 11.1111 |
| date | Date type, such as '2025-11-11' |
| time | Time type, such as '11:11:11' |
| timestamp | Timestamp, such as '2025-11-11 11:11:11' |
| varchar | Variable length string, no more than 2048 bytes. For a string with more than 2048 bytes, please use text. |
| text | Long text, corresponding to database clob, text, etc. |
| bytes | Binary streams, such as images and videos, corresponding to databases blob and binary. |
