export const ABOUT_API_ENDPOINTS = {
  LIST: "/about",
  DETAIL: (id: string) => "/about/" + id,
  CREATE: "/about",
  UPDATE: (id: string) => "/about/" + id,
  DELETE: (id: string) => "/about/" + id,
} as const;
