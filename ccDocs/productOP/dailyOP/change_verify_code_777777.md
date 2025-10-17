---
id: change_verify_code_777777
title: 修改验证码
description: 本文档介绍 CloudCanal 中使用的默认验证码。 
---

CloudCanal 私有部署默认设置验证码为 777777。如需修改，可按照以下步骤修改。

## 步骤
1. 参考 [修改控制台配置](./change_console_config.md) 文档，找到配置文件。
2. 定位 key 为 **console.config.product.trial.verify_code** 的参数。
3. 设置该参数的值为预期值。
4. 参考 [修改控制台配置](./change_console_config.md) 文档，重启控制台。

## FAQ

**Q: 如果想用真实的短信验证码怎么配置呢?**    
**A:** 目前 CloudCanal 的短信功能依赖阿里云服务，申请相应短信模版后，可通过配置文件进行配置，具体配置可联系我们。

