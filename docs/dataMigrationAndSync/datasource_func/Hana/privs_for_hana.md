---
id: privs_for_hana
title:  Required Privileges for SAP HANA
description: To migrate and synchronize data from or to SAP HANA using BladePipe, a SAP HANA user needs to have certain privileges.
---

This article describes the permissions required by BladePipe for database accounts when SAP HANA is used as the Source or Target DataSource for migrating or synchronizing data.

## As the Source
- **Fulll Data Migration**: The **SELECT** permission.  
  e.g.:
  ```sql
  -- Create a user (BP_TEST_USER)
  CREATE USER BP_TEST_USER password "Bladepipe@2021" NO FORCE_FIRST_PASSWORD_CHANGE;
            
  -- Grant the user (BP_TEST_USER) the required permission on schema (PIPE_TEST)
  GRANT SELECT ON SCHEMA PIPE_TEST TO BP_TEST_USER;      
  ``` 
- **Incremental Data Synchronization**:
  - Manual CDC Mode: select Manual for CDC Mode when creating a DataJob.
      - The **SELECT** permission is required for BladePipe to create triggers, queries. 
      - The **READ** permission on entire **CATALOG** is required to check whether the transaction is committed in Incremental stage.
      - The **INSERT** permission on the **schema** of the incremental data change table is required for the **business account**.
      e.g.:
      ```sql
      -- Create a user (BP_TEST_USER)
      CREATE USER BP_TEST_USER password "Bladepipe@2021" NO FORCE_FIRST_PASSWORD_CHANGE;
          
      -- The authorized synchronization user (BP_TEST_USER) requires table permissions to be synchronized (Replace table_x with the actual table name)
      GRANT SELECT  ON "PIPE_TEST"."table_x" TO "BP_TEST_USER";
          
      -- Grant the user (BP_TEST_USER) the required permissions on schema of the incremental data change table (SYSTEM) 
      GRANT SELECT ON SCHEMA SYSTEM TO BP_TEST_USER;
          
      -- Grant the user (BP_TEST_USER) READ permission on entire catalog.
      GRANT CATALOG READ TO BP_TEST_USER;
  
      -- Grant the business user (BUSINESS_USER) the required permission on schema of the incremental data change table (SYSTEM)
      GRANT INSERT ON SCHEMA SYSTEM TO BUSINESS_USER;
      ```

  - Auto CDC Mode: select Auto for CDC Mode when creating a DataJob.
      - The **TRIGGER**, **SELECT** permissions are required for BladePipe to create triggers, queries. 
      - The trigger writes the data changes to the **incremental data change table**, which requires **SELECT**, **INSERT**, **CREATE ANY** permissions. 
      - The **READ** permission on entire **CATALOG** is required to check whether the transaction is committed in Incremental stage.
      - The **INSERT** permission on the **schema** of the incremental data change table is required for the **business account**.
      e.g.:
      ```sql
      -- Create a user (BP_TEST_USER)
      CREATE USER BP_TEST_USER password "Bladepipe@2021" NO FORCE_FIRST_PASSWORD_CHANGE;
          
      -- The authorized synchronization user (BP_TEST_USER) requires table permissions to be synchronized (Replace table_x with the actual table name)
      GRANT SELECT  ON "PIPE_TEST"."table_x" TO "BP_TEST_USER";
      GRANT TRIGGER ON "PIPE_TEST"."table_x" TO "BP_TEST_USER";
          
      -- Grant the user (BP_TEST_USER) the required permissions on schema of the incremental data change table (SYSTEM) 
      GRANT SELECT ON SCHEMA SYSTEM TO BP_TEST_USER;
      GRANT INSERT ON SCHEMA SYSTEM TO BP_TEST_USER;
      GRANT CREATE ANY ON SCHEMA SYSTEM TO BP_TEST_USER;
          
      -- Grant the user (BP_TEST_USER) READ permission on entire catalog.
      GRANT CATALOG READ TO BP_TEST_USER;
  
      -- Grant the business user (BUSINESS_USER) the required permission on schema of the incremental data change table (SYSTEM)
      GRANT INSERT ON SCHEMA SYSTEM TO BUSINESS_USER;
      ```

## As the Target
**Full Data Migration/Incremental Data Synchronization**: The **INSERT**, **UPDATE**, **DELETE** permissions.
