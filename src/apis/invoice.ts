import http from './http';
import { BASE_CC_URL_PREFIX } from './index';

export function listInvoices(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/saas/listinvoices`, params);
} 