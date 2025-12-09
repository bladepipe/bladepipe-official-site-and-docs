---
id: solve_task_can_not_delete
title: 任务无法删除
description: 本文介绍使用CloudCanal无法删除任务时如何进行排查
---
## 现象
- 任务处于停止状态，但是点击删除报错无无效。

## 排查
- 常见原因有 3 种：
  - 子任务(如订阅编辑任务、周期性校验子任务)未删除
  - 历史版本遗留问题
  - OpenAPI 调用导致脏数据

## 解决

### 子任务问题

- 先删除子任务，再删除主任务。

### 历史版本问题

- **CloudCanal控制台** > **系统管理** > **异步任务管理**，找到删除操作对应的记录，查看异常堆栈，如有下图信息，则确认问题。
  ![63677bdb-989f-42fa-a489-8d6986ec6a5e-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/async_task_error_log_view.png)

- 登录元数据库(默认`mysql -uclougence -h127.0.0.1 -P25000 -p123456`)后执行如下SQL语句。
   ```sql
    CREATE TABLE IF NOT EXISTS `task_restart_history`
   (
    `id`                 bigint(20)   NOT NULL AUTO_INCREMENT,
    `gmt_create`         datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `task_id`            bigint(20)   NOT NULL,
    `schedule_worker_ip` varchar(128) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_task_id` (`task_id`)
    ) ENGINE = InnoDB
      DEFAULT CHARSET = utf8mb4
      COLLATE = utf8mb4_general_ci;
   ```

- 再次执行删除操作。


