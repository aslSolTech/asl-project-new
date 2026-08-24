export const MISSION_API_ENDPOINTS = {
  LIST: "/mission",
  DETAIL: (id: string) => "/mission/" + id,
  CREATE: "/mission",
  UPDATE: (id: string) => "/mission/" + id,
  DELETE: (id: string) => "/mission/" + id,
} as const;
