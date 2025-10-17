import React, {useEffect, useState} from 'react';
import {Collapse, Col, Select, Table} from "antd";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import './datasourceSelect.css'
import {SourceInfo} from '@site/docs/dataMigrationAndSync/connection/src_ds/index'
import {TargetInfo} from "@site/docs/dataMigrationAndSync/connection/dst_ds";

const {Panel} = Collapse;

const DataSourceSelect = ({data, sourceType, mapping}) => {
    const targetList = stickySourceType(Object.keys(data), sourceType);
    const [target, setTarget] = useState(targetList.length ? targetList[0] : "")

    let commonFunction = unique((SourceInfo[sourceType]?.master_function || []) //
        .concat(TargetInfo[target]?.master_function || []) //
        .concat((data[target]?.master_function || [])))
    let commonNotice = unique((SourceInfo[sourceType]?.notice || []) //
        .concat(TargetInfo[target]?.notice || []) //
        .concat((data[target]?.notice || [])))
    let commonFaq = (SourceInfo[sourceType]?.faq || []) //
        .concat(TargetInfo[target]?.faq || []) //
        .concat((data[target]?.faq || []))
    let commonExamples = unique((SourceInfo[sourceType]?.examples || []) //
        .concat(TargetInfo[target]?.examples || []) //
        .concat((data[target]?.examples || [])))

    useEffect(() => {
        let urlParams = {};
        if (window) {
            urlParams = new URLSearchParams(window.location.search)
        }
        const queryTarget = urlParams.get('target');
        if (queryTarget) {
            setTarget(queryTarget);
        }

        if (commonFunction.length <= 0) {
            commonFunction = data[target]?.notice || []
        }

        if (commonNotice.length <= 0) {
            commonNotice = data[target]?.notice || []
        }

        if (commonFaq.length <= 0) {
            commonFaq = data[target]?.faq || []
        }

        if (commonExamples.length <= 0) {
            commonExamples = data[target]?.examples || []
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
            Target DataSource： <Select style={{width: 200}} onChange={handleTargetChange} value={target}
                                    options={targetList.map(target => ({label: target, value: target}))} showSearch/>
            <div className='markdown'>
                <h2 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={"Connection"}>Connection
                    <a className="hash-link" href="#Basic Functions" title="{heading}的直接链接"></a>
                </h2>
                <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={"Basic Functions"}>Basic Functions
                    <a className="hash-link" href="#Basic Functions" title="{heading}的直接链接"></a>
                </h3>
                <div></div>
            </div>
            <div>
                <Table dataSource={data[target].main_function} pagination={false}>
                    <Col title="Function" dataIndex="key" key="key" style={{borderRadius: 0}} size="small"
                            render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}></Col>
                    <Col
                        title="Description"
                        key="desc"
                        render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                              remarkPlugins={[remarkGfm]}/>}
                    />
                </Table>
            </div>
            {commonFunction && commonFunction.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'Advanced Functions'}>Advanced Functions
                        <a className="hash-link" href="#Advanced Functions" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={commonFunction} pagination={false}>
                        <Col title='Function' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='Description'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {commonNotice && commonNotice.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'}
                        id={'Limits'}>Limits
                        <a className="hash-link" href="#Limits" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={commonNotice} pagination={false}>
                        <Col title='Limit' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='Description'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {commonExamples && commonExamples.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'Examples'}>Examples
                        <a className="hash-link" href="#Examples" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={commonExamples} pagination={false}>
                        <Col title='Title' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='Details'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {commonFaq && commonFaq.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'FAQ'}>FAQ
                        <a className="hash-link" href="#FAQ" title="{heading}的直接链接"></a>
                    </h3>
                    <ul>
                        {
                            commonFaq.map((item, index) => {
                                return <li key={index} className={'li-in-md'}>
                                    <ReactMarkdown children={item} rehypePlugins={[rehypeRaw]}
                                                   remarkPlugins={[remarkGfm]}/>
                                </li>
                            })
                        }
                    </ul>
                </div> : null
            }

            {/*{*/}
            {/*    data[target].mapping && data[target].mapping.length ? <div className='markdown'>*/}
            {/*        <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'}*/}
            {/*            id={'Field Types and Mapping'}>Field Types and Mapping*/}
            {/*            <a className="hash-link" href="#Field Types and Mapping" title="{heading}的直接链接"></a>*/}
            {/*        </h3>*/}
            {/*        {*/}
            {/*            data[target].mapping ?*/}
            {/*                <Collapse className="mapping-collapse" defaultActiveKey={[]} ghost>*/}
            {/*                    <Panel header="展开字段类型映射表格" key="1">*/}
            {/*                        <Table dataSource={data[target].mapping} pagination={false}>*/}
            {/*                            <Column title="源表类型" dataIndex="source" key="source"*/}
            {/*                                    style={{borderRadius: 0}}/>*/}
            {/*                            <Column*/}
            {/*                                title="目标表类型"*/}
            {/*                                key="target"*/}
            {/*                                render={(_, record) => <ReactMarkdown children={record.target}*/}
            {/*                                                                      rehypePlugins={[rehypeRaw]}*/}
            {/*                                                                      remarkPlugins={[remarkGfm]}/>}*/}
            {/*                            />*/}
            {/*                        </Table>*/}
            {/*                    </Panel>*/}
            {/*                </Collapse>*/}
            {/*                : '无'*/}
            {/*        }*/}
            {/*    </div> : null*/}
            {/*}*/}

            <hr/>

            <div className='markdown'>
                <h2 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={"Source"}>Source
                    <a className="hash-link" href="#Source" title="{heading}的直接链接"></a>
                </h2>
            </div>
            {SourceInfo[sourceType].prepare && SourceInfo[sourceType].prepare.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'Prerequisites'}>Prerequisites
                        <a className="hash-link" href="#Prerequisites" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={SourceInfo[sourceType].prepare} pagination={false}>
                        <Col title='Prerequisite' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='Description'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {SourceInfo[sourceType].params && SourceInfo[sourceType].params.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'Parameters'}>Parameters
                        <a className="hash-link" href="#Parameters" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={SourceInfo[sourceType].params} pagination={false}>
                        <Col title='Parameter' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div
                                    style={{fontWeight: 700, fontStyle: 'italic'}}>{record.key}</div>}/>
                        <Col
                            title='Description'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                    <ReactMarkdown
                        children={'> Tips: To modify the general parameters, see [General Parameters and Functions](../param_and_func/param_guide).'}
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}/>
                </div> : null
            }

            <hr/>
            {TargetInfo[target] ?
                <div className='markdown'>
                    <h2 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'}
                        id={"Target"}>Target
                        <a className="hash-link" href="#Target" title="{heading}的直接链接"></a>
                    </h2>
                </div> : null
            }

            {TargetInfo[target] && TargetInfo[target].prepare && TargetInfo[target].prepare.length > 0 ?
                <div className='markdown'>

                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'}
                        id={'Prerequisites'}>Prerequisites
                        <a className="hash-link" href="#Prerequisites" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={TargetInfo[target].prepare} pagination={false}>
                        <Col title='Prerequisite' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='Description'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc}
                                                                  rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                </div> : null
            }
            {TargetInfo[target] && TargetInfo[target].params && TargetInfo[target].params.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'}
                        id={'Parameters'}>Parameters
                        <a className="hash-link" href="#Parameters" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={TargetInfo[target].params} pagination={false}>
                        <Col title='Parameter' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div
                                    style={{fontWeight: 700, fontStyle: 'italic'}}>{record.key}</div>}/>
                        <Col
                            title='Description'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc}
                                                                  rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                    <ReactMarkdown
                        children={'> Tips: To modify the general parameters, see [General Parameters and Functions](../param_and_func/param_guide).'}
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}/>
                </div> : null
            }
        </div>
    )
}

function unique(arr) {
    const key = 'key'
    const seen = new Set();
    return arr.filter(item => {
        const itemKey = item[key];
        if (seen.has(itemKey)) {
            return false
        } else {
            seen.add(itemKey);
            return true;
        }
    });
}

function stickySourceType(targetList, sourceType) {
    if (!targetList) {
        return targetList;
    }
    let targetNode;
    for (let i = 0; i < targetList.length; i++) {
        if (targetList[i] === sourceType) {
            targetNode = i;
            break;
        }
    }

    if (!targetNode) {
        return targetList;
    }

    let temp = targetList[targetNode];
    for (let i = targetNode; i > 0; i--) {
        targetList[i] = targetList[i - 1];
    }
    targetList[0] = temp;
    return targetList;
}

export default DataSourceSelect
