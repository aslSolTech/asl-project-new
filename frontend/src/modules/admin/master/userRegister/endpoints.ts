export const USER_REGISTER_API_ENDPOINTS = {
  LIST: "/user-register",
  DETAIL: (id: string) => "/user-register/" + id,
  CREATE: "/user-register",
  UPDATE: (id: string) => "/user-register/" + id,
  DELETE: (id: string) => "/user-register/" + id,
} as const;
