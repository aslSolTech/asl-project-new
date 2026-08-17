export const RESPONSE_TYPE_API_ENDPOINTS = {
  LIST: "/settings/response-types",
  DETAIL: (id: string) => `/settings/response-types/${id}`,
  CREATE: "/settings/response-types",
  UPDATE: (id: string) => `/settings/response-types/${id}`,
  DELETE: (id: string) => `/settings/response-types/${id}`,
};
