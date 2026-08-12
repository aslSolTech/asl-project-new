export const LIVE_PANEL_API_ENDPOINTS = {
  LIST: "/live-panel",
  DETAIL: (id: string) => "/live-panel/" + id,
  CREATE: "/live-panel",
  UPDATE: (id: string) => "/live-panel/" + id,
  DELETE: (id: string) => "/live-panel/" + id,
} as const;
