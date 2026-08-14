export const NOTIFICATION_API_ENDPOINTS = {
  LIST: "/notifications",
  DETAIL: (id: string) => "/notifications/" + id,
  CREATE: "/notifications",
  UPDATE: (id: string) => "/notifications/" + id,
  DELETE: (id: string) => "/notifications/" + id,
} as const;
