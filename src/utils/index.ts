import { queryLoginUser } from '@site/src/apis/user';

/**
 * 检查登录状态，未登录跳转到/login，已登录执行回调
 * @param onSuccess 登录成功时的回调
 * @param loginSource 登录来源标识
 */
export async function loginCheckAndRedirect(onSuccess: () => void, loginSource?: string) {
  try {
    await queryLoginUser();
    onSuccess();
  } catch (error: any) {
    if (error && error.response && error.response.status === 401) {
      // 设置登录来源
      if (loginSource) {
        localStorage.setItem('loginSource', loginSource);
      }
      window.location.href = '/login';
    }
  }
}

// 生成getAgentId
export function getAgentId(fun) {
  let hashHex = '';
  // 创建Canvas元素
  try {
    const canvas = window.document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // 获取浏览器属性
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const languages = navigator.languages.join(',');
    const plugins = Array.from(navigator.plugins)
      .map((plugin) => plugin.name)
      .join(',');
    const appVersion = navigator.appVersion;
    const platform = navigator.platform;
    // 绘制文本到Canvas
    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial"';
    ctx.fillText(userAgent + language + plugins + languages + appVersion + platform, 2, 2);
    // 获取Canvas数据URL
    const dataURL = canvas.toDataURL();
    // 计算SHA-256哈希值
    if (window.crypto && crypto.subtle) {
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(dataURL)).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        // hashHex 包含浏览器指纹
        fun(hashHex);
      });
    } else {
      // 不支持加密API
      fun('');
    }
  } catch (e) {
    fun('');
  }
  return hashHex;
}
