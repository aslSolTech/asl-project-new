export const RESPONSE_TYPE_API_ENDPOINTS = {
  LIST: "/settings/response-types",
  DETAIL: (id: string) => `/settings/response-types/${id}`,
  CREATE: "/settings/response-types",
  UPDATE: (id: string) => `/settings/response-types/${id}`,
  DELETE: (id: string) => `/settings/response-types/${id}`,
};

export const RESPONSE_PARAM_API_ENDPOINTS = {
  LIST: "/settings/response-parameters",
  DETAIL: (id: string) => `/settings/response-parameters/${id}`,
  CREATE: "/settings/response-parameters",
  UPDATE: (id: string) => `/settings/response-parameters/${id}`,
  DELETE: (id: string) => `/settings/response-parameters/${id}`,
};
