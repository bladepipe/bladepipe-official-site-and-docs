import http from './http';
import { BASE_URL_PREFIX } from './index';

export function sendCode(params: any) {
  return http.post(`${BASE_URL_PREFIX}/verify/sendcode`, params);
}

export function sendCodeInLoginState(params: any) {
  return http.post(`${BASE_URL_PREFIX}/verify/sendcodeinloginstate`, params);
} 