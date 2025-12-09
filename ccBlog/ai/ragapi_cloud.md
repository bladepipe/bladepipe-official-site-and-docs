---
id: ragapi_cloud
description: 使用 CloudCanal RagApi 你的专属 RAG 服务，全程无需使用代码
title: 零代码构建 RAG 私有知识问答服务
date: 2025-05-15
authors: juantu
tags:
  - ai
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/ai/ragapi_cloud.png
slug: /ai/ragapi_cloud
---
在之前的文章中，我们已经厘清了 GenAI 的关键概念：RAG、Function Calling、MCP、AI Agent。接下来的问题在于，如何从概念到实操？

目前，网上可以搜到很多 RAG 构建教程，但大部分教程都基于 LangChain 等，对小白来说仍有一定的入门门槛。

CloudCanal 本身作为数据同步平台，已经具备多源异构数据的接入与加工能力，在 RAG 系统构建语义搜索基础方面具备天然优势。近期 CloudCanal 推出的 **RagApi** 封装了**向量检索与模型问答能力**，为用户提供一个**即插即用的智能查询接口**。只需在 CloudCanal 中创建两个任务，即可获得你的专属 RAG 服务，全程无需使用代码。

## CloudCanal RagApi 优势
相比传统 RAG 架构手动部署流程，CloudCanal 提供的 RagApi 服务具有以下独特优势：

+ **双任务完成全流程：文档导入 + API 发布**。
+ **零代码部署**：无需开发，自定义配置即可构建 API 服务。
+ **参数可调**：支持设置向量 Top-K 数量、匹配阈值、Prompt 模板、模型温度等核心参数。
+ **多模型与平台适配**：支持阿里云 DashScope、OpenAI、DeepSeek 等主流模型与 API 平台。
+ **OpenAI API 兼容接口**：直接接入现有 Chat 应用或工具链，无需额外适配。

## 实例演示
本文将以 CloudCanal 官方文档为知识库，构建关于 CloudCanal 产品的 RAG 问答服务。

先展示效果：

[RagApi showoff.mp4](https://clougence.yuque.com/attachments/yuque/0/2025/mp4/46512490/1747304136320-9d918cf5-5942-48cd-89d4-dc6d3960a387.mp4)



创建这样一个 RAG 私有知识问答服务，需要用到：

+ **CloudCanal**：自动创建 RagApi 服务
+ **PostgreSQL**：向量数据库
+ **嵌入模型**：阿里云百炼平台（DashScope）的 **text-embedding-v3**
+ **对话模型**：阿里云百炼平台（DashScope）的 **qwq-plus**



整体工作流程如下：

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/1.png)

## 操作步骤
### 下载 CloudCanal
下载安装 [CloudCanal 私有部署版本](https://www.clougence.com/?src=cc-doc-file-to-aliyun-pg-vector)。

### 准备资源
1. 登录 [阿里云百炼](https://bailian.console.aliyun.com/?apiKey=1#/api-key) 并创建 API-KEY。
2. 本地安装免费的 PostgreSQL 数据库

```xml
#!/bin/bash

# 创建 docker-compose.yml 文件
cat <<EOF > docker-compose.yml
version: "3"
services:
  db:
    container_name: pgvector-db
    hostname: 127.0.0.1
    image: pgvector/pgvector:pg16
    ports:
      - 5432:5432
    restart: always
    environment:
      - POSTGRES_DB=api
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=123456
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
EOF

# 自动执行 docker-compose 启动
docker-compose up --build

# 进入 PG 命令行
docker exec -it pgvector-db psql -U root -d api
```

3. 创建高权限账号并登录。
4. 切换到需要建表的目标 schema (如`public`)。
5. 执行以下 SQL 开启向量能力。

```shell
CREATE EXTENSION IF NOT EXISTS vector;
```

### 添加数据源
登录 CloudCanal 平台，点击 **数据源管理** > **新增数据源**。

**添加文件：**

选择 **自建** > **SshFile** 数据源，可设定[额外参数](https://www.clougence.com/cc-doc/reference/file_schema_format)。

+ **网络地址**：填写目标文件所在机器和 SSH 端口（默认 22）。
+ **账号密码**：即登录目标机器的用户名、密码。
+ 参数 **fileSuffixArray**：填写 `.md` 以过滤出所有 markdown 文件。
+ 参数 **dbsJson**：复制默认值并修改 **schema** 值(即目标文件所在根目录)。

```json
[
  {
    "db":"cc_virtual_fs",
    "schemas":[
      {
        "schema":"/Users/johnli/source/cloudcanal-doc-v2",
        "tables":[]
      }
    ]
   }
]
```

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/2.png)

**添加向量数据库：**

选择 **自建** > **PostgreSQL**，获取数据源并添加。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/3.png)

**添加大模型：**

选择 **阿里云** > **手动填写** > **DashScope** 数据源，填写之前步骤获取的 API-KEY。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/4.png)

