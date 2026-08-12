export const ROLLBACK_API_ENDPOINTS = {
  LIST: "/rollback",
  DETAIL: (id: string) => "/rollback/" + id,
  CREATE: "/rollback",
  UPDATE: (id: string) => "/rollback/" + id,
  DELETE: (id: string) => "/rollback/" + id,
} as const;
