export const PAYOUT_USER_ACCOUNT_API_ENDPOINTS = {
  LIST: "/payout-user-account",
  DETAIL: (id: string) => "/payout-user-account/" + id,
  CREATE: "/payout-user-account",
  UPDATE: (id: string) => "/payout-user-account/" + id,
  DELETE: (id: string) => "/payout-user-account/" + id,
} as const;
