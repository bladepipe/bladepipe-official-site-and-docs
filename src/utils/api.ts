import siteConfig from '@generated/docusaurus.config';

/**
 * 获取 API 基础 URL
 * @returns API 基础 URL
 */
export const getApiBaseUrl = () => {
  return (siteConfig.customFields.API_BASE_URL as string) || 'http://localhost:8111';
};

export const getCloudUrl = () => {
  return (siteConfig.customFields.CLOUD_URL as string) || getApiBaseUrl();
};
