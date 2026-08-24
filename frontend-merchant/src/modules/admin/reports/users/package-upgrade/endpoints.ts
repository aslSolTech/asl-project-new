export const PACKAGE_UPGRADE_API_ENDPOINTS = {
  LIST: "/package-upgrade",
  DETAIL: (id: string) => "/package-upgrade/" + id,
  CREATE: "/package-upgrade",
  UPDATE: (id: string) => "/package-upgrade/" + id,
  DELETE: (id: string) => "/package-upgrade/" + id,
} as const;
