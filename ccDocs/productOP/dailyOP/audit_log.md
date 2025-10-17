---
id: audit_log
title: 查看审计日志
---
CloudCanal 支持对任何用户、任何任务的关键操作进行记录，以便用户回溯操作行为。本文介绍如何根据控制台操作审计信息定位到操作审计日志。

## 简介
当前支持查看审计日志的操作动作包括：
- 任务相关操作：创建任务、添加校验任务、增量/全量阶段修改订阅、更新任务参数、更新位点、重置位点。
- 账号权限及数据源相关操作：查看数据源配置、更新数据源配置、更新数据源描述。

## 操作步骤

1. 查看控制台操作审计列表。
   - 任务相关操作审计：点击 **同步设置** > **操作审计**。
   - 账号权限及数据源相关操作审计：点击 **系统设置** > **操作审计**。
2. 查看日志唯一信息。  
操作日志页面提供了 **日志唯一信息**，可以根据此信息定位操作日志。日志唯一信息的说明如下：

   ```json
   {"type":"操作动作","key":"唯一标识 key","resId":"操作任务 id"}
   ```

- 操作动作：日志所对应的操作类型。
- 唯一标识 key：用于在操作审计日志中查询当前操作日志的唯一标识。
- 操作任务 id：记录该操作审计所属任务id。

3. 追溯详细操作信息。
   1. 在控制台（Console）服务器中执行以下命令以获取审计日志，其中 **唯一标识 key** 即日志唯一信息格式中的 key：<br/>
```cat /home/clougence/logs/cloudcanal/console/user_audit_detail.log | grep { 唯一标识 key }```

   2. 返回结果为当前操作的审计日志。
 
   :::info
   仅支持查看未归档的日志。若日志已归档，请在对应的日志服务器上查看，路径为 ~/logs/cloudcanal/console/fileName。
   :::
  
## 审计日志解读
为方便解读日志，可参考以下日志关键信息的相关解释。
<table>
<thead>
<tr>
<th>操作类型</th>
<th>日志关键信息</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="4">通用</td>
<td>DataTime</td>
<td>修改参数生效的时间</td>
</tr>
<tr>
<td>uid</td>
<td>修改参数执行人 id，对应控制台-操作审计中的操作者</td>
</tr>
<tr>
<td>key</td>
<td>唯一标识 key，用于定位查找</td>
</tr>
<tr>
<td>dataJobId</td>
<td>任务 id</td>
</tr>
<tr>
<td rowspan="4">创建任务</td>
<td>jobType</td>
<td>任务类型</td>
</tr>
<tr>
<td>reSchemaMigration</td>
<td>是否创建 schema</td>
</tr>
<tr>
<td>sourceSchema</td>
<td>源端表</td>
</tr>
<tr>
<td>targetSchema</td>
<td>目标端表</td>
</tr>
<tr>
<td rowspan="3">添加校验任务</td>
<td>checkPeriod</td>
<td>是否开启周期性校验</td>
</tr>
<tr>
<td>checkPeriodCronExpr</td>
<td>周期性校验任务的周期（cron 表达式）</td>
</tr>
<tr>
<td>dataReviseType</td>
<td>校验订正模式</td>
</tr>
<tr>
<td rowspan="10">修改订阅</td>
<td>structMigration</td>
<td>是否结构迁移</td>
</tr>
<tr>
<td>initialSync</td>
<td>是否同步</td>
</tr>
<tr>
<td>srcSchemaWithoutAdd</td>
<td>修改前源端库表结构配置信息</td>
</tr>
<tr>
<td>dstSchemaWithoutAdd</td>
<td>修改前对端库表结构配置信息</td>
</tr>
<tr>
<td>mappingConfigWithoutAdd</td>
<td>修改前源对端映射配置信息</td>
</tr>
<tr>
<td>sourceAddConfig</td>
<td>新增源端库表结构配置信息</td>
</tr>
<tr>
<td>targetAddConfig</td>
<td>新增对端库表结构配置信息</td>
</tr>
<tr>
<td>targetReduceConfig</td>
<td>删除的对端库表结构配置信息</td>
</tr>
<tr>
<td>addMappingConfig</td>
<td>新增源对端映射配置信息</td>
</tr>
<tr>
<td>reduceMappingConfig</td>
<td>删除的源对端映射配置信息</td>
</tr>
<tr>
<td rowspan="3">修改参数/查看数据源配置</td>
<td>configName</td>
<td>参数名称</td>
</tr>
<tr>
<td>configValue</td>
<td>修改后的参数值</td>
</tr>
<tr>
<td>needCreate</td>
<td>是否需要新建，一般为 false，新版本有新增会自动创建</td>
</tr>
<tr>
<td rowspan="5">更新/重置位点</td>
<td>posType</td>
<td>位点类型</td>
</tr>
<tr>
<td>journalFile</td>
<td>日志文件名称</td>
</tr>
<tr>
<td>filePosition</td>
<td>文件位点</td>
</tr>
<tr>
<td>gtidPosition</td>
<td>GTID 位点</td>
</tr>
<tr>
<td>positionTimestamp</td>
<td>时间戳位点</td>
</tr>
<tr>
<td>更新数据源描述</td>
<td>instanceDesc</td>
<td>修改后的数据源描述</td>
</tr>
<tr>
<td rowspan="2">更新数据源配置</td>
<td>updateConfigs</td>
<td>修改后的参数值</td>
</tr>
<tr>
<td>needCreateConfigs</td>
<td>需新建的配置信息</td>
</tr>
</tbody></table>


以 **修改参数** 的审计操作日志为例：

```text
[DataTime: 2024-08-06 14:41:23 uid:"6258151610403310" key:"202408061441239221a7a8"]
[{"dataJobId":35,"configName":"specId","configValue":"15","endPointType":"INDEPENDENT","configType":"SERVER_CORE","needCreate":false}]
```
     
日志解读结果：   
> id 为 6258151610403310 的用户在 2024 年 8 月 6 日 14:41:23，对任务 35 进行修改参数操作，修改内容为将 specId 参数值调整到 15。

