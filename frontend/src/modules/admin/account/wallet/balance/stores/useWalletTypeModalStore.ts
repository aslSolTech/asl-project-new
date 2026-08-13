import { createModalStore } from "@/stores/useGenericModalStore";
import { WalletTypeRecord } from "../types";

export const useWalletTypeModalStore = createModalStore<WalletTypeRecord>();
