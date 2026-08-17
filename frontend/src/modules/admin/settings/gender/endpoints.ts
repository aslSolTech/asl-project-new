export const GENDER_API_ENDPOINTS = {
  LIST: "/settings/gender-types",
  DETAIL: (id: string) => `/settings/gender-types/${id}`,
  CREATE: "/settings/gender-types",
  UPDATE: (id: string) => `/settings/gender-types/${id}`,
  DELETE: (id: string) => `/settings/gender-types/${id}`,
};
