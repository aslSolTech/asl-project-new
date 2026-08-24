export const ADD_API_ENDPOINTS = {
  LIST: "/add",
  DETAIL: (id: string) => "/add/" + id,
  CREATE: "/add",
  UPDATE: (id: string) => "/add/" + id,
  DELETE: (id: string) => "/add/" + id,
} as const;
