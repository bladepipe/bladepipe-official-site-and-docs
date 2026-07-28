// src/store/user.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getApiBaseUrl, getCloudUrl } from '@site/src/utils/api';
import { login, loginMfaValid, queryLoginUser, logout as apiLogout } from '@site/src/apis/user';
import { useConstantStore } from './constant';

type UserState = {
  loginInfo: any;
  userInfo: any;
  login: (params: any) => Promise<any>;
  loginMfaValid: (params: { mfaCode: string; mfaPreActionToken: string }) => Promise<any>;
  finishLoginRedirect: () => void;
  queryLoginUser: () => Promise<void>;
  logout: () => Promise<void>;
  isLogin: () => boolean;
};

function redirectAfterLogin() {
  const loginSource = localStorage.getItem('loginSource');
  localStorage.removeItem('loginSource');
  if (loginSource === 'try_cloud_free') {
    window.location.href = getCloudUrl();
  } else if (loginSource === 'download') {
    localStorage.setItem('openCommunityDownloadModal', 'true');
    window.location.href = '/';
  } else if (loginSource === 'buy_a_license') {
    window.location.href = `${getCloudUrl()}/#/system/license`;
  } else {
    window.location.href = '/';
  }
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      loginInfo: {},
      userInfo: {},
      async login(params) {
        try {
          const loginRes: any = await login(params);
          if (loginRes && loginRes.success) {
            if (loginRes.data?.needMfa) {
              return loginRes;
            }
            set({ loginInfo: loginRes.data });
            localStorage.setItem('jwt_token', loginRes.data.token);
            await get().queryLoginUser();
            return loginRes;
          }
          return loginRes;
        } catch (e) {
          console.error(e);
        }
      },
      async loginMfaValid(params) {
        try {
          const res: any = await loginMfaValid(params);
          if (res?.success) {
            set({ loginInfo: res.data });
            localStorage.setItem('jwt_token', res.data.token);
            await get().queryLoginUser();
          }
          return res;
        } catch (e) {
          console.error(e);
          return { success: false };
        }
      },
      finishLoginRedirect() {
        redirectAfterLogin();
      },
      async queryLoginUser() {
        try {
          const userRes: any = await queryLoginUser();
          if (userRes && userRes.success) {
            set({ userInfo: userRes.data });
          } else {
            set({ userInfo: {} });
          }
        } catch (e: any) {
          set({ userInfo: {} });
          console.error(e);
        }
      },
      async logout() {
        const showLoading = useConstantStore.getState().showLoading;
        const closeLoading = useConstantStore.getState().closeLoading;
        showLoading && showLoading();
        try {
          const logoutRes: any = await apiLogout();
          if (logoutRes && logoutRes.success) {
            set({ loginInfo: {}, userInfo: {} });
            localStorage.removeItem('jwt_token');
            sessionStorage.clear();
            window.location.href = '/';
          }
        } catch (e) {
          console.error('Logout failed:', e);
        } finally {
          closeLoading && closeLoading();
        }
      },
      isLogin() {
        const userInfo = this.userInfo;
        return !!(userInfo && userInfo?.uid);
      }
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ loginInfo: state.loginInfo, userInfo: state.userInfo })
    }
  )
);

export function isUserLogin() {
  return useUserStore.getState()?.isLogin?.();
}
