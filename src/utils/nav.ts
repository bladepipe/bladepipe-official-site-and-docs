const URL_SCHEME_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
const STATIC_FILE_RE = /\/[^/?#]+\.[^/?#]+$/;

function shouldKeepOriginal(pathname: string): boolean {
  return (
    pathname === '' ||
    pathname === '/' ||
    pathname.endsWith('/') ||
    pathname.startsWith('//') ||
    URL_SCHEME_RE.test(pathname) ||
    STATIC_FILE_RE.test(pathname)
  );
}

function addTrailingSlashForInternalPath(url: string): string {
  const suffixIndex = url.search(/[?#]/);
  const pathname = suffixIndex === -1 ? url : url.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : url.slice(suffixIndex);

  if (shouldKeepOriginal(pathname)) {
    return url;
  }

  return `${pathname}/${suffix}`;
}

export function normalizeLinkForSiteBrand(url: string, siteBrand?: string): string {
  if (siteBrand !== 'bladepipe') {
    return url;
  }

  return addTrailingSlashForInternalPath(url);
}
