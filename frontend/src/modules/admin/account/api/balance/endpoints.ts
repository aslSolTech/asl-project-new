export const BALANCE_API_ENDPOINTS = {
  LIST: "/balance",
  DETAIL: (id: string) => "/balance/" + id,
  CREATE: "/balance",
  UPDATE: (id: string) => "/balance/" + id,
  DELETE: (id: string) => "/balance/" + id,
} as const;
