export const SETTINGS_API_ENDPOINTS = {
  LIST: "/settings",
  DETAIL: (id: string) => "/settings/" + id,
  CREATE: "/settings",
  UPDATE: (id: string) => "/settings/" + id,
  DELETE: (id: string) => "/settings/" + id,
} as const;
