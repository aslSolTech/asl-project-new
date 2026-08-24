export const UPI_VERIFY_API_ENDPOINTS = {
  LIST: "/upi-verify",
  DETAIL: (id: string) => "/upi-verify/" + id,
  CREATE: "/upi-verify",
  UPDATE: (id: string) => "/upi-verify/" + id,
  DELETE: (id: string) => "/upi-verify/" + id,
} as const;
