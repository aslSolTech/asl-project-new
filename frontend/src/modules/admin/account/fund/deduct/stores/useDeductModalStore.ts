import { createModalStore } from "@/stores/useGenericModalStore";
import { DeductRecord } from "../types";

export const useDeductModalStore = createModalStore<DeductRecord>();
