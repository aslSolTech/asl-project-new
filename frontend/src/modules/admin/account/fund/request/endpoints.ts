export const REQUEST_API_ENDPOINTS = {
  LIST: "/request",
  DETAIL: (id: string) => "/request/" + id,
  CREATE: "/request",
  UPDATE: (id: string) => "/request/" + id,
  DELETE: (id: string) => "/request/" + id,
} as const;
