import { createModalStore } from "@/stores/useGenericModalStore";
import { ApiCallbackRecord } from "../types";

export const useApiCallbackModalStore = createModalStore<ApiCallbackRecord>();