**添加 RagApi 服务：**

选择 **自建** > **RagApi**。

+ **网络地址**：填写为 `localhost`，端口默认使用 `18089`。
+ **API 密钥**：自定义一个 API-KEY，用于后续调用 RagApi 接口。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/5.png)

### 创建任务 1：数据向量化
1. 点击 **同步任务** > **创建任务**。   
2. 选择以下数据源，并点击 **测试连接** 确认网络与权限正常。
    - 源端：**SshFile**
    - 目标端：**PostgreSQL**

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/6.png)

3. 在 **功能配置** 页面，任务类型选择 **全量迁移**，任务规格选择默认 2 GB 即可。
4. 在 **表&action过滤** 页面，进行以下配置：
    1. 选择需要定时数据迁移的文件，可同时选择多个。
    2. 点击 **批量修改目标名称** > **统一表名** > 填写表名（如 file_vector），并确认，方便将不同文件向量化并写入同一个表。
    ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/7.png)

5. 在 **数据处理** 页面，进行以下配置：  
    1. 点击 **配置大模型** > **DashScope**，选择刚添加的大模型实例，并选择某一个嵌入模型（如 text-embedding-v3）。
    ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/8.png)
    2. 点击 **批量操作** > **大模型嵌入**，选择需要嵌入的字段，并全选表。
    ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/9.png)

6. 在 **创建确认** 页面，点击 **创建任务**，开始运行。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/10.png)

### 创建任务 2：RagApi 服务
1. 点击 **同步任务** > **创建任务**。
2. 选择以下数据源，并点击 **测试连接** 确认网络与权限正常。
    - 源端：**已配置的 PostgreSQL**（向量表所在库）
    - 目标端：**RagApi**

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/11.png)

3. 在 **功能配置** 页面，任务类型选择 **全量迁移**，任务规格选择默认 2 GB 即可。
4. 在 **表&action过滤** 页面，选择要使用的向量表（可多选）。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/12.png)

5. 在 **数据处理** 页面，**配置大模型**：
    1. **嵌入模型**：选择 DashScope 实例与向量数据使用的嵌入模型（如 `text-embedding-v3`）。

          **注意:** PostgreSQL 中的向量维度需与选定嵌入模型一致。

    2. **聊天模型**：选择 DashScope 实例与对话模型（如 `qwq-plus`）。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/13.png)

6. 在 **创建确认** 页面，点击 **创建任务**，系统将自动完成 RagApi 服务构建。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/14.png)

## 效果测试
RagApi 支持通过可视化工具 [CherryStudio](https://cherry-ai.com/) 进行交互测试。CherryStudio 兼容 OpenAI 接口标准，适合用于接口联调、上下文调试和模型效果验证。

1. 打开 [CherryStudio](https://cherry-ai.com/)，点击左下角 **设置图标**。
2. 在 **模型服务** 中搜索 `openai`，并配置如下参数：
    - **API 密钥**：填写在 CloudCanal 中配置的 RagApi API Key
    - **API 地址**：[http://localhost:18089](http://localhost:18089/<knowledge-space>/v1)

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/15.png)

  - **模型名称**：CC_RAG

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/16.png)

3. 回到对话页面：
    - 点击 添加助手 > Default Assistant。
    - 右键点击 Default Assistant > 编辑助手 > 模型设置，绑定上一步添加的模型。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/17.png)

4. 在对话框输入：`CloudCanal 增量同步任务延迟是什么原因？应该怎么处理？`，RagApi 将根据向量数据检索相关内容，并通过对话模型生成响应。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ai/ragapi_cloud/18.png)

## 总结
经过简单的几步，我们完成了从零构建 RagApi 服务的全过程：从数据向量化、接入向量库、配置大模型、构建 Prompt，到部署兼容 OpenAI 接口的对话服务 RagApi。

整个过程无需编写任何代码，借助 [CloudCanal](https://www.clougence.com/?src=cc-doc-pg-vector-to-rag-api) 提供的可视化平台和多模型支持，企业可以快速构建具备私有知识问答能力的智能服务。

## 
