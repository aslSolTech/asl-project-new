import { createModalStore } from "@/stores/useGenericModalStore";
import { ApiBalanceRecord } from "../types";

export const useApiBalanceModalStore = createModalStore<ApiBalanceRecord>();
