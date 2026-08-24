export const REQUEST_BANK_LIST_API_ENDPOINTS = {
  LIST: "/request-bank-list",
  DETAIL: (id: string) => "/request-bank-list/" + id,
  CREATE: "/request-bank-list",
  UPDATE: (id: string) => "/request-bank-list/" + id,
  DELETE: (id: string) => "/request-bank-list/" + id,
} as const;
