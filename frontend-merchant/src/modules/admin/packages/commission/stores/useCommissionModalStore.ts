import { createModalStore } from "@/stores/useGenericModalStore";
import { CommissionRecord } from "../types";

export const useCommissionModalStore = createModalStore<CommissionRecord>();
