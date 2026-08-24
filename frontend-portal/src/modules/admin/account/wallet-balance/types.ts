// ========================================== WALLET BALANCE TYPES ==========================================
export interface WalletBalanceRecord {
  readonly id: string;
  readonly walletType: string;
  readonly balance: number;
  readonly trxnDescription: string;
  readonly trxnDate: string;
}

export interface WalletBalanceFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: WalletBalanceRecord | null;
  readonly onSuccess?: () => void;
}
export type CreateWalletBalancePayload = Omit<WalletBalanceRecord, "id">;
export type UpdateWalletBalancePayload = WalletBalanceRecord;

// =========================================== WALLET TYPE TYPES ===========================================
export interface WalletTypeRecord {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly status: boolean;
}

export type CreateWalletTypePayload = Omit<WalletTypeRecord, "id">;
export type UpdateWalletTypePayload = WalletTypeRecord;

