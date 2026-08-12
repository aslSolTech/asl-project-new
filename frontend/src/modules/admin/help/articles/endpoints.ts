export const ARTICLES_API_ENDPOINTS = {
  LIST: "/articles",
  DETAIL: (id: string) => "/articles/" + id,
  CREATE: "/articles",
  UPDATE: (id: string) => "/articles/" + id,
  DELETE: (id: string) => "/articles/" + id,
} as const;
