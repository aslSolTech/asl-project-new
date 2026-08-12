export const LIST_API_ENDPOINTS = {
  LIST: "/list",
  DETAIL: (id: string) => "/list/" + id,
  CREATE: "/list",
  UPDATE: (id: string) => "/list/" + id,
  DELETE: (id: string) => "/list/" + id,
} as const;
