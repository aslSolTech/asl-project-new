export const DAILY_PAYOUT_API_ENDPOINTS = {
  LIST: "/daily-payout",
  DETAIL: (id: string) => "/daily-payout/" + id,
  CREATE: "/daily-payout",
  UPDATE: (id: string) => "/daily-payout/" + id,
  DELETE: (id: string) => "/daily-payout/" + id,
} as const;
