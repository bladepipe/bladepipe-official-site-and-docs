import http from './http';
import { BASE_URL_PREFIX } from './index';

export function getDownloadUrl(params: any) {
  return http.post(`${BASE_URL_PREFIX}/user/recordandreturndownloadurl`, params);
} 