import { createModalStore } from "@/stores/useGenericModalStore";
import { DailySaleRecord } from "../types";

export const useDailySaleModalStore = createModalStore<DailySaleRecord>();
