export const CALLBACK_API_API_ENDPOINTS = {
  LIST: "/api-callback",
  DETAIL: (id: string) => "/api-callback/" + id,
  CREATE: "/api-callback",
  UPDATE: (id: string) => "/api-callback/" + id,
  DELETE: (id: string) => "/api-callback/" + id,
} as const;
