---
id: rn-cloudcanal-5-0-0-0
title: 5.0.0.0
---
## CloudCanal-5.0.0.0

发版时间:2025年8月7日 版本号: 5.0.0.0


## 新特性

- 支持 [CloudCanal SaaS 模式](../quick/quick_start_byoc.md)，使用 BYOC (Bring Your Own Cloud) 方式 ，即管控平台共享，数据迁移同步客户端位于用户自有环境。
- 支持 CloudCanal SaaS 预充值，[按数据迁移/同步条数扣费（PAY AS YOU GO）](../price/product_price.md#saas-定价)。   
- 支持 为 License 购买或 SaaS 费用申请发票，后台处理完毕后发送到指定的接收邮箱。
- 支持 导入任务时可对数据源测试连接。

## 优化

- 优化 导入任务增加表单判空校验。

## 问题修复

- 修复 导入 Oracle 源端任务时，默认增量模式为 MLog 的问题，当前判定为空后，自动设置成 Redo 模式（即 LogMiner）。
