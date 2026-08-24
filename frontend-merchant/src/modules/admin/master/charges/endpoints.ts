export const REGISTRATION_CHARGES_API_ENDPOINTS = {
  LIST: "/registration-charges",
  DETAIL: (id: string) => "/registration-charges/" + id,
  CREATE: "/registration-charges",
  UPDATE: (id: string) => "/registration-charges/" + id,
  DELETE: (id: string) => "/registration-charges/" + id,
} as const;
