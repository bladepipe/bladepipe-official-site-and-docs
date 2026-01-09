---
id: sync_online_ddl
title: 同步 Online DDL
description: 当任务源端使用 GH-OST、PT-OSC、ALI_DMS 无锁变更工具执行 Online DDL 时，任务默认不会同步工具生成的临时表。通过参数配置，用户可订阅临时表，同时支持 Online DDL 转换为普通 DDL、并行执行及灵活执行策略，实现高效可靠的 DDL 同步。
---

## 功能说明
任务源端数据源使用（GH-OST、PT-OSC、阿里云 DMS 无锁变更）Online DDL 工具做 DDL 时，任务默认不会同步工具产生的临时表，这将导致任务 DDL 同步异常，用户可设置参数来主动订阅临时表。

为优化 Online DDL 同步性能，CloudCanal 支持 Online DDL 转换机制，可将 Online DDL 操作直接转换为对原始表的普通 DDL，从而避免目标端重放临时表操作，降低同步开销。

## 参数说明
| 参数 | 说明 |
| -- | -- |
| **extraDDL** | 订阅额外临时表，取值为：<ul><li><b>NONE</b>：不订阅 Online DDL 临时表（默认）</li><li><b>PT</b>：订阅 PT-OSC 产生的临时表</li><li><b>GHOST</b>：订阅 GH-OST 产生的临时表</li><li><b>ALI_DMS</b>：订阅阿里云 DMS 无锁变更产生的临时表</li><li><b>PT_GHOST</b>：同时订阅 PT-OSC + GH-OST 两类临时表（混用场景）</li></ul> |
| **onlineDdlConvert** | 将临时表的变更转换为原始表变更，取值为：<ul><li><b>true</b>：开启 Online DDL 转换</li><li><b>false</b>：不开启 Online DDL 转换</li></ul> |
| **onlineDdlBackupDb** | 源端执行 Online DDL 所使用的备份库名称，默认为空，则源端 Online DDL 操作在原始表所在库下执行 |
| **onlineDdlTempTableRegex** | MySQL 在线变更 DDL 工具（GH-OST、PT-OSC、阿里云 DMS）所使用的临时表正则表达式，默认为空则不使用正则表达式 |


## 操作说明
### 订阅临时表
#### 单个任务应用
该配置方法适用于已创建任务：
1. 进入任务详情页，点击 **功能列表** > **修改参数**。
2. 搜索 **extraDDL**。根据使用的 Online DDL 工具，设置对应的[参数值](#参数说明)。
  ![use_extraDDL](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/sync_online_ddl/use_extraDDL.png)
3. 点击右上角 **生效配置**，修改成功，任务将订阅 Online DDL 工具临时表。
  

#### 系统全局应用
该配置方法适用于后续新建任务：
1. 点击 **配置** > **个人偏好**。
2. 在 CloudCanal 页签下找到 **extraDDL**，根据使用的 Online DDL 工具，设置对应的[参数值](#参数说明)。
   ![use_extraDDL](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/sync_online_ddl/set_preference.png)
3. 点击 **保存**，修改成功。后续所有支持该参数的新建任务都将订阅 Online DDL 工具临时表。

### 转换 Online DDL
1. 进入任务详情页，点击 **功能列表** > **修改参数**。
2. 搜索 **onlineDdlConvert**，将参数值设置为 true。
3. 点击右上角 **生效配置**，修改成功，任务会将 Online DDL 转换为普通 DDL。

### 在指定库执行 Online DDL
1. 进入任务详情页，点击 **功能列表** > **修改参数**。
2. 搜索 **onlineDdlBackupDb**，将参数值修改为指定执行 Online DDL 的数据库名。  
3. 点击右上角 **生效配置**，修改成功，可以识别在指定库下的 Online DDL 操作。


### 并行执行 Online DDL
在高并发场景下，多张表或同一张表可能同时执行多个 Online DDL，binlog 顺序可能交叉，增加解析难度。    
可通过以下操作正确地并行执行 Online DDL：
  - **gh-ost**：
    1. 在执行 Online DDL 时指定 `--force-table-names={原始表名}_{任意数字}`。`{原始表名}` 需手动替换为需要执行 Online DDL 的原始表名，`{任意数字}`需手动替换为任意数字。
    2. 进入 CloudCanal 任务详情页，点击 **功能列表** > **修改参数**。 
    3. 搜索 **onlineDdlTempTableRegex**，设置正则表达式为 `^[~_](?<tableName>.+?)_(?<changeId>\d+)_(?<flag>gho)$`，与 gh-ost 生成的临时表名对应。
  + **pt-osc**：
    1. 在执行 Online DDL 时指定`--new-table-name=_%T_{任意数字}_new`。 `%T` 会被 pt-osc 自动替换为原始表名，同时 `{任意数字}` 需手动替换为任意数字。
    2. 进入 CloudCanal 任务详情页，点击 **功能列表** > **修改参数**。 
    3. 搜索 **onlineDdlTempTableRegex**，设置正则表达式为 `^_(?<tableName>.+?)_(?<changeId>\d+)_(?<flag>new)$`，与 pt-osc 生成的临时表名对应。
  + **DMS**：CloudCanal 自动解析变更 ID，区分不同 Online DDL。 
  

  