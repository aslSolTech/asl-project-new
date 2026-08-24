export const API_TYPE_API_ENDPOINTS = {
  LIST: "/api-type",
  DETAIL: (id: string) => "/api-type/" + id,
  CREATE: "/api-type",
  UPDATE: (id: string) => "/api-type/" + id,
  DELETE: (id: string) => "/api-type/" + id,
} as const;
