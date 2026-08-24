export interface AmountRecord {
  id: string;
  userTypeId: string;
  userTypeName?: string;
  userId?: string;
  userName?: string;
  userCode?: string;
  amountFrom: number;
  amountTo: number;
  providerId?: string;
  providerName: string;
  fallback?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;

  // Compatibility aliases
  amount?: string | number;
  api?: string;
}

export type CreateAmountPayload = Omit<AmountRecord, "id">;
export type UpdateAmountPayload = AmountRecord;

