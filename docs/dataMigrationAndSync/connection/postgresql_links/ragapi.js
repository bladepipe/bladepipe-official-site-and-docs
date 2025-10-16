export const RagApi = {
    main_function: [
        {
            key: 'Schema Migration',
            desc: 'If there is no knowledge base in the target instance, BladePipe will automatically create a <b>virtual</b> one based on the source metadata and the mapping rule.'
        },
        {
            key: 'Knowledge Base Name Mapping',
            desc: 'Support the mapping rules, namely, <b>generating a name in the format DataJobName_DB_SCHEMA_Table</b>, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'Chat',
            desc: 'Integrate popular LLMs (such as OpenAI, DashScope, Ollama, etc.) to implement core RAG capabilities such as embedding generation, semantic retrieval, and response generation. Support extended functions such as streaming response, multi-semantic retrieval, and MCP tool calls'
        }
    ],
    master_function: [],
    notice: [],
    examples: [
        {
            key: 'Create and Store Vectors in PGVector',
            desc: 'See [Create and Store Vectors in PGVector](https://doc.bladepipe.com/bestPractice/file_to_aliyun_pg_vector)'
        },
        {
            key: 'Create RAG API with PGVector',
            desc: 'See [Create RAG API with PGVector](https://doc.bladepipe.com/bestPractice/pg_vector_to_rag_api)'
        }
    ],
    faq: [],
}