export const EMPLOYEE_API_ENDPOINTS = {
  LIST: "/employee-register",
  DETAIL: (id: string) => "/employee-register/" + id,
  CREATE: "/employee-register",
  UPDATE: (id: string) => "/employee-register/" + id,
  DELETE: (id: string) => "/employee-register/" + id,
} as const;
