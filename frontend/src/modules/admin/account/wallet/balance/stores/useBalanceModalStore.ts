import { createModalStore } from "@/stores/useGenericModalStore";
import { BalanceRecord } from "../types";

export const useBalanceModalStore = createModalStore<BalanceRecord>();
