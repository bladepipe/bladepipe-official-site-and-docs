import http from './http';
import { BASE_URL_PREFIX } from './index';

export function listCountry() {
  return http.post(`${BASE_URL_PREFIX}/constant/listcountry`);
}

export function ssoType(params: any) {
  return http.post(`${BASE_URL_PREFIX}/constant/sso_type`, params);
}

export function getPublicKey() {
  return http.post('/getPublicKey');
}

export function listDownloadProduct(params: any) {
  return http.post(`${BASE_URL_PREFIX}/constant/listDownloadProduct`, params);
}

export function queryPriceMeta(params: any) {
  return http.post(`${BASE_URL_PREFIX}/saas/queryPriceMeta`, params);
}
