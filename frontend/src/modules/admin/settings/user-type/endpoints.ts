export const USER_TYPE_API_ENDPOINTS = {
  LIST: "/settings/user-types",
  DETAIL: (id: string) => `/settings/user-types/${id}`,
  CREATE: "/settings/user-types",
  UPDATE: (id: string) => `/settings/user-types/${id}`,
  DELETE: (id: string) => `/settings/user-types/${id}`,
};
