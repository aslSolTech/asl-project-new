export const BILL_PAYMENT_API_ENDPOINTS = {
  LIST: "/bill-payment",
  DETAIL: (id: string) => "/bill-payment/" + id,
  CREATE: "/bill-payment",
  UPDATE: (id: string) => "/bill-payment/" + id,
  DELETE: (id: string) => "/bill-payment/" + id,
} as const;
