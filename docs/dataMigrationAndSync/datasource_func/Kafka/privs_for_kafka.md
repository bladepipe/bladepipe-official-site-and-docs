---
id: privs_for_kafka
title:  Required Privileges for Kafka
description: BladePipe needs to provide some privileges to the account when doing the data migration synchronization of Kafka source or peer.
---
### Overview
Kafka Topic permission control can be implemented by using Apache Kafka's built-in security features. There are two main aspects to this: Authentication and Authorization.

1. Authentication：Ensure that the identity of clients communicating with the Kafka cluster is trusted. Typically, this is achieved by using SSL/TLS client certificates or Simple Authentication and Security Layer (SASL). The first step is to enable authentication in the Kafka cluster.
2. Authorization：For already authenticated clients, it is necessary to determine what resources they can access (e.g., topics) and what operations they can perform (e.g., read, write, create, delete, etc.). In Kafka, this is done using Access Control lists (ACLs).

### Description

1. Enable authentication In the server.properties file, configure the appropriate parameters depending on the authentication method you choose (e.g., SSL/TLS or SASL). e.g., for SASL/PLAIN: Listeners = SASL_PLAINTEXT://: 9092 sasl. Enabled. Mechanisms = PLAIN sasl. Mechanism. Intel. Broker. The protocol = PLAIN please note that to be on the safe side, It is recommended to use SASL/SCRAM or SSL/TLS in production.
2. Enable authorization on the server. The properties file, add the following configuration based on ACL authorization: to enable the authorizer. Class. The name = kafka. Security. The authorizer. AclAuthorizer
3. Configuring ACL rules use kafka-ACLs to configure ACL rules. Here are some examples:
    - allow user 1 to read the topic 1：bin/kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --add --allow-principal User:user1 --consumer --topic topic1 --group '*'
    - allow user 2 to write to topic 2：bin/kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --add --allow-principal User:user2 --producer --topic topic2
    - Remove the read permission of user 1 to topic 1：bin/kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --remove --allow-principal User:user1 --consumer --topic topic1 --group '*'

After performing these steps, the Kafka cluster authenticates the client connection and authorizes according to the configured ACL rules.
This will ensure that only clients with the correct permissions can access and manipulate a particular topic.
