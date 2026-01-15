import React from 'react';
import FadeInSection from './FadeInSection';
import Translate from '@docusaurus/Translate';

// 数据源列表，icon 字段与 name 完全一致
const dataSources = [
  { name: 'MySQL', icon: 'MySQL' },
  { name: 'Oracle', icon: 'Oracle' },
  { name: 'PostgreSQL', icon: 'PostgreSQL' },
  { name: 'SQL Server', icon: 'SQLServer' },
  { name: 'RDS for MySQL', icon: 'RDSforMySQL' },
  { name: 'ElasticSearch', icon: 'ElasticSearch' },
  { name: 'Hive', icon: 'Hive' },
  { name: 'Kafka', icon: 'Kafka' },
  { name: 'RocketMQ', icon: 'RocketMQ' },
  { name: 'RDS for PG', icon: 'RDSforPostgreSQL' },
  { name: 'ADB for PostgreSQL', icon: 'ADBforPG' },
  { name: 'Greenplum', icon: 'Greenplum' },
  { name: 'RabbitMQ', icon: 'RabbitMQ' },
  { name: 'TiDB', icon: 'TiDB' },
  { name: 'PolarDb for MySQL', icon: 'PolarDbMySQL' },
  { name: 'ClickHouse', icon: 'ClickHouse' },
  { name: 'PolarDB-X', icon: 'PolarDbX' },
  { name: 'Redis', icon: 'Redis' },
  { name: 'Kudu', icon: 'Kudu' },
  { name: 'MongoDB', icon: 'MongoDB' },
  { name: 'Dameng', icon: 'Dameng' },
  { name: 'StarRocks', icon: 'StarRocks' },
  { name: 'OceanBase', icon: 'OceanBase' },
  { name: 'Doris', icon: 'Doris' },
  { name: 'SelectDB', icon: 'SelectDB' },
  { name: 'SAP Hana', icon: 'Hana' },
  { name: 'MariaDB', icon: 'MariaDB' },
  { name: 'Aurora MySQL', icon: 'AuroraMySQL' },
  { name: 'RedShift', icon: 'Redshift' },
  { name: 'IBM Db2', icon: 'Db2' },
  { name: 'GaussDB for OpenGauss', icon: 'GaussDBForOpenGauss' },
  { name: 'OceanBase for Oracle', icon: 'ObForOracle' },
  { name: 'Tunnel', icon: 'Tunnel' },
  { name: 'DocumentDB', icon: 'DocumentDB' },
  { name: 'Iceberg', icon: 'Iceberg' },
  { name: 'GuassDB for MySQL', icon: 'GaussDBForMySQL' },
  { name: 'Hudi', icon: 'Hudi' },
  { name: 'ADB for MySQL', icon: 'AdbForMySQL' },
  { name: 'Aurora for PostgreSQL', icon: 'AuroraPostgreSQL' },
  { name: 'AutoMQ', icon: 'AutoMQ' },
  { name: 'Pulsar', icon: 'Pulsar' },
  { name: 'GreptimeDB', icon: 'GreptimeDB' },
  { name: 'TDengine', icon: 'TDengine' },
  { name: 'SshFile', icon: 'SshFile' },
  { name: 'OssFile', icon: 'OssFile' },
  { name: 'S3File', icon: 'S3File' },
  { name: 'OpenAI', icon: 'OpenAI' },
  { name: 'HuggingFace', icon: 'HuggingFace' },
  { name: 'Coherelin', icon: 'Cohere' },
  { name: 'RagApi', icon: 'RagApi' },
  { name: 'DeepSeek', icon: 'DeepSeek' },
  { name: 'Ollama', icon: 'Ollama' },
  { name: 'Anthropic', icon: 'Anthropic' },
  { name: 'Bedrock', icon: 'Bedrock' },
  { name: 'DuckDB', icon: 'DuckDB' },
  { name: 'Google Drive', icon: 'GoogleDrive' },
  { name: 'DynamoDB', icon: 'DynamoDB' },
  { name: 'Paimon', icon: 'Paimon' },
  { name: 'Yuque', icon: 'Yuque' },
  { name: 'ElastiCache', icon: 'ElastiCache' },
  { name: 'Amazon MSK', icon: 'AmazonMSK' },
  { name: 'PolarDb for PostgreSQL', icon: 'PolarDBPg' },
  { name: 'DeltaLake', icon: 'DeltaLake' },
  { name: 'TDSQL-C', icon: 'TdsqlCMySQL' }
  // { name: 'ZhipuAI', icon: 'ZhipuAI' }
];

