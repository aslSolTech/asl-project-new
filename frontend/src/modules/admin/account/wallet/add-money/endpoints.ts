export const ADD_MONEY_API_ENDPOINTS = {
  LIST: "/add-money",
  DETAIL: (id: string) => "/add-money/" + id,
  CREATE: "/add-money",
  UPDATE: (id: string) => "/add-money/" + id,
  DELETE: (id: string) => "/add-money/" + id,
} as const;
