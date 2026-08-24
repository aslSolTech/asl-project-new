export const TWO_FACTOR_AUTH_API_ENDPOINTS = {
  LIST: "/2fa",
  DETAIL: (id: string) => "/2fa/" + id,
  CREATE: "/2fa",
  UPDATE: (id: string) => "/2fa/" + id,
  DELETE: (id: string) => "/2fa/" + id,
} as const;
