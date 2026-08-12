export const MESSAGES_API_ENDPOINTS = {
  LIST: "/messages",
  DETAIL: (id: string) => "/messages/" + id,
  CREATE: "/messages",
  UPDATE: (id: string) => "/messages/" + id,
  DELETE: (id: string) => "/messages/" + id,
} as const;
