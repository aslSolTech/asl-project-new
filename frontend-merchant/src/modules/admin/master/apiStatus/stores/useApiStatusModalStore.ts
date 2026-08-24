import { createModalStore } from "@/stores/useGenericModalStore";
import { ApiStatusRecord } from "../types";

export const useApiStatusModalStore = createModalStore<ApiStatusRecord>();
