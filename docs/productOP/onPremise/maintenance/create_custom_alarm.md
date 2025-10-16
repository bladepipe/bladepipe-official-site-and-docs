---
id: create_custom_alarm
title: Create Webhook Alerts
---

BladePipe allows you to configure custom Webhooks. Taking Java as an example, this article introduces custom Webhook request parameters.

## Request Method

**POST**

## Request Parameters

| Parameter | Type | Description | Necessary or not |
|---------|---------|-----|----|
| job_id | long | DataJob id | No |
| job_name | String | DataJob name | No |
| job_desc | String | DataJob description | No |
| job_create_ts | String | DataJob creation time | No |
| alert_user | String[] | User name of receiver| No |
| content | String | Alert notification details | Yes |

## Procedure

### Prepare for Webhook Service
Taking Spring MVC as an example, here the received parameter information is printed. You can make changes based on business needs.
```java
package com.clougence.webhook.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
public class WebhookController {

    @PostMapping("/webhook")
    public void webhook(@RequestBody WebhookVo webhookVo) {
        // TODO Here the received parameter information is printed. You can make changes based on business needs...
        System.out.println(webhookVo);
    }

    static class WebhookVo {
        private Long job_id;
        private String job_name;
        private String job_desc;
        private String job_create_ts;
        private String[] alert_user;
        private String content;

        public Long getJob_id() {
            return job_id;
        }

        public void setJob_id(Long job_id) {
            this.job_id = job_id;
        }

        public String getJob_name() {
            return job_name;
        }

        public void setJob_name(String job_name) {
            this.job_name = job_name;
        }

        public String getJob_desc() {
            return job_desc;
        }

        public void setJob_desc(String job_desc) {
            this.job_desc = job_desc;
        }

        public String getJob_create_ts() {
            return job_create_ts;
        }

        public void setJob_create_ts(String job_create_ts) {
            this.job_create_ts = job_create_ts;
        }

        public String[] getAlert_user() {
            return alert_user;
        }

        public void setAlert_user(String[] alert_user) {
            this.alert_user = alert_user;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        @Override
        public String toString() {
            return "WebhookVo{" +
                    "job_id=" + job_id +
                    ", job_name='" + job_name + '\'' +
                    ", job_desc='" + job_desc + '\'' +
                    ", job_create_ts='" + job_create_ts + '\'' +
                    ", alert_user=" + Arrays.toString(alert_user) +
                    ", content='" + content + '\'' +
                    '}';
        }
    }
}
```

### Send Alert Notifications via IM 
1. Log in to the On-premised BladePipe. 
2. In the top navigation bar, click **Settings**.
3. In the left-side navigation pane, click **Preference**.
4. Modify the value of ***alertImType*** as **custom**, and ***defaultImAlertUrl*** as **Webhook URL**. Then click **Submit** in the upper right corner.  
5. Click **Verify IM Alarm** at the bottom of the page.
6. A POST request is sent using cURL.
```
curl -H 'content-type: application/json' -X POST -d '{"job_id":null,"job_name":null,"job_desc":null,"job_create_ts":null,"alert_user":["Trial"],"content":"【BladePipe】【output】This is a message sent by BladePipe to verify the IM alert service based on the system configuration information you provided. When you receive this message, it means that your system configuration is correct."}' http://192.168.0.105:8080/webhook
```