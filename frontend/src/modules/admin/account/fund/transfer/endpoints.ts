export const TRANSFER_API_ENDPOINTS = {
  LIST: "/transfer",
  DETAIL: (id: string) => "/transfer/" + id,
  CREATE: "/transfer",
  UPDATE: (id: string) => "/transfer/" + id,
  DELETE: (id: string) => "/transfer/" + id,
} as const;
