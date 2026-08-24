export const REQUESTS_API_ENDPOINTS = {
  LIST: "/requests",
  DETAIL: (id: string) => "/requests/" + id,
  CREATE: "/requests",
  UPDATE: (id: string) => "/requests/" + id,
  DELETE: (id: string) => "/requests/" + id,
} as const;
