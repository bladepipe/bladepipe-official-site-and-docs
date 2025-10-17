import * as userApi from './user'
import * as constantApi from './constant'
import * as verifyApi from './verify'
import * as downloadApi from './download'
import * as licenseApi from "./license";
import * as weblogApi from './weblog';
import * as invoiceApi from "./invoice";
import * as paymentApi from './payment'
import * as billingApi from "./billing";

export const BASE_URL_PREFIX: string = '/rdp/console/api/v1';
export const BASE_CC_URL_PREFIX: string = '/cloudcanal/console/api/v1/inner';

export default {
  userApi,
  constantApi,
  verifyApi,
  downloadApi,
  licenseApi,
  weblogApi,
  invoiceApi,
  paymentApi,
  billingApi
}
