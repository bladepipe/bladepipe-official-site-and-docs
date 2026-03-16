---
id: plans_diff
title: Plans
description: BladePipe offers four plans - Community, Cloud, Enterprise Trial and Enterprise. They differ in features, use cases and prices.
---

BladePipe offers both **free** and **paid** plan options. The paid plan is detailed in the [Pricing](product_price.md) document.

This page provides a concise comparison of the differences between these plan options to help users make an informed choice.

## Overview

- **Community**: On-premise deployment with limited functionality. **5-[links](../reference/service_difference.md)** license, **free for long-term use**, but requires [reactivation](../license/license_use.md) **every 3 months**. Suitable for initial trials of data migration and sync projects.
- **Cloud**: Supports both Managed and BYOC deployment models, with functionality identical to the Enterprise edition. Significantly reduces operational and maintenance costs, ideal for individual projects and small to medium-sized teams. For costs, see [Pricing](product_price.md#cloud-managed--byoc).
- **Enterprise Trial**: On-premise deployment with functionality identical to the **Enterprise** version, including a free **3-month** trial and **30-links** licenses, suitable for feasibility validation.
- **Enterprise**: On-premise deployment with full functionality and technical support services, suitable for enterprise-grade data pipeline. For costs, see [Pricing](product_price.md#enterprise-on-premise).

## Feature Comparison

<table>
<thead>
  <tr>
    <th colspan="2" align="center">Feature</th>
    <th align="center">Community</th>
    <th align="center">Cloud</th>
    <th align="center">Enterprise Trial</th>
    <th align="center">Enterprise</th>
  </tr>
</thead>

<tbody>
  <tr>
    <th>Pricing</th>
    <th>/</th>
    <td align="center"><b>Free</b>&nbsp;&nbsp;<sup>[1]</sup></td>
    <td align="center">Paid</td>
    <td align="center">Free</td>
    <td align="center">Paid</td>
  </tr>
  <tr>
    <th rowspan="4">Resouces</th>
    <th>Links&nbsp;&nbsp;<sup>[2]</sup></th>
    <td align="center">5</td>
    <td align="center">30</td>
    <td align="center">30</td>
    <td align="center">By Contract</td>
  </tr>
  <tr>
    <th>Tables of Link</th>
    <td align="center">&le;500</td>
    <td align="center">No Limit</td>
    <td align="center">No Limit</td>
    <td align="center">No Limit</td>
  </tr>
  <tr>
    <th>License Count</th>
    <td align="center">&le;3</td>
    <td align="center">-</td>
    <td align="center">No Limit</td>
    <td align="center">No Limit</td>
  </tr>
  <tr>
    <th rowspan="1">DataSources</th>
    <th><a href="../../dataMigrationAndSync/datasource_version">60+</a></th>
    <td align="center" colspan="3">60+ <b>plus Oracle、SAP HANA、OceanBase for Oracle、SQL Server</b></td>
  </tr>
  <tr>
    <th rowspan="5">Basic Functions</th>
    <th>Schema Migration</th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/create_job/create_full_incre_task">Data Migration</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/create_job/create_full_incre_task">Data Sync</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/create_job/create_period_verification_correction_job">Data Verification and Correction</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/create_job/create_full_incre_task">DDL Sync</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th rowspan="8">Advanced Functions</th>
    <th><a href="../../operation/job_manage/create_job/create_process_job">Custom Code</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../bestPractice/mysql_loop_data_sync">Two-way Sync</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/job_op/data_transform">Data Transform</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/job_op/visual_widetable_create">Data Joint</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th>Data lineage</th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/job_op/job_transfer">DataJob Import</a></th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">-</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th>Open API</th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/job_op/job_group">DataJob Group</a></th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th rowspan="6">Security</th>
    <th><a href="../../operation/job_setting/operate_audit">Operation Audit</a></th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th>RBAC</th>
    <td align="center">-</td>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/system_manage/mfa_usage">MFA</a></th>
    <td align="center">-</td>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../../operation/job_manage/job_op/job_alarm">Alert</a></th>
    <td align="center">-️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th>High Availability</th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
</tbody>
</table>

:::info
**1.** The Community is **authorized for a period of 3 months at a time**. Before the 3-month authorization expires, you can log in to BladePipe to reapply for the license and extend the validity period free of charge.

**2.** For different DataSources, the granularity of a link varies. For details, please refer to [Granularity and Specifications](..//reference/service_difference.md).
:::

## Note
- Community edition can be upgraded to Enterprise Trial or Enterprise edition.
- Enterprise Trial edition can be upgraded to Enterprise edition, but it **CANNOT** be downgraded to Community Edition.
- Enterprise edition **CANNOT** be downgraded to either Enterprise Trial edition or Community Edition.