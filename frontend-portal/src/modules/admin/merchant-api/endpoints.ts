export const MERCHANT_API_ENDPOINTS = {
  LIST: "/merchant-api",
  DETAIL: (id: string) => "/merchant-api/" + id,
  CREATE: "/merchant-api",
  UPDATE: (id: string) => "/merchant-api/" + id,
  DELETE: (id: string) => "/merchant-api/" + id,
} as const;
