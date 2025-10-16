---
id: sap_hana_ddl
title: Change Schema in a Source SAP HANA Instance
description: BladePipe captures data changes in a source SAP HANA instance through triggers. DDL synchronization is not supported. If there are DDL changes, please handle them as follows.
---

## Overview
BladePipe captures data changes in a source SAP HANA instance through triggers. DDL synchronization is not supported. If there are DDL changes, please handle them as follows.

## Prerequisites
Make sure that in the DataJob configuration, the **CDC table mode** is set to **table-level CDC table** (that is, make sure that the parameter value of **incrTableMode** is **TABLE_LEVEL_CDC_TABLE** on the source [DataSource Configuration](../../../operation/job_manage/job_op/job_params#Procedure)).

## Procedure

### Add a Column
When **adding a column** in a source SAP HANA instance, follow the steps below: 
1. Execute the following statements at the **source table**, **CDC table** and **target table** respectively to add a column.
```sql
-- Add a column at the source table
ALTER TABLE "SYSTEM"."TEST"
ADD ("COL_4" INTEGER NOT NULL);
    
-- Add a column at the CDC table (CDC table name format: ${DB_NAME}_${SCHEMA_NAME}_${TABLE_NAME}_CDC_TABLE)
ALTER TABLE "SYSTEM"."SYSTEMDB_SYSTEM_TEST_CDC_TABLE"
ADD ("COL_4" INTEGER NOT NULL);
    
-- Add a column at the target table (taking MySQL as an example)
ALTER TABLE `SYSTEMDB`.`TEST`
ADD COLUMN `COL_5` INT NOT NULL;
```
2. [Modify the subscription](../../../operation/job_manage/job_op/edit_job) to delete the source table with the added column.
3. [Modify the subscription](../../../operation/job_manage/job_op/edit_job) again to add the source table with the added column, and select **Full Data**.

### Delete a Column
When **deleting a column** in a source SAP HANA instance, follow the steps below: 
1. Execute the following statements at the **source table**, **CDC table** and **target table** respectively to delete a column.
```sql
-- Delete a column at the source table
ALTER TABLE "SYSTEM".TEST 
  DROP ("COL_4");
  
-- Delete a column at the CDC table (CDC table name format: ${DB_NAME}_${SCHEMA_NAME}_${TABLE_NAME}_CDC_TABLE)
ALTER TABLE "SYSTEM"."SYSTEMDB_SYSTEM_TEST_CDC_TABLE" 
  DROP ("COL_4");
  
-- Delete a column at the target table (taking MySQL as an example)
ALTER TABLE `SYSTEMDB`.`TEST`
  DROP COLUMN `COL_5`;
```
2. [Modify the subscription](../../../operation/job_manage/job_op/edit_job) to delete the source table with the deleted column.
3. [Modify the subscription](../../../operation/job_manage/job_op/edit_job) again to add the source table with the deleted column, and select **Full Data**.

### Modify a Column Name
When **modifying a column name** in a source SAP HANA instance, follow the steps below: 
1. Execute the following statements at the **source table**, **CDC table** and **target table** respectively to modify a column name.
```sql
-- Modify a column name at the source table
RENAME COLUMN "SYSTEM"."TEST"."COL_4" 
  TO "COL_4_NEW";
  
-- Modify a column name at the CDC table (CDC table name format: ${DB_NAME}_${SCHEMA_NAME}_${TABLE_NAME}_CDC_TABLE)
RENAME COLUMN "SYSTEM"."SYSTEMDB_SYSTEM_TEST_CDC_TABLE"."COL_4" 
  TO "COL_4_NEW";
  
-- Modify a column name at the target table (taking MySQL as an example)
ALTER TABLE `SYSTEM`.`TEST` 
  CHANGE COLUMN `COL_4` `COL_4_NEW` INT NOT NULL;
```
2. [Modify the subscription](../../../operation/job_manage/job_op/edit_job) to delete the source table with the modified column.
3. [Modify the subscription](../../../operation/job_manage/job_op/edit_job) again to add the source table with the modified column, and select **Full Data**.

### Modify a Data Type/Length
When **modifying a data type/length** in a source SAP HANA instance, follow the steps below: 

Execute the following statements at the **source table**, **CDC table** and **target table** respectively to modify a data type/length.
```sql
-- Modify a data type/length at the source table
ALTER TABLE "SYSTEM"."TEST" 
   ALTER ("COL_4_NEW" VARCHAR(255) NULL);

-- Modify a data type/length at the CDC table (CDC table name format: ${DB_NAME}_${SCHEMA_NAME}_${TABLE_NAME}_CDC_TABLE)
ALTER TABLE "SYSTEM"."SYSTEMDB_SYSTEM_TEST_CDC_TABLE" 
  ALTER ("COL_4_NEW" VARCHAR(255) NULL);

-- Modify a data type/length at the target table (taking MySQL as an example)
ALTER TABLE `SYSTEM`.`TEST` 
  MODIFY COLUMN `COL_4_NEW` VARCHAR(255) NOT NULL;
```

### Modify a Table Name
1. [Modify the subscription](../../../operation/job_manage/job_op/edit_job) to delete the source table.
2. After the table name is modified, [modify the subscription](../../../operation/job_manage/job_op/edit_job) again to add the modified source table, and select **Full Data**.  

:::info
If an Incremental DataTask associated with a source SAP HANA instance is deleted, or a table is deleted via subscription modification, BladePipe will not automatically delete the CDC table.

If you need to delete the CDC table, execute the `DROP TABLE` statements.
:::