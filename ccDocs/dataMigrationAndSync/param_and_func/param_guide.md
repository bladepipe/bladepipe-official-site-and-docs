---
id: param_guide
title: 通用参数
description: CloudCanal 通用参数与功能
---
CloudCanal 支持[配置任务参数](../../operation/job_manage/job_op/job_params.md)，用于控制任务配置、并发、错误处理等。合理配置任务参数能够提升数据同步效率。

CloudCanal 任务参数主要分为任务核心配置、源数据源配置、目标数据源配置、映射配置四类，本文主要对 **任务核心配置参数** 进行说明，帮助用户快速理解并正确配置参数。

## 参数说明
| 参数        | 说明   |
| --         |  --    |
| specId     | 任务规格，即任务进程分配的内存大小，取值为：<ul><li>15：占用 1GB 内存</li><li>16：占用 2GB 内存</li><li>17：占用 3GB 内存</li><li>18：占用 4GB 内存</li><li>19：占用 512MB 内存</li><li>20：占用 5GB 内存</li><li>21：占用 6GB 内存</li><li>22：占用 7GB 内存</li><li>23：占用 8GB 内存</li><li>24：占用 12GB 内存</li><li>25：占用 16GB 内存</li><li>26：占用 20GB 内存</li></ul>      |
| exceptionSkipMode | 任务异常忽略模式，取值为：<ul><li><b>NONE</b>：不忽略异常</li><li><b>ApplierHandlerException</b>：忽略增量日志解析异常（目标端写入出错时跳过该条记录继续执行） </li><li><b>ApplierHandlerWithKeywords</b>：按异常消息中的关键字忽略异常（仅当异常消息包含指定关键字时才忽略） </li><li><b>ALL</b>：忽略所有已知异常类型（高风险模式，仅在测试或数据一致性要求不高的场景使用） </li></ul>      |
| ddlExceptionSkip | 是否忽略对端 DDL 执行异常，取值为：<ul><li><b>true</b>：忽略</li><li><b>false</b>：不忽略</li></ul>       |
| exceptionSkipKeywords | 当 `exceptionSkipMode` 设为 `ApplierHandlerWithKeywords` 时，在此配置需要忽略异常的关键字列表，组成一个 json array 字符串。<br />示例：`json ["duplicate key value", "deadlock detected"]·`    |
| fullRingBufferSize | 全量阶段环形缓冲队列大小，取值范围为 16～256，需设置成2的指数倍。<br />适当增大可以增加吞吐和性能。如果设置过大会导致任务负载过高引发性能下降、程序卡顿、通信超时等问题。     |
| increRingBufferSize | 增量阶段环形缓冲队列大小，取值范围为 32～512，需设置成2的指数倍。<br />适当增大可以增加吞吐和性能。如果设置过大会导致任务负载过高引发性能下降、程序卡顿、通信超时等问题。       |
| increBatchSize | 增量阶段按批刷出时的批次大小，和 `fetchFromBrokerTimeoutMs` 配合，哪个阈值先达到则返回。     |
| fetchFromBrokerTimeoutMs | 从队列中获取单批事件的超时时间，和 `increBatchSize` 配合，哪个阈值先达到则返回       |
| dataProcessParallel | 用户自定义代码数据处理并行度，取值范围 2～32       |
| sysDataProcessParallel | 系统数据处理(映射&数据过滤)并行度，取值范围 2～32       |
| sysDataPartitionParallel | 数据写入前预分区并行度，取值范围 2～32     |
| actionFilterParallel | 数据操作过滤并行度，取值范围 2～32       |
| waitStrategy | 队列写入等待策略，取值为：<ul><li><b>BlockingWaitStrategy</b>：阻塞等待</li><li><b>SleepingWaitStrategy</b>：睡眠等待（默认值）</li><li><b>BusySpinWaitStrategy</b>：自旋等待</li><li><b>YieldingWaitStrategy</b>：让步等待</li><li><b>LiteTimeoutBlockingWaitStrategy</b>：轻量超时阻塞等待</li><li><b>LiteBlockingWaitStrategy</b>：轻量阻塞等待</li><li><b>TimeoutBlockingWaitStrategy</b>：超时阻塞等待</li></ul>       |
| increLogMinimal | 是否开启最小化增量事件日志，影响以下行事件日志：<ul><li>update：去除未变化字段数据</li><li>delete：去除事件除主键之外字段</li></ul>取值为：<ul><li><b>true</b>：开启最小化日志</li><li><b>false</b>：不开启最小化日志</li></ul>      |
| hotUpdateMerge | 开启单行 update 事件聚合，将同主键的多次 update 事件合并为单次，取值为：<ul><li><b>true</b>：开启</li><li><b>false</b>：不开启</li></ul>      |
| enableCommitLog | 增量是否开启对端写入日志，取值为：<ul><li><b>true</b>：开启日志</li><li><b>false</b>：不开启日志</li></ul> 建议开启，有助于排查性能问题      |
| printKeyConfig |  打印任务关键参数，包含<ul><li>数据库表源对端映射关系</li></ul> 取值为：<ul><li><b>true</b>：开启</li><li><b>false</b>：不开启</li></ul>    |
| debugMode | 配置开启应用调试模式，取值为：<ul><li><b>true</b>：开启</li><li><b>false</b>：关闭</li></ul>      |
| debugPort | 应用调试端口      |
| noAutoReboot | 任务非正常退出后，是否自动重启任务，取值为：<ul><li><b>true</b>：开启</li><li><b>false</b>：关闭</li></ul>        |
| autoSyncNewCreatedColumn | 增量任务是否自动同步新增的列，取值为：<ul><li><b>true</b>：自动同步</li><li><b>false</b>：不自动同步</li></ul>        |
| customCodeContext | 自定义代码可传入的上下文，可自定义       |
| taskIdxParallel |   计算数据所属任务编号的并行度，取值范围为 0 ~ 8     |
| maxDiffAndLoss |  校验任务所允许的最大差异数据条数，如果超过，则任务报错退出，防止差异数据占用大量硬盘。取值范围为 10000 ~ 1000000，-1 表示不限制。      |
| checkFloatNumScale | 只校验浮点类型的后 n 位小数，消除浮点类型差异导致校验不准的问题，小于等于 0 表示不校验浮点数的小数部分。       |
| checkTimePrecision | 只校验时间戳类型后 n 位精度，消除两边数据源支持时间精度不一致导致的校验问题，小于等于 0 表示不校验时间戳小于秒的部分。       |
| useTypedField  | 是否使用强类型数据结构，以支持更多的数据库数据类型，取值为：<ul><li><b>true</b>：开启</li><li><b>false</b>：关闭</li></ul>  |
| checkEmptyStringEqualToNull  | 校验任务中是否将空字符串和 NULL 视为相等，取值为：<ul><li><b>true</b>：相等</li><li><b>false</b>：不相等</li></ul>  |
| checkFixedCharStrategy  |  校验任务中对字符串的校验策略, 取值为：<ul><li><b>TRIM_START</b>：忽略字符串开头的空格</li><li><b>TRIM_END</b>：忽略字符串结尾的空格</li><li><b>TRIM</b>：忽略字符串开头和结尾的空格</li><li><b>NO_TRIM</b>：直接比较，不忽略任何内容</li></ul>  |
| useAdvancedMeta  | 任务启动时是否查询索引的元数据信息，取值为：<ul><li><b>true</b>：查询</li><li><b>false</b>：不查询</li></ul>  |
| llmEmbeddingConfig  | 指定用于大模型嵌入的配置  |
| llmChatConfig  | 指定用于大模型对话的配置  |


## 常用功能参数设置
- [0值时间自动替换](zero_time_replace.md)
- [打印消息详情](print_message_detail.md)
- [写入时限流](full_write_rps_limit.md)
- [性能参数](perf_param.md)
- [跳过写入异常](skip_write_error.md)
- [跳过 DDL 异常](skip_ddl_error.md)
- [调整任务规格](adjust_task_spec.md)
- [使用 Online DDL 工具](sync_online_ddl.md)
- [不自动重启任务](job_no_autoreboot.md)
- [浮点数校验参数设置](float_check.md)



