import React, {useState} from 'react';
import {Select, Table, Col} from "antd";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import './datasourceSelect.css'

const DataSourceSelect = ({data, sourceType}) => {
  const targetList = Object.keys(data.target.length ? data.target[0] : {})
  targetList.splice(0, 1)
  const [target, setTarget] = useState(targetList.length ? targetList[0] : "")
console.log('data', data);

  const handleTargetChange = (value) => {
    setTarget(value)
  }

  return (
    <div class='datasource-select'>
      <p>请选择对端数据源，文档相关内容会根据对端数据源不同而调整。</p>
      选择对端： <Select style={{width: 200}} onChange={handleTargetChange} value={target}
                    options={targetList.map(target => ({label: target, value: target}))} showSearch/>
      <div class='markdown'>
        <h3 id={"核心能力"}>核心能力</h3>
        <div></div>
      </div>
      {
        data.target.length ? <div>
          <Table dataSource={data.target} pagination={false}>
            <Col width={'40%'} title="功能" dataIndex="功能" key="name" style={{borderRadius: 0}} size="small"/>
            <Col
              title={target}
              key="support"
              render={(_, record) => <ReactMarkdown children={record[target]} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />}
            />
          </Table>
        </div> : null
      }
      {
        data.notice.length ? <div class='markdown'>
          <h3 id={'使用限制与注意点'}>使用限制与注意点</h3>
          {
            data.notice[0][`${target}项`] ?
              <Table dataSource={data.notice} pagination={false}>
                <Col title='项' dataIndex={`${target}项`} key="name" style={{borderRadius: 0}}/>
                <Col
                  title='说明'
                  key="support"
                  render={(_, record) => <ReactMarkdown children={record[`${target}说明`]} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />}
                />
              </Table> : '无'
          }
        </div> : null
      }
      {
        data.mapping.length ? <div class='markdown'>
          <h3 id={'支持的类型与类型映射'}>字段类型与映射</h3>
          {
            data.mapping[0][target] ?
              <Table dataSource={data.mapping} pagination={false}>
                <Col title={sourceType} dataIndex={sourceType} key="name" style={{borderRadius: 0}}/>
                <Col
                  title={target}
                  key="support"
                  render={(_, record) => record[target].includes('- ') ? <ul>{record[target].split('- ').map((r) =>
                      <li>{r}</li>)}</ul> : record[target]}
                />
              </Table> : '无'
          }
        </div> : null
      }
    </div>
  )
}

export default DataSourceSelect
