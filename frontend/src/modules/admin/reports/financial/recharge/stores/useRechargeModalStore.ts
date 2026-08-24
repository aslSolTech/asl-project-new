import { createModalStore } from "@/stores/useGenericModalStore";
import { RechargeRecord } from "../types";

export const useRechargeModalStore = createModalStore<RechargeRecord>();
