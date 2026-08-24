export const HEADER_API_ENDPOINTS = {
  LIST: "/header",
  DETAIL: (id: string) => "/header/" + id,
  CREATE: "/header",
  UPDATE: (id: string) => "/header/" + id,
  DELETE: (id: string) => "/header/" + id,
} as const;
