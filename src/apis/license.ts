import http from './http';
import { BASE_CC_URL_PREFIX } from './index';

export function getBuyTimeStandard(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/authcode/order/getbuytimestandard`, params);
}
export function queryOldResource(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/authcode/order/queryoldresource`, params);
}
export function calculatePrice(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/authcode/order/calculateprice`, params);
}
export function getConfigValue() {
  return http.post(`${BASE_CC_URL_PREFIX}/license/systemconfig/getconfigvalue`);
}
export function getCurrentLadderDiscount() {
  return http.post(`${BASE_CC_URL_PREFIX}/authcode/order/getcurrentladderdiscount`);
}
export function createOrder(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/authcode/order/create`, params);
}
export function queryOrderList(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/authcode/order/query`, params);
}
export function sendCodeInLoginState(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/verify/sendcodeinloginstate`, params);
}
export function showAuthCode(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/authcode/order/showauthcode`, params);
}
export function closeOrder(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/authcode/order/close`, params);
} 