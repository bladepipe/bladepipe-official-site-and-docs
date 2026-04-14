---
id: plans_diff
title: Plans
description: BladePipe offers four plans - Community, Cloud, Enterprise Trial, and Enterprise. They vary in features, use cases, and pricing.
---

BladePipe offers four plans: **Community**, **Cloud**, **Enterprise Trial**, and **Enterprise**. They vary in features, use cases, and [pricing](product_price.md).

This page compares the available plans to help you choose the best fit for your data integration needs.

## Overview

- **Community**: A free, on-premise deployment with limited features. It provides a **[5-link](../reference/service_difference.md)** license for long-term use. You must [reactivate](../license/license_use.md) the license **every 3 months**. It suits initial trials and small-scale data projects.
- **Cloud**: Supports both Managed and BYOC deployment models. It offers identical features to the Enterprise edition while reducing maintenance overhead. It perfectly fits small to medium-sized teams. For detailed costs, see [Pricing](product_price.md#cloud-managed--byoc).
- **Enterprise Trial**: A free, on-premise evaluation containing all **Enterprise** features. It includes a **30-link** license for **3 months**. It allows complete feasibility testing before purchase.
- **Enterprise**: An on-premise deployment providing complete functionality and dedicated technical support. It handles large-scale, enterprise-grade data pipelines. For detailed costs, see [Pricing](product_price.md#enterprise-on-premise).

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
    <th rowspan="4">Resources</th>
    <th>Links&nbsp;&nbsp;<sup>[2]</sup></th>
    <td align="center">5</td>
    <td align="center">30</td>
    <td align="center">30</td>
    <td align="center">By Contract</td>
  </tr>
  <tr>
    <th>Tables per Link</th>
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
    <th align="center" colspan="4"><a href="../../dataMigrationAndSync/datasource_version">60+</a></th>
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
    <th>Data Lineage</th>
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
- **1.** The Community license remains **valid for 3 months per activation**. You can log into BladePipe before expiration to [reapply and extend your free access](../license/license_use.md).
- **2.** The technical definition of a "link" varies across different data sources. See [Granularity and Specifications](../reference/service_difference.md) for details.
:::

## Notes

- You can upgrade the **Community** plan to the **Enterprise Trial** or **Enterprise** plan.
- You can upgrade the **Enterprise Trial** to the **Enterprise** plan. You **CANNOT** downgrade it to the **Community** plan.
- The **Enterprise** plan **CANNOT** be downgraded to the **Enterprise Trial** or **Community** plan.