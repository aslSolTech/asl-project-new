export const TRANSACTIONS_API_ENDPOINTS = {
  LIST: "/transactions",
  DETAIL: (id: string) => "/transactions/" + id,
  CREATE: "/transactions",
  UPDATE: (id: string) => "/transactions/" + id,
  DELETE: (id: string) => "/transactions/" + id,
} as const;
