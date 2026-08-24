export const REQUEST_TYPES_API_ENDPOINTS = {
  REQUEST_TYPE: {
    LIST: "/settings/request-types",
    DETAIL: (id: string) => `/settings/request-types/${id}`,
    CREATE: "/settings/request-types",
    UPDATE: (id: string) => `/settings/request-types/${id}`,
    DELETE: (id: string) => `/settings/request-types/${id}`,
  },
  REQUEST_PARAM: {
    LIST: "/settings/request-parameters",
    DETAIL: (id: string) => `/settings/request-parameters/${id}`,
    CREATE: "/settings/request-parameters",
    UPDATE: (id: string) => `/settings/request-parameters/${id}`,
    DELETE: (id: string) => `/settings/request-parameters/${id}`,
  },
  PARAM_STATUS: {
    LIST: "/settings/request-parameter-statuses",
    DETAIL: (id: string) => `/settings/request-parameter-statuses/${id}`,
    CREATE: "/settings/request-parameter-statuses",
    UPDATE: (id: string) => `/settings/request-parameter-statuses/${id}`,
    DELETE: (id: string) => `/settings/request-parameter-statuses/${id}`,
  },
};
