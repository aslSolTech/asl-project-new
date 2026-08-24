export const PROFILE_API_ENDPOINTS = {
  LIST: "/profile",
  DETAIL: (id: string) => "/profile/" + id,
  CREATE: "/profile",
  UPDATE: (id: string) => "/profile/" + id,
  DELETE: (id: string) => "/profile/" + id,
} as const;
