---
id: visual_widetable_create
title: Create Wide Tables
---

BladePipe supports a visual approach to wide table construction. By selecting a driving table, one or more lookup tables, and defining their join relationships, BladePipe completes wide table records through reverse lookups during both data migration and sync.

## Definition

In BladePipe, a wide table consists of:

- **Driving Table**: The main table used as the data source. Only one driving table can be selected.
- **Lookup Tables**: Additional tables joined to the driving table. Multiple lookup tables are supported.

By default, the join behavior follows **Left Join** semantics: all records from the driving table are preserved, regardless of whether corresponding records exist in lookup tables.

BladePipe currently supports two types of join structures:

- **Linear**: e.g., A.b_id = B.id AND B.c_id = C.id. Each table can only be selected once, and circular references are not allowed.
- **Star**: e.g., A.b_id = B.id AND A.c_id = C.id. Each lookup table connects directly to the driving table. Cycles are not allowed.

In both cases, table A is the driving table, while B, C, etc. are lookup tables.

## Data Change Rule

### Relational Database as Target (e.g., MySQL):
- **Driving table INSERT**: Fields from lookup tables are automatically filled in.
- **Driving table UPDATE/DELETE**: Lookup fields are not updated.
- **Lookup table INSERT**: If downstream tables exist, the operation is converted to an UPDATE to refresh Lookup fields.
- **Lookup table UPDATE**: If downstream tables exist, no changes are applied to related fields.
- **Lookup table DELETE**: If downstream tables exist, the operation is converted to an UPDATE with all fields set to NULL.

### Overwrite-based Engines as Target (e.g., StarRocks):
- All operations (INSERT, UPDATE, DELETE) on the Driving table will auto-fill Lookup fields.
- All operations on Lookup tables are ignored.

## Limitations
Modifying the join structure of a wide table after creation is not supported.

## Procedures
1. Log in to BladePipe. Go to **DataJob** > **Create DataJob**.
2. In the **Tables** step, 
   1. Choose the tables that will participate in the wide table.
   2. Click **Batch Modify Target Names** > **Unified table name**, and enter a name as the wide table name.
3. In the **Data Processing** step,
   1. On the left panel, select the Driving Table and click **Operation** > **Wide Table** to define the join.
      - Specify Lookup Columns (multiple columns are supported).
      - Select additional fields from the Lookup Table and define how they map to wide table columns. This helps avoid naming conflicts across different source tables.
      :::info
      **1.**   
      If a Lookup Table joins to another table, **make sure to include the relevant Lookup columns**. For example, in A.b_id = B.id AND B.c_id = C.id, when selecting fields from B, c_id must be included.   
      **2.** .  
      When multiple Driving or Lookup tables contain fields with the same name, always **map them to different target column names to avoid collisions**.
      :::
      
   2. Click **Submit** to save the configuration.
   3. Click Lookup Tables on the left panel to check whether field mappings are correct.
4. Continue with the DataJob creation process.