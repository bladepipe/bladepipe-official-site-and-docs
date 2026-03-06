---
id: verification_and_correction
description: It introduces how to use BladePipe to perform data verification and correction.
title: Data Verification and Correction
---

## Overview

This article introduces how to use BladePipe to perform data verification and correction.

## Highlights

### Compare Field by Field

BladePipe scans the data through the source DataSource, finds out the data from the target database in batches, compares it field by field, finds out the loss and diff data, and records it in the log.

Solve problems such as scanning efficiency, field type compatibility, and type accuracy matching.

### Overriding Correction

With override correction in the target database, the correction capability can be turned on for the target DataSource that has REPLACE capability.

The corrected data is differential data, that is, the verification result of the verification DataTask.

### All In One

Verification and Correction is performed as a two-step DataJob, similar to the relationship between Full Data and Incremental in a data synchronization DataJob.

The Correction step can be ignored when creating a DataJob and added to the DataJob after the Verification is completed.

### Replay

The Verification and Correction DataJob supports replay, after the Correction step is run, need to see the effect, click the Replay button to execute again.

### Scheduled Execution

The Verification and Correction DataJob supports regular starting, automatically record results while completing corresponding step, and clean up associated logs.

## Procedure

### Step 1: Install BladePipe
Download and install BladePipe. 

### Step 2: Create Incremental DataJob
1. Click **DataJob** > **Create DataJob**.
2. Select the source and target DataSources, click Next Step.
3. Select Incremental for DataJob, and select Full Data option. Click Next Step.
4. Select tables and columns, click Next Step.
5. Click **Create DataJob**.
6. Schema migration, full data and incremental DataTasks are running.

### Step 3: Create Data Differences

In the target DataSource, delete and modifie some data.

### Step 4: Create Verification & Correction DataJob

1. Go to the DataJob Details page. Click **Functions** > **Create Similar DataJob**.
2. In the second step, select the Verification and Correction, and select **Revise After Check** option, and other steps do not need to be changed.
3. The Verification and Correction DataJob finishes and displays the status.
4. Replay the Verification and Correction DataJob, and data is consistent.


## Limits

- For the extra data in the target database, it cannot be verified, and you need to configure a reverse verification DataJob to solve it.
- For no primary key and timestamp type tables, verification is ignored by default. The former cannot locate the data, and the latter is difficult to locate due to the difference in time accuracy.
- If the target DataSource does not have the REPLACE capability, the Correction DataTask cannot be created.
- If the source table does not have a primary key, the Correction DataTask cannot be created.


## Summary

This article introduces use BladePipe to do data verification and correction, and supports Verification and Correction integration, single/scheduled execution, and more.