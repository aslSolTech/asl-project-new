export const BALANCE_API_ENDPOINTS = {
  LIST: "/balance",
  DETAIL: (id: string) => "/balance/" + id,
  CREATE: "/balance",
  UPDATE: (id: string) => "/balance/" + id,
  DELETE: (id: string) => "/balance/" + id,
} as const;

export const WALLET_TYPE_API_ENDPOINTS = {
  LIST: "/wallet-type",
  DETAIL: (id: string) => "/wallet-type/" + id,
  CREATE: "/wallet-type",
  UPDATE: (id: string) => "/wallet-type/" + id,
  DELETE: (id: string) => "/wallet-type/" + id,
} as const;
