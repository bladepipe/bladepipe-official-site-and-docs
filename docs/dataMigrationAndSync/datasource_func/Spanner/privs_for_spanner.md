---
id: privs_for_spanner
title: Privileges Required for Spanner
description: This document describes the account privileges required by BladePipe when Spanner is used as a source or target data source.
---

This document describes the account privileges required by BladePipe when Spanner is used as a source or target data source.

## As Source

### Authentication

A Google Cloud Service Account JSON credential with sufficient permissions to access the Spanner instance and database needs to be provided.

### Required IAM Roles (Least Privilege Configuration)

To adhere to the principle of least privilege and provide the most secure deployment environment, BladePipe defaults to requiring a **Custom IAM Role** in Google Cloud that specifically contains the exact minimum permissions needed.

Because BladePipe automatically creates and manages the Change Streams and internal state structures in the background, the following permissions are the absolute baseline required for successful synchronization.

```
spanner.sessions.create
spanner.sessions.get
spanner.sessions.list
spanner.sessions.delete
spanner.databases.read
spanner.databases.select
spanner.databases.beginReadOnlyTransaction
spanner.databases.updateDdl
spanner.databaseOperations.get
monitoring.timeSeries.create
```

:::info
The underlying incremental extraction engine relies on the Cloud Spanner Change Streams API. It actively writes client-side metrics to Google Cloud Monitoring during execution and accesses monitoring metrics to obtain stream partition states, ensuring continuous data capture.
:::
