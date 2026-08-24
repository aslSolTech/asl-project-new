import { createModalStore } from "@/stores/useGenericModalStore";
import { ApiRequestParameterRecord } from "../types";

export const useApiRequestParameterModalStore = createModalStore<ApiRequestParameterRecord>();
