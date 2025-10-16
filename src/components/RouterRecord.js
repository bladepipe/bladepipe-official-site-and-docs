import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { getApiBaseUrl } from '@site/src/utils/api';

const RouterRecord = () => {
    const {
        i18n: {currentLocale},
    } = useDocusaurusContext();
    let CLOUDCANAL_URL = 'https://removesaas.clougence.com';
    if (currentLocale === 'zh') {
        CLOUDCANAL_URL = 'https://removesaas.clougence.com';
    } else if (currentLocale === 'en') {
        CLOUDCANAL_URL = getApiBaseUrl();
    }

    const location = useLocation();

    useEffect(() => {
        getAgentId((hashHex)=>{
            //调用接口记录数据
            axios.defaults.withCredentials = true;
            axios.post(`${CLOUDCANAL_URL}/addviewlog`, {
                src: window.localStorage.getItem('source_for_cc'),
                kw: window.localStorage.getItem('kw_for_cc'),
                vbId: window.localStorage.getItem('vbid_for_cc'),
                clientId: hashHex,
                uid: '',
                uri: location.pathname
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        // 处理路由变化事件
    }, [location]);
    return null;
}

function getAgentId(fun){
    let hashHex = '';
    // 创建Canvas元素
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

// 获取浏览器属性
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const languages = navigator.languages.join(',');
    const plugins = Array.from(navigator.plugins).map(plugin => plugin.name).join(',');
    const appVersion = navigator.appVersion;
    const platform = navigator.platform;

// 绘制文本到Canvas
    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial"';
    ctx.fillText(userAgent + language + plugins + languages + appVersion + platform, 2, 2);

// 获取Canvas数据URL
    const dataURL = canvas.toDataURL();

// 计算SHA-256哈希值
    if ((window.crypto || window.msCryptoif (crypto.subtle)) && crypto.subtle) {
        crypto.subtle.digest('SHA-256', new TextEncoder().encode(dataURL))
            .then(hashBuffer => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                // hashHex 包含浏览器指纹
                // console.log('hashHex', hashHex, navigator.userAgent);
                fun(hashHex);
            });
    } else {
        // 不支持加密API
        console.log('no hashHex');
    }
    return hashHex;
}

export default RouterRecord;
