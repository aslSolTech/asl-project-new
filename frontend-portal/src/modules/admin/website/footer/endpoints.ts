export const FOOTER_API_ENDPOINTS = {
  LIST: "/footer",
  DETAIL: (id: string) => "/footer/" + id,
  CREATE: "/footer",
  UPDATE: (id: string) => "/footer/" + id,
  DELETE: (id: string) => "/footer/" + id,
} as const;
