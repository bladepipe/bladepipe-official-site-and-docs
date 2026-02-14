---
id: encrypt_data_when_sync
description: BladePipe supports dynamic data masking in a data pipeline, protecting sensitive data. 
title: Data Masking
---

## Overview

This article introduces how to use BladePipe to mask specified data during data migration and synchronization.

## Highlights

### Custom Code

BladePipe allows users to upload business code to DataJob, in order to transform data during data migration and synchronization.

Data masking is also based on Custom Code and has the following characteristics:

- The masking scope is flexible and any one or more table fields can be selected.
- The masking algorithm can rely on external algorithm packages.
- The masking logic and policy are customizable.

## Procedure

### Step 1: Develop Data Masking Code
1. Develop code in Java IDE. See [Full Code on GitHub](https://github.com/bladepipe/data-process/blob/main/data-transform/src/main/java/com/bladepipe/dataprocess/datatransform/MaskColumn.java).
2. Package the code.

### Step 2: Install BladePipe
Download, install, and activate BladePipe.

### Step 3: Create DataJob
1. Click **DataJob** > **Create DataJob**.
2. Select the source and target databases. Click Next Step.
3. Select Incremental for DataJob, and select Full Data option. Click Next Step.
4. Select tables. Click Next Step.
5. Select columns. Click **Upload Custom Code** in the upper-right corner and upload package.
6. Click Create DataJob.
7. DataJob running normally.
 
### Step 4: Verify the Data
1. Check source and target data. Data has been masked as defined.
2. Do some DMLs, and check source and target data. Data has been masked.

## Limits
Only support Java language, not friendly enough for non-developers.


## Summary

This article introduces how to use BladePipe to mask specified data during data migration and synchronization.