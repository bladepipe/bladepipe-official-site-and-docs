---
id: create_process_job
title: 自定义代码任务
---
本文简要介绍了 CloudCanal 自定义代码操作步骤，涵盖代码开发、任务创建和更新、问题排查等。

## 简述

自定义代码允许用户使用 java 代码编写自定义数据处理逻辑，通过将代码 jar 包上传 CloudCanal ，在数据全量迁移、增量同步、数据校验订正时自动调用这些代码，达到各种数据转换处理目的。

自定义代码调用位于 CloudCanal 整个任务处理链的中间部分，如下图所示:

![Custom Code In CloudCanal](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/custom_code_in_cc.png)

## 应用场景
自定义代码主要应用于 CloudCanal 暂时无法标准化的数据迁移同步场景，具有灵活、带有一定业务语意、以及部分复杂度的特点。

以下罗列部分场景以供参考:

- **数据变换**
  - 数据脱敏，可附带业务加解密算法
  - 时间数据时区转换
- **数据清洗**
  - 异常值和空值处理
  - 缺失值补全
  - 数据标准化
- **实时宽表构建**
  - 事实表维表打宽表
- **数据汇聚**
  - 分库分表数据汇聚
  - 跨区域数据集中
- **业务逻辑处理**
  - 业务架构升级产生的数据复杂变换
  
## 操作步骤

### 代码开发
1. CloudCanal 提供了基础工程 [cloudcanal-data-process](https://gitee.com/clougence/cloudcanal-data-process)，将此工程导入 IDE 即可进行开发。
    :::info
    自定义代码开发推荐在 [IntelliJ IDEA](https://www.jetbrains.com/idea/) 或 [Eclipse](https://www.eclipse.org/) 等 java IDE 中进行。   
    cloudcanal-data-process 工程提供了应用示例，可参考修改进行应用。
    :::
2. 自定义代码类需要实现 `com.clougence.cloudcanal.sdk.api.CloudCanalProcessorV2` 接口达成被 CloudCanal 调用的目的。
  ![CloudCanalProcessorV2 implement](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/code_implement.png)

### 代码打包

1. 修改打包元信息。
  ![Modify Package Meta](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/package_meta.png)

2. 进入工程目录，使用命令进行打包。
    ```shell
    % pwd
    /Users/zylicfc/source/product/cloudcanal/cloudcanal-data-process
    % mvn -Dtest -DfailIfNoTests=false -Dmaven.javadoc.skip=true -Dmaven.compile.fork=true clean package
    ```

3. 执行命令后，可在对应目录得到 jar 包。
  ![Jar File Path](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/jar_position.png)

### 任务创建
1. 点击 **同步任务** > **创建任务**。
2. 进入 **数据处理** 页面，点击右上角 **上传自定义代码**。
3. 在弹出的对话框中点击 **上传插件** 后的按钮，并上传自定义代码包。
4. 任务自动运行。

### 代码调试

#### 远程 Debug
  1. CloudCanal 支持 debug 自定义代码，具体步骤可参考 [自定义代码debug](../job_op/debug_customer_code.md) 文档。
  2. 任务启动后，可在 IDE 中断点 debug。
  ![Debug Code](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/debug_code.png)

#### 打印日志
1. CloudCanal 日志组件提供了一个固定日志文件(`custom_processor.log`)可供业务逻辑打印日志。具体操作步骤可参考 [自定义代码中打印日志](../job_op/log_in_customer_code.md) 文档。
2. 生效后，在任务详情页点击 **查看日志 > custom_process.log** 可查看日志内容，也可根据提供的路径到终端 **任务日志目录** 查看完整的日志文件。
  ![Console Customer Log](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/console_customer_log.png)
  ![File Customer Log](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/file_customer_log.png)

### 代码更新
1. 在任务详情页面右上角点击 **功能列表** > **代码包管理**，或在页面左侧 **代码处理包** 一栏点击 **查看**。
2. 在弹出的对话框左上角点击 **上传新包**，上传代码。
3. 选择对应的代码包，点击操作栏中的 **激活**。
4. 激活后手动重启任务，否则代码包将不会生效。

## 常见问题

### 代码包不生效
- 自定义代码包传输只在任务启动时触发，可在页面上重启任务。
- 如果以上方法无效，可在 sidecar 容器或节点 `/home/clougence/cloudcanal/datahandle` 目录下查看代码包是否存在。
  ![Customer Code On Node](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/custom_code_on_node.png)
- 如果不存在包，可手动上传代码包（代码包名字按报错日志内提示进行修改）。

### 日志不打印
- 自定义代码日志只会打印在 custom_processor.log 中，请检查 logger 名字是否正确。
  ![Log Error](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/log_error.png)
- 若 logger 名字正确，请按照 **代码包不生效** 进行处理。

