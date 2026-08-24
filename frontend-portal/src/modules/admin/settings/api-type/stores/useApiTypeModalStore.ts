import { createModalStore } from "@/stores/useGenericModalStore";
import { ApiTypeRecord } from "../types";

export const useApiTypeModalStore = createModalStore<ApiTypeRecord>();
