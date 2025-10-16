import { create } from 'zustand';
import { ssoType as apiSsoType } from '@site/src/apis/constant';

// 登录验证码类型常量
export const VERIFY_TYPES = {
  SMS_VERIFY_CODE: 'SMS_VERIFY_CODE',
  EMAIL_VERIFY_CODE: 'EMAIL_VERIFY_CODE',
};

type ConstantState = {
  deploySite: string;
  docPrefix: string;
  ssoTypes: Record<string, any>;
  loading: boolean;
  loginCallback: string;
  ssoType: () => Promise<void>;
  showLoading: () => void;
  closeLoading: () => void;
  updateLoginCallback: (type: string) => void;
  isAsia: () => boolean;
  verifyType: () => string;
};

export const useConstantStore = create<ConstantState>((set, get) => ({
  deploySite: '',
  docPrefix: '',
  ssoTypes: {},
  loading: true,
  loginCallback: 'login',
  async ssoType() {
    try {
      const ssoTypeRes: any = await apiSsoType({
        src: window.sessionStorage.getItem('source_for_cc'),
        target: window.localStorage.getItem('loginSource'),
      });
      if (ssoTypeRes && ssoTypeRes.success) {
        set({ ssoTypes: ssoTypeRes.data });
      }
    } catch (e) {
      console.log(e);
    }
  },
  showLoading() {
    if (window.location.pathname !== '/') {
      set({ loading: true });
    }
  },
  closeLoading() {
    set({ loading: false });
  },
  updateLoginCallback(type: string) {
    set({ loginCallback: type });
  },
  isAsia() {
    return get().deploySite === 'china';
  },
  verifyType() {
    return get().deploySite === 'china'
      ? VERIFY_TYPES.SMS_VERIFY_CODE
      : VERIFY_TYPES.EMAIL_VERIFY_CODE;
  },
}));
