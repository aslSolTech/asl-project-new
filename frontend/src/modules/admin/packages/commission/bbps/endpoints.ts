export const BBPS_API_ENDPOINTS = {
  LIST: "/bbps",
  DETAIL: (id: string) => "/bbps/" + id,
  CREATE: "/bbps",
  UPDATE: (id: string) => "/bbps/" + id,
  DELETE: (id: string) => "/bbps/" + id,
} as const;
