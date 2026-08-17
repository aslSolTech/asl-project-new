export const REGISTRATION_CHARGES_API_ENDPOINTS = {
  LIST: "/settings/registration-charges",
  DETAIL: (id: string) => `/settings/registration-charges/${id}`,
  CREATE: "/settings/registration-charges",
  UPDATE: (id: string) => `/settings/registration-charges/${id}`,
  DELETE: (id: string) => `/settings/registration-charges/${id}`,
};
