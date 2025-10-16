import React, {useState} from 'react';
import {Select, Table} from "antd";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import './datasourceSelect.css'

const DataSourceSelect = ({data, sourceType}) => {
    const targetList = Object.keys(data.target.length ? data.target[0] : {})
    targetList.splice(0, 1)
    const [target, setTarget] = useState(targetList.length ? targetList[0] : "")


    const handleTargetChange = (value) => {
        setTarget(value)
    }

    return (
        <div class='datasource-select'>
            <p>Please select the target dataSource, as the relevant documentation will be adjusted based on the selection.</p>
            Select Target： <Select style={{width: 200}} onChange={handleTargetChange} value={target}
                              options={targetList.map(target => ({label: target, value: target}))} showSearch/>
            <div class='markdown'>
                <h3 id={"coreCompetency"}>Core Competency</h3>
                <div></div>
            </div>
            {
                data.target.length ? <div>
                    <Table dataSource={data.target} pagination={false}>
                        <Table.Column width={'40%'} title="Function" dataIndex="Function" key="name" style={{borderRadius: 0}} size="small"/>
                        <Table.Column
                            title={target}
                            key="support"
                            render={(_, record) => <ReactMarkdown children={record[target]} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />}
                        />
                    </Table>
                </div> : null
            }
            {
                data.notice.length ? <div class='markdown'>
                    <h3 id={'usageRestrictionsAndConsiderations'}>Usage Restrictions and Considerations</h3>
                    {
                        data.notice[0][`${target}项`] ?
                            <Table dataSource={data.notice} pagination={false}>
                                <Table.Column title='Item' dataIndex={`${target}项`} key="name" style={{borderRadius: 0}}/>
                                <Table.Column
                                    title='Description'
                                    key="support"
                                    render={(_, record) => <ReactMarkdown children={record[`${target}说明`]} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />}
                                />
                            </Table> : 'None'
                    }
                </div> : null
            }
            {
                data.mapping.length ? <div class='markdown'>
                    <h3 id={'columnTypeMappin'}>Column Type Mapping</h3>
                    {
                        data.mapping[0][target] ?
                            <Table dataSource={data.mapping} pagination={false}>
                                <Table.Column title={sourceType} dataIndex={sourceType} key="name" style={{borderRadius: 0}}/>
                                <Table.Column
                                    title={target}
                                    key="support"
                                    render={(_, record) => record[target].includes('- ') ? <ul>{record[target].split('- ').map((r) =>
                                        <li>{r}</li>)}</ul> : record[target]}
                                />
                            </Table> : 'None'
                    }
                </div> : null
            }
        </div>
    )
}

export default DataSourceSelect
