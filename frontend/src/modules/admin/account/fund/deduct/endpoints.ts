export const DEDUCT_API_ENDPOINTS = {
  LIST: "/deduct",
  DETAIL: (id: string) => "/deduct/" + id,
  CREATE: "/deduct",
  UPDATE: (id: string) => "/deduct/" + id,
  DELETE: (id: string) => "/deduct/" + id,
} as const;
