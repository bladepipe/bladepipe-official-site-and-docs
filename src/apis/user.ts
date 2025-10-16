import http from './http';
import { BASE_URL_PREFIX } from './index';

export function updateUserEmail(params: any) {
  return http.post(`${BASE_URL_PREFIX}/user/updateUserEmail`, params);
}

export function queryLoginUser() {
  return http.post(`${BASE_URL_PREFIX}/user/queryLoginUser`);
}

export function login(params: any) {
  return http.post('/login', params);
}

export function signIn(params: any) {
  return http.post('/register', params);
}

export function registerFromMarket(params: any) {
  return http.post('/registerFromMarket', params);
}

export function resetPwdUnLogin(params: any) {
  return http.post('/resetpwdunlogin', params);
}

export function logout() {
  return http.post('/logout');
}

export function ssoAuth(params: any) {
  return http.post('/auth', params);
} 