// ========================================== WALLET BALANCE TYPES ==========================================
export interface BalanceRecord {
  readonly id: string;
  readonly walletType: string;
  readonly balance: number;
  readonly trxnDescription: string;
  readonly trxnDate: string;
}

export type CreateBalancePayload = Omit<BalanceRecord, "id">;
export type UpdateBalancePayload = BalanceRecord;

// =========================================== WALLET TYPE TYPES ===========================================
export interface WalletTypeRecord {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly status: boolean;
}

export type CreateWalletTypePayload = Omit<WalletTypeRecord, "id">;
export type UpdateWalletTypePayload = WalletTypeRecord;
