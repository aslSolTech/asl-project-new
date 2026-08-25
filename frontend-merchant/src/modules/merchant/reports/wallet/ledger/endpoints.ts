export const LEDGER_API_ENDPOINTS = {
  LIST: "/ledger",
  DETAIL: (id: string) => "/ledger/" + id,
  CREATE: "/ledger",
  UPDATE: (id: string) => "/ledger/" + id,
  DELETE: (id: string) => "/ledger/" + id,
} as const;
