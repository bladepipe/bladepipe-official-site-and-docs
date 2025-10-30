---
id: product_func
title: 产品功能
---
<table>
  <colgroup>
    <col width={114}/>
    <col width={140}/>
  </colgroup>
  <tr>
    <td rowSpan={2} style={{backgroundColor: '#f8f8f8'}}>运行环境</td>
    <td style={{backgroundColor: '#f8f8f8'}}>部署方式</td>
    <td style={{backgroundColor: '#ffffff'}}><b>Docker</b></td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>跨机房管理</td>
    <td style={{backgroundColor: '#ffffff'}}><b>支持</b>，无需公网端口</td>
  </tr>
  <tr>
    <td rowSpan={5} style={{backgroundColor: '#f8f8f8'}}>数据查询</td>
    <td style={{backgroundColor: '#f8f8f8'}}>数据源(26种)</td>
    <td style={{backgroundColor: '#ffffff'}}>
        <b>MySQL</b>、<b>Oracle</b>、<b>MariaDB</b>、<b>PostgreSQL</b>、<b>IBM DB2（IBM i 及 z/OS）</b>、<b>SQL Server</b>、
        <b>OceanBase(MySQL 及 Oracle)</b>、<b>PolarDB-X</b>、<b>PolarDB(MySQL)</b>、<b>StarRocks</b>、<b>Doris</b>、<b>SelectDB</b>、<b>TiDB</b>、<b>Greenplum</b>、
        <b>阿里云 AnalyticDB(MySQL)</b>、<b>阿里云 RDS(MySQL)</b>、<b>阿里云 RDS(PostgreSQL)</b>、<b>阿里云 PolarDB(MySQL)</b>、<b>阿里云 PolarDB-X</b>、<b>阿里云 PolarDB for PostgreSQL</b>、<b>阿里云 MaxCompute</b>、
        <b>亚马逊 AWS MySQL</b>、<b>亚马逊 AWS PostgreSQL</b>、
        <b>微软 Azure(MySQL)</b>、<b>微软 Azure(PostgreSQL)</b>，更多数据源等待开放
    </td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>查询方式</td>
    <td style={{backgroundColor: '#ffffff'}}>Web 控制台</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>使用事务</td>
    <td style={{backgroundColor: '#ffffff'}}><b>事务</b>、<b>隔离级别</b>，(默认禁用)</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>查询计划</td>
    <td style={{backgroundColor: '#ffffff'}}>支持</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>结果导出</td>
    <td style={{backgroundColor: '#ffffff'}}><b>Excel 格式</b></td>
  </tr>
  <tr>
    <td rowSpan={2} style={{backgroundColor: '#f8f8f8'}}>数据库管理</td>
    <td style={{backgroundColor: '#f8f8f8'}}>数据库对象</td>
    <td style={{backgroundColor: '#ffffff'}}><b>库</b>、<b>模式</b>、<b>表</b>、<b>列</b>、<b>索引</b>、<b>视图</b>、<b>函数</b>、<b>存储过程</b>、<b>触发器</b>、<b>用户</b>、<b>角色</b> 等，具体视数据源而定。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>可视化编辑器</td>
    <td style={{backgroundColor: '#ffffff'}}>支持数据库对象 <b>创建</b>、<b>删除</b>、<b>修改</b>、<b>查看属性</b> 等可视化操作，具体视数据源而定。</td>
  </tr>
  <tr>
    <td rowSpan={2} style={{backgroundColor: '#f8f8f8'}}>CI/CD</td>
    <td style={{backgroundColor: '#f8f8f8'}}>运作方式</td>
    <td style={{backgroundColor: '#ffffff'}}>提供 <b>Git Push</b>、<b>Web Hook</b>、<b>HttpCall</b> 三种方式触发 CI/CD 发布流程。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>流程定制</td>
    <td style={{backgroundColor: '#ffffff'}}>支持 <b>检查</b>、<b>审批</b>、<b>执行</b> 三个节点自由启动/禁用。</td>
  </tr>
  <tr>
    <td rowSpan={2} style={{backgroundColor: '#f8f8f8'}}>便利功能</td>
    <td style={{backgroundColor: '#f8f8f8'}}>DDL 获取</td>
    <td style={{backgroundColor: '#ffffff'}}>获取 <b>原始建表 DDL</b> 和 <b>生成建表语句</b> 两种方式。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>DDL 转换</td>
    <td style={{backgroundColor: '#ffffff'}}>支持已知 <b>18</b> 种数据源到 MySQL、ClickHouse、达梦、IBM DB2、Doris、OceanBase、Oracle、PolarDB-X、PostgreSQL、SQL Server、StarRocks、TiDB 共计 <b>192</b> 种转换。</td>
  </tr>
  <tr>
    <td rowSpan={5} style={{backgroundColor: '#f8f8f8'}}>SQL 规范</td>
    <td style={{backgroundColor: '#f8f8f8'}}>查询规则</td>
    <td style={{backgroundColor: '#ffffff'}}>内置 <b>54</b> 条规则，可以通过 <b>Rule Script</b> 自由定制和修改更多规则。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>校验机制</td>
    <td style={{backgroundColor: '#ffffff'}}>通过 <b>控制台查询</b> 或通过 <b>工单递交</b> 方式审核 SQL。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>校验策略</td>
    <td style={{backgroundColor: '#ffffff'}}>提供 <b>提示</b>、<b>阻塞</b> 两种审核失败处理策略。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>有效范围</td>
    <td style={{backgroundColor: '#ffffff'}}>支持将规则的有效范围精确在 <b>环境</b>、<b>实例</b>、<b>数据库</b>、<b>表</b>、<b>视图</b>、<b>物化视图</b> 上。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>范围匹配模式</td>
    <td style={{backgroundColor: '#ffffff'}}>范围匹配模式支持 <b>精确</b>、<b>前缀</b>、<b>尾缀</b>、<b>包含</b> 4 种模式。</td>
  </tr>
  <tr>
    <td rowSpan={4} style={{backgroundColor: '#f8f8f8'}}>数据保护</td>
    <td style={{backgroundColor: '#f8f8f8'}}>脱敏规则</td>
    <td style={{backgroundColor: '#ffffff'}}>内置 <b>5</b> 条规则，可以通过 <b>Rule Script</b> 自由定制和修改更多规则。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>脱敏算法</td>
    <td style={{backgroundColor: '#ffffff'}}><b>星号全遮掩</b></td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>保护范围</td>
    <td style={{backgroundColor: '#ffffff'}}>可选择对 <b>单个值</b> 或 <b>整行</b> 进行数据脱敏。<br/>并可以设置有效范围精确在 <b>环境</b>、<b>实例</b>、<b>数据库</b>、<b>表</b>、<b>视图</b>、<b>物化视图</b>、<b>列</b> 上。</td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>范围匹配模式</td>
    <td style={{backgroundColor: '#ffffff'}}>范围匹配模式支持 <b>精确</b>、<b>前缀</b>、<b>尾缀</b>、<b>包含</b> 4 种模式。</td>
  </tr>
  <tr>
    <td rowSpan={4} style={{backgroundColor: '#f8f8f8'}}>账号和权限</td>
    <td style={{backgroundColor: '#f8f8f8'}}>用户/角色/权限</td>
    <td style={{backgroundColor: '#ffffff'}}><b>具备</b></td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>语句级授权</td>
    <td style={{backgroundColor: '#ffffff'}}><b>DDL</b> / <b>DML</b></td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>授权粒度</td>
    <td style={{backgroundColor: '#ffffff'}}><b>实例</b>、<b>数据库</b>、<b>Schema</b>、<b>表</b></td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>统一认证/SSO</td>
    <td style={{backgroundColor: '#ffffff'}}>
        <b>OpenLDAP</b> / <b>OpenID Connect (OIDC)</b><br/>
        <b>Windows AD</b> / <b>钉钉</b> / <b>飞书</b> / <b>企业微信</b>
    </td>
  </tr>
  <tr>
    <td rowSpan={3} style={{backgroundColor: '#f8f8f8'}}>流程与合规</td>
    <td style={{backgroundColor: '#f8f8f8'}}>工单流程</td>
    <td style={{backgroundColor: '#ffffff'}}><b>内置</b>、<b>钉钉</b>、<b>飞书</b>、<b>企业微信</b></td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>执行方式</td>
    <td style={{backgroundColor: '#ffffff'}}><b>手动执行</b>、<b>立即执行</b>、<b>定时执行</b></td>
  </tr>
  <tr>
    <td style={{backgroundColor: '#f8f8f8'}}>审计</td>
    <td style={{backgroundColor: '#ffffff'}}><b>操作审计</b>、<b>SQL 执行审计</b></td>
  </tr>
</table>
