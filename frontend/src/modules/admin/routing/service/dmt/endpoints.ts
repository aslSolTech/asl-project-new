export const DMT_API_ENDPOINTS = {
  LIST: "/dmt",
  DETAIL: (id: string) => "/dmt/" + id,
  CREATE: "/dmt",
  UPDATE: (id: string) => "/dmt/" + id,
  DELETE: (id: string) => "/dmt/" + id,
} as const;
