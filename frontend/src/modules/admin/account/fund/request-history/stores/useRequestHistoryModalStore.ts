import { createModalStore } from "@/stores/useGenericModalStore";
import { RequestHistoryRecord } from "../types";

export const useRequestHistoryModalStore = createModalStore<RequestHistoryRecord>();
