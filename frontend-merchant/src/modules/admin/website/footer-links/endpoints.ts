export const FOOTER_LINKS_API_ENDPOINTS = {
  LIST: "/footer-links",
  DETAIL: (id: string) => "/footer-links/" + id,
  CREATE: "/footer-links",
  UPDATE: (id: string) => "/footer-links/" + id,
  DELETE: (id: string) => "/footer-links/" + id,
} as const;
