export interface KycRecord {
  id: string;
  documentType: string;
  docNumber: string;
  status: string;
}

export type CreateKycPayload = Omit<KycRecord, "id">;
export type UpdateKycPayload = KycRecord;
