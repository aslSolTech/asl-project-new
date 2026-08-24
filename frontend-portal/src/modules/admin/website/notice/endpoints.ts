export const NOTICE_API_ENDPOINTS = {
  LIST: "/notice",
  DETAIL: (id: string) => "/notice/" + id,
  CREATE: "/notice",
  UPDATE: (id: string) => "/notice/" + id,
  DELETE: (id: string) => "/notice/" + id,
} as const;
