export const FAILED_API_ENDPOINTS = {
  LIST: "/failed",
  DETAIL: (id: string) => "/failed/" + id,
  CREATE: "/failed",
  UPDATE: (id: string) => "/failed/" + id,
  DELETE: (id: string) => "/failed/" + id,
} as const;
