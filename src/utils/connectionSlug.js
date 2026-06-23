export const slugifyConnectionTarget = (value) => {
  return String(value || '')
    .trim()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getTargetFromLocation = (targetList) => {
  if (typeof window === 'undefined') {
    return '';
  }

  const targetsBySlug = new Map(targetList.map((item) => [slugifyConnectionTarget(item), item]));
  const queryTarget = new URLSearchParams(window.location.search).get('target');

  if (queryTarget && targetList.includes(queryTarget)) {
    return queryTarget;
  }

  const normalizedPath = window.location.pathname.replace(/\/+$/, '');
  const pairMatch = normalizedPath.match(/\/docs\/dataMigrationAndSync\/connection\/([^/]+-to-[^/]+)$/);
  const legacyMatch = normalizedPath.match(/\/docs\/dataMigrationAndSync\/connection\/[^/]+\/([^/]+)$/);
  const targetSlug = pairMatch
    ? decodeURIComponent(pairMatch[1]).replace(/^.+?-to-/, '')
    : legacyMatch
      ? decodeURIComponent(legacyMatch[1])
      : '';

  return targetsBySlug.get(targetSlug) || '';
};

export const getConnectionTargetPathFromPath = (pathname, target, sourceType) => {
  const slug = slugifyConnectionTarget(target);
  const sourceSlug = slugifyConnectionTarget(sourceType);
  const pathWithoutTrailingSlash = String(pathname || '').replace(/\/+$/, '');
  const match = pathWithoutTrailingSlash.match(/^(.*\/docs\/dataMigrationAndSync\/connection)(?:\/[^/]+(?:\/[^/]+)?)?$/);
  const connectionPath = match ? match[1] : pathWithoutTrailingSlash;

  return `${connectionPath}/${sourceSlug}-to-${slug}/`;
};

export const getConnectionTargetPath = (target, sourceType) => {
  if (typeof window === 'undefined') {
    return '';
  }

  return getConnectionTargetPathFromPath(window.location.pathname, target, sourceType);
};
