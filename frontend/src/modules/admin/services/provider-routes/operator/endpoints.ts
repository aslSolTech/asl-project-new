export const OPERATOR_API_ENDPOINTS = {
  LIST: "/operator",
  DETAIL: (id: string) => "/operator/" + id,
  CREATE: "/operator",
  UPDATE: (id: string) => "/operator/" + id,
  DELETE: (id: string) => "/operator/" + id,
} as const;
