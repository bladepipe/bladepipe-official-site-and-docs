---
id: add_job_grafana_dashbord
title: 配置任务 Grafana 监控面板
description: 介绍如何在 Grafana 中配置监控任务的监控面板
---

Grafana 是流行的可视化监控平台，可对接各种监控指标数据源，其中和 Prometheues 配合效果不错。

CloudCanal 任务和系统监控指标均由 Prometheues 采集，所以本文主要介绍如何在 Grafana 中配置 CloudCanal 增量同步核心指标。

## 前置条件

- 目标 CloudCanal 同步任务正常运行，点击任务 **详情** > **增量同步** tab 页 > **性能** 图表正常。
- Grafana 已正确安装并登录，具体信息参考 [官方文档](https://grafana.com/grafana/download) 。

## 操作步骤

1. 登录 Grafana。
2. 点击 **Connections** > **Data sources** > **Add new data source**。
3. 搜索 **Prometheus** 并点击。
4. 填写 **Name** ，如 `prometheus_for_cc`。
5. **Connection** 填写 prometheus 指标查询地址，如 docker 版即 `部署 CloudCanal 节点 ip:9090`。
6. 点击 **Save & rest**。
7. 点击 **Dashboards** > **New dashboard** > **Add visualization**。
8. 配置指标，具体表达式参考重要指标章节。

## 重要指标说明

### 增量任务

| 表达式 | 说明|
| --- | --- |
|`increase(task_incre_dst_insert_count{task_id="2843"}[1m]) / 60` | 增量 Insert RPS(条/秒)|
|`increase(task_incre_dst_update_count{task_id="2843"}[1m]) / 60` | 增量 Update RPS(条/秒)|
|`increase(task_incre_dst_delete_count{task_id="2843"}[1m]) / 60` | 增量 Delete RPS(条/秒)|
|`task_incre_delay_ms{task_id="2843"}`|增量延迟(ms)|
|`task_incre_dst_apply_ms{task_id="2843"}`|对端多语句写入延迟(ms)|
|`task_incre_after_get_from_mem_buffer_ms{task_id="2843"}`|映射、过滤、分区等程序处理延迟(ms)|
|`task_incre_mem_buffer_remain_entry_count{task_id="2843"}`|内存队列数据堆积(事件数)|
|`task_cpu_sys_usage{task_id="2843"}`|任务 cpu 系统使用率(百分比)|
|`task_cpu_user_usage{task_id="2843"}`|任务 cpu 用户使用率(百分比)|
|`task_jvm_heap_max_mb{task_id="2843"}`|任务 jvm 最大堆内内存大小(MB)|
|`task_jvm_heap_used_mb{task_id="2843"}`|任务 jvm 已使用堆内内存大小(MB)|
|`task_jvm_heap_committed_mb{task_id="2843"}`|任务 jvm 可分配堆内内存大小(MB)|
|`task_jvm_non_heap_max_mb{task_id="2843"}`|任务 jvm 最大堆外内存大小(MB)|
|`task_jvm_non_heap_used_mb{task_id="2843"}`|任务 jvm 已使用堆外内存大小(MB)|
|`task_jvm_non_heap_committed_mb{task_id="2843"}`|任务 jvm 可分配的堆外内存大小(MB)|
|`increase(task_jvm_fgc_count{task_id="2843"}[1m]) / 60}`|任务 jvm Full GC 次数|
|`increase(task_jvm_ygc_count{task_id="2843"}[1m]) / 60`|任务 jvm Young GC 次数|
|`increase(task_jvm_fgc_ms{task_id="2843"}[1m]) / 60}`|任务 jvm Full GC 花费的时间(ms)|
|`increase(task_jvm_ygc_ms{task_id="2843"}[1m]) / 60}`|任务 jvm Young GC 花费的时间(ms)|

:::info
部分链路因数据源读写特性，指标有些许差异。   
全量任务和校验任务指标说明后续进行补充。
:::

## FAQ
**Q: 如何获取 task_id?**

**A**: 点击任务 **详情** > **增量同步** tab 页 > **性能** 图表, url 上两个数字，其中第一个数字为 DataJob id , 后一个数字为 DataTask id (即 task_id)。

**Q: CloudCanal 任务监控图标无数据怎么办？**

**A:** 检查 Promethues 是否运行，如正常运行，则查看任务是否正常运行，如通过[查看任务日志](../dailyOP/get_log.md)确认。

**Q: 为何任务指标 tag 有差异?**

**A:** 版本小于等于 4.2.1.0，只有 **job_id** 和 **task_id**，后续的版本新建任务新增 **task_name**，**job_desc** ， **job_level** 等 tag。

