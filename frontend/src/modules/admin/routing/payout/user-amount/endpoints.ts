export const USER_AMOUNT_API_ENDPOINTS = {
  LIST: "/user-amount",
  DETAIL: (id: string) => "/user-amount/" + id,
  CREATE: "/user-amount",
  UPDATE: (id: string) => "/user-amount/" + id,
  DELETE: (id: string) => "/user-amount/" + id,
} as const;
