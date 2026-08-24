export const BANNER_API_ENDPOINTS = {
  LIST: "/banner",
  DETAIL: (id: string) => "/banner/" + id,
  CREATE: "/banner",
  UPDATE: (id: string) => "/banner/" + id,
  DELETE: (id: string) => "/banner/" + id,
} as const;
