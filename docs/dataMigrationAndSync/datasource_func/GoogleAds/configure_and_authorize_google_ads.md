---
id: configure_and_authorize_google_ads
title: Configure and Authorize a Google Ads DataSource
description: This document describes how to configure Google Cloud and Google Ads account information, and authorize a Google Ads source DataSource in BladePipe.
---

BladePipe reads advertising report data through the **Google Ads API**.

Before adding a GoogleAds DataSource, prepare a **Google Ads manager account**, an **Ads Developer Token**, and a **Google Cloud OAuth application**.

After creating the DataSource, a Google user with access to the advertising accounts must complete API authorization.

## Configuration Items

| Configuration Item | Location | Purpose |
| --- | --- | --- |
| OAuth Client ID and OAuth Client Secret | Google Cloud project | Identify the web application that initiates OAuth authorization. |
| Ads Developer Token | Google Ads manager account (MCC) | Identifies the application calling the Google Ads API and determines the accessible account types and API quota. |
| Login Customer ID | Google Ads manager account (MCC) | The customer ID of the Google Ads manager account. This parameter is required when accessing client accounts through a manager account. |
| Customer IDs | Google Ads manager account (MCC) | The list of Google Ads client account IDs whose report data will be synchronized. |
| Authorizing Google account | Google OAuth authorization page | Must have access to the manager account specified by the Login Customer ID and its managed client accounts. |

## Step 1 - Prepare Google Ads Accounts

1. Prepare a [Google Ads manager account](https://developers.google.com/google-ads/api/docs/concepts/account-types), and link the client accounts whose data you want to synchronize to the manager account.
2. Ensure that the Google account used for OAuth authorization can access both the manager account and the target client accounts.
3. Record the **manager account customer ID** and one or more **target client account IDs**.
   - Example: `123-456-7890`

### Obtain an Ads Developer Token

1. Sign in to the [API Center](https://ads.google.com/aw/apicenter) with the Google Ads manager account.
2. If you have not yet applied for a Developer Token, complete the API Access form and accept the applicable terms.
3. Record the Developer Token displayed in the API Center.
   - For details about Developer Token access levels, see [Google Ads API Developer Token](https://developers.google.com/google-ads/api/docs/api-policy/developer-token).
   - A Google Cloud project can be associated with only one Google Ads Developer Token.

## Step 2 - Configure a Google Cloud OAuth Application

### Create a Project and Enable the Google Ads API

1. Sign in to the [Google Cloud Console](https://console.cloud.google.com/), and create or select a project.
2. Go to **APIs & Services** > **Library**, search for **Google Ads API**, and enable it.

### Configure Google Auth Platform

1. Go to **Google Auth Platform** > **Branding**, and set the application name, user support email, and developer contact email.
2. Go to **Audience**, and select the application audience:
   - Select **Internal** if the application is used only within the same Google Workspace organization.
   - Select **External** if Google accounts outside the organization need to authorize the application.
   - When an External application is in Testing status, refresh tokens issued by Google typically expire seven days after authorization. For continuous synchronization in a production environment, publish the application and complete any verification required by Google.
3. Go to **Data Access**, and confirm that the application requires the following scopes:
   - `openid`
   - `email`
   - `https://www.googleapis.com/auth/adwords`

### Create an OAuth Client

1. Go to **Google Auth Platform** > **Clients**, and click **Create Client**.
2. Select **Web application** as the Application type.
3. Add the complete BladePipe callback URL to **Authorized redirect URIs**:
   ```text
   https://<BladePipe Console domain>/callback/googleads/oauth
   ```
4. After creating the client, record its **Client ID** and **Client Secret**.

## Step 3 - Add a Google Ads DataSource

1. Sign in to BladePipe Console, and click **DataSource** > **Add DataSource**.
2. Select **GoogleAds** as the database type. The network address defaults to `googleads.googleapis.com` and does not need to be changed.
3. Enter a DataSource description, and configure the following **Additional Parameters**.

   | Parameter | Required | Description |
   | --- | --- | --- |
   | `loginCustomerId` | Yes | The customer ID of the Google Ads manager account. Enter digits only, without hyphens. |
   | `customerIds` | Yes | A JSON array of target client account IDs, for example, `["3028850329", "1234567890"]`. The accounts must be managed by the manager account specified by `loginCustomerId`. |
   | `apiVersion` | No | The default value is `Latest`. Retain the default value. |
   | `catalogVersion` | No | The built-in Google Ads Schema Catalog version. Retain the default value. |
   | `dbsJson` | No | The built-in report schema. Retain the default value. |
   | `timezone` | As needed | Used to plan report refresh dates. The default value is `UTC`. Use the IANA time zone that matches the advertising account reports, for example, `Asia/Shanghai`. |
   | `refreshWindowDays` | As needed | The number of historical report days to retrieve again during scheduled refreshes. The default value is `95`. |
   | `conversionLookbackDays` | As needed | The conversion attribution lookback period in days. The default value is `90`. The actual refresh window is the greater of this value and `refreshWindowDays`. |

4. Click **Add DataSource**. If Google Ads Project information has not been configured for the current BladePipe account, enter the following information in the dialog box:
   - **OAuth Client ID**: The Client ID of the Google Cloud web application.
   - **OAuth Client Secret**: The Client Secret of the Google Cloud web application.
   - **Ads Developer Token**: The Developer Token obtained from the Google Ads manager account's API Center.
   - **OAuth Callback Site**: The BladePipe Console site URL, for example, `https://console.example.com`.
5. Confirm that the complete Authorized redirect URI displayed in the dialog box exactly matches the value configured on the Google Cloud Clients page. Save the configuration and continue adding the DataSource.

## Step 4 - Complete API Authorization

1. Return to the **DataSource** list, and locate the newly created GoogleAds DataSource.
2. Click **API Authorization** in the Operation column, and then click **API Authorization** again in the dialog box.
3. After the page redirects to Google, select a Google account that can access the manager account and target client accounts.
4. Review the requested scopes and grant access. After authorization is complete, the page automatically returns to the BladePipe DataSource list and displays a success message.

## Step 5 - Verify Authorization

1. Create a synchronization DataJob, select the GoogleAds DataSource, and click **Test Connection**. If the test succeeds, the DataSource contains valid OAuth authorization information and you can continue selecting objects to synchronize.
   - If BladePipe reports that the DataSource has not been authorized, return to the **DataSource** list and click **API Authorization** for the DataSource.
