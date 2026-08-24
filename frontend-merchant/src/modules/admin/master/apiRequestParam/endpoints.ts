export const REQUEST_PARAMETER_API_ENDPOINTS = {
  LIST: "/api-request-parameter",
  DETAIL: (id: string) => "/api-request-parameter/" + id,
  CREATE: "/api-request-parameter",
  UPDATE: (id: string) => "/api-request-parameter/" + id,
  DELETE: (id: string) => "/api-request-parameter/" + id,
} as const;
