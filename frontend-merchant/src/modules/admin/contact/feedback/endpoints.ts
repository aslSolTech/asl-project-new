export const FEEDBACK_API_ENDPOINTS = {
  LIST: "/feedback",
  DETAIL: (id: string) => "/feedback/" + id,
  CREATE: "/feedback",
  UPDATE: (id: string) => "/feedback/" + id,
  DELETE: (id: string) => "/feedback/" + id,
} as const;
