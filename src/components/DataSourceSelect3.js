import React, {useEffect, useState} from 'react';
import Head from '@docusaurus/Head';
import {useHistory, useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Collapse, Col, Select, Table} from "antd";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import './datasourceSelect.css'
import {SourceInfo} from '../../ccDocs/dataMigrationAndSync/connection/src_ds/index'
import {TargetInfo} from "../../ccDocs/dataMigrationAndSync/connection/dst_ds";
import {getConnectionTargetPath, getConnectionTargetPathFromPath, getTargetFromLocation} from '@site/src/utils/connectionSlug';

const {Panel} = Collapse;

const DataSourceSelect = ({data, sourceType, sourceSlug, mapping, initialTarget, onTargetChange, onTargetNavigate}) => {
    const location = useLocation();
    const history = useHistory();
    const {siteConfig} = useDocusaurusContext();
    const targetList = stickySourceType(Object.keys(data), sourceType);
    const initialSelectedTarget = initialTarget && targetList.includes(initialTarget) ? initialTarget : targetList.length ? targetList[0] : "";
    const [target, setTarget] = useState(initialSelectedTarget)
    const defaultTargetPath = initialSelectedTarget
        ? getConnectionTargetPathFromPath(location.pathname, initialSelectedTarget, sourceSlug || sourceType)
        : '';
    const sourcePageCanonical = !initialTarget && defaultTargetPath
        ? `${siteConfig.url.replace(/\/+$/, '')}${defaultTargetPath}`
        : '';

    useEffect(() => {
        if (initialTarget && targetList.includes(initialTarget) && initialTarget !== target) {
            setTarget(initialTarget);
        }
    }, [initialTarget])

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
        const syncTargetFromLocation = () => {
            const locationTarget = getTargetFromLocation(targetList);
            if (locationTarget) {
                setTarget(locationTarget);
                onTargetChange?.(locationTarget);
            }
        };

        syncTargetFromLocation();

        if (typeof window !== 'undefined') {
            const queryTarget = new URLSearchParams(window.location.search).get('target');
            if (queryTarget && targetList.includes(queryTarget)) {
                history.replace(getConnectionTargetPath(queryTarget, sourceSlug || sourceType));
            } else if (!getTargetFromLocation(targetList) && target) {
                history.replace(getConnectionTargetPath(target, sourceSlug || sourceType));
            }

            window.addEventListener('popstate', syncTargetFromLocation);
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
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('popstate', syncTargetFromLocation);
            }
        };
    }, [])

    const handleTargetChange = (value) => {
        setTarget(value)
        onTargetChange?.(value);
        if (onTargetNavigate) {
            onTargetNavigate(value);
            return;
        }
        if (typeof window !== 'undefined') {
            window.history.pushState({}, '', getConnectionTargetPath(value, sourceSlug || sourceType));
        }
    }

    return (
        <div className='datasource-select'>
            {sourcePageCanonical ? (
                <Head>
                    <link rel="canonical" href={sourcePageCanonical}/>
                    <meta property="og:url" content={sourcePageCanonical}/>
                </Head>
            ) : null}
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
                <Table dataSource={data[target]?.main_function} pagination={false}>
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
            {commonFunction && commonFunction.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'高级功能'}>高级功能
                        <a className="hash-link" href="#高级功能" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={commonFunction} pagination={false}>
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
            {commonNotice && commonNotice.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'}
                        id={'限制和注意点'}>限制和注意点
                        <a className="hash-link" href="#限制和注意点" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={commonNotice} pagination={false}>
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
            {commonExamples && commonExamples.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'使用示例'}>使用示例
                        <a className="hash-link" href="#使用示例" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={commonExamples} pagination={false}>
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
            {commonFaq && commonFaq.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'链路faq'}>链路FAQ
                        <a className="hash-link" href="#链路faq" title="{heading}的直接链接"></a>
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
            {/*            id={'字段类型与映射'}>字段类型与映射*/}
            {/*            <a className="hash-link" href="#字段类型与映射" title="{heading}的直接链接"></a>*/}
            {/*        </h3>*/}
            {/*        {*/}
            {/*            data[target].mapping ?*/}
            {/*                <Collapse className="mapping-collapse" defaultActiveKey={[]} ghost>*/}
            {/*                    <Panel header="展开字段类型映射表格" key="1">*/}
            {/*                        <Table dataSource={data[target].mapping} pagination={false}>*/}
            {/*                            <Col title="源表类型" dataIndex="source" key="source"*/}
            {/*                                    style={{borderRadius: 0}}/>*/}
            {/*                            <Col*/}
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
                <h2 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={"源端数据源"}>源端数据源
                    <a className="hash-link" href="#源端数据源" title="{heading}的直接链接"></a>
                </h2>
            </div>
            {SourceInfo[sourceType] && SourceInfo[sourceType].prepare && SourceInfo[sourceType].prepare.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'前置条件'}>前置条件
                        <a className="hash-link" href="#前置条件" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={SourceInfo[sourceType]?.prepare} pagination={false}>
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
            {SourceInfo[sourceType] && SourceInfo[sourceType].params && SourceInfo[sourceType].params.length > 0 ?
                <div className='markdown'>
                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'} id={'任务参数'}>任务参数
                        <a className="hash-link" href="#任务参数" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={SourceInfo[sourceType]?.params} pagination={false}>
                        <Col title='参数名称' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div
                                    style={{fontWeight: 700, fontStyle: 'italic'}}>{record.key}</div>}/>
                        <Col
                            title='说明'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc} rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                    <ReactMarkdown
                        children={'> Tips: 通用参数配置请参考 [通用参数及功能](../../param_and_func/param_guide)'}
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}/>
                </div> : null
            }

            <hr/>
            {TargetInfo[target] ?
                <div className='markdown'>
                    <h2 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'}
                        id={"目标端数据源"}>目标端数据源
                        <a className="hash-link" href="#目标端数据源" title="{heading}的直接链接"></a>
                    </h2>
                </div> : null
            }

            {TargetInfo[target] && TargetInfo[target].prepare && TargetInfo[target].prepare.length > 0 ?
                <div className='markdown'>

                    <h3 className={'anchor anchorWithStickyNavbar_src-theme-Heading-styles-module'}
                        id={'前置条件'}>前置条件
                        <a className="hash-link" href="#前置条件" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={TargetInfo[target]?.prepare} pagination={false}>
                        <Col title='条件' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div style={{fontWeight: 700}}>{record.key}</div>}/>
                        <Col
                            title='说明'
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
                        id={'任务参数'}>任务参数
                        <a className="hash-link" href="#任务参数" title="{heading}的直接链接"></a>
                    </h3>
                    <Table dataSource={TargetInfo[target]?.params} pagination={false}>
                        <Col title='参数名称' dataIndex="key" key="key" style={{borderRadius: 0}}
                                render={(_, record) => <div
                                    style={{fontWeight: 700, fontStyle: 'italic'}}>{record.key}</div>}/>
                        <Col
                            title='说明'
                            key="desc"
                            render={(_, record) => <ReactMarkdown children={record.desc}
                                                                  rehypePlugins={[rehypeRaw]}
                                                                  remarkPlugins={[remarkGfm]}/>}
                        />
                    </Table>
                    <ReactMarkdown
                        children={'> Tips: 通用参数配置请参考 [通用参数及功能](../../param_and_func/param_guide)'}
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
