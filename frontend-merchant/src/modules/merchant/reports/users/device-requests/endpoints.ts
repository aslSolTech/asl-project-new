export const DEVICE_REQUESTS_API_ENDPOINTS = {
  LIST: "/device-requests",
  DETAIL: (id: string) => "/device-requests/" + id,
  CREATE: "/device-requests",
  UPDATE: (id: string) => "/device-requests/" + id,
  DELETE: (id: string) => "/device-requests/" + id,
} as const;
