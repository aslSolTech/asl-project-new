import { createModalStore } from "@/stores/useGenericModalStore";
import { PayoutRecord } from "../types";

export const usePayoutModalStore = createModalStore<PayoutRecord>();
