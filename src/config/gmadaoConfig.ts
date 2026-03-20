export function getGmadaoConfigBaseUrl(): string {
  return import.meta.env.DEV ? '/GMADAOAPI/' : 'https://erp.city/GMADAOAPI/';
}

export function getGmadaoConfigJsonUrl(): string {
  return getGmadaoConfigBaseUrl() + 'GMADAOConfig.Json';
}

export function getGmadaoConfigFileConfig() {
  return {
    fieldName: 'file',
    fileName: 'GMADAOConfig.Json',
  };
}
