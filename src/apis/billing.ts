import http from './http';
import { BASE_CC_URL_PREFIX } from './index';

export function listBillings(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/billing/list`, params);
}

export function getDetailById(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/billing/getdetailbyid`, params);
}
