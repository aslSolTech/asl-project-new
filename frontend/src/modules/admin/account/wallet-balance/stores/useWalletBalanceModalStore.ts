import { createModalStore } from "@/stores/useGenericModalStore";
import { WalletBalanceRecord } from "../types";

export const useWalletBalanceModalStore = createModalStore<WalletBalanceRecord>();
