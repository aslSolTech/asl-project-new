export const BALANCE_API_API_ENDPOINTS = {
  LIST: "/api-balance",
  DETAIL: (id: string) => "/api-balance/" + id,
  CREATE: "/api-balance",
  UPDATE: (id: string) => "/api-balance/" + id,
  DELETE: (id: string) => "/api-balance/" + id,
} as const;
