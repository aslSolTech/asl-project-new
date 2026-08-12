export const API_KEYS_API_ENDPOINTS = {
  LIST: "/api-keys",
  DETAIL: (id: string) => "/api-keys/" + id,
  CREATE: "/api-keys",
  UPDATE: (id: string) => "/api-keys/" + id,
  DELETE: (id: string) => "/api-keys/" + id,
} as const;
