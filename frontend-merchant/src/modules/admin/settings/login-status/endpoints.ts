export const LOGIN_STATUS_API_ENDPOINTS = {
  LIST: "/settings/login-status-types",
  DETAIL: (id: string) => `/settings/login-status-types/${id}`,
  CREATE: "/settings/login-status-types",
  UPDATE: (id: string) => `/settings/login-status-types/${id}`,
  DELETE: (id: string) => `/settings/login-status-types/${id}`,
};
