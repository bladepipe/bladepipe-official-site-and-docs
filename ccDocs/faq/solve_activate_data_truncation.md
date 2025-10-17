---
id: solve_activate_data_truncation
title: 激活时出现 Data Truncation 异常
description: 本文介绍低版本 CloudCanal 重新激活时出现 Data Truncation 异常的解决方法
---
本文介绍重新激活低版本 CloudCanal 时出现 Data Truncation 异常的解决方法。

## 现象描述
低版本 CloudCanal（版本为 3.x 或 2.x）许可证到期后，重新申请许可证并激活时，出现以下报错信息：
```
### Error updating database. Cause: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'second_auth_code' at row 1 ### The error may exist in com/clougence/cloudcanal/console/mapper/authcode/AuthCodeInfoMapper.java (best guess) ### The error may involve com.clougence.cloudcanal.console.mapper.authcode.AuthCodeInfoMapper.insert-Inline ### The error occurred while setting parameters ### SQL: INSERT INTO auth_code_info ( company_name, start_time_ms, end_time_ms, username, phone, email, bind_mac_address, auth_code, auth_task_count, auth_code_status, src_auth_ds_type, dst_auth_ds_type, authed_worker_count, remind, public_key, auth_code_type, sys_tag, authed_env, second_auth_code, src_all_ds_type, dst_all_ds_type ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ### Cause: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'second_auth_code' at row 1 ; Data truncation: Data too long for column 'second_auth_code' at row 1; nested exception is com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'second_auth_code' at row 1
```

## 问题排查
CloudCanal 版本过低。

## 解决方法
*  修改字段长度。
```
alter table `cloudcanal_console`.`auth_code_info` modify column `second_auth_code` text;
```
