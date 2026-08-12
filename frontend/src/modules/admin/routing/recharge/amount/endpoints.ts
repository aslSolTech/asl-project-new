export const AMOUNT_API_ENDPOINTS = {
  LIST: "/amount",
  DETAIL: (id: string) => "/amount/" + id,
  CREATE: "/amount",
  UPDATE: (id: string) => "/amount/" + id,
  DELETE: (id: string) => "/amount/" + id,
} as const;
