---
id: product_price
title: Pricing
description: BladePipe offers different pricing models for its Cloud and Enterprise plans. The Cloud plan uses a pay-as-you-go model, while the Enterprise plan uses a license-based pricing model.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This page details the pricing for the paid plans. For a comprehensive feature comparison across all editions, see [Plans Comparison](plans_diff.md).

The paid plans include the **Cloud** and **Enterprise** editions. Pricing is calculated based on your enabled **data pipeline** capabilities, such as Full Data, Incremental, Verification, Correction, and Schema Migration. Costs scale reasonably alongside your workload volume and pipeline complexity.

## Plans

### Cloud (Managed & BYOC)

BladePipe Cloud offers two deployment modes: Managed and BYOC (Bring Your Own Cloud).

- **Managed**: BladePipe fully manages both the Console and the Worker. You do not need to deploy or maintain any infrastructure.
- **BYOC**: You deploy the BladePipe Worker securely within your local network. The Worker connects to the Cloud Console for management. The Cloud Console only stores necessary metadata (such as schema structures and performance metrics). Your actual business data remains strictly within your private network.

The unit pricing for Managed and BYOC modes is identical. You can also estimate your monthly costs using the [Price Calculator](https://www.bladepipe.com/pricing/).

| Function | Pricing | 
| --- | ---|
| Full Data | 0.01 USD per million rows | 
| Incremental | 10.00 USD per million rows |
| Verification | 0.01 USD per million rows | 
| Correction | 0.10 USD per million rows |
| Schema Migration | 0.10 USD per 100 tables/schema |

### Enterprise (On-Premise)

The Enterprise plan gives you complete control. You deploy BladePipe entirely within your local network using flexible methods like [Docker](../productOP/onPremise/installation/install_all_in_one_docker.mdx), [Kubernetes (K8s)](../productOP/onPremise/installation/install_all_in_one_k8s.mdx), or [Binary](../productOP/onPremise/installation/install_all_in_one_binary.md).

The Enterprise edition uses a prepaid [license](../license/license_use.md). Your license price depends on your authorized link count and duration.

| [Links](../reference/service_difference.md) | Duration | Price |
|---|---|---|
| 1 | 1 Hour | 0.20 USD |

Here are some Enterprise pricing examples:

| Links | Duration | Price |
|---|---|---|
| 1 | 1 Month | 144.00 USD |
| 1 | 1 Year | 1752.00 USD |
| 5 | 1 Month | 720.00 USD |
| 5 | 1 Year | 8760.00 USD |

## How to Choose

The Cloud and Enterprise plans cover diverse business requirements. Review the primary differences below to select the best plan for your organization:

| | Cloud (Managed) | Cloud (BYOC) | Enterprise (On-Premise) |
|---|---|---|---|
| **Deployment** | Fully managed, zero maintenance | Private Worker, Public Console | Fully deployed in your network |
| **RBAC** | No | No | Yes |
| **Infrastructure** | No resources required | 1 Virtual Machine (for Worker) | 1 Large VM (Console, Worker, & Meta-DB) |
| **SSO** | Google | Google | Username/Password, LDAP, etc. |
| **Customization** * | No | No | Yes |

:::info
\* **Customization**: BladePipe provides paid development support for specific Enterprise requirements, including new DataSources or functions.
:::

## Billing & Payment

Payment methods vary based on the pricing model you choose.

<Tabs groupId="bppay">
  <TabItem value="cloud" label="Cloud (Managed & BYOC)" default>
### Payment
1. Log in to [BladePipe](https://www.bladepipe.com/).
2. [Install a Worker](../productOP/byoc/installation/install_worker_docker.md) (for BYOC mode). 
3. Add a payment card.
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
- Go to **Settings** > **Billing** page and check daily billing.
- Go to **Settings** > **Billing** > **Details** for more details.

:::info
BladePipe Cloud processes subscription payments securely via **Stripe**.
:::
 </TabItem>
 <TabItem value="enterprise" label="Enterprise">
### Payment
1. Log in to [BladePipe](https://www.bladepipe.com/) and download the BladePipe On-Premise package. 
2. [Install BladePipe On-Premise](https://www.bladepipe.com/docs/productOP/onPremise/installation/install_all_in_one_docker/).
3. [Get License](../license/license_use.md) and activate BladePipe.

:::info
BladePipe Enterprise securely accepts invoice and upfront payments through **Stripe**.
:::
 </TabItem>
</Tabs>