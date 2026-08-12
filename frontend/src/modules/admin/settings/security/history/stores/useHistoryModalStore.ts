import { createModalStore } from "@/stores/useGenericModalStore";
import { HistoryRecord } from "../types";

export const useHistoryModalStore = createModalStore<HistoryRecord>();
