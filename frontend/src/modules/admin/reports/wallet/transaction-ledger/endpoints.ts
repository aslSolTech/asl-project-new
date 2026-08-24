export const TRANSACTION_LEDGER_API_ENDPOINTS = {
  LIST: "/transaction-ledger",
  DETAIL: (id: string) => "/transaction-ledger/" + id,
  CREATE: "/transaction-ledger",
  UPDATE: (id: string) => "/transaction-ledger/" + id,
  DELETE: (id: string) => "/transaction-ledger/" + id,
} as const;
