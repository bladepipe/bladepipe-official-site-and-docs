---
id: product_version
title: 产品版本
description: CloudCanal 四个版本（社区版、SaaS 版、商业试用版、商业版）的介绍与对比。
---
CloudCanal 目前提供四种版本的产品，分别为 **社区版**、**SaaS 版**、**商业试用版** 和 **商业版**，用户可根据业务需求选择相应版本。

本文介绍四种版本的特点与功能对比。

## 版本特点

- **社区版**：私有部署，功能受限，任务数等授权数量有限，**可长期免费使用**，适用于数据迁移同步项目的初步尝试。
- **SaaS 版**：支持 **全托管** 和 **BYOC** 方式，功能与商业版一致，大幅降低运维成本，适用于个人项目及中小型团队使用。费用参考 [产品定价](../price/product_price.md#saas-定价)。
- **商业试用版**：私有部署，功能与商业版一致，提供商业版免费试用 **3** 个月，**30** 个任务授权，适用于 POC 验证。
- **商业版**：私有部署，功能完整，提供技术支持服务，适用于企业级的数据管道搭建。费用参考 [产品定价](../price/product_price.md#商业版定价)。

## 功能对比
<table>
<thead>
  <tr>
    <th colspan="2" align="center">功能</th>
    <th align="center">社区版</th>
    <th align="center">SaaS 版</th>
    <th align="center">商业试用版</th>
    <th align="center">商业版</th>
  </tr>
</thead>

<tbody>
  <tr>
    <th rowspan="4">资源</th>
    <th>同步任务数</th>
    <td align="center">5 个<sup>[1]</sup></td>
    <td align="center">30 个</td>
    <td align="center">30 个</td>
    <td align="center">合同/订单约定</td>
  </tr>
  <tr>
    <th>单任务表数量限制</th>
    <td align="center">500 张</td>
    <td align="center">无限制</td>
    <td align="center">无限制</td>
    <td align="center">无限制</td>
  </tr>
  <tr>
    <th>部署机器绑定</th>
    <td align="center">绑定硬件</td>
    <td align="center">-</td>
    <td align="center">绑定硬件</td>
    <td align="center">绑定硬件(但可变更)</td>
  </tr>
  <tr>
    <th>单账号激活License数</th>
    <td align="center">最多3个</td>
    <td align="center">-</td>
    <td align="center">无限制</td>
    <td align="center">无限制</td>
  </tr>
  <tr>
    <th rowspan="1">数据源</th>
    <th><a href="../dataMigrationAndSync/datasource_version">支持的数据源</a></th>
    <td align="center">60+</td>
    <td align="center" colspan="3">60+（社区版基础上还支持 <b>Oracle、SAP HANA、OceanBase for Oracle、SQL Server</b>）</td>
  </tr>
  <tr>
    <th rowspan="5">基础功能</th>
    <th>结构迁移</th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/create_job/create_full_incre_task">全量迁移</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/create_job/create_full_incre_task">增量同步</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/create_job/create_verification_correction_job">数据校验与订正</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/create_job/create_full_incre_task">DDL 同步</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th rowspan="8">高级功能</th>
    <th><a href="../operation/job_manage/create_job/create_process_job">自定义代码</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../bestPractice/mysql_loop_data_sync">双向同步</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/job_op/data_transform">清洗转换数据</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/job_op/visual_widetable_create">可视化打宽表</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th>元数据(血缘)查询</th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/job_op/job_transfer">系统迁移</a></th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">-</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th>开放 API</th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/job_op/job_group">任务组</a></th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th rowspan="6">安全</th>
    <th><a href="../operation/job_setting/operate_audit">任务操作审计</a></th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/system_manage/operation_audit_rdp">系统操作审计</a></th>
    <td align="center">-</td>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/system_manage/account_and_auth/role_auth">RBAC 能力</a></th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/system_manage/mfa_usage">MFA 登录验证</a></th>
    <td align="center">-</td>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/job_manage/job_op/job_alarm">任务告警</a></th>
    <td align="center">-️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th>任务高可用</th>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th>定制功能</th>
    <th>定制开发和服务</th>
    <td align="center">-</td>
    <td align="center">-</td>
    <td align="center">-</td>
    <td align="center">合同约定</td>
  </tr>
  <tr>
    <th rowspan="2">系统管理</th>
    <th><a href="../operation/system_manage/env_manage">环境管理</a></th>
    <td align="center">✔️</td>
    <td align="center">-</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
  <tr>
    <th><a href="../operation/system_manage/preference">个人偏好设置</a></th>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
    <td align="center">✔️</td>
  </tr>
</tbody>
</table>

:::info
1. 针对不同数据源，单个任务的粒度不同，详情请参考 [**任务粒度和规格说明**](../reference/service_difference.md)。
:::

## 商业版功能特点
### 单任务资源无限制
CloudCanal 商业版单个任务中的表数量无限制，且控制台部署机器可变更，相较于社区版，单个任务能承载海量数据的传输，具有更高的灵活度，适合企业级数据集成平台构建。

### 数据源支持更丰富
在支持的数据源方面，商业版在社区版基础上，还支持 **Oracle** 源端和目标端、**SAP HANA** 源端，**OceanBase for Oracle** 源端和目标端以及 **SQL Server** 源端和目标端数据源，满足更多企业用户的实际业务需求。

### 数据任务轻松导入
CloudCanal 商业版支持数据任务导入。在 CloudCanal 版本升级，或系统迁移到新机器后，无需重新配置数据任务，填写相关信息后即可快速导入任务，实现数据任务的无缝迁移，减轻了操作人员的工作，大幅减少手动迁移任务导致的纰漏。关于该功能的更多信息，请参考 [导入数据任务](../operation/job_manage/job_op/job_transfer.md)。

### 全程操作可追溯
CloudCanal 商业版支持对任务、数据源及系统相关的操作进行审计，记录每一步重要操作的操作人员、时间等信息，保证全程可追溯，提高团队使用数据源的安全性。对于部分重要操作，还可以在线查看日志，操作审计更加便捷。关于该功能的更多信息，请参考 [查询任务操作审计](../operation/job_setting/operate_audit.md) 和 [查询系统操作审计](../operation/system_manage/operation_audit.md)。

### 元数据一键查询
CloudCanal 商业版支持检索元数据，可清晰地展现数据任务中关联的表、目标主键及过滤条件的设置。在运行大量数据任务的情况下，不用再逐个任务查看上述信息，一键查询，所有信息便可一目了然，大大节省了工作人员的时间和精力。

### 任务组管理
CloudCanal 商业版支持任务组功能。当前任务组分为业务组和并行组两种。业务组可帮助用户查看并管理具有业务关联性的一组任务；并行组可使用多个任务对相同的表数据进行分区迁移同步，当迁移同步海量数据时可有效提升同步效率。关于该功能的更多信息，请参考 [使用任务组](../operation/job_manage/job_op/job_group.md)。
