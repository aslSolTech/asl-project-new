export const COMMISSION_API_ENDPOINTS = {
  LIST: "/commission",
  DETAIL: (id: string) => "/commission/" + id,
  CREATE: "/commission",
  UPDATE: (id: string) => "/commission/" + id,
  DELETE: (id: string) => "/commission/" + id,
} as const;
