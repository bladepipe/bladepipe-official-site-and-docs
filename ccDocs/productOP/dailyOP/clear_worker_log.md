---
id: clear_worker_log
title: 清理机器日志
description: CloudCanal 提供了机器日志清理功能，帮助清理残留日志。本文介绍了如何清理机器日志。
---

## 简介
CloudCanal 提供了客户端日志清理功能，该功能会清理以下路径中的日志文件：

- **`${user.home}`/logs/cloudcanal/tasks/`${任务名}`**（未归档的任务日志）
- **`${user.home}`/logs/cloudcanal/tasks/`${归档日期}`/`${任务名}`**（已归档的任务日志）

## 操作步骤

1. 点击 **同步设置 > 同步机器 > 机器列表**，打开 **机器列表详情** 界面。
2. 选择需要清理日志的机器，点击 **更多**，选择 **日志保留设置**。
3. 设置保留天数，点击 **保存** 开始异步任务执行。
4. 查看异步任务结果，详情界面中包含日志清理的统计结果。

    ![clear_result.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/clear_worker_log/clear_result.png)
    :::info
    参数释义：
      - **Total delete log file**: 已清理的日志文件数量
      - **Total release space**:   日志清理所释放的文件空间
      - **File failed to delete**:  删除失败的文件（需要手动删除）
    :::

## FAQ
**Q: 有哪些日志不会被删除？**   
**A**: 以下日志不会被删除：
   - 机器中已分配任务的日志
   - 60 天（对应配置文件中 MaxHistory 的值）之内的归档日志
   - 被其他进程占用的日志

**Q: 我想调整日志的保留时间或者日志的删除路径，如何自定义删除器的行为？**   
**A**: 需要关注如下两个日志的配置文件，文件名均为 `logback.xml`：
   - **/home/clougence/cloudcanal/cloudcanal/conf** （任务日志配置文件）
   - **/home/clougence/cloudcanal/sidecar/conf** (Sidecar 日志配置文件)
   
   可以在 **Sidecar 日志配置文件** 中找到伪装成 Appender 的删除器 TaskLogRemover，默认配置及释义如下：
   ```xml
    <appender name="TaskLogRemover" class="ch.qos.logback.classic.sift.SiftingAppender">
        <discriminator>
            <Key>destination</Key>
            <DefaultValue>%instance</DefaultValue>
        </discriminator>
        <sift>
            <appender name="FILE-${module}" class="com.clougence.cloudcanal.base.service.logback.TaskRemoverPretendAppender">
                <!-- 描述了用于匹配任务名的正则，通常不需要去修改它 -->
                <instancePattern>(canal.*?)_(FULL|CHECK|INCREMENT|REVISE)</instancePattern>
                <!-- 描述了任务未归档日志的存储位置 -->
                <instanceDirNamePattern>
                    ${user.home}/logs/cloudcanal/tasks/${destination}
                </instanceDirNamePattern>
                <!-- 描述了任务归档日志的存储路径 -->
                <rollingDirNamePattern>
                    ${user.home}/logs/cloudcanal/tasks/%d{yyyy-MM-dd}/${destination}
                </rollingDirNamePattern>
                <!-- 描述了任务日志最大保留日期，即删除器最多只会删除${maxHistory}天之前的日志 -->
                <maxHistory>60</maxHistory>
            </appender>
        </sift>
    </appender>
   ```

   :::info
     `instanceDirNamePattern` 与 `rollingDirNamePattern` 均与 **任务日志配置文件** 中 PROJECT Appender 描述的存储文件位置保持一致。
   :::


**Q: 异步任务详情报错：**
   ```text
   RuntimeException: last date to clean should before than maxHistory(60) which is set in sidecar logback.xml.
   ```
**A**: 以下为报错原因及解决办法：
- **报错原因**：指定日志开始删除的时间小于日志最少保留时间。    
- **解决方法**：重新选择从 60 天前的日期开始删除或调小问题 2 所展示配置中 `<maxHistory>` 的值。