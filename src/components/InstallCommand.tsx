import React, { useState, useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import apis from '@site/src/apis';

interface InstallCommandProps {
  /**
   * 安装命令模板，其中 <version> 会被替换为实际版本号
   * 例如: "curl -fsSL https://example.com/install.sh | bash -s -- <version> <project_home>"
   */
  command: string;
  /**
   * 项目目录参数，如果命令中包含 <project_home>，会被替换为此值
   * 例如: "./cc_home" 或 "./bp_home"
   */
  projectHome?: string;
}

export default function InstallCommand({ command, projectHome }: InstallCommandProps) {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 根据 siteBrand 获取产品名称
  const productName = siteBrand === 'clougence' ? 'CloudCanal' : 'BladePipe_Tgz';

  // 获取最新版本
  useEffect(() => {
    apis.constantApi
      .latestVer({ productTypes: [productName] })
      .then((res: any) => {
        const ver = res?.data?.[productName];
        if (ver) {
          setVersion(ver);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch latest version:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productName]);

  // 替换命令中的占位符
  const getDisplayCommand = () => {
    let displayCommand = command;
    
    // 替换版本号
    if (version) {
      displayCommand = displayCommand.replace(/<version>/g, version);
    }
    
    // 替换项目目录
    if (projectHome) {
      displayCommand = displayCommand.replace(/<project_home>/g, projectHome);
    }
    
    return displayCommand;
  };

  return (
    <CodeBlock language="bash">{getDisplayCommand()}</CodeBlock>
  );
}
