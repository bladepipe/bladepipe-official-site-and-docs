export const RagApi = {
    notice: [
        {
            key: '网络准备',
            desc: '请确保迁移同步节点（Sidecar）具备访问目标知识库及大模型服务的网络连通性，如 xxx 域名或 IP。'
        }
    ],
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 <b>大模型</b> 和 <b>向量数据库</b>'
        }
    ],
    params: [
        {
            key: 'uriPrefix',
            desc: 'RagApi <b>对话服务</b>的 URI 前缀，用于接收用户问题并返回模型生成的回答。默认值：<code>/v1/chat/completions</code>'
        },
        {
            key: 'contentUriPrefix',
            desc: 'RagApi <b>内容检索服务</b>的 URI 前缀，用于向量数据库中召回相关片段。默认值：<code>/v1/content/retrieve</code>'
        },
        {
            key: 'retrieveMaxResults',
            desc: '配置检索器返回的最大结果数量，用于限制向量搜索候选内容的条目数'
        },
        {
            key: 'retrieveMinScore',
            desc: '配置检索器返回结果的最低匹配分数阈值，仅考虑匹配分数高于该阈值的内容'
        },
        {
            key: 'contentPrompt',
            desc: '配置模板用于构造最终生成提示，定义如何将用户问题与检索到的内容组合成完整提示.可以使用 <b>{{context}}</b> 和 <b>{{query}}</b> 作为变量占位符'
        },
        {
            key: 'enabledPromptFunctions',
            desc: '启用的 Prompt 功能（英文逗号分隔）。<br /> 可选项：<br /> ' +
                '\n - <b>KNOWLEDGE_SELECT</b>（自动选择知识片段，支持多个知识库自动路由）<br /> ' +
                '\n - <b>QUERY_COMPRESS</b>（压缩查询）<br /> ' +
                '\n - <b>QUERY_EXTEND</b>（扩展查询）<br /> ' +
                '\n \n 示例：<code>KNOWLEDGE_SELECT,QUERY_COMPRESS</code>'
        },
        {
            key: 'compressContentPrompt',
            desc: '用于内容压缩的提示语，指导系统如何对输入文本进行精简处理。可以使用 <b>{{chatMemory}}</b> 和 <b>{{query}}</b> 作为变量占位符，仅在 <b>enabledPromptFunctions</b> 中启用了 <b>QUERY_COMPRESS</b> 时生效'
        },
        {
            key: 'extendContentPrompt',
            desc: '用于扩展内容的提示语，指导系统如何通过添加相关上下文信息来丰富原有文本。可以使用 {{query}} 作为变量占位符，仅在 <b>enabledPromptFunctions</b> 中启用了 <b>QUERY_EXTEND</b> 时生效'
        },
        {
            key: 'extendContentCount',
            desc: '设置内容扩展时生成的条目数量，仅在 <b>enabledPromptFunctions</b> 中启用了 <b>QUERY_EXTEND</b> 时生效'
        },
        {
            key: 'mcpServers',
            desc: '用于配置可用 <b>MCP</b> 服务器的 JSON，定义工具调用方式 (如命令行或 HTTP)' +
                '<br> eg: {\n' +
                '    "mcpServers": {\n' +
                '        "github": {\n' +
                '            "command": "docker",\n' +
                '            "args": [\n' +
                '                "run",\n' +
                '                "-i",\n' +
                '                "--rm",\n' +
                '                "-e",\n' +
                '                "GITHUB_PERSONAL_ACCESS_TOKEN",\n' +
                '                "mcp/github"\n' +
                '            ],\n' +
                '            "env": {\n' +
                '                "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"\n' +
                '            }\n' +
                '        }\n' +
                '    }\n' +
                '}'
        },
        {
            key: 'maxChatMemory',
            desc: '聊天上下文中保留的最大历史消息条数，决定模型推理时能看到多少轮对话内容'
        },
        {
            key: 'toolMaxInvokeCount',
            desc: '单次对话中允许调用工具的最大次数，用于限制调用深度，避免工具执行陷入死循环'
        },
    ],
    master_function: [
        {
            key: '知识片段选择（KNOWLEDGE_SELECT）',
            desc: '根据用户查询语义，从检索结果中自动筛选最相关的知识片段，提高生成回答的准确性和针对性。'
        },
        {
            key: '压缩查询（QUERY_COMPRESS）',
            desc: '对用户原始问题进行语义压缩，去除冗余信息，保留核心内容，优化向量检索效果。'
        },
        {
            key: '扩展查询（QUERY_EXTEND）',
            desc: '自动扩展用户问题，引入潜在相关信息或同义表达，提升语义匹配覆盖率。'
        },
        {
            key: 'MCP 工具链调用',
            desc: '支持调用 MCP 平台上配置的工具链（如 GitHub 查询、Shell 命令等），实现问答中自动调用外部系统完成任务或补全信息。'
        },
    ]
}
