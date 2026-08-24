export const INACTIVE_API_ENDPOINTS = {
  LIST: "/inactive",
  DETAIL: (id: string) => "/inactive/" + id,
  CREATE: "/inactive",
  UPDATE: (id: string) => "/inactive/" + id,
  DELETE: (id: string) => "/inactive/" + id,
} as const;
