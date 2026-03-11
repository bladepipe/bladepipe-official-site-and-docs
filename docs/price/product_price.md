---
id: product_price
title: Pricing
description: BladePipe has different pricing models for Cloud and Enterprise plans. Cloud is based on pay-as-you-go model, and Enterprise is license-based pricing model.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

BladePipe offers both **free** and **paid** plans with a transparent data pipeline pricing model, designed to clearly reflect actual data migration cost and data integration cost across different usage scenarios.

This page describes the pricing details of the paid plans. For a detailed comparison between the free and paid plans, see [Plans Diff](plans_diff.md).

The paid plans include **Cloud** and **Enterprise** editions. Pricing is calculated based on enabled pipeline capabilities, including Full Data, Incremental, Verification, Correction, and Schema Migration. Unit pricing may vary by plan and feature, allowing costs to scale reasonably with pipeline complexity and workload increase.

## Plans

### Cloud (Managed & BYOC)
BladePipe Cloud includes two modes: Managed and BYOC.

In Managed mode, both the Console and the Worker are fully managed by BladePipe. No deployment or maintenance is required. 

In BYOC mode, BladePipe Worker is deployed in your local network, and the Worker is connected to the BladePipe Console on the cloud for management and control. Only necessary information is kept at BladePipe Console, such as database authentication information, schema information, and performance statistics. The specific business data is maintained in your own network.

For now, the unit price for Managed and BYOC are the same as shown in the table below. You can also estimate the cost based on the [price calculator](https://www.bladepipe.com/pricing/).

|      Function     | Pricing                       | 
| ------------      | -------------------------------|
| Full Data       | 0.01 USD for 1 million rows   | 
| Incremental       | 10 USD for 1 million rows     |
| Verification       | 0.01 USD for 1 million rows   | 
| Correction       | 0.1 USD for 1 million rows    |
| Schema Migration | 0.1 USD for 100 tables/schema |

### Enterprise (On-premise)

In an on-premise deployment, BladePipe is completely deployed in your local network. Now we offer flexible deployment methods, namely Docker, K8s and binary.

BladePipe Enterprise uses a prepaid [license](../license/license_use.md) for authorized use. The license defines the number of links and duration. The price is shown in the following table:

| [Links](../reference/service_difference.md)     |  Duration               | Price |
------------|-----------------------------|----|
| 1      |   1 Hour     | 0.2 USD |

More examples of Enterprise pricing:

| Links     |  Duration               | Price |
------------|-----------------------------|----|
| 1      |   1 month     |   144.0 USD|
| 1      |   1 year      |  1752.0 USD|
| 5      |   1 month     |   720.0 USD|
| 5      |   1 year    |   8760.0 USD|

## How to Choose

Cloud (Managed / BYOC) and Enterprise (On-premises) plans are suitable for a variety of business use cases. The main differences are as follows:

|            | Cloud (Managed) | Cloud (BYOC)                    | Enterprise (On-Premise)                 |
|------------|--------------|-----------------------|-----------------------------|
| **Deployment**      | No deployment is required | Private Workers connected to a public Console  | Totally deployed in your own network      |
| **Role-Based Access Control**| No | No | Yes |
| **Resource** | No resource is required | Only 1 VM (virtual machine) for Worker | Console, Worker, Meta-db all in one (need a larger VM)|
| **SSO support** | Google | Google | Username-password, LDAP and more |
| **Customization** * | No | No| Yes |

:::info
**Customization**: BladePipe provides paid support for common features that are not supported yet after evaluation, such as new DataSources, new functions, etc.
:::

## How to Pay
Based on different pricing models, the payment methods vary.
<Tabs groupId="bppay">
  <TabItem value="cloud" label="Cloud (Managed & BYOC)" default>
### Payment
1. Log in to [BladePipe](https://www.bladepipe.com/).
2. [Install a Worker](../productOP/byoc/installation/install_worker_docker.md) (for BYOC mode). 
3. Add a card.
   1. Navigate to **Settings** > **Payment** page.
   2. Click **Add New Card**.
   3. Enter card info and save.
4. Subscribe BladePipe.
   1. Navigate to **Settings** > **Payment** page.
   2. Choose one card already added.
   3. Click **Subscribe**.
5. Create a DataJob.
### Billing
BladePipe bills based on the volume of data you used. You can check the volume you used on a daily basis.
- Navigate to **Settings** > **Billing** page and check daily billing.
- Navigate to **Settings** > **Billing** > **Details** for more details.

:::info
BladePipe Cloud accepts payment through **Stripe** by using it's subscription.
:::
 </TabItem>
 <TabItem value="enterprise" label="Enterprise">
### Payment
1. Log in to [BladePipe](https://www.bladepipe.com/) and download the BladePipe On-Premise package. 
2. [Install BladePipe On-Premise](https://www.bladepipe.com/docs/productOP/onPremise/installation/install_all_in_one_docker/).
3. [Get License](../license/license_use.md) and activate BladePipe.

:::info
BladePipe Enterprise accepts payment through **Stripe**.
:::
 </TabItem>
</Tabs>