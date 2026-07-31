---
id: mysql-to-dameng-migration
description: 介绍MySQL迁移到达梦的完整流程，包括Binlog配置、表结构转换、全量迁移、增量同步、数据校验、低停机切换及常见问题排查。
title: MySQL迁移到达梦怎么做？信创数据库低停机迁移实战
date: 2026-07-29
authors: yuxia
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/mysql-to-dameng.png
slug: /data_sync_sample/mysql-to-dameng-migration
---

把MySQL迁移到达梦，如果只是迁移一批静态数据，可以停机后导出再导入。但在生产环境中，MySQL通常还在持续产生订单、用户、库存等业务数据，几百GB甚至更大的数据库也很难在短时间内完成迁移。

更稳妥的方法是先迁移表结构和历史数据，再通过MySQL Binlog持续同步INSERT、UPDATE、DELETE等增量变更。等达梦中的数据追平MySQL并通过校验后，只需要在最后切换阶段暂停写入一小段时间。

这套方案可以概括为：

> 迁移评估 → 结构迁移 → 全量初始化 → Binlog增量同步 → 数据校验 → 应用切换

![MySQL到达梦低停机迁移流程](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/1%20.png)

本文以CloudCanal为例，介绍MySQL迁移到达梦的准备工作、配置过程、常见兼容性问题和低停机切换步骤。如果已经完成前期评估，只想看工具配置，可以直接跳到[“使用CloudCanal迁移MySQL到达梦”](#使用cloudcanal迁移mysql到达梦)一节。

## MySQL迁移到达梦，具体要迁移什么？

一次完整的数据库迁移通常包含四部分。

### 1. 表结构

包括表、字段、主键、索引、默认值和字段注释等。MySQL和达梦的SQL语法、字段类型及数据库对象并不完全相同，不能简单地把MySQL的`SHOW CREATE TABLE`结果直接拿到达梦执行。

### 2. 历史数据

也就是迁移开始前已经存在于MySQL中的数据。这部分通常通过全量扫描读取，再分批写入达梦。

### 3. 增量数据

全量迁移可能需要运行数小时甚至数天。在此期间，MySQL仍然会产生新的INSERT、UPDATE和DELETE操作。这些变化需要通过Binlog捕获并继续写入达梦，否则全量迁移结束时，两边的数据仍然不一致。

### 4. 应用兼容性

应用中的SQL、数据库驱动、分页语法、函数、存储过程和大小写规则也可能需要修改。

数据迁移工具可以帮助迁移表结构和数据，但不能默认解决所有应用兼容问题。尤其是存储过程、触发器、复杂函数和MySQL特有SQL，需要单独梳理和测试。

## 迁移前先检查MySQL

正式创建迁移任务前，先确认MySQL的版本、数据规模、Binlog配置、表结构和账号权限。

### 检查MySQL版本和字符集

```sql
SELECT VERSION();

SHOW VARIABLES LIKE 'character_set_server';
SHOW VARIABLES LIKE 'collation_server';
```

这条链路支持的MySQL字符集包括`utf8`、`utf8mb4`和`latin1`。如果源库使用其他字符集，不能直接假设兼容，应先用包含中文、特殊符号和Emoji的数据进行测试。

### 统计库表和数据规模

```sql
SELECT
    table_schema,
    COUNT(*) AS table_count,
    ROUND(SUM(data_length + index_length) / 1024 / 1024 / 1024, 2)
        AS total_size_gb
FROM information_schema.tables
WHERE table_schema NOT IN (
    'information_schema',
    'mysql',
    'performance_schema',
    'sys'
)
GROUP BY table_schema
ORDER BY total_size_gb DESC;
```

继续找出数据量较大的表：

```sql
SELECT
    table_schema,
    table_name,
    table_rows,
    ROUND((data_length + index_length) / 1024 / 1024, 2)
        AS total_size_mb
FROM information_schema.tables
WHERE table_schema = 'your_database'
ORDER BY data_length + index_length DESC
LIMIT 20;
```

这些数据可以用来估算迁移时间，也方便把超大表拆成单独任务，避免少数大表拖慢整个迁移过程。需要注意，InnoDB的`table_rows`通常是估算值，不能作为最终数据校验结果。

### 找出没有主键的表

```sql
SELECT
    t.table_schema,
    t.table_name
FROM information_schema.tables t
LEFT JOIN information_schema.table_constraints c
    ON t.table_schema = c.table_schema
    AND t.table_name = c.table_name
    AND c.constraint_type = 'PRIMARY KEY'
WHERE t.table_schema = 'your_database'
    AND t.table_type = 'BASE TABLE'
    AND c.constraint_name IS NULL;
```

无主键表是增量同步中需要重点处理的对象。

CloudCanal的MySQL到达梦链路支持常见DML同步。其中，**无主键表的UPDATE和DELETE默认不同步，需要在创建任务时手动勾选相关选项。**

即使工具允许同步，也建议先评估无主键表的数据量和更新频率。因为缺少唯一标识时，目标端定位记录的成本和不确定性都会增加。能够补充合理主键的表，最好在正式迁移前完成整改。

### 检查特殊字段和零值时间

```sql
SELECT
    table_schema,
    table_name,
    column_name,
    data_type,
    column_type
FROM information_schema.columns
WHERE table_schema = 'your_database'
    AND data_type IN (
        'tinyint',
        'bit',
        'enum',
        'set',
        'json',
        'blob',
        'mediumblob',
        'longblob',
        'text',
        'mediumtext',
        'longtext',
        'datetime',
        'timestamp'
    )
ORDER BY table_name, ordinal_position;
```

重点检查以下内容：

* `TINYINT(1)`是否被应用当作布尔值；
* `ENUM`和`SET`如何映射；
* `JSON`字段迁移后是否仍需要JSON查询能力；
* `BLOB`、`TEXT`和其他大字段的数据量；
* `DATETIME`、`TIMESTAMP`是否涉及不同时区；
* 是否存在`0000-00-00`或`0000-00-00 00:00:00`等零值时间。

MySQL历史系统中比较容易出现零值时间，但目标数据库未必能直接接受。CloudCanal的MySQL到达梦链路提供零值时间处理，可以在迁移时将其转换为指定值，避免目标端写入失败。

不过，转换规则不能随便设置。零值究竟代表“未知”“未初始化”还是历史脏数据，应由业务方确认后再决定转换成`NULL`、特定日期或其他值。

## 为增量同步准备MySQL Binlog

CloudCanal通过MySQL Binlog读取增量变更。使用MySQL到达梦链路时，MySQL需要开启Binlog，并使用`ROW`格式和完整行镜像。

可以先检查当前配置：

```sql
SHOW VARIABLES LIKE 'log_bin';
SHOW VARIABLES LIKE 'binlog_format';
SHOW VARIABLES LIKE 'binlog_row_image';
SHOW VARIABLES LIKE 'server_id';
```

期望看到类似结果：

```text
log_bin           ON
binlog_format     ROW
binlog_row_image  FULL
```

如果未开启，可以在MySQL配置文件中设置：

```ini
[mysqld]
server-id=1
log-bin=mysql-bin
binlog-format=ROW
binlog-row-image=FULL
```

修改配置后需要按照当前数据库环境的运维规范重启MySQL，并重新检查参数是否生效。

`ROW`格式记录每一行的实际变化，更适合CDC读取。`binlog_row_image=FULL`表示UPDATE前后记录完整列值。MySQL官方文档说明，`FULL`会记录行的完整前像和后像；CloudCanal的MySQL到达梦链路也要求使用这一配置。
参考：
[MySQL Binlog官方说明](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html)、[CloudCanal MySQL到达梦链路](https://www.clougence.com/docs/dataMigrationAndSync/connection/mysql-to-dameng/)

### Binlog保留时间不能太短

全量迁移期间产生的增量数据依赖Binlog。如果全量迁移还没完成，对应的旧Binlog已经被MySQL清理，任务就可能无法继续从原位点读取。因此，Binlog保留时间至少要覆盖：

> 预计全量迁移时间＋异常处理时间＋安全余量

例如，预计全量迁移需要两天，不应只保留一天的Binlog。最好先通过测试得到实际迁移速度，再确定保留策略。迁移期间还要监控Binlog磁盘占用，不能只延长保留时间却不检查磁盘空间。

## MySQL与达梦的结构差异怎么处理？

![MySQL与达梦结构差异处理示意](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/2.png)

下面是一张常见的MySQL订单表：

```sql
CREATE TABLE orders (
    id BIGINT NOT NULL AUTO_INCREMENT,
    order_no VARCHAR(64) NOT NULL,
    user_id BIGINT NOT NULL,
    amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    status TINYINT NOT NULL DEFAULT 0,
    extra_info JSON,
    remark TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_order_no (order_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COMMENT='订单表';
```

迁移到达梦时，至少需要检查以下内容。

### 自增主键

MySQL使用`AUTO_INCREMENT`实现自增。迁移到达梦时，需要根据目标表创建结果确认自增列或序列的处理方式。

除了表结构本身，还要检查历史数据写入后自增值是否已经推进到正确位置。否则应用切换后插入新记录，可能与已有主键发生冲突。验证时不能只测试历史数据查询，还要在达梦端新增一条记录，确认新生成的主键大于当前最大值。

### `TINYINT(1)`和布尔值

MySQL项目经常使用`TINYINT(1)`保存0和1。迁移前需要确认它在业务上究竟是普通数值还是布尔状态。不要仅根据字段类型批量转换。相同的`TINYINT`字段可能分别代表：

* 启用或禁用状态；
* 删除标记；
* 业务枚举；
* 小范围计数值。

迁移后的目标字段类型应结合实际取值范围和应用代码判断。

### `DATETIME`、`TIMESTAMP`和时区

MySQL中的`DATETIME`通常不包含时区转换语义，`TIMESTAMP`则会受到会话时区影响。迁移时应确认：

```sql
SELECT @@global.time_zone, @@session.time_zone;
```

同时核对CloudCanal任务中的源端时区设置，以及达梦端写入后的实际值。跨时区部署时，不能只比较页面显示时间，最好直接查询源端和目标端的原始字段值。

### 零值时间

如果历史表存在以下数据：

```text
0000-00-00
0000-00-00 00:00:00
```

应在正式迁移前统计数量：

```sql
SELECT COUNT(*)
FROM your_table
WHERE your_datetime_column = '0000-00-00 00:00:00';
```

然后与业务方确定转换规则。直接转换为当前时间会改变数据含义，通常并不合适。

### `JSON`、`ENUM`和`SET`

这些字段不能只检查“能否写入”，还要检查迁移后的应用如何查询。

例如，MySQL应用可能使用：

```sql
JSON_EXTRACT(extra_info, '$.source')
```

即使JSON内容已经迁移到达梦，原来的查询函数也未必可以直接使用。此类字段需要同时完成数据迁移测试和应用SQL适配。

### `ON UPDATE CURRENT_TIMESTAMP`

MySQL可以通过：

```sql
updated_at TIMESTAMP
DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP
```

在更新记录时自动刷新时间。

迁移到达梦后，应确认目标表是否需要通过默认值、触发器或应用逻辑实现相同行为。仅把现有时间数据迁过去，并不代表后续UPDATE还能自动更新时间。

### 表名和字段名大小写

MySQL表名是否区分大小写会受到操作系统和`lower_case_table_names`配置影响；达梦的对象名处理规则又与MySQL不同。

迁移前可以检查：

```sql
SHOW VARIABLES LIKE 'lower_case_table_names';
```

CloudCanal支持目标表名与源端保持一致、统一转大写、统一转小写或以`_数字`后缀截取。选择映射规则时，要同时检查：

* 应用SQL是否固定使用小写表名；
* ORM是否自动添加双引号；
* 达梦中的用户和Schema；
* 现有SQL是否混用了大小写。

表名映射一旦确定，应该在测试环境中用真实应用验证，不要等正式切换后再处理大小写错误。

## 使用CloudCanal迁移MySQL到达梦

CloudCanal的MySQL到达梦链路支持：

* 结构迁移；
* 全量数据迁移；
* INSERT、UPDATE、DELETE增量同步；
* 数据校验和订正；
* 修改订阅；
* 重置位点；
* 表名映射；
* 部分DDL同步；
* 数据过滤、自定义代码和虚拟列等处理能力。

开始实操前，先准备一个可用的CloudCanal环境。如果希望快速注册体验，可以直接使用[CloudCanal SaaS版本](https://www.clougence.com/register)；如果需要把同步链路部署在自有环境中，可以参考[Docker一键安装文档](https://www.clougence.com/docs/productOP/docker/install_all_in_one_docker)完成私有化部署。已经有CloudCanal控制台的读者，可以直接进入下面的迁移配置步骤。

以下是低停机迁移的基本操作流程。

### 第一步：添加MySQL数据源

进入CloudCanal控制台，选择“数据源管理 > 新增数据源”，添加MySQL。

![CloudCanal添加MySQL数据源页面](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/dm-1.png)

配置时需要确认：

* CloudCanal节点可以连接MySQL；
* 同步账号至少具备迁移表的`SELECT`权限，以及增量同步所需的`REPLICATION SLAVE`和`REPLICATION CLIENT`权限；
* Binlog已经开启；
* `binlog_format`为`ROW`；
* `binlog_row_image`为`FULL`；
* 数据库时区配置正确；
* Binlog保留时间覆盖迁移周期。

不要直接使用MySQL的`root`账号完成生产迁移。应按照实际任务功能授予同步账号所需的最小权限。

### 第二步：添加达梦数据源

继续添加达梦目标端，填写网络地址、端口、账号和密码等连接信息。

![CloudCanal添加达梦数据源页面](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/dm-2.png)

达梦账号需要具备目标表的查询和`INSERT`、`UPDATE`、`DELETE`权限；如果同时启用结构迁移或DDL同步，还需要`CREATE TABLE`、`CREATE INDEX`、`COMMENT ON TABLE/COLUMN`和`ALTER TABLE`等相应权限。

还要确认CloudCanal迁移同步节点能够访问达梦的实际服务端口。不要只在本地客户端测试连通性，因为真正执行迁移的是CloudCanal工作节点。

### 第三步：创建“增量同步＋全量初始化”任务

进入“同步任务 > 创建任务”，按向导创建任务：

1. 源端选择MySQL，目标端选择达梦；

![CloudCanal创建任务选择MySQL源端和达梦目标端](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/dm-3.png)

2. 任务类型选择增量同步，并勾选全量初始化；

![CloudCanal选择增量同步并勾选全量初始化](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/dm-4.png)

3. 选择需要迁移的表，并核对目标表名；

![CloudCanal选择迁移表并核对目标表名](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/dm-5.png)

4. 核对迁移字段、字段映射、目标字段类型和NULL属性；

![CloudCanal核对迁移字段和字段映射](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/dm-6.png)

5. 在最终确认页检查全量、增量、结构迁移、DDL同步、数据校验、任务规格和表映射，确认无误后创建任务。

![CloudCanal任务创建最终确认页](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/dm-7.png)

这种配置会在同一条任务中完成表结构准备、历史数据初始化和后续增量同步，而不是先单独完成一次全量迁移，再临时创建增量任务。

迁移流程可以理解为：

![MySQL到达梦全量初始化和增量同步流程](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/4.png)

MySQL中的历史数据通过全量迁移写入达梦，迁移期间产生的INSERT、UPDATE和DELETE则通过Binlog持续同步。全量完成后，任务继续消费积压的增量变更，直到达梦追平MySQL。

### 第四步：启动任务并观察全量迁移

任务启动后，重点观察：

* 全量迁移进度；
* 每张表的迁移状态；
* 扫描和写入速度；
* 失败记录；
* MySQL CPU、I/O和连接数；
* 达梦写入负载；
* Binlog增量积压量；
* 同步延迟变化。

如果一张超大表占用了大部分迁移时间，可以考虑把大表与普通表拆分管理。提高并行度前，应同时观察源库和目标库负载，不能只追求任务页面上的速度。

### 第五步：观察增量同步

全量完成后，任务会继续将MySQL中的变更写入达梦。可以在MySQL测试表中分别执行：

```sql
INSERT INTO migration_test (id, name)
VALUES (10001, 'insert_test');

UPDATE migration_test
SET name = 'update_test'
WHERE id = 10001;

DELETE FROM migration_test
WHERE id = 10001;
```

然后检查达梦中的结果，确认INSERT、UPDATE和DELETE均能正常同步。生产验证不应直接修改核心业务表，可以使用专门的测试表，或者选择经过业务方确认的测试记录。

## DDL同步支持到什么程度？

MySQL到达梦迁移期间，开发团队可能仍在修改表结构，因此需要提前确认DDL同步范围。在MySQL到达梦链路中，CloudCanal支持的DDL包括：

* `ALTER TABLE ADD COLUMN`
* `ALTER TABLE MODIFY COLUMN`
* `ALTER TABLE RENAME COLUMN`
* `ALTER TABLE DROP COLUMN`
* `RENAME TABLE`
* `CREATE TABLE`，其中创建表适用于全库同步场景

这不等于所有MySQL DDL都能自动转换。

以下操作在迁移窗口内应谨慎执行：

* 修改主键或唯一索引；
* 调整复杂分区；
* 修改字符集或排序规则；
* 变更`ENUM`、`SET`或特殊数据类型；
* 执行Online DDL工具生成的临时表切换；
* 创建或修改触发器、函数和存储过程。

如果迁移期间必须发布数据库变更，应建立变更登记机制，提前在测试链路验证，而不是默认所有DDL都会被自动同步。

## 如何验证迁移后的数据？

只比较源端和目标端的总行数是不够的。例如，两张表都包含100万行，但其中一行的金额、状态或时间字段不同，行数检查仍然会显示一致。建议至少进行三层验证。

### 第一层：对象和行数检查

检查：

* 目标表是否全部创建；
* 主键和必要索引是否存在；
* 每张表的行数是否大致一致；
* 是否存在迁移失败或被跳过的表。

这一步适合快速发现整表缺失，但不能作为最终验收。

### 第二层：逐字段数据校验

CloudCanal支持从MySQL和达梦分别读取数据进行逐字段比较，也可以根据校验结果订正差异数据，并支持定时校验。

如果在创建迁移任务时已经选择数据校验，可以在全量迁移完成、增量延迟追平后查看校验阶段的执行结果；如果创建任务时没有开启，也可以在同步任务详情页通过“功能列表 > 创建相似任务”，选择“数据校验”或“数据校验和订正”单独发起一次校验任务。需要周期性复核时，再配置定时校验。

校验结果应结合`diff_1st.log`、`diff.log`等日志文件查看。前者更适合观察初次扫描发现的差异，后者用于确认最终校验结果。具体操作可以参考[数据校验与订正文档](https://www.clougence.com/docs/operation/job_manage/create_job/create_period_verification_correction_job)。

应重点校验：

* 核心业务表；
* 大表；
* 高频更新表；
* 包含金额和状态的表；
* 包含`JSON`、`BLOB`、`TEXT`的表；
* 包含零值时间或特殊字符的表；
* 迁移期间发生过错误和重试的表。

发现差异后，不要立即批量覆盖。应先判断是增量尚未追平、字段转换规则不一致，还是目标端被其他程序修改。

### 第三层：业务结果校验

数据库字段一致之外，还要验证实际业务结果，例如：

```sql
-- 订单总量
SELECT COUNT(*) FROM orders;

-- 各状态订单数量
SELECT status, COUNT(*)
FROM orders
GROUP BY status;

-- 指定日期范围的订单金额
SELECT SUM(amount)
FROM orders
WHERE created_at >= '2026-01-01 00:00:00'
  AND created_at < '2026-02-01 00:00:00';
```

类似查询应分别在MySQL和达梦执行，并比较结果。此外还要测试应用的新增、修改、删除、分页查询、批量操作、事务回滚和报表统计。数据迁移成功不代表应用SQL一定兼容。

## 如何完成低停机切换？

当全量迁移完成、增量同步稳定并通过数据校验后，可以进入正式切换阶段。

![MySQL到达梦低停机切换流程](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/mysql_to_dameng/3.png)

建议按照以下顺序操作：

1. 确认所有全量任务完成；
2. 确认没有持续失败的记录；
3. 确认Binlog同步延迟处于可接受范围；
4. 对关键业务表执行一次完整校验；
5. 通知业务进入短暂停写窗口；
6. 停止定时任务、消息消费者和其他后台写入；
7. 等待最后一批Binlog事件同步到达梦；
8. 再次校验关键表及业务指标；
9. 修改应用数据库连接；
10. 在达梦上验证新增、更新、删除和查询；
11. 观察应用错误日志、连接池和数据库负载；
12. 确认稳定后结束切换窗口。

旧MySQL不要在切换后立即下线。应按照项目要求保留一段观察期，并限制非必要写入，便于问题排查和回退。

如果应用已经开始向达梦写入，回退就不再只是把连接改回MySQL。还需要考虑切换后在达梦产生的数据如何返回MySQL。因此，回退方案必须在正式切换前设计，而不是发生故障后再临时讨论。

## 常见问题与排查方法

### 1. 全量迁移还没完成，Binlog已经被清理

原因通常是Binlog保留时间小于全量迁移时间。处理方法是重新确定一致性起点，必要时重新执行全量初始化。迁移前应先测试迁移速度，并为Binlog保留时间留出足够余量。

### 2. 无主键表只能同步INSERT

CloudCanal对无主键表的处理规则是：UPDATE和DELETE需要手动勾选。正式迁移前应列出所有无主键表，优先补充主键；不能补充时，再单独验证更新和删除效果。

### 3. 日期字段写入失败

常见原因包括MySQL零值时间、字段精度不同或源端和目标端时区不一致。先查询具体失败记录，再判断应该进行零值转换、调整目标字段，还是修改任务时区。不要直接把所有异常时间替换成当前时间。

### 4. 达梦中出现主键冲突

CloudCanal提供`IGNORE`和`REPLACE`两种增量冲突策略：

* `IGNORE`：遇到主键冲突时忽略本次写入；
* `REPLACE`：遇到冲突时整行替换目标记录。

默认忽略虽然可以让任务继续运行，但可能掩盖数据差异。选择策略前要先确认冲突来源，例如目标端是否提前写入数据、全量和增量是否重复，或者自增主键是否处理错误。

### 5. 全量完成后，增量延迟持续增加

可以依次检查：

* MySQL是否存在大事务或长事务；
* Binlog解析速度是否成为瓶颈；
* CloudCanal工作节点CPU和内存是否充足；
* 网络是否稳定；
* 达梦写入是否变慢；
* 目标表索引是否过多；
* 是否存在频繁重试的异常数据；
* 任务并发和批量写入参数是否合适。

CloudCanal提供Binlog解析并发、解析缓冲区、单事务最大数据条数和增量流量限制等参数。生产环境中不要一次性大幅调高，应结合监控逐步调整。

### 6. 表名正确，但应用查询时提示对象不存在

通常与大小写、引号、目标Schema或应用默认Schema有关。检查CloudCanal的表名映射方式、达梦中的实际对象名，以及ORM是否自动添加双引号。此类问题应在应用测试阶段解决，不属于数据缺失。

## 总结

MySQL迁移到达梦不能只做一次全量导入。对于持续写入的生产系统，更稳妥的方式是先迁移表结构和历史数据，再通过Binlog同步增量变更，完成数据校验后在短暂停写窗口内切换业务。

CloudCanal支持MySQL到达梦的结构迁移、全量迁移、增量同步、数据校验和订正。正式迁移前，建议先通过PoC验证数据库版本、特殊字段、同步性能和应用兼容性。如在链路配置过程中有任何问题，可以联系[CloudCanal技术团队](https://www.clougence.com/about)。
