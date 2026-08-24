export const IS_VERIFY_API_ENDPOINTS = {
  LIST: "/settings/is-verify-types",
  DETAIL: (id: string) => `/settings/is-verify-types/${id}`,
  CREATE: "/settings/is-verify-types",
  UPDATE: (id: string) => `/settings/is-verify-types/${id}`,
  DELETE: (id: string) => `/settings/is-verify-types/${id}`,
};
