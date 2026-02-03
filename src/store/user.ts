// src/store/user.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getApiBaseUrl } from '@site/src/utils/api';
import { login, queryLoginUser, logout as apiLogout } from '@site/src/apis/user';
import { useConstantStore } from './constant';
// import Cookies from 'js-cookie'; // 推荐用 js-cookie 管理 cookie
// import { DOMAIN } from '@site/src/domain'; // 如有

type UserState = {
  loginInfo: any;
  userInfo: any;
  login: (params: any) => Promise<any>;
  queryLoginUser: () => Promise<void>;
  logout: () => Promise<void>;
  isLogin: () => boolean;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      loginInfo: {},
      userInfo: {},
      async login(params) {
        try {
          const loginRes: any = await login(params);
          if (loginRes && loginRes.success) {
            set({ loginInfo: loginRes.data });
            // Cookies.set('jwt_token', loginRes.data.token, { expires: 1, path: '/', domain: DOMAIN.COOKIE_DOMAIN });
            localStorage.setItem('jwt_token', loginRes.data.token);
            await get().queryLoginUser();
            
            // 根据登录来源进行不同的跳转
            const loginSource = localStorage.getItem('loginSource');
            localStorage.removeItem('loginSource');
            if (loginSource === 'try_cloud_free') {
              window.location.href = getApiBaseUrl();
            } else if (loginSource === 'download') {
              // 跳转回首页并设置标识以打开下载弹窗
              localStorage.setItem('openCommunityDownloadModal', 'true');
              window.location.href = '/';
            } else if (loginSource === 'buy_a_license') {
              window.location.href = getApiBaseUrl() + '/#/system/license';
            } else {
              // 默认跳转到首页（sign in 或其他情况）
              window.location.href = '/';
            }
            
            return loginRes;
          } else {
            return loginRes;
          }
        } catch (e) {
          console.error(e);
        }
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
            // Cookies.remove('jwt_token', { path: '/', domain: DOMAIN.COOKIE_DOMAIN });
            localStorage.removeItem('jwt_token');
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
      name: 'user-store', // 本地持久化key
      partialize: (state) => ({ loginInfo: state.loginInfo, userInfo: state.userInfo })
    }
  )
);

export function isUserLogin() {
  return useUserStore.getState()?.isLogin?.();
}
