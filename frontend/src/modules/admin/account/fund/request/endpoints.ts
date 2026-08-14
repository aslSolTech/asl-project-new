export const REQUEST_API_ENDPOINTS = {
  LIST: "/account/fund/request",
  DETAIL: (id: string) => `/account/fund/request/${id}`,
  CREATE: "/account/fund/request",
  UPDATE: (id: string) => `/account/fund/request/${id}`,
  DELETE: (id: string) => `/account/fund/request/${id}`,
  APPROVE: (id: string) => `/account/fund/request/${id}/approve`,
  DECLINE: (id: string) => `/account/fund/request/${id}/decline`,
} as const;
