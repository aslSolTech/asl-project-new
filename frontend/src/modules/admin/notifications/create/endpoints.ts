export const CREATE_API_ENDPOINTS = {
  LIST: "/create",
  DETAIL: (id: string) => "/create/" + id,
  CREATE: "/create",
  UPDATE: (id: string) => "/create/" + id,
  DELETE: (id: string) => "/create/" + id,
} as const;
