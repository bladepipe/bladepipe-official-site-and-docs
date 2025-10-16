---
id: privs_for_kafka
title: Kafka 需要的权限
description: CloudCanal 在做 Kafka 源端或对端的数据迁移同步时，需要提供的账号有一些赋权。
---
本文介绍 Kafka 作为源端或对端数据源迁移或同步数据时，CloudCanal 需要的账号权限。

## 简述
Kafka Topic 权限控制通过 Apache Kafka 的内置安全特性来实现，主要涉及两个方面：认证 (Authentication) 和授权 (Authorization)。

- **认证** (Authentication)：用于确保与 Kafka 集群通信的客户端身份的可信度。通常通过 SSL/TLS 客户端证书或 SASL（Simple Authentication and Security Layer）来实现。首先需要在 Kafka 集群中启用认证。
- **授权** (Authorization)：对于已经认证的客户端，需要确定它们可以访问哪些资源（例如，主题）以及可以执行哪些操作（例如，读取、写入、创建、删除等）。在 Kafka 中通过 ACL（Access Control List）来实现。

## 操作步骤

1. **启用认证**：在 server.properties 文件中，根据您选择的认证方法（例如，SSL/TLS 或 SASL），配置适当的参数。例如，对于 SASL/PLAIN：
    ```
    listeners=SASL_PLAINTEXT://:9092
    sasl.enabled.mechanisms=PLAIN
    sasl.mechanism.inter.broker.protocol=PLAIN
    ```
    :::info
    为了安全起见，建议在生产环境中使用 SASL/SCRAM 或 SSL/TLS。
    :::
2. **启用授权**：在 server.properties 文件中，添加以下配置以启用基于 ACL 的授权：
   ```
   authorizer.class.name=kafka.security.authorizer.AclAuthorizer
   ```
3. **配置 ACL 规则**：使用 kafka-acls 命令来配置 ACL 规则。例如：
    - 允许用户 user 1 读取主题 topic 1：
    ```
    bin/kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --add --allow-principal User:user1 --consumer --topic topic1 --group '*'
    ```
    - 允许用户 user 2 写入主题 topic 2：
    ```
    bin/kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --add --allow-principal User:user2 --producer --topic topic2
    ```
    - 删除用户 user 1 对主题 topic 1 的读取权限：
    ```
    bin/kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --remove --allow-principal User:user1 --consumer --topic topic1 --group '*'
    ```

完成设置后，Kafka 集群将对客户端连接进行认证，并根据配置的 ACL 规则进行授权，确保只有具有正确权限的客户端可以访问和操作特定主题。
