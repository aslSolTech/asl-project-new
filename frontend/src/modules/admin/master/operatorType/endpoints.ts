export const OPERATOR_TYPE_API_ENDPOINTS = {
  LIST: "/operator-type",
  DETAIL: (id: string) => "/operator-type/" + id,
  CREATE: "/operator-type",
  UPDATE: (id: string) => "/operator-type/" + id,
  DELETE: (id: string) => "/operator-type/" + id,
} as const;
