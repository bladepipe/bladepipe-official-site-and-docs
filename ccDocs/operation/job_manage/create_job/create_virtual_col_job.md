---
id: create_virtual_col_job
title: 虚拟列任务
---

CloudCanal 支持在任务创建过程中为目标端添加虚拟列，以实现[多来源数据汇聚](../../../bestPractice/data_gather_use_virtual_cols.md)等目标。

本文简要介绍如何在创建任务时添加虚拟列。

## 支持的虚拟列
<table>
  <thead>
    <tr>
      <th>虚拟列种类</th>
      <th>说明</th>
      <th>有效的操作</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>指定具体值</td>
      <td>可指定特定的数字、字符串生成新列，写入到对端</td>
      <td rowspan="8">INSERT, UPDATE, DELETE</td>
    </tr>
    <tr>
      <td>数据迁移或同步时间</td>
      <td>以数据到达 CloudCanal 的时间生成新列，写入对端</td>
    </tr>
    <tr>
      <td>源端实例ID_SCHEMA_表_主键值</td>
      <td>按照源端数据源 <strong>实例ID</strong>，<strong>Schema</strong>，<strong>表</strong> 和 <strong>主键值</strong> 做拼接生成新列，写入对端</td>
    </tr>
    <tr>
      <td>源端实例ID_DB_SCHEMA_表_主键值</td>
      <td>按照源端数据源 <strong>实例ID</strong>，<strong>Catalog</strong>，<strong>Schema</strong>，<strong>表</strong> 和 <strong>主键值</strong> 做拼接生成新列，写入对端</td>
    </tr>
    <tr>
      <td>源端实例DB_SCHEMA_表_主键值</td>
      <td>按照源端数据源 <strong>Catalog</strong>，<strong>Schema</strong>，<strong>表</strong> 和 <strong>主键值</strong> 做拼接生成新列，写入对端</td>
    </tr>
    <tr>
      <td>源端实例SCHEMA_表_主键值</td>
      <td>按照源端数据源 <strong>Schema</strong>，<strong>表</strong> 和 <strong>主键值</strong> 做拼接生成新列，写入对端</td>
    </tr>
    <tr>
      <td>源端实例表_主键值</td>
      <td>按照源端数据源 <strong>表</strong> 和 <strong>主键值</strong> 做拼接生成新列，写入对端</td>
    </tr>
    <tr>
      <td>转换表达式</td>
      <td>
        按照预设的脚本转换数据，支持的转换规则请参考
        <a href="https://www.clougence.com/docs/operation/job_manage/job_op/data_transform#%E5%BD%93%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E8%84%9A%E6%9C%AC">当前支持的脚本</a>
      </td>
    </tr>
  </tbody>
</table>



## 操作步骤
### 选择数据源

1. 点击 **同步任务** > **创建任务**，进入创建任务流程。
2. 设置源库和目标库相关信息，选择源端和目标端实例，并分别点击 **测试连接**。
3. 选择数据库或 Schema 等信息，部分链路支持多 Schema。
4. 点击 **下一步**。

### 配置任务

1. 在功能配置页面，选择任务类型。默认选择 **增量同步** 并勾选 **全量初始化**。
2. 选择任务规格。默认规格适配大部分场景。
3. 点击 **下一步**。

### 选择数据表

1. 在表 & action 过滤页面，选择要迁移的表。
2. 在表格右上方点击 **打开操作黑名单**，可过滤各类 DML/DDL 操作。
3. 点击 **下一步**。

### 选择列

1. 在数据处理页面的左侧选择一张表，并勾选要迁移的列。
2. 添加虚拟列：
   - 单独设置：在左侧点击 **操作** > **虚拟列**，为这张表设置虚拟列的名称、值、类型、长度等信息。
   - 批量操作：在右上角点击 **批量操作** > **虚拟列**，为多张表统一设置虚拟列的名称、值、类型、长度等信息。
:::info
- 支持对一张表添加多个虚拟列。
- 如果对端不存在相应表，CloudCanal 进行结构迁移时会自动创建虚拟列；如果对端已存在相应表，则需要先自行在对端创建相应的虚拟列，再进行虚拟列设置。
:::


### 创建确认
1. 在创建确认页面，确认任务信息。
2. 确认无误后，点击 **创建任务**。

### 查看任务

1. 在 **同步任务** 的任务列表页可查看任务进度。
2. 点击任务列表操作栏中的 **详情** 进入任务详情页，查看具体任务运行信息。