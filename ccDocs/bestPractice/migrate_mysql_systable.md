---
id: migrate_mysql_systable
description: MySQL 系统库同步中的注意事项
title: MySQL 系统库同步实践
---
本文介绍了 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-clickhouse-sync) 实现 MySQL到 MySQL 系统库迁移同步的能力，帮助企业快速完成 MySQL 数据库权限数据迁移。

## 注意与限制
- 某些系统库表只读，对端写入这类系统表时会抛异常，如 **information_schema 库的所有表** 和 **performance_schema 库中除了 setup_instruments 以外的所有表**（setup_instruments最多只支持 select/update），故目前不支持这类库表迁移。
  
- MySQL 8 版本以下的系统表中存在 **非法的时间值**，如 0000-00-00 00:00:00，同步到目标端时会 **转成合法的时间**。如：Timestamp：0000-00-00 00:00:00 转成 1970-01-01 00:00:01；Datetime：0000-00-00 00:00:00 转成 0001-01-01 00:00:00（虽然 MySQL 官网中声明的范围是从 1000-01-01 00:00:00 起，但实测是从 0001-01-01 00:00:00 起）。
  
- Datetime 类型数据问题。   
  对于 1901-01-01 00:00:00 之前的数据，在增量同步过程中，如果时区是 Asia/Shanghai，对端会多出来额外的 5 分 43 秒。这是因为在 1901 年及其以前，时区不是标准化，对于 Asia/Shanghai 时区，UTC 的局部平均时间偏移是 +08:05:43，所以会多出来额外的 5 分 43 秒。其他时区也有类似的问题，具体可以从 https://www.timeanddate.com/time/zone/china/shanghai 网站查询。
 
- 不建议且不支持跨版本同步 **mysql.help_category**、**mysql.help_keyword**、**mysql.help_topic**、**mysql.help_relation** 这四张表。

## 操作示例
### 准备 CloudCanal
下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-mysql-clickhouse-sync)。

### 添加数据源
登录 CloudCanal 平台，点击 **数据源管理** > **新增数据源**，添加准备的数据库。
  ![1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/migrate_mysql_systable/1.png)

### 创建任务
1. 点击 **同步任务** > **创建任务**。
2. 进入源&目标设置页面，选择 MySQL 数据源和系统库，点击 **下一步**。
  ![2](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/migrate_mysql_systable/2.png)

3. 进入功能配置页面，选择数据同步。建议任务规格至少选择 1 GB，**取消勾选自动启动任务**，点击 **下一步**。
  ![3](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/migrate_mysql_systable/3.png)

4. 选择需同步的表，不要同步 **mysql.help_category、mysql.help_keyword、mysql.help_topic、mysql.help_relation** 这四张表。点击 **下一步**。
   ![4](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/migrate_mysql_systable/4.png)
5. 选择需同步的列。
6. 确认创建任务。
7. 进入任务详情页，点击 **功能列表** > **修改参数**，修改以下参数配置。
    - 源端 zeroDateTimeBehavior：exception
    - 源端 srcTimeZone：配置成源端时区(默认是 Asia/Shanghai)
    - 对端 keyConflictStrategy：REPLACE
    - 对端 dstTimeZone：配置成对端时区(默认是 Asia/Shanghai)
  ![5](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/migrate_mysql_systable/5.png)

7. 启动任务，等待数据同步完毕。

### 校验数据
1. 创建数据校验任务，并修改如下任务参数。
    - 源端 zeroDateTimeBehavior：exception
    - 源端 srcTimeZone：配置成源端时区(默认是 Asia/Shanghai)
    - 对端 dstTimeZone：配置成对端时区(默认是 Asia/Shanghai)
2. 启动任务，确认数据校验结果。
3. 登录对端 MySQL，检查权限信息是否正常。

