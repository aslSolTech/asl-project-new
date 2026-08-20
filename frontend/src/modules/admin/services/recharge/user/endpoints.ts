export const USER_API_ENDPOINTS = {
  LIST: "/user",
  DETAIL: (id: string) => "/user/" + id,
  CREATE: "/user",
  UPDATE: (id: string) => "/user/" + id,
  DELETE: (id: string) => "/user/" + id,
} as const;
