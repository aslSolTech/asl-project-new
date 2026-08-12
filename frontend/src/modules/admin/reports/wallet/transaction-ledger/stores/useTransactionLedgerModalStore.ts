import { createModalStore } from "@/stores/useGenericModalStore";
import { TransactionLedgerRecord } from "../types";

export const useTransactionLedgerModalStore = createModalStore<TransactionLedgerRecord>();
