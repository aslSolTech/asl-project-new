export const MENU_API_ENDPOINTS = {
  LIST: "/menu",
  DETAIL: (id: string) => "/menu/" + id,
  CREATE: "/menu",
  UPDATE: (id: string) => "/menu/" + id,
  DELETE: (id: string) => "/menu/" + id,
} as const;
