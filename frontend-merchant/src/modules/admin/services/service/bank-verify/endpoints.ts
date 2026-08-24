export const BANK_VERIFY_API_ENDPOINTS = {
  LIST: "/bank-verify",
  DETAIL: (id: string) => "/bank-verify/" + id,
  CREATE: "/bank-verify",
  UPDATE: (id: string) => "/bank-verify/" + id,
  DELETE: (id: string) => "/bank-verify/" + id,
} as const;
