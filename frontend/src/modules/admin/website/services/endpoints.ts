export const SERVICES_API_ENDPOINTS = {
  LIST: "/services",
  DETAIL: (id: string) => "/services/" + id,
  CREATE: "/services",
  UPDATE: (id: string) => "/services/" + id,
  DELETE: (id: string) => "/services/" + id,
} as const;
