import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { secureZustandStorage } from "@/lib/secureStorage";
import { BankAccountRecord, PayoutTransaction, WalletTransferRecord, PayoutMode, FundRequestRecord } from "@/modules/merchant/types";
import { useMerchantProfileStore } from "./useMerchantProfileStore";

export const INITIAL_BANK_ACCOUNTS: BankAccountRecord[] = [
  {
    id: "bank-1",
    bankName: "UCO BANK",
    accountNumber: "32840110063873",
    ifscCode: "UCBA0003284",
    holderName: "Nikhil Shaw",
    accountType: "PRIMARY",
    isVerified: true,
    verifiedAt: "26-05-2026 15:43:40 PM",
    createdAt: "2026-05-26T15:43:40.000Z",
  },
  {
    id: "bank-2",
    bankName: "KOTAK MAHINDRA BANK LIMITED",
    accountNumber: "8053090160",
    ifscCode: "KKBK0RTGSMI",
    holderName: "Sarowar Laskar",
    accountType: "PRIMARY",
    isVerified: true,
    verifiedAt: "14-07-2026 17:29:24 PM",
    createdAt: "2026-07-14T17:29:24.000Z",
  },
  {
    id: "bank-3",
    bankName: "BANK OF INDIA",
    accountNumber: "467418210008389",
    ifscCode: "BKID0004674",
    holderName: "NIKHIL SHAW",
    accountType: "PRIMARY",
    isVerified: true,
    verifiedAt: "05-08-2026 07:26:30 PM",
    createdAt: "2026-08-05T19:26:30.000Z",
  },
];

export const INITIAL_PAYOUT_TRANSACTIONS: PayoutTransaction[] = [
  {
    id: "PO-982341",
    amount: 10.00,
    recipientName: "Sarowar Laskar",
    accountNumber: "8053090160",
    bankName: "KOTAK MAHINDRA BANK LIMITED",
    ifscCode: "KKBK0RTGSMI",
    mode: "IMPS",
    fee: 0.00,
    utr: "CMS260814982341",
    status: "Success",
    timestamp: "2026-08-28T14:32:00.000Z",
  },
  {
    id: "PO-762190",
    amount: 500.00,
    recipientName: "Nikhil Shaw",
    accountNumber: "32840110063873",
    bankName: "UCO BANK",
    ifscCode: "UCBA0003284",
    mode: "IMPS",
    fee: 3.50,
    utr: "CMS260812762190",
    status: "Success",
    timestamp: "2026-08-25T11:15:20.000Z",
  },
];

export const INITIAL_WALLET_TRANSFERS: WalletTransferRecord[] = [
  {
    id: "WT-554102",
    targetMobile: "9876543210",
    recipientName: "Rahul Sharma (Retailer)",
    amount: 2500.00,
    note: "Counter replenishment",
    timestamp: "2026-08-29T10:45:00.000Z",
    status: "Success",
  },
];

export const INITIAL_FUND_REQUESTS: FundRequestRecord[] = [
  {
    id: "FR-10029",
    requestId: "REQ-84920",
    requestAmount: 50000,
    requestFrom: "Admin",
    bankId: "bank-1",
    bankName: "UCO BANK",
    accountNumber: "32840110063873",
    holderName: "Nikhil Shaw",
    transactionId: "UPI7283921820",
    paymentBy: "Google Pay",
    depositDate: "2026-08-30",
    remarks: "Top-up for daily cash counter",
    status: "Approved",
    createdAt: "2026-08-30T11:20:00.000Z",
  },
  {
    id: "FR-10028",
    requestId: "REQ-84915",
    requestAmount: 25000,
    requestFrom: "Admin",
    bankId: "bank-2",
    bankName: "KOTAK MAHINDRA BANK LIMITED",
    accountNumber: "8053090160",
    holderName: "Sarowar Laskar",
    transactionId: "IMPS839201948",
    paymentBy: "PhonePe",
    depositDate: "2026-08-31",
    remarks: "Weekend wallet fund request",
    status: "Pending",
    createdAt: "2026-08-31T09:15:00.000Z",
  },
];

export interface MerchantWalletStoreState {
  bankAccounts: BankAccountRecord[];
  payoutTransactions: PayoutTransaction[];
  walletTransfers: WalletTransferRecord[];
  fundRequests: FundRequestRecord[];
  
  // Bank Account Actions
  addBankAccount: (account: Omit<BankAccountRecord, "id" | "isVerified" | "verifiedAt" | "createdAt">) => BankAccountRecord;
  removeBankAccount: (id: string) => void;
  setPrimaryAccount: (id: string) => void;
  
  // Payout Actions
  processPayout: (params: {
    bankId: string;
    amount: number;
    mode: PayoutMode;
  }) => { success: boolean; transaction?: PayoutTransaction; error?: string };

  // Wallet Transfer Actions
  transferBalance: (params: {
    targetMobile: string;
    amount: number;
    note?: string;
  }) => { success: boolean; transfer?: WalletTransferRecord; error?: string };

  // Fund Request Actions
  submitFundRequest: (params: {
    requestAmount: number;
    requestFrom: "Admin";
    bankId: string;
    transactionId: string;
    paymentBy: string;
    depositDate: string;
    remarks?: string;
  }) => { success: boolean; fundRequest?: FundRequestRecord; error?: string };
}

