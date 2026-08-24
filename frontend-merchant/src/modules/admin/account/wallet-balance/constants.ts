// ========================================== WALLET BALANCE CONFIGS & DEFAULTS ==========================================
export const balanceFieldsConfig = [
  {
    key: "walletType",
    label: "Wallet Type",
    type: "select",
    placeholder: "Select Wallet Type...",
    options: [
      {
        label: "Bank",
        value: "bank"
      },
      {
        label: "Prepaid",
        value: "prepaid"
      },
      {
        label: "SMS",
        value: "sms"
      },
      {
        label: "Travel",
        value: "travel"
      },
      {
        label: "Utility",
        value: "utility"
      }

    ],
    required: true
  },
  {
    key: "balance",
    label: "Balance",
    type: "number",
    placeholder: "Enter balance...",
    min: 0,
    required: true
  },
  {
    key: "trxnDescription",
    label: "Transaction Description",
    type: "text",
    placeholder: "Enter transaction description...",
    required: true
  },
  {
    key: "trxnDate",
    label: "Transaction Date",
    type: "date",
    placeholder: "Enter transaction date...",
    required: true
  }
] as const;

// =========================================== WALLET TYPE CONFIGS & DEFAULTS ===========================================
export const walletTypeFieldsConfig = [
  {
    key: "name",
    label: "Wallet Type Name",
    type: "text",
    placeholder: "Enter name (e.g. BANK, SMS)...",
    required: true,
    textTransform: "capitalize",
  },
  {
    key: "code",
    label: "Wallet Type Code",
    type: "text",
    placeholder: "Enter unique code (e.g. bank, sms)...",
    required: true,
    textTransform: "lowercase",
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
    required: true,
  },
] as const;

import { WalletTypeRecord, WalletBalanceRecord } from "./types";

export const DEFAULT_WALLET_TYPES: WalletTypeRecord[] = [
  { id: "WT-001", name: "Bank", code: "bank", status: true },
  { id: "WT-002", name: "Prepaid", code: "prepaid", status: true },
  { id: "WT-003", name: "SMS", code: "sms", status: true },
  { id: "WT-004", name: "Travel", code: "travel", status: true },
  { id: "WT-005", name: "Utility", code: "utility", status: true }
];

export const DEFAULT_BALANCES: WalletBalanceRecord[] = [
  {
    id: "REC-101",
    walletType: "bank",
    balance: 1500,
    trxnDescription: "Initial wallet setup balance",
    trxnDate: "2026-08-13"
  },
  {
    id: "REC-102",
    walletType: "prepaid",
    balance: 500,
    trxnDescription: "Prepaid wallet allocation",
    trxnDate: "2026-08-13"
  },
  {
    id: "REC-103",
    walletType: "sms",
    balance: 250,
    trxnDescription: "SMS gateway credit load",
    trxnDate: "2026-08-13"
  },
  {
    id: "REC-104",
    walletType: "utility",
    balance: 3000,
    trxnDescription: "Utility bills budget",
    trxnDate: "2026-08-13"
  }
];
