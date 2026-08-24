export const CRON_SETTING_API_ENDPOINTS = {
  LIST: "/cron-setting",
  DETAIL: (id: string) => "/cron-setting/" + id,
  CREATE: "/cron-setting",
  UPDATE: (id: string) => "/cron-setting/" + id,
  DELETE: (id: string) => "/cron-setting/" + id,
} as const;
