export const DMT_DASHBOARD_API_ENDPOINTS = {
  LIST: "/dmt-dashboard",
  DETAIL: (id: string) => "/dmt-dashboard/" + id,
  CREATE: "/dmt-dashboard",
  UPDATE: (id: string) => "/dmt-dashboard/" + id,
  DELETE: (id: string) => "/dmt-dashboard/" + id,
} as const;
