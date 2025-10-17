---
id: add_sms_alert
title: 配置短信告警或验证码
description: 介绍如何配置 CloudCanal 手机短信告警或者验证码
---

CloudCanal 具备发送短信告警或验证码能力，该能力强依赖阿里云短信服务。

本文档即介绍如何配置阿里云短信服务实现 CloudCanal 短信告警或验证码能力。

### 开通阿里云短信服务

- [登录阿里云控制台](https://www.aliyun.com/)
- [新增资质](https://dysms.console.aliyun.com/domestic/text/qualification)
- [添加签名](https://dysms.console.aliyun.com/domestic/text)
  - 此签名将带在短信头部，建议短小且有意义，如公司/组织名称，如 XXX_LTD_CO

### 添加模版
- 添加模版 [入口](https://dysms.console.aliyun.com/domestic/text/template)
- CloudCanal 使用了以下模版，模版内容可以变化（以增加通过概率),但参数不能变化
  - 验证码短信

  ```shell
  您的验证码为：${code}，请勿泄露于他人！
  ```
  
  - 系统告警短信，类别为通知短信

  ```shell
  CloudCanal系统异常,错误告警信息:${errMsg}
  ```
  
  - 任务告警短信，类别为通知短信

  ```shell
  CloudCanal任务异常,错误信息:${errMsg}
  ```

- 上述3个模版通过之后，分别获取模板CODE，如 SMS_11111111 , SMS_2222222 , SMS_3333333

### 添加 CloudCanal 短信模版数据
- 登录 CloudCanal 元数据库

  ```shell
  # e.g.,docker
  mysql -h127.0.0.1 -uroot -P25000 -p123456
  ```
  
- 确认没有初始化数据(结果为空)

  ```shell
  # ver 2.x 3.x
  mysql> select * from system_config where uid is null;
  Empty set (0.00 sec)
  
  # ver 4.x
  mysql> select * from rdp_sys_config where uid is null;
  Empty set (0.00 sec)
  ```

- 插入元数据
 
  ```shell
  # ver 2.x 3.x
  insert into system_config (config_name,config_value,description) values
  ('cloudcanal.sms.alert.signature.name','XXX_LTD_CO','signName'),
  ('cloudcanal.sms.verify.code.aliyun.common_verify_code_template','SMS_11111111','verify code sms template'),
  ('cloudcanal.sms.verify.code.aliyun.common_sys_alert_msg_template','SMS_2222222','system error sms template'),
  ('cloudcanal.sms.verify.code.aliyun.common_task_alert_msg_template','SMS_3333333','data job error sms template')
 
  # ver 4.x
  insert into rdp_sys_config (config_name,config_value,description) values
  ('cloudcanal.sms.alert.signature.name','XXX_LTD_CO','signName'),
  ('cloudcanal.sms.verify.code.aliyun.common_verify_code_template','SMS_11111111','verify code sms template'),
  ('cloudcanal.sms.verify.code.aliyun.common_sys_alert_msg_template','SMS_2222222','system error sms template'),
  ('cloudcanal.sms.verify.code.aliyun.common_task_alert_msg_template','SMS_3333333','data job error sms template')
  ```

### 修改 CloudCanal Console 配置

- 登录 console 部署节点

  ```shell
  ssh root@xx.xx.xx.xx
  ```

- 切换到 clougence 账号

  ```shell
  su - clougence
  ```
- 进入配置目录

  ```shell
  cd /home/clougence/cloudcanal/console/conf/
  ```

- 修改 business-output.properties 配置文件

  ```shell
  # ver 2.x,3.x
  console.config.send.alert.ak=
  console.config.send.alert.sk=
  
  # ver 4.x
  clougence.rdp.sms.aliyun.ak=
  clougence.rdp.sms.aliyun.sk=
  ```

### 重启 CloudCanal Console

- 进入脚本目录，并执行重启操作
   
  ```shell
  cd /home/clougence/cloudcanal/console/bin
  
  ./stopConsole.sh
  
  ./startConsole.sh
  ```

### Tips
- 如果存在多个 Console 节点，则逐节点修改、重启
- Console 节点能够访问 Aliyun 短信开放 API（外网）