import { createModalStore } from "@/stores/useGenericModalStore";
import { DailyPayoutRecord } from "../types";

export const useDailyPayoutModalStore = createModalStore<DailyPayoutRecord>();
