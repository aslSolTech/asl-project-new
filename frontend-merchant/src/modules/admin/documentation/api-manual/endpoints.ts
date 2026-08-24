export const API_MANUAL_API_ENDPOINTS = {
  LIST: "/api-manual",
  DETAIL: (id: string) => "/api-manual/" + id,
  CREATE: "/api-manual",
  UPDATE: (id: string) => "/api-manual/" + id,
  DELETE: (id: string) => "/api-manual/" + id,
} as const;
