export const OPERATOR_TYPE_API_ENDPOINTS = {
  LIST: "/settings/operator-types",
  DETAIL: (id: string) => `/settings/operator-types/${id}`,
  CREATE: "/settings/operator-types",
  UPDATE: (id: string) => `/settings/operator-types/${id}`,
  DELETE: (id: string) => `/settings/operator-types/${id}`,
};
