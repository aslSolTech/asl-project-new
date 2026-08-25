export const LOAN_API_ENDPOINTS = {
  LIST: "/loan",
  DETAIL: (id: string) => "/loan/" + id,
  CREATE: "/loan",
  UPDATE: (id: string) => "/loan/" + id,
  DELETE: (id: string) => "/loan/" + id,
} as const;
