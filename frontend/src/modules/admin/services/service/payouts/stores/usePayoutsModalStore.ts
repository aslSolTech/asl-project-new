import { createModalStore } from "@/stores/useGenericModalStore";
import { PayoutRecord } from "../types";

export const usePayoutsModalStore = createModalStore<PayoutRecord>();
