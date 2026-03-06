---
id: kafka_iam_auth
title: Kafka AWS IAM 访问控制
description: CloudCanal 支持在连接到 AWS MSK 时使用 IAM 访问控制。
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本文介绍在连接到 AWS MSK 时，CloudCanal 如何配置 IAM 访问控制。

## 简述
AWS MSK 是 Amazon 托管的 Kafka 实例。AWS 提供统一的访问控制机制 IAM，允许账户中的资源相互配置各自的权限。CloudCanal 内置了对 AWS IAM 访问控制的支持，本文简要介绍如何配置。

## 注意事项
当使用 IAM 方式连接到 AWS MSK，AWS MSK 内置的 ACL 规则不会生效，权限由 IAM 策略/角色决定。

## 操作步骤

### 为 AWS MSK 配置 IAM 访问控制
    
    确保对应 AWS MSK 实例的配置中，已启用 IAM 访问控制，并已经为对应的 IAM 角色/用户配置了访问权限。可以参考：

    - [AWS: Create a Amazon MSK cluster that uses IAM access control](https://docs.aws.amazon.com/msk/latest/developerguide/create-iam-access-control-cluster-in-console.html)
    - [AWS: Create IAM access control policies](https://docs.aws.amazon.com/msk/latest/developerguide/create-iam-access-control-policies.html)

### 获取 Bootstrap Server

    在 AWS MSK 控制台中，找到对应 MSK 集群，进入集群详情页面，客户端连接地址即为 Bootstrap Server。

### 配置 CloudCanal

    CloudCanal 同时支持 **默认凭据** 和 **具名凭据** 的方式发起连接。     
    使用具名凭据发起连接时，您可以在同一个 Sidecar 上以不同身份同时连接到多个 AWS MSK 集群。    


<Tabs groupId="awsmsk_connection">
  <TabItem value="默认凭据" label="默认凭据" default>
    1. 创建一个 Kafka / AWS MSK 数据源，并填写：
        - 网络地址：填写之前获取的 Bootstrap Server
        - 认证方式：选择 **无**
        - 额外参数：仅填写`customClientProps`为以下值
        :::info
        参数 **customClientProps**：自定义传入到 Kafka Client 参数，以最高优先级生效。该配置项如果与其他参数重复，将以 customClientProps 中的配置为准生效。
        :::
        ```json
        {
            "security.protocol": "SASL_SSL",
            "sasl.mechanism": "AWS_MSK_IAM",
            "sasl.jaas.config": "software.amazon.msk.auth.iam.IAMLoginModule required;",
            "sasl.client.callback.handler.class": "software.amazon.msk.auth.iam.IAMClientCallbackHandler"
        }
        ```
    2. 点击添加数据源。
    3. 在数据源列表页面测试连接是否成功。

        :::info
        当使用此方式发起连接时，用于鉴权的凭据不由 CloudCanal 提供和控制，而是[由 AWS 的 IAM SDK 处理](https://github.com/aws/aws-msk-iam-auth?tab=readme-ov-file#configuring-a-kafka-client-to-use-aws-iam-with-sasl-oauthbearer-mechanism)。其凭据搜索链如下：
        1. 环境变量：AWS_ACCESS_KEY_ID 和 AWS_SECRET_ACCESS_KEY。
        2. Java 系统属性：aws.accessKeyId 和 aws.secretKey。
        3. 来自环境或容器的 Web 身份令牌凭据。
        4. 默认凭证配置文件：通常位于 ~/.aws/credentials（位置可能因平台而异），并被许多 AWS SDK 和 AWS CLI 共享使用。
        5. Amazon ECS 容器凭证：当环境变量 AWS_CONTAINER_CREDENTIALS_RELATIVE_URI 被设置时，从 Amazon ECS 加载。
        6. 实例配置文件凭证：用于 EC2 实例，通过 Amazon EC2 元数据服务提供。
        :::
</TabItem>
  <TabItem value="具名凭据" label="具名凭据">
    在部分场景下，上述凭据搜索链无法提供有效凭据（比如在非 AWS ECS/EC2 环境下），您需要手动指定凭据。
    
    1. 获取用于发起连接的 IAM 用户的 AK/SK。
    2. 创建一个 Kafka / AWS MSK 数据源，并填写：
         - 网络地址：填写之前获取的 Bootstrap Server
         - 认证方式：选择 **AK/SK**，并填写。用户名选项中填入任意值，假设为`mskuser`
         - 额外参数：仅填写 `customClientProps`为以下值（注意 sasl.jaas.config 一行结尾处的 awsProfileName 应当与用户名一致）
        :::info
        参数 **customClientProps**：自定义传入到 Kafka Client 参数，以最高优先级生效。该配置项如果与其他参数重复，将以 customClientProps 中的配置为准生效。
        :::
        ```json
        {
            "security.protocol": "SASL_SSL",
            "sasl.mechanism": "AWS_MSK_IAM",
            "sasl.jaas.config": "software.amazon.msk.auth.iam.IAMLoginModule required awsProfileName=\"mskuser\";",
            "sasl.client.callback.handler.class": "software.amazon.msk.auth.iam.IAMClientCallbackHandler"
        }
        ```

    3. 点击添加数据源。
    4. 在数据源列表页面测试连接是否成功。
  </TabItem>
</Tabs>
