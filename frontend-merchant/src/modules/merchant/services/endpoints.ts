export const SERVICES_API_ENDPOINTS = {
  LIST: "/services",
  DETAIL: (id: string) => `/services/${id}`,
} as const;
