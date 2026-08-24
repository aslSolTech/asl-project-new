export const HISTORY_API_ENDPOINTS = {
  LIST: "/history",
  DETAIL: (id: string) => "/history/" + id,
  CREATE: "/history",
  UPDATE: (id: string) => "/history/" + id,
  DELETE: (id: string) => "/history/" + id,
} as const;
