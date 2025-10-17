import React from 'react';
import type { Props as TableOfContentsProps } from '@theme/TableOfContents';
import TableOfContents from '@theme-original/TableOfContents';

type Props = TableOfContentsProps & {
  children: React.ReactNode;
};

export default function TableOfContentsWrapper(props: Props): React.JSX.Element {
  const { children, ...tableOfContentsProps } = props;

  return (
    <div className="table-of-contents-wrapper">
      <style dangerouslySetInnerHTML={{
        __html: `
          /* 右侧目录的高亮样式 */
          .table-of-contents-wrapper .table-of-contents__link--active,
          .table-of-contents-wrapper .table-of-contents__link:hover {
            color: #0087c7 !important;
            background-color: transparent !important;
          }
          
          .table-of-contents-wrapper .table-of-contents__link--active::before {
            background-color: #0087c7 !important;
          }
          
          /* 目录链接的默认样式 */
          .table-of-contents-wrapper .table-of-contents__link {
            color: rgba(0, 0, 0, 0.6) !important;
            font-size: 14px !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            font-weight: 500 !important;
            line-height: 20px !important;
            transition: color 0.2s ease, background-color 0.2s ease;
          }
          
          /* 目录链接的悬停和激活状态 */
          .table-of-contents-wrapper .table-of-contents__link:hover,
          .table-of-contents-wrapper .table-of-contents__link--active {
            color: #0087c7 !important;
            background-color: transparent !important;
          }
          
          /* 目录链接前的指示器 */
          .table-of-contents-wrapper .table-of-contents__link--active::before {
            background-color: #0087c7 !important;
          }
          
          /* 确保所有目录相关的链接都使用主题色 */
          .table-of-contents-wrapper a:hover,
          .table-of-contents-wrapper a:focus {
            color: #0087c7 !important;
          }
        `
      }} />
      
      <TableOfContents {...tableOfContentsProps}>
        {children}
      </TableOfContents>
    </div>
  );
} 