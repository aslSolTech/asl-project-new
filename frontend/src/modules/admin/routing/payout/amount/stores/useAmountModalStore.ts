import { createModalStore } from "@/stores/useGenericModalStore";
import { AmountRecord } from "../types";

export const useAmountModalStore = createModalStore<AmountRecord>();
