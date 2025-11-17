---
id: connect_private_db
title: SaaS 连接私网数据库
description: SaaS 连接私网数据库
---

本篇文章旨在介绍使用一台公网跳板机，让 CloudCanal SaaS 连接上私网数据库。

注意：请仔细评估安全风险后再执行此方案。

# 步骤

## 准备跳板机
1. 建议使用云服务器或 vps , 带公网 IP, 如 **proxy_host** , 此例用 centos 系统。
2. 先放开安全组入方向的端口和 IP, 待配置完成后修改。
3. 登陆云服务器或 vps。
4. 修改 `/etc/ssh/sshd_config`，将 GatewayPorts 项注释符 # 去掉，并修改值为 no (如没有，则添加)。
   ```ssh
   GatewayPorts yes
   ```
5. 重启 ssh 服务。
   ```ssh
   systemctl restart sshd
   ```

## 反向连接
1. 内网能够连接到数据库的机器上，执行反向代理命令，比代理端口为 **proxy_port** ，数据库为 **mysql_host**:**mysql_port**
   ```ssh
   ssh -o ServerAliveInterval=30 -NR 0.0.0.0:proxy_port:mysql_host:mysql_port user@proxy_host
   ```

## 连接并配置访问
1. 返回 [CloudCanal 云平台](https://www.clougence.com)。
2. 点击 **数据源管理** > **新增数据源** ，网络地址填写 **proxy_host** 和 **proxy_port**，其他配置如同正常连接配置。
3. 测试连接。

## 安全设置

如局域网的公网出口 IP 周期性变化，则本步骤不要执行或做临时配置。

### 获取迁移机器 IP
1. 登陆 [CloudCanal 云平台](https://www.clougence.com)。
2. 切换到 **全托管模式**。
3. 点击 **同步设置** > **同步机器**。
4. 选择使用的迁移同步集群，并点击 **机器 ip 列表** 备用。

### 获取局域网的公网出口 IP
1. 局域网内机器执行以下命令获取公网出口 IP
   ```ssh
   curl https://getip.clougence.com/
   ```

### 跳板机配置 IP 白名单
1. 登陆跳板机。
2. 将上述 IP 配置到 iptable 中，如使用云服务器或 vps ，则配置相应安全组。