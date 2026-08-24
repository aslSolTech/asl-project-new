export const LIVE_RECHARGE_API_ENDPOINTS = {
  LIST: "/live-recharge",
  DETAIL: (id: string) => "/live-recharge/" + id,
  CREATE: "/live-recharge",
  UPDATE: (id: string) => "/live-recharge/" + id,
  DELETE: (id: string) => "/live-recharge/" + id,
} as const;
