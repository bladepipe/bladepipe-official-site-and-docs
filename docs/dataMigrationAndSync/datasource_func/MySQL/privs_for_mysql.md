---
id: privs_for_mysql
title:  Required Privileges for MySQL
description: To replicate data from or to MySQL using BladePipe, users need certain privileges. 
---

## Overview
When performing MySQL source-to-target data migration and synchronization, BladePipe requires certain account permissions to be granted.

## Description
- MySQL as Source
    - Full Data：`SELECT` permission for tables, `SELECT` permission  for information_schema 
    - Incremental：`SELECT` ,`REPLICATION SLAVE` ,`REPLICATION CLIENT` permission，`SELECT` permission for information_schema
- MySQL as Target
    - Full Data/Incremental：`INSERT/UPDATE/DELETE/DDL` permission for tables, `SELECT` permission  for information_schema
- System heartbeat (optional)
    - Default heartbeat statement: `CREATE DATABASE` permission
