declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * 发送「免费社区版下载」事件到 Google Analytics（仅 BladePipe 站点加载了 gtag，其他站点调用无副作用）
 */
export function trackCommunityEditionDownload(version?: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'community_edition_download', {
    event_category: 'download',
    event_label: 'BladePipe Community Edition',
    product_version: version ?? '',
  });
}
