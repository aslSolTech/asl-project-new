import { createModalStore } from "@/stores/useGenericModalStore";
import { ApiManualRecord } from "../types";

export const useApiManualModalStore = createModalStore<ApiManualRecord>();
