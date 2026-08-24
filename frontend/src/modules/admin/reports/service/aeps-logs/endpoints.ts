export const AEPS_LOGS_API_ENDPOINTS = {
  LIST: "/aeps-logs",
  DETAIL: (id: string) => "/aeps-logs/" + id,
  CREATE: "/aeps-logs",
  UPDATE: (id: string) => "/aeps-logs/" + id,
  DELETE: (id: string) => "/aeps-logs/" + id,
} as const;
