export interface MerchantApiRecord {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerCompanyName: string;
  retailerCode: string;
  retailerName: string;
  shopName: string;
  contactNo: string;
  email: string;
  panNo: string;
  aadhaarNo: string;
  kycStatus: "verified" | "pending" | "rejected";
  isOtpVerify: "Y" | "N";
  isBlocked: boolean;
  status: "active" | "inactive" | "blocked";
  registeredAt?: string;
  apiKey?: string;
  callbackUrl?: string;
}

export type CreateMerchantApiPayload = Omit<MerchantApiRecord, "id">;
export type UpdateMerchantApiPayload = MerchantApiRecord;