export const useMerchantWalletStore = create<MerchantWalletStoreState>()(
  persist(
    (set, get) => ({
      bankAccounts: INITIAL_BANK_ACCOUNTS,
      payoutTransactions: INITIAL_PAYOUT_TRANSACTIONS,
      walletTransfers: INITIAL_WALLET_TRANSFERS,
      fundRequests: INITIAL_FUND_REQUESTS,

      addBankAccount: (data) => {
        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

        const newAccount: BankAccountRecord = {
          id: `bank-${Date.now()}`,
          ...data,
          isVerified: true,
          verifiedAt: formattedDate,
          createdAt: now.toISOString(),
        };

        set((state) => ({
          bankAccounts: [newAccount, ...state.bankAccounts],
        }));

        return newAccount;
      },

      removeBankAccount: (id) => {
        set((state) => ({
          bankAccounts: state.bankAccounts.filter((b) => b.id !== id),
        }));
      },

      setPrimaryAccount: (id) => {
        set((state) => ({
          bankAccounts: state.bankAccounts.map((b) => ({
            ...b,
            accountType: b.id === id ? "PRIMARY" : "SECONDARY",
          })),
        }));
      },

      processPayout: ({ bankId, amount, mode }) => {
        const bank = get().bankAccounts.find((b) => b.id === bankId);
        if (!bank) {
          return { success: false, error: "Selected bank account was not found!" };
        }

        const profileStore = useMerchantProfileStore.getState();
        const currentBalance = profileStore.profile.walletBalance ?? 0;

        if (amount <= 0) {
          return { success: false, error: "Please enter a valid payout amount!" };
        }

        if (currentBalance < amount) {
          return { success: false, error: "Insufficient wallet balance for this payout!" };
        }

        // Deduct from profile store wallet balance
        useMerchantProfileStore.setState((state) => ({
          profile: {
            ...state.profile,
            walletBalance: state.profile.walletBalance - amount,
          },
        }));

        const now = new Date();
        const randomDigits = typeof crypto !== "undefined" && crypto.getRandomValues
          ? (crypto.getRandomValues(new Uint32Array(1))[0] % 900000) + 100000
          : Date.now() % 900000 + 100000;

        const utrNumber = `CMS${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${randomDigits}`;

        const transaction: PayoutTransaction = {
          id: `PO-${randomDigits}`,
          amount,
          recipientName: bank.holderName,
          accountNumber: bank.accountNumber,
          bankName: bank.bankName,
          ifscCode: bank.ifscCode,
          mode,
          fee: 0.00,
          utr: utrNumber,
          status: "Success",
          timestamp: now.toISOString(),
        };

        set((state) => ({
          payoutTransactions: [transaction, ...state.payoutTransactions],
        }));

        return { success: true, transaction };
      },

      transferBalance: ({ targetMobile, amount, note }) => {
        const profileStore = useMerchantProfileStore.getState();
        const currentBalance = profileStore.profile.walletBalance ?? 0;

        if (amount <= 0) {
          return { success: false, error: "Please enter a valid transfer amount!" };
        }

        if (currentBalance < amount) {
          return { success: false, error: "Insufficient wallet balance!" };
        }

        // Deduct from profile store wallet balance
        useMerchantProfileStore.setState((state) => ({
          profile: {
            ...state.profile,
            walletBalance: state.profile.walletBalance - amount,
          },
        }));

        const transferRandomDigits = typeof crypto !== "undefined" && crypto.getRandomValues
          ? (crypto.getRandomValues(new Uint32Array(1))[0] % 900000) + 100000
          : Date.now() % 900000 + 100000;

        const transfer: WalletTransferRecord = {
          id: `WT-${transferRandomDigits}`,
          targetMobile,
          recipientName: `User (+91 ${targetMobile.slice(-10)})`,
          amount,
          note: note || "Balance Transfer",
          timestamp: new Date().toISOString(),
          status: "Success",
        };

        set((state) => ({
          walletTransfers: [transfer, ...state.walletTransfers],
        }));

        return { success: true, transfer };
      },

      submitFundRequest: ({
        requestAmount,
        requestFrom,
        bankId,
        transactionId,
        paymentBy,
        depositDate,
        remarks,
      }) => {
        const bank = get().bankAccounts.find((b) => b.id === bankId);
        if (!bank) {
          return { success: false, error: "Please select a valid bank account!" };
        }

        if (requestAmount <= 0) {
          return { success: false, error: "Please enter a valid request amount (min ₹1)!" };
        }

        if (!transactionId.trim()) {
          return { success: false, error: "Transaction ID / Reference number is required!" };
        }

        const now = new Date();
        const randomDigits = typeof crypto !== "undefined" && crypto.getRandomValues
          ? (crypto.getRandomValues(new Uint32Array(1))[0] % 90000) + 10000
          : Date.now() % 90000 + 10000;

        const fundRequest: FundRequestRecord = {
          id: `FR-${Date.now()}`,
          requestId: `REQ-${randomDigits}`,
          requestAmount,
          requestFrom,
          bankId: bank.id,
          bankName: bank.bankName,
          accountNumber: bank.accountNumber,
          holderName: bank.holderName,
          transactionId: transactionId.trim(),
          paymentBy: paymentBy.trim(),
          depositDate: depositDate || now.toISOString().split("T")[0],
          remarks: remarks?.trim() || undefined,
          status: "Pending",
          createdAt: now.toISOString(),
        };

        set((state) => ({
          fundRequests: [fundRequest, ...state.fundRequests],
        }));

        return { success: true, fundRequest };
      },
    }),
    {
      name: "merchant-wallets-store",
      storage: createJSONStorage(() => secureZustandStorage),
    }
  )
);
