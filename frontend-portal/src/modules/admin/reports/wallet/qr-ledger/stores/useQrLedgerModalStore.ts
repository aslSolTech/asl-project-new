import { createModalStore } from "@/stores/useGenericModalStore";
import { QrLedgerRecord } from "../types";

export const useQrLedgerModalStore = createModalStore<QrLedgerRecord>();
