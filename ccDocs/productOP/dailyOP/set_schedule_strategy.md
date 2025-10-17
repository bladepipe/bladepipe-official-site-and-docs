---
id: set_schedule_strategy
title: 配置任务调度策略
---

CloudCanal 支持用户根据需求和实际情况设置任务调度策略，提高任务运行效率。本文以 Docker 版 CloudCanal 为例，介绍如何配置任务调度策略。

## 简介

CloudCanal 目前有两种调度策略：ROUND_ROBIN （顺序分配）和 LOAD_MEM_BALANCE （按负载分配）。
- ROUND_ROBIN （顺序分配）：按任务先后顺序依次分配到每个节点上。
- LOAD_MEM_BALANCE （按负载分配）：根据计算合理分配每个节点的任务负载，以实现负载均衡。

## 操作步骤

1. 在终端运行以下命令，进入容器。
    ```
    docker exec -it cloudcanal-console /bin/bash
    ```

2. 配置任务调度策略。   

   a. 运行以下命令：
    ```
    vim cloudcanal/console/conf/business-output.properties
    ``` 
    
   b. 根据需求设置调度策略。
   ```
   console.config.autoscheduler.schedule.strategy= ROUND_ROBIN/LOAD_MEM_BALANCE 
   ```   

    c. 保存并退出。

3. 执行以下命令，重启控制台。
    ```
    docker restart cloudcanal-console
    ```

4. 重新登录系统后，系统将执行新配置的任务调度策略。
