---
id: create_mq_parse_job
title: Custom Message Parsing
description: Use custom code to parse raw messages and incrementally sync the resulting records to a structured database.
---

## Overview

If a message broker such as Kafka carries messages in a format specific to your application, use custom code to extract the database or schema, table, columns, and field values. BladePipe incrementally syncs the resulting records to the target database.

A single message can produce multiple rows. The parser can route those rows to different target databases and tables.

## Supported Source and Target

| Source | Target |
| --- | --- |
| Kafka | IoTDB 1.x (Tree model) |

## Procedure

### Write the Parser

1. Import the [cloudcanal-data-process project](https://gitee.com/clougence/cloudcanal-data-process) into your IDE. Use [KafkaJsonArrayToIoTDB.java](https://gitee.com/clougence/cloudcanal-data-process/blob/master/data-transform/src/main/java/com/clougence/cloudcanal/dataprocess/datatransform/KafkaJsonArrayToIoTDB.java) in the `data-transform` module as a reference.
2. Implement the `process` method of `CcMqOriginMsgProcessorV2`. Read the raw message from `CcMqOriginMsg` and group the resulting records into `CustomData` objects by target database and table. Set the target database or schema and table in `SchemaInfo`, and retain the source topic. For each record, specify the column names, types, and values.
3. Set the fully qualified class name in `data-transform/src/main/resources/META-INF/cloudcanal/plugin.properties`. For the example, use the following value.

   ```properties
   loadClassName=com.clougence.cloudcanal.dataprocess.datatransform.KafkaJsonArrayToIoTDB
   ```

### Build the JAR

1. From the `cloudcanal-data-process` project root, run the following command.

   ```bash
   mvn -pl data-transform -am clean package
   ```

2. Get `data-transform-1.0.0-SNAPSHOT.jar` from `data-transform/target/`. The JAR contains the parser class and `plugin.properties`.

### Prepare the Target

Prepare the target schema so that the database or schema, table, and column names match the parser output. In IoTDB, these correspond to databases, devices, and measurements.

### Create the DataJob

1. Go to **DataJob** > **Create DataJob**. In the **DataSource** step, choose Kafka as the source and IoTDB as the target. In the source **Advanced** settings, set **Message Format** to **Origin Format** and **Decode Message Body** to **do not decode**.
2. In the **DataJob** step, select **Incremental**. In **Tables**, select the Kafka topics to subscribe to.
3. In **Data Processing**, click **Upload Custom Code** and upload the JAR you built.
4. In **Creation**, review the configuration and submit the DataJob.
