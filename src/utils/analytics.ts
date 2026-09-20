declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface CommunityEditionDownloadParams {
  version?: string;
  productType?: string;
  downloadMethod?: CommunityEditionDownloadMethod;
}

export type CommunityEditionDownloadMethod = 'docker' | 'k8s' | 'BinaryPackage';
export type CommunityEditionInstallMethod = 'docker' | 'k8s';

export interface CommunityEditionDownloadClickParams {
  entryPoint: 'homepage_banner' | 'homepage_user_guide' | 'pricing' | 'connector_detail';
}

export type BladePipeRegistrationMethod = 'password' | 'marketplace' | 'sso';

/**
 * 发送 BladePipe 首次注册成功事件。
 * 调用方只在注册接口明确成功时触发，不在普通登录成功时触发。
 */
export function trackBladePipeRegistrationSuccess(method: BladePipeRegistrationMethod): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'sign_up', {
    method,
    product_name: 'BladePipe',
  });
}

/**
 * 发送 BladePipe 社区版下载入口点击事件。
 */
export function trackCommunityEditionDownloadClick({ entryPoint }: CommunityEditionDownloadClickParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'community_edition_download_click', {
    event_category: 'download',
    event_label: 'BladePipe Community Edition',
    entry_point: entryPoint,
  });
}

/**
 * 发送 BladePipe Docker/K8S 安装命令复制事件。
 */
export function trackCommunityEditionInstallCommandCopy(method: CommunityEditionInstallMethod): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'community_edition_install_command_copy', {
    event_category: 'download',
    event_label: 'BladePipe Community Edition',
    download_method: method,
  });
}

/**
 * 发送「免费社区版实际下载」事件到 Google Analytics。
 * 仅 BladePipe 站点加载了 gtag，其他站点调用无副作用。
 */
export function trackCommunityEditionDownload({
  version,
  productType,
  downloadMethod = 'BinaryPackage',
}: CommunityEditionDownloadParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'community_edition_download', {
    event_category: 'download',
    event_label: 'BladePipe Community Edition',
    product_version: version ?? '',
    product_type: productType ?? '',
    download_method: downloadMethod,
  });
}
