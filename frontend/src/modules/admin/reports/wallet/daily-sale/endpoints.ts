export const DAILY_SALE_API_ENDPOINTS = {
  LIST: "/daily-sale",
  DETAIL: (id: string) => "/daily-sale/" + id,
  CREATE: "/daily-sale",
  UPDATE: (id: string) => "/daily-sale/" + id,
  DELETE: (id: string) => "/daily-sale/" + id,
} as const;
