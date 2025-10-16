---
id:  open_kafka_heartbeat
title: Enable Kafka Heartbeat
---
:::info
This feature is also applicable to AutoMQ.
:::


## Overview

When synchronizing data from Kafka, if there's no data change in Kafka for a long time, there will be latency displayed on the page.

By enabling Kafka heartbeat, BladePipe can calculate the actual latency by checking the heartbeat updates.

This article describes how to enable the heartbeat during the data synchronization phase when there is no data write to the Source, so that latency displayed on the page can be accurate.


## Procedure
1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. At the **Source** tab, modify the value of parameter **dbHeartbeatEnable** to true.
3. Click **Save** in the upper-right corner.
4. Click **Submit**.