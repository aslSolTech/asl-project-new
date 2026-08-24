export const PACKAGE_API_ENDPOINTS = {
  LIST: "/package",
  DETAIL: (id: string) => "/package/" + id,
  CREATE: "/package",
  UPDATE: (id: string) => "/package/" + id,
  DELETE: (id: string) => "/package/" + id,
} as const;
