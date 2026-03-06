---
id:  open_mysql_heartbeat
title: Enable MySQL Heartbeat
description: It tells how to enable MySQL heartbeat in Incremental stage when there is no data written to MySQL, so that the latency can be displayed accurately.
---
:::info
This page is also applicable to MariaDB, AuroraMySQL.
:::


This page describes how to enable MySQL heartbeat in Incremental stage when there is no data written to MySQL, so that the latency can be displayed accurately.

## Overview

When moving data from a MySQL instance, if there is no change for a long time, there will be latency displayed on the page.

By enabling MySQL heartbeat, **new UPDATE events are generated continuously in Binlog**, or **heartbeats are updated by checking the offsets**, so that the latency is displayed accurately.

## Procedure

1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. At the **Source** tab, modify the values of the following parameters:
    - Modify the value of **dbHeartbeatEnable** to true.
    - Modify the value of **dbHeartbeatMode** to CHECK_POS.
3. Click **Save** in the upper-right corner.
4. Click **Submit**.

