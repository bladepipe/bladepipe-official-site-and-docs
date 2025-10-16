import axios from 'axios';
import { getApiBaseUrl } from '@site/src/utils/api';

const BASE_URL = getApiBaseUrl();
console.log('BASE_URL', BASE_URL);

// 获取当前 locale 的函数
const getCurrentLocale = (): string => {
  // 从 URL 路径中获取 locale
  const pathname = window.location.pathname;
  const localeMatch = pathname.match(/^\/([a-z]{2})\//);
  
  if (localeMatch) {
    return localeMatch[1];
  }
  
  // 从 localStorage 中获取 locale
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    return savedLocale;
  }
  
  // 从 HTML lang 属性获取
  const htmlLang = document.documentElement.lang;
  if (htmlLang && htmlLang !== 'en') {
    return htmlLang;
  }
  
  // 默认返回英文
  return 'en';
};

// 将 locale 转换为标准的 Accept-Language 格式
const getAcceptLanguage = (locale: string): string => {
  const localeMap: { [key: string]: string } = {
    'zh': 'zh-CN,zh;q=0.9,en;q=0.8',
    'en': 'en-US,en;q=0.9',
    'ja': 'ja-JP,ja;q=0.9,en;q=0.8',
    'ko': 'ko-KR,ko;q=0.9,en;q=0.8'
  };
  
  return localeMap[locale] || 'en-US,en;q=0.9';
};

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 根据当前 locale 设置 Accept-Language
    const currentLocale = getCurrentLocale();
    config.headers['Accept-Language'] = getAcceptLanguage(currentLocale);
    
    return config;
  },
  error => Promise.reject(error)
);

http.interceptors.response.use(
  response => response.data,
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      error.config.url !== '/rdp/console/api/v1/user/queryLoginUser'
    ) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default http; 