---
id: create_mq_parse_job
title: 消息自定义解析任务
description: 使用 CloudCanal 自定义代码解析消息中间件原始消息，并将结构化记录同步到目标数据库。
---

## 简述

当消息中间件（如 Kafka）消息使用业务自定义格式时，可用 CloudCanal 自定义代码编写解析器，从消息中提取库或 Schema、表、列和字段值，再将解析后的记录增量同步到目标结构化数据库。

一条消息可以展开为多行，并按解析结果写入不同的目标库表。

## 支持的链路

| 源端 | 目标端                |
| --- |--------------------|
| Kafka | IoTDB 1.x（Tree 模型） |

## 操作步骤

### 代码开发

1. 将 [cloudcanal-data-process](https://gitee.com/clougence/cloudcanal-data-process) 导入 IDE，在 `data-transform` 模块中参考 [KafkaJsonArrayToIoTDB.java](https://gitee.com/clougence/cloudcanal-data-process/blob/master/data-transform/src/main/java/com/clougence/cloudcanal/dataprocess/datatransform/KafkaJsonArrayToIoTDB.java) 编写解析逻辑。
2. 实现 `CcMqOriginMsgProcessorV2` 的 `process` 方法。通过 `CcMqOriginMsg` 读取原始消息，按目标库表构造 `CustomData`。在 `SchemaInfo` 中填写目标库或 Schema、表名，并保留源 Topic。为每条记录填写列名、类型和字段值。
3. 在 `data-transform/src/main/resources/META-INF/cloudcanal/plugin.properties` 中指定转换类的全限定名。使用示例时，配置如下。

   ```properties
   loadClassName=com.clougence.cloudcanal.dataprocess.datatransform.KafkaJsonArrayToIoTDB
   ```

### 代码打包

1. 在 `cloudcanal-data-process` 工程根目录执行以下命令。

   ```bash
   mvn -pl data-transform -am clean package
   ```

2. 从 `data-transform/target/` 获取包含转换类和 `plugin.properties` 的 `data-transform-1.0.0-SNAPSHOT.jar`。

### 目标准备

1. 在目标库中准备好表结构，其中库或schema、表、列信息对应消息解析后的结果。

### 任务创建

1. 进入 **同步任务** > **创建任务** 。在 **源&目标设置** 中选择支持的数据源，在源端 **高级配置** 的 **消息格式** 中选择 **原始消息格式** ，**解析消息体** 选择不解析。
2. 在 **功能配置** 中选择增量同步，并在 **表&action过滤** 中选择要订阅的 Topic。
3. 在 **数据处理** 中点击 **上传自定义代码**，选择上一步生成的 JAR，并点击 **确定**。
4. 在 **创建确认** 中检查配置并提交任务。