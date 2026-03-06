---
id: oversell_mac_memory
title: Overcommit Memory
description: It describes how to adjust the overcommit ratio for Workers in BladePipe.
---

BladePipe creates DataTask that pre-allocate memory, with the scheduling mechanism reserving 10% of the memory by default. This can lead to DataTask creation failures due to insufficient Worker memory (as determined by logic).

When encountering such issues, common solutions include **reducing the memory size of the DataTask**, **removing stopped incremental DataTask (in commercial settings)**, **downgrading the specifications of already running DataTask**, **deleting unnecessary DataTask**.

However, there are times when these methods do not work, and the actual Worker memory has sufficient space (since running tasks have not fully occupied the pre-allocated memory). In such cases, it is possible to adjust the overcommitment of memory for BladePipe Workers.

The following steps provide a brief overview of how to adjust the overcommitment parameters. It should be noted that an excessively high overcommitment ratio may lead to insufficient memory for running DataTask, resulting in the operating system killing them. Therefore, caution is advised.

## Procedure
1. In the top navigation bar, click **Sync Settings** > **Sync Worker**.
2. Select the corresponding cluster and click **Workers** in the Operation column.
3. On the corresponding Worker card, click the icon ![](../../../assets/function/mac_oversell_2.png) and modify **Overcommit Ratio**.
