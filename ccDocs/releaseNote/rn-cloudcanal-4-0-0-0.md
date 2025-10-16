---
id: rn-cloudcanal-4-0-0-0
title: 4.0.0.0
---

## CloudCanal-4.0.0.0

发版时间:2024年4月10日 版本号: 4.0.0.0

### 新特性

- 支持 系统内建[主子账号](../operation/system_manage/account_and_auth/account_and_auth.md)，让团队化使用更加自然
- 支持 [功能维度 RBAC（Role-Based Access Control)](../operation/system_manage/account_and_auth/role_auth.md)
- 支持 [资源维度授权鉴权](../operation/system_manage/account_and_auth/res_auth.md)，目前支持 数据源实例和数据迁移同步任务
- 支持 多集群部署(按数量、地域、公司组织分割)，共享主子账号、数据源信息，可支持上万条数据迁移同步任务
- 支持 CloudDM Team (beta) 和 CloudCanal 组合部署，共享主子账号、数据源信息，组合成 ClouGence RDP ( Real Time Data Platform) 并可拓展其他组件

### 注意点

- 此版本对账号、权限、资源归属做了重大改变，如需从 2.x, 3.x 版本升级到此版本或后续版本，请参考 [升级 3.x 版本到 4.x](../productOP/dailyOP/upgrade_to_rdp.md) 文档