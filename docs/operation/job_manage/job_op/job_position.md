---
id: job_position
title: Reset Position
description: It guides you to reset the position in case you need to re-consume data or skip current data.
---

BladePipe supports the clear and reset of position to handle scenarios where it is necessary to re-consume previous data or skip current data.

To resynchronize data from a previous period of time, you can reset the position.

## Procedure

1. Stop the DataJob when it is in the Incremental phase.
2. Click **Reset Position**.
3. Select the **Position type** and fill in the relevant position information.
4. Click **Submit**. The position has been successfully rolled back.
5. Start the task and it will synchronize based on the set position.
