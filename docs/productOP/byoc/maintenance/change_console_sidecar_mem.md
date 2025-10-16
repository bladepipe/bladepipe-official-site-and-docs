---
id: change_console_sidecar_mem
title: Adjust Worker Memory
description: BladePipe supports adjusting the memory of the Console or Sidecar processes to handle large amounts of tables or specific scenarios.
---

Sometimes, the Workers may experience latency or OOM (Out of Memory) due to a large number of databases or certain situations, and it may be necessary to increase the memory to ensure stable operation. This article describes how to adjust the memory of a Worker.

## Procedure

1. Log on to the Worker container of BladePipe.
2. Find the startup script.
    ```
    /home/bladepipe/bladepipe/worker/bin/startSidecar.sh
    ```
1. Edit the script. Find the `JVM_HEAP_SIZE_MB` variable, and modify the memory size. It is recommended to change it to 1-2 GB.
2. Restart the Worker.
    ```
    sh startSidecar.sh
    ```