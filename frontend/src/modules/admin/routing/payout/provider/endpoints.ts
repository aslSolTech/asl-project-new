export const PROVIDER_API_ENDPOINTS = {
  LIST: "/provider",
  DETAIL: (id: string) => "/provider/" + id,
  CREATE: "/provider",
  UPDATE: (id: string) => "/provider/" + id,
  DELETE: (id: string) => "/provider/" + id,
} as const;
