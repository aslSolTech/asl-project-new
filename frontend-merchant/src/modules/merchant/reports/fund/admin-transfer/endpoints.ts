export const ADMIN_TRANSFER_API_ENDPOINTS = {
  LIST: "/admin-transfer",
  DETAIL: (id: string) => "/admin-transfer/" + id,
  CREATE: "/admin-transfer",
  UPDATE: (id: string) => "/admin-transfer/" + id,
  DELETE: (id: string) => "/admin-transfer/" + id,
} as const;
