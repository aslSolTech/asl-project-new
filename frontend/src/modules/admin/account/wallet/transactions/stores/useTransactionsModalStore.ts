import { createModalStore } from "@/stores/useGenericModalStore";
import { TransactionsRecord } from "../types";

export const useTransactionsModalStore = createModalStore<TransactionsRecord>();
