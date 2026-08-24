export const CALLBACKS_API_ENDPOINTS = {
  LIST: "/callbacks",
  DETAIL: (id: string) => "/callbacks/" + id,
  CREATE: "/callbacks",
  UPDATE: (id: string) => "/callbacks/" + id,
  DELETE: (id: string) => "/callbacks/" + id,
} as const;
