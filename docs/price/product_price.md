---
id: product_price
title: Pricing
description: BladePipe Private Deployments are available in three editions, including Community, Standard, and Enterprise. This article introduces the pricing and differences between the different editions.
---

BladePipe's pricing is based on pay-as-you-go billing. It charges according to the number of data rows you need to move. The unit price varies for different functions, namely, Full Data, Incremental, Verification, Correction, and Schema Migration. For different plans, the pricing varies.

## Plans

### Cloud (SaaS Managed & BYOC)
BladePipe Cloud includes two modes: SaaS Managed and BYOC.

In SaaS Managed mode, both the Console and the Worker are fully managed by BladePipe. No deployment or maintenance is required. 

In BYOC mode, BladePipe Worker is deployed in your local network, and the Worker is connected to the BladePipe Console on the cloud for management and control. Only necessary information is kept at BladePipe Console, such as database authentication information, schema information, and performance statistics. The specific business data is maintained in your own network.

For now, the unit price for SaaS Managed and BYOC are the same as shown in the table below. You can also estimate the cost based on the [price calculator](https://www.bladepipe.com/pricing).

|      Function     | Pricing                       | 
| ------------      | -------------------------------|
| Full Data       | 0.01 USD for 1 million rows   | 
| Incremental       | 10 USD for 1 million rows     |
| Verification       | 0.01 USD for 1 million rows   | 
| Correction       | 0.1 USD for 1 million rows    |
| Schema Migration | 0.1 USD for 100 tables/schema |

### Enterprise (On-premise)

In an on-premise deployment, BladePipe is completely deployed in your local network. Now we offer binary deployment method to ensure the privacy of your data.

BladePipe Enterprise uses a prepaid license for authorized use. The license defines the number of links and duration. The price is shown in the following table:

| [Links](../reference/service_difference.md)     |  Duration               | Price |
------------|-----------------------------|----|
| 1      |   1 Hour     | 0.3 USD |

More examples of pricing:

| Links     |  Duration               | Price |
------------|-----------------------------|----|
| 1      |   1 month     |   216.0 USD|
| 1      |   1 year      |  2628.0 USD|
| 5      |   1 month     |   1080.0 USD|
| 5      |   1 year    |   13140.0 USD|

## How to Choose

SaaS Managed, BYOC and Enterprise (On-premises) plan are suitable for a variety of business use cases. The main differences are as follows:

|            | Cloud (SaaS Managed) | Cloud (BYOC)                    | Enterprise (On-Premise)                 |
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

### Cloud (SaaS Managed & BYOC)

#### Payment
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

#### Billing
BladePipe bills based on the volume of data you used. You can check the volume you used on a daily basis.
- Navigate to **Settings** > **Billing** page and check daily billing.
- Navigate to **Settings** > **Billing** > **Details** for more details.

:::info
BladePipe Cloud accepts payment through **Stripe** by using it's subscription.
:::

### Enterprise

#### Payment
1. Log in to [BladePipe](https://www.bladepipe.com/) and download the BladePipe On-Premise package. 
2. [Install BladePipe On-Premise](../productOP/onPremise/installation/install_all_in_one_binary.md).
3. [Get License](../license/license_use.md) and activate BladePipe.

:::info
BladePipe Enterprise accepts payment through **Stripe**.
:::