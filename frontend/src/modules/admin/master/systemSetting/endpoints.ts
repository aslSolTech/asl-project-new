export const SYSTEM_SETTING_API_ENDPOINTS = {
  LIST: "/system-setting",
  DETAIL: (id: string) => "/system-setting/" + id,
  CREATE: "/system-setting",
  UPDATE: (id: string) => "/system-setting/" + id,
  DELETE: (id: string) => "/system-setting/" + id,
} as const;
