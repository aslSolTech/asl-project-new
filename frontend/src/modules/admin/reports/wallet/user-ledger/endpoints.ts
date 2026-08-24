export const USER_LEDGER_API_ENDPOINTS = {
  LIST: "/user-ledger",
  DETAIL: (id: string) => "/user-ledger/" + id,
  CREATE: "/user-ledger",
  UPDATE: (id: string) => "/user-ledger/" + id,
  DELETE: (id: string) => "/user-ledger/" + id,
} as const;
