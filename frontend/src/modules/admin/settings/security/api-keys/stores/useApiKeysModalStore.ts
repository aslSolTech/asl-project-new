import { createModalStore } from "@/stores/useGenericModalStore";
import { ApiKeysRecord } from "../types";

export const useApiKeysModalStore = createModalStore<ApiKeysRecord>();
