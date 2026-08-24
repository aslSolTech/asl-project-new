export const STATUS_API_API_ENDPOINTS = {
  LIST: "/api-status",
  DETAIL: (id: string) => "/api-status/" + id,
  CREATE: "/api-status",
  UPDATE: (id: string) => "/api-status/" + id,
  DELETE: (id: string) => "/api-status/" + id,
} as const;
