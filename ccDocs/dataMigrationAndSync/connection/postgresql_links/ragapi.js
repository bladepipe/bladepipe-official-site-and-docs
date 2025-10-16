export const RagApi = {
    main_function: [
        {
            key: '结构迁移',
            desc: '如目标不存在知识库，则根据源端元数据，结合映射规则在对端创建 <b>虚拟知识库</b>'
        },
        {
            key: '知识库名映射',
            desc: '支持 <b>按下划线拼接(任务名_DB_SCHEMA_表)</b>, <b>转小写</b>, <b>转大写</b>, <b>和源端保持一致</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: '大模型对话',
            desc: '集成主流大模型平台（如 OpenAI、DashScope、Ollama 等），用于实现嵌入生成、语义检索、问答生成等核心 RAG 能力。支持流式响应、多语义检索、MCP 工具调用等扩展功能。'
        }
    ],
    master_function: [],
    notice: [],
    examples: [
        {
            key: '使用大模型将数据嵌入到 PostgreSQL 向量',
            desc: '文档：[使用大模型将数据嵌入到 PostgreSQL 向量](https://www.clougence.com/cc-doc/bestPractice/file_to_aliyun_pg_vector)'
        },
        {
            key: '基于 PostgreSQL 向量构建 RAG API 服务',
            desc: '文档：[基于 PostgreSQL 向量构建 RAG API 服务](https://www.clougence.com/cc-doc/bestPractice/pg_vector_to_rag_api)'
        }
    ],
    faq: [],
}