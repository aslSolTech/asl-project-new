export const KYC_API_ENDPOINTS = {
  LIST: "/kyc",
  DETAIL: (id: string) => "/kyc/" + id,
  CREATE: "/kyc",
  UPDATE: (id: string) => "/kyc/" + id,
  DELETE: (id: string) => "/kyc/" + id,
} as const;
