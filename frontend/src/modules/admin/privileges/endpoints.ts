export const PRIVILEGES_API_ENDPOINTS = {
  LIST: "/privileges",
  DETAIL: (id: string) => "/privileges/" + id,
  CREATE: "/privileges",
  UPDATE: (id: string) => "/privileges/" + id,
  DELETE: (id: string) => "/privileges/" + id,
} as const;
