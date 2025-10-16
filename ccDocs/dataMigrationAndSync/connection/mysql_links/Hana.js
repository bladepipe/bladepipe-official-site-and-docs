const Hana = {
    main_function: [
        {
            key: '结构迁移',
            desc: '如目标不存在所选表，则自动根据源端元数据，结合映射生成对端创建语句并执行创建'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: '设置目标主键',
            desc: '变更主键为其他字段，方便数据聚合等操作'
        },
        {
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../operation/job_manage/create_job/create_data_filter_job)'
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
                {
            source: 'BIT',
            target: 'BIGINT'
        },
            {
            source: 'TINYINT',
            target: 'TINYINT'
        },
            {
            source: 'SMALLINT',
            target: 'SMALLINT'
        },
            {
            source: 'MEDIUMINT',
            target: 'INTEGER'
        },
            {
            source: 'INT',
            target: 'INTEGER'
        },
            {
            source: 'BIGINT',
            target: 'BIGINT'
        },
            {
            source: 'DECIMAL',
            target: 'DECIMAL'
        },
            {
            source: 'FLOAT',
            target: 'FLOAT'
        },
            {
            source: 'DOUBLE',
            target: 'DOUBLE'
        },

            {
            source: 'DATE',
            target: 'DATE'
        },
            {
            source: 'DATETIME',
            target: 'TIMESTAMP'
        },
            {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP'
        },
            {
            source: 'TIME',
            target: 'TIME'
        },
            {
            source: 'YEAR',
            target: 'INTEGER'
        },

            {
            source: 'CHAR',
            target: 'VARCHAR'
        },
            {
            source: 'VARCHAR',
            target: 'VARCHAR'
        },

            {
            source: 'BINARY',
            target: 'BINARY'
        },
            {
            source: 'VARBINARY',
            target: 'VARBINARY'
        },
            {
            source: 'TINYBLOB',
            target: 'BLOB'
        },
            {
            source: 'BLOB',
            target: 'BLOB'
        },
            {
            source: 'MEDIUMBLOB',
            target: 'BLOB'
        },
            {
            source: 'LONGBLOB',
            target: 'BLOB'
        },

            {
            source: 'TINYTEXT',
            target: 'TEXT'
        },
            {
            source: 'TEXT',
            target: 'TEXT'
        },
            {
            source: 'MEDIUMTEXT',
            target: 'TEXT'
        },
            {
            source: 'LONGTEXT',
            target: 'TEXT'
        },
            {
            source: 'ENUM',
            target: 'VARCHAR'
        },
            {
            source: 'SET',
            target: 'VARCHAR'
        },
            {
            source: 'JSON',
            target: 'TEXT'
        },

            {
            source: 'GEOMETRY',
            target: 'VARCHAR'
        },
            {
            source: 'POINT',
            target: 'VARCHAR'
        },
            {
            source: 'LINESTRING',
            target: 'VARCHAR'
        },
            {
            source: 'POLYGON',
            target: 'VARCHAR'
        },
            {
            source: 'MULTIPOINT',
            target: 'VARCHAR'
        },
            {
            source: 'GEOMETRY_COLLECTION',
            target: 'VARCHAR'
        },
            {
            source: 'GEOM_COLLECTION',
            target: 'VARCHAR'
        },
            {
            source: 'MULTILINESTRING',
            target: 'VARCHAR'
        },
            {
            source: 'MULTIPOLYGON',
            target: 'VARCHAR'
        },
        
    ]
}

export {
    Hana
};
