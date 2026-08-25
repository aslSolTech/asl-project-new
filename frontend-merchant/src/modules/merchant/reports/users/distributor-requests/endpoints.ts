export const DISTRIBUTOR_REQUESTS_API_ENDPOINTS = {
  LIST: "/distributor-requests",
  DETAIL: (id: string) => "/distributor-requests/" + id,
  CREATE: "/distributor-requests",
  UPDATE: (id: string) => "/distributor-requests/" + id,
  DELETE: (id: string) => "/distributor-requests/" + id,
} as const;
