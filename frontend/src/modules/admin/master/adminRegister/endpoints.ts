export const ADMIN_API_ENDPOINTS = {
  LIST: "/admin-register",
  DETAIL: (id: string) => "/admin-register/" + id,
  CREATE: "/admin-register",
  UPDATE: (id: string) => "/admin-register/" + id,
  DELETE: (id: string) => "/admin-register/" + id,
} as const;
