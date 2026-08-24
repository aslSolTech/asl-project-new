export const CONTACT_API_ENDPOINTS = {
  LIST: "/contact",
  DETAIL: (id: string) => "/contact/" + id,
  CREATE: "/contact",
  UPDATE: (id: string) => "/contact/" + id,
  DELETE: (id: string) => "/contact/" + id,
} as const;
