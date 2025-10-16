---
id: rn-cloudcanal-2-0-1-0
title: 2.0.1.0
---

## CloudCanal-2.0.1.0

发版时间:2021年12月6日
版本号: 2.0.1.0

### 重要特性

- 支持自定义代码上传，让业务有机会在数据流动过程中进行数据处理，包括（不限于）基于反查的宽表构建、拆分表数据汇聚(修改主键)、实时业务告警、数据清洗(非法值过滤、数据补全等)。参考资料：[详细使用说明](https://www.askcug.com/topic/211)，[数据处理插件开源工程](https://gitee.com/clougence/cloudcanal-data-process)

### 新特性

- 支持相似任务创建
- 支持 MySQL 对端唯一键冲突感知的并行写入模式，避免多唯一索引存在共享列导致的死锁问题
- 支持状态机生命周期的控制能力
- 支持阿里云 Kafka CIDR 格式的白名单识别
- 支持设置 MySQL 设置 max_allowed_packet 参数（global）避免写入包过大问题
- 支持阿里云 PolarDBMySQL 杭州金融云数据源添加

### 优化

- 优化 PostgreSQL/Greenplum 对端写入，默认采用 batch 写入模式，避免偶发的异常
- 优化 console 和 sidecar 日志输出优化，避免重复日志打印，更好隔离日志输出
- 任务类型修改为全量迁移、增量同步方便理解
- 社区版获取验证码提示优化
- 社区版添加机器关闭选择阿里云机器，避免误操作
- 社区版禁用不支持的客户端下载功能，避免误操作
- ElasticSearch 对端结构迁移支持全格式 format
- ElasticSearch 选择对端已经存在的索引时支持无限制的自定义分词器名称
- 优化任务状态显示逻辑，状态显示更加准确
- sidecar 获取 ip 时额外增加虚拟网卡黑名单，避免获取错误 ip

### BugFix

- 修复 RDS MySQL 主备上 binlog fileName 相同时，从 RDS 下载 oss binlog 的问题
- 修复 binlog file 中同时存在主备 serverId 导致的解析阻塞问题
- 修复 MySQL 源端 json 字符串中包含\r \t \n
- 修复编辑任务只有公网 host 的问题
- 修复 MySQL 结构迁移时大小写引发的表结构迁移问题
- 修复ElasticSearch 6.X 对端写入 null 值报错的问题
- 修复有账号密码的 ElasticSearch 无法创建任务的问题
- 修复任务异常重启时，由于退出进程过快导致异常日志没有上报管控的问题
- 修复 position 日志没有正确打印的问题
- 修复虚拟列功能不正常的问题
- 修复异构数据源之间 DDL 同步的问题
