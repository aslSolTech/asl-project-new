import { createModalStore } from "@/stores/useGenericModalStore";
import { BankVerifyRecord } from "../types";

export const useBankVerifyModalStore = createModalStore<BankVerifyRecord>();
