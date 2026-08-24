import { createModalStore } from "@/stores/useGenericModalStore";
import { LedgerRecord } from "../types";

export const useLedgerModalStore = createModalStore<LedgerRecord>();
