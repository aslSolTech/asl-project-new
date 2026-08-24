export interface AdminTransferRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateAdminTransferPayload = Omit<AdminTransferRecord, "id">;
export type UpdateAdminTransferPayload = AdminTransferRecord;
