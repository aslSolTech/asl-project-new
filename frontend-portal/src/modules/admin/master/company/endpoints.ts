export const COMPANY_API_ENDPOINTS = {
  LIST: "/companies",
  DETAIL: (id: string) => `/companies/${id}`,
  CREATE: "/companies",
  UPDATE: (id: string) => `/companies/${id}`,
  DELETE: (id: string) => `/companies/${id}`,
} as const;
