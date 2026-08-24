export const REQUEST_HISTORY_API_ENDPOINTS = {
  LIST: "/request-history",
  DETAIL: (id: string) => "/request-history/" + id,
  CREATE: "/request-history",
  UPDATE: (id: string) => "/request-history/" + id,
  DELETE: (id: string) => "/request-history/" + id,
} as const;
