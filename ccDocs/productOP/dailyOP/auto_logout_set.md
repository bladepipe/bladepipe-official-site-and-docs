---
id: auto_logout_set
title: 配置登录失效时间
description: CloudCanal 支持用户自定义系统登录失效时间。
---

CloudCanal 支持用户自定义系统登录失效时间，增强系统操作的安全性和用户隐私。本文以 Docker 版 CloudCanal 为例，介绍如何配置系统登录失效时间。

## 简介

登录失效时间指系统不活动的时间。若您在登录失效之前操作系统，失效时间将在该操作后重新开始计算。若您在设置的失效时间内没有任何操作，系统将自动登出并定向到登录页面。

## 操作步骤

1. 在终端运行以下命令，进入容器。
    ```
    docker exec -it cloudcanal-console /bin/bash
    ```

2. 配置登录失效时间。   

   a. 运行以下命令：
    ```
    vim cloudcanal/console/conf/business-output.properties
    ``` 
    
   b. 添加系统登录失效时间配置。
   ```
   clougence.rdp.login.expire.sec = 300 # 时间单位为秒，这里设置的登录失效时间为300秒。
   ```   

    c. 保存并退出。

3. 执行以下命令，重启控制台。
    ```
    docker restart cloudcanal-console
    ```

4. 重新登录系统后，系统将执行新配置的登录失效时间。
