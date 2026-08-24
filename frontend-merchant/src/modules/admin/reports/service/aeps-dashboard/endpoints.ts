export const AEPS_DASHBOARD_API_ENDPOINTS = {
  LIST: "/aeps-dashboard",
  DETAIL: (id: string) => "/aeps-dashboard/" + id,
  CREATE: "/aeps-dashboard",
  UPDATE: (id: string) => "/aeps-dashboard/" + id,
  DELETE: (id: string) => "/aeps-dashboard/" + id,
} as const;
