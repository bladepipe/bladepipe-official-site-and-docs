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
  const match = normalizedPath.match(/\/docs\/dataMigrationAndSync\/connection\/[^/]+\/([^/]+)$/);
  const targetSlug = match ? decodeURIComponent(match[1]) : '';

  return targetsBySlug.get(targetSlug) || '';
};

export const getConnectionTargetPath = (target) => {
  if (typeof window === 'undefined') {
    return '';
  }

  const slug = slugifyConnectionTarget(target);
  const pathWithoutTrailingSlash = window.location.pathname.replace(/\/+$/, '');
  const match = pathWithoutTrailingSlash.match(/^(.*\/docs\/dataMigrationAndSync\/connection\/[^/]+)(?:\/[^/]+)?$/);
  const sourcePath = match ? match[1] : pathWithoutTrailingSlash;

  return `${sourcePath}/${slug}/`;
};
