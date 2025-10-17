---
id: job_replay
title: Replay DataJobs
---

## Overview
BladePipe supports the replay DataJob. Users do not need to recreate the DataJob. 

The following scenarios may require to use DataJob replay:

- When the target database needs to be cleaned up and Full Data needs to be re-executed.
- When previously validated tables need to be re-verified.
- When previously corrected tables need to be re-corrected.

The condition of replay DataJob:

- Reply full migration, verification and correction DataJob are only possible when they are in the **Completed** state.
- For Incremental DataJob, they must be stopped before they can be replay.

## Procedure
Go to the DataJob List page. Click **Replay** in the Operation column.

