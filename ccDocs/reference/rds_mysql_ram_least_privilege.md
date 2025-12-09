---
id: rds_mysql_ram_least_privilege
title: 阿里云 AK/SK 最小权限要求
---

CloudCanal 在新增和同步阿里云数据源时需要填入 AK/SK，涉及到阿里云 RAM 账号的一些权限。本文档主要介绍 CloudCanal 同步 RDS for MySQL 包含增量同步所需要的 RAM 最小权限。

## 以阿里云方式添加

采用阿里云方式新增 RDS for MySQL 可以参考[新增阿里云数据源](../operation/datasource_manage/add_aliyun_ds.md)，
阿里云 RAM 权限配置可由主账号到 [RAM 权限配置](https://ram.console.aliyun.com/policies/edit) 进行配置。

所需 RAM 权限如下表所示：

| 名称 | 描述 |
| --- | --- |
| rds:DescribeDBInstances  | 查询实例列表 |
| rds:DescribeDBInstanceNetInfo  | 查询连接地址 |
| rds:DescribeDBInstanceAttribute  | 查询实例详情 |
| rds:DescribeDBInstanceIPArrayList  | 查询RDS实例IP白名单 |
| rds:ModifySecurityIps  | 修改IP白名单 |
| rds:AllocateInstancePublicConnection  | 为实例申请公网连接地址 |
| rds:DescribeDatabases  | 查看实例下的数据库信息 |
| rds:DescribeAccounts  | 查询账号信息 |
| rds:CreateDatabase  | 创建数据库 |
| rds:CreateAccount  | 创建账号 |
| rds:GrantAccountPrivilege  | 授权账号访问数据库 |
| rds:DescribeBinlogFiles  | 查看Binlog日志 |
| rds:DescribeBackupPolicy  | 查询备份设置 |
| rds:ModifyBackupPolicy  | 修改备份策略设置 |


## 以自建数据库方式添加并改为阿里云数据库

为了追求更小的使用权限，有些用户会将以自建的方式添加阿里云 RDS for MySQL，再切回到阿里云的部署类型。

该方式下所需 RAM 权限如下表所示：

| 名称 | 描述 |
| --- | --- |
| rds:DescribeDBInstanceIPArrayList  | 查询RDS实例IP白名单 |
| rds:ModifySecurityIps  | 修改IP白名单 |
| rds:DescribeBinlogFiles  | 查看Binlog日志 |
| rds:DescribeBackupPolicy  | 查询备份设置 |
| rds:ModifyBackupPolicy  | 修改备份策略设置 |

:::info
上述权限为任务运行的最小权限，如任务有特殊需求，如新建数据库等需求，可另行添加权限或手动自建数据库。
:::

## 操作方式
### 配置阿里云 OpenAPI 调用使用的 AccessKey ID 和 AccessKey Secret
1. 点击 **配置** > **个人资料**。
2. 选择 **安全** 页签。
3. 在 **阿里云访问权限** 下，点击 **授权访问**。
4. 输入有数据源 OpenAPI 调用权限的 AccessKey ID (AK) 和 AccessKey Secret（SK）。
5. 点击 **确定**，配置成功。
:::info
如果用户不希望 CloudCanal 保存 AccessKey ID 和 AccessKey Secret，在修改完数据源以后可以再次打开该窗口，解除授权访问，避免 CloudCanal 存储该授权信息。
:::


### 修改数据库内容

1. 获取实例 ID 信息。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/ram_least_privilege/1.png)
   
2. 获取公网 IP 端口号信息。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/ram_least_privilege/2.png)
   
3. 获取数据源 ID 信息。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/ram_least_privilege/3.png)
   
4. 获取邮箱和手机号信息。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/ram_least_privilege/4.png)
   
5. 获取阿里云 AK/SK 信息。
   
    执行 SQL 获取加密后的阿里云 AK 和 SK：
    ```sql
    select aliyun_ak, aliyun_sk 
    from console.console_user 
    where 
      phone = [手机号码] 
      and email = [邮箱];
    
    -- 结果如下
    
     -----------------------
    | aliyun_ak | aliyun_sk |
     -----------------------
    |   AK信息   |   SK信息  |
     -----------------------
    ```

6. 执行 SQL 完成修改。
    ```sql
    UPDATE console.data_source
    SET deploy_type = "ALIBABA_CLOUD_HOSTED",
        host_type = "PUBLIC",
        public_security_type = "USER_PASSWD",
        HOST = [公网IP:端口号],
        public_host = [公网IP:端口号],
        instance_id = [实例ID名称],
        access_key = [AK],
        secret_key = [SK]
    WHERE
        id = [数据源id];
    ```
