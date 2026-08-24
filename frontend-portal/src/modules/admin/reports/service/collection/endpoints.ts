export const COLLECTION_API_ENDPOINTS = {
  LIST: "/collection",
  DETAIL: (id: string) => "/collection/" + id,
  CREATE: "/collection",
  UPDATE: (id: string) => "/collection/" + id,
  DELETE: (id: string) => "/collection/" + id,
} as const;
