---
id: pg_vector_to_rag_api
description: 本文介绍如何基于 PostgreSQL 向量数据，通过 CloudCanal 构建 RAG API 服务。
title: 基于 PostgreSQL 向量构建 RAG API 服务
---

## 简述

本文是 CloudCanal 构建 RAG (Retrieval-Augmented Generation，检索增强生成) 应用系列文章：

1. [使用大模型将数据嵌入到 PostgreSQL 向量](../bestPractice/sshfile_to_aliyun_pg_vector.md)
2. 基于 PostgreSQL 向量构建 RAG API 服务

本文将介绍如何基于这些向量数据，通过 CloudCanal 自动生成一个 **兼容 OpenAI 接口** 的对话服务：**RagApi**，实现从私有知识到 AI 服务的完整闭环，且**无需写一行代码**。


## CloudCanal RagApi 核心优势

相比传统 RAG 架构手动部署流程，CloudCanal 提供的 RagApi 服务具有以下独特优势：

- **双任务完成全流程：文档导入 + API 发布**。
- **零代码部署**：无需开发，自定义配置即可构建 API 服务。
- **参数可调**：支持设置向量 Top-K 数量、匹配阈值、Prompt 模板、模型温度等核心参数。
- **多模型与平台适配**：支持阿里云 DashScope、OpenAI、DeepSeek 等主流模型与 API 平台。
- **OpenAI API 兼容接口**：直接接入现有 Chat 应用或工具链，无需额外适配。
- **全私有部署**：支持 Ollama 私有部署模型(如 DeepSeek) 和 API，杜绝企业内部数据泄漏问题。

## RagApi 工作流程

CloudCanal 构建的 RagApi 服务结合两个任务完成整体链路构建。本文主要介绍 **任务二(API 构建)** 的操作步骤。

![pg_vector_to_rag_api_01.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/pg_vector_to_rag_api_01.png)

#### 任务一：数据准备与嵌入（File → PostgreSQL 向量库）
关于该任务的详细内容，可阅读 [使用大模型将数据嵌入到 PostgreSQL 向量](../bestPractice/sshfile_to_aliyun_pg_vector.md)。

#### 任务二：API 构建与服务发布（PostgreSQL → RagApi）
1. **查询向量化与匹配**  
   用户提问通过对话接口进入系统，CloudCanal 使用相同嵌入模型将问题向量化，并与存量向量数据进行相似度匹配，检索最相关片段。

2. **构造 Prompt**  
   CloudCanal 根据配置的 Prompt 模板，结合用户提问与检索结果，拼接构建完整上下文输入。

3. **Chat 模型推理**  
   生成的 Prompt 被送入已配置的 Chat 模型（如 `qwq-plus`、`gpt-4o` 等），生成最终回答。接口对外暴露为 OpenAI 格式接口，可直接对接应用层系统。

## 支持的大模型
CloudCanal 使用 Chat 模型结合通过 **向量查询** 的上下文进行推理，响应 API 的请求的问题，当前支持 Chat 模型如下：

| 平台        | 模型名称     |
| ------------ | -------------------------------- |
| 阿里云百炼(DashScope)  |qwq-plus <br/> qwq-plus| 
| DeepSeek  |deepseek-chat <br/> deepseek-chat | 
| OpenAI  |gpt-4o <br/>o1 <br/> o1-mini <br/> o3-mini 等 |

## 操作步骤
接下来，本文将以一个实际案例演示如何完成第二个任务：基于已有向量库创建 RagApi 服务。

在开始之前，请确保已完成前置操作，可参考文档：[《使用大模型将数据嵌入到 PostgreSQL 向量》](sshfile_to_aliyun_pg_vector.md)。

本例将演示如何基于以下环境，通过 CloudCanal 快速构建 RAG API 服务：

- **向量数据源**：自建 PostgreSQL（已写入向量数据）
- **目标服务**：本地部署的 RagApi 实例（用于提供对话接口）
- **嵌入模型**：阿里云百炼平台（DashScope）的 **text-embedding-v3**
- **对话模型**：阿里云百炼平台（DashScope）的 **qwq-plus**



### 下载 CloudCanal

前往官网下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-pg-vector-to-rag-api)。


### 添加数据源
登录 CloudCanal，点击 **数据源管理**，点击 **新增数据源**。

**添加向量数据库：**   
选择 **自建** > **PostgreSQL**，获取数据源并添加。   
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/file_to_aliyun_pg_vector/2.png)
   
**添加大模型：**   
选择 **阿里云** > **手动填写** > **DashScope** 数据源，填写之前步骤获取的 API-KEY。   
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/file_to_aliyun_pg_vector/3.png)

