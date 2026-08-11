export const AEPS_BANK_API_ENDPOINTS = {
  LIST: "/aeps-bank",
  DETAIL: (id: string) => "/aeps-bank/" + id,
  CREATE: "/aeps-bank",
  UPDATE: (id: string) => "/aeps-bank/" + id,
  DELETE: (id: string) => "/aeps-bank/" + id,
} as const;
