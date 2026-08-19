export const OPERATOR_CODE_API_ENDPOINTS = {
  LIST: "/operator-code",
  DETAIL: (id: string) => "/operator-code/" + id,
  CREATE: "/operator-code",
  UPDATE: (id: string) => "/operator-code/" + id,
  DELETE: (id: string) => "/operator-code/" + id,
} as const;
