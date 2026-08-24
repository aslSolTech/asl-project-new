export const API_TYPE_ENDPOINTS = {
  LIST: "/api/settings/api-types",
  CREATE: "/api/settings/api-types",
  DETAIL: (id: string) => `/api/settings/api-types/${id}`,
  UPDATE: (id: string) => `/api/settings/api-types/${id}`,
  DELETE: (id: string) => `/api/settings/api-types/${id}`,
};
