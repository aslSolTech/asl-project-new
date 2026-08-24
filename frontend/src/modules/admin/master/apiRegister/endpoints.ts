export const API_REGISTER_API_ENDPOINTS = {
  LIST: "/api-register",
  DETAIL: (id: string) => "/api-register/" + id,
  CREATE: "/api-register",
  UPDATE: (id: string) => "/api-register/" + id,
  DELETE: (id: string) => "/api-register/" + id,
} as const;