// 将数据均分为三行
function splitIntoRows(arr: any[], rows: number) {
  const result = Array.from({ length: rows }, () => [] as any[]);
  arr.forEach((item, idx) => {
    result[idx % rows].push(item);
  });
  return result;
}

const rows = splitIntoRows(dataSources, 3);
const scrollDuration = 60; // 动画时长（秒），可根据实际调整

const DataSourceList: React.FC = () => {
  return (
    <FadeInSection>
      <section className="w-full max-w-[1728px] mx-auto py-12 sm:py-16 lg:py-24 flex flex-col items-center gap-8 sm:gap-10 lg:gap-12">
        {/* 标题区 */}
        <div className="flex flex-col items-center gap-2 sm:gap-2.5 lg:gap-3">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black leading-[36px] sm:leading-[42px] lg:leading-[50px] text-center">
            <Translate id="datasource.title">Supported Connectors</Translate>
          </h2>
          <div className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#26272B] leading-[20px] sm:leading-[24px] lg:leading-[28px] font-medium text-center">
            <Translate id="datasource.subtitle">More connectors are being updated.</Translate>
          </div>
        </div>
        {/* 三行滚动区 */}
        <div className="w-full flex flex-col gap-6 sm:gap-8 lg:gap-10">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="w-full overflow-x-auto scrollbar-hide"
            >
              <div
                className={`inline-flex items-center min-w-max px-4 sm:px-6 lg:px-8 animate-datasource-row-scroll${rowIdx} lg:animate-datasource-row-scroll${rowIdx}`}
                style={{
                  animationDuration: `${scrollDuration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              >
                {/* 单行内容 */}
                {row.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center mx-3 sm:mx-4 lg:mx-6 first:ml-0 last:mr-0"
                  >
                    <div className="w-12 h-12 sm:w-14 lg:w-[84px] sm:h-14 lg:h-[84px] rounded-full bg-white border border-solid border-gray-200 shadow-[0_5px_10px_0_rgba(0,0,0,0.07)] flex items-center justify-center">
                      <svg className="icon-v2 w-6 h-6 sm:w-8 lg:w-10 sm:h-8 lg:h-10" aria-hidden="true">
                        <use xlinkHref={`#icon-v2-${item.icon}`} />
                      </svg>
                    </div>
                    <div translate="no" className="mt-2 text-[12px] sm:text-[13px] lg:text-[14px] font-medium text-[#26272B] text-center whitespace-nowrap">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <style>{`
        /* 隐藏滚动条但保持可滚动 */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }

        /* 数据源滚动动画 */
        @keyframes datasource-row-scroll0 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes datasource-row-scroll1 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes datasource-row-scroll2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* 大屏幕下启用动画 */
        @media (min-width: 1024px) {
          .animate-datasource-row-scroll0 { animation-name: datasource-row-scroll0; }
          .animate-datasource-row-scroll1 { animation-name: datasource-row-scroll1; }
          .animate-datasource-row-scroll2 { animation-name: datasource-row-scroll2; }
        }

        /* 小屏幕下禁用动画，保持可拖动 */
        @media (max-width: 1023px) {
          .animate-datasource-row-scroll0,
          .animate-datasource-row-scroll1,
          .animate-datasource-row-scroll2 {
            animation: none !important;
          }
        }
      `}</style>
    </FadeInSection>
  );
};

export default DataSourceList; 