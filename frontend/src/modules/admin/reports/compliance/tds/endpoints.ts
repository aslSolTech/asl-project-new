export const TDS_API_ENDPOINTS = {
  LIST: "/tds",
  DETAIL: (id: string) => "/tds/" + id,
  CREATE: "/tds",
  UPDATE: (id: string) => "/tds/" + id,
  DELETE: (id: string) => "/tds/" + id,
} as const;
