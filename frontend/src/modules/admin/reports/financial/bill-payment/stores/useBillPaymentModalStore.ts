import { createModalStore } from "@/stores/useGenericModalStore";
import { BillPaymentRecord } from "../types";

export const useBillPaymentModalStore = createModalStore<BillPaymentRecord>();
