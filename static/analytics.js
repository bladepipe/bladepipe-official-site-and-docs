/**
 * Google Analytics 4 初始化（仅 BladePipe 站点会加载上方的 gtag.js）
 * 使用官方推荐片段，保证 gtag('js') 与 gtag('config') 正确执行
 */
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-QFL3CQMTBN', { send_page_view: true });
})();
