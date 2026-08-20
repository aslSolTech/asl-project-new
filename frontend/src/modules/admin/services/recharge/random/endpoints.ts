export const RANDOM_API_ENDPOINTS = {
  LIST: "/random",
  DETAIL: (id: string) => "/random/" + id,
  CREATE: "/random",
  UPDATE: (id: string) => "/random/" + id,
  DELETE: (id: string) => "/random/" + id,
} as const;