**添加 RagApi 服务：**   
1. 选择 **自建** > **RagApi**。
2. 网络地址填写为 `localhost`，端口默认使用 `18089`。
3. 输入自定义的 API-KEY，用于后续调用 RagApi 接口。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/4.png)

### 创建 RagApi 构建任务

1. 点击 **同步任务** > **创建任务**。
2. 选择以下数据源，并点击 **测试连接** 确认网络与权限正常。
   - 源端：已配置的 PostgreSQL（向量表所在库）
   - 目标端：RagApi 服务

  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/11.png)
  :::info
  如测试连接长时间无响应，可尝试刷新页面或检查网络连通性与参数配置。
  :::

3. 在 **功能配置** 页面，任务类型选择 **全量迁移**，任务规格选择默认 2 GB 即可。
4. 在 **表&action过滤** 页面，选择要使用的向量表（可多选）。

  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/12.png)
5. 在 **数据处理** 页面，**配置大模型**：
   1. **嵌入模型**：选择 DashScope 实例与向量数据使用的嵌入模型（如 `text-embedding-v3`）。

  :::info
  PostgreSQL 中的向量维度需与选定嵌入模型一致。
  :::
   2. **聊天模型**：选择 DashScope 实例与对话模型（如 `qwq-plus`）。

  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/13.png)

6. 在 **创建确认** 页面，检查配置无误后点击 **创建任务**，系统将自动完成 RagApi 服务构建。

  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/15.png)

## 效果测试

### 命令行快速测试

RagApi 服务默认运行在本地 Sidecar 中，监听地址为 `http://localhost:18089`，兼容 OpenAI Chat API 标准协议。可通过命令行工具（如 `curl`）快速验证服务是否部署成功。

#### 示例请求（使用 curl）

```bash
curl http://localhost:18089/<knowledge-space>/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <RAG API Key>" \
  -d '{
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "CloudCanal 如何配置增量同步？"}
        ],
        "stream": false
      }'
```

:::info
- `<knowledge-space>` 为知识空间名称，用于指定查询的向量库；如不填写，将默认检索所有知识库。
- `<RAG API Key>` 为在 CloudCanal 中配置的 RagApi 数据源的 API Key。
:::



### 使用 CherryStudio 测试

除了命令行方式，RagApi 也支持通过可视化工具 [CherryStudio](https://cherry-ai.com/) 进行交互测试。CherryStudio 兼容 OpenAI 接口标准，适合用于接口联调、上下文调试和模型效果验证。

1. 打开 [CherryStudio](https://cherry-ai.com/)，点击左下角 **设置图标**。

2. 在 **模型服务** 中搜索 `openai`，并配置如下参数：
    - **API 密钥**：填写在 CloudCanal 中配置的 RagApi API Key
    - **API 地址**：http://localhost:18089
   
   ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/16.png)
    - **模型名称**：CC_RAG
   
   ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/17.png)

3. 回到对话页面：
   - 添加助手 → Default Assistant。
   - 右键点击 Default Assistant → 编辑助手 → 模型设置，绑定上一步添加的模型。

  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/17-1.png)
4. 返回对话窗口，输入：`CloudCanal 增量同步任务延迟是什么原因？应该怎么处理？`，RagApi 将根据向量数据检索相关内容，并通过对话模型生成响应。

  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/pg_vector_to_rag_api/18.png)



## FAQ

**Q：什么是 RAG（检索增强生成）？**     
**A：** RAG 是一种结合大型语言模型（LLM）与外部知识库的技术，用于生成更准确、上下文相关的 AI 回答。

**Q：RAG 有哪些优势？**     
**A：** 它解决了 LLM 生成幻觉、缺乏实时信息、无法访问私有数据等问题，提供更可信、更实用的输出。

**Q：RAG 的核心流程有哪些？**     
**A：** 包括数据收集、切分、嵌入生成、向量检索、Prompt 构造与模型推理等步骤。

**Q：能否使用非 OpenAI 的模型？**     
**A：** 可以。CloudCanal RagApi 支持如 DashScope、DeepSeek、LocalAI 等多种模型平台。

**Q：与传统搜索有何区别？**     
**A：** RAG 不仅检索文档，还能基于上下文生成更具语义理解的自然语言回答。

## 总结

通过本文，我们完成了从已有向量数据构建 RAG API 服务的全过程：从接入向量库、配置大模型、构建 Prompt，到部署兼容 OpenAI 接口的对话服务 RagApi。

整个过程无需编写任何代码，借助 [CloudCanal](https://www.clougence.com?src=cc-doc-pg-vector-to-rag-api) 提供的可视化平台和多模型支持，企业可以快速构建具备私有知识问答能力的智能服务。
