export const SERVICE_CONTROL_API_ENDPOINTS = {
  LIST: "/service-control",
  DETAIL: (id: string) => "/service-control/" + id,
  CREATE: "/service-control",
  UPDATE: (id: string) => "/service-control/" + id,
  DELETE: (id: string) => "/service-control/" + id,
} as const;
