import http from './http';
import { BASE_CC_URL_PREFIX } from './index';

export function listPaymentMethods() {
  return http.post(`${BASE_CC_URL_PREFIX}/saas/listpaymentmethods`);
}

export function createSession(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/saas/createsession`, params);
}

export function subscription(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/saas/subscription`, params);
}

export function cancelSubscription(params: any) {
  return http.post(`${BASE_CC_URL_PREFIX}/saas/cancelsubscription`, params);
} 