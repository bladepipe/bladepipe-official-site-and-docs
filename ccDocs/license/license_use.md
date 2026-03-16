---
id: license_use
title: 许可证获取
description: CloudCanal可以通过申请许可证来获取任务数容量和时长。本文介绍了如何申请和使用许可证。
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本篇文章主要介绍 CloudCanal 私有部署版许可证的申请和使用流程。
## 术语
- **申请码**：作为免费获取或购买许可证的唯一凭证。
- **许可证**：用于激活 CloudCanal 系统，包含授权时长和授权任务数等。

## 安装 CloudCanal 
1. 登录 [CloudCanal 官网](https://www.clougence.com?src=cc-doc)。
2. 参考 [全新安装（Docker）](../productOP/docker/install_all_in_one_docker.mdx)文档，在官网点击 **免费社区版**，一键下载安装。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/1.png)
## 获取申请码
1. 进入 CloudCanal 控制台，点击右上角 **未激活/已激活** 文本。
2. 弹窗显示 **申请码**，点击 **复制** 按钮或直接选中复制文本。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/2.png)

## 获取许可证
在[官网](https://www.clougence.com?src=cc-doc) 点击 **获取许可证**。     

目前，CloudCanal 支持[社区版、商业试用版和商业版](../intro/product_version.md)。可按照以下步骤获取对应版本的许可证。

<Tabs groupId="license">
<TabItem value="community" label="社区版/商业试用版" default>
1. 在第二步，填入 **申请码**。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/3.png)
2. 在第三步，版本选择为 **社区版**/**商业试用版**。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/4.png)
3. 点击 **去付款**（此时订单金额为 0 元）。
4. 在许可证列表，点击 **查看**。
5. 在弹出的对话框中点击 **获取验证码**，并输入收到的验证码。
6. 验证完成后即可获取许可证。
</TabItem>
<TabItem value="enterprise" label="商业版">
1. 在第二步，填入 **申请码**。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/3.png)
2. 在第三步，版本选择为 **商业版**，并选择所需 [**链路数**](../reference/service_difference.md) 和 **有效期**，价格请参考 [产品定价](../price/product_price.md)。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/5.png)
3. 选择支付方式，并点击 **去付款**。
    :::info
    可选择 **支付宝** 或 **银行卡** 支付方式：
    * **支付宝**：进行在线支付。
    * **银行卡**：需联系工作人员进行线下转账。
    :::
4. 支付成功后，在许可证列表点击 **查看**。
5. 在弹出的对话框中点击 **获取验证码**，并输入收到的验证码。
6. 验证完成后即可获取许可证。
</TabItem>
</Tabs>

## 激活产品
1. 复制许可证，并返回 CloudCanal 控制台。
2. 在 **私有版部署详情** 对话框，将许可证粘贴至 **输入许可证** 输入框。     
   如您的 CloudCanal 正处于激活状态，请点击 **重新激活**，将会出现 **输入许可证** 输入框。
3. 点击 **立即激活**。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/license/6.png)
    
    :::info
    - 点击 **已激活** 文本，可看到授权的信息。如需延长使用时间或获取更多资源，按上面的步骤重新申请许可证即可。    
    - 社区版许可证到期前请尽快到官网自助续签，商业版许可证到期前请[联系我们](https://www.clougence.com/about)帮助续签或到官网自助续签。    
    - 许可证到期后会影响正在运行的任务，详情请参考 [许可证到期说明](../reference/license_overdue.md)。
    :::