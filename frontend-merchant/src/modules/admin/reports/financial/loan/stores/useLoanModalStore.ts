import { createModalStore } from "@/stores/useGenericModalStore";
import { LoanRecord } from "../types";

export const useLoanModalStore = createModalStore<LoanRecord>();
