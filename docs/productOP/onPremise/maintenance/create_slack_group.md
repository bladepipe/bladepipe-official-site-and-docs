---
id: create_slack_group
title: Create a Slack Bot
---
BladePipe integrates with the **Incoming WebHook** application on Slack channels by configuring the webhook to send alert messages to specified Slack channels. This document provides a brief introduction on how to obtain a valid webhook for use.

### Install Slack

- [Download Slack](https://slack.com) and install it. Skip if already installed.
- Register or log in. Skip if already logged in.


### Create a Slack Channel

- Create a channel

  ![](../../../assets/create_slack_group/1.png)

- Set Visibility
  
  ![](../../../assets/create_slack_group/2.png)


### Integration Incoming WebHook App

- Add Application

  ![](../../../assets/create_slack_group/3.png)

- Search and Install Incoming WebHook

  ![](../../../assets/create_slack_group/4.png)
 
- Add to Slack

  ![](../../../assets/create_slack_group/5.png)
  
### Obtain the webhook

- Configure WebHook

  ![](../../../assets/create_slack_group/6.png)

- Get Webhook URL

  ![](../../../assets/create_slack_group/7.png)
  

### Success

- After the Slack alert group is successfully created, and the Slack webhook is filled in the BladePipe **User Avatar**>**Account**>**User Setting**, subsequent BladePipe DataJob alerts will be sent to this group.

  ![](../../../assets/create_slack_group/8.png)
