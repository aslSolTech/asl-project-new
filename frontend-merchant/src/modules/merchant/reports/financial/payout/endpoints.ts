export const PAYOUT_API_ENDPOINTS = {
  LIST: "/payout",
  DETAIL: (id: string) => "/payout/" + id,
  CREATE: "/payout",
  UPDATE: (id: string) => "/payout/" + id,
  DELETE: (id: string) => "/payout/" + id,
} as const;
