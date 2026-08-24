export const AEPS_API_ENDPOINTS = {
  LIST: "/aeps",
  DETAIL: (id: string) => "/aeps/" + id,
  CREATE: "/aeps",
  UPDATE: (id: string) => "/aeps/" + id,
  DELETE: (id: string) => "/aeps/" + id,
} as const;
