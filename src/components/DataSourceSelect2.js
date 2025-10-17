import React, {useEffect, useState} from 'react';
import {Select, Table, Col, Collapse} from "antd";

const {Panel} = Collapse;
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import './datasourceSelect.css'
import {SourceInfo} from '../../ccDocs/dataMigrationAndSync/connection/src_ds/index'
import {TargetInfo} from "../../ccDocs/dataMigrationAndSync/connection/dst_ds";

const DataSourceSelect = ({data, sourceType, mapping}) => {
    const targetList = Object.keys(data);
    const [target, setTarget] = useState( targetList.length ? targetList[0] : "")
    useEffect(()=>{
        let urlParams = {};
        if (window) {
            urlParams = new URLSearchParams(window.location.search)
        }

        const queryTarget = urlParams.get('target');
        if (queryTarget) {
            setTarget(queryTarget);
        }
    })

    const handleTargetChange = (value) => {
        setTarget(value)
        if (window) {
            const url = new URL(window.location);
            const searchParams = new URLSearchParams(url.search);
            searchParams.set('target', value);
            url.search = searchParams.toString();
            window.history.replaceState({}, '', url);
        }
    }

    return (
        <div className='datasource-select'>
            选择对端数据库： <Select style={{width: 200}} onChange={handleTargetChange} value={target}
                                    options={targetList.map(target => ({label: target, value: target}))} showSearch/>
            <div className='markdown'>
                <h2 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={"数据链路"}>数据链路
                    <a className="hash-link" href="#基本功能" title="{heading}的直接链接"></a>
                </h2>
                <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={"基本功能"}>基本功能
                    <a className="hash-link" href="#基本功能" title="{heading}的直接链接"></a>
                </h3>
                <div></div>
            </div>
            <div>
                <Table dataSource={data[target].main_function} pagination={false}>
                    <Col title="功能" dataIndex="key" key="key" style={{borderRadius: 0}} size="small"
                            render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}></Col>
                    <Col
                        title="说明"
                        key="desc"
                        render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                              remarkPlugins={[remarkGfm]}/>}
                    />
                </Table>
            </div>
            {data[target].master_function && data[target].master_function.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'高级功能'}>高级功能
                        <a className="hash-link" href="#高级功能" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={data[target].master_function} pagination={false}>
                        <Col title='功能' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='说明'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {data[target].notice && data[target].notice.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'限制和注意点'}>限制和注意点
                        <a className="hash-link" href="#限制和注意点" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={data[target].notice} pagination={false}>
                        <Col title='限制项' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='说明'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {data[target].examples && data[target].examples.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'使用示例'}>使用示例
                        <a className="hash-link" href="#使用示例" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={data[target].examples} pagination={false}>
                        <Col title='标题' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='详情'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {data[target].faq && data[target].faq.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'链路faq'}>链路FAQ
                        <a className="hash-link" href="#链路faq" title="{heading}的直接链接"></a>
                    </h3>
                    <ul>
                        {
                            data[target].faq.map((item,index) =>{
                                return <li key={index} className={'li-in-md'}>
                                    <ReactMarkdown children={item} rehypePlugins={[rehypeRaw]}
                                                   remarkPlugins={[remarkGfm]}/>
                                </li>
                            })
                        }
                    </ul>
                </div> : null
            }
            {
                data[target].mapping && data[target].mapping.length ? <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'字段类型与映射'}>字段类型与映射
                        <a className="hash-link" href="#字段类型与映射" title="{heading}的直接链接"></a>
                    </h3>
                    {
                        data[target].mapping ?
                            <Collapse className="mapping-collapse" defaultActiveKey={[]} ghost>
                                <Panel header="展开字段类型映射表格" key="1">
                                    <Table dataSource={data[target].mapping} pagination={false}>
                                        <Col title="源表类型" dataIndex="source" key="source"
                                                style={{borderRadius: 0}}/>
                                        <Col
                                            title="目标表类型"
                                            key="target"
                                            render={(_, record) => <ReactMarkdown children={record.target} rehypePlugins={[rehypeRaw]}
                                                                                  remarkPlugins={[remarkGfm]}/>}
                                        />
                                    </Table>
                                </Panel>
                            </Collapse>
                            : '无'
                    }
                </div> : null
            }

            <hr />

            <div className='markdown'>
                <h2 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={"源端数据源"}>源端数据源
                    <a className="hash-link" href="#源端数据源" title="{heading}的直接链接"></a>
                </h2>
            </div>
            {SourceInfo[sourceType].prepare && SourceInfo[sourceType].prepare.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'前置条件'}>前置条件
                        <a className="hash-link" href="#前置条件" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={SourceInfo[sourceType].prepare} pagination={false}>
                        <Col title='条件' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='说明'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {SourceInfo[sourceType].params && SourceInfo[sourceType].params.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'任务参数'}>任务参数
                        <a className="hash-link" href="#任务参数" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={SourceInfo[sourceType].params} pagination={false}>
                        <Col title='参数名称' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700,fontStyle: 'italic'}}>{record.key}</div>}/>
                        <Col
                            title='说明'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                    <ReactMarkdown children={'> Tips: 通用参数配置请参考 [通用参数及功能](../param_and_func/param_guide)'} rehypePlugins={[rehypeRaw]}
                                   remarkPlugins={[remarkGfm]}/>
                </div> : null
            }

            <hr />

            <div className='markdown'>
                <h2 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={"目标端数据源"}>目标端数据源
                    <a className="hash-link" href="#目标端数据源" title="{heading}的直接链接"></a>
                </h2>
            </div>
            {TargetInfo[target] && TargetInfo[target].prepare && TargetInfo[target].prepare.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'前置条件'}>前置条件
                        <a className="hash-link" href="#前置条件" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={TargetInfo[target].prepare} pagination={false}>
                        <Col title='条件' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='说明'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {TargetInfo[target] && TargetInfo[target].params && TargetInfo[target].params.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'任务参数'}>任务参数
                        <a className="hash-link" href="#任务参数" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={TargetInfo[target].params} pagination={false}>
                        <Col title='参数名称' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700,fontStyle: 'italic'}}>{record.key}</div>}/>
                        <Col
                            title='说明'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                    <ReactMarkdown children={'> Tips: 通用参数配置请参考 [通用参数及功能](../param_and_func/param_guide)'} rehypePlugins={[rehypeRaw]}
                                   remarkPlugins={[remarkGfm]}/>
                </div> : null
            }
        </div>
    )
}

export default DataSourceSelect
