export const LOGIN_ACTIVITY_API_ENDPOINTS = {
  LIST: "/login-activity",
  DETAIL: (id: string) => "/login-activity/" + id,
  CREATE: "/login-activity",
  UPDATE: (id: string) => "/login-activity/" + id,
  DELETE: (id: string) => "/login-activity/" + id,
} as const;
