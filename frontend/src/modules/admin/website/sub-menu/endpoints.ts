export const SUB_MENU_API_ENDPOINTS = {
  LIST: "/sub-menu",
  DETAIL: (id: string) => "/sub-menu/" + id,
  CREATE: "/sub-menu",
  UPDATE: (id: string) => "/sub-menu/" + id,
  DELETE: (id: string) => "/sub-menu/" + id,
} as const;
