export const OPERATOR_REGISTER_API_ENDPOINTS = {
  LIST: "/operator-register",
  DETAIL: (id: string) => "/operator-register/" + id,
  CREATE: "/operator-register",
  UPDATE: (id: string) => "/operator-register/" + id,
  DELETE: (id: string) => "/operator-register/" + id,
} as const;
