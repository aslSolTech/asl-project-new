export const RECHARGE_API_ENDPOINTS = {
  LIST: "/recharge",
  DETAIL: (id: string) => "/recharge/" + id,
  CREATE: "/recharge",
  UPDATE: (id: string) => "/recharge/" + id,
  DELETE: (id: string) => "/recharge/" + id,
} as const;
