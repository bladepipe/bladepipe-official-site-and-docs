---
id: kafka_iam_auth
title: Kafka AWS IAM Access Control
description: BladePipe supports IAM access control when connecting to AWS MSK.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes how to configure IAM access control when connecting to AWS MSK.

## Overview
AWS MSK is a managed Kafka service provided by Amazon. AWS provides IAM as a unified access control mechanism that allows resources within an AWS account to grant permissions to each other. BladePipe has built-in support for AWS IAM access control. This document explains how to configure it.

## Procedure
:::info
When you connect to AWS MSK using IAM, the built-in ACL rules in AWS MSK do not take effect. Permissions are determined by IAM policies/roles.
:::

### Enable IAM access control on AWS MSK

Make sure IAM authentication is enabled in the MSK cluster configuration and that the corresponding IAM role/user has the required permissions. For reference:

- [AWS: Create an Amazon MSK cluster that uses IAM access control](https://docs.aws.amazon.com/msk/latest/developerguide/create-iam-access-control-cluster-in-console.html)
- [AWS: Create IAM access control policies](https://docs.aws.amazon.com/msk/latest/developerguide/create-iam-access-control-policies.html)

### Get the Bootstrap Server

In the AWS MSK console, navigate to the cluster. The client connection endpoint is the Bootstrap Server.

### Configure BladePipe

BladePipe supports both **default credentials** and **named credentials** for IAM access control.     
With named credentials, you can connect to multiple MSK clusters with different identities on the same Worker.     



<Tabs groupId="awsmsk_connection">
  <TabItem value="default" label="Default Credentials" default>
1. Create a Kafka / AWS MSK DataSource, and fill in:
   - **Host**: enter the Bootstrap Server you got previously
   - **Authentication**: select **None**
   - **Extra Info**: only modify the value of **customClientProps** to the following JSON:
:::info
Parameter **customClientProps**: Custom properties passed to the Kafka client in JSON format. This setting takes the highest priority. If the setting duplicates another parameter, the value in **customClientProps** takes precedence.
:::
```json
{
    "security.protocol": "SASL_SSL",
    "sasl.mechanism": "AWS_MSK_IAM",
    "sasl.jaas.config": "software.amazon.msk.auth.iam.IAMLoginModule required;",
    "sasl.client.callback.handler.class": "software.amazon.msk.auth.iam.IAMClientCallbackHandler"
}
```
2. Click **Add DataSource**.
3. Test the connection on the DataSource list page.
:::info
When you use this method, credentials are not provided or managed by BladePipe. They are handled by the [AWS SDK Default Credential Provider Chain](https://github.com/aws/aws-msk-iam-auth?tab=readme-ov-file#configuring-a-kafka-client-to-use-aws-iam-with-sasl-oauthbearer-mechanism). The credential provider chain is:
1. Environment variables: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
2. Java system properties: aws.accessKeyId and aws.secretKey.
3. Web identity token credentials from the environment or container.
4. Default credentials file, usually located in the ~/.aws/credentials (path may vary by platform), shared by AWS SDKs and the AWS CLI.
5. Amazon ECS container credentials, loaded when AWS_CONTAINER_CREDENTIALS_RELATIVE_URI is set.
6. EC2 instance profile credentials, provided by the Amazon EC2 metadata service.
:::
</TabItem>
  <TabItem value="named" label="Named Credentials">
In some scenarios (for example, outside AWS ECS/EC2), the credential provider chain cannot provide valid credentials, and you need to specify them manually.
1. Obtain the Access Key ID and Secret Access Key (AK/SK) for the IAM user.
2. Create a Kafka / AWS MSK DataSource, and fill in:
   - **Host**: enter the Bootstrap Server you got previously
   - **Authentication**: select **AK/SK**, and fill in the AK/SK. Set **Username** to any value, for example `mskuser`.
   - **Extra Info**: only modify the value of **customClientProps** to the following JSON (note that **awsProfileName** at the end of **sasl.jaas.config** must match the username):
:::info
Parameter **customClientProps**: Custom properties passed to the Kafka client in JSON format. This setting takes the highest priority. If the setting duplicates another parameter, the value in **customClientProps** takes precedence.
:::
```json
{
    "security.protocol": "SASL_SSL",
    "sasl.mechanism": "AWS_MSK_IAM",
    "sasl.jaas.config": "software.amazon.msk.auth.iam.IAMLoginModule required awsProfileName=\"mskuser\";",
    "sasl.client.callback.handler.class": "software.amazon.msk.auth.iam.IAMClientCallbackHandler"
}
```
3. Click **Add DataSource**.
4. Test the connection on the DataSource list page.
  </TabItem>
</Tabs>
