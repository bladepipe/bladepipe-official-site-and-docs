import http from './http';
import { BASE_URL_PREFIX } from './index';

export interface ApplyDataSourceFO {
  linkRequest: string;
  requirementReason: string;
  urgent: boolean;
  /** 选择「紧急」时填写的期望时间，后端 @Size(max = 32) */
  expectedTime?: string | null;
  contactMe?: boolean;
  uid?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  company?: string;
}

export interface ApplyDataSourceResponse {
  success?: boolean;
  msg?: string;
  [key: string]: any;
}

export function applyDataSource(params: ApplyDataSourceFO): Promise<ApplyDataSourceResponse> {
  return http.post(`${BASE_URL_PREFIX}/feedback/applyDataSource`, params);
}

export interface ContactUsFO {
  uid?: string;
  contactName: string;
  contactPhone?: string;
  contactEmail?: string;
  company?: string;
  requirement: string;
}

export interface ContactUsResponse {
  success?: boolean;
  msg?: string;
  [key: string]: any;
}

export function contactUs(params: ContactUsFO): Promise<ContactUsResponse> {
  return http.post(`${BASE_URL_PREFIX}/feedback/contactUs`, params);
}
