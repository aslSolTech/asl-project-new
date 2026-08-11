export const OPERATOR_CATEGORY_API_ENDPOINTS = {
  LIST: "/operator-category",
  DETAIL: (id: string) => "/operator-category/" + id,
  CREATE: "/operator-category",
  UPDATE: (id: string) => "/operator-category/" + id,
  DELETE: (id: string) => "/operator-category/" + id,
} as const;
