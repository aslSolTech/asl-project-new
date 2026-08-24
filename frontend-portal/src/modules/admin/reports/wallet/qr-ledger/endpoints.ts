export const QR_LEDGER_API_ENDPOINTS = {
  LIST: "/qr-ledger",
  DETAIL: (id: string) => "/qr-ledger/" + id,
  CREATE: "/qr-ledger",
  UPDATE: (id: string) => "/qr-ledger/" + id,
  DELETE: (id: string) => "/qr-ledger/" + id,
} as const;
