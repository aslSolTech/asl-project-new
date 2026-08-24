export const PAN_CARD_API_ENDPOINTS = {
  LIST: "/pan-card",
  DETAIL: (id: string) => "/pan-card/" + id,
  CREATE: "/pan-card",
  UPDATE: (id: string) => "/pan-card/" + id,
  DELETE: (id: string) => "/pan-card/" + id,
} as const;
