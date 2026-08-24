export const FOOTER_CONTACT_API_ENDPOINTS = {
  LIST: "/footer-contact",
  DETAIL: (id: string) => "/footer-contact/" + id,
  CREATE: "/footer-contact",
  UPDATE: (id: string) => "/footer-contact/" + id,
  DELETE: (id: string) => "/footer-contact/" + id,
} as const;
