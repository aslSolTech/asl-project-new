export const PERMISSION_API_ENDPOINTS = {
  LIST: "/employee-permission",
  DETAIL: (id: string) => "/employee-permission/" + id,
  CREATE: "/employee-permission",
  UPDATE: (id: string) => "/employee-permission/" + id,
  DELETE: (id: string) => "/employee-permission/" + id,
} as const;
