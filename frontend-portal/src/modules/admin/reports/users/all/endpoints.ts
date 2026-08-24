export const ALL_API_ENDPOINTS = {
  LIST: "/all",
  DETAIL: (id: string) => "/all/" + id,
  CREATE: "/all",
  UPDATE: (id: string) => "/all/" + id,
  DELETE: (id: string) => "/all/" + id,
} as const;
