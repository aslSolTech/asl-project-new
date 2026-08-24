export const EMPLOYEE_LEDGER_API_ENDPOINTS = {
  LIST: "/employee-ledger",
  DETAIL: (id: string) => "/employee-ledger/" + id,
  CREATE: "/employee-ledger",
  UPDATE: (id: string) => "/employee-ledger/" + id,
  DELETE: (id: string) => "/employee-ledger/" + id,
} as const;
