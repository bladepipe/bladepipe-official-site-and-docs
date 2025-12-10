import React, { useState } from "react";

export default function SqlServerCdcGenerator() {
  const [dbName, setDbName] = useState("cc_test_db");
  const [schema, setSchema] = useState("dbo");
  const [table, setTable] = useState("cc_hb_tab");
  const [mode, setMode] = useState("dynamic");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const buildSql = () => {
    const captureInstance =
      mode === "dynamic"
        ? `${schema}_${table}_0`
        : `${dbName}_${schema}_${table}_cc_static`;

    return `
EXEC [${dbName}].sys.sp_cdc_enable_table  
    @source_schema = N'${schema}',  
    @source_name = N'${table}',  
    @role_name = NULL,  
    @capture_instance = N'${captureInstance}',  
    @supports_net_changes = 0;
`.trim();
  };

  const copySql = async () => {
    try {
      await navigator.clipboard.writeText(buildSql());
      setCopyError(null);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("复制 SQL 语句失败", error);
      setCopyError("复制失败，请检查浏览器权限或手动复制。");
    }
  };

  return (
    <div className="p-6 max-w-2xl space-y-6">

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1 col-span-1">
          <label className="text-sm text-gray-600">数据库名</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
          />
        </div>

        <div className="space-y-1 col-span-1">
          <label className="text-sm text-gray-600">Schema</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
          />
        </div>

        <div className="space-y-1 col-span-1">
          <label className="text-sm text-gray-600">表名</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={table}
            onChange={(e) => setTable(e.target.value)}
          />
        </div>

        <div className="space-y-1 col-span-1">
          <label className="text-sm text-gray-600">CDC 模式</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="dynamic">动态 CDC 模式</option>
            <option value="static">静态 CDC 模式</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">启用表级 CDC SQL 语句</label>
          <button
            onClick={copySql}
            className={`px-3 py-1 rounded text-sm bg-gray-200 border cursor-pointer`}
          >
            {copied ? "已复制" : "复制"}
          </button>
        </div>
        {copyError && (
          <p className="text-xs text-red-500 text-right">{copyError}</p>
        )}

        <textarea
          className="border rounded p-3 w-full h-48 font-mono text-sm bg-gray-50"
          readOnly
          value={buildSql()}
        />
      </div>
    </div>
  );
}