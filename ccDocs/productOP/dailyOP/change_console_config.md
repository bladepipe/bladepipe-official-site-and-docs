---
id: change_console_config
title: 修改 Console 控制台配置
description: 本文档介绍 CloudCanal 如何修改 Console 控制台配置
---

本文档介绍 CloudCanal 如何修改 Console 控制台配置

## 修改 Console 配置

- TGZ 部署
    - vi `${安装目录}`/cloudcanal/console/conf/business-output.properties
- Docker 部署
    - docker exec -it cloudcanal-console /bin/bash
    - vi /home/clougence/cloudcanal/console/conf/business-output.properties
- K8s 部署
    - kubectl edit cm console-config -n cloudcanal

## 修改相应参数后保存

## 重启 Console

- TGZ 部署
    - cd `${安装目录}`/cloudcanal/console/bin/ && su clougence -c "./stopConsole.sh" && su clougence -c "
      ./startConsole.sh"
- Docker 部署
    - docker exec cloudcanal-console bash -c "cd /home/clougence/cloudcanal/console/bin && su clougence -c "
      ./stopConsole.sh" && su clougence -c "./startConsole.sh""
- K8s 部署
    - kubectl exec -it console-0 -n cloudcanal -- bash -c 'cd /home/clougence/cloudcanal/console/bin/ && su
      clougence -c "./stopConsole.sh" && su clougence -c "./startConsole.sh"'
